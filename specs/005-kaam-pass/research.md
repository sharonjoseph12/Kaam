# Research & Design Decisions: KAAM Pass

## Face-Match (Liveness Detection) in PWA
- **Decision**: Use `face-api.js` loaded via CDN or local assets to perform face mesh detection and liveness on the client side.
- **Rationale**: Keeps the PWA lightweight without heavy backend processing for simple liveness tasks. Can fallback to taking a picture and sending to backend if the client device is too slow.
- **Alternatives considered**: AWS Rekognition or Azure Face API. Rejected because it requires sending video streams to the backend, consuming precious bandwidth for workers.

## PWA Architecture and Offline Caching
- **Decision**: Use Vite with `vite-plugin-pwa`. Implement a Service Worker strategy that caches the app shell and uses IndexedDB (via `localforage`) for storing encrypted blobs of documents.
- **Rationale**: Modern tooling, highly performant, handles manifest and service worker injection automatically. IndexedDB handles >5MB blobs safely.
- **Alternatives considered**: Create React App. Rejected as outdated and slower than Vite.

## Lock Screen QR Generation
- **Decision**: Use `qrcode.react` to generate an SVG or Canvas, then render it on top of a template image using HTML5 Canvas API, allowing the user to download the generated image.
- **Rationale**: Easy to implement fully client-side.
- **Alternatives considered**: Backend generation. Rejected because it requires network roundtrips for a simple image composite.

## Voice Assistant
- **Decision**: Use `MediaRecorder` API for capturing audio chunks, send to backend which pipes to Bhashini API for processing. Receive an audio URL back to play via `HTMLAudioElement`.
- **Rationale**: Browser NLP is too heavy and lacks good Kannada/Hindi support offline.
- **Alternatives considered**: Web Speech API. Rejected due to poor Indian dialect support in some Android browsers.
