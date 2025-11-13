
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Register Service Worker only in production builds. Registering a SW during
// development or when the app is served from an unexpected base path can
// cause cached assets to be served (leading to an apparent white-screen).
if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    try {
      // use a relative path so the SW scope matches the app base path
      const swPath = './service-worker.js';
      navigator.serviceWorker.register(swPath)
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          // Log error but don't block app rendering
          console.warn('SW registration failed (non-fatal): ', registrationError);
        });
    } catch (e) {
      // Guard against any unexpected runtime errors during registration
      // so the app doesn't fail to render.
      // eslint-disable-next-line no-console
      console.warn('Service worker registration skipped:', e);
    }
  });
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);