/**
 * MONOGRAM — one definition of the personal mark, used everywhere it appears: the
 * navbar, the mobile panel and the browser tab.
 *
 * A serif "H" carrying a rose flourish and a period, traced from the author's
 * artwork. It is a MONOGRAM of the person's own initial, never a logo of an
 * organisation.
 *
 * TWO PATHS, NOT ONE: the artwork is two colours (a cream letter and a rose
 * flourish) and a single flat path could carry only one. On the wine tile the
 * flourish in its original rose measures 2.12:1, under the 3:1 WCAG 1.4.11 asks of
 * a graphic; split into two paths it takes `--on-solid-soft` (wine-300) at 4.42:1.
 *
 * TRACED, NOT RESAMPLED: the source is a 1254px raster on a solid ground, which
 * would carry its ground as a black box on the ivory theme and stair-step at 16px.
 * The outline is vector geometry instead — potrace over two colour masks, curves
 * whose bounding box touches all four edges dropped (potrace's first curve is the
 * canvas border, and painting it buries the artwork). Geometry is normalised to a
 * 32-unit tile so an SVG favicon renders identically to the navbar.
 *
 * Judged at 16px, the size a favicon is seen at: the flourish reads as a warm
 * accent rather than a shape (acceptable); the letter stays legible from 16px up.
 */

export interface Monogram {
  /** The letter, on a 32x32 viewBox. */
  h: string;
  /** The flourish and the period -- drawn over the letter, as in the source. */
  flourish: string;
  /** The filled tile behind the mark. */
  tile: { size: number; rx: number };
}

export const monogram: Monogram = {
  h:
    'M9.12 24.86C12.4 24.86 12.43 24.86 12.43 24.77C12.43 24.72 12.42 24.68 12.41 24.68C12.39 24.68 12.15 24.62 11.87 24.54C10.9 24.28 10.42 23.97 10.15 23.45C9.89 22.96 9.89 22.96 9.89 19.05L9.89 15.47L9.77 15.5C9.71 15.51 9.43 15.63 9.15 15.77C8.67 16 8.11 16.38 7.75 16.72C7.48 16.97 6.87 17.71 6.72 17.97C6.62 18.14 6.65 17.97 6.82 17.48C7.32 16.05 8.27 14.81 9.48 14.02C9.75 13.85 9.86 13.75 9.87 13.66C9.89 13.6 9.89 12.7 9.87 11.66C9.84 9.03 9.9 8.61 10.32 8.13C10.59 7.82 10.89 7.69 11.83 7.44C12.25 7.33 12.41 7.27 12.42 7.21C12.43 7.14 12.12 7.14 8.22 7.14C4.04 7.14 4 7.14 4 7.23C4 7.29 4.04 7.33 4.13 7.35C4.78 7.49 5.37 7.66 5.61 7.77C5.92 7.92 6.25 8.2 6.36 8.42C6.56 8.82 6.56 8.82 6.56 15.82C6.56 20.15 6.55 22.56 6.52 22.75C6.4 23.45 6.07 23.91 5.48 24.22C5.27 24.32 4.62 24.55 4.06 24.71C4.03 24.72 4 24.75 4 24.79C4 24.85 4.13 24.86 4.81 24.87C5.26 24.88 5.67 24.88 5.72 24.88C5.77 24.87 7.3 24.86 9.12 24.86ZM22.65 24.86C24.44 24.86 24.52 24.86 24.52 24.78C24.52 24.71 24.43 24.67 24.07 24.58C22.87 24.26 22.37 23.89 22.13 23.12C21.97 22.59 21.95 21.74 21.97 15.43C21.98 10.02 21.99 9.37 22.06 9.09C22.22 8.41 22.55 7.96 23.07 7.71C23.22 7.65 23.63 7.51 24 7.42C24.54 7.29 24.66 7.24 24.66 7.17C24.66 7.1 24.46 7.09 20.28 7.09L15.9 7.09L15.92 7.19C15.93 7.28 16 7.31 16.53 7.42C17.45 7.61 17.79 7.74 18.14 8.07C18.38 8.29 18.49 8.49 18.6 8.89C18.66 9.14 18.67 9.6 18.69 12.88L18.71 16.58L19.01 16.78C19.53 17.11 19.9 17.29 20.35 17.45C20.73 17.58 20.85 17.6 21.28 17.6C21.55 17.6 21.75 17.62 21.73 17.63C21.68 17.68 21.07 17.89 20.79 17.97C20.32 18.08 19.67 18.14 19.15 18.11L18.66 18.07L18.64 20.34C18.62 22.75 18.61 22.87 18.38 23.37C18.09 23.98 17.45 24.36 16.28 24.62C15.98 24.68 15.91 24.71 15.91 24.78C15.91 24.86 16.02 24.86 18.19 24.88C19.44 24.88 20.54 24.88 20.63 24.88C20.71 24.87 21.63 24.86 22.65 24.86Z',
  flourish:
    'M26.91 24.71C27.64 24.36 28.04 23.68 27.99 22.89C27.9 21.35 26.04 20.6 24.89 21.64C24.48 22.01 24.32 22.36 24.3 22.94C24.28 23.3 24.3 23.42 24.38 23.63C24.58 24.18 24.92 24.52 25.47 24.76C25.7 24.85 25.79 24.86 26.19 24.85C26.58 24.84 26.69 24.82 26.91 24.71ZM20.1 18.08C20.33 18.06 20.64 18 20.79 17.97C21.07 17.89 21.68 17.68 21.73 17.63C21.75 17.62 21.55 17.6 21.28 17.6C20.85 17.6 20.73 17.58 20.34 17.45C19.65 17.21 19.14 16.9 17.88 15.95C16.52 14.93 15.61 14.4 14.65 14.09C13.95 13.86 13.36 13.77 12.59 13.77C10.42 13.77 8.54 14.92 7.24 17.02C7.1 17.24 6.95 17.51 6.89 17.63L6.79 17.83L6.9 17.7C7.13 17.39 7.59 16.86 7.75 16.72C8.35 16.16 9.31 15.61 10.02 15.43C10.54 15.29 11.61 15.25 12.19 15.35C13.1 15.51 13.97 15.87 15.18 16.6C16.12 17.16 16.6 17.41 17.13 17.62C18.21 18.05 19.13 18.19 20.1 18.08Z',
  tile: { size: 32, rx: 7 },
};

/**
 * A standalone SVG document for the favicon. Colours are passed in rather than
 * hard-coded, so the caller hands it the live theme tokens and the tab icon cannot
 * drift away from the palette.
 */
export function monogramSvg(opts: {
  bg: string;
  fg: string;
  accent: string;
  size?: number;
}): string {
  const { bg, fg, accent, size = 32 } = opts;
  const { tile, h, flourish } = monogram;
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + tile.size + ' ' + tile.size + '" ' +
    'width="' + size + '" height="' + size + '" role="img" ' +
    'aria-label="Hamzah Naufal Zuhdi monogram">\n' +
    '  <rect width="' + tile.size + '" height="' + tile.size + '" rx="' + tile.rx + '" fill="' + bg + '"/>\n' +
    '  <path d="' + h + '" fill="' + fg + '"/>\n' +
    '  <path d="' + flourish + '" fill="' + accent + '"/>\n' +
    '</svg>\n'
  );
}
