import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    // Use a relative base by default so the app can be deployed at root or any sub-path
    // You can override by setting VITE_BASE in your environment (e.g. VITE_BASE='/my-subpath/')
    const baseFromEnv = env.VITE_BASE || './';
    return {
      // For deployments under a subpath, set `base` via VITE_BASE environment variable.
      base: baseFromEnv,
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      // Do NOT inline sensitive API keys into the client bundle. Keep define empty here.
      // If you need to expose non-sensitive flags, add them explicitly with a VITE_ prefix.
      define: {},
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
