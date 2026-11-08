import { ABOUT_FACTS } from '../../data/site';
import SectionHeading from '../ui/SectionHeading';
import './About.css';

export default function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading
          index="01"
          label="About"
          headingId="about-title"
          title={
            <>
              An independent <em>collective</em>.
            </>
          }
          intro="A collective identity built around shared principles, technical exploration, and technological independence."
        />

        <div className="about__grid">
          <div className="about__lead" data-reveal>
            <p className="about__intro">
              Project 001 is an independent technology collective exploring and
              building software, tools, and digital solutions.
            </p>

            <div className="about__body">
              <p>
                We believe technology should empower people, preserve freedom,
                and remain under the control of its users. That belief shapes how
                the collective approaches architecture, governance, and intent.
              </p>
              <p>
                The work is developed for the long term: systems intended to stay
                legible, evolve without unnecessary restrictions, and remain
                useful beyond a single release.
              </p>
            </div>

            <blockquote className="about__quote">
              <p>Independent in architecture, governance, and intent.</p>
              <cite>Project 001</cite>
            </blockquote>
          </div>

          <dl className="about__facts" data-reveal>
            {ABOUT_FACTS.map((fact) => (
              <div className="about__fact" key={fact.term}>
                <dt>{fact.term}</dt>
                <dd>{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
