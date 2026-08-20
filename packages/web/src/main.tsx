import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { log } from './logging';

const root = document.getElementById('root');
if (!root) {
  throw new Error('Root element not found');
}

log.debug('web logger ready');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
