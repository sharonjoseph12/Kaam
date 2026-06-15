import { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { calculateSafeLoan } from '../utils/scoreCalculator';

export default function SafeLoan() {
  const [requestedAmount, setRequestedAmount] = useState('');
  const [recommendation, setRecommendation] = useState(null);

  // Mocked income for MVP, normally fetched from worker's verified records
  const monthlyIncome = 16800;

  const handleAssess = () => {
    const amount = parseInt(requestedAmount);
    if (!amount || amount <= 0) return;

    const safeLoanData = calculateSafeLoan(monthlyIncome);
    setRecommendation({
      requested: amount,
      ...safeLoanData
    });
  };

  return (
    <div className="p-4 pb-24 fade-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Safe Loan Request</h2>
      
      <Card className="p-4 mb-6">
        <h3 className="font-bold text-gray-800 mb-4">How much do you need?</h3>
        <div className="relative mb-4">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
          <input 
            type="number" 
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-lg font-bold text-gray-900"
            placeholder="e.g. 10000"
            value={requestedAmount}
            onChange={e => setRequestedAmount(e.target.value)}
          />
        </div>
        <Button onClick={handleAssess} className="w-full" disabled={!requestedAmount}>
          Assess Safe Amount
        </Button>
      </Card>

      {recommendation && (
        <Card className="p-5 border-2 border-blue-100 bg-blue-50/30 slide-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">KAAM Recommendation</h3>
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-md uppercase">Safe Match</span>
          </div>

          {recommendation.requested > recommendation.safeAmount ? (
            <div className="mb-4">
              <p className="text-gray-700 leading-relaxed">
                You requested <strong className="text-gray-900">₹{recommendation.requested}</strong>. 
                KAAM recommends <strong className="text-blue-700">₹{recommendation.recommendedMin} - ₹{recommendation.recommendedMax}</strong> to keep you safe from debt stress.
              </p>
            </div>
          ) : (
            <div className="mb-4">
              <p className="text-gray-700 leading-relaxed">
                Your request of <strong className="text-gray-900">₹{recommendation.requested}</strong> is well within your safe borrowing limit.
              </p>
            </div>
          )}

          <div className="bg-white rounded-lg p-4 border border-blue-100 mt-4">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Why this amount?</h4>
            
            <div className="flex justify-between items-center mb-2 text-sm">
              <span className="text-gray-600">Verified Weekly Income:</span>
              <span className="font-bold text-gray-900">₹{recommendation.weeklyIncome}</span>
            </div>
            
            <div className="flex justify-between items-center mb-2 text-sm">
              <span className="text-gray-600">Safe Repayment limit (20%):</span>
              <span className="font-bold text-green-600">₹{recommendation.maxWeeklyRepayment} / wk</span>
            </div>

            <div className="flex justify-between items-center pt-2 mt-2 border-t border-gray-100 text-sm">
              <span className="text-gray-600">Max Loan (6 weeks):</span>
              <span className="font-bold text-gray-900">₹{recommendation.safeAmount}</span>
            </div>
          </div>

          <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
            Apply for ₹{recommendation.requested > recommendation.safeAmount ? recommendation.recommendedMax : recommendation.requested}
          </Button>
        </Card>
      )}
    </div>
  );
}
