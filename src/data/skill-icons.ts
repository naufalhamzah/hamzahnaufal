/**
 * Maps a short icon key (used in `src/data/skills.ts`) to an inline SVG.
 *
 * INLINE SVG, not image files: no extra requests, no broken-image states, no
 * layout shift, icons inherit `currentColor` (one file works in both themes), and
 * the build stays fully static.
 *
 * TWO SOURCES: `simple-icons` official brand marks, and a hand-drawn local set for
 * brands it omits (Tableau, Adobe, Microsoft Office, Canva). The local marks are
 * simple geometric glyphs, NOT imitations of the real logos.
 *
 * An unknown key is safe: `getSkillIcon()` returns null and the component renders
 * a text-only chip.
 */

import {
  siPython,
  siMysql,
  siOpenjdk,
  siCplusplus,
  siJavascript,
  siGoogleappsscript,
  siFigma,
  siGithub,
  siGit,
  siGooglesheets,
  siGoogledrive,
  siGoogledocs,
  siLooker,
  siZoom,
  siObsstudio,
  siEspressif,
  siCisco,
  siArduino,
  siGooglecolab,
} from 'simple-icons';

export interface SkillIcon {
  /** SVG path data on a 24x24 viewBox. */
  path: string;
  /** Official brand colour, or null to inherit the theme's foreground. */
  hex: string | null;
  /** 'brand' = official mark; 'local' = our own drawn fallback. */
  kind: 'brand' | 'local';
}

/* Local fallbacks */
/**
 * Simple geometric marks for brands whose official logos are not redistributable,
 * drawn from basic shapes inside a 24x24 box — deliberately generic so they read
 * as a category marker, not a counterfeit trademark.
 */
const LOCAL: Record<string, SkillIcon> = {
  // Tableau — three stacked bars suggestion
  tableau: {
    kind: 'local',
    hex: null,
    path:
      'M12 3.6h1.35v3.2h3.2v1.35h-3.2v3.2H12v-3.2H8.8V6.8H12V3.6z' +
      'M5.9 10.9h1.1v2.4h2.4v1.1H7v2.4H5.9v-2.4H3.5v-1.1h2.4v-2.4z' +
      'M17 12.6h1.1v2.3h2.3v1.1h-2.3v2.3H17v-2.3h-2.3v-1.1H17v-2.3z' +
      'M12 14.6h1.2v2.7h2.7v1.2h-2.7v2.7H12v-2.7H9.3v-1.2H12v-2.7z',
  },
  // Excel — grid/table mark
  excel: {
    kind: 'local',
    hex: null,
    path:
      'M3.5 4.5h17v15h-17v-15zm2 1.9v11.2h13V6.4h-13zm1.5 1.5h4v4h-4v-4zm5 0h4.5v1.4H12V7.9zm0 2.6h4.5v1.4H12V10.5zm-5 2.6h4v1.4h-4v-1.4zm0 3h4v1.4h-4v-1.4zm5 -2.2h4.5v1.4H12v-1.4zm0 3h4.5v1.4H12v-1.4z',
  },
  // Word — document with text lines
  word: {
    kind: 'local',
    hex: null,
    path:
      'M5.5 2.8h8.6l4.4 4.4v14H5.5V2.8zm1.8 1.8v15h9.4V8.2l-3.4-3.6H7.3zm1.4 4.6h6.6v1.5H8.7V9.2zm0 3.1h6.6v1.5H8.7v-1.5zm0 3.1h4.4v1.5H8.7v-1.5z',
  },
  // PowerPoint — screen/presentation mark
  powerpoint: {
    kind: 'local',
    hex: null,
    path:
      'M3.5 4h17v11.5h-8.3l3 3.6h-2.4l-2.8-3.6h-1l-2.8 3.6H4.8l3-3.6H3.5V4zm1.9 1.9v7.7h13.2V5.9H5.4zm2.4 1.2h3.1a2.2 2.2 0 0 1 0 4.4H9.7v1.4H7.8V7.1zm1.9 1.5v1.4h1.2a0.7 0.7 0 0 0 0-1.4H9.7z',
  },
  // Photoshop — aperture-style aperture mark
  photoshop: {
    kind: 'local',
    hex: null,
    path:
      'M3.6 3.6h16.8v16.8H3.6V3.6zm1.8 1.8v13.2h13.2V5.4H5.4zm2.4 2.5h3.5a2.6 2.6 0 0 1 0 5.2H9.6v2.3H7.8V7.9zm1.8 1.6v2h1.7a1 1 0 0 0 0-2H9.6zm5.2 -0.6h1.7v1.1a1.6 1.6 0 0 1 1.4-1.1h.6v1.7h-.7a1.2 1.2 0 0 0-1.2 1.2v4.4h-1.8V8.9z',
  },
  // Lightroom — concentric square/lens mark
  lightroom: {
    kind: 'local',
    hex: null,
    path:
      'M3.6 3.6h16.8v16.8H3.6V3.6zm1.8 1.8v13.2h13.2V5.4H5.4zm2.4 2.4h1.8v8h4.4v1.6H7.8V7.8zm6.6 0.6h1.8v1.2a1.8 1.8 0 0 1 1.6-1.3h.5v1.8h-.6a1.3 1.3 0 0 0-1.3 1.3v4.6h-1.9V8.4z',
  },
  // Canva — rounded frame mark
  canva: {
    kind: 'local',
    hex: null,
    path:
      'M12 2.4A9.6 9.6 0 1 0 21.6 12 9.6 9.6 0 0 0 12 2.4zm0 1.8A7.8 7.8 0 1 1 4.2 12 7.8 7.8 0 0 1 12 4.2zm-1.4 3.9c-1.4 0-2.6 1.3-3.2 3.1-.5 1.5-.5 2.7-.1 3.3.3.5.9.7 1.6.5 1.1-.3 2.2-1.2 3-2.4l.6-1-1.1-.5c-.4.7-.9 1.3-1.4 1.5-.2.1-.4.1-.5 0-.2-.3-.1-1 .2-1.8.4-1.1 1.1-1.9 1.8-2 .3-.1.5 0 .6.2l.1.3 1.1-.6-.2-.4c-.3-.4-.8-.6-1.4-.6a3 3 0 0 0-.8.1zm4.9 1.5a1 1 0 1 0 1 1 1 1 0 0 0-1-1z',
  },
  // Data visualisation — bar chart
  dataviz: {
    kind: 'local',
    hex: null,
    path:
      'M3.4 20.6h17.2v1.6H3.4v-1.6zM5.2 12.4h2.9v6.6H5.2v-6.6zM10.1 7.2h2.9v11.8h-2.9V7.2zM15 14.6h2.9v4.4H15v-4.4z',
  },
  // Data processing & validation — document with a tick
  datacheck: {
    kind: 'local',
    hex: null,
    path:
      'M4 3.6h11.2l4.8 4.8v12H4V3.6zm1.8 1.8v13.2h12.4V9.2l-3.8-3.8H5.8zM7.4 14.2l1.3-1.3 2 2 4.4-4.4 1.3 1.3-5.7 5.7-3.3-3.3z',
  },
  // Networking fundamentals — three nodes joined by edges
  network: {
    kind: 'local',
    hex: null,
    path:
      'M12 2.6a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8zm-6.6 14a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8zm13.2 0a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8zM11.1 8.1v3.3H6.6v4.3h1.8v-2.5h3.1v2.5H11v4.1h2V8.1h-1.9zm2.9 5.1v2.5h2.6V11.4h-2.6v1.8z',
  },
  // Technical documentation — document with text lines
  documentation: {
    kind: 'local',
    hex: null,
    path:
      'M5.6 2.6h9l4.4 4.4v14.4H5.6V2.6zm1.8 1.8v15.2h9.8V8.2l-3.4-3.6H7.4zM9 11h6.6v1.6H9V11zm0 3.4h6.6V16H9v-1.6zm0 3.4h4.2v1.6H9v-1.6z',
  },
  // K-Nearest Neighbors — a point linked to its two nearest neighbours
  knn: {
    kind: 'local',
    hex: null,
    path:
      'M12 2.8a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4zM5.4 16.8a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4zm13.2 0a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4zM11 7.4l-.6 1.6-4.4 7.6 1.5.9 4.4-7.6.6-2.5H11zm2 0 .6 2.5 4.4 7.6-1.5.9-4.4-7.6-.6-1.6H13z',
  },
  // Naive Bayes — a distribution histogram
  bayes: {
    kind: 'local',
    hex: null,
    path:
      'M2.6 20.4h18.8v1.6H2.6v-1.6zM3.2 16h2.2v4H3.2V16zM6.2 13h2.2v7H6.2V13zM9.2 8.8h2.2v11.2H9.2V8.8zM12.2 8.8h2.2v11.2H12.2V8.8zM15.2 13h2.2v7H15.2V13zM18.2 16h2.2v4H18.2V16z',
  },
  // SVM — two classes separated by a decision boundary
  svm: {
    kind: 'local',
    hex: null,
    path:
      'M2.6 11.2h18.8v1.6H2.6v-1.6zM3.4 3.6h3v3h-3v-3zM8 4.8h3v3H8v-3zM5 7.2h3v3H5v-3zM13 14h3v3h-3v-3zM17.6 15.2h3v3h-3v-3zM14.6 17.6h3v3h-3v-3z',
  },
  // Transformer model — four attention blocks joined
  transformer: {
    kind: 'local',
    hex: null,
    path:
      'M3.4 3.6h6.2v6.2H3.4V3.6zm11 0h6.2v6.2h-6.2V3.6zm-11 11h6.2v6.2H3.4v-6.2zm11 0h6.2v6.2h-6.2v-6.2zM10.4 6.7h3.2v1.6h-3.2V6.7zm0 9.4h3.2v1.6h-3.2v-1.6zM6.7 10.4v3.2H8.3v-3.2H6.7zm9.4 0v3.2h1.6v-3.2h-1.6z',
  },
  // Model evaluation — a gauge / dial
  evaluation: {
    kind: 'local',
    hex: null,
    path:
      'M12 3.2a8.8 8.8 0 1 0 0 17.6 8.8 8.8 0 0 0 0-17.6zm0 1.8a7 7 0 0 1 7 7h-7V5zm-1.8.4v8.4h8.4a7 7 0 0 1-8.4 8.4 7 7 0 0 1 0-16.8z',
  },
  // Confusion matrix analysis — a 2x2 matrix
  confusion: {
    kind: 'local',
    hex: null,
    path:
      'M3.4 3.6h17.2v17.2H3.4V3.6zm1.8 1.8v6h6v-6h-6zm7.8 0v6h6v-6h-6zm-7.8 7.8v6h6v-6h-6zm7.8 0v6h6v-6h-6z',
  },
  // Systems analysis — a decomposition tree
  systems: {
    kind: 'local',
    hex: null,
    path:
      'M10 2.4h4v3.4h-4V2.4zM11.2 5.8h1.6v3.4h-1.6V5.8zM5.6 9.2h12.8v1.6H5.6V9.2zM5.6 10.8h1.6v1.8H5.6v-1.8zM16.8 10.8h1.6v1.8h-1.6v-1.8zM3.4 12.6h5.6v4.2H3.4v-4.2zM15 12.6h5.6v4.2H15v-4.2z',
  },
  // Process improvement — a rising trend with a baseline
  improve: {
    kind: 'local',
    hex: null,
    path:
      'M4 19.4h16v1.6H4v-1.6zM6.6 16.2l3-3 2.4 2.4 5.4-5.4-1.3-1.3-4.1 4.1-2.4-2.4-4.3 4.3 1.3 1.3zM14.6 6.4h4.4v4.4h-1.8V9.5l-1.5 1.5-1.3-1.3 1.5-1.5h-1.3V6.4z',
  },
  // Requirements documentation — a checklist document
  requirements: {
    kind: 'local',
    hex: null,
    path:
      'M4.6 3.4h14.8v17.2H4.6V3.4zm1.8 1.8v13.6h11.2V5.2H6.4zM8 7.2h5.6v1.6H8V7.2zm0 3.6h8v1.6H8v-1.6zm0 3.6h8v1.6H8v-1.6zM15.6 15.2l1.2 1.2 2.2-2.2 1.2-1.2',
  },
  // UI/UX design — a screen with layout blocks
  uiux: {
    kind: 'local',
    hex: null,
    path:
      'M3.4 4h17.2v13.2h-7.6l3.2 3.4h-2.3l-3.2-3.4h-1l-3.2 3.4H3.9l3.2-3.4H3.4V4zm1.8 1.8v9.6h13.6V5.8H5.2zm2 2h3.4v3.4H7.2V7.8zm4.6 0h5v1.5h-5V7.8zm0 2.7h5v1.5h-5v-1.5zM7.2 12.6h9.6v1.4H7.2v-1.4z',
  },
  // Technical reporting — a report with bulleted content
  techreport: {
    kind: 'local',
    hex: null,
    path:
      'M5.6 2.6h9l4.4 4.4v14.4H5.6V2.6zm1.8 1.8v15.2h9.8V8.2l-3.4-3.6H7.4zM9 10.6h1.6v1.6H9v-1.6zm3 0h3.6v1.6H12v-1.6zm-3 3.4h1.6v1.6H9v-1.6zm3 0h3.6v1.6H12v-1.6zM9 14h6.6v3.2H9V14z',
  },
  // Scientific article writing — a structured paper / hexagon node
  scientific: {
    kind: 'local',
    hex: null,
    path:
      'M12 2.4l9.6 5.4v8.4L12 21.6 2.4 16.2V7.8L12 2.4zm0 2.1L4.2 8.7v6.6L12 19.5l7.8-4.2V8.7L12 4.5zM9.2 9.4h5.6v5.2H9.2V9.4z',
  },
  // Popular article writing — an article layout with a standfirst
  popular: {
    kind: 'local',
    hex: null,
    path:
      'M4.2 4.4h15.6v12.2H4.2V4.4zm1.8 1.8v8.6h12V6.2H6zm2 1.6h8v1.5H8V7.8zm0 2.6h8v1.5H8v-1.5zm-2 9.4h12.4v1.6H6V19.8zM8.6 19.8h6.8v1.6H8.6v-1.6z',
  },
  // Hardware & IT support (PC) — a desktop computer
  pc: {
    kind: 'local',
    hex: null,
    path:
      'M3.4 4h17.2v11.2H3.4V4zm1.8 1.8v7.6h13.6V5.8H5.2zm-1.6 11.4h17.6v1.6H3.6v-1.6zm3.2 2.6h10.4v1.6H6.8v-1.6z',
  },
  // Device troubleshooting — a wrench
  wrench: {
    kind: 'local',
    hex: null,
    path:
      'M15.4 2.6a6 6 0 0 0-5.6 8.1L2.6 17.9l3.5 3.5 7.2-7.2a6 6 0 0 0 8.1-5.6 6 6 0 0 0-1.2-3.6l-3.4 3.4-2.6-.6-.6-2.6 3.4-3.4a6 6 0 0 0-1.6-.2z',
  },
  // Windows environment — the Windows four-pane mark
  windows: {
    kind: 'local',
    hex: null,
    path:
      'M3.2 5.4l7.6-1v7.4H3.2V5.4zm8.6-1.2L20.8 3v8.8h-9V4.2zM3.2 12.8h7.6v7.4l-7.6-1v-6.4zm8.6 0h9V21l-9-1.2v-7z',
  },
  // Microsoft Office Suite — four application panels
  officesuite: {
    kind: 'local',
    hex: null,
    path:
      'M2.4 4.4h9.2v6.2H2.4V4.4zm1.5 1.5v3.2h6.2V5.9H3.9zM12.8 3.2h8.8v7.4h-8.8V3.2zm1.5 1.5v4.4h5.8V4.7h-5.8zM2.4 12.4h9.2v7.4H2.4v-7.4zm1.5 1.5v4.4h6.2v-4.4H3.9zM13.6 12.6h7.2v6.6h-7.2v-6.6zm1.5 1.5v3.6h4.2v-3.6h-4.2z',
  },
  /*
    CapCut — a ring with a play mark (the video-editor category). simple-icons
    ships no CapCut mark, and the rule for these fallbacks is a GENERIC category
    glyph rather than a counterfeit trademark. Replaces a bar chart, which said
    "analytics" and had nothing to do with the tool.
  */
  capcut: {
    kind: 'local',
    hex: null,
    path:
      'M21.8 12A9.8 9.8 0 1 1 2.2 12A9.8 9.8 0 1 1 21.8 12ZM18.2 12A6.2 6.2 0 1 0 5.8 12A6.2 6.2 0 1 0 18.2 12ZM10.7 8.8 15.9 12l-5.2 3.2z',
  },
};

/* Registry */

/**
 * simple-icons ships single-path marks plus a brand colour.
 *
 * DARK-MARK FIX: several official marks are near-black — Java (#000000), GitHub
 * (#181717), OBS Studio (#302E31) — and disappear on a near-black canvas when
 * painted with `fill: #000000`, leaving a tile that looks empty while still being
 * "correct" data. Any brand colour too dark to read (< 0.12 relative luminance) is
 * dropped to `null`, which the tile renders as `currentColor`.
 */
function isTooDark(hex: string): boolean {
  const h = hex.replace('#', '');
  if (h.length !== 6) return false;
  const chan = (v: number) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  const r = chan(parseInt(h.slice(0, 2), 16));
  const g = chan(parseInt(h.slice(2, 4), 16));
  const b = chan(parseInt(h.slice(4, 6), 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.12;
}

function brand(icon: { path: string; hex: string }): SkillIcon {
  return {
    path: icon.path,
    hex: isTooDark(icon.hex) ? null : `#${icon.hex}`,
    kind: 'brand',
  };
}

const REGISTRY: Record<string, SkillIcon> = {
  /* ---- Data & analytics ---- */
  looker: brand(siLooker),
  sheets: brand(siGooglesheets),
  ...LOCAL,

  /* ---- Programming & compute ---- */
  colab: brand(siGooglecolab),

  /* ---- Hardware ---- */
  espressif: brand(siEspressif),
  arduino: brand(siArduino),

  /* ---- Networking & security ---- */
  cisco: brand(siCisco),

  /* ---- Programming ---- */
  python: brand(siPython),
  java: brand(siOpenjdk),
  cpp: brand(siCplusplus),
  javascript: brand(siJavascript),
  appsscript: brand(siGoogleappsscript),
  // No dedicated SQL mark ships with simple-icons; MySQL is the closest
  // database brand and is a fair stand-in for the "SQL" skill.
  sql: brand(siMysql),

  /* ---- Design ---- */
  figma: brand(siFigma),

  /* ---- Collaboration & tooling ---- */
  github: brand(siGithub),
  git: brand(siGit),
  gdrive: brand(siGoogledrive),
  gdocs: brand(siGoogledocs),
  obs: brand(siObsstudio),
  zoom: brand(siZoom),
  // Draw.io has no official simple-icons mark. It gets its OWN drawn glyph
  // (a node-and-edge diagram) rather than borrowing the Canva glyph.
  drawio: {
    kind: 'local',
    hex: null,
    path:
      'M6 3.5h5.2v3.2H6V3.5zm7.6 9.3h5.4v3.2h-5.4v-3.2zM2.8 17.3h5.4v3.2H2.8v-3.2z' +
      'M8.6 5.1h4.8v1.3H8.6V5.1zm4.2 1.3h1.3v8.4h-1.3V6.4zM8.3 14.8h4.5v1.3H8.3v-1.3z' +
      'M7.9 16.1h1.3v3h-1.3v-3z',
  },
};

/**
 * Resolve an icon key. Returns null for an unknown key or an explicit null —
 * callers render a text-only chip. Never throws, so a typo cannot break the build.
 */
export function getSkillIcon(key: string | null | undefined): SkillIcon | null {
  if (!key) return null;
  return REGISTRY[key] ?? null;
}

/** All keys that actually resolve — useful for a quick sanity check. */
export const availableIconKeys = Object.keys(REGISTRY);
