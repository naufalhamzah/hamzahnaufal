/**
 * ProjectGrid — the site's one genuinely interactive island.
 *
 * Why React here and nowhere else: category filtering needs real client state
 * (which filter is active) and re-rendering of a list from that state. That is
 * exactly what React is good at. Everything else on the site is static content
 * that Astro renders to HTML, so React would only add weight there.
 *
 * The data arrives as props from the Astro content layer — this component holds
 * no facts of its own. Filtering happens over already-rendered DOM: we hide
 * cards rather than re-render them, so the markup stays identical whether or not
 * JavaScript runs.
 */

import { useEffect, useMemo, useState } from 'react';
import './ProjectFilter.css';

export interface FilterableProject {
  id: string;
  title: string;
  categories: string[];
  /** Pre-rendered searchable text, so filtering needs no extra data. */
  searchText: string;
}

interface Props {
  projects: FilterableProject[];
  /** Category ids in display order, with their human labels. */
  categories: { id: string; label: string }[];
  /** Element id of the container holding the server-rendered cards. */
  gridId?: string;
}

export default function ProjectFilter({
  projects,
  categories,
  gridId = 'projects-grid',
}: Props) {
  const [active, setActive] = useState<string>('all');
  const [query, setQuery] = useState('');

  /* ---------------------------------------------------------------------- */
  /* Filtering is applied to the DOM, not by re-rendering the cards.         */
  /* This keeps the server-rendered markup authoritative and means the page   */
  /* works identically with JavaScript disabled.                             */
  /* ---------------------------------------------------------------------- */
  const visibleIds = useMemo(() => {
    const q = query.trim().toLowerCase();
    return new Set(
      projects
        .filter((p) => active === 'all' || p.categories.includes(active))
        .filter((p) => (q ? p.searchText.includes(q) : true))
        .map((p) => p.id),
    );
  }, [projects, active, query]);

  useEffect(() => {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    const cards = grid.querySelectorAll<HTMLElement>('[data-project-id]');
    let shown = 0;

    cards.forEach((card) => {
      const id = card.dataset.projectId ?? '';
      const isVisible = visibleIds.has(id);
      card.hidden = !isVisible;
      if (isVisible) shown += 1;
    });

    // Reveal the "nothing matches" message instead of leaving a blank gap.
    const emptyEl = document.getElementById(`${gridId}-empty`);
    if (emptyEl) emptyEl.hidden = shown > 0;

    // Reflect the count for screen readers and the visible "showing" label.
    const countEl = document.getElementById(`${gridId}-count`);
    if (countEl) countEl.textContent = String(shown);
  }, [visibleIds, gridId]);

  /* Total count for the result line. */
  const total = projects.length;

  return (
    <div className="pf">
      <div className="pf__bar">
        {/* ---------------- Category chips ---------------- */}
        <div className="pf__chips" role="group" aria-label="Filter projects by category">
          <button
            type="button"
            className={`pf__chip${active === 'all' ? ' pf__chip--on' : ''}`}
            aria-pressed={active === 'all'}
            onClick={() => setActive('all')}
          >
            All
            <span className="pf__n">{total}</span>
          </button>

          {categories.map((c) => {
            const n = projects.filter((p) => p.categories.includes(c.id)).length;
            return (
              <button
                key={c.id}
                type="button"
                className={`pf__chip${active === c.id ? ' pf__chip--on' : ''}`}
                aria-pressed={active === c.id}
                onClick={() => setActive(c.id)}
              >
                {c.label}
                <span className="pf__n">{n}</span>
              </button>
            );
          })}
        </div>

        {/* ---------------- Text search ---------------- */}
        <div className="pf__search">
          <label className="pf__search-label" htmlFor="project-search">
            Search
          </label>
          <input
            id="project-search"
            type="search"
            className="pf__input"
            placeholder="Filter by name or tool…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              type="button"
              className="pf__clear"
              onClick={() => setQuery('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Live region: announces how many projects match. */}
      <p className="pf__result meta" aria-live="polite">
        Showing <span id={`${gridId}-count`}>{visibleIds.size}</span> of {total}{' '}
        projects
        {active !== 'all' && (
          <>
            {' '}
            in{' '}
            {categories.find((c) => c.id === active)?.label ?? active}
          </>
        )}
      </p>
    </div>
  );
}
