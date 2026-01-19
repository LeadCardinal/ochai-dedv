
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    ReactDOM.createRoot(rootElement).render(
      <App />
    );
  } catch (error) {
    console.error('Error mounting React app:', error);
  }
}
