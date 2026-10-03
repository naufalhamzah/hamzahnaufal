/**
 * SOURCE: real certificate scans in the project's `konten/Serifikat` folder,
 * cross-checked against [P]'s certificate list.
 *
 * Every issuer, title, date and credential ID was read from the PDF TEXT LAYER of
 * the scan itself — not guessed, not OCR'd. Where a scan is a pure image with no
 * text layer (Hima Ilkom 2023, UKM Penelitian), the identifying details come from
 * the file name and [P] only, and the entry says so.
 *
 * CORRECTIONS: three credential IDs previously transcribed from a rendered image
 * were wrong; the text-layer values are authoritative (Looker Studio
 * MS-6/5/2025-sHCYqF5VgVDWEZRcHThr, Basic Data MS-26/1/2024-TnKfD2HxnGX2FbdOf8QT,
 * Meniti Karier MRZM820DRZYQ). Also: the ONN Silver Medal is 2020 (not 2022), and
 * B2B Sales is 28 May 2025.
 *
 * KINDS: credential (course completion / specialisation), programme (a funded
 * programme or committee), organisation (a role held in a student body).
 *
 * Award PIAGAM (Silver Medal, Finalist PAB UKMP) deliberately live in
 * `achievements.ts` instead, so the same award is never listed twice.
 *
 * TO ADD A CERTIFICATE: drop the scan into `public/images/certificates/`, run
 * `node scripts/build-assets.mjs`, then add one entry here.
 */

import { certificationListSchema } from './schemas';
import type { CertificationEntry, CertificationKind } from '@/types/content';

/** Shorthand for a real scan. No placeholders remain on this page. */
const scan = (file: string, alt: string) => ({
  src: `/images/certificates/${file}`,
  alt,
});

/** Institution crest, where we hold a real one. */
const UNNES_LOGO = {
  src: '/images/logos/unnes.webp',
  alt: 'Universitas Negeri Semarang crest',
};

const raw: CertificationEntry[] = [
  {
    id: 'myskill-looker-studio',
    kind: 'credential',
    issuer: 'MySkill',
    title: 'Google Looker Studio',
    path: 'Learning Path: Data Science & Data Analysis',
    date: '6 May 2025',
    sortKey: '2025-05',
    credentialId: 'MS-6/5/2025-sHCYqF5VgVDWEZRcHThr',
    detail:
      'Completed a full specialisation topic in Google Looker Studio — 7 hours across 7 courses.',
    visual: scan(
      'cert-looker-studio.webp',
      'MySkill certificate for Google Looker Studio, awarded to Hamzah Naufal Zuhdi',
    ),
    source: 'both',
  },
  {
    id: 'myskill-b2b-sales',
    kind: 'credential',
    issuer: 'MySkill',
    title: 'Business to Business Sales (B2B)',
    path: 'Learning Path: Sales, Business Development and Customer Service',
    date: '28 May 2025',
    sortKey: '2025-05b',
    credentialId: 'MS-28/5/2025-WquNSfKSSZ1tqSV1DGEZ',
    detail:
      'Completed a full specialisation topic in B2B Sales — 5 hours across 5 courses.',
    visual: scan(
      'cert-b2b-sales.webp',
      'MySkill certificate for Business to Business Sales, awarded to Hamzah Naufal Zuhdi',
    ),
    source: 'portfolio',
  },
  {
    id: 'dicoding-belajar-dasar-data-science',
    kind: 'credential',
    issuer: 'Dicoding',
    title: 'Belajar Dasar Data Science',
    date: '6 March 2025',
    sortKey: '2025-03',
    credentialId: 'ERZRE7M1NXYV',
    detail:
      'Foundations of data science: data types, making decisions with data, and how a data scientist works.',
    visual: scan(
      'cert-belajar-dasar-data-science.webp',
      'Dicoding certificate for Belajar Dasar Data Science, awarded to Hamzah Naufal Zuhdi',
    ),
    source: 'portfolio',
  },
  {
    id: 'myskill-basic-data',
    kind: 'credential',
    issuer: 'MySkill',
    title: 'Basic Data',
    path: 'Learning Path: Data Science & Data Analysis',
    date: '26 January 2024',
    sortKey: '2024-01b',
    credentialId: 'MS-26/1/2024-TnKfD2HxnGX2FbdOf8QT',
    detail: 'Completed a full specialisation topic in Basic Data — 10 courses.',
    visual: scan(
      'cert-basic-data.webp',
      'MySkill certificate for Basic Data, awarded to Hamzah Naufal Zuhdi',
    ),
    source: 'both',
  },
  {
    id: 'dicoding-memulai-pemrograman-java',
    kind: 'credential',
    issuer: 'Dicoding',
    title: 'Memulai Pemrograman dengan Java',
    date: '25 January 2024',
    sortKey: '2024-01',
    credentialId: '1RXY12K81PVM',
    detail:
      'Java fundamentals, control flow and IDE-based development to industry standards.',
    visual: scan(
      'cert-memulai-pemrograman-java.webp',
      'Dicoding certificate for Memulai Pemrograman dengan Java, awarded to Hamzah Naufal Zuhdi',
    ),
    source: 'portfolio',
  },
  {
    id: 'dicoding-pemrograman-dasar',
    kind: 'credential',
    issuer: 'Dicoding',
    title: 'Memulai Dasar Pemrograman untuk Menjadi Pengembang Software',
    date: '1 April 2024',
    sortKey: '2024-04',
    credentialId: 'KEXL85OQMZG2',
    detail:
      'Software development fundamentals mapped to the national occupation standard (KBJI 2512.03) — flow diagrams, HTML, CSS and JavaScript at a basic level.',
    visual: scan(
      'cert-memulai-dasar-pemrograman.webp',
      'Dicoding certificate for Memulai Dasar Pemrograman untuk Menjadi Pengembang Software',
    ),
    source: 'portfolio',
  },
  {
    id: 'dicoding-meniti-karier',
    kind: 'credential',
    issuer: 'Dicoding',
    title: 'Meniti Karier sebagai Software Developer',
    date: '1 April 2024',
    sortKey: '2024-04b',
    credentialId: 'MRZM820DRZYQ',
    detail:
      'Career paths within software development and the preparation each one requires.',
    visual: scan(
      'cert-meniti-karier.webp',
      'Dicoding certificate for Meniti Karier sebagai Software Developer',
    ),
    source: 'portfolio',
  },
  {
    id: 'cisco-cybersecurity-essentials',
    kind: 'credential',
    issuer: 'Cisco Networking Academy',
    title: 'Cybersecurity Essentials',
    date: '13 June 2024',
    sortKey: '2024-06',
    detail:
      'Confidentiality, integrity and availability; the technologies and procedures used to defend network components; and cybersecurity law.',
    visual: scan(
      'cert-cybersecurity-essentials.webp',
      'Cisco Networking Academy certificate of course completion in Cybersecurity Essentials',
    ),
    source: 'portfolio',
  },
  {
    id: 'oracle-java-fundamentals',
    kind: 'credential',
    issuer: 'Oracle Academy',
    title: 'Java Fundamentals',
    date: '14 July 2024',
    sortKey: '2024-07b',
    visual: scan(
      'cert-java-fundamentals.webp',
      'Oracle Academy certificate for Java Fundamentals',
    ),
    source: 'both',
  },

  {
    id: 'ppk-ormawa-2024',
    kind: 'programme',
    issuer: 'Kemendikbudristek',
    title:
      'Program Penguatan Kapasitas Organisasi Kemahasiswaan (PPK Ormawa) 2024',
    date: '16 November 2024',
    sortKey: '2024-11',
    credentialId: '7421/E2/DT.01.01/2024',
    detail:
      'Certificate as Tim Pelaksana for HIMA Ilmu Komputer UNNES; the programme ran June–October 2024.',
    visual: scan(
      'cert-ppk-ormawa.webp',
      'PPK Ormawa 2024 certificate from Kemendikbudristek for HIMA Ilmu Komputer UNNES',
    ),
    source: 'both',
  },
  {
    id: 'cics-2024',
    kind: 'programme',
    issuer: 'HIMA Ilmu Komputer FMIPA UNNES',
    title:
      'Career Insight Computer Science (CICS) 2024 — Navigating Career in IT',
    date: '8 June 2024',
    sortKey: '2024-06b',
    credentialId: '008.14/I/CICS/A-HimaIlkom/VI/2024',
    detail:
      'Committee certificate for CICS 2024, delivered with PT Suitmedia Kreasi Indonesia.',
    visual: scan(
      'cert-cics-2024.webp',
      'Committee certificate for Career Insight Computer Science 2024',
    ),
    source: 'both',
  },
  {
    id: 'pkmmpd-2024',
    kind: 'programme',
    issuer: 'HIMA Ilmu Komputer FMIPA UNNES',
    title: 'PKMMPD 2024 — Bonding Beyond Bytes',
    date: '1 September 2024',
    sortKey: '2024-09',
    credentialId: 'B/14033/UN37.1.4/KM.04.02/2024',
    detail: 'Committee certificate as Korlap (field coordinator) for PKMMPD 2024.',
    visual: scan(
      'cert-pkmmtj-2024.webp',
      'Committee certificate for PKMMPD 2024, Bonding Beyond Bytes',
    ),
    source: 'both',
  },

  {
    id: 'hima-ilkom-2024',
    kind: 'organisation',
    issuer: 'Universitas Negeri Semarang',
    title: 'Himpunan Mahasiswa Ilmu Komputer — Kepala Biro PSDO',
    date: '30 January 2025',
    sortKey: '2025-01',
    credentialId: 'B/2100/UN37.1.4/KM.04.01/2025',
    detail:
      'Certificate for the 2024 HIMA Ilmu Komputer board period as Head of the PSDO bureau.',
    visual: scan(
      'cert-hima-2024.webp',
      'Universitas Negeri Semarang certificate for the 2024 HIMA Ilmu Komputer board',
    ),
    issuerLogo: UNNES_LOGO,
    source: 'both',
  },
  {
    id: 'hima-ilkom-2023',
    kind: 'organisation',
    issuer: 'Universitas Negeri Semarang',
    title: 'Himpunan Mahasiswa Ilmu Komputer — Board Certificate 2023',
    date: '2023',
    sortKey: '2023-12',
    visual: scan(
      'cert-hima-2023.webp',
      'Universitas Negeri Semarang certificate for the 2023 HIMA Ilmu Komputer board',
    ),
    issuerLogo: UNNES_LOGO,
    source: 'both',
    /* Scan is a flat image with no text layer, so the role title is taken from
       the profile export: Expert Staff, Infrastructure & Inventory Bureau
       (Jan 2023 – Jan 2024). The certificate's own date is the year only. */
  },
  {
    id: 'ukm-penelitian',
    kind: 'organisation',
    issuer: 'Universitas Negeri Semarang',
    title: 'UKM Penelitian UNNES',
    date: '2023',
    sortKey: '2023-11',
    visual: scan(
      'cert-ukmp.webp',
      'Universitas Negeri Semarang certificate for UKM Penelitian',
    ),
    issuerLogo: UNNES_LOGO,
    source: 'portfolio',
    /* Same: no machine-readable text on the scan. Roles come from the profile
       export — Department Secretary (Aug 2023 – Jan 2024) and Expert Staff
       (Mar – Aug 2023). */
  },
];

export const certificationEntries: CertificationEntry[] =
  certificationListSchema.parse(raw);

/** Newest first — the order the page shows them in. */
export const certificationsSorted = [...certificationEntries].sort((a, b) =>
  b.sortKey.localeCompare(a.sortKey),
);

/**
 * Counts used for homepage previews — derived from the data, never hardcoded, so
 * adding a certificate updates the figure automatically.
 */
export const certificationTotal = certificationEntries.length;

export const credentialCount = certificationEntries.filter(
  (c) => c.kind === 'credential',
).length;

/** Distinct issuers, in first-seen order once sorted. */
export const certificationIssuers = Array.from(
  new Set(certificationsSorted.map((c) => c.issuer)),
);

/** Group headings, in the order the page renders them. */
export const CERTIFICATION_KIND_LABELS: Record<CertificationKind, string> = {
  credential: 'Courses & credentials',
  programme: 'Programmes & committees',
  organisation: 'Organisation roles',
};

export const CERTIFICATION_KIND_ORDER: CertificationKind[] = [
  'credential',
  'programme',
  'organisation',
];
