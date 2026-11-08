import { ArrowUp } from 'lucide-react';
import { NAV_ITEMS, SITE } from '../../data/site';
import { PROJECTS } from '../../data/projects';
import { PRINCIPLES } from '../../data/principles';
import Logo from '../ui/Logo';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand" data-reveal>
            <Logo
              variant="small"
              alt="Project 001 logo"
              className="site-footer__logo"
            />
            <p className="site-footer__name">
              Project <span>001</span>
            </p>
            <p className="site-footer__tagline">Freedom Through Technology.</p>
            <p className="site-footer__description">{SITE.description}</p>
          </div>

          <nav className="site-footer__column" aria-labelledby="footer-index">
            <h2 className="site-footer__heading" id="footer-index">
              Index
            </h2>
            <ul className="site-footer__links">
              {NAV_ITEMS.map((item) => (
                <li key={item.target}>
                  <a href={`#${item.target}`}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="site-footer__column" aria-labelledby="footer-projects">
            <h2 className="site-footer__heading" id="footer-projects">
              Projects
            </h2>
            <ul className="site-footer__links">
              {PROJECTS.map((project) => (
                <li key={project.id}>
                  <a href={`#project-${project.id}`}>
                    <span className="site-footer__link-index">
                      {project.index}
                    </span>
                    {project.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav
            className="site-footer__column"
            aria-labelledby="footer-principles"
          >
            <h2 className="site-footer__heading" id="footer-principles">
              Principles
            </h2>
            <ul className="site-footer__links">
              {PRINCIPLES.map((principle) => (
                <li key={principle.id}>
                  <a href="#principles">
                    <span className="site-footer__link-index">
                      {principle.index}
                    </span>
                    {principle.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="site-footer__bottom">
          <p>© {year} Project 001</p>
          <p className="site-footer__note">Independent technology collective</p>
          <a className="site-footer__back" href="#top">
            Back to top
            <ArrowUp size={13} strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
