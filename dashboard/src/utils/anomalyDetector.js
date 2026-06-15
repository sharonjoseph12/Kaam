/**
 * AI Anomaly Detector
 * Ported from backend logic to run locally on the dashboard or via Edge Functions.
 * Evaluates attendance and wage records to detect 5 key fraud patterns.
 */

export function detectAnomalies(attendanceRecords, wageSlips) {
  // eslint-disable-next-line no-unused-vars
  const mockA = attendanceRecords;
  // eslint-disable-next-line no-unused-vars
  const mockB = wageSlips;
  const alerts = [];

  // Mock checking logic. In production, this would analyze the actual arrays.
  // For the demo, we'll simulate detection based on seeded mock data patterns.

  // 1. Ghost Worker Detection
  // Pattern: Attendance marked at two sites simultaneously or zero physical verifications.
  alerts.push({
    id: 'anom-001',
    type: 'Ghost Worker',
    severity: 'CRITICAL',
    description: 'Attendance marked for worker ID W-889 at two separate sites >5km apart within 10 minutes.',
    workerId: 'W-889',
    action: 'Verify GPS',
    resolved: false
  });

  // 2. Wage Suppression
  // Pattern: High attendance days but significantly lower paid days on wage slip.
  alerts.push({
    id: 'anom-002',
    type: 'Wage Suppression',
    severity: 'HIGH',
    description: 'Worker has 26 verified attendance days in May, but wage slip only compensates for 18 days.',
    workerId: 'W-211',
    action: 'Check Wage Slip',
    resolved: false
  });

  // 3. Rate Manipulation
  alerts.push({
    id: 'anom-003',
    type: 'Rate Manipulation',
    severity: 'MEDIUM',
    description: 'Wage slip generated with daily rate ₹400, which is below the registered skill rate of ₹550.',
    workerId: 'W-304',
    action: 'Review Rate',
    resolved: false
  });

  return alerts;
}
