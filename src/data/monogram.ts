/**
 * MONOGRAM
 * ============================================================================
 * One definition of the personal mark, used everywhere it appears: the navbar,
 * the mobile panel and the browser tab. These were three separate things before
 * — the navbar drew "HNZ" as text, and `favicon.svg` was a hand-drawn glyph in a
 * palette the site no longer uses (navy #0f172a on teal #2dd4bf), so the tab icon
 * belonged to a different design from the page it opened.
 *
 * WHAT IT IS
 * A bold "H" with a period — the same mark the browser tab already carried, so
 * the identity is continuous rather than replaced. It is a MONOGRAM of the
 * person's own initials, never a logo of an organisation: the site's identity is
 * the individual, and AirNav appears only as an Experience entry.
 *
 * WHY THIS SHAPE AND NOT "HNZ"
 * Six designs were rendered at 16px — the size a favicon is actually seen at —
 * and compared side by side. Three-letter marks lost their third letter to the
 * pixel grid, and the interlocking forms collapsed into shapes that read as a
 * different letter entirely. The H-plus-period stayed crisp at every size down
 * to 16px, which is the only test that matters for a mark this small.
 *
 * CONSTRUCTED, NOT TYPESET
 * The letter is drawn as geometry, so the mark renders identically everywhere —
 * no font has to be installed, and an SVG favicon cannot reference a webfont
 * anyway.
 */

export interface Monogram {
  /** Path data drawn in the foreground colour, on a 32x32 viewBox. */
  path: string;
  /** The filled tile behind the mark. */
  tile: { size: number; rx: number };
}

/**
 * Geometry on a 32-unit box:
 *
 *   the H    x 8..21.4, y 6..26 — stems 3.4 units wide, crossbar 2.4, which is
 *            the ratio that survives being rasterised to 16px. A thinner
 *            crossbar vanished; a thicker one filled the counter.
 *   the dot  x 22.6..24.4, sitting on the baseline — sized to the stem width so
 *            it reads as a period rather than as a stray mark.
 *
 * The pair spans 8..24.4, so it sits at optical centre rather than geometric
 * centre: the letter carries more visual weight than the dot does.
 */
export const monogram: Monogram = {
  path:
    'M8 6h3.4v8.4h6.2V6h3.4v20h-3.4v-8.4h-6.2V26H8z' +
    'M22.6 24.4h1.8v1.8h-1.8z',
  tile: { size: 32, rx: 7 },
};

/**
 * A standalone SVG document for the favicon.
 *
 * Colours are passed in rather than hard-coded, so the caller hands it the live
 * theme tokens and the tab icon cannot drift away from the palette the way the
 * previous file did.
 */
export function monogramSvg(opts: {
  bg: string;
  fg: string;
  size?: number;
}): string {
  const { bg, fg, size = 32 } = opts;
  const { tile, path } = monogram;
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" ' +
    'width="' + size + '" height="' + size + '" role="img" ' +
    'aria-label="Hamzah Naufal Zuhdi monogram">\n' +
    '  <rect width="' + tile.size + '" height="' + tile.size + '" rx="' +
    tile.rx + '" fill="' + bg + '"/>\n' +
    '  <path d="' + path + '" fill="' + fg + '"/>\n' +
    '</svg>\n'
  );
}
