# Tasks: Lender Dashboard & Protection Triggers

## Phase 1: Dependencies
- [x] T001 Install `xlsx` in `dashboard`.

## Phase 2: Lender Dashboard Components
- [x] T002 Create `dashboard/src/pages/LenderDashboard/index.jsx`.
- [x] T003 Create `WorkerList.jsx` with XLSX export.
- [x] T004 Create `WorkerProfileDetail.jsx` with PDF export.
- [x] T005 Create `ConsentRequest.jsx`.

## Phase 3: Protection Triggers
- [x] T006 Create `ProtectionCases.jsx`.
- [x] T007 Create `utils/protectionTrigger.js`.

## Phase 4: App Integration
- [x] T008 Update `App.jsx` routing for `/lender`.
- [x] T009 Update `Sidebar.jsx`.

## Phase 5: Worker PWA Consent Request
- [x] T010 Update `kaam-pass-pwa/src/pages/Dashboard.jsx` for consent requests.

## Phase 6: Dead Code Cleanup
- [x] T011 Delete `backend/app/routers/shield.py` and `backend/app/models/insurance.py` and `migrations/20260614140000_top1_features.sql`.
- [x] T012 Run `npx knip` and `eslint`.
