# Tasks: KAAM Score & Safe Loan

## Phase 1: Score Calculator Utility
- [x] T001 Create `kaam-pass-pwa/src/utils/scoreCalculator.js` with KAAM, Trust, and Safe Loan logic.

## Phase 2: Core Components
- [x] T002 Create `ConsentToggle.jsx` to update profile `consent_status`.
- [x] T003 Create `ScoreGauge.jsx` to display animated score gauge and band.

## Phase 3: KAAM Pass Dashboard
- [x] T004 Refactor `kaam-pass-pwa/src/pages/Dashboard.jsx` to include the 10 sections (Profile, Verified Days, Monthly Income, Attendance, Wage Slips, KAAM Score, Safe Loan, Disputes, Protection, Consent).

## Phase 4: Safe Loan Request
- [x] T005 Rewrite `kaam-pass-pwa/src/pages/Loan.jsx` to process requested amounts and display the Safe Loan Recommendation with math breakdown.

## Phase 5: Dead Code Cleanup
- [x] T006 Delete `backend/app/services/kaam_score.py`, `backend/app/routers/kaam_score.py`, `backend/app/routers/financial.py`, `backend/app/models/kaam_score.py`.
- [x] T007 Run `npx knip` and `eslint` on `kaam-pass-pwa`.
