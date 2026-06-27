# KAAM Setu AI — Best Practical Workflow.md

## Worker-Owned Verified Income Passport for Informal Workers

---

## 1. Purpose of This Workflow

This workflow explains exactly how **KAAM Setu AI** should work as a practical, buildable, hackathon-ready fintech product.

It is designed for:

- selection-round PPT clarity,
- real one-month software development,
- national-level judge evaluation,
- final demo planning,
- team task division,
- production-style MVP execution.

The core rule is simple:

> Do not build lending before income proof.

KAAM Setu AI must first create trusted income proof. Once the worker has verified income proof, the fintech layer becomes believable.

---

## 2. Final Product Definition

**KAAM Setu AI** is a worker-owned verified income passport platform for informal workers.

It helps informal workers convert daily work into trusted financial identity using:

- verified attendance,
- worker confirmation,
- wage slip generation,
- QR/hash verification,
- contractor trust scoring,
- KAAM Score,
- safe credit recommendation,
- consent-based lender/NGO review,
- emergency support eligibility.

KAAM Setu is **not** a direct lender.  
KAAM Setu is **not** an insurance company.  
KAAM Setu is the verified income infrastructure layer between informal workers and formal finance.

---

## 3. Final One-Line Workflow

```text
Verified Attendance → Verified Wage Slip → Worker Income Passport → KAAM Score → Safe Credit Recommendation → Emergency Support Eligibility
```

---

## 4. Product Roles

## 4.1 Contractor

The contractor manages worksite operations.

### Contractor Responsibilities

- create worksite,
- add workers,
- assign wage rates,
- mark attendance,
- update check-in/check-out,
- add overtime,
- add advances and deductions,
- generate wage slips,
- respond to worker disputes,
- maintain clean wage records.

### Contractor Value

The contractor gets:

- easier attendance tracking,
- wage calculation,
- fewer wage disputes,
- clean records,
- worker management dashboard,
- downloadable reports,
- trust score for financial partners.

---

## 4.2 Worker

The worker owns the KAAM Income Passport.

### Worker Responsibilities

- confirm onboarding,
- confirm or dispute attendance,
- view wage slips,
- download income proof,
- control data sharing,
- raise disputes,
- view score and safe credit eligibility.

### Worker Value

The worker gets:

- proof of income,
- wage slip history,
- verified work record,
- dispute rights,
- KAAM Score,
- safe credit recommendation,
- emergency support eligibility,
- control over who sees their data.

---

## 4.3 Lender / NGO / Employer Advance Partner

The partner reviews worker profile only after consent.

### Partner Responsibilities

- request worker consent,
- review income passport,
- view KAAM Score,
- view safe credit recommendation,
- make external credit/support decision.

### Partner Value

The partner gets:

- verified income summary,
- wage slip history,
- contractor trust score,
- dispute status,
- lower verification cost,
- safer borrower assessment.

---

## 4.4 Admin

Admin manages system safety and support.

### Admin Responsibilities

- monitor audit logs,
- manage support issues,
- detect suspicious behavior,
- handle escalated disputes,
- disable fraudulent accounts.

---

## 5. Complete Practical End-to-End Workflow

---

# Phase 1: Contractor Setup

## Step 1: Contractor Sign-Up

### User Action

Contractor creates account using:

- name,
- phone/email,
- company name,
- city,
- password.

### System Action

The system:

1. creates authentication account,
2. creates profile record,
3. creates contractor record,
4. sets default contractor trust score to 50,
5. redirects to contractor dashboard.

### Output

```text
Contractor account created successfully.
```

---

## Step 2: Site Creation

### User Action

Contractor creates a worksite.

### Inputs

| Field | Example |
|---|---|
| Site Name | Green Valley Apartments |
| Address | Mysuru, Karnataka |
| Latitude | 12.2958 |
| Longitude | 76.6394 |
| Geofence Radius | 200 meters |
| Wage Cycle | Weekly / Fortnightly / Monthly |

### System Action

The system:

1. saves site details,
2. stores GPS coordinates,
3. generates site ID,
4. creates optional site QR code,
5. attaches site to contractor.

### Output

```text
Site created and ready for worker assignment.
```

---

# Phase 2: Worker Onboarding

## Step 3: Contractor Adds Worker

### User Action

Contractor adds a worker.

### Inputs

| Field | Example |
|---|---|
| Worker Name | Ramesh |
| Phone | 9876543210 |
| Skill | Mason |
| Daily Wage | ₹700 |
| Language Preference | Kannada |
| Emergency Contact | 9876500000 |
| Assigned Site | Green Valley Apartments |

### System Action

The system:

1. creates worker record,
2. creates worker-site assignment,
3. sets worker status as `pending_confirmation`,
4. generates consent link,
5. sends or displays onboarding message.

### Output

```text
Worker added. Awaiting worker confirmation.
```

---

## Step 4: Worker Confirms Consent

### Worker Sees

```text
You have been added to KAAM Setu by Manjunath Constructions.

Your attendance and wage records will be used to create your KAAM Income Passport.
Your data will not be shared with lenders or NGOs without your permission.

[Confirm Joining] [Details Incorrect] [Reject]
```

### If Worker Confirms

System updates:

```text
worker.status = active
worker.consent_status = true
assignment.status = active
```

### If Worker Rejects

System updates:

```text
worker.status = rejected
assignment.status = inactive
```

### If Worker Says Details Are Incorrect

System creates dispute:

```text
dispute_type = onboarding_error
status = pending
```

### Output

```text
Worker onboarding completed or routed to dispute.
```

---

# Phase 3: Attendance Verification

## Step 5: Daily Attendance Marking

### Version 1 Method

Contractor marks attendance.

### User Action

Contractor:

1. opens attendance page,
2. selects site,
3. selects worker,
4. clicks `Mark Present`,
5. enters check-in/check-out or default work hours.

### System Action

The system:

1. captures browser GPS,
2. compares location with site geofence,
3. creates attendance record,
4. assigns preliminary trust level,
5. asks worker to confirm.

### Output

```text
Attendance marked and sent for worker confirmation.
```

---

## Step 6: GPS / Geofence Verification

### Logic

Use Haversine distance between:

- site latitude/longitude,
- attendance latitude/longitude.

### Output Example

```json
{
  "distance_m": 72,
  "site_radius_m": 200,
  "gps_verified": true
}
```

### Trust Levels

| Trust Level | Condition |
|---|---|
| Level 1 | Contractor marked only |
| Level 2 | Contractor + GPS verified |
| Level 3 | Contractor + GPS + worker confirmation |
| Level 4 | Repeated verified attendance pattern |

### Practical Rule

GPS should reduce fraud, not be treated as perfect truth.

---

## Step 7: Worker Attendance Confirmation

### Worker Sees

```text
You were marked present today.

Site: Green Valley Apartments
Date: 15 June 2026
Hours: 9.5
Daily Wage: ₹700

Is this correct?

[Confirm] [Dispute]
```

### If Worker Confirms

System updates:

```text
worker_confirmed = true
status = verified
trust_level = 3
```

### If Worker Disputes

System updates:

```text
status = disputed
worker_confirmed = false
```

A dispute record is created.

---

# Phase 4: Dispute Resolution

## Step 8: Worker Raises Dispute

### Dispute Types

| Type | Example |
|---|---|
| Missing Attendance | I worked but was marked absent |
| Wrong Hours | I worked 10 hours but 8 were recorded |
| Overtime Missing | Extra hours not included |
| Wrong Wage Rate | My wage should be ₹750 |
| Unfair Deduction | Deduction is incorrect |
| Wage Slip Error | Final slip amount is wrong |
| Onboarding Error | Skill or wage was entered wrongly |

### System Action

The system:

1. creates dispute ticket,
2. notifies contractor,
3. links dispute to attendance or wage slip,
4. prevents silent finalization,
5. records audit log.

---

## Step 9: Contractor Resolves Dispute

### Contractor Actions

Contractor can:

- accept dispute,
- reject dispute with reason,
- correct record,
- escalate to admin.

### Status Flow

```text
Pending → Accepted / Rejected / Escalated → Closed
```

### Contractor Trust Impact

Unresolved or repeated disputes reduce contractor trust score.

---

# Phase 5: Wage Calculation

## Step 10: Wage Cycle Closing

### User Action

Contractor opens wage page and selects:

- site,
- worker or all workers,
- wage period.

### System Checks

Before generating wage slip, the system checks:

1. attendance records exist,
2. worker is active,
3. wage rate is defined,
4. unresolved disputes are flagged,
5. advances/deductions are entered,
6. overtime is calculated.

### Warning Example

```text
This worker has unresolved disputes.
You can generate a draft wage slip or resolve disputes first.
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

### Output

System stores wage calculation summary.

---

# Phase 6: Wage Slip Generation and Verification

## Step 12: Generate Wage Slip PDF

### Wage Slip Fields

- worker name,
- worker ID,
- contractor name,
- site name,
- wage period,
- days worked,
- total hours,
- daily wage,
- overtime amount,
- advances,
- deductions,
- net pay,
- generated date,
- document hash,
- QR verification code.

### Wage Slip Status

| Status | Meaning |
|---|---|
| Draft | Generated but not issued |
| Issued | Final wage slip |
| Disputed | Worker disputed |
| Corrected | Corrected version exists |

### Practical Rule

Issued wage slips should never be silently edited.  
If correction is required, create a corrected version and preserve audit history.

---

## Step 13: SHA-256 Hash Generation

### Process

```text
Normalize wage slip data
→ Sort JSON keys
→ Generate SHA-256 hash
→ Store hash in database
→ Generate QR code
→ Add QR to wage slip PDF
```

### Example

```text
Hash: 8f3a2d9e6c4b...
Verification URL: /verify/8f3a2d9e6c4b...
```

---

## Step 14: Public QR Verification

### User Action

Anyone scans wage slip QR.

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

- phone number,
- full address,
- emergency contact,
- KAAM Score,
- loan recommendation,
- private disputes,
- lender data.

---

# Phase 7: Worker KAAM Pass

## Step 15: Worker Opens KAAM Pass

### KAAM Pass Sections

1. Worker profile
2. Active site
3. Verified work days
4. Monthly verified income
5. Attendance history
6. Wage slips
7. QR-verified income proof
8. KAAM Score
9. Score explanation
10. Safe loan recommendation
11. Dispute history
12. Emergency support eligibility
13. Consent controls

### Example

```text
Worker: Ramesh
Skill: Mason
Verified Work Days: 24
Monthly Verified Income: ₹16,800
KAAM Score: 83/100
Safe Loan Recommendation: ₹4,000
Protection Status: Eligible for partner review
```

---

# Phase 8: KAAM Score

## Step 16: KAAM Score Calculation

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

## Step 17: Score Explanation

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

### Fairness Rule

Do not use:

- caste,
- religion,
- gender,
- native place,
- language as a negative factor,
- migrant status as a negative factor,
- health condition.

Use only verified work and wage behaviour.

---

# Phase 9: Safe Credit Recommendation

## Step 18: Safe Loan Recommendation

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
Verified Weekly Income: ₹4,200
Max Safe Weekly Repayment: ₹840
Tenure: 6 weeks
Safe Amount: ₹5,040

Worker Requested: ₹10,000
KAAM Recommendation: ₹4,000 - ₹5,000
```

### Output

```text
You requested ₹10,000.
KAAM recommends ₹4,000 because repayment should stay within safe limits.
```

### Critical Rule

Never show:

```text
Loan approved by KAAM.
```

Show:

```text
Eligible for partner review.
```

---

# Phase 10: Lender / NGO Consent and Review

## Step 19: Worker Gives Consent

### Worker Sees

```text
Do you want to share your KAAM Income Passport with this partner?

Shared:
- verified monthly income,
- wage slip count,
- KAAM Score,
- safe loan recommendation,
- score explanation.

Not shared:
- emergency contact,
- private phone number unless approved,
- private disputes unless relevant.
```

### Consent Options

```text
[Allow Once]
[Allow for 30 Days]
[Reject]
```

### Consent Record

```json
{
  "worker_id": "WKR-001",
  "partner_id": "LDR-001",
  "consent_given": true,
  "scope": "income_summary_score",
  "expires_at": "2026-07-15"
}
```

---

## Step 20: Lender / NGO Reviews Worker

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
| Unresolved Disputes | 0 |
| Recommendation | Eligible for partner review |

### Partner Actions

- mark reviewed,
- request more info,
- create external offer,
- reject with reason,
- download income summary.

### Critical Rule

Money disbursement happens outside KAAM through regulated partners.

---

# Phase 11: Emergency Support Eligibility

## Step 21: Income Interruption Detection

### Trigger Types

| Trigger | Condition | Suggested Support |
|---|---|---:|
| Work Stoppage | 7 days no attendance after stable work | ₹1,000 |
| Site Accident | Accident marked and confirmed | ₹2,000 |
| Site Shutdown | Contractor marks site paused | ₹500-₹2,000 |
| Hospitalization | Worker submits proof | Manual review |

### Example

```text
Ramesh worked 24 days last month.
This week: 0 attendance for 7 days.
Reason: Site shutdown.
Protection Case: Triggered.
Suggested Support: ₹1,000.
Status: Partner Review.
```

### Critical Rule

Use:

```text
Emergency support eligibility
Income interruption support case
Partner review
```

Do not use:

```text
Guaranteed insurance payout
KAAM insurance payment
```

---

## 6. App Page Workflow

## 6.1 Public Pages

```text
/
 /verify/[hash]
```

### Landing Page

Sections:

1. Problem
2. Solution
3. Product flow
4. User roles
5. Trust Triangle
6. Impact
7. Login / Signup

---

## 6.2 Auth Pages

```text
/auth/signup
/auth/login
```

### Role-Based Redirect

| Role | Redirect |
|---|---|
| Contractor | /contractor/dashboard |
| Worker | /worker/pass |
| Lender / NGO | /lender/dashboard |
| Admin | /admin/dashboard |

---

## 6.3 Contractor Pages

```text
/contractor/dashboard
/contractor/sites
/contractor/workers
/contractor/attendance
/contractor/wages
/contractor/disputes
/contractor/reports
```

---

## 6.4 Worker Pages

```text
/worker/pass
/worker/attendance
/worker/wage-slips
/worker/disputes
/worker/consent
/worker/protection
```

---

## 6.5 Lender Pages

```text
/lender/dashboard
/lender/workers
/lender/workers/[id]
/lender/consents
```

---

## 6.6 Admin Pages

```text
/admin/dashboard
/admin/audit-logs
/admin/support
```

---

## 7. Data State Workflow

## 7.1 Worker Status

| Status | Meaning |
|---|---|
| pending_confirmation | Added by contractor, waiting for worker |
| active | Worker confirmed |
| disputed | Worker disputed onboarding |
| inactive | Worker no longer active |
| rejected | Worker rejected onboarding |

---

## 7.2 Attendance Status

| Status | Meaning |
|---|---|
| marked | Contractor marked attendance |
| gps_verified | Location matched site |
| worker_confirmed | Worker confirmed |
| disputed | Worker disputed |
| finalized | Ready for wage calculation |

---

## 7.3 Wage Slip Status

| Status | Meaning |
|---|---|
| draft | Generated but not issued |
| issued | Final wage slip issued |
| disputed | Worker disputed slip |
| corrected | Corrected version exists |
| cancelled | Cancelled with reason and audit log |

---

## 7.4 Loan Recommendation Status

| Status | Meaning |
|---|---|
| calculated | Safe amount generated |
| shared_with_partner | Worker consented |
| partner_review | Partner reviewing |
| partner_approved | Partner approved outside KAAM |
| partner_rejected | Partner rejected outside KAAM |

---

## 7.5 Protection Case Status

| Status | Meaning |
|---|---|
| detected | Trigger detected |
| worker_notified | Worker notified |
| partner_review | Partner reviewing |
| approved_by_partner | Partner approved support |
| rejected_by_partner | Partner rejected |
| closed | Case closed |

---

## 8. Database Workflow

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
→ audit_logs
```

---

## 9. Security and Privacy Workflow

## Core Rules

1. No Aadhaar collection in MVP.
2. No direct lending by KAAM.
3. No insurance selling by KAAM.
4. No sensitive attributes in scoring.
5. Worker consent required for partner access.
6. Worker can revoke consent.
7. Lender access must be audit logged.
8. Public QR page shows limited data.
9. Role-based access must be enforced.
10. Row-level security must be enabled.

---

## Role-Based Access

| User | Access |
|---|---|
| Contractor | Own sites, own workers, own attendance, own wage slips |
| Worker | Own KAAM Pass, wage slips, disputes, consent |
| Lender | Only consented worker summaries |
| Public | Only wage slip verification |
| Admin | Support and audit access |

---

## Audit Log Required For

- attendance edit,
- wage slip generation,
- wage slip correction,
- dispute resolution,
- lender consent creation,
- lender profile access,
- protection case update,
- data export.

---

## 10. One-Month Build Workflow

## Week 1: Foundation

### Build

- Next.js project setup,
- Supabase setup,
- database schema,
- authentication,
- role-based routing,
- contractor dashboard,
- site creation,
- worker onboarding,
- worker consent.

### End Result

```text
A contractor can create a site and add workers.
```

---

## Week 2: Attendance and Disputes

### Build

- attendance marking,
- GPS/geofence verification,
- worker confirmation,
- dispute system,
- attendance history,
- contractor dispute dashboard.

### End Result

```text
Worker attendance can be verified, confirmed, or disputed.
```

---

## Week 3: Wage Proof

### Build

- wage calculation,
- wage cycle closing,
- PDF wage slip generation,
- SHA-256 hashing,
- QR generation,
- public verification page,
- Worker KAAM Pass.

### End Result

```text
A worker can download and verify a real wage slip.
```

---

## Week 4: Fintech Layer and Deployment

### Build

- KAAM Score,
- score explanation,
- safe loan recommendation,
- lender consent,
- lender dashboard,
- emergency support case,
- audit logs,
- UI polish,
- deployment,
- final testing.

### End Result

```text
Pilot-ready product deployed.
```

---

## 11. Demo Workflow for Judges

## Demo Character

```text
Worker: Ramesh
Skill: Mason
Daily Wage: ₹700
Site: Green Valley Apartments
Contractor: Manjunath Constructions
```

## Demo Steps

### Step 1: Contractor Login

Show contractor dashboard.

Say:

```text
This contractor manages attendance, wages, and disputes for real informal workers.
```

### Step 2: Site Creation

Create or show site.

Say:

```text
Each site has location and geofence for attendance verification.
```

### Step 3: Worker Onboarding

Add Ramesh.

Say:

```text
Ramesh is not added silently. He confirms consent before his KAAM Pass is created.
```

### Step 4: Attendance Marking

Mark attendance.

Say:

```text
Attendance is verified using contractor marking, GPS, and worker confirmation.
```

### Step 5: Worker Confirmation

Open worker screen.

Say:

```text
The worker can confirm or dispute the record.
```

### Step 6: Wage Slip

Generate wage slip.

Say:

```text
Verified attendance becomes verified income proof.
```

### Step 7: QR Verification

Scan/open QR.

Say:

```text
The wage slip is tamper-evident using SHA-256 hash verification.
```

### Step 8: KAAM Pass

Open worker pass.

Say:

```text
Ramesh now owns a verified income passport.
```

### Step 9: KAAM Score

Show score.

Say:

```text
The score is transparent and based on verified work, not sensitive personal attributes.
```

### Step 10: Safe Credit

Show loan recommendation.

Say:

```text
KAAM does not maximize loans. It recommends safe credit based on repayment capacity.
```

### Step 11: Lender Dashboard

Show consented view.

Say:

```text
A partner can view Ramesh's profile only after his consent.
```

### Step 12: Emergency Support

Show protection case.

Say:

```text
If income suddenly stops, KAAM creates an emergency support case for partner review.
```

---

## 12. Selection-Round PPT Workflow

Use this PPT flow:

## Slide 1

**KAAM Setu AI — Worker-Owned Verified Income Passport**

## Slide 2

Problem: informal workers work daily but cannot prove income.

## Slide 3

Existing gap: payroll apps track staff, Account Aggregator reads bank data, e-Shram identifies workers, but no one creates worker-owned verified income proof from daily work.

## Slide 4

Solution: KAAM turns work records into verified income passports.

## Slide 5

Workflow:

```text
Attendance → Wage Slip → KAAM Score → Safe Credit → Emergency Support
```

## Slide 6

Trust Triangle:

- Worker confirmation,
- Contractor trust score,
- Hash-verified wage slip.

## Slide 7

Product modules:

- Contractor dashboard,
- Worker KAAM Pass,
- Lender / NGO dashboard.

## Slide 8

Demo story:

```text
Ramesh, Mason, ₹700/day, 24 verified work days, ₹16,800 monthly verified income, KAAM Score 83, safe loan recommendation ₹4,000.
```

## Slide 9

Tech stack:

```text
Next.js + Supabase + GPS + QR + PDF + SHA-256 + Rule-Based Score
```

## Slide 10

Responsible finance:

- no direct lending,
- no guaranteed insurance,
- safe loan guardrail,
- partner review.

## Slide 11

Privacy and fairness:

- consent-first,
- revoke sharing,
- no Aadhaar in v1,
- no sensitive scoring factors,
- audit logs.

## Slide 12

Business model and closing:

```text
Contractor SaaS + verified intelligence fee + enterprise dashboard + CSR support pool
```

Closing line:

> KAAM Setu turns invisible labour into trusted financial identity.

---

## 13. Pilot Workflow

## Pilot Setup

```text
1 contractor
1 construction site
10 workers
2 weeks attendance
1 wage cycle
1 NGO/lender reviewer
```

## Pilot Goals

- confirm contractor can use attendance daily,
- confirm workers understand confirmation,
- generate wage slips,
- test dispute flow,
- test QR verification,
- test KAAM Score,
- test lender dashboard usefulness.

## Pilot Success Metrics

| Metric | Target |
|---|---|
| Worker onboarding completion | 80%+ |
| Attendance confirmation rate | 70%+ |
| Wage slip generation | 100% active workers |
| Dispute resolution time | Under 3 days |
| Worker understanding of wage slip | 80%+ |
| Contractor willingness to continue | Yes |
| Lender usefulness rating | Positive |

---

## 14. Edge Cases and Practical Fixes

## Worker Has No Smartphone

Fix:

- printed wage slip,
- contractor-assisted onboarding,
- phone-number access later,
- SMS fallback in future.

## GPS Fails

Fix:

- allow manual attendance with lower trust level,
- require worker confirmation,
- log GPS failure reason.

## Contractor Forgets Attendance

Fix:

- allow backdated attendance only with reason,
- worker confirmation required,
- audit log required,
- lower trust level.

## Worker Disputes After Wage Slip

Fix:

- mark wage slip as disputed,
- create corrected version,
- keep old version in audit history.

## Fake Attendance Attempt

Fix:

- GPS check,
- worker confirmation,
- device/phone pattern warning,
- contractor trust score,
- anomaly alerts.

## Lender Tries Access Without Consent

Fix:

- block access,
- log unauthorized attempt,
- notify worker/admin if repeated.

## Worker Changes Site

Fix:

- close old assignment,
- create new assignment,
- preserve KAAM Pass history.

---

## 15. Final MVP Acceptance Checklist

## Core App

- [ ] Contractor signup works
- [ ] Worker signup/confirmation works
- [ ] Lender login works
- [ ] Role-based routing works
- [ ] Contractor can create site
- [ ] Contractor can add worker
- [ ] Worker can confirm consent
- [ ] Contractor can mark attendance
- [ ] GPS/geofence result is calculated
- [ ] Worker can confirm/dispute attendance
- [ ] Contractor can resolve disputes
- [ ] Wage calculation works
- [ ] Wage slip PDF is generated
- [ ] QR code is generated
- [ ] SHA-256 hash is generated
- [ ] Public verification page works
- [ ] Worker KAAM Pass works
- [ ] KAAM Score is calculated
- [ ] Score explanation is shown
- [ ] Safe loan recommendation works
- [ ] Worker consent for lender access works
- [ ] Lender dashboard only shows consented data
- [ ] Emergency support case can be triggered
- [ ] Audit logs are created
- [ ] App is deployed

## Safety

- [ ] No Aadhaar collection
- [ ] No direct loan disbursement
- [ ] No guaranteed insurance payout
- [ ] No sensitive scoring variables
- [ ] Public verification page exposes limited data
- [ ] Consent can be revoked
- [ ] Lender access is logged
- [ ] Row-level security is enabled

---

## 16. Final Build Priorities

If time becomes limited, build in this order:

## Priority 1

```text
Site creation → Worker onboarding → Consent → Attendance
```

## Priority 2

```text
Worker confirmation → Disputes → Wage calculation → Wage slip PDF
```

## Priority 3

```text
QR/hash verification → Worker KAAM Pass
```

## Priority 4

```text
KAAM Score → Safe loan recommendation → Lender dashboard
```

## Priority 5

```text
Emergency support case → Admin/audit polish → Analytics
```

---

## 17. Final Workflow Summary

KAAM Setu AI works like this:

```text
A contractor creates a site and adds workers.
Workers confirm their details and consent.
Attendance is recorded daily with GPS and worker confirmation.
Workers can dispute incorrect records.
At the end of the wage cycle, the system generates a QR/hash-verified wage slip.
The wage slip becomes trusted income proof.
The worker's KAAM Pass stores verified work and wage history.
KAAM Score is calculated from real records.
Safe credit recommendation is generated to prevent over-borrowing.
Worker controls whether lenders/NGOs can view the profile.
Partners review verified income and make external decisions.
If income suddenly stops, KAAM creates an emergency support case.
```

---

## 18. Final Product Principle

> KAAM Setu does not start with loans. It starts with proof.

Once informal workers have verified income proof, safe finance becomes possible.

---

## 19. Final Closing Line

> KAAM Setu AI turns invisible labour into trusted financial identity.
