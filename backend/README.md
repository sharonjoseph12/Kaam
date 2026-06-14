# KAAM Finance Backend

**Compliance Operating System for India's Construction Supply Chain.**

FastAPI backend with PostgreSQL (Supabase), SHA-256 cryptographic attendance, Merkle tree audit trail, Labour Code compliant wage calculation, and anomaly detection.

## Setup

```bash
# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your Supabase connection string

# Run development server
uvicorn app.main:app --reload

# Swagger docs at http://localhost:8000/docs
```

## API Endpoints

| Prefix | Description |
|--------|-------------|
| `/api/contractor` | Registration, login, site management |
| `/api/workers` | Worker registration, site assignment |
| `/api/attendance` | Batch attendance marking with SHA-256 hashing |
| `/api/wageslips` | Wage slip generation, approval |
| `/api/inspector` | Labour Dept compliance dashboard |
| `/api/disputes` | Worker dispute management |
| `/api/anomalies` | Fraud/anomaly detection alerts |

## CRON Jobs

| Schedule | Job |
|----------|-----|
| Daily 6PM | Merkle tree seal (cryptographic audit certificate) |
| Daily 7AM | Income gap detection (insurance trigger) |
| Nightly 11PM | Anomaly scan (fraud patterns) |
| Monthly 1st | KAAM score recalculation |

## Testing

```bash
pytest tests/ -v
```

## Quality

```bash
ruff check .
mypy .
```

## Tech Stack

- **Framework**: FastAPI
- **Database**: PostgreSQL (Supabase)
- **Auth**: JWT (python-jose + bcrypt)
- **Crypto**: SHA-256 + Merkle trees (hashlib)
- **Scheduling**: APScheduler
- **Migrations**: Alembic
