import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';

import App from './App';

/** Rendered by scripts/prerender.mjs during the production build. */
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
