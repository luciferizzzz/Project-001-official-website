import type { ReactNode } from 'react';
import type { PrincipleGlyphName } from '../../data/principles';
import './PrincipleGlyph.css';

type PrincipleGlyphProps = {
  name: PrincipleGlyphName;
};

const drawings: Record<PrincipleGlyphName, ReactNode> = {
  sovereignty: (
    <>
      <circle cx="60" cy="60" r="46" />
      <circle cx="60" cy="60" r="30" strokeDasharray="2 5" />
      <path d="M60 2v18M60 100v18M2 60h18M100 60h18" />
      <rect x="48" y="48" width="24" height="24" />
      <circle cx="60" cy="60" r="3" className="principle-glyph__solid" />
    </>
  ),
  composability: (
    <>
      <rect x="10" y="10" width="34" height="34" />
      <rect x="76" y="10" width="34" height="34" />
      <rect x="10" y="76" width="34" height="34" />
      <rect x="76" y="76" width="34" height="34" strokeDasharray="2 4" />
      <path d="M44 27h32M27 44v32M93 44v32M44 93h32" />
      <circle cx="60" cy="60" r="4" />
    </>
  ),
  security: (
    <>
      <rect x="14" y="14" width="92" height="92" />
      <rect x="30" y="30" width="60" height="60" strokeDasharray="3 4" />
      <rect x="46" y="46" width="28" height="28" />
      <path d="M60 14v16M60 90v16M14 60h16M90 60h16" />
      <circle cx="60" cy="60" r="3" className="principle-glyph__solid" />
    </>
  ),
};

/** Abstract geometric marks — not official product logos. */
export default function PrincipleGlyph({ name }: PrincipleGlyphProps) {
  return (
    <span className="principle-glyph" aria-hidden="true">
      <svg
        viewBox="0 0 120 120"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      >
        {drawings[name]}
      </svg>
    </span>
  );
}
