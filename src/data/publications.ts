/**
 * PUBLICATIONS
 * ============================================================================
 * SOURCE: [D] journal pages reproduced in the deck; titles cross-checked vs [P].
 * IMAGES: real journal covers and article pages from ./konten.
 *
 * Every field was read off the journal pages shown in the deck. Nothing is
 * inferred. No DOI is listed because none appears in the source, and none has
 * been invented.
 * ============================================================================
 */

import { publicationListSchema } from './schemas';
import type { PublicationEntry } from '@/types/content';

const raw: PublicationEntry[] = [
  {
    id: 'knn-creditworthiness',
    title:
      'The Application of K-Nearest Neighbors Algorithm in Creditworthiness Evaluation: A Case Study on Bank ABC',
    titleId:
      'Penerapan Algoritma K-Nearest Neighbors dalam Evaluasi Kelayakan Kredit: Studi Kasus pada Bank ABC',
    authors: ['Hamzah Naufal Zuhdi', 'Budi Prasetyo'],
    authorPosition: 1,
    venue: 'IJIRSE',
    venueFull:
      'Indonesian Journal of Informatic Research and Software Engineering',
    publisher: 'Institute of Research and Publication Indonesia (IRPI)',
    volume: 'Vol. 4',
    issue: 'No. 1',
    pages: 'pp. 40–46',
    year: '2024',
    issn: '2775-5754',
    issnPrint: '2797-2712',
    accreditation: 'SINTA 5 accredited',
    doi: '10.57152/ijirse.v4i1.1343',
    link: {
      label: 'View article',
      href: 'https://doi.org/10.57152/ijirse.v4i1.1343',
      external: true,
    },
    metric: '93.33%–95.00% accuracy',
    method: 'K-Nearest Neighbors with confusion-matrix evaluation',
    keywords: [
      'K-Nearest Neighbors',
      'creditworthiness',
      'banking sector',
      'confusion matrix',
    ],
    /*
      VISUAL = the paper's OWN first page, not the issue cover.

      The cover only identifies the ISSUE — this issue carries several papers, so
      a cover on the card does not tell a reader which article they are looking
      at. The first page carries the title and byline, which is what a publication
      card is for. The cover still appears, as the second gallery frame.
    */
    visual: {
      src: '/images/publications/ijirse-article-knn.webp',
      alt: 'First page of the KNN creditworthiness paper, headed IJIRSE Vol. 4 No. 1, Maret 2024, pp. 40–46',
      width: 1100,
      aspect: '3/4',
    },
    gallery: [
      {
        src: '/images/publications/ijirse-article-knn.webp',
        alt: 'First page of the KNN creditworthiness paper showing the title and authors',
        width: 1100,
        caption: 'Article first page',
      },
      {
        src: '/images/publications/ijirse-cover.webp',
        alt: 'IJIRSE journal cover, Vol 4. Iss 1, Maret 2024',
        width: 900,
        caption: 'Journal cover — Vol. 4 No. 1',
      },
    ],
    source: 'both',
  },
  {
    id: 'naive-bayes-ipusnas',
    title:
      'Sentiment Analysis On Ipusnas Application Reviews In Google Play Store Using Naive Bayes Classifier',
    titleId:
      'Analisis Sentimen pada Ulasan Aplikasi iPusnas di Google Play Store Menggunakan Naive Bayes Classifier',
    authors: ['Hamzah Naufal Zuhdi', 'Budi Prasetyo'],
    authorPosition: 1,
    venue: 'IJIRSE',
    venueFull:
      'Indonesian Journal of Informatic Research and Software Engineering',
    publisher: 'Institute of Research and Publication Indonesia (IRPI)',
    volume: 'Vol. 5',
    issue: 'No. 1',
    pages: 'pp. 12–19',
    year: '2025',
    issn: '2775-5754',
    issnPrint: '2797-2712',
    accreditation: 'SINTA 5 accredited',
    doi: '10.57152/ijirse.v5i1.1846',
    link: {
      label: 'View article',
      href: 'https://doi.org/10.57152/ijirse.v5i1.1846',
      external: true,
    },
    metric: '75% F1-score (80:20 split)',
    method: 'Naive Bayes classification with an 80:20 train–test split',
    keywords: ['digital library', 'iPusnas', 'Naive Bayes algorithm', 'sentiment'],
    visual: {
      src: '/images/publications/ijirse-article-nb.webp',
      alt: 'First page of the iPusnas sentiment analysis paper, headed IJIRSE Vol. 5 No. 1, Maret 2025, pp. 12–19',
      width: 1100,
      aspect: '3/4',
    },
    gallery: [
      {
        src: '/images/publications/ijirse-article-nb.webp',
        alt: 'First page of the iPusnas sentiment analysis paper showing the title and authors',
        width: 1100,
        caption: 'Article first page',
      },
    ],
    source: 'both',
  },
  {
    id: 'smart-farming-simpeldes',
    title:
      'Smart Farming: Optimalisasi Suplai Air Lahan untuk Produktivitas Pertanian Desa Gonoharjo dengan Automatic Irrigation System Berbasis Energi Hijau Terintegrasi SIMPELDES',
    /*
      AUTHOR LIST — read from the APA citation block printed on the article's own
      first page, which is the authoritative byline. An earlier version listed
      eight names taken from the deck and flagged the tail as possibly
      incomplete; the printed citation carries sixteen, so the eight-name version
      was truncated. Hamzah is the fifth author, which both sources agree on.
    */
    authors: [
      'Melani Siyamafiroh',
      'Lintang Kilau Kemuning',
      'Rizkiyanti Choirunnisa',
      'Muhammad Naufal Rustiawan',
      'Hamzah Naufal Zuhdi',
      'Wigar Sofian Ghally Nugraha',
      'Alfiah',
      'Nabila Khoiriyatunnisa',
      'Lutfi Zaki Prabaswara',
      'Muhammad Syafiq Fadhilah',
      'Averro S Biyantoro',
      'Alfia Sisilia',
      'Bella Stellvi',
      'Novi Fitri Rahayu',
      'Muhammad Assegaf',
      'Inez Pradipta Prabaswara',
    ],
    // Fifth of sixteen, as printed on the article.
    authorPosition: 5,
    venue: 'AMPOEN',
    venueFull:
      'Ampoen: Jurnal Pengabdian kepada Masyarakat — Universitas Serambi Mekkah',
    publisher: 'Universitas Serambi Mekkah, Kota Banda Aceh',
    volume: 'Vol. 2',
    issue: 'No. 2',
    pages: 'pp. 980–993',
    year: '2024',
    issn: '3025-8030',
    issnPrint: '3025-6267',
    method: 'Community programme article documenting an IoT-based deployment',
    abstract:
      'Desa Gonoharjo, on the slopes of Mount Ungaran in Central Java, has substantial agricultural potential but faced sub-optimal conventional irrigation, particularly during the dry season, alongside manual village services. The PPK Ormawa HIMA ILKOM FMIPA UNNES programme addressed this through IoT-based technology and a digital information system: a renewable-energy automatic irrigation system to support more even and efficient water distribution, integrated with SIMPELDES (the village service information system) to speed up information flow and data processing. Activities included site surveys, smart farming technology socialisation, installation of the automatic irrigation system with solar panels, farmer education, and monitoring and evaluation.',
    /*
      LINK — the journal's own article listing, NOT the printed DOI.

      The article's front page prints `10.32672/ampoen.v2i2.2365`. That DOI is not
      resolvable: the handle system returns `responseCode: 100` (not found) and
      Crossref has no record for it, even though the publisher's prefix
      (10.32672, Universitas Serambi Mekkah) is registered. Linking it would ship
      a 404.

      The URL below is printed on the same page under "Lainnya Kunjungi" and is
      the publisher's own stable address for the journal. The DOI is kept in
      `doi` so the citation stays complete and so a later re-check is a one-field
      change once the publisher registers it.
    */
    doi: '10.32672/ampoen.v2i2.2365',
    link: {
      label: 'View article',
      href: 'https://jurnal.serambimekkah.ac.id/index.php/ampoen',
      external: true,
    },
    visual: {
      src: '/images/publications/ampoen-cover.webp',
      alt: 'Cover of the Ampoen journal (Jurnal Pengabdian kepada Masyarakat), Vol. 2 No. 2, Tahun 2024, published by Universitas Serambi Mekkah, Banda Aceh',
      width: 900,
      aspect: '3/4',
    },
    gallery: [
      {
        src: '/images/publications/ampoen-article.webp',
        alt: 'First page of the Smart Farming article showing the title and the full sixteen-author list',
        width: 1100,
        caption: 'Article first page',
      },
      {
        src: '/images/publications/ampoen-cover.webp',
        alt: 'Ampoen journal cover, Vol. 2 No. 2, Tahun 2024',
        width: 900,
        caption: 'Journal cover',
      },
    ],
    source: 'both',
  },
];

export const publicationEntries: PublicationEntry[] =
  publicationListSchema.parse(raw);

/** Newest first — the order the pages show them in. */
export const publicationsSorted = [...publicationEntries].sort((a, b) =>
  b.year.localeCompare(a.year),
);

/** Papers where Hamzah is the first author — used for a homepage stat. */
export const firstAuthorPublications = publicationsSorted.filter(
  (p) => p.authorPosition === 1,
);

export function getPublication(id: string): PublicationEntry | undefined {
  return publicationEntries.find((p) => p.id === id);
}
