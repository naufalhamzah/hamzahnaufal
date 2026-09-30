/**
 * SKILL ICON REGISTRY
 * ============================================================================
 * Maps a short icon key (used in `src/data/skills.ts`) to an inline SVG.
 *
 * WHY INLINE SVG RATHER THAN IMAGE FILES:
 *   - no extra network requests, no broken-image states, no layout shift
 *   - icons inherit `currentColor`, so one file works in both themes
 *   - the build stays fully static
 *
 * TWO SOURCES:
 *   1. `simple-icons` — official brand marks (MIT-licensed icon data) for
 *      brands that publish one. Pulled at build time.
 *   2. A hand-drawn local set for brands simple-icons does not ship. It
 *      deliberately omits several trademarks (Tableau, Adobe, Microsoft Office,
 *      Canva), so those get a monogram-style glyph instead. They are drawn as
 *      simple geometric marks, NOT as imitations of the real logos.
 *
 * USING A MISSING KEY is safe: `getSkillIcon()` returns null and the component
 * renders a text-only chip.
 * ============================================================================
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
} from 'simple-icons';

export interface SkillIcon {
  /** SVG path data on a 24x24 viewBox. */
  path: string;
  /** Official brand colour, or null to inherit the theme's foreground. */
  hex: string | null;
  /** 'brand' = official mark; 'local' = our own drawn fallback. */
  kind: 'brand' | 'local';
}

/* -------------------------------------------------------------------------- */
/* Local fallbacks                                                            */
/* -------------------------------------------------------------------------- */
/**
 * Simple geometric marks for brands whose official logos are not redistributable.
 * Each is drawn from basic shapes inside a 24x24 box. They are intentionally
 * generic so they read as a category marker, not a counterfeit trademark.
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
  // CapCut — simple play/clip mark
  capcut: {
    kind: 'local',
    hex: null,
    path:
      'M4.2 3.6h9.1v4.2H8.4v3.6h4.9v4.2H8.4v4.8H4.2V3.6zm10.5 6.4h2.5v10.4h-2.5V10zm4.1 -2.2h1v12.6h-1V7.8z',
  },
};

/* -------------------------------------------------------------------------- */
/* Registry                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * simple-icons ships single-path marks plus a brand colour.
 *
 * DARK-MARK FIX: several official marks are near-black — Java (#000000),
 * GitHub (#181717), OBS Studio (#302E31). Painted with `fill: #000000` on a
 * near-black canvas they disappear completely, which is how a tile ends up
 * looking empty while still being "correct" data. Any brand colour too dark to
 * read is dropped to `null`, which the tile renders as `currentColor` and
 * therefore inherits the theme's foreground. The mark keeps its silhouette and
 * stays visible in both themes.
 *
 * Threshold: relative luminance below 0.12 is unreadable on the dark canvas.
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
  // (a node-and-edge diagram) rather than borrowing another brand's mark —
  // the previous entry aliased the Canva glyph, which showed the wrong logo.
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
 * Resolve an icon key.
 * Returns null for an unknown key or an explicit null — callers render a
 * text-only chip in that case. Never throws, so a typo cannot break the build.
 */
export function getSkillIcon(key: string | null | undefined): SkillIcon | null {
  if (!key) return null;
  return REGISTRY[key] ?? null;
}

/** All keys that actually resolve — useful for a quick sanity check. */
export const availableIconKeys = Object.keys(REGISTRY);
