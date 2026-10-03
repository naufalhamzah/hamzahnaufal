/**
 * MY JOURNAL — internship record, AirNav Indonesia
 *
 * SOURCE: the record as written by Hamzah and supplied verbatim. Every paragraph
 * below is his text, word for word, including the `**emphasis**` markers he used —
 * the renderer turns those into <strong> rather than this file stripping them.
 *
 * A dated record of the internship: what was learned, which discussions and
 * projects were joined, and what was built, written as the work happens. It goes
 * to a supervisor, not a personal blog — hence dated reports, no paraphrase and a
 * chronological reading order.
 *
 * WHY IT IS DATA, NOT MARKUP: the text lives here and the page renders what it
 * finds. `media` is optional, so an entry written today with no images can gain
 * them later without touching a component.
 *
 * TO ADD AN ENTRY:
 *   1. append an object — the page sorts, so array order does not matter
 *   2. `date` (ISO) sorts and anchors; `dateLabel` is how it reads. They are
 *      separate because an entry may cover a SPAN of days rather than one day
 *   3. with photographs: put the files in `public/images/journal/` and list them
 *      in `media`. Any count works, including one.
 */

import { journalListSchema } from './schemas';
import type { JournalEntry } from '@/types/content';

const raw: JournalEntry[] = [
  {
    id: 'first-step',
    date: '2026-09-21',
    dateLabel: 'September 21, 2026',
    sortKey: '2026-09-21',
    title: 'A First Step into AirNav Indonesia',
    themes: ['Onboarding', 'Work culture', 'Division placement'],
    body: [
      'Today marked the beginning of my internship journey at **AirNav Indonesia**. The day started with an onboarding session and an introduction to the company, where I had the opportunity to learn more about AirNav Indonesia, its business processes, and the working environment.',
      'During the session, the interns were introduced to the different divisions within the company and assigned to their respective areas. I was placed in the **Information Technology Division**, which gave me my first insight into the area where I would be learning and contributing throughout the internship.',
      'We were also introduced to the company’s **work culture, business processes, and professional environment**. Although there were no technical tasks on my first day, I found the experience valuable. Before learning how to contribute to the work, I believe it is important to first understand the organization, its people, and how everything works together.',
      'This day marked more than just the beginning of an internship. It was the first step toward experiencing and understanding the professional world from within.',
    ],
  },
  {
    id: 'ai-learning',
    date: '2026-09-24',
    dateLabel: 'September 24, 2026',
    sortKey: '2026-09-24',
    title: 'When AI Became Part of My Learning Process',
    themes: ['Web development', 'AI agents', 'Hermes', 'Antigravity'],
    body: [
      'After becoming familiar with the working environment, I began exploring more technical topics. Today, I started learning about **web development** while also exploring the use of **AI Agents**, particularly **Hermes and Antigravity**, as tools to support the coding process.',
      'Previously, I mainly viewed AI as a tool for finding information and answering questions. This time, I began exploring AI from a different perspective—using it as an assistant during software development. I experimented with giving instructions to AI Agents, reviewing the code they generated, and understanding how the code worked.',
      'I quickly realized that using AI for coding is not simply about asking it to build something. I still need to understand the output, review the logic, identify issues, and provide further instructions when the result does not meet the requirements.',
      'This experience showed me that AI can be more than just a source of information. When used properly, it can become a **learning and development companion** that helps make the process more efficient while still requiring human understanding and judgment.',
    ],
  },
  {
    id: 'real-project',
    date: '2026-09-29',
    dateLabel: 'September 29, 2026',
    sortKey: '2026-09-29',
    title: 'From Learning to Working on a Real Project',
    themes: ['INMC Dashboard', 'Requirements', 'Business process'],
    body: [
      'Today was one of the more meaningful moments of my internship so far. I had the opportunity to participate in a discussion regarding the **INMC Dashboard**. After spending the previous days learning about web development and exploring different development tools, I was able to see how technology is connected to actual business and operational needs.',
      'During the meeting, I gained an initial understanding of the dashboard’s purpose, requirements, and the needs behind its development. What stood out to me was that developing an application does not begin with writing code. There is a process that comes first—understanding the users, business processes, required data, and the problems that the system is expected to address.',
      'This changed the way I look at software development. Instead of immediately thinking, **“How do I build it?”**, I started to think, **“What actually needs to be built, and who will it serve?”**',
      'For me, this was an important transition—from simply **learning how to build websites** to understanding how technology can be designed to address real needs in a professional environment.',
    ],
  },
];

export const journalEntries: JournalEntry[] = journalListSchema
  .parse(raw)
  /* Newest first. Derived, so the array above can be written in any order. Ties
     fall back to the array order, which `Array.prototype.sort` guarantees is
     stable — deterministic without inventing a time-of-day field. */
  .sort((a, b) => b.sortKey.localeCompare(a.sortKey));

/**
 * The period the journal covers, as a readable label — derived from the entries,
 * so the header can never claim a period the data does not contain. A range inside
 * one month collapses to that month ("September 2026", not
 * "September 2026 – September 2026").
 */
export const journalPeriod = (() => {
  const dates = journalEntries.map((e) => e.date).sort();
  const first = dates[0];
  const last = dates[dates.length - 1];
  const fmt = (iso: string, opts: Intl.DateTimeFormatOptions) =>
    new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', opts);

  if (first.slice(0, 7) === last.slice(0, 7)) {
    return fmt(first, { month: 'long', year: 'numeric' });
  }
  if (first.slice(0, 4) === last.slice(0, 4)) {
    return `${fmt(first, { month: 'long' })} – ${fmt(last, {
      month: 'long',
      year: 'numeric',
    })}`;
  }
  return `${fmt(first, { month: 'long', year: 'numeric' })} – ${fmt(last, {
    month: 'long',
    year: 'numeric',
  })}`;
})();

/**
 * Month headings, newest first, with their entries — grouped in code so a new
 * entry needs no decision about where it belongs; the month comes from its date.
 */
export const journalByMonth = (() => {
  const groups: { key: string; label: string; entries: JournalEntry[] }[] = [];
  for (const entry of journalEntries) {
    const key = entry.sortKey.slice(0, 7);
    let group = groups.find((g) => g.key === key);
    if (!group) {
      const [y, m] = key.split('-');
      const label = new Date(Number(y), Number(m) - 1, 1).toLocaleString('en-GB', {
        month: 'long',
        year: 'numeric',
      });
      group = { key, label, entries: [] };
      groups.push(group);
    }
    group.entries.push(entry);
  }
  return groups;
})();

