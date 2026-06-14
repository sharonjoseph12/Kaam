"""Geofence verification using haversine distance.

Checks if a GPS coordinate is within a site's geofence radius.
Can be upgraded to PostGIS ST_DWithin queries when needed.
"""

import math


def haversine_distance_m(
    lat1: float, lng1: float, lat2: float, lng2: float
) -> float:
    """Calculate the haversine distance between two GPS points in meters."""
    R = 6371000  # Earth's radius in meters

    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lng2 - lng1)

    a = (
        math.sin(delta_phi / 2) ** 2
        + math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2) ** 2
    )
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    return R * c


def check_within_geofence(
    contractor_lat: float,
    contractor_lng: float,
    site_lat: float,
    site_lng: float,
    geofence_radius_m: int,
) -> bool:
    """Check if the contractor's GPS position is within the site geofence."""
    distance = haversine_distance_m(contractor_lat, contractor_lng, site_lat, site_lng)
    return distance <= geofence_radius_m
