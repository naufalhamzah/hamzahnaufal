/**
 * SOURCE: [P] = Profile.pdf (authoritative for dates), [D] = portfolio deck.
 * IMAGES: committee/organisation photographs from ./konten (see organizationGallery).
 *
 * DATE CORRECTIONS: the deck shows 2024 for three roles whose events are 2023, so
 * per the agreed rules [P] wins — CSS: Oct–Dec 2023, Interface&PKMMTJ: Jul–Sep
 * 2023, Rapat Kerja: Feb–Mar 2023. UKM Penelitian: [P] lists TWO successive roles
 * (Expert Staff, then Department Secretary) that [D] merges into one; both kept.
 *
 * `photoIds` reference entries in `organizationGallery` below; a role with none
 * simply renders without images.
 */

import { organizationListSchema } from './schemas';
import type { OrganizationEntry, MediaAsset } from '@/types/content';

const HIMA = 'Himpunan Mahasiswa Ilmu Komputer FMIPA UNNES';
const UKM = 'UKM Penelitian Universitas Negeri Semarang';

/**
 * The shared photo pool: roles point into this by id, so one image can be reused
 * without duplicating alt text or dimensions.
 *
 * These are THE SAME FILES the gallery uses (`gallery/moment-02..18`), chosen
 * deliberately: this file once shipped a second pixel-for-pixel copy under
 * `public/images/organizations/` that nothing rendered.
 */
const photo = (
  n: number,
  alt: string,
  kind: 'kepanitiaan' | 'organisasi' = 'kepanitiaan',
): { id: string; asset: MediaAsset } => {
  const num = String(n).padStart(2, '0');
  /* Committee photographs are gallery moments 02..14; organisation photographs
     are 15..18. The offsets are the mapping verified against the pixels. */
  const moment = kind === 'kepanitiaan' ? n + 1 : n + 14;
  return {
    id: `${kind}-${num}`,
    asset: {
      src: `/images/gallery/moment-${String(moment).padStart(2, '0')}.webp`,
      alt,
      width: 1400,
    },
  };
};

/** Committee photographs, each with a factual description of the scene. */
export const organizationGallery: { id: string; asset: MediaAsset }[] = [
  photo(1, 'Committee group photograph on stage at the opening of a campus event'),
  photo(2, 'Committee members directing participants during an outdoor campus activity'),
  photo(3, 'Committee team briefing participants during an event session'),
  photo(4, 'Committee members at an evening campus event holding torch props'),
  photo(5, 'Committee members in a coordination meeting with documents on the table'),
  photo(6, 'Committee members handling registration and guest reception at a desk'),
  photo(7, 'Committee member speaking during an outdoor event session'),
  photo(8, 'Committee team photograph in front of the FMIPA UNNES building'),
  photo(9, 'Committee panel session during a campus event'),
  photo(10, 'Committee members welcoming guests at a venue entrance'),
  photo(11, 'Committee members working on laptops during event operations'),
  photo(12, 'Committee team coordinating at the event operations desk'),
  photo(13, 'Committee member presenting during an event session'),
  photo(14, 'Committee member photograph in front of a decorated event backdrop'),
  photo(15, 'Organisation members in a large group photograph after a meeting'),
  photo(16, 'Organisation members in a full group photograph at a formal event'),
  photo(17, 'Organisation delegation photograph in front of a campus event backdrop'),
  photo(18, 'Organisation members at a community activity in a classroom'),
  photo(19, 'Organisation team photograph at a village community event'),
].concat([
  photo(1, 'Organisation members in a group photograph at a formal gathering', 'organisasi'),
  photo(2, 'Organisation members in a full group photograph on a staircase', 'organisasi'),
  photo(3, 'Organisation members seated together at a large group photo session', 'organisasi'),
  photo(4, 'Organisation delegation photograph in front of a campus event backdrop', 'organisasi'),
]);

const lookup = Object.fromEntries(organizationGallery.map((g) => [g.id, g.asset]));
const photoById = (ids: string[]): MediaAsset[] =>
  ids.map((id) => lookup[id]).filter(Boolean);

/**
 * Authoring shape: `photoIds` is a convenience for this file only. It is
 * resolved into full `photos` assets below, so components never see it.
 */
type OrganizationSeed = Omit<OrganizationEntry, 'photos'> & {
  photoIds?: string[];
};

const raw: OrganizationSeed[] = [
  {
    id: 'hima-psdm-head',
    organization: HIMA,
    group: 'HIMA Ilmu Komputer',
    role: 'Head of Organizational Resource Development Bureau',
    dateRange: 'January 2024 – January 2025',
    sortKey: '2024-01',
    location: 'Kota Semarang, Jawa Tengah, Indonesia',
    durationMonths: 13,
    summary:
      'Led the bureau managing organisational resources — student resources, infrastructure and inventory — spanning procurement, maintenance and upkeep, while fostering internal relations among functionaries.',
    highlights: [
      'Managed procurement, maintenance and upkeep of organisational resources',
      'Fostered harmonious internal relations among functionaries to support collaboration',
      'Restored the bureau’s core functions (tupoksi) and added relevant, beneficial agendas',
      'Worked to ensure members felt comfortable and received development in line with expectations',
    ],
    photoIds: ['organisasi-02', 'organisasi-03', 'organisasi-01'],
    source: 'both',
  },
  {
    id: 'hima-sarpras-expert',
    organization: HIMA,
    group: 'HIMA Ilmu Komputer',
    role: 'Expert Staff — Infrastructure and Inventory Bureau',
    dateRange: 'January 2023 – January 2024',
    sortKey: '2023-01',
    location: 'Kota Semarang, Jawa Tengah, Indonesia',
    durationMonths: 13,
    summary:
      'Oversaw the organisation’s inventory end to end: data collection, procurement, maintenance, and monitoring of borrowing activity, plus management of the secretariat spaces.',
    highlights: [
      'Handled inventory data collection, procurement, maintenance and borrowing monitoring',
      'Managed the organisation’s secretariat spaces',
      'Re-optimised the secretariat’s role, strengthening the bureau’s effectiveness after it had underperformed',
    ],
    photoIds: ['kepanitiaan-05', 'kepanitiaan-07'],
    source: 'both',
  },
  {
    id: 'hima-raplen-raker',
    organization: HIMA,
    group: 'HIMA Ilmu Komputer',
    role: 'Event Coordinator — Plenary & Work Meetings',
    dateRange: 'February 2024 – March 2024',
    sortKey: '2024-02',
    location: 'Kota Semarang, Jawa Tengah, Indonesia',
    durationMonths: 2,
    summary:
      'Fully responsible for planning and executing Rapat Pleno & Rapat Kerja 2024 — the first year the two programmes were integrated into a single event, requiring an entirely new concept.',
    highlights: [
      'Designed the inauguration ceremony and structured the plenary meeting flow',
      'Established the presidium system for the plenary session',
      'Crafted the work meeting format to support effective discussion and coordination',
      'Integrated two major agendas (RAPLEN & RAKER) into one more efficient concept',
    ],
    photoIds: ['kepanitiaan-09', 'kepanitiaan-11', 'kepanitiaan-12'],
    source: 'both',
  },
  {
    id: 'hima-cics-equipment',
    organization: HIMA,
    group: 'HIMA Ilmu Komputer',
    role: 'Equipment Division Staff — Career Insight in Computer Science (CICS) 2024',
    dateRange: 'April 2024 – June 2024',
    sortKey: '2024-04',
    location: 'Kota Semarang, Jawa Tengah, Indonesia',
    durationMonths: 3,
    summary:
      'Ensured all materials and technical setups were prepared for the event, including room layout, lighting and green screens, and the Zoom streaming concept.',
    highlights: [
      'Procured essential items and arranged room layouts including lighting and green screens',
      'Implemented a Zoom streaming concept using OBS Studio',
      'Operated as technical operator during the event',
      'Integrated Zoom & OBS live streaming so the event ran without technical issues',
    ],
    tools: ['OBS Studio', 'Zoom'],
    photoIds: ['kepanitiaan-11', 'kepanitiaan-12'],
    source: 'both',
  },
  {
    id: 'hima-sarasehan-secretary',
    organization: HIMA,
    group: 'HIMA Ilmu Komputer',
    role: 'Secretary — Sarasehan',
    dateRange: 'October 2024 – November 2024',
    sortKey: '2024-10',
    location: 'Kota Semarang, Jawa Tengah, Indonesia',
    durationMonths: 2,
    summary:
      'Managed all administrative tasks for the Sarasehan 2024 programme, from drafting official documents to producing the event proposal and final activity report.',
    highlights: [
      'Drafted official documents: invitations, room booking requests and correspondence',
      'Created the event proposal and prepared the activity report (LPJ) for evaluation',
      'Recorded and compiled meeting minutes during preparation and on the event day',
      'Delivered real-time notulensi during the event',
    ],
    photoIds: ['kepanitiaan-05', 'kepanitiaan-06'],
    source: 'both',
  },
  {
    id: 'hima-interface-vice',
    organization: HIMA,
    group: 'HIMA Ilmu Komputer',
    role: 'Vice Coordinator of Field Division — Interface & PKMMTJ',
    dateRange: 'July 2024 – September 2024',
    sortKey: '2024-07',
    location: 'Kota Semarang, Jawa Tengah, Indonesia',
    durationMonths: 3,
    summary:
      'Supported coordination and execution of Interface and PKMMTJ, overseeing event safety, enforcing regulations, and mentoring less experienced team members.',
    highlights: [
      'Oversaw event safety and enforced participant and committee regulations',
      'Mentored and advised less experienced team members',
      'Assisted in developing operational strategies and supervised on-site logistics',
      'Designed one of the event concepts in under 2 hours to keep the whole programme on schedule',
    ],
    photoIds: ['kepanitiaan-02', 'kepanitiaan-10', 'kepanitiaan-04'],
    source: 'both',
  },
  {
    id: 'hima-css-pr',
    organization: HIMA,
    group: 'HIMA Ilmu Komputer',
    role: 'Public Relations Coordinator — Computer Science Sport and Art Competition',
    // DATE CORRECTED: deck shows Oct–Nov 2024; the event is 2023 and [P] confirms.
    dateRange: 'October 2023 – December 2023',
    sortKey: '2023-10',
    location: 'Kota Semarang, Jawa Tengah, Indonesia',
    durationMonths: 3,
    summary:
      'Managed permits, venue and field reservations, correspondence and communication with key stakeholders including professors, participants, referees and judges.',
    highlights: [
      'Managed permits, venue reservations, field bookings and correspondence',
      'Communicated with professors, participants, referees and judges',
      'Coordinated with other teams within the organisation',
      'Contributed to increased participant participation and a strengthened event image',
    ],
    photoIds: ['kepanitiaan-04', 'kepanitiaan-08'],
    source: 'both',
  },
  {
    id: 'hima-interface-2023',
    organization: HIMA,
    group: 'HIMA Ilmu Komputer',
    role: 'Field Coordinator — Interface & PKMMTJ 2023',
    // DATE CORRECTED: deck shows Jul–Sep 2024; the event is 2023 and [P] confirms.
    dateRange: 'July 2023 – September 2023',
    sortKey: '2023-07',
    location: 'Kota Semarang, Jawa Tengah, Indonesia',
    durationMonths: 3,
    summary:
      'Coordinated field logistics and safety for Interface and PKMMTJ, establishing rules for participants and committee, and facilitating coordination across committees.',
    highlights: [
      'Led participant mobilisation and cross-team coordination in the field',
      'Handled conditions for more than 300 participants and committee members',
      'Drafted a new set of regulations and designed a more effective permitting flow than the previous year',
      'Established participant and committee regulations, secured the premises and evaluated proceedings',
    ],
    photoIds: ['kepanitiaan-02', 'kepanitiaan-10', 'kepanitiaan-04', 'kepanitiaan-08'],
    source: 'both',
  },
  {
    id: 'hima-raker-2023',
    organization: HIMA,
    group: 'HIMA Ilmu Komputer',
    role: 'Equipment Coordinator — Work Meeting HIMA Ilkom 2023',
    // DATE CORRECTED: deck shows Apr–Jun 2024; the event is 2023 and [P] confirms.
    dateRange: 'February 2023 – March 2023',
    sortKey: '2023-02',
    location: 'Kota Semarang, Jawa Tengah, Indonesia',
    durationMonths: 2,
    summary:
      'Handled equipment and logistics for departmental meetings and student council inductions, cataloguing supplies and organising room layouts.',
    highlights: [
      'Catalogued and prepared all necessary supplies for the events',
      'Organised room layouts and operated equipment during the events',
      'Designed a new, more effective and structured stage setup than the previous year',
    ],
    photoIds: ['kepanitiaan-01', 'kepanitiaan-12'],
    source: 'both',
  },
  {
    id: 'hima-plenum-pr',
    organization: HIMA,
    group: 'HIMA Ilmu Komputer',
    role: 'Public Relations — Plenum HIMA Ilkom 2023',
    dateRange: 'January 2023 – February 2023',
    sortKey: '2023-01',
    location: 'Kota Semarang, Jawa Tengah, Indonesia',
    durationMonths: 2,
    summary:
      'Public relations coordinator for a plenary meeting, handling permits, venue reservations, equipment borrowing, correspondence and guest invitations.',
    highlights: [
      'Managed permits, venue reservations and equipment borrowing',
      'Handled correspondence and guest invitations',
      'Coordinated with various stakeholders to ensure smooth execution',
    ],
    photoIds: ['kepanitiaan-06', 'kepanitiaan-10'],
    source: 'both',
  },
  {
    id: 'hima-technofest',
    organization: HIMA,
    group: 'HIMA Ilmu Komputer',
    role: 'Equipment Section — Technofest',
    dateRange: 'October 2022 – December 2022',
    sortKey: '2022-10',
    location: 'Kota Semarang, Jawa Tengah, Indonesia',
    durationMonths: 3,
    summary:
      'Assisted the equipment team: cataloguing requirements, supporting procurement, conducting site surveys, and collaborating on the photobooth gate build.',
    highlights: [
      'Catalogued equipment requirements and assisted in procurement',
      'Conducted site surveys',
      'Collaborated with the Production and Decoration Department to develop the photobooth gate',
    ],
    photoIds: ['kepanitiaan-01', 'kepanitiaan-03'],
    source: 'profile',
  },
  {
    id: 'hima-household-intern',
    organization: HIMA,
    group: 'HIMA Ilmu Komputer',
    role: 'Intern Staff — Head of Household Affairs',
    dateRange: 'October 2022 – December 2022',
    sortKey: '2022-11',
    location: 'Kota Semarang, Jawa Tengah, Indonesia',
    durationMonths: 3,
    summary:
      'Managed the organisation’s entire inventory across recording, maintenance and procurement, developing close attention to detail.',
    highlights: [
      'Handled inventory recording, maintenance and procurement',
      'Ensured organisational assets were efficiently tracked and maintained',
    ],
    photoIds: ['kepanitiaan-07'],
    source: 'profile',
  },

  {
    id: 'kampus-merdeka-research',
    organization: 'Kampus Merdeka — PPK Ormawa Hima Ilkom UNNES 2024',
    group: 'Kampus Merdeka / PPK Ormawa',
    role: 'Research Literature Team',
    dateRange: 'June 2024 – November 2024',
    sortKey: '2024-07',
    location: 'Kota Semarang, Jawa Tengah, Indonesia',
    durationMonths: 6,
    summary:
      'Part of the Research Literature team in the PPK Ormawa programme, contributing to popular articles published on Kompasiana and to scientific articles documenting the team’s activities and achievements.',
    highlights: [
      'Contributed to several popular articles published on the Kompasiana platform',
      'Authored scientific articles documenting the team’s activities and achievements',
      'Helped craft activity proposals that successfully secured funding for the initiatives',
    ],
    photoIds: ['organisasi-01', 'organisasi-02'],
    source: 'both',
  },

  {
    id: 'ukm-works-secretary',
    organization: UKM,
    group: 'UKM Penelitian UNNES',
    role: 'Department Secretary at Work Department',
    dateRange: 'August 2023 – January 2024',
    sortKey: '2023-08',
    location: 'Kota Semarang, Jawa Tengah, Indonesia',
    durationMonths: 6,
    summary:
      'Responsible for the procurement of accountability reports and assisting the department head, alongside other administrative duties supporting departmental operations.',
    highlights: [
      'Procured accountability reports for the department',
      'Assisted the department head with their tasks',
      'Handled administrative duties ensuring smooth departmental operations',
    ],
    photoIds: ['organisasi-04', 'kepanitiaan-13'],
    source: 'profile',
  },
  {
    id: 'ukm-works-expert',
    organization: UKM,
    group: 'UKM Penelitian UNNES',
    role: 'Expert Staff at Work Department',
    dateRange: 'March 2023 – August 2023',
    sortKey: '2023-03',
    location: 'Kota Semarang, Jawa Tengah, Indonesia',
    durationMonths: 6,
    summary:
      'Managed the procurement and handling of member works within the organisation, promoting member creativity.',
    highlights: [
      'Managed procurement and handling of member works',
      'Promoted member creativity and team collaboration',
    ],
    photoIds: ['kepanitiaan-13', 'organisasi-04'],
    source: 'profile',
  },
];

const withPhotos: OrganizationEntry[] = raw.map(({ photoIds, ...rest }) => ({
  ...rest,
  photos: photoIds ? photoById(photoIds) : undefined,
}));

export const organizationEntries: OrganizationEntry[] =
  organizationListSchema.parse(withPhotos);

/** Newest first. */
export const organizationsSorted = [...organizationEntries].sort((a, b) =>
  b.sortKey.localeCompare(a.sortKey),
);

/** Grouped bodies, in the order they first appear once sorted. */
export const organizationGroups = Array.from(
  new Set(organizationsSorted.map((o) => o.group)),
);

export const organizationalSpan = {
  totalRoles: organizationEntries.length,
  groups: organizationGroups.length,
};
