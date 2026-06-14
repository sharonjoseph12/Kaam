"""Tests for SHA-256 hashing and Merkle tree construction.

Validates:
- SC-001: Attendance hashing takes < 50ms per record
- SC-002: Merkle root generated for 10,000+ records in < 1 minute
"""

import time

from app.services.crypto import build_merkle_tree, hash_aadhaar, hash_attendance_record, verify_hash


def test_hash_attendance_record_deterministic():
    """Same inputs produce same hash."""
    h1 = hash_attendance_record(1, 1, "2026-06-01", "P", 12.87, 74.84, "2026-06-01T09:00:00Z")
    h2 = hash_attendance_record(1, 1, "2026-06-01", "P", 12.87, 74.84, "2026-06-01T09:00:00Z")
    assert h1 == h2
    assert len(h1) == 64  # SHA-256 hex digest


def test_hash_changes_with_different_status():
    """Different status produces different hash."""
    h_present = hash_attendance_record(1, 1, "2026-06-01", "P", 12.87, 74.84, "2026-06-01T09:00:00Z")
    h_absent = hash_attendance_record(1, 1, "2026-06-01", "A", 12.87, 74.84, "2026-06-01T09:00:00Z")
    assert h_present != h_absent


def test_hash_chain_with_prev_hash():
    """Hash changes when prev_hash differs."""
    h1 = hash_attendance_record(1, 1, "2026-06-01", "P", 12.87, 74.84, "2026-06-01T09:00:00Z", prev_hash=None)
    h2 = hash_attendance_record(1, 1, "2026-06-01", "P", 12.87, 74.84, "2026-06-01T09:00:00Z", prev_hash="abc123")
    assert h1 != h2


def test_verify_hash():
    """Verify hash matches recomputed hash."""
    h = hash_attendance_record(1, 1, "2026-06-01", "P", 12.87, 74.84, "2026-06-01T09:00:00Z")
    assert verify_hash(h, 1, 1, "2026-06-01", "P", 12.87, 74.84, "2026-06-01T09:00:00Z")
    assert not verify_hash("tampered", 1, 1, "2026-06-01", "P", 12.87, 74.84, "2026-06-01T09:00:00Z")


def test_hash_performance_under_50ms():
    """SC-001: Attendance hashing takes < 50ms per record."""
    start = time.perf_counter()
    for i in range(1000):
        hash_attendance_record(i, 1, f"2026-06-{i % 28 + 1:02d}", "P", 12.87, 74.84, f"2026-06-01T09:{i:04d}Z")
    elapsed = (time.perf_counter() - start) / 1000 * 1000  # ms per record
    assert elapsed < 50, f"Hash took {elapsed:.2f}ms per record (limit: 50ms)"


def test_merkle_tree_empty():
    """Empty list produces a deterministic hash."""
    root = build_merkle_tree([])
    assert len(root) == 64


def test_merkle_tree_single():
    """Single hash returns itself."""
    h = hash_attendance_record(1, 1, "2026-06-01", "P", 12.87, 74.84, "2026-06-01T09:00:00Z")
    root = build_merkle_tree([h])
    assert root == h


def test_merkle_tree_even():
    """Even number of hashes builds correctly."""
    hashes = [
        hash_attendance_record(i, 1, "2026-06-01", "P", 12.87, 74.84, f"T{i}")
        for i in range(4)
    ]
    root = build_merkle_tree(hashes)
    assert len(root) == 64


def test_merkle_tree_odd():
    """Odd number of hashes duplicates last leaf."""
    hashes = [
        hash_attendance_record(i, 1, "2026-06-01", "P", 12.87, 74.84, f"T{i}")
        for i in range(5)
    ]
    root = build_merkle_tree(hashes)
    assert len(root) == 64


def test_merkle_tree_10000_records_under_1_minute():
    """SC-002: Merkle root for 10,000+ records in < 1 minute."""
    hashes = [
        hash_attendance_record(i, 1, f"2026-06-{i % 28 + 1:02d}", "P", 12.87, 74.84, f"T{i}")
        for i in range(10000)
    ]
    start = time.perf_counter()
    root = build_merkle_tree(hashes)
    elapsed = time.perf_counter() - start
    assert len(root) == 64
    assert elapsed < 60, f"Merkle tree took {elapsed:.2f}s (limit: 60s)"


def test_hash_aadhaar():
    """Aadhaar hashing is deterministic and irreversible."""
    h1 = hash_aadhaar("123456789012")
    h2 = hash_aadhaar("123456789012")
    h3 = hash_aadhaar("123456789013")
    assert h1 == h2
    assert h1 != h3
    assert len(h1) == 64
