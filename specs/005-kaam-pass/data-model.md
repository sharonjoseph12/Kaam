# Data Model: KAAM Pass

## Entities

### `WorkerProfile`
- `id`: string (UUID)
- `name`: string
- `phone`: string
- `kaamCreditScore`: number (0-100)
- `isVerified`: boolean
- `earnedThisMonth`: number
- `daysLogged`: number
- `bloodGroup`: string
- `emergencyContact`: string

### `Document`
- `id`: string (UUID)
- `type`: enum ('Aadhaar', 'WageSlip', 'AppointmentLetter')
- `encryptedUrl`: string (remote URL for fetching)
- `localBlob`: binary (when cached in IndexedDB)
- `syncedAt`: timestamp

### `AttendanceEvent`
- `id`: string
- `date`: string (YYYY-MM-DD)
- `status`: enum ('Reported', 'Verified')
- `verificationMethod`: enum ('WhatsApp', 'Biometric')

### `LoanRequest`
- `id`: string
- `amount`: number
- `status`: enum ('Pending', 'Approved', 'Rejected')
- `disbursedAt`: timestamp (optional)
