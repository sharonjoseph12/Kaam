/**
 * Advanced KAAM Score Engine
 * Calculates a dynamic credit-readiness score based on verified raw work data arrays.
 */

const calculateAttendanceConsistency = (attendanceLogs, expectedDays) => {
  if (!attendanceLogs || attendanceLogs.length === 0 || expectedDays === 0) return 0;
  const verifiedDays = attendanceLogs.filter(log => log.status === 'verified').length;
  // Score out of 100
  return Math.min(Math.round((verifiedDays / expectedDays) * 100), 100);
};

const calculateWageStability = (wageSlips) => {
  if (!wageSlips || wageSlips.length < 2) return 50; // Neutral if not enough history
  const wages = wageSlips.map(w => w.netPay);
  const mean = wages.reduce((a, b) => a + b, 0) / wages.length;
  const variance = wages.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / wages.length;
  const stdDev = Math.sqrt(variance);
  
  // Coefficient of Variation (CV)
  const cv = mean === 0 ? 0 : (stdDev / mean);
  
  // High CV means high volatility (bad). Low CV means stable (good).
  // If CV < 0.1 (10% variance), score is 100. If CV > 0.5 (50% variance), score is 0.
  let stability = 100 - (cv * 200);
  return Math.max(0, Math.min(100, Math.round(stability)));
};

const calculateDisputeScore = (disputes) => {
  if (!disputes || disputes.length === 0) return 100;
  const unresolved = disputes.filter(d => d.status === 'pending' || d.status === 'escalated').length;
  const resolved = disputes.filter(d => d.status === 'accepted' || d.status === 'closed').length;
  
  // Base 100. Minus 30 for each unresolved, minus 5 for each resolved.
  let score = 100 - (unresolved * 30) - (resolved * 5);
  return Math.max(0, score);
};

const calculateIncomeGapScore = (wageSlips) => {
  // Simplistic gap analysis based on sequential dates or missing periods
  // For MVP, assuming regular weekly slips, missing slips drop the score
  if (!wageSlips || wageSlips.length < 2) return 60;
  return 85; // Placeholder for advanced date parsing
};

/**
 * Calculates the final KAAM Score.
 * @param {Object} rawData - Contains arrays of attendance, wages, disputes, and contractor info
 */
// fallow-ignore-next-line complexity
function generateExplanation(components, weights, score) {
  const explanation = { positive: [], risk: [], tip: '' };
  
  const addIf = (condition, posMsg, riskMsg) => {
    if (condition) explanation.positive.push(posMsg);
    else explanation.risk.push(riskMsg);
  };

  addIf(components.attendance > 80, `+${Math.round(components.attendance * weights.wAttend)}/25 Consistent attendance`, `Inconsistent attendance (Score: ${components.attendance}/100)`);
  addIf(components.wage > 80, `+${Math.round(components.wage * weights.wWage)}/25 Stable wage income`, `High wage volatility detected (Score: ${components.wage}/100)`);
  addIf(components.dispute === 100, `+${Math.round(components.dispute * weights.wDispute)}/10 No active disputes`, `Active disputes impacting score`);

  if (components.trust > 80) explanation.positive.push(`+${Math.round(components.trust * weights.wTrust)}/15 High contractor trust score`);
  else if (components.trust < 50) explanation.risk.push('Associated with low-trust contractor');

  if (score <= 50) explanation.tip = "Work consistently for 2 more weeks to unlock higher loan limits.";
  else if (score <= 70) explanation.tip = "Maintain your attendance and verify wage slips to reach 'Good' status.";
  else explanation.tip = "Great job! You have unlocked preferred lending rates.";

  return explanation;
}

// fallow-ignore-next-line complexity
export function calculateKAAMScore(rawData) {
  const weights = { wAttend: 0.25, wWage: 0.25, wTrust: 0.15, wDispute: 0.10, wGap: 0.10, wRepay: 0.10, wProfile: 0.05 };
  
  const components = {
    attendance: calculateAttendanceConsistency(rawData.attendanceLogs, rawData.expectedDays || 30),
    wage: calculateWageStability(rawData.wageSlips),
    trust: rawData.contractorTrust || 50,
    dispute: calculateDisputeScore(rawData.disputes),
    gap: calculateIncomeGapScore(rawData.wageSlips),
    repay: rawData.repaymentScore !== undefined ? rawData.repaymentScore : 50,
    profile: rawData.profileCompleteness || 80
  };

  const score = Math.round(
    (components.attendance * weights.wAttend) +
    (components.wage * weights.wWage) +
    (components.trust * weights.wTrust) +
    (components.dispute * weights.wDispute) +
    (components.gap * weights.wGap) +
    (components.repay * weights.wRepay) +
    (components.profile * weights.wProfile)
  );

  let band = score > 85 ? 'Strong Confidence' : score > 70 ? 'Good Confidence' : score > 50 ? 'Medium Confidence' : 'Low Confidence';

  const explanation = generateExplanation(components, weights, score);

  return { score, band, explanation, components };
}

export function calculateSafeLoan(monthlyIncome) {
  const weeklyIncome = Math.round(monthlyIncome / 4);
  const maxWeeklyRepayment = Math.round(weeklyIncome * 0.20); // Max 20% DTI
  const safeAmount = maxWeeklyRepayment * 6; // 6 weeks tenure
  return {
    weeklyIncome,
    maxWeeklyRepayment,
    safeAmount,
    recommendedMin: Math.floor(safeAmount * 0.8 / 100) * 100,
    recommendedMax: Math.ceil(safeAmount / 100) * 100
  };
}
