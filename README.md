# Hamzah Naufal Zuhdi — Personal Portfolio

A static, editorial-technical portfolio built with **Astro**, **TypeScript** and
**Tailwind CSS v4**. Dark-first, responsive from 360px up, and structured so
personal content can be edited without touching any UI component.

---

## Quick start

```bash
npm install       # install dependencies
npm run dev       # start the dev server
```

Then open the URL printed in the terminal — normally **http://localhost:4321**

### Other commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run check` | Type-check all `.astro`/`.ts`/`.tsx` files |
| `npm run verify` | **Assert** the built output is correct (see below) |

---

## The one architectural rule

> **Content lives in `src/content/`. UI lives in `src/components/`.
> Components never contain personal facts.**

Every fact on the site comes from a typed data file:

```
src/content/
  profile.ts         name, headline, contact links, about narrative
  experience.ts      5 professional roles
  organizations.ts   15 leadership & committee roles
  projects.ts        8 projects (3 featured)
  publications.ts    3 papers
  certifications.ts  10 credentials
  achievements.ts    awards, competition results, funding
  education.ts       2 institutions
  skills.ts          7 skill groups
  schemas.ts         Zod schemas — validation rules
```

So updating a job title, adding a certificate, or fixing a date means editing
**one line in one data file**. No markup changes, no risk of breaking layout.

### A worked example

To add a certification, open `src/content/certifications.ts` and append:

```ts
{
  id: 'my-new-cert',
  issuer: 'Issuer Name',
  title: 'Certificate Title',
  date: '3 March 2026',
  sortKey: '2026-03',              // YYYY-MM, controls ordering
  credentialId: 'ABC-123',         // optional — omit if unknown
  visual: {
    src: '/images/placeholders/cert-my-new-cert.svg',
    alt: 'Description of the certificate',
    isPlaceholder: true,           // set false once a real scan exists
    aspect: '4/3',
  },
  source: 'portfolio',
},
```

That single object renders in the right group, in the right order, with no other
change. `npm run build` will fail loudly if a required field is missing — which
is intentional (see below).

---

## How the "never invent information" rule is enforced

The brief's hardest rule — do not fabricate facts — is implemented mechanically,
not by good intentions:

1. **Zod schemas** (`src/content/schemas.ts`) validate every content file at
   build time. A missing required field **fails the build** with the field named.
   It is impossible to ship a page with a silently empty gap.
2. **Unknown facts are absent, not guessed.** Where a document doesn't state
   something, the field is omitted and a `todo` string is attached instead.
3. **`TodoBadge`** renders those notes visibly, so an unresolved question appears
   as an honest gap on the page rather than a plausible invention.
4. **`source`** on every entry records which document it came from
   (`profile` / `portfolio` / `both`), so any claim is traceable.
5. **`npm run verify`** asserts the built HTML contains no phone number, no
   placeholder domain in visible text, no broken links and no missing images.

### Document priority used throughout

- **`Profile.pdf`** — authoritative for identity, employment dates, and dates
  where the two documents conflict.
- **`PORTOFOLIO HAMZAH (3).pdf`** — authoritative for project detail, skills,
  certifications, publications, achievements and descriptions.

**Known conflict already handled:** the portfolio deck's PT PLN slide contains a
copy-paste error (its body text is identical to its JAIST editorial text and says
nothing about IT support). `experience.ts` uses the Profile description instead.
Four committee roles are also dated 2024 in the deck but are 2023 events; the
Profile dates win and each correction is commented in `organizations.ts`.

---

## Project structure

```
src/
  content/          ← ALL personal data (see above)
  types/
    content.ts      TypeScript interfaces for every content shape
    site.ts         Site metadata type
  lib/
    site.ts         Site URL, locale, OG image
    theme.ts        Dark/light theme resolution + persistence
    navigation.ts   The single nav list used by header AND footer
  components/
    ui/             Button, Tag, Section, SectionHeader, ImageFrame,
                    ProjectCard, TodoBadge
    layout/         SiteHeader, SiteFooter, ThemeToggle, ThemeScript
    sections/       12 page sections (Hero, About, FeaturedWork, …)
    islands/        ProjectFilter.tsx — the ONE React island
  layouts/
    BaseLayout.astro  HTML shell, SEO, JSON-LD, theme bootstrap
  pages/
    index.astro            the portfolio (all sections)
    projects/[id].astro    8 generated case-study pages
    404.astro              not-found page
  styles/
    tokens.css      design tokens (colour, type scale, spacing, motion)
    global.css      Tailwind import + base styles + shared primitives
public/
  images/placeholders/   22 generated placeholder SVGs
  favicon.svg
  robots.txt
scripts/
  make-placeholders.mjs  regenerates the placeholder SVGs
  verify-build.mjs       asserts the built output
```

---

## Design system

Everything visual is a token in `src/styles/tokens.css`. Components reference
`var(--accent)`, never a hex value — so the theme switches with no duplicated CSS
and the accent colour changes in one place.

- **Dark-first**, with a light theme and `prefers-color-scheme` respected
- An inline pre-paint script applies the saved theme **before first render**, so
  there is no white flash
- One restrained teal accent; neutral slate base
- **Inter** for prose, **JetBrains Mono** for all metadata (dates, locations,
  tags, technical labels) — both self-hosted via Fontsource, no external requests
- **No skill percentage bars** — neither source document states a proficiency
  level, so showing "Python 87%" would be fabrication

---

## Images and placeholders

No real screenshots exist yet, so the site uses **22 generated placeholder SVGs**
in `public/images/placeholders/`. Each is deliberately obvious: a dashed frame,
diagonal hatching, a "PLACEHOLDER" badge and the target dimensions. They cannot
be mistaken for real screenshots.

Every image is wrapped by `ImageFrame.astro`, which reads `visual.isPlaceholder`
and shows a "Placeholder image" badge automatically.

**To replace a placeholder with a real asset:**

1. Drop the file in `public/images/projects/` (or `publications/`, `certifications/`)
2. Point `visual.src` at it in the relevant content file
3. Set `isPlaceholder: false`

The badge disappears and the layout is unchanged. No component edits.

Regenerate all placeholders with `node scripts/make-placeholders.mjs`.

---

## Interactivity — and why only one React island

Astro ships **zero JavaScript by default** and hydrates only what you mark.

The site has exactly **one** React island: `ProjectFilter.tsx`, because category
filtering needs real client state and re-rendering from that state.

Everything else is deliberately not React:

| Feature | Implementation | Why not React |
|---|---|---|
| Theme toggle | Inline script | One button, one boolean — React would cost more than it saves |
| Mobile menu | Inline script | Same |
| Scroll-spy | `IntersectionObserver` | Browser-native |
| Scroll reveal | CSS + tiny script | CSS transitions |

The filter is also **progressive enhancement**: all 8 project cards are
server-rendered into the HTML by Astro, and the island only toggles their
visibility. With JavaScript disabled the full list still appears.

---

## SEO & accessibility

- Per-page `<title>`, meta description, canonical, Open Graph and Twitter cards
- `Person` JSON-LD on the home page with `alumniOf` and `sameAs` (LinkedIn,
  Instagram)
- Auto-generated `sitemap-index.xml`; `robots.txt`
- Semantic landmarks (`header`/`main`/`nav`/`footer`), one `<h1>` per page,
  no skipped heading levels
- Skip-to-content link, visible focus rings on every control, `aria-current`
  on the active nav item, `aria-live` on the filter result count
- Full `prefers-reduced-motion` support — reveal animations and pulses are
  disabled, not merely shortened

---

## Deployment

The build is fully static. Any static host works.

```bash
npm run build     # → dist/
npm run verify    # assert the output is correct
```

**Before deploying, change the placeholder domain** (currently
`hamzahnaufal.example.com`). It is centralised in **two** places that must match:

1. `SITE_URL` in `astro.config.mjs`
2. `url` in `src/lib/site.ts`
3. `public/robots.txt` (the `Sitemap:` line)

---

## Adding a new project

1. Append an entry to `src/content/projects.ts`
2. Its case-study page is generated automatically at `/projects/<id>/`
3. Add its two category tags; the filter counts update themselves

---

## License

Personal portfolio. Content © Hamzah Naufal Zuhdi.
