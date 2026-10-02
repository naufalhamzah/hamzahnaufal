#!/usr/bin/env python
"""
AIRNAV MARK — retrace the supplied raster logo into vector artwork.

WHY THIS EXISTS
---------------
`konten/Logo AirNav.jfif` is a 447x447 JPEG. Its disc edge arrives with the
JPEG's stair-steps, plus a 1-2px compression halo in the white surround, and the
shipped asset was a 357px raster derived from it — so both artefacts were baked
in at every display size the site uses. Tracing the artwork replaces the ragged
boundary with real curves and drops the halo, and an SVG stays sharp at any size
the mark is later rendered at.

The geometry is the supplied artwork's own; nothing is redrawn or invented. The
disc is reconstructed as an exact circle from the blue channel's bounding box
(the JPEG boundary is not a usable edge), and the ribbon, swooshes and lettering
are traced from the ink masks.

USAGE
-----
    python scripts/airnav-logo.py
    # writes konten/_rendered/airnav-roundel.svg  (+ mask + geometry debug files)

Requires: pillow, numpy, potrace (pip install potracer).
"""
import json
import os

import numpy as np
from PIL import Image, ImageFilter
import potrace

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SRC = os.path.join(ROOT, "konten", "Logo AirNav.jfif")
REND = os.path.join(ROOT, "konten", "_rendered")

UP = 6          # supersample factor before tracing
SIGMA = 0.30    # blur, in SOURCE px: enough to smooth JPEG stair-steps, small
                # enough that the disc rim and the ribbon's edge stay crisp
TURD = 40       # drop specks below ~1 source px^2 (UP*UP = 36 device px^2)


def main():
    im = Image.open(SRC).convert("RGB")
    a = np.asarray(im).astype(np.int16)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    h_img, w_img = a.shape[0], a.shape[1]

    blue = (b > 90) & (b - r > 45) & (b - g > 25)
    red = (r > 120) & (r - b > 60) & (r - g > 60)
    white = (r > 205) & (g > 205) & (b > 205)

    box = Image.fromarray((blue * 255).astype(np.uint8)).getbbox()
    x0, y0, x1, y1 = box
    w, h = x1 - x0, y1 - y0

    cx, cy = (x0 + x1 - 1) / 2.0, (y0 + y1 - 1) / 2.0
    radius = (w + h) / 4.0
    yy, xx = np.mgrid[0:h_img, 0:w_img]
    dist = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2)
    disc = dist <= radius
    rim_eroded = dist <= (radius - 2.5)   # keeps white rim anti-aliasing out

    # Ink colours, measured from the source rather than guessed. The disc is
    # sampled from its CORE (rim eroded), because the rim pixels carry the JPEG's
    # darkening/halo and would drag the median towards the surround.
    disc_colour = np.median(a[blue & (dist <= radius - 6)], axis=0).astype(int)
    ribbon_colour = np.median(a[red], axis=0).astype(int)

    # The ribbon is on top of the swoosh and crosses the rim, so it is taken
    # from the full disc; the lettering is white and inside, so white is taken
    # from the eroded disc only.
    red_mask = (red | ((r > 150) & (r - b > 40) & (r - g > 40))) & disc
    white_mask = white & rim_eroded

    def trace(mask):
        m = Image.fromarray((mask * 255).astype(np.uint8))
        m = m.resize((w_img * UP, h_img * UP), Image.LANCZOS)
        m = m.filter(ImageFilter.GaussianBlur(SIGMA * UP))
        return potrace.Bitmap(np.asarray(m) > 127).trace(
            turdsize=TURD, alphamax=1.2, opticurve=1, opttolerance=0.15
        )

    def paths_of(curves, canvas=(w_img * UP, h_img * UP)):
        """
        Convert potrace curves to SVG path data.

        The first curve potrace emits is the IMAGE BORDER itself (a rectangle the
        size of the canvas), not artwork — with white as the trace foreground it
        would paint the whole viewBox and bury the disc. Anything within a couple
        of device pixels of the canvas edge is the frame, so it is dropped.
        """
        out = []
        for curve in curves:
            pts = [curve.start_point] + [s.end_point for s in curve]
            if (min(p.x for p in pts) <= 2 and min(p.y for p in pts) <= 2
                    and max(p.x for p in pts) >= canvas[0] - 2
                    and max(p.y for p in pts) >= canvas[1] - 2):
                continue
            sp = curve.start_point
            d = ["M%.2f,%.2f" % (sp.x / UP, sp.y / UP)]
            for seg in curve:
                e = seg.end_point
                if seg.is_corner:
                    c = seg.c
                    d.append("L%.2f,%.2fL%.2f,%.2f"
                             % (c.x / UP, c.y / UP, e.x / UP, e.y / UP))
                else:
                    c1, c2 = seg.c1, seg.c2
                    d.append("C%.2f,%.2f %.2f,%.2f %.2f,%.2f"
                             % (c1.x / UP, c1.y / UP, c2.x / UP, c2.y / UP,
                                e.x / UP, e.y / UP))
            d.append("Z")
            out.append("".join(d))
        return out

    circle = ("M%.2f,%.2f a%.2f,%.2f 0 1 0 %.2f,0 a%.2f,%.2f 0 1 0 %.2f,0Z"
              % (cx - radius, cy, radius, radius, 2 * radius,
                 radius, radius, -2 * radius))

    white_paths = paths_of(trace(white_mask))
    red_paths = paths_of(trace(red_mask))

    hexof = lambda c: "#%02x%02x%02x" % tuple(int(v) for v in c)
    svg = [
        '<svg xmlns="http://www.w3.org/2000/svg" '
        'viewBox="%d %d %d %d" width="%d" height="%d" role="img" '
        'aria-label="AirNav Indonesia">' % (x0, y0, w, h, w, h),
        '  <path fill="%s" d="%s"/>' % (hexof(disc_colour), circle),
    ]
    svg += ['  <path fill="#ffffff" fill-rule="evenodd" d="%s"/>' % d for d in white_paths]
    svg += ['  <path fill="%s" fill-rule="evenodd" d="%s"/>' % (hexof(ribbon_colour), d)
            for d in red_paths]
    svg.append("</svg>")
    text = "\n".join(svg)

    os.makedirs(REND, exist_ok=True)
    with open(os.path.join(REND, "airnav-roundel.svg"), "w", encoding="utf-8") as fh:
        fh.write(text)

    # Debug artefacts, so a later reviewer can see what the trace was given.
    Image.fromarray((disc * 255).astype(np.uint8)).save(os.path.join(REND, "airnav-mask-disc.png"))
    Image.fromarray((white_mask * 255).astype(np.uint8)).save(os.path.join(REND, "airnav-mask-white.png"))
    Image.fromarray((red_mask * 255).astype(np.uint8)).save(os.path.join(REND, "airnav-mask-red.png"))
    with open(os.path.join(REND, "airnav-roundel.json"), "w", encoding="utf-8") as fh:
        json.dump({"sourceBox": [x0, y0, x1, y1], "centre": [cx, cy], "radius": radius,
                   "disc": hexof(disc_colour), "ribbon": hexof(ribbon_colour),
                   "whiteCurves": len(white_paths), "redCurves": len(red_paths)}, fh, indent=2)

    print("source box   :", box, "->", w, "x", h)
    print("disc         :", hexof(disc_colour), "radius %.1f" % radius)
    print("ribbon       :", hexof(ribbon_colour))
    print("white curves :", len(white_paths))
    print("red curves   :", len(red_paths))
    print("svg bytes    :", len(text))


if __name__ == "__main__":
    main()
