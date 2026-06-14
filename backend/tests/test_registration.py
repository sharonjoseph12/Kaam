"""Tests for FastAPI registration endpoints using TestClient."""

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_check():
    """Health check returns 200."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "KAAM Finance API"


def test_platform_stats():
    """Platform stats endpoint works."""
    response = client.get("/api/stats")
    assert response.status_code == 200
    data = response.json()
    assert data["platform"] == "KAAM Finance"
