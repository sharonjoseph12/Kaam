# Quickstart: KAAM Pass

## Setup

1. Initialize Vite PWA project:
   ```bash
   npm create vite@latest kaam-pass-pwa -- --template react
   cd kaam-pass-pwa
   npm install
   npm install vite-plugin-pwa localforage face-api.js qrcode.react
   ```

2. Configure `vite.config.js` with `vite-plugin-pwa` for service worker generation.
3. Start the dev server:
   ```bash
   npm run dev
   ```

## Key Modules
- **`src/services/storage/`**: Functions wrapping `localforage` for document offline cache.
- **`src/services/auth/`**: `face-api.js` initialization and liveness check flows.
- **`src/services/bhashini/`**: Audio recording wrappers for voice features.
