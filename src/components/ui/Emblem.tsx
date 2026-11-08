import Logo from './Logo';
import './Emblem.css';

/**
 * Secondary hero artwork: a technical-drawing frame around the official
 * Project 001 mark. All ornament is CSS/SVG-free geometry, not a logo.
 */
export default function Emblem() {
  return (
    <figure className="emblem">
      <div className="emblem__frame" aria-hidden="true">
        <span className="emblem__ring emblem__ring--outer" />
        <span className="emblem__ring emblem__ring--inner" />
        <span className="emblem__orbit" />
        <span className="emblem__axis emblem__axis--x" />
        <span className="emblem__axis emblem__axis--y" />
        <span className="emblem__halo" />
      </div>

      <span className="emblem__tag" aria-hidden="true">
        Fig. 001
      </span>
      <span className="emblem__tag emblem__tag--right" aria-hidden="true">
        Mark / 001
      </span>

      <Logo
        variant="mark"
        alt="Project 001 logo"
        className="emblem__logo"
        loading="eager"
        fetchPriority="high"
      />

      <figcaption className="emblem__caption">
        <span>Independent collective</span>
        <span>Project 001</span>
      </figcaption>
    </figure>
  );
}
