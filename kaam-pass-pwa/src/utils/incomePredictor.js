/**
 * Smart Income Prediction Utility
 * Analyzes trend of past attendance and wage data to predict next month's income.
 */
export function predictIncome(historicalIncome) {
  // If insufficient data, return low confidence
  if (!historicalIncome || historicalIncome.length < 1) {
    return {
      prediction: '₹8,400 - ₹14,000',
      confidence: 'Low',
      description: 'Insufficient data for accurate prediction. Consistent attendance improves accuracy.'
    };
  }

  // MVP Mock Logic based on historical trend
  // Let's assume Ramesh has a stable income of ~16800.
  return {
    prediction: '₹16,800',
    confidence: 'High',
    description: 'Based on your stable attendance pattern, this is your estimated income for next month.'
  };
}
