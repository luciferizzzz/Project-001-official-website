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
    category: 'Desktop visual web designer',
    description:
      'Astra is a local-first desktop visual web designer for Windows. It opens an existing website project, renders it in a live canvas, and edits standard HTML, CSS, and JavaScript in place — with no account, no cloud, and no proprietary format.',
    note: 'Internal build 0.1.0 is read-only: open, render, select, and inspect. Visual editing and saving are still in development.',
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
      { label: 'Category', value: 'Desktop visual web designer' },
      { label: 'Organization', value: 'Project 001' },
      { label: 'Public record', value: 'Internal build 0.1.0' },
    ],
  },
  {
    id: 'nova',
    index: '02',
    name: 'Nova',
    category: 'Local news intelligence',
    description:
      'Nova is a local-first news intelligence system. It gathers RSS sources into a private, searchable dashboard that runs entirely on the local machine, with no account and no cloud dependency.',
    note: 'Latest release: v2.0.1 (October 2026).',
    status: {
      label: 'Developed',
      tone: 'developed',
    },
    logoPath: null,
    externalUrl: null,
    layout: 'split',
    record: [
      { label: 'Status', value: 'Developed' },
      { label: 'Category', value: 'Local news intelligence' },
      { label: 'Organization', value: 'Project 001' },
      { label: 'Public record', value: 'v2.0.1 release' },
    ],
  },
  {
    id: 'aegis',
    index: '03',
    name: 'Aegis',
    category: 'Security audit tool',
    description:
      'Aegis is the first SKILL.md built by Project 001: a local-first security audit tool for AI systems. It scans secrets, dependencies, code patterns, configuration, and infrastructure without sending data to the cloud.',
    note: 'v1.8.0 shipped with all five scanning layers; a modular v2 redesign is a draft and not yet approved.',
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
      { label: 'Category', value: 'Security audit tool' },
      { label: 'Organization', value: 'Project 001' },
      { label: 'Public record', value: 'v1.8.0 release' },
    ],
  },
];
