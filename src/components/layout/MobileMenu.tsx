import { useEffect, useRef } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { NAV_ITEMS } from '../../data/site';
import type { SectionId } from '../../data/site';
import Logo from '../ui/Logo';
import './MobileMenu.css';

type MobileMenuProps = {
  open: boolean;
  activeSection: SectionId;
  onClose: () => void;
};

export default function MobileMenu({
  open,
  activeSection,
  onClose,
}: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      document.body.classList.add('menu-open');
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      document.body.classList.remove('menu-open');
      onClose();
    };

    dialog.addEventListener('close', handleClose);

    return () => {
      dialog.removeEventListener('close', handleClose);
      document.body.classList.remove('menu-open');
    };
  }, [onClose]);

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  return (
    <dialog
      ref={dialogRef}
      className="mobile-menu"
      id="mobile-menu"
      aria-label="Site menu"
    >
      <div className="container mobile-menu__inner">
        <div className="mobile-menu__top">
          <a
            className="brand"
            href="#home"
            aria-label="Project 001 — home"
            onClick={closeDialog}
          >
            <Logo variant="small" alt="" className="brand__logo" loading="eager" />
            <span className="brand__divider" aria-hidden="true" />
            <span className="brand__name">
              Project <span className="brand__num">001</span>
            </span>
          </a>

          <button
            className="mobile-menu__close"
            type="button"
            onClick={closeDialog}
          >
            <span>Close</span>
            <X size={15} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>

        <nav className="mobile-menu__nav" aria-label="Mobile">
          <ul className="mobile-menu__list">
            {NAV_ITEMS.map((item, index) => (
              <li className="mobile-menu__item" key={item.target}>
                <a
                  className="mobile-menu__link"
                  href={`#${item.target}`}
                  aria-current={
                    activeSection === item.target ? 'location' : undefined
                  }
                  onClick={closeDialog}
                >
                  <span className="mobile-menu__index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{item.label}</span>
                  <ArrowRight
                    className="mobile-menu__arrow"
                    size={18}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mobile-menu__footer">
          <p className="mobile-menu__slogan">Freedom Through Technology.</p>
          <p className="mobile-menu__note">
            An independent technology collective building software guided by
            sovereignty, composability, and security.
          </p>
        </div>
      </div>
    </dialog>
  );
}
