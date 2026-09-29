/**
 * PUBLICATIONS
 * ============================================================================
 * SOURCE: [D] = PORTOFOLIO HAMZAH (3).pdf (journal pages reproduced in the deck)
 *         [P] = Profile.pdf (title list only)
 *
 * Every field below was read off the journal pages shown in the deck. Nothing is
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
    metric: '93.33%–95.00% accuracy',
    keywords: ['K-Nearest Neighbors', 'creditworthiness', 'banking sector', 'confusion matrix'],
    visual: {
      src: '/images/placeholders/publication-ijirse-knn.svg',
      alt: 'Placeholder for the IJIRSE KNN creditworthiness paper',
      isPlaceholder: true,
      aspect: '4/3',
    },
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
    metric: '75% F1-score (80:20 split)',
    keywords: ['digital library', 'iPusnas', 'Naive Bayes algorithm', 'sentiment'],
    visual: {
      src: '/images/placeholders/publication-ijirse-naive-bayes.svg',
      alt: 'Placeholder for the IJIRSE iPusnas sentiment analysis paper',
      isPlaceholder: true,
      aspect: '4/3',
    },
    source: 'both',
  },
  {
    id: 'smart-farming-simpeldes',
    title:
      'Smart Farming: Optimalisasi Suplai Air Lahan untuk Produktivitas Pertanian Desa Gonoharjo dengan Automatic Irrigation System Berbasis Energi Hijau Terintegrasi SIMPELDES',
    authors: [
      'Melani Siyamafiroh',
      'Lintang Kilau Kemuning',
      'Rizkiyanti Choirunnisa',
      'Muhammad Naufal Rustiawan',
      'Hamzah Naufal Zuhdi',
      'Wigar Sofian Ghally Nugraha',
      'Alfiah',
      'Nabila',
    ],
    // Hamzah is the fifth author of this multi-author paper, as printed.
    authorPosition: 5,
    venue: 'AMPOEN',
    venueFull:
      'Ampoen: Jurnal Pengabdian kepada Masyarakat — Universitas Serambi Mekkah',
    publisher: 'Universitas Serambi Mekkah, Kota Banda Aceh',
    volume: 'Vol. 2',
    issue: 'No. 2',
    year: '2024',
    issn: '3025-8030',
    issnPrint: '3025-6267',
    abstract:
      'Desa Gonoharjo, on the slopes of Mount Ungaran in Central Java, has substantial agricultural potential but faced sub-optimal conventional irrigation, particularly during the dry season, alongside manual village services. The PPK Ormawa HIMA ILKOM FMIPA UNNES programme addressed this through IoT-based technology and a digital information system: a renewable-energy automatic irrigation system to support more even and efficient water distribution, integrated with SIMPELDES (the village service information system) to speed up information flow and data processing. Activities included site surveys, smart farming technology socialisation, installation of the automatic irrigation system with solar panels, farmer education, and monitoring and evaluation.',
    visual: {
      src: '/images/placeholders/publication-smart-farming.svg',
      alt: 'Placeholder for the Smart Farming AMPOEN journal article',
      isPlaceholder: true,
      aspect: '4/3',
    },
    source: 'both',
    todo:
      'Author list was read from the printed article and may be incomplete at the tail (two further author names were partially visible). Verify the full byline before publishing.',
  },
];

export const publicationEntries: PublicationEntry[] =
  publicationListSchema.parse(raw);

export function getPublication(id: string): PublicationEntry | undefined {
  return publicationEntries.find((p) => p.id === id);
}
