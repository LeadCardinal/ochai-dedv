import React from 'react';
import ReactDOM from 'react-dom/client';
import App, { preloadRoute } from '@/App';
import '@/index.css';

const rootElement = document.getElementById('root');

const mount = () => {
  try {
    ReactDOM.createRoot(rootElement).render(
      <App />
    );
  } catch (error) {
    console.error('Error mounting React app:', error);
  }
};

if (rootElement) {
  // Fetch the current route's chunk first so the prerendered HTML isn't swapped
  // for a Suspense fallback; mount regardless if the preload fails.
  preloadRoute(window.location.pathname).catch(() => {}).then(mount);
}
