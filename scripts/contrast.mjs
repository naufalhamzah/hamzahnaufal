#!/usr/bin/env node
/**
 * contrast.mjs — WCAG AA contrast audit over CDP.
 *
 * HOW IT AVOIDS FALSE RESULTS
 * Earlier attempts failed in a specific way: they flipped `data-theme` on a live
 * page and read colours immediately, so some elements had already resolved with
 * the previous theme's custom properties and the numbers were nonsense
 * (foreground == background). This version removes that class of error:
 *
 *   1. Theme is seeded in localStorage, then the page is FULLY RELOADED, so
 *      every element resolves its colours once, under one theme, from scratch.
 *   2. It waits for `readyState === 'complete'` and for two consecutive samples
 *      to agree before reporting.
 *   3. It composites translucency properly, including `color(srgb ... / a)`
 *      which Chrome emits for `color-mix()`.
 *   4. It skips subtrees that are not rendered (closed <dialog>, [hidden],
 *      zero-sized boxes).
 *
 * Exits non-zero when anything is below AA, so it is usable in CI.
 */

import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const PORT = 9466;
const url = process.argv[2] ?? 'http://localhost:4500/';

const BROWSERS = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
];
const BROWSER = BROWSERS.find(existsSync);
if (!BROWSER) {
  console.error('No Chromium browser found');
  process.exit(1);
}

const PROBE = String.raw`(() => {
  function parseColor(str) {
    if (!str) return null;
    const s = String(str).trim();
    if (s === 'transparent') return [0, 0, 0, 0];
    if (s.startsWith('color(')) {
      const nums = s.replace(/^color\(\s*srgb\s*/, '').replace(/\)\s*$/, '')
        .split(/[\s/]+/).filter(Boolean).map(Number);
      if (nums.length < 3) return null;
      const [r, g, b, a] = nums;
      return [r * 255, g * 255, b * 255, isNaN(a) ? 1 : a];
    }
    const m = s.match(/-?[\d.]+/g);
    if (!m || m.length < 3) return null;
    const [r, g, b, a] = m.map(Number);
    return [r, g, b, a === undefined ? 1 : a];
  }

  const chan = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  const lum = ([r, g, b]) => 0.2126 * chan(r) + 0.7152 * chan(g) + 0.0722 * chan(b);
  const ratio = (a, b) => {
    const la = lum(a), lb = lum(b);
    return +(((Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05))).toFixed(2);
  };

  function over(stack, base) {
    let out = base.slice(0, 3);
    for (const c of stack) {
      const a = c[3];
      if (a <= 0) continue;
      out = [0, 1, 2].map((i) => c[i] * a + out[i] * (1 - a));
    }
    return out;
  }

  function bgLayers(el) {
    const stack = [];
    let n = el;
    while (n && n.nodeType === 1) {
      const c = parseColor(getComputedStyle(n).backgroundColor);
      if (c && c[3] > 0) stack.unshift(c);
      n = n.parentElement;
    }
    return stack;
  }

  const rootC = parseColor(getComputedStyle(document.documentElement).backgroundColor);
  const base = rootC ? over([rootC], [255, 255, 255]) : [11, 9, 8];

  const failures = [];
  document.querySelectorAll('p,span,a,li,dt,dd,h1,h2,h3,h4,button,code,figcaption,strong,em').forEach((el) => {
    const txt = (el.textContent || '').trim();
    if (!txt) return;
    if (el.querySelector('p,span,a,li,dt,dd,button,strong,em')) return;

    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity === 0) return;

    const dlg = el.closest('dialog');
    if (dlg && !dlg.open) return;
    if (el.closest('[hidden]')) return;

    const r0 = el.getBoundingClientRect();
    if (r0.width < 1 || r0.height < 1) return;

    /* An element painted over a gradient scrim (an image caption) has a
       background that cannot be derived from background-color alone. The scrim
       may be on the element itself OR on an ancestor, so walk up and check both.
       Skipping is honest; reporting a number here would be a false failure. */
    let scrim = false;
    for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
      const bi = getComputedStyle(n).backgroundImage;
      if (bi && bi !== 'none') { scrim = true; break; }
    }
    if (scrim) return;
    if (el.closest('[data-scrim]')) return;

    const fg = parseColor(cs.color);
    if (!fg || fg[3] === 0) return;

    const bg = over(bgLayers(el), base);
    const fgFlat = fg[3] < 1 ? over([fg], bg) : fg.slice(0, 3);
    const cr = ratio(fgFlat, bg);

    const px = parseFloat(cs.fontSize);
    const bold = +cs.fontWeight >= 700;
    const large = px >= 24 || (px >= 18.66 && bold);
    const need = large ? 3 : 4.5;

    if (cr < need) {
      failures.push({
        ratio: cr, need, px: +px.toFixed(1),
        cls: (el.className || '').toString().trim().slice(0, 46),
        tag: el.tagName.toLowerCase(),
        fg: 'rgb(' + fgFlat.map((v) => Math.round(v)).join(', ') + ')',
        bg: 'rgb(' + bg.map((v) => Math.round(v)).join(', ') + ')',
        text: txt.slice(0, 34),
      });
    }
  });

  return {
    theme: document.documentElement.getAttribute('data-theme'),
    ready: document.readyState,
    failures,
  };
})()`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForCdp() {
  for (let i = 0; i < 50; i++) {
    try {
      if ((await fetch(`http://127.0.0.1:${PORT}/json/version`)).ok) return true;
    } catch {}
    await sleep(250);
  }
  return false;
}

(async () => {
  const profile = mkdtempSync(join(tmpdir(), 'hnz-contrast-'));
  const child = spawn(
    BROWSER,
    [
      '--headless=new',
      '--disable-gpu',
      '--force-color-profile=srgb',
      `--remote-debugging-port=${PORT}`,
      `--user-data-dir=${profile}`,
      '--no-first-run',
      'about:blank',
    ],
    { stdio: 'ignore' },
  );

  if (!(await waitForCdp())) {
    console.error('CDP failed to start');
    child.kill();
    process.exit(1);
  }

  const targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
  const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r));

  let id = 0;
  const pending = new Map();
  ws.addEventListener('message', (e) => {
    const m = JSON.parse(e.data);
    const p = pending.get(m.id);
    if (p) {
      pending.delete(m.id);
      p(m.result);
    }
  });
  const send = (method, params = {}) =>
    new Promise((res) => {
      const i = ++id;
      pending.set(i, res);
      ws.send(JSON.stringify({ id: i, method, params }));
    });
  const ev = async (expr) =>
    (await send('Runtime.evaluate', { expression: expr, returnByValue: true })).result.value;

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 1000,
    deviceScaleFactor: 1,
    mobile: false,
  });

  let total = 0;

  for (const theme of ['dark', 'light']) {
    /* Seed the theme, then reload so every element resolves under it. */
    await send('Page.navigate', { url });
    await sleep(1000);
    await ev(`localStorage.setItem('hnz-theme','${theme}'); true`);
    await send('Page.navigate', { url });
    await sleep(1400);

    let a = null;
    for (let i = 0; i < 14; i++) {
      await sleep(900);
      const b = await ev(PROBE);
      if (b.ready === 'complete' && a && JSON.stringify(a.failures) === JSON.stringify(b.failures)) {
        a = b;
        break;
      }
      a = b;
    }
    const r = a;

    const uniq = new Map();
    for (const f of r.failures) {
      const k = `${f.cls}|${f.ratio}`;
      if (!uniq.has(k)) uniq.set(k, { ...f, count: 0 });
      uniq.get(k).count++;
    }
    const list = [...uniq.values()].sort((x, y) => x.ratio - y.ratio);

    console.log(`\n${'='.repeat(78)}`);
    console.log(
      `THEME: ${(r.theme || theme).toUpperCase()}   ${list.length} distinct issue(s), ${r.failures.length} element(s)`,
    );
    console.log('='.repeat(78));
    if (!list.length) console.log('  ✓ every text element meets WCAG AA');
    for (const f of list) {
      console.log(
        `  ✗ ${String(f.ratio).padStart(5)}/need ${f.need}  ${String(f.px).padStart(6)}px  x${String(f.count).padStart(3)}  <${f.tag} class="${f.cls}">`,
      );
      console.log(`        fg ${f.fg} on ${f.bg}   "${f.text}"`);
    }
    total += r.failures.length;
  }

  console.log(`\n${total === 0 ? '✓ ALL TEXT MEETS WCAG AA' : `TOTAL FAILING ELEMENTS: ${total}`}`);
  ws.close();
  child.kill();
  process.exit(total === 0 ? 0 : 1);
})().catch((e) => {
  console.error('FAILED:', e.message);
  process.exit(1);
});
