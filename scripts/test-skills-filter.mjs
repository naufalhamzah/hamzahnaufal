/**
 * Filter smoke test — exercises the SHIPPED Skills filter for real.
 *
 * WHY IT LOADS THE BUNDLE BY HAND
 * Astro emits this script as `<script type="module">`, and jsdom does not run
 * module scripts — so a plain jsdom render passes while the controls do nothing.
 * Loading the built bundle into a `vm` context and running it against the built
 * DOM tests the code that actually ships, and fails loudly if the script was
 * never emitted. A screenshot could not do this job either: it shows the default
 * state, never that typing narrows the list.
 */
import { readFileSync } from 'node:fs';
import { createContext, runInContext } from 'node:vm';
import { JSDOM } from 'jsdom';

const html = readFileSync('dist/skills/index.html', 'utf8');
const dom = new JSDOM(html, { pretendToBeVisual: true });
const { window } = dom;

/* The filter ships INLINE in the page (Astro inlines small scripts), so instead
   of hunting a bundle the snippet is extracted from the built HTML by its own
   markers and run against that same DOM. If the script ever stops being emitted,
   this exits with a clear message rather than passing on a page that does
   nothing. */
const snippet = [...html.matchAll(/<script type="module">([\s\S]*?)<\/script>/g)]
  .map((m) => m[1])
  .find((s) => s.includes('sk-search'));

if (!snippet) {
  console.error('✗ the skills filter was not emitted into dist/skills/index.html');
  process.exit(1);
}
console.log(`inline filter script: ${snippet.length} bytes`);

runInContext(
  snippet,
  createContext({
    document: window.document,
    Event: window.Event,
    console,
  }),
);

const { document } = window;

const items = () => Array.from(document.querySelectorAll('[data-sk-item]'));
const groups = () => Array.from(document.querySelectorAll('[data-sk-group]'));
const shown = () => items().filter((i) => !i.hidden);
const shownGroups = () => groups().filter((g) => !g.hidden);
const status = () => document.getElementById('sk-status')?.textContent ?? '';
const click = (sel) => document.querySelector(sel).dispatchEvent(new dom.window.Event('click', { bubbles: true }));
const type = (v) => {
  const s = document.getElementById('sk-search');
  s.value = v;
  s.dispatchEvent(new dom.window.Event('input', { bubbles: true }));
};

let fails = 0;
const check = (label, got, want) => {
  const ok = got === want;
  if (!ok) fails++;
  console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${label}${ok ? '' : `  (got ${got}, want ${want})`}`);
};

/*
  The tile count is READ from the page, not written down. Hardcoding it made this
  test fail the first time a skill was removed — a test that breaks when the data
  changes is testing the data, not the behaviour, and the noise hides real
  failures.
*/
const TOTAL = items().length;

console.log('skills filter');
console.log(`  items=${TOTAL} groups=${groups().length} chips=${document.querySelectorAll('[data-sk-filter]').length}`);

/* 1 — default state shows everything. */
check('default: every tile shown', shown().length, TOTAL);
check('default: no status text', status(), '');

/* 2 — category chip narrows to that group only. */
click('[data-sk-filter="data-analytics"]');
check('chip: one group visible', shownGroups().length, 1);
check('chip: status names the scope', status().includes('data analytics'), true);

/* 3 — search composes WITH the chip. */
type('sql');
check('search+chip: narrowed further', shown().length < TOTAL, true);
check('search+chip: every match contains "sql"', shown().every((i) => i.dataset.skName.includes('sql')), true);

/* 4 — a term that matches nothing shows the empty note and hides all groups. */
type('zzzznotathing');
check('no match: zero shown', shown().length, 0);
check('no match: all groups hidden', shownGroups().length, 0);
check('no match: empty note visible', document.getElementById('sk-empty').hidden, false);

/* 5 — clearing restores, and "All" returns the whole list. */
type('');
click('[data-sk-filter="all"]');
check('reset: every tile back', shown().length, TOTAL);
check('reset: empty note hidden again', document.getElementById('sk-empty').hidden, true);

console.log(fails === 0 ? '\n✓ filter behaves correctly' : `\n✗ ${fails} check(s) failed`);
process.exit(fails === 0 ? 0 : 1);
