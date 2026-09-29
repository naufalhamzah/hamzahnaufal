/**
 * CERTIFICATIONS
 * ============================================================================
 * SOURCE: [D] = PORTOFOLIO HAMZAH (3).pdf (certificate scans reproduced in the
 *         deck), cross-checked against [P]'s certification list.
 *
 * Every issuer, title, date and credential ID below was read from a certificate
 * image in the deck. Where a certificate's title was truncated or the date was
 * not legible, the field is omitted rather than guessed. No certificate URLs
 * are invented — the source contains none.
 * ============================================================================
 */

import { certificationListSchema } from './schemas';
import type { CertificationEntry } from '@/types/content';

const raw: CertificationEntry[] = [
  {
    id: 'myskill-looker-studio',
    issuer: 'MySkill',
    title: 'Certificate of Skill Specialization — Google Looker Studio',
    path: 'Learning Path: Data Science & Data Analysis',
    date: '6 May 2025',
    sortKey: '2025-05',
    credentialId: 'MS-6/5/2025-sHCYqI5VgvDWcEZlRcHThr',
    visual: {
      src: '/images/placeholders/cert-myskill-looker-studio.svg',
      alt: 'Placeholder for the MySkill Google Looker Studio certificate',
      isPlaceholder: true,
      aspect: '4/3',
    },
    source: 'both',
  },
  {
    id: 'myskill-business',
    issuer: 'MySkill',
    title: 'Certificate of Skill Specialization — Business',
    date: '28 May 2025',
    sortKey: '2025-05',
    visual: {
      src: '/images/placeholders/cert-myskill-business.svg',
      alt: 'Placeholder for the MySkill Business certificate',
      isPlaceholder: true,
      aspect: '4/3',
    },
    source: 'portfolio',
    todo: 'Certificate title was truncated in the source scan. Provide the full title.',
  },
  {
    id: 'myskill-basic-data',
    issuer: 'MySkill',
    title: 'Certificate of Skill Specialization — Basic Data',
    date: '26 January 2024',
    sortKey: '2024-01',
    credentialId: 'MS-26/1/2024-TxKI02HienGK2fBd0FBQT',
    visual: {
      src: '/images/placeholders/cert-myskill-basic-data.svg',
      alt: 'Placeholder for the MySkill Basic Data certificate',
      isPlaceholder: true,
      aspect: '4/3',
    },
    source: 'both',
  },
  {
    id: 'dqlab-intro-data-science',
    issuer: 'DQLab (with XERATIC and Universitas Multimedia Nusantara)',
    title: 'Certificate of Completion — Introduction to Data Science with Python',
    date: '18 February 2024',
    sortKey: '2024-02',
    credentialId: '#DQLABINTP1NAQAFI',
    visual: {
      src: '/images/placeholders/cert-dqlab-data-science.svg',
      alt: 'Placeholder for the DQLab Introduction to Data Science certificate',
      isPlaceholder: true,
      aspect: '4/3',
    },
    source: 'portfolio',
  },
  {
    id: 'dicoding-pemrograman-dasar',
    issuer: 'Dicoding',
    title: 'Memulai Dasar Pemrograman untuk Menjadi Pengembang Software',
    date: '1 April 2024',
    sortKey: '2024-04',
    credentialId: 'KEXL85OQMZG2',
    visual: {
      src: '/images/placeholders/cert-dicoding-pemrograman.svg',
      alt: 'Placeholder for the Dicoding programming fundamentals certificate',
      isPlaceholder: true,
      aspect: '4/3',
    },
    source: 'portfolio',
  },
  {
    id: 'dicoding-meniti-karier',
    issuer: 'Dicoding',
    title: 'Meniti Karier sebagai Software Developer',
    date: '1 April 2024',
    sortKey: '2024-04',
    credentialId: 'MRZMB200R2YQ',
    visual: {
      src: '/images/placeholders/cert-dicoding-karier.svg',
      alt: 'Placeholder for the Dicoding software developer career certificate',
      isPlaceholder: true,
      aspect: '4/3',
    },
    source: 'portfolio',
  },
  {
    id: 'cisco-ccnav7-itn',
    issuer: 'Cisco Networking Academy',
    title: 'CCNAv7: Introduction to Networks',
    date: '26 July 2024',
    sortKey: '2024-07',
    visual: {
      src: '/images/placeholders/cert-cisco-ccnav7.svg',
      alt: 'Placeholder for the Cisco CCNAv7 Introduction to Networks certificate',
      isPlaceholder: true,
      aspect: '4/3',
    },
    source: 'both',
  },
  {
    id: 'cisco-ccna-intro',
    issuer: 'Cisco Networking Academy',
    title: 'CCNA: Introduction to Networks',
    sortKey: '2024-07',
    visual: {
      src: '/images/placeholders/cert-cisco-ccna.svg',
      alt: 'Placeholder for the Cisco CCNA Introduction to Networks certificate',
      isPlaceholder: true,
      aspect: '4/3',
    },
    source: 'both',
    todo: 'A second, distinct CCNA certificate appears in the deck. Confirm whether this is the same credential as CCNAv7 or a separate one.',
  },
  {
    id: 'cisco-it-customer-support',
    issuer: 'Cisco Networking Academy',
    title: 'IT Customer Support Basics',
    sortKey: '2024-01',
    visual: {
      src: '/images/placeholders/cert-cisco-it-support.svg',
      alt: 'Placeholder for the Cisco IT Customer Support Basics certificate',
      isPlaceholder: true,
      aspect: '4/3',
    },
    source: 'portfolio',
    todo: 'No issue date was legible on the scan.',
  },
  {
    id: 'oracle-java-fundamentals',
    issuer: 'Oracle Academy',
    title: 'Java Fundamentals',
    date: '14 July 2024',
    sortKey: '2024-07',
    visual: {
      src: '/images/placeholders/cert-oracle-java.svg',
      alt: 'Placeholder for the Oracle Academy Java Fundamentals certificate',
      isPlaceholder: true,
      aspect: '4/3',
    },
    source: 'both',
  },
];

export const certificationEntries: CertificationEntry[] =
  certificationListSchema.parse(raw);

/** Newest first. */
export const certificationsSorted = [...certificationEntries].sort((a, b) =>
  b.sortKey.localeCompare(a.sortKey),
);
