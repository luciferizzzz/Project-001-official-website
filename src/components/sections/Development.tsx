import { DEVELOPMENT_PRACTICES } from '../../data/development';
import './Development.css';

export default function Development() {
  return (
    <section
      id="development"
      className="section section--surface development"
      aria-labelledby="development-title"
    >
      <div className="container development__grid">
        <div className="development__lead" data-reveal>
          <p className="eyebrow">
            <span className="eyebrow__index">04</span>
            <span aria-hidden="true">/</span>
            <span>Development</span>
          </p>

          <h2 className="development__title" id="development-title">
            How the work is <em>made</em>.
          </h2>

          <p className="development__intro">
            Project 001 works through research, experimentation, and deliberate
            iteration. The process is documented as it develops — not presented
            as finished before it is.
          </p>

          <div className="development__note">
            <p className="development__note-label">A note on claims</p>
            <p>
              This describes working practice. It is not a certification, a
              security guarantee, or a claim of production readiness.
            </p>
          </div>
        </div>

        <ol className="development__list">
          {DEVELOPMENT_PRACTICES.map((practice) => (
            <li className="development__item" key={practice.index} data-reveal>
              <span className="development__index" aria-hidden="true">
                {practice.index}
              </span>
              <div>
                <h3 className="development__item-title">{practice.title}</h3>
                <p className="development__item-text">{practice.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
