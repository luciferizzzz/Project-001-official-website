import { useCallback, useEffect, useRef, useState } from 'react';
import { NAV_ITEMS, NAV_SECTIONS } from '../../data/site';
import type { SectionId } from '../../data/site';
import Logo from '../ui/Logo';
import MobileMenu from './MobileMenu';
import './Navbar.css';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const watched = NAV_SECTIONS.map((entry) => {
      const element = document.getElementById(entry.id);
      return element ? { ...entry, element } : null;
    }).filter(
      (
        entry,
      ): entry is (typeof NAV_SECTIONS)[number] & { element: HTMLElement } =>
        entry !== null,
    );

    if (watched.length === 0) return;

    let frame = 0;

    const updateActive = () => {
      const probe = window.innerHeight * 0.34;
      let current = watched[0].navTarget;

      watched.forEach((entry) => {
        if (entry.element.getBoundingClientRect().top <= probe) {
          current = entry.navTarget;
        }
      });

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      if (atBottom) {
        current = watched[watched.length - 1].navTarget;
      }

      setActiveSection((previous) =>
        previous === current ? previous : current,
      );
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a className="brand" href="#home" aria-label="Project 001 — home">
          <Logo
            variant="small"
            alt=""
            className="brand__logo"
            loading="eager"
            fetchPriority="high"
          />
          <span className="brand__divider" aria-hidden="true" />
          <span className="brand__name">
            Project <span className="brand__num">001</span>
          </span>
        </a>

        <nav className="primary-nav" aria-label="Primary">
          <ul className="primary-nav__list">
            {NAV_ITEMS.map((item) => (
              <li key={item.target}>
                <a
                  className="primary-nav__link"
                  href={`#${item.target}`}
                  aria-current={
                    activeSection === item.target ? 'location' : undefined
                  }
                  onClick={() => setActiveSection(item.target)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={toggleRef}
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(true)}
        >
          <span className="menu-toggle__label">Menu</span>
          <span className="menu-toggle__icon" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <MobileMenu
        open={menuOpen}
        activeSection={activeSection}
        onClose={closeMenu}
      />
    </header>
  );
}
