"""Tests for geofence service."""

from app.services.geofence import check_within_geofence, haversine_distance_m


def test_haversine_same_point():
    """Distance between same point is 0."""
    d = haversine_distance_m(12.87, 74.84, 12.87, 74.84)
    assert d < 1.0  # within 1 meter due to float precision


def test_haversine_known_distance():
    """Approximate distance between two known points."""
    # Mangalore to Udupi is ~57km
    d = haversine_distance_m(12.9141, 74.8560, 13.3409, 74.7421)
    assert 45000 < d < 70000  # rough check


def test_within_geofence_true():
    """Point inside geofence radius."""
    # Same point, 100m radius
    assert check_within_geofence(12.87, 74.84, 12.87, 74.84, 100) is True


def test_within_geofence_false():
    """Point outside geofence radius."""
    # ~57km away, 200m radius
    assert check_within_geofence(12.9141, 74.8560, 13.3409, 74.7421, 200) is False


def test_geofence_edge():
    """Point at edge of geofence — slightly inside 500m."""
    # Approximately 200m offset at equatorial latitude
    assert check_within_geofence(12.870, 74.840, 12.8718, 74.840, 500) is True
