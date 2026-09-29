/**
 * SKILLS
 * ============================================================================
 * SOURCE: [D] = PORTOFOLIO HAMZAH (3).pdf ("Skills and Expertise" slide),
 *         supplemented by tools evidenced in [P]'s experience descriptions.
 *
 * Deliberately NO proficiency percentages or "expert/mastery" levels: neither
 * document states any, and inventing them would break the no-fabrication rule.
 * This is a list of things worked with, grouped by area.
 * ============================================================================
 */

import { skillGroupListSchema } from './schemas';
import type { SkillGroup } from '@/types/content';

const raw: SkillGroup[] = [
  {
    id: 'data-analytics',
    title: 'Data Analytics & Visualization',
    description: 'Turning raw data into readable, decision-ready views.',
    items: [
      'Google Looker Studio',
      'Excel (Advanced)',
      'Tableau',
      'Google Sheets',
      'Data visualisation',
      'Data processing & validation',
    ],
    source: 'both',
  },
  {
    id: 'programming-database',
    title: 'Programming & Database',
    description: 'Writing code and working with structured data.',
    items: [
      'Python',
      'SQL',
      'Java',
      'C++',
      'JavaScript',
      'Google Apps Script',
    ],
    source: 'both',
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning & Modeling',
    description: 'Methods applied in published research and coursework.',
    items: ['K-Nearest Neighbors (KNN)', 'Naive Bayes', 'SVM', 'Transformer model'],
    source: 'portfolio',
  },
  {
    id: 'business-process',
    title: 'Business Process & Analysis',
    description: 'Mapping how work actually flows, then improving it.',
    items: [
      'Business process flowcharting',
      'Systems analysis',
      'Process improvement',
      'Requirements documentation',
    ],
    source: 'both',
  },
  {
    id: 'design-creative',
    title: 'Design & Creative Tools',
    description: 'Interface design and supporting visual work.',
    items: [
      'Figma',
      'Adobe Photoshop',
      'Adobe Lightroom',
      'Canva',
      'CapCut',
      'UI/UX design',
    ],
    source: 'portfolio',
  },
  {
    id: 'office-documentation',
    title: 'Office & Documentation',
    description: 'Reporting, formal documents and written output.',
    items: [
      'Microsoft Word (Advanced)',
      'Microsoft Excel',
      'Microsoft PowerPoint',
      'Google Docs',
      'Technical reporting',
      'Scientific & popular article writing',
    ],
    source: 'portfolio',
  },
  {
    id: 'collaboration-tools',
    title: 'Collaboration & Tooling',
    description: 'The everyday stack used to get work done with others.',
    items: [
      'Google Workspace (Docs, Sheets, Drive)',
      'Draw.io',
      'GitHub',
      'OBS Studio',
      'Zoom',
    ],
    source: 'both',
  },
];

export const skillGroups: SkillGroup[] = skillGroupListSchema.parse(raw);
