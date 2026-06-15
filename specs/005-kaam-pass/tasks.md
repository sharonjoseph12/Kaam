# Tasks: KAAM Pass

**Input**: Design documents from `/specs/005-kaam-pass/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Initialize PWA project using Vite and React in `kaam-pass-pwa/`
- [x] T002 [P] Install dependencies: `vite-plugin-pwa`, `localforage`, `face-api.js`, `qrcode.react`, `lucide-react`
- [x] T003 [P] Configure `vite.config.js` for PWA manifest and service worker

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T004 Create UI component library (buttons, gauge, cards) in `kaam-pass-pwa/src/components/`
- [x] T005 [P] Setup router layout in `kaam-pass-pwa/src/App.jsx`
- [x] T006 [P] Configure global state context for WorkerProfile in `kaam-pass-pwa/src/context/WorkerContext.jsx`

---

## Phase 3: User Story 1 - Smart-Sync Attendance & Verification (Priority: P1) 🎯 MVP

**Goal**: Confirm daily attendance and verify identity via biometric face-match.

### Implementation for User Story 1

- [x] T007 [P] [US1] Create Dashboard page in `kaam-pass-pwa/src/pages/Dashboard.jsx` (Credit Score Gauge, Earnings Snapshot)
- [x] T008 [P] [US1] Implement `face-api.js` utility in `kaam-pass-pwa/src/services/auth/faceMatch.js`
- [x] T009 [US1] Create Liveness Verification page in `kaam-pass-pwa/src/pages/Verify.jsx` using `faceMatch.js`
- [x] T010 [US1] Integrate Verify page with WorkerContext to update `isVerified` status

---

## Phase 4: User Story 2 - Instant Secure Loan Access (Priority: P1)

**Goal**: Request loan, authenticate through app, and trigger disbursement.

### Implementation for User Story 2

- [x] T011 [P] [US2] Create Loan Request modal/page in `kaam-pass-pwa/src/pages/Loan.jsx`
- [x] T012 [US2] Wire Loan Request to Verify page for biometric confirmation
- [x] T013 [US2] Mock backend API call for loan disbursement in `kaam-pass-pwa/src/services/api/loan.js`

---

## Phase 5: User Story 3 - Offline Digital Vault (Priority: P2)

**Goal**: Cache documents for offline access.

### Implementation for User Story 3

- [x] T014 [P] [US3] Create IndexedDB wrapper in `kaam-pass-pwa/src/services/storage/documents.js`
- [x] T015 [P] [US3] Create Documents page in `kaam-pass-pwa/src/pages/Documents.jsx`
- [x] T016 [US3] Implement document fetching and caching logic using `documents.js`

---

## Phase 6: User Story 4 - Voice Assistant Navigation (Priority: P2)

**Goal**: Voice commands in Kannada/Hindi.

### Implementation for User Story 4

- [x] T017 [P] [US4] Implement MediaRecorder wrapper in `kaam-pass-pwa/src/services/bhashini/voice.js`
- [x] T018 [US4] Create floating Voice Button component in `kaam-pass-pwa/src/components/VoiceButton.jsx`
- [x] T019 [US4] Integrate Voice Button into Dashboard and mock Bhashini API response

---

## Phase 7: User Story 5 - Safety QR Lock-Screen (Priority: P3)

**Goal**: Generate emergency info QR wallpaper.

### Implementation for User Story 5

- [x] T020 [P] [US5] Create QR generation logic using `qrcode.react` in `kaam-pass-pwa/src/components/SafetyQR.jsx`
- [x] T021 [US5] Create Wallpaper Generator page in `kaam-pass-pwa/src/pages/Wallpaper.jsx` (HTML Canvas to combine template and QR)

---

## Phase 8: Polish & Cross-Cutting Concerns

- [x] T022 Polish UI with Neumorphism design system
- [x] T023 Run Vite build and verify PWA lighthouse score
