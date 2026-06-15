# KAAM Setu v2 — Practical Constraints & Dead Code Rules

## The Core Problem This Must Solve

> A construction worker earns ₹700/day but cannot prove it to anyone.
> Everything we build must serve this one outcome: **verified, shareable income proof.**

If a feature doesn't directly contribute to a worker getting provable income → it's bloat. Cut it.

## Real-World User Constraints

### Workers (Primary Users)
- **Phones**: ₹5,000-₹8,000 Android phones. 4GB RAM. Small screens.
- **Literacy**: Many workers read Hindi/Kannada but not English. Some are functionally illiterate.
- **Internet**: Spotty 2G/3G. Sites often have poor connectivity. Must work on slow networks.
- **Tech comfort**: Workers use WhatsApp and YouTube. That's the UX bar.
- **Time**: Workers check phones during lunch break or after work. Max 30 seconds per interaction.
- **Trust**: Workers are skeptical of new apps. Value must be immediate and obvious.

### UX Rules for Worker-Facing Screens
1. **Max 2 taps** to complete any action (confirm attendance, view score)
2. **Large buttons** — minimum 48px touch targets, preferably 56px+
3. **Icons + minimal text** — use emoji/icons over words where possible
4. **Numbers are universal** — show ₹16,800, 24 days, 83/100 prominently
5. **No forms longer than 3 fields** for workers
6. **Offline-capable** — cache KAAM Pass data for viewing without internet
7. **Language**: English as default with Hindi labels planned (not blocking v1)

### Contractors (Secondary Users)
- **Phones/tablets**: Mid-range Android or laptop at site office
- **Literacy**: Can read English. Comfortable with basic apps.
- **Pain point**: Manual attendance registers, wage disputes, confusion about who worked which days
- **Time**: 5-10 minutes per day for attendance, weekly for wages
- **Value**: If KAAM doesn't save them time vs. paper register → they won't use it

### UX Rules for Contractor-Facing Screens
1. **Bulk actions** — mark 10 workers present in one screen, not 10 separate forms
2. **Quick site switching** — one tap to change active site
3. **Clear status at a glance** — color-coded attendance (green=confirmed, yellow=pending, red=disputed)
4. **Generate wage slips in one click** for the whole site

### Lenders (Tertiary Users)
- **Device**: Laptop/desktop in office
- **Literacy**: Highly literate, want data density
- **Value**: Reduced verification cost and trusted alternative data

---

## Dead Code Enforcement Protocol

> From AGENTS.md: After writing or modifying code, you MUST run dead code analyzers.

### After EVERY Spec Implementation

1. **Run `npx knip`** — detect unused files, exports, dependencies
2. **Run `npx eslint . --max-warnings 0`** — no lint warnings
3. **Fix all issues immediately** — don't defer

### What Gets Removed During v2 Migration

These files/modules from v1 are **dead code** once v2 specs are implemented:

| Dead Code | Reason | Remove In |
|-----------|--------|-----------|
| `dashboard/src/mockData.js` | Replace with real Supabase data | Spec 007 |
| `dashboard/src/pages/BuilderDashboard.jsx` | Replaced by Contractor Dashboard | Spec 007 |
| `dashboard/src/pages/InspectorDashboard.jsx` | Inspector role doesn't exist in v2 | Spec 006 |
| `dashboard/src/pages/AdminDashboard.jsx` | Rebuild for v2 admin | Spec 006 |
| `kaam-pass-pwa/src/pages/Verify.jsx` (face verify) | No face verification in v2 | Spec 006 |
| `kaam-pass-pwa/src/pages/Wallpaper.jsx` | Not in v2 spec | Spec 006 |
| `kaam-pass-pwa/src/pages/Network.jsx` (trust network) | Not in v2 spec | Spec 006 |
| `kaam-pass-pwa/src/components/VoiceButton.jsx` | No Bhashini voice in v2 | Spec 006 |
| `kaam-pass-pwa/src/services/bhashini/` | Not in v2 | Spec 006 |
| `backend/` (entire FastAPI backend) | Replaced by Supabase + frontend logic | Spec 006 |
| `kaam_mobile_app/` (entire Flutter app) | Replaced by PWA | Spec 006 |
| `kaam-backend/supabase/migrations/` (v1 migrations) | Replaced by v2 schema | Spec 006 |

### Portable Code (Keep, Adapt)

These files have real logic worth porting to JavaScript:

| File | Logic to Port | Port Into |
|------|--------------|-----------|
| `backend/app/services/geofence.py` | Haversine distance | Spec 008 |
| `backend/app/services/crypto.py` | SHA-256 hash + verify | Spec 009 |
| `backend/app/services/wage_calculator.py` | Wage formula | Spec 009 |
| `backend/app/services/kaam_score.py` | Score calculation (update to 7 components) | Spec 010 |
| `backend/app/services/anomaly_detector.py` | 5 fraud patterns | Spec 012 |

**Rule**: Port the logic first, then delete the Python source. Never have duplicate implementations.
