#!/usr/bin/env node
/**
 * Generates the placeholder SVG assets used across the site.
 *
 * Why generated rather than hand-written: there are ~20 of them, they must all
 * look consistent, and re-running this script is how you regenerate them if the
 * wording changes.
 *
 * These are DELIBERATELY OBVIOUS placeholders — a dashed frame, a diagonal hatch,
 * a "PLACEHOLDER" label and the intended real-image dimensions. They must never
 * be mistakable for a real project screenshot.
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, '..', 'public', 'images', 'placeholders');

const SIZES = {
  '16/9': [1280, 720],
  '4/3': [1000, 750],
  '1/1': [800, 800],
  '3/4': [800, 1067],
};

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Wrap a label onto at most `max` characters per line. */
function wrap(text, max) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > max && line) {
      lines.push(line.trim());
      line = w;
    } else {
      line = (line + ' ' + w).trim();
    }
  }
  if (line) lines.push(line.trim());
  return lines;
}

function makeSvg({ label, kind, aspect = '16/9', note }) {
  const [W, H] = SIZES[aspect] ?? SIZES['16/9'];
  const labelLines = wrap(label, Math.floor(W / 20));
  const lineH = Math.round(H * 0.062);
  const startY = H / 2 - ((labelLines.length - 1) * lineH) / 2 + H * 0.02;

  const labelText = labelLines
    .map(
      (l, i) =>
        `<text x="${W / 2}" y="${startY + i * lineH}" text-anchor="middle" ` +
        `font-family="'JetBrains Mono', Consolas, monospace" font-size="${Math.round(H * 0.052)}" ` +
        `font-weight="600" fill="#64748b">${esc(l)}</text>`,
    )
    .join('\n    ');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Placeholder image: ${esc(label)}">
  <defs>
    <pattern id="hatch-${kind}" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="14" stroke="#94a3b8" stroke-width="1.25" opacity="0.32"/>
    </pattern>
    <pattern id="dots-${kind}" width="26" height="26" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="1.5" fill="#94a3b8" opacity="0.22"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="#f1f5f9"/>
  <rect width="${W}" height="${H}" fill="url(#dots-${kind})"/>
  <rect width="${W}" height="${H}" fill="url(#hatch-${kind})"/>

  <!-- dashed frame -->
  <rect x="18" y="18" width="${W - 36}" height="${H - 36}" fill="none"
        stroke="#94a3b8" stroke-width="2.5" stroke-dasharray="14 10" opacity="0.75"/>

  <!-- corner ticks -->
  <g stroke="#64748b" stroke-width="4" opacity="0.5">
    <line x1="18" y1="18" x2="70" y2="18"/><line x1="18" y1="18" x2="18" y2="70"/>
    <line x1="${W - 18}" y1="18" x2="${W - 70}" y2="18"/><line x1="${W - 18}" y1="18" x2="${W - 18}" y2="70"/>
    <line x1="18" y1="${H - 18}" x2="70" y2="${H - 18}"/><line x1="18" y1="${H - 18}" x2="18" y2="${H - 70}"/>
    <line x1="${W - 18}" y1="${H - 18}" x2="${W - 70}" y2="${H - 18}"/><line x1="${W - 18}" y1="${H - 18}" x2="${W - 18}" y2="${H - 70}"/>
  </g>

  <!-- badge -->
  <g>
    <rect x="${W / 2 - 96}" y="${H * 0.19}" width="192" height="38" rx="19"
          fill="none" stroke="#94a3b8" stroke-width="2" opacity="0.9"/>
    <text x="${W / 2}" y="${H * 0.19 + 26}" text-anchor="middle"
          font-family="'JetBrains Mono', Consolas, monospace" font-size="19"
          letter-spacing="2.5" fill="#64748b">PLACEHOLDER</text>
  </g>

  <!-- label -->
  ${labelText}

  <!-- note -->
  <text x="${W / 2}" y="${H - Math.round(H * 0.1)}" text-anchor="middle"
        font-family="'JetBrains Mono', Consolas, monospace" font-size="${Math.round(H * 0.032)}"
        fill="#94a3b8">${esc(note ?? `Replace with a real image — ${W}x${H}px (${aspect})`)}</text>
</svg>
`;
}

const ASSETS = [
  ['project-marketing-system', 'Marketing Data Management System', 'project', '16/9'],
  ['project-procurement-dashboard', 'Monitoring Pengadaan Dashboard', 'project', '16/9'],
  ['project-smart-farming', 'Smart Farming / SIMPELDES', 'project', '16/9'],
  ['project-knn-research', 'KNN Creditworthiness Research', 'research', '4/3'],
  ['project-naive-bayes-research', 'Naive Bayes Sentiment Analysis', 'research', '4/3'],
  ['project-guzelev-uiux', 'Guzelev — Home Decor App', 'uiux', '4/3'],
  ['project-wellmind-uiux', 'WellMind — Mental Health App', 'uiux', '4/3'],
  ['project-kedai-nyam-uiux', 'Kedai Nyam — Snack Store App', 'uiux', '4/3'],

  ['publication-ijirse-knn', 'IJIRSE — KNN Creditworthiness', 'publication', '4/3'],
  ['publication-ijirse-naive-bayes', 'IJIRSE — iPusnas Sentiment Analysis', 'publication', '4/3'],
  ['publication-smart-farming', 'AMPOEN — Smart Farming', 'publication', '4/3'],

  ['cert-myskill-looker-studio', 'MySkill — Google Looker Studio', 'certificate', '4/3'],
  ['cert-myskill-business', 'MySkill — Business', 'certificate', '4/3'],
  ['cert-myskill-basic-data', 'MySkill — Basic Data', 'certificate', '4/3'],
  ['cert-dqlab-data-science', 'DQLab — Intro to Data Science', 'certificate', '4/3'],
  ['cert-dicoding-pemrograman', 'Dicoding — Programming Fundamentals', 'certificate', '4/3'],
  ['cert-dicoding-karier', 'Dicoding — Software Developer Career', 'certificate', '4/3'],
  ['cert-cisco-ccnav7', 'Cisco — CCNAv7: Intro to Networks', 'certificate', '4/3'],
  ['cert-cisco-ccna', 'Cisco — CCNA: Intro to Networks', 'certificate', '4/3'],
  ['cert-cisco-it-support', 'Cisco — IT Customer Support Basics', 'certificate', '4/3'],
  ['cert-oracle-java', 'Oracle Academy — Java Fundamentals', 'certificate', '4/3'],

  ['portrait', 'Profile photo', 'portrait', '3/4'],
];

mkdirSync(OUT, { recursive: true });

for (const [name, label, kind, aspect] of ASSETS) {
  const svg = makeSvg({
    label,
    kind,
    aspect,
    note:
      kind === 'certificate'
        ? 'Replace with the certificate scan'
        : kind === 'portrait'
          ? 'Replace with a professional photo'
          : undefined,
  });
  writeFileSync(join(OUT, `${name}.svg`), svg, 'utf8');
}

console.log(`Generated ${ASSETS.length} placeholder SVGs in ${OUT}`);
