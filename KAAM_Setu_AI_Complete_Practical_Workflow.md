# KAAM Setu AI — Complete Practical Workflow.md
## Verified Income Passport for Informal Workers
### Production-Ready Workflow for Real Use

---

## 1. Purpose

This workflow explains how KAAM Setu AI should work as a **real deployable app**, not a hardcoded demo.

KAAM Setu AI helps contractors record real worker attendance and wages, helps workers own verified income proof, and helps lenders/NGOs review consent-based credit-readiness profiles.

KAAM is not a direct lender. KAAM is not an insurance seller. KAAM is the verified income and credit-readiness layer.

---

## 2. Final Core Workflow

```text
Contractor creates site
→ Contractor adds worker
→ Worker confirms consent
→ Daily attendance is marked
→ GPS/geofence verifies site presence
→ Worker confirms or disputes attendance
→ Wage cycle closes
→ Wage slip PDF is generated
→ Wage slip is hash-verified with QR
→ Worker gets KAAM Income Passport
→ KAAM Score is calculated
→ Safe loan recommendation is generated
→ Worker gives consent to share profile
→ Lender/NGO reviews verified income profile
→ Income interruption protection case is triggered if needed
```

---

## 3. Practical MVP Scope

### Build in Version 1

| Module | Real Use Purpose |
|---|---|
| Authentication | Identify contractor, worker, lender |
| Role-based dashboards | Separate access for each user |
| Site management | Register real work locations |
| Worker onboarding | Add real workers |
| Worker consent | Ethical data collection |
| Attendance tracking | Create work records |
| GPS/geofence check | Reduce fake attendance |
| Worker confirmation | Protect workers |
| Dispute system | Resolve attendance/wage conflicts |
| Wage calculation | Convert attendance into pay |
| Wage slip PDF | Create usable income proof |
| QR/hash verification | Make wage slip tamper-evident |
| Worker KAAM Pass | Worker-owned income passport |
| KAAM Score | Dynamic credit-readiness score |
| Safe loan recommendation | Responsible credit logic |
| Lender/NGO dashboard | Partner-ready profile review |
| Protection trigger | Emergency support eligibility |
| Audit logs | Track sensitive actions |

### Do Not Build in Version 1

| Avoid | Reason |
|---|---|
| Real loan disbursement | Needs regulated lending partner |
| Real insurance sale | Needs insurer/regulatory setup |
| Aadhaar integration | Privacy/legal complexity |
| Blockchain | Not needed for MVP |
| DigiLocker integration | Future feature |
| Bima Sugam integration | Future feature |
| Complex ML-first model | Not enough real training data initially |
| Full WhatsApp Business API | Add later after core works |

---

## 4. User Roles

### 4.1 Contractor

Contractor can:
- create site
- add workers
- assign wage rate
- mark attendance
- enter check-in/check-out
- add overtime, advances, deductions
- generate wage slips
- resolve disputes
- view reports
- view contractor trust score

Contractor cannot:
- access other contractors' workers
- share worker data without worker consent
- silently edit issued wage slips without audit log

### 4.2 Worker

Worker can:
- confirm onboarding
- view attendance
- confirm or dispute attendance
- view wage slips
- download wage slips
- verify wage slips
- view KAAM Score
- view safe loan eligibility
- manage lender consent
- raise disputes
- view protection status

Worker cannot:
- edit wage amounts directly
- view other workers' data
- approve loans inside KAAM

### 4.3 Lender / NGO Partner

Partner can:
- view only consented worker profiles
- view verified income summary
- view KAAM Score
- view score explanation
- view safe loan recommendation
- view contractor trust score
- mark partner-side review result

Partner cannot:
- see worker data without consent
- edit attendance or wage slips
- disburse through KAAM v1

### 4.4 Admin

Admin can:
- monitor platform health
- manage support
- review audit logs
- disable fraudulent accounts

Admin access must be logged.


---

# 5. Complete Field Workflow

---

## Step 1: Contractor Signup

### Goal
Create a real contractor account.

### Inputs
| Field | Example |
|---|---|
| Name | Manjunath |
| Phone | 9876543210 |
| Email | manjunath@example.com |
| Company Name | Manjunath Constructions |
| City | Mysuru |
| Password | ******** |

### System Actions
1. Create Supabase auth user.
2. Create profile record.
3. Create contractor record.
4. Set default contractor trust score to 50.
5. Redirect to contractor dashboard.

### Output
```text
Contractor account created.
Dashboard is ready.
```

---

## Step 2: Contractor Creates Site

### Goal
Register a real worksite.

### Inputs
| Field | Example |
|---|---|
| Site Name | Green Valley Apartments |
| Address | Mysuru, Karnataka |
| Latitude | 12.2958 |
| Longitude | 76.6394 |
| Geofence Radius | 200 meters |
| Wage Cycle | Weekly / Fortnightly / Monthly |

### System Actions
1. Save site in database.
2. Generate site ID.
3. Generate site QR code.
4. Attach site to contractor.
5. Create site dashboard.

### Output
```text
Site created successfully.
QR code generated for attendance.
```

### Practical Notes
- Use browser GPS for quick setup.
- Allow manual location entry if GPS fails.
- Later add map pin selection.

---

## Step 3: Contractor Adds Worker

### Goal
Create worker profile and assign worker to site.

### Inputs
| Field | Example |
|---|---|
| Worker Name | Ramesh |
| Phone | 9876500000 |
| Skill | Mason |
| Daily Wage | ₹700 |
| Language | Kannada |
| Emergency Contact | 9876511111 |
| Assigned Site | Green Valley Apartments |

### System Actions
1. Create worker record.
2. Create site assignment.
3. Set worker status as `pending_confirmation`.
4. Generate worker consent link.
5. Show message preview to contractor.

### Message to Worker
```text
Namaste Ramesh,
You have been added to KAAM Setu by Manjunath Constructions.
Site: Green Valley Apartments
Skill: Mason
Daily Wage: ₹700

Please confirm if these details are correct.
```

### Output
```text
Worker added.
Waiting for worker confirmation.
```

---

## Step 4: Worker Confirms Consent

### Goal
Make sure worker agrees and understands data usage.

### Worker Sees
```text
You are being added to KAAM Setu.

Your work records will be used to create:
- attendance history
- wage slips
- income passport
- KAAM Score
- safe credit eligibility

Your data will not be shared with lenders without your permission.
```

### Worker Options
```text
[Confirm Joining]
[Details Incorrect]
[Reject]
```

### If Worker Confirms
```text
worker.status = active
worker.consent_status = true
assignment.status = active
```

### If Worker Rejects
```text
worker.status = rejected
assignment.status = inactive
```

### If Worker Disputes Details
```text
dispute_type = onboarding_details
status = pending
```


---

## Step 5: Daily Attendance Marking

### Goal
Record real daily work.

### Recommended Version 1 Method
Use contractor-marked attendance first.

### Flow
```text
Contractor opens attendance page
→ Selects site
→ Selects worker
→ Clicks Mark Present
→ Browser captures GPS
→ System checks geofence
→ Worker receives confirmation request
```

### Optional Version 1.5 Method
Worker QR check-in:
```text
Contractor displays site QR
→ Worker scans QR
→ Worker location is captured
→ Attendance is saved
```

### Attendance Record Example
```json
{
  "worker": "Ramesh",
  "date": "2026-06-15",
  "check_in": "08:15",
  "check_out": "17:45",
  "hours_worked": 9.5,
  "gps_verified": true,
  "worker_confirmed": true,
  "trust_level": 3,
  "status": "verified"
}
```

---

## Step 6: GPS / Geofence Verification

### Goal
Reduce fake attendance.

### Logic
Use Haversine distance between:
- site latitude/longitude,
- attendance latitude/longitude.

### Function Output
```json
{
  "distance_m": 72,
  "gps_verified": true,
  "radius_m": 200
}
```

### Attendance Trust Levels

| Trust Level | Condition |
|---|---|
| Level 1 | Contractor marked only |
| Level 2 | Contractor + GPS verified |
| Level 3 | Contractor + GPS + worker confirmed |
| Level 4 | Repeated verified pattern |

### Practical Rule
Attendance should not be treated as final until the worker has a chance to confirm or dispute.

---

## Step 7: Worker Attendance Confirmation

### Goal
Protect worker from false or incorrect records.

### Worker Receives
```text
You were marked present today.

Site: Green Valley Apartments
Date: 15 Jun 2026
Hours: 9.5
Daily Wage: ₹700

Is this correct?
[Confirm] [Dispute]
```

### If Worker Confirms
```text
worker_confirmed = true
status = verified
trust_level = 3
```

### If Worker Disputes
```text
status = disputed
worker_confirmed = false
```

A dispute record is created.

---

## Step 8: Check-Out and Hours Calculation

### Goal
Calculate actual work hours.

### Inputs
- check-in time
- check-out time
- break time optional
- overtime optional

### Formula
```text
hours_worked = check_out - check_in - break_time
```

### Example
```text
Check-in: 08:15
Check-out: 17:45
Break: 0.5 hours
Hours Worked: 9.0
```

### Practical Rule
If contractor forgets check-out, allow manual correction with:
- reason,
- worker confirmation,
- audit log.


---

## Step 9: Dispute Workflow

### Goal
Allow workers to correct wrong records.

### Dispute Types

| Type | Example |
|---|---|
| Missing Attendance | I worked but was not marked present |
| Wrong Hours | I worked 10 hours but 8 were recorded |
| Overtime Missing | Extra hours not added |
| Wrong Wage Rate | My wage should be ₹750 |
| Unfair Deduction | Deduction is incorrect |
| Wage Slip Error | Final slip amount is wrong |

### Flow
```text
Worker creates dispute
→ Contractor receives alert
→ Contractor reviews record
→ Contractor accepts or rejects
→ Resolution is stored
→ Audit log is created
```

### Dispute Statuses

| Status | Meaning |
|---|---|
| pending | Waiting for contractor |
| accepted | Contractor accepted worker claim |
| rejected | Contractor rejected claim |
| escalated | Not resolved in time |
| closed | Final status |

### Contractor Trust Impact
Repeated unresolved disputes reduce contractor trust score.

---

## Step 10: Wage Cycle Closing

### Goal
Convert verified attendance into wages.

### Wage Cycle Options
- weekly
- fortnightly
- monthly

### Contractor Action
Contractor opens:
```text
/contractor/wages
```

Selects:
- site,
- worker or all workers,
- period start,
- period end.

Clicks:
```text
Generate Wage Slip
```

### System Checks Before Generation
1. Attendance records exist.
2. Worker is active.
3. Wage rate is defined.
4. Unresolved disputes are flagged.
5. Advances/deductions are entered.
6. Overtime is calculated.

### Practical Rule
If unresolved disputes exist, show:
```text
This worker has unresolved disputes.
Generate as draft or resolve dispute first.
```

---

## Step 11: Wage Calculation

### Formula
```text
Base Wage = Days Worked × Daily Wage
Gross Wage = Base Wage + Overtime Amount
Net Pay = Gross Wage - Advances - Deductions
```

### Example
```text
Daily Wage: ₹700
Days Worked: 12
Base Wage: ₹8,400
Overtime: ₹600
Advance: ₹1,000
Deduction: ₹0
Net Pay: ₹8,000
```

### Data Saved
```json
{
  "days_worked": 12,
  "total_hours": 108,
  "base_wage": 8400,
  "overtime_amount": 600,
  "advances": 1000,
  "deductions": 0,
  "net_pay": 8000
}
```

---

## Step 12: Wage Slip PDF Generation

### Goal
Generate real usable income proof.

### Wage Slip Fields
- worker name
- worker ID
- contractor name
- site name
- wage period
- days worked
- total hours
- daily wage
- overtime amount
- advances
- deductions
- net pay
- generated date
- document hash
- QR verification code

### PDF Statuses

| Status | Meaning |
|---|---|
| draft | Generated but not issued |
| issued | Final wage slip issued |
| disputed | Worker disputed slip |
| corrected | Corrected version generated |

### Practical Rule
Do not silently edit issued wage slips.  
If a correction is needed, issue a corrected version and preserve audit history.


---

## Step 13: SHA-256 Hash and QR Verification

### Goal
Make wage slips tamper-evident.

### Process
```text
Normalize wage slip data
→ Sort JSON keys
→ Generate SHA-256 hash
→ Store hash in database
→ Generate QR with /verify/[hash]
→ Add QR to wage slip PDF
```

### Public Verification Route
```text
/verify/[hash]
```

### Verification Page Shows
```text
Wage Slip Verified
Worker: Ramesh
Site: Green Valley Apartments
Period: 01 Jun 2026 - 15 Jun 2026
Net Pay: ₹8,000
Hash Match: Yes
```

### Public Page Must Not Show
- phone number
- full address
- emergency contact
- KAAM Score
- loan eligibility
- private disputes
- lender info

---

## Step 14: Worker KAAM Pass

### Goal
Give the worker a useful digital income passport.

### Sections
1. Profile
2. Current site
3. Verified work days
4. Monthly verified income
5. Attendance history
6. Wage slips
7. KAAM Score
8. Score explanation
9. Safe loan limit
10. Disputes
11. Protection status
12. Data sharing consent

### Example
```text
Worker: Ramesh
Skill: Mason
Current Site: Green Valley Apartments
Verified Work Days: 24
Monthly Income: ₹16,800
KAAM Score: 83/100
Safe Loan Limit: ₹4,000
Protection Status: Eligible
```

### Practical Rule
Worker pass must be:
- mobile-first,
- simple,
- low-data,
- easy to read,
- local-language-ready.

---

## Step 15: KAAM Score Calculation

### Goal
Create dynamic credit-readiness based on verified work.

### Score Components

| Component | Weight |
|---|---:|
| Attendance Consistency | 25% |
| Wage Stability | 25% |
| Contractor Trust Score | 15% |
| Dispute Score | 10% |
| Income Gap Score | 10% |
| Repayment Score | 10% |
| Profile Completeness | 5% |

### Formula
```text
KAAM Score =
0.25 × Attendance Consistency
+ 0.25 × Wage Stability
+ 0.15 × Contractor Trust
+ 0.10 × Dispute Score
+ 0.10 × Income Gap Score
+ 0.10 × Repayment Score
+ 0.05 × Profile Completeness
```

### Score Bands

| Score | Band |
|---|---|
| 0-30 | Very Low Confidence |
| 31-50 | Low Confidence |
| 51-70 | Medium Confidence |
| 71-85 | Good Confidence |
| 86-100 | Strong Confidence |

### Example
```text
Attendance Consistency: 92
Wage Stability: 80
Contractor Trust: 84
Dispute Score: 90
Income Gap Score: 70
Repayment Score: 60
Profile Completeness: 100

KAAM Score = 83/100
Risk Band = Good
```


---

## Step 16: KAAM Score Explanation

### Goal
Make the score understandable and fair.

### Example
```text
KAAM Score: 83/100

Positive Factors:
+ 24 verified work days in last 30 days
+ Stable wage income
+ High contractor trust score
+ No unresolved disputes

Risk Factors:
- No formal repayment history yet
- Income depends on one active site
```

### Do Not Use in Scoring
- caste
- religion
- gender
- native place
- language as negative factor
- migrant status as negative factor
- health condition

### Use Only
- verified attendance
- wage stability
- dispute record
- income gap pattern
- repayment behaviour if available
- profile completeness
- contractor trust

---

## Step 17: Safe Loan Recommendation

### Goal
Support responsible lending without KAAM giving loans directly.

### Rule
```text
Weekly repayment should not exceed 20% of verified weekly income.
```

### Formula
```text
Verified Weekly Income = Verified Monthly Income / 4
Max Weekly Repayment = Verified Weekly Income × 0.20
Safe Amount = Max Weekly Repayment × Tenure Weeks
Recommended Amount = Min(Requested Amount, Safe Amount)
```

### Example
```text
Verified Monthly Income: ₹16,800
Weekly Income: ₹4,200
Max Safe Weekly Repayment: ₹840
Tenure: 6 weeks
Safe Amount: ₹5,040

Worker Requested: ₹10,000
KAAM Recommendation: ₹4,000 - ₹5,000
```

### Output Message
```text
You requested ₹10,000.
KAAM recommends ₹4,000 because repayment should stay within safe limits.
```

### Practical Rule
Never show:
```text
Loan approved by KAAM.
```

Show:
```text
Eligible for partner review.
```

---

## Step 18: Worker Consent for Lender Sharing

### Goal
Share worker profile only with permission.

### Worker Sees
```text
Do you want to share your KAAM Income Passport with this partner?

Shared data:
- verified monthly income
- wage slip count
- KAAM Score
- safe loan recommendation
- score explanation

Not shared:
- emergency contact
- private disputes unless relevant
- phone number unless approved
```

### Worker Options
```text
[Allow for 30 days]
[Allow once]
[Reject]
```

### Database Record Example
```json
{
  "worker_id": "WKR-001",
  "lender_profile_id": "LDR-001",
  "consent_given": true,
  "consent_scope": "income_summary_score",
  "expires_at": "2026-07-15"
}
```

---

## Step 19: Lender / NGO Dashboard

### Goal
Allow partners to review verified income.

### Dashboard Shows

| Field | Example |
|---|---|
| Worker | Ramesh |
| Skill | Mason |
| Verified Monthly Income | ₹16,800 |
| Wage Slips | 2 |
| KAAM Score | 83 |
| Risk Band | Good |
| Safe Loan Limit | ₹4,000 |
| Contractor Trust | 84 |
| Disputes | 0 unresolved |
| Recommendation | Eligible for partner review |

### Partner Actions
```text
Mark as reviewed
Request more info
Create partner-side offer
Reject with reason
```

### Practical Rule
The lender dashboard should not disburse money in v1.

---

## Step 20: Income Interruption Protection

### Goal
Detect sudden income loss and create support case.

### Use This Wording
```text
Emergency support eligibility
```

### Avoid This Wording
```text
Guaranteed insurance payout
```

### Trigger Types

| Trigger | Condition | Suggested Support |
|---|---|---:|
| Work Stoppage | 7 days no attendance after stable work | ₹1,000 |
| Site Accident | Accident marked and confirmed | ₹2,000 |
| Heavy Rain / Site Shutdown | Contractor marks site paused | ₹500-₹1,500 |
| Hospitalization | Worker uploads proof | Manual review |

### Example
```text
Ramesh worked 24 days last month.
This week: 0 attendance for 7 days.
Reason: Site shutdown due to rain.
Protection Case: Triggered
Suggested Support: ₹1,000
Status: Partner Review
```


---

# 6. App Pages Workflow

## Landing Page `/`
Sections:
1. Problem
2. Solution
3. How it works
4. Who uses it
5. Impact
6. Login / Signup

CTA:
```text
Start as Contractor
View Worker Pass
Partner Dashboard
```

## Auth Pages
```text
/auth/signup
/auth/login
/auth/logout
```

Role-based redirects:

| Role | Redirect |
|---|---|
| Contractor | /contractor/dashboard |
| Worker | /worker/pass |
| Lender | /lender/dashboard |

## Contractor Pages
```text
/contractor/dashboard
/contractor/sites
/contractor/workers
/contractor/attendance
/contractor/wages
/contractor/disputes
/contractor/reports
```

## Worker Pages
```text
/worker/pass
/worker/attendance
/worker/wage-slips
/worker/disputes
/worker/consent
/worker/protection
```

## Lender Pages
```text
/lender/dashboard
/lender/workers
/lender/workers/[id]
/lender/consents
```

## Public Verification Page
```text
/verify/[hash]
```

---

# 7. Data State Workflow

## Worker Status

| Status | Meaning |
|---|---|
| pending_confirmation | Added by contractor, waiting for worker |
| active | Worker confirmed |
| disputed | Worker disputed onboarding |
| inactive | Worker no longer active |
| rejected | Worker rejected onboarding |

## Attendance Status

| Status | Meaning |
|---|---|
| marked | Contractor marked attendance |
| gps_verified | Location matched site |
| worker_confirmed | Worker confirmed |
| disputed | Worker disputed |
| finalized | Ready for wage calculation |

## Wage Slip Status

| Status | Meaning |
|---|---|
| draft | Generated but not issued |
| issued | Final wage slip issued |
| disputed | Worker disputed slip |
| corrected | Corrected version exists |
| cancelled | Cancelled with reason and audit log |

## Loan Recommendation Status

| Status | Meaning |
|---|---|
| calculated | Safe amount generated |
| shared_with_partner | Worker consented |
| partner_review | Lender/NGO reviewing |
| partner_approved | Partner approved outside KAAM |
| partner_rejected | Partner rejected outside KAAM |

## Protection Case Status

| Status | Meaning |
|---|---|
| detected | Trigger detected |
| worker_notified | Worker notified |
| partner_review | Partner reviewing |
| approved_by_partner | Partner approved support |
| rejected_by_partner | Partner rejected |
| closed | Case closed |

---

# 8. Database Workflow

## Main Tables

```text
profiles
contractors
sites
workers
worker_site_assignments
attendance
disputes
wage_slips
kaam_scores
loan_recommendations
lender_consents
protection_cases
audit_logs
```

## Relationship Flow

```text
profiles
→ contractors / workers / lenders
→ sites
→ worker_site_assignments
→ attendance
→ disputes
→ wage_slips
→ kaam_scores
→ loan_recommendations
→ lender_consents
→ protection_cases
```


---

# 9. API Workflow

## Contractor APIs
```text
POST /api/sites
GET /api/sites
POST /api/workers
GET /api/workers
POST /api/attendance
GET /api/attendance
POST /api/wage-slips/generate
GET /api/disputes
POST /api/disputes/{id}/resolve
```

## Worker APIs
```text
GET /api/worker/pass
POST /api/worker/confirm-onboarding
POST /api/attendance/{id}/confirm
POST /api/attendance/{id}/dispute
GET /api/worker/wage-slips
POST /api/worker/lender-consent
GET /api/worker/protection
```

## Lender APIs
```text
GET /api/lender/workers
GET /api/lender/workers/{id}
POST /api/lender/review
```

## Public APIs
```text
GET /api/verify/{hash}
```

---

# 10. Security Workflow

## Role-Based Access Rules

| User | Allowed Access |
|---|---|
| Contractor | Own sites, workers, attendance, wage slips |
| Worker | Own pass, attendance, wage slips, disputes |
| Lender | Only consented worker summaries |
| Public | Only wage slip verification result |
| Admin | Operational access with audit logging |

## Audit Log Required For
- attendance edit
- wage slip generation
- wage slip correction
- dispute resolution
- lender consent creation
- lender profile access
- protection case update
- worker data export

## Privacy Rules
1. Do not collect Aadhaar in v1.
2. Do not share data without consent.
3. Do not use sensitive factors in KAAM Score.
4. Public verification must show limited data.
5. Worker can revoke sharing consent.
6. Every lender view should be logged.


---

# 11. Practical One-Month Build Workflow

## Week 1: Foundation and Real Data

Build:
- Next.js setup
- Supabase setup
- database schema
- auth
- role routing
- contractor dashboard
- site creation
- worker onboarding
- worker consent

End result:
```text
Contractor can create a real site and add real workers.
```

## Week 2: Attendance and Disputes

Build:
- attendance marking
- GPS/geofence verification
- worker confirmation
- worker dispute system
- attendance history
- contractor dispute dashboard

End result:
```text
Worker attendance can be verified, confirmed, or disputed.
```

## Week 3: Wage Proof

Build:
- wage cycle closing
- wage calculation
- wage slip PDF
- SHA-256 hash
- QR verification
- worker wage slip page
- Worker KAAM Pass

End result:
```text
Worker can download and verify a real wage slip.
```

## Week 4: Fintech Layer and Deployment

Build:
- KAAM Score
- score explanation
- safe loan recommendation
- lender consent
- lender dashboard
- protection case detection
- audit logs
- UI polish
- deployment
- testing

End result:
```text
Pilot-ready app deployed for real use.
```

---

# 12. Real Pilot Workflow

## Pilot Setup

```text
1 contractor
1 site
5-10 workers
2 weeks of attendance
1 wage cycle
1 NGO/lender reviewer
```

## Pilot Goals

- contractor can use attendance daily
- workers understand confirmation
- wage slip PDF is useful
- disputes work
- KAAM Score is understandable
- lender dashboard is useful

## Pilot Success Criteria

| Metric | Target |
|---|---|
| Worker onboarding completion | 80%+ |
| Attendance confirmation rate | 70%+ |
| Wage slip generation | 100% for active workers |
| Dispute resolution time | Under 3 days |
| Worker understanding of wage slip | 80%+ |
| Contractor willingness to continue | Yes |
| Lender usefulness rating | Positive |


---

# 13. Edge Cases and Fixes

## Edge Case 1: Worker Has No Smartphone
Fix:
- contractor can print wage slip
- worker can access via phone later
- SMS mode in future
- family member phone optional

## Edge Case 2: GPS Fails
Fix:
- allow manual attendance with lower trust level
- require worker confirmation
- log GPS failure reason

## Edge Case 3: Contractor Forgets Attendance
Fix:
- allow backdated attendance only with reason
- worker must confirm
- audit log required
- trust level lower

## Edge Case 4: Worker Disputes After Wage Slip
Fix:
- mark wage slip as disputed
- create correction flow
- issue corrected wage slip
- keep old version in audit history

## Edge Case 5: Contractor Tries Fake Workers
Fix:
- worker phone confirmation
- GPS pattern check
- worker confirmation rate
- contractor trust score
- suspicious pattern alerts

## Edge Case 6: Lender Accesses Without Consent
Fix:
- enforce consent table
- deny request
- log unauthorized attempt

## Edge Case 7: Worker Changes Site
Fix:
- close old assignment
- create new assignment
- preserve income history
- KAAM Pass continues across sites


---

# 14. Demo Workflow for Judges

## Demo Character

```text
Worker: Ramesh
Skill: Mason
Daily Wage: ₹700
Site: Green Valley Apartments
Contractor: Manjunath Constructions
```

## Demo Steps

### Step 1: Contractor Dashboard
Say:
```text
This contractor manages workers and attendance at a real construction site.
```

### Step 2: Add Ramesh
Say:
```text
Ramesh is added with wage rate, skill, site, and consent.
```

### Step 3: Mark Attendance
Say:
```text
Attendance is trusted only when contractor marking, GPS, and worker confirmation align.
```

### Step 4: Worker Confirms Attendance
Say:
```text
The worker is not passive. He can confirm or dispute the record.
```

### Step 5: Generate Wage Slip
Say:
```text
Verified attendance becomes wage proof.
```

### Step 6: Verify Wage Slip QR
Say:
```text
The wage slip is tamper-evident using SHA-256 hash verification.
```

### Step 7: Open Worker KAAM Pass
Say:
```text
Ramesh now has a verified income passport.
```

### Step 8: Show KAAM Score
Say:
```text
The KAAM Score is based on verified work, not fake financial claims.
```

### Step 9: Show Safe Loan Recommendation
Say:
```text
KAAM does not push maximum loans. It recommends safe credit based on repayment capacity.
```

### Step 10: Show Lender Dashboard
Say:
```text
A partner can review Ramesh only after his consent.
```

### Step 11: Show Protection Case
Say:
```text
If income suddenly stops, KAAM can trigger emergency support review.
```


---

# 15. Final Practical Production Checklist

## App Readiness

- [ ] Auth works
- [ ] Roles work
- [ ] Contractor can create site
- [ ] Worker can be onboarded
- [ ] Worker consent works
- [ ] Attendance can be marked
- [ ] GPS/geofence works
- [ ] Worker confirmation works
- [ ] Dispute system works
- [ ] Wage calculation works
- [ ] PDF wage slip works
- [ ] QR code works
- [ ] Hash verification works
- [ ] Worker KAAM Pass works
- [ ] KAAM Score works
- [ ] Safe loan recommendation works
- [ ] Lender consent works
- [ ] Lender dashboard works
- [ ] Protection trigger works
- [ ] Audit logs work
- [ ] Deployment works

## Production Safety

- [ ] No Aadhaar collection
- [ ] No fake loan disbursement
- [ ] No fake insurance claim
- [ ] No sensitive scoring factors
- [ ] No hardcoded main user flow
- [ ] No public private data leak
- [ ] Row-level security enabled
- [ ] Worker consent required
- [ ] Public verification limited
- [ ] Audit logs enabled

---

# 16. Final Workflow Summary

KAAM Setu AI works like this in real life:

```text
A contractor creates a site and adds workers.
Workers confirm their details and consent.
Attendance is recorded daily with GPS and worker confirmation.
Workers can dispute wrong records.
At the end of the wage cycle, the system generates a hash-verified wage slip.
The wage slip becomes real income proof.
The worker's KAAM Pass stores verified work and wage history.
KAAM Score is calculated from real verified records.
Safe loan recommendation is generated to prevent over-borrowing.
Worker controls whether lenders/NGOs can view the profile.
Partners review verified income and offer support outside KAAM.
If income suddenly stops, KAAM creates an emergency support case.
```

---

# 17. Final One-Line Workflow

```text
Verified Attendance → Verified Wage Slip → Worker Income Passport → KAAM Score → Safe Credit → Emergency Support
```

---

# 18. Final Note

The most important practical rule:

```text
Do not build lending before income proof.
```

The real value of KAAM Setu is the verified income passport. If the app can reliably create trusted wage records for workers, the fintech layer becomes strong, realistic, and useful.
