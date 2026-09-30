# Hamzah Naufal Zuhdi — Portfolio

A personal portfolio for **Hamzah Naufal Zuhdi**, an Information Systems graduate
working across data, technology, business process and digital solutions.

Built as a **homepage plus real detail pages**: the landing page sells the work in
one screen, and each section links through to a full page.

---

## Stack

| Piece | Choice | Why |
| --- | --- | --- |
| Framework | **Astro 7** (`output: 'static'`) | Every page is pre-rendered HTML. No server needed. |
| Types | **TypeScript** (strict) | Content is typed; a missing field fails the build. |
| Styles | **Tailwind CSS v4** + design tokens | One token file drives the whole visual system. |
| Validation | **Zod** | Content files are parsed at load, so gaps fail loudly. |
| Islands | **React** — exactly one | Only the project filter needs client state. |
| Icons | **simple-icons** + local fallbacks | Official marks where redistributable. |
| Images | **sharp** via `scripts/build-assets.mjs` | 275 MB of source → ~5 MB of WebP. |
| Fonts | `@fontsource-variable` (self-hosted) | No external requests, no layout shift. |

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:4321
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run check` | Type + template diagnostics (`astro check`) |
| `npm run verify` | Asserts the built HTML: links, images, SEO, no phone leak |
| `npm run contrast` | WCAG AA contrast audit in both themes (needs a running server) |
| `npm run assets` | Re-optimise images from `konten/` into `public/images/` |

---

## Architecture — data vs. presentation

**Data lives in `src/data/`. Components render it. Components never contain a
personal fact.** That is the rule the whole structure is built around.

```
src/
├── data/                    ← EVERY fact lives here
│   ├── profile.ts           identity, About narrative, contact links
│   ├── projects.ts          project case studies
│   ├── experience.ts        professional roles
│   ├── organizations.ts     student-body / committee roles
│   ├── education.ts
│   ├── skills.ts            skill groups + icon keys
│   ├── skill-icons.ts       icon key → SVG
│   ├── publications.ts
│   ├── certifications.ts
│   ├── achievements.ts
│   ├── gallery.ts           personal/activity photographs
│   ├── schemas.ts           Zod validation for all of the above
│   ├── image-dims.ts        accessor for real pixel sizes
│   └── asset-dims.generated.ts   ← GENERATED, do not edit
│
├── components/
│   ├── layout/              Navbar, Footer, ThemeToggle
│   ├── ui/                  reusable primitives (cards, collage, lightbox…)
│   ├── sections/            homepage preview sections
│   └── islands/             the React filter (the only client JS)
│
├── pages/                   one file per route
├── layouts/BaseLayout.astro <head>, theme bootstrap, nav, footer, lightbox
├── styles/                  global.css + tokens.css (the design system)
├── types/content.ts         the shapes of the data
└── utils/                   site config, navigation model
```

### Adding content

Every one of these is **one object appended to one array** — no component edits:

| To add… | Edit |
| --- | --- |
| A project | `src/data/projects.ts` — its card, gallery and `/projects/<id>` page generate automatically |
| A role | `src/data/experience.ts` |
| A certificate | `src/data/certifications.ts` + drop the scan in `public/images/certificates/` |
| A paper | `src/data/publications.ts` |
| A skill | `src/data/skills.ts` (add an icon key in `skill-icons.ts` if you want a logo) |
| A gallery photo | `src/data/gallery.ts` + the file in `public/images/gallery/` |
| A nav destination | `src/utils/navigation.ts` — navbar, mobile panel, footer and sitemap all follow |

Counts shown on the site ("15 certificates", "18 photos") are **derived from the
data**, never hardcoded, so they update themselves.

### Adding images

Drop the original into `konten/`, add one line to the `RECIPES` array in
`scripts/build-assets.mjs`, then:

```bash
npm run assets     # writes optimised WebP + refreshes the generated dimension map
```

Real pixel dimensions are emitted to `src/data/asset-dims.generated.ts`, which is
what lets cards reserve the correct space and avoid layout shift.

---

## Design system

Everything visual is a token in `src/styles/tokens.css`. Components reference
`var(--x)` and never a raw colour, so the whole site re-skins from one file.

- **Dark-first**, warm ivory type, muted burgundy accent.
- **Background**: two wide radial washes (burgundy, charcoal) plus a vignette —
  depth rather than decoration; no patterns, photos, glows or particles.
- **Light theme** is a warm paper palette, not an inverted dark one.
- Typography: Playfair Display (display serif), Inter (body), JetBrains Mono
  (metadata labels).
- Corners stay near-square (`2–6px`).

---

## Verification

```bash
npm run build && npm run verify
```

`verify-build.mjs` asserts against the **built HTML**, not the source:

- no phone number anywhere in rendered output
- no broken internal links or missing image files
- every page has title, meta description, canonical, OG tags, one `<h1>`, landmarks, a skip link
- every `<img>` carries an `alt` attribute
- sitemap, robots.txt and favicon exist

`contrast.mjs` drives a real browser (CDP) to measure every text element in both
themes against WCAG AA. It reloads per theme so colours resolve from scratch, and
skips gradient-backed captions it cannot measure honestly.

---

## Content rules (important)

This site is **strictly factual**. The two source documents are:

- `Profile.pdf` — authoritative for **dates** and current status
- `PORTOFOLIO HAMZAH (3).pdf` — authoritative for **descriptions, projects, skills, certificates**

Rules that were followed throughout, and must keep being followed:

1. **Never invent** experience, projects, metrics, dates, technologies, clients,
   testimonials or URLs.
2. Where a fact is genuinely unknown, it is **absent** or carries a visible note —
   never a plausible guess. Search `todo:` in `src/data/` for the open items.
3. **No proficiency percentages** for skills; the sources state none.
4. **The phone number is never published.** `CONTACT_PHONE_ENABLED` in
   `src/data/profile.ts` is `false`; contact links are read from
   `activeContactLinks`, which filters disabled entries so one cannot leak.
5. **Positioning**: the site leads with *Information Systems Graduate*. AirNav
   Indonesia appears only inside Experience, labelled as an internship — it is
   not the site's identity.
6. **Personal photographs are not attributed to an employer** unless the image
   itself proves it. Ambiguous photos live in the Gallery.

### Certificate corrections made from the source text layer

Three credential IDs previously transcribed from a rendered image were wrong.
The PDF text layer is authoritative:

| Certificate | Correct ID |
| --- | --- |
| Google Looker Studio | `MS-6/5/2025-sHCYqF5VgVDWEZRcHThr` |
| Basic Data | `MS-26/1/2024-TnKfD2HxnGX2FbdOf8QT` |
| Meniti Karier | `MRZM820DRZYQ` |

Also corrected: the Olimpiade Numerasi Nasional Silver Medal is **2020** (not
2022), and B2B Sales is **28 May 2025**.

---

## Deploying

The build is fully static — deploy `dist/` anywhere.

Before going live, set the real domain in **`astro.config.mjs`**:

```js
export const SITE_URL = 'https://your-real-domain.com';
```

It feeds canonical URLs, the sitemap and Open Graph tags. While it is still the
placeholder, `npm run verify` fails if that domain ever appears in visible page
text (it is allowed only in metadata).

---

## Known open items

Search the data layer for `todo:` to see everything unresolved. The main ones:

- AirNav responsibilities are **provisional** — expand with real detail.
- No graduation month is documented, so none is shown.
- The 2023 HIMA Ilkom and UKM Penelitian scans have no text layer, so their role
  titles come from `Profile.pdf` alone.
