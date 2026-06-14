"""KAAM Finance Backend — FastAPI Application.

The Compliance Operating System for India's Construction Supply Chain.
"""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import Base, engine
from app.jobs.scheduler import start_scheduler, stop_scheduler
from app.routers import anomaly, attendance, contractor, dispute, inspector, wage_slip, worker

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(name)s | %(levelname)s | %(message)s",
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):  # type: ignore[no-untyped-def]
    """Application lifespan: create tables and start scheduler on startup."""
    # Create tables (for dev — use Alembic migrations in production)
    Base.metadata.create_all(bind=engine)
    logger.info("Database tables created/verified")

    # Start cron jobs
    if settings.ENVIRONMENT != "test":
        start_scheduler()

    yield

    # Shutdown
    stop_scheduler()


app = FastAPI(
    title="KAAM Finance API",
    description=(
        "Compliance Operating System for India's Construction Supply Chain. "
        "REST APIs for contractor/worker registration, cryptographic attendance, "
        "wage slip generation, compliance dashboards, and anomaly detection."
    ),
    version="0.1.0",
    lifespan=lifespan,
)

# CORS — allow Flutter app and React dashboard
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(contractor.router)
app.include_router(worker.router)
app.include_router(attendance.router)
app.include_router(wage_slip.router)
app.include_router(inspector.router)
app.include_router(dispute.router)
app.include_router(anomaly.router)


@app.get("/", tags=["Health"])
def health_check() -> dict[str, str]:
    """Health check endpoint."""
    return {
        "status": "healthy",
        "service": "KAAM Finance API",
        "version": "0.1.0",
    }


@app.get("/api/stats", tags=["Health"])
def platform_stats() -> dict[str, str]:
    """Basic platform statistics."""
    return {
        "platform": "KAAM Finance",
        "description": "Compliance OS for India's Construction Supply Chain",
        "api_version": "0.1.0",
        "environment": settings.ENVIRONMENT,
    }
