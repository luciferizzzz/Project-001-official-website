import type { ReactNode } from 'react';
import './SectionHeading.css';

type SectionHeadingProps = {
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: 'default' | 'light';
  headingId?: string;
};

export default function SectionHeading({
  index,
  label,
  title,
  intro,
  tone = 'default',
  headingId,
}: SectionHeadingProps) {
  return (
    <header
      className={`section-heading${tone === 'light' ? ' section-heading--light' : ''}`}
      data-reveal
    >
      <p className={`eyebrow${tone === 'light' ? ' eyebrow--light' : ''}`}>
        <span className="eyebrow__index">{index}</span>
        <span aria-hidden="true">/</span>
        <span>{label}</span>
      </p>

      <div className="section-heading__row">
        <h2 className="section-heading__title" id={headingId}>
          {title}
        </h2>
        {intro ? <p className="section-heading__intro">{intro}</p> : null}
      </div>
    </header>
  );
}
