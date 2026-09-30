/**
 * PROJECT FILTER — the site's only interactive control.
 *
 * WHY REACT HERE AND NOWHERE ELSE
 * Every other interaction on the site is a display toggle (theme, menu,
 * lightbox) and is handled with a few lines of vanilla JS, which keeps the rest
 * of the site at ZERO client JavaScript. Filtering needs real state, so it is the
 * one place a framework earns its bytes.
 *
 * IMPORTANT — THE CARDS ARE NOT RENDERED HERE
 * Astro server-renders every project card into #projects-grid. This component
 * only toggles the `hidden` attribute on those existing cells. That means:
 *   · the content is in the HTML, so it is crawlable and indexable
 *   · the page works perfectly with JavaScript disabled
 *   · no card markup is duplicated in the bundle
 */

import { useMemo, useState } from 'react';
import './ProjectFilter.css';

export interface FilterCategory {
  id: string;
  label: string;
  count: number;
}

interface Props {
  categories: FilterCategory[];
  total: number;
}

export default function ProjectFilter({ categories, total }: Props) {
  /** null = show everything. */
  const [active, setActive] = useState<string | null>(null);

  const options = useMemo(
    () => [{ id: '__all', label: 'All', count: total }, ...categories],
    [categories, total],
  );

  function apply(id: string | null) {
    setActive(id);

    const grid = document.getElementById('projects-grid');
    const empty = document.getElementById('projects-grid-empty');
    if (!grid) return;

    const cells = Array.from(
      grid.querySelectorAll<HTMLElement>('.pj__cell'),
    );

    let shown = 0;
    for (const cell of cells) {
      const cats = (cell.dataset.categories ?? '').split(/\s+/).filter(Boolean);
      const match = id === null || cats.includes(id);
      cell.hidden = !match;
      if (match) shown++;
    }

    // The empty state only appears when a filter genuinely matches nothing,
    // which cannot happen with the current data but would with a new category.
    if (empty) empty.hidden = shown > 0;

    /* Announce the result for screen readers. */
    const live = document.getElementById('projects-filter-status');
    if (live) {
      live.textContent =
        id === null
          ? `Showing all ${shown} projects`
          : `Showing ${shown} project${shown === 1 ? '' : 's'} in ${labelFor(id)}`;
    }
  }

  function labelFor(id: string) {
    return categories.find((c) => c.id === id)?.label ?? id;
  }

  return (
    <div className="pf">
      <div
        className="pf__bar"
        role="group"
        aria-label="Filter projects by discipline"
      >
        {options.map((opt) => {
          const isAll = opt.id === '__all';
          const isOn = isAll ? active === null : active === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              className={`pf__btn${isOn ? ' is-on' : ''}`}
              aria-pressed={isOn}
              onClick={() => apply(isAll ? null : opt.id)}
            >
              <span className="pf__label">{opt.label}</span>
              <span className="pf__count" aria-hidden="true">
                {opt.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Screen-reader-only live region; visible hint lives in the page. */}
      <p id="projects-filter-status" className="pf__live" role="status" aria-live="polite" />
    </div>
  );
}
