/**
 * SOURCE: [D] = "Skills and Expertise" slide, plus tools evidenced in [P]'s
 * experience descriptions.
 *
 * ICON STRATEGY (see src/data/skill-icons.ts): `icon` names a key in the registry.
 * Icons come from `simple-icons` where a brand mark exists, otherwise a local set.
 * simple-icons omits some trademarks (Tableau, Adobe, Microsoft Office, Canva);
 * those use a local monogram fallback.
 *
 * NO PROFICIENCY LEVELS — neither source states any, so showing "Python 90%" would
 * be fabrication. This is a list of things worked with, grouped by area. The file
 * once carried a "Hardware & IoT" group (sensors, ESP32); it was removed on the
 * user's instruction as overstating a team deployment. The ESP32 still appears
 * where accurate — the project's own tools list.
 *
 * TO ADD A SKILL: add one string to the relevant `items` array, plus an `icon`
 * entry in skill-icons.ts if you want a logo (leave `icon: null` for icon-less).
 *
 * CATEGORY ORDER IS THE POSITIONING: the brief requires DATA -> TECHNOLOGY ->
 * DESIGN -> SUPPORTING. Categories closest to the data work lead; collaboration,
 * office and business tools come after.
 */

import { skillGroupListSchema } from './schemas';
import type { SkillGroup } from '@/types/content';

const raw: SkillGroup[] = [
  {
    id: 'data-analytics',
    title: 'Data Analytics & Visualization',
    description: 'Turning raw data into readable, decision-ready views.',
    items: [
      { name: 'Google Looker Studio', icon: 'looker' },
      { name: 'Tableau', icon: 'tableau' },
      { name: 'Microsoft Excel', icon: 'excel' },
      { name: 'Google Sheets', icon: 'sheets' },
      { name: 'Data visualisation', icon: 'dataviz' },
      { name: 'Data processing & validation', icon: 'datacheck' },
    ],
    source: 'both',
  },
  {
    id: 'programming-database',
    title: 'Programming & Database',
    description: 'Writing code and working with structured data.',
    items: [
      { name: 'Python', icon: 'python' },
      { name: 'SQL', icon: 'sql' },
      { name: 'Java', icon: 'java' },
      { name: 'C++', icon: 'cpp' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'Google Apps Script', icon: 'appsscript' },
      { name: 'Google Colab', icon: 'colab' },
    ],
    source: 'both',
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning & Modeling',
    description: 'Methods applied in published research and coursework.',
    items: [
      { name: 'K-Nearest Neighbors', icon: 'knn' },
      { name: 'Naive Bayes', icon: 'bayes' },
      { name: 'SVM', icon: 'svm' },
      { name: 'Transformer model', icon: 'transformer' },
      { name: 'Model evaluation', icon: 'evaluation' },
      { name: 'Confusion matrix analysis', icon: 'confusion' },
    ],
    source: 'portfolio',
  },
  {
    id: 'it-support-hardware',
    title: 'IT Support & Hardware',
    description:
      'Everyday hardware and end-user support — computer setup, peripherals, and keeping devices working.',
    items: [
      { name: 'Windows environment', icon: 'windows' },
      { name: 'Computer hardware setup', icon: 'pc' },
      { name: 'Device troubleshooting', icon: 'wrench' },
      { name: 'Microsoft Office Suite', icon: 'officesuite' },
    ],
    source: 'portfolio',
  },
  {
    id: 'networking-security',
    title: 'Networking & Security',
    description:
      'Network and security fundamentals, evidenced by the Cisco Networking Academy Cybersecurity Essentials certificate.',
    items: [
      { name: 'Cybersecurity essentials', icon: 'cisco' },
      { name: 'Networking fundamentals', icon: 'network' },
      { name: 'Technical documentation', icon: 'documentation' },
    ],
    source: 'portfolio',
  },
  {
    id: 'design-creative',
    title: 'Design & Creative',
    description: 'Interface design and supporting visual work.',
    items: [
      { name: 'Figma', icon: 'figma' },
      { name: 'Adobe Photoshop', icon: 'photoshop' },
      { name: 'Adobe Lightroom', icon: 'lightroom' },
      { name: 'Canva', icon: 'canva' },
      { name: 'CapCut', icon: 'capcut' },
      { name: 'UI/UX design', icon: 'uiux' },
    ],
    source: 'portfolio',
  },
  {
    id: 'collaboration-tooling',
    title: 'Collaboration & Tooling',
    description: 'The everyday stack used to get work done with others.',
    items: [
      { name: 'GitHub', icon: 'github' },
      { name: 'Git', icon: 'git' },
      { name: 'Google Drive', icon: 'gdrive' },
      { name: 'Draw.io', icon: 'drawio' },
      { name: 'OBS Studio', icon: 'obs' },
      { name: 'Zoom', icon: 'zoom' },
    ],
    source: 'both',
  },
  {
    id: 'office-documentation',
    title: 'Office & Documentation',
    description: 'Reporting, formal documents and written output.',
    items: [
      { name: 'Microsoft Word', icon: 'word' },
      { name: 'Microsoft PowerPoint', icon: 'powerpoint' },
      { name: 'Google Docs', icon: 'gdocs' },
      { name: 'Technical reporting', icon: 'techreport' },
      { name: 'Scientific article writing', icon: 'scientific' },
      { name: 'Popular article writing', icon: 'popular' },
    ],
    source: 'portfolio',
  },
  {
    id: 'business-process',
    title: 'Business Process & Analysis',
    description: 'Mapping how work actually flows, then improving it.',
    items: [
      { name: 'Business process flowcharting', icon: 'drawio' },
      { name: 'Systems analysis', icon: 'systems' },
      { name: 'Process improvement', icon: 'improve' },
      { name: 'Requirements documentation', icon: 'requirements' },
    ],
    source: 'both',
  },
];

export const skillGroups: SkillGroup[] = skillGroupListSchema.parse(raw);

export const totalSkills = skillGroups.reduce((n, g) => n + g.items.length, 0);
