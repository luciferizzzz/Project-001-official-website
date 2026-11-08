export type PrincipleGlyphName = 'sovereignty' | 'composability' | 'security';

export type Principle = {
  id: string;
  index: string;
  title: string;
  statement: string;
  detail: string;
  glyph: PrincipleGlyphName;
};

export const PRINCIPLES: Principle[] = [
  {
    id: 'sovereignty',
    index: '01',
    title: 'Sovereignty',
    statement: 'Technology should remain under the control of its users.',
    detail:
      'Users should have control over their data, models, and infrastructure. Technology should empower individuals rather than make them dependent on centralized systems.',
    glyph: 'sovereignty',
  },
  {
    id: 'composability',
    index: '02',
    title: 'Composability',
    statement:
      'Systems should be modular, flexible, and capable of working together.',
    detail:
      'Technology should be modular, adaptable, and interoperable. Systems should be designed to evolve without unnecessary restrictions.',
    glyph: 'composability',
  },
  {
    id: 'security',
    index: '03',
    title: 'Security',
    statement:
      'Security should be integrated into the development process through transparency, auditing, and responsible engineering.',
    detail:
      'Security must be considered from the beginning of development, with privacy and systematic review treated as part of the work rather than an afterthought.',
    glyph: 'security',
  },
];
