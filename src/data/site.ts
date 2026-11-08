export const SITE = {
  name: 'Project 001',
  tagline: 'Freedom Through Technology.',
  description:
    'An independent technology collective building software guided by sovereignty, composability, and security.',
  locale: 'en',
  ogImage: '/og-image.png',
} as const;

export type SectionId =
  | 'home'
  | 'about'
  | 'principles'
  | 'projects'
  | 'development'
  | 'contact';

export type NavItem = {
  label: string;
  target: SectionId;
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', target: 'home' },
  { label: 'About', target: 'about' },
  { label: 'Principles', target: 'principles' },
  { label: 'Projects', target: 'projects' },
  { label: 'Contact', target: 'contact' },
];

/** Sections watched by the navigation. Development intentionally maps to Projects. */
export const NAV_SECTIONS: Array<{ id: SectionId; navTarget: SectionId }> = [
  { id: 'home', navTarget: 'home' },
  { id: 'about', navTarget: 'about' },
  { id: 'principles', navTarget: 'principles' },
  { id: 'projects', navTarget: 'projects' },
  { id: 'development', navTarget: 'projects' },
  { id: 'contact', navTarget: 'contact' },
];

export const ABOUT_FACTS = [
  {
    term: 'What we are',
    detail:
      'An independent technology collective exploring and building software, tools, and digital solutions.',
  },
  {
    term: 'Why we exist',
    detail:
      'To make technology that empowers people, preserves freedom, and remains under the control of its users.',
  },
  {
    term: 'How we work',
    detail:
      'Research, experimentation, iterative development, internal testing, and continuous improvement.',
  },
  {
    term: 'Long-term vision',
    detail:
      'A durable body of work that remains useful, legible, and under the control of the people who use it.',
  },
] as const;

export const HERO_META = [
  { label: 'Identity', value: 'Independent collective' },
  { label: 'Focus', value: 'Software, tools, digital solutions' },
  { label: 'Basis', value: 'Sovereignty · Composability · Security' },
] as const;
