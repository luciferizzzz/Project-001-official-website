export type ProjectStatusTone = 'developed' | 'hold';

export type ProjectStatus = {
  label: string;
  note?: string;
  tone: ProjectStatusTone;
};

export type ProjectRecordEntry = {
  label: string;
  value: string;
};

export type ProjectLayout = 'feature' | 'split' | 'quiet';

/**
 * Central project register. Adding a new project only requires a new entry
 * here; the Projects section and the project-record dialog render from this
 * data. `logoPath` is null when no official mark has been supplied.
 */
export type Project = {
  id: string;
  index: string;
  name: string;
  category: string;
  description: string;
  note?: string;
  status: ProjectStatus;
  logoPath: string | null;
  logoWidth?: number;
  logoHeight?: number;
  logoAlt?: string;
  externalUrl: string | null;
  layout: ProjectLayout;
  record: ProjectRecordEntry[];
};

export const PROJECTS: Project[] = [
  {
    id: 'astra',
    index: '01',
    name: 'Astra',
    category: 'Desktop application',
    description:
      'Astra is a desktop application developed under Project 001. It is an existing product with its own identity and development direction.',
    status: {
      label: 'Developed',
      tone: 'developed',
    },
    logoPath: '/assets/projects/astra-logo.png',
    logoWidth: 760,
    logoHeight: 704,
    logoAlt: 'Astra logo',
    externalUrl: null,
    layout: 'feature',
    record: [
      { label: 'Status', value: 'Developed' },
      { label: 'Category', value: 'Desktop application' },
      { label: 'Organization', value: 'Project 001' },
      { label: 'Public record', value: 'Initial' },
    ],
  },
  {
    id: 'nova',
    index: '02',
    name: 'Nova',
    category: 'Project identity',
    description:
      'Nova is a project developed under Project 001. Its public description and official identity have not yet been released.',
    note: 'This record will be updated when official information is available.',
    status: {
      label: 'Developed',
      tone: 'developed',
    },
    logoPath: null,
    externalUrl: null,
    layout: 'split',
    record: [
      { label: 'Status', value: 'Developed' },
      { label: 'Category', value: 'To be announced' },
      { label: 'Organization', value: 'Project 001' },
      { label: 'Public record', value: 'Description pending' },
    ],
  },
  {
    id: 'aegis',
    index: '03',
    name: 'Aegis',
    category: 'Previous initiative',
    description:
      'Aegis is a previous Project 001 initiative currently on hold while its concept and direction undergo a planned redesign.',
    note: 'Aegis is paused rather than discontinued. Development is not currently progressing.',
    status: {
      label: 'On Hold',
      note: 'Under Redesign',
      tone: 'hold',
    },
    logoPath: null,
    externalUrl: null,
    layout: 'quiet',
    record: [
      { label: 'Status', value: 'On Hold / Under Redesign' },
      { label: 'Category', value: 'Previous initiative' },
      { label: 'Organization', value: 'Project 001' },
      { label: 'Public record', value: 'Redesign pending' },
    ],
  },
];
