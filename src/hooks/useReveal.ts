import { useEffect } from 'react';

/**
 * Adds a gentle reveal to elements marked with data-reveal.
 *
 * Only elements below the initial viewport are hidden, so content is never
 * invisible without JavaScript or before hydration. Reduced-motion users and
 * browsers without IntersectionObserver simply see the content immediately.
 */
export function useReveal(): void {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]'),
    );

    if (elements.length === 0) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-revealed'));
      return;
    }

    const viewportHeight = window.innerHeight;

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top > viewportHeight * 0.92) {
        element.classList.add('is-pending');
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove('is-pending');
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
}
