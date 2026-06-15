# KAAM Setu v2 — Inspiration & Reference Patterns

## Source References & What to Adopt

---

### 1. QR-Based Attendance System (anditisyou)
**Repo**: https://github.com/anditisyou/QR-Based-Attendance-System  
**Stack**: Node.js, Express, MongoDB, Tailwind, FingerprintJS  

#### Patterns to Adopt into KAAM

| Pattern | Their Implementation | KAAM Adaptation | Spec |
|---------|---------------------|-----------------|------|
| **QR Site Code** | QR valid for 15 minutes, session-signed | KAAM: Each site gets a permanent QR (not time-limited). Worker scans site QR to self-check-in as secondary verification. | 008 |
| **Haversine Geofence** | 100m radius, validates student is near classroom | KAAM: 200m default radius (construction sites are larger). Validate contractor GPS when marking attendance, not worker. | 008 |
| **SHA-256 Signing** | Signs QR session payload | KAAM: Hash entire wage slip JSON for tamper-evident verification. Use Web Crypto API instead of Node `crypto`. | 009 |
| **Device Fingerprinting** | Canvas fingerprint prevents duplicate entries | KAAM: **Practical for v1** — use `navigator.userAgent + screen.width + timezone` as lightweight device ID. Prevents one phone marking attendance for 50 workers. Store hash of fingerprint, not raw. | 008 |
| **Rate Limiting** | Max 5 QR scans/minute/IP | KAAM: Max 1 attendance record per worker per day. Enforce at Supabase RLS level with unique constraint on (worker_id, site_id, date). | 008 |
| **Session Validation** | QR can't be reused or expired | KAAM: Wage slip hash can't be regenerated (immutable after verification). | 009 |

#### Code Patterns to Port (JS)

```javascript
// Haversine formula — port from their implementation
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Earth radius in meters
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// SHA-256 hash — use Web Crypto API (browser native, no library needed)
async function sha256Hash(data) {
  const encoded = new TextEncoder().encode(JSON.stringify(data));
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Lightweight device fingerprint (no FingerprintJS dependency)
function getDeviceFingerprint() {
  const raw = [
    navigator.userAgent,
    screen.width + 'x' + screen.height,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    navigator.language,
  ].join('|');
  return sha256Hash(raw); // async
}
```

---

### 2. TrackAS — Smart Attendance Dashboard (paulthadev)
**Repo**: https://github.com/paulthadev/trackAS  
**Stack**: React, Vite, Supabase, Tailwind, Leaflet, DaisyUI  

#### Patterns to Adopt into KAAM

| Pattern | Their Implementation | KAAM Adaptation | Spec |
|---------|---------------------|-----------------|------|
| **Same tech stack** | React + Vite + Supabase | KAAM already uses this exact stack. Validates our architecture choice. | All |
| **Leaflet for maps** | React Leaflet for geolocation | KAAM: Use Leaflet for site creation (pick location) and site map view in contractor dashboard. Already using Leaflet in dashboard. | 007 |
| **QR generation** | `qrcode.react` + `react-qr-code` | KAAM: Use `qrcode.react` for site QR codes and wage slip QR codes. | 007, 009 |
| **XLSX export** | FileSaver + XLSX for attendance data export | KAAM: Add attendance export for contractors and worker profile export for lenders. Good practical feature. | 007, 011 |
| **Lecturer dashboard** | Dashboard with class schedules, QR gen, attendance records | KAAM: Map to Contractor dashboard — sites instead of classes, workers instead of students. | 007 |
| **Role-based auth** | Lecturer vs Student roles | KAAM: Contractor vs Worker vs Lender roles with Supabase RLS. | 006 |
| **Day.js for dates** | Day.js for date/time handling | KAAM: Use Day.js for wage period calculations, attendance date formatting. Lightweight. | 008, 009 |

#### Libraries to Add to KAAM

```json
{
  "qrcode.react": "^4.0.0",
  "react-leaflet": "^4.2.1",
  "leaflet": "^1.9.4",
  "dayjs": "^1.11.10",
  "file-saver": "^2.0.5",
  "xlsx": "^0.18.5",
  "jspdf": "^2.5.1"
}
```

---

### 3. SHAP — Explainable AI (shap/shap)
**Repo**: https://github.com/shap/shap  
**Concept**: Game-theoretic approach to explain ML model outputs (22k+ stars)

#### Patterns to Adopt into KAAM

| Pattern | SHAP's Approach | KAAM Adaptation | Spec |
|---------|----------------|-----------------|------|
| **Feature contribution** | Shows how each feature pushes prediction up/down | KAAM Score explanation: "Attendance Consistency: +23 points, Dispute History: -5 points" | 010 |
| **Waterfall plot** | Visual showing base → feature contributions → final score | KAAM: Horizontal bar chart showing each of 7 components contributing to final score | 010 |
| **Positive/negative factors** | Red = hurts prediction, blue = helps | KAAM: Green factors (strengths) + Red factors (risks) displayed below score gauge | 010 |
| **Base value concept** | Default prediction before features | KAAM: Base score = 50 (neutral). Each component pushes up or down. | 010 |

#### KAAM Score Explanation UI (Inspired by SHAP Waterfall)

```
KAAM Score: 83 / 100 [Strong]

✅ Positive Factors
  Attendance Consistency    ████████████████  +23/25
  Wage Stability           ████████████████  +20/25
  Contractor Trust         ███████████       +13/15
  Profile Complete         █████             +5/5

⚠️ Risk Factors
  Income Gap               ████████          +7/10  (depends on 1 site)
  Dispute History          ████████          +9/10  (1 resolved dispute)
  Repayment History        ██████            +6/10  (no loan history yet)

💡 How to improve: "Work consistently for 2 more weeks to unlock higher loan limits"
```

**Implementation**: No ML needed. Pure rule-based with SHAP-style visual explanation. Each component calculates a sub-score, and the explanation shows which pushed the total up or down.

---

### 4. Credit Scoring Topic Patterns
**Topic**: https://github.com/topics/credit-scoring  

#### Patterns to Adopt into KAAM

| Pattern | Traditional Credit Scoring | KAAM Innovation | Spec |
|---------|---------------------------|-----------------|------|
| **Score bands** | 300-850 FICO with Poor/Fair/Good/Excellent | KAAM: 0-100 with Very Low/Low/Medium/Good/Strong. Simpler = more accessible for workers. | 010 |
| **Score card UI** | CIBIL-style credit report with gauge | KAAM: Animated circular gauge (like a fitness score). Workers understand this intuitively. | 010, 012 |
| **Alternative data** | Traditional: Bank transactions, credit cards | KAAM: Work attendance, verified wages, dispute history. This IS the innovation — using work data instead of financial data. | 010 |
| **Score history** | CIBIL shows score trend over months | KAAM: Show KAAM Score evolution as a line chart. Workers see their score going UP as they work. Motivating. | 010 |

---

### 5. Credit Risk Modeling Patterns
**Topic**: https://github.com/topics/credit-risk-modeling  

#### Patterns to Adopt into KAAM

| Pattern | Traditional Risk Modeling | KAAM Adaptation | Spec |
|---------|--------------------------|-----------------|------|
| **Risk bands** | Low/Medium/High risk with color coding | KAAM Lender Dashboard: Green (Strong, 86+), Blue (Good, 71-85), Yellow (Medium, 51-70), Red (Low/Very Low, <50) | 011 |
| **Probability of default** | PD = probability borrower won't repay | KAAM: Don't calculate PD (no loan history yet). Instead show "Safe Loan Limit" based on income guardrails. Safer and more explainable. | 010 |
| **Feature importance** | Which variables matter most for risk | KAAM: Show contractor trust as a feature — "This worker's income is verified by a contractor with Trust Score 92." Lenders care about data quality. | 011 |
| **Loan eligibility** | Binary yes/no with interest rate | KAAM: "Safe amount: ₹4,000. Weekly repayment: ₹840. Never exceeds 20% of weekly income." No predatory lending. | 010 |
| **Portfolio view** | Lender sees aggregate risk of all loans | KAAM Lender Dashboard: Score distribution chart, average income, skill breakdown, regional data. | 011 |

---

## What NOT to Copy

| Don't Copy | Why |
|------------|-----|
| FingerprintJS library | Heavy, privacy-invasive. Use lightweight device hash instead. |
| Time-limited QR (15 min expiry) | Construction sites don't work in 15-min sessions. Site QR is permanent. |
| Tailwind CSS | User's AGENTS.md says custom CSS. Don't add Tailwind to dashboard. |
| DaisyUI | Component library overhead. Custom components match our design system. |
| MongoDB | Already using Supabase/PostgreSQL. Don't switch. |
| Full SHAP library | Overkill. Rule-based explanation with SHAP-style visual is sufficient for v1. |
| Complex ML models | No training data exists yet. Rule-based first, ML later. |

---

## Updated npm Dependencies

Based on inspiration repos, these packages should be added during implementation:

### For kaam-pass-pwa (Worker PWA)
```
qrcode.react    — QR code display on wage slips
dayjs           — Date formatting
jspdf           — PDF wage slip generation  
```

### For dashboard (Contractor + Lender)
```
qrcode.react    — Site QR code generation
react-leaflet   — Site map (already have this)
leaflet         — Map library (already have this)
dayjs           — Date handling
file-saver      — Export downloads
xlsx            — Attendance/wage data export
jspdf           — Worker profile PDF for lenders
```
