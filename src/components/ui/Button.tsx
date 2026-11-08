import type { ReactNode } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import './Button.css';

type ButtonVariant = 'primary' | 'secondary' | 'quiet';
type ButtonIcon = 'arrow' | 'up-right' | 'none';

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: ButtonIcon;
  className?: string;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
  ariaHasPopup?: 'dialog';
};

export default function Button({
  children,
  variant = 'primary',
  icon = 'arrow',
  className,
  href,
  onClick,
  ariaLabel,
  ariaHasPopup,
}: ButtonProps) {
  const classes = ['btn', `btn--${variant}`, className].filter(Boolean).join(' ');

  const iconNode =
    icon === 'arrow' ? (
      <ArrowRight size={15} strokeWidth={1.75} />
    ) : icon === 'up-right' ? (
      <ArrowUpRight size={15} strokeWidth={1.75} />
    ) : null;

  const content = (
    <>
      <span>{children}</span>
      {iconNode ? (
        <span className="btn__icon" aria-hidden="true">
          {iconNode}
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        aria-haspopup={ariaHasPopup}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={classes}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-haspopup={ariaHasPopup}
    >
      {content}
    </button>
  );
}
