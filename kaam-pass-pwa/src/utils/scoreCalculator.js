/**
 * Calculate KAAM Score from worker data.
 * @param {Object} data Mock or real data object containing metrics.
 */
export function calculateKAAMScore(data) {
  // Weights
  const wAttend = 0.25;
  const wWage = 0.25;
  const wTrust = 0.15;
  const wDispute = 0.10;
  const wGap = 0.10;
  const wRepay = 0.10;
  const wProfile = 0.05;

  // Defaults or parsed values (out of 100)
  const attendance = data.attendanceScore || 0;
  const wage = data.wageStability || 0;
  const trust = data.contractorTrust || 0;
  const dispute = data.disputeScore || 0;
  const gap = data.incomeGapScore || 0;
  const repay = data.repaymentScore !== undefined ? data.repaymentScore : 50; // Default 50 if no loan
  const profile = data.profileCompleteness || 0;

  const score = Math.round(
    (attendance * wAttend) +
    (wage * wWage) +
    (trust * wTrust) +
    (dispute * wDispute) +
    (gap * wGap) +
    (repay * wRepay) +
    (profile * wProfile)
  );

  let band = 'Very Low';
  if (score > 85) band = 'Strong';
  else if (score > 70) band = 'Good';
  else if (score > 50) band = 'Medium';
  else if (score > 30) band = 'Low';

  // SHAP-style explanation: List top contributors
  const explanation = {
    positive: [],
    risk: [],
    tip: ''
  };

  if (attendance > 80) explanation.positive.push(`+${Math.round(attendance * wAttend)}/25 Consistent attendance`);
  else explanation.risk.push(`Inconsistent attendance (Score: ${attendance})`);

  if (wage > 80) explanation.positive.push(`+${Math.round(wage * wWage)}/25 Stable wage income`);
  else explanation.risk.push('Income depends heavily on one site or varies widely');

  if (repay === 50) explanation.risk.push('No repayment history (Neutral)');
  else if (repay > 80) explanation.positive.push(`+${Math.round(repay * wRepay)}/10 Strong repayment history`);
  
  if (trust > 80) explanation.positive.push(`+${Math.round(trust * wTrust)}/15 High contractor trust score`);
  else if (trust < 50) explanation.risk.push('Warning: Primary contractor has low trust score');

  // Tip
  if (score <= 50) {
    explanation.tip = "Work consistently for 2 more weeks to unlock higher loan limits.";
  } else if (score <= 70) {
    explanation.tip = "Maintain your attendance and verify wage slips to reach 'Good' status.";
  } else {
    explanation.tip = "Great job! You have unlocked preferred lending rates.";
  }

  return { score, band, explanation };
}

/**
 * Safe Loan Rule: Max weekly repayment = 20% of weekly income.
 * Assumes a 6-week loan tenure by default.
 * @param {number} monthlyIncome 
 */
export function calculateSafeLoan(monthlyIncome) {
  const weeklyIncome = Math.round(monthlyIncome / 4);
  const maxWeeklyRepayment = Math.round(weeklyIncome * 0.20);
  const safeAmount = maxWeeklyRepayment * 6; // 6 weeks tenure
  
  return {
    weeklyIncome,
    maxWeeklyRepayment,
    safeAmount,
    recommendedMin: Math.floor(safeAmount * 0.8 / 100) * 100, // round down to nearest 100
    recommendedMax: Math.ceil(safeAmount / 100) * 100
  };
}
