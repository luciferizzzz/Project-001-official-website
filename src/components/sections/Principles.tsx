import { PRINCIPLES } from '../../data/principles';
import PrincipleGlyph from '../ui/PrincipleGlyph';
import SectionHeading from '../ui/SectionHeading';
import './Principles.css';

export default function Principles() {
  return (
    <section
      id="principles"
      className="section section--dark principles"
      aria-labelledby="principles-title"
    >
      <div className="container">
        <SectionHeading
          index="02"
          label="Principles"
          tone="light"
          headingId="principles-title"
          title={
            <>
              Principles before <em>products</em>.
            </>
          }
          intro="A digital manifesto in three parts. These commitments shape what the collective builds and how it builds it."
        />

        <ol className="principles__list">
          {PRINCIPLES.map((principle) => (
            <li className="principle" key={principle.id} data-reveal>
              <span className="principle__index" aria-hidden="true">
                {principle.index}
              </span>

              <div className="principle__body">
                <h3 className="principle__title">{principle.title}</h3>
                <p className="principle__statement">{principle.statement}</p>
                <p className="principle__detail">{principle.detail}</p>
              </div>

              <PrincipleGlyph name={principle.glyph} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
