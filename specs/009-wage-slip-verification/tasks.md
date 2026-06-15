# Tasks: Wage Slip Generation & Hash Verification

## Phase 1: Dashboard Dependencies & Utilities
- [x] T001 Install `jspdf` and `qrcode` in `dashboard`.
- [x] T002 Create `crypto.js` for SHA-256 hashing.
- [x] T003 Create `pdfGenerator.js` for generating PDF with QR code.

## Phase 2: Contractor Wage Slip UI
- [x] T004 Create `WageSlipGenerator.jsx` to select site, period, and generate slips.
- [x] T005 Update `ContractorDashboard/index.jsx` to integrate `WageSlipGenerator`.

## Phase 3: Worker PWA Download & Verify
- [x] T006 Create `WageSlipList.jsx` in PWA to show and download slips.
- [x] T007 Update `PWA Dashboard.jsx` to include `WageSlipList`.
- [x] T008 Recreate `Verify.jsx` as a public route in PWA for `/verify/:hash`.
- [x] T009 Update PWA `App.jsx` with the `/verify/:hash` route.

## Phase 4: Dead Code Cleanup
- [x] T010 Delete dead backend files (`wage_calculator.py`, `crypto.py`, `wage_slip.py`, `models/wage_slip.py`).
- [x] T011 Run `npx knip` and `eslint` on `dashboard` and `kaam-pass-pwa`.
