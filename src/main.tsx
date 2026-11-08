import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

import './styles/fonts.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/animations.css';

import App from './App';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root container #root was not found.');
}

hydrateRoot(
  container,
  <StrictMode>
    <App />
  </StrictMode>,
);
