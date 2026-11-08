export type DevelopmentPractice = {
  index: string;
  title: string;
  description: string;
};

export const DEVELOPMENT_PRACTICES: DevelopmentPractice[] = [
  {
    index: '01',
    title: 'Research & experimentation',
    description:
      'We begin with questions, prototypes, and constraints rather than assumptions.',
  },
  {
    index: '02',
    title: 'Technical exploration',
    description:
      'We investigate unfamiliar tools and approaches before committing to a direction.',
  },
  {
    index: '03',
    title: 'Iterative development',
    description:
      'We work in deliberate increments, revisiting decisions as understanding improves.',
  },
  {
    index: '04',
    title: 'Internal testing',
    description:
      'We evaluate our work in controlled environments before presenting it publicly.',
  },
  {
    index: '05',
    title: 'Security considerations',
    description:
      'We examine data flows, permissions, and failure modes as part of the build, not after it.',
  },
  {
    index: '06',
    title: 'Continuous improvement',
    description:
      'We document what breaks, refine what remains, and keep our systems legible.',
  },
];

export const CONTACT_CHANNELS = [
  { label: 'Correspondence', value: 'Unavailable' },
  { label: 'Social profiles', value: 'Unavailable' },
  { label: 'External destinations', value: 'Unavailable' },
] as const;
