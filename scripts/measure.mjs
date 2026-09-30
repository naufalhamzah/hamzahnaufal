#!/usr/bin/env node
/**
 * measure.mjs — layout / accessibility probe over Chrome DevTools Protocol.
 *
 * Why this exists: the interactive browser tool times out on this page, and
 * guessing at layout from CSS math is not verification. This launches a headless
 * browser, drives it over CDP with Node's built-in WebSocket (no extra deps),
 * and reports MEASURED overflow, contrast and structure at several viewports.
 *
 * Usage: node scripts/measure.mjs [url] [width...]
 */

const CDP_PORT = 9333;
const url = process.argv[2] ?? 'http://localhost:4400/';
const widths = process.argv.slice(3).map(Number);
const VIEWPORTS = widths.length ? widths : [360, 390, 768, 1024, 1440];

import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

function findBrowser() {
  const candidates = [
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  ];
  return candidates.find(existsSync);
}

const browser = findBrowser();
if (!browser) {
  console.error('No Chromium-based browser found.');
  process.exit(1);
}

const profile = mkdtempSync(join(tmpdir(), 'hnz-measure-'));
const child = spawn(
  browser,
  [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${CDP_PORT}`,
    `--user-data-dir=${profile}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--no-sandbox',
    'about:blank',
  ],
  { stdio: 'ignore' },
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Poll until the CDP HTTP endpoint answers. */
async function waitForCdp(tries = 40) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${CDP_PORT}/json/version`);
      if (r.ok) return true;
    } catch {}
    await sleep(250);
  }
  return false;
}

/** Minimal CDP client over the built-in WebSocket. */
class CDP {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    ws.addEventListener('message', (ev) => {
      const msg = JSON.parse(ev.data);
      const p = this.pending.get(msg.id);
      if (p) {
        this.pending.delete(msg.id);
        msg.error ? p.reject(new Error(msg.error.message)) : p.resolve(msg.result);
      }
    });
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
}

async function evaluate(cdp, expression) {
  const r = await cdp.send('Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (r.exceptionDetails) {
    throw new Error(r.exceptionDetails.exception?.description ?? 'eval failed');
  }
  return r.result.value;
}

const PROBE = `(() => {
  const de = document.documentElement;
  const vw = de.clientWidth;
  const out = { vw, sw: de.scrollWidth, overflow: de.scrollWidth > vw + 1, offenders: [] };

  if (out.overflow) {
    const seen = new Set();
    document.querySelectorAll('body *').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      if (r.right > vw + 1 || r.left < -1) {
        const cs = getComputedStyle(el);
        if (cs.position === 'fixed') return;
        const key = el.tagName + '.' + (el.className || '').toString().split(' ')[0];
        if (seen.has(key)) return;
        seen.add(key);
        out.offenders.push({
          el: key,
          left: Math.round(r.left),
          right: Math.round(r.right),
          w: Math.round(r.width),
        });
      }
    });
    out.offenders = out.offenders.slice(0, 8);
  }

  // Images that failed to load
  out.brokenImgs = Array.from(document.images)
    .filter((i) => i.complete && i.naturalWidth === 0)
    .map((i) => i.currentSrc || i.src).slice(0, 6);

  // Accessibility spot-checks
  out.a11y = {
    h1: document.querySelectorAll('h1').length,
    imgNoAlt: Array.from(document.images).filter((i) => !i.hasAttribute('alt')).length,
    unnamedControls: Array.from(document.querySelectorAll('a,button')).filter((el) => {
      const n = (el.getAttribute('aria-label') || el.textContent || '').trim();
      return !n;
    }).length,
    lang: document.documentElement.lang,
    skipLink: !!document.querySelector('.skip-link'),
  };

  // Fonts actually in use
  const h1 = document.querySelector('h1');
  out.h1Font = h1 ? getComputedStyle(h1).fontFamily.split(',')[0].replace(/"/g, '') : null;
  out.theme = de.getAttribute('data-theme');

  return out;
})()`;

const A11Y_SCAN = `(() => {
  const issues = [];
  const q = (s) => Array.from(document.querySelectorAll(s));

  // Heading order
  const hs = q('h1,h2,h3,h4,h5,h6').map((h) => +h.tagName[1]);
  for (let i = 1; i < hs.length; i++) {
    if (hs[i] - hs[i - 1] > 1) issues.push('heading skip h' + hs[i-1] + '->h' + hs[i]);
  }

  // Duplicate ids
  const ids = {};
  q('[id]').forEach((el) => {
    ids[el.id] = (ids[el.id] || 0) + 1;
  });
  Object.entries(ids).forEach(([k, v]) => {
    if (v > 1) issues.push('duplicate id: ' + k + ' x' + v);
  });

  // Links with no href or empty
  q('a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === null || href === '') issues.push('empty href link: ' + a.textContent.trim().slice(0, 30));
  });

  return issues.slice(0, 10);
})()`;

(async () => {
  if (!(await waitForCdp())) {
    console.error('CDP did not start');
    child.kill();
    process.exit(1);
  }

  const targets = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json/list`)).json();
  const page = targets.find((t) => t.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((res) => ws.addEventListener('open', res));
  const cdp = new CDP(ws);

  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Network.enable');

  for (const scheme of ['dark', 'light']) {
    console.log(`\n${'='.repeat(72)}`);
    console.log(`THEME: ${scheme.toUpperCase()}`);
    console.log('='.repeat(72));
    console.log(
      `${'width'.padStart(6)} | ${'scrollW'.padStart(7)} | ${'clientW'.padStart(7)} | overflow`,
    );
    console.log('-'.repeat(72));

    for (const w of VIEWPORTS) {
      await cdp.send('Emulation.setDeviceMetricsOverride', {
        width: w,
        height: 900,
        deviceScaleFactor: 1,
        mobile: w < 768,
      });
      await cdp.send('Emulation.setEmulatedMedia', {
        features: [{ name: 'prefers-color-scheme', value: scheme }],
      });
      // Force the theme via the same mechanism the site's toggle uses.
      await cdp.send('Page.navigate', { url });
      await sleep(2600);
      await evaluate(cdp, `document.documentElement.setAttribute('data-theme','${scheme}'); true`);
      await sleep(500);

      const r = await evaluate(cdp, PROBE);
      const flag = r.overflow ? '  ✗ YES' : '  ✓ none';
      console.log(`${String(w).padStart(6)} | ${String(r.sw).padStart(7)} | ${String(r.vw).padStart(7)} |${flag}`);
      if (r.offenders.length) {
        for (const o of r.offenders) {
          console.log(`         └ ${o.el}  left=${o.left} right=${o.right} w=${o.w}`);
        }
      }
      if (w === VIEWPORTS[0] && scheme === 'dark') {
        console.log(`\n  h1 font      : ${r.h1Font}`);
        console.log(`  theme        : ${r.theme}`);
        console.log(`  broken imgs  : ${r.brokenImgs.length ? r.brokenImgs.join(', ') : 'none ✓'}`);
        console.log(`  a11y         : ${JSON.stringify(r.a11y)}`);
        const issues = await evaluate(cdp, A11Y_SCAN);
        console.log(`  structure    : ${issues.length ? issues.join(' | ') : 'clean ✓'}`);
        console.log('');
      }
    }
  }

  ws.close();
  child.kill();
  console.log('\nDone.');
  process.exit(0);
})().catch((e) => {
  console.error('FAILED:', e.message);
  child.kill();
  process.exit(1);
});
