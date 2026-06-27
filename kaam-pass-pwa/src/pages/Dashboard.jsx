import { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useWorker } from '../context/WorkerContext';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import AttendanceConfirmation from '../components/AttendanceConfirmation';
import WageSlipList from '../components/WageSlipList';
import ConsentToggle from '../components/ConsentToggle';
import ScoreGauge from '../components/ScoreGauge';
import { calculateKAAMScore, calculateSafeLoan } from '../utils/scoreCalculator';
import { predictIncome } from '../utils/incomePredictor';
import { getCurrentLocation, validateGeofence } from '../utils/geolocation';

// Mock pending consent request
const pendingConsentRequest = {
  lenderName: 'Samarth Finance',
  id: 'req-001'
};

// fallow-ignore-next-line complexity
export default function Dashboard() {
  const { profile } = useWorker();
  const { t } = useLanguage();
  
  const [scoreData, setScoreData] = useState(null);
  const [safeLoanLimit, setSafeLoanLimit] = useState(0);
  const [prediction, setPrediction] = useState(null);
  const [checkingIn, setCheckingIn] = useState(false);
  const [checkInStatus, setCheckInStatus] = useState(null);

  const [verifiedDays, setVerifiedDays] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [activeDisputes, setActiveDisputes] = useState(0);
  
  useEffect(() => {
    // Simulate raw data fetched from backend
    const rawData = {
      expectedDays: 30,
      attendanceLogs: Array(28).fill({ status: 'verified' }).concat([{status: 'pending'}, {status: 'absent'}]),
      wageSlips: [
        { netPay: 4200 }, { netPay: 4100 }, { netPay: 4300 }, { netPay: 4200 } // Stable income, 16800/mo
      ],
      disputes: [], // No active disputes
      contractorTrust: 84,
      repaymentScore: 60,
      profileCompleteness: 100
    };

    const verified = rawData.attendanceLogs.filter(l => l.status === 'verified').length;
    setVerifiedDays(verified);
    
    const monthly = rawData.wageSlips.reduce((sum, slip) => sum + slip.netPay, 0);
    setMonthlyIncome(monthly);
    
    const disputesCount = rawData.disputes.filter(d => d.status === 'pending').length;
    setActiveDisputes(disputesCount);

    const result = calculateKAAMScore(rawData);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setScoreData(result);

    const loanData = calculateSafeLoan(monthly);
    setSafeLoanLimit(loanData.safeAmount);

    const predictionData = predictIncome([monthly]);
    setPrediction(predictionData);
  }, []);

  const handleCheckIn = async () => {
    setCheckingIn(true);
    try {
      const coords = await getCurrentLocation();
      const siteCoords = { latitude: 12.2958, longitude: 76.6394 }; // Mock site coords
      const validation = validateGeofence(siteCoords, coords, 200); // 200m radius
      if (validation.isWithinFence) {
        setCheckInStatus(`Checked in successfully! Distance: ${Math.round(validation.distanceMeters)}m`);
      } else {
        setCheckInStatus(`Too far from site. Distance: ${Math.round(validation.distanceMeters)}m`);
      }
    } catch (err) {
      setCheckInStatus("Location access denied or failed.");
    } finally {
      setCheckingIn(false);
    }
  };

  if (!profile) return null;

  return (
    <div className="p-4 pb-24 space-y-6 fade-in">
      {/* 1. Profile Section */}
      <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 shadow-lg relative overflow-hidden border-0">
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold border-2 border-white/40">
              {profile.full_name?.charAt(0) || 'W'}
            </div>
            <div>
              <h1 className="text-2xl font-bold leading-tight">{profile.full_name}</h1>
              <p className="text-blue-100 font-medium tracking-wide text-sm">{profile.phone}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              {profile.skill || 'Unskilled'}
            </span>
            <span className="bg-green-500/80 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              {t('dashboard.verified')}
            </span>
          </div>
          <div className="mt-4">
            <Button onClick={handleCheckIn} disabled={checkingIn} className="w-full bg-white text-blue-700 font-bold hover:bg-gray-100">
              {checkingIn ? 'Locating...' : 'Self Check-In (GPS)'}
            </Button>
            {checkInStatus && <p className="text-xs text-white mt-2 font-medium bg-black/20 p-2 rounded">{checkInStatus}</p>}
          </div>
        </div>
      </Card>

      {/* 2. Score & 3. Safe Loan Limit */}
      <div className="grid grid-cols-2 gap-4">
        {scoreData && (
          <Card className="p-4 flex flex-col items-center justify-center text-center">
            <h3 className="font-bold text-gray-800 mb-2">KAAM Score</h3>
            <ScoreGauge score={scoreData.score} size={100} />
            <span className="mt-3 text-xs font-bold px-2 py-1 bg-gray-100 rounded-md text-gray-600 uppercase tracking-wide">
              {scoreData.band}
            </span>
          </Card>
        )}
        <Card className="p-4 flex flex-col justify-center text-center bg-blue-50 border border-blue-100">
          <h3 className="font-bold text-gray-800 mb-2">Safe Loan Limit</h3>
          <p className="text-3xl font-bold text-blue-600">₹{safeLoanLimit}</p>
          <p className="text-xs text-gray-500 mt-2 leading-tight">Calculated from your verified income</p>
          <Link to="/loan" className="mt-4 text-xs font-bold bg-blue-600 text-white py-2 px-4 rounded-full uppercase tracking-wide">
            Apply Now
          </Link>
        </Card>
      </div>

      {scoreData && (
        <Card className="p-4 bg-gray-50">
          <h4 className="font-bold text-sm text-gray-600 uppercase mb-2">Score Explanation</h4>
          <ul className="space-y-2 text-sm">
            {scoreData.explanation.positive.map((item, i) => (
              <li key={i} className="flex items-start text-green-700">
                <span className="mr-2">✓</span> {item}
              </li>
            ))}
            {scoreData.explanation.risk.map((item, i) => (
              <li key={i} className="flex items-start text-orange-600">
                <span className="mr-2">!</span> {item}
              </li>
            ))}
          </ul>
          <div className="mt-3 p-3 bg-blue-100/50 rounded-lg text-xs text-blue-800 font-medium">
            💡 <strong>Tip:</strong> {scoreData.explanation.tip}
          </div>
        </Card>
      )}

      {/* 4. Verified Work Days & Monthly Income */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 text-center">
          <p className="text-3xl font-bold text-gray-900">{verifiedDays}</p>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wide mt-1">{t('dashboard.days')}</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-green-600">₹{monthlyIncome}</p>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wide mt-1">{t('dashboard.earned')}</p>
        </Card>
      </div>

      {/* Prediction Box */}
      {prediction && (
        <Card className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 border border-indigo-100 slide-up">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-bold text-indigo-900 text-sm uppercase tracking-wide">Next Month Est. Income</h4>
              <p className="text-2xl font-bold text-indigo-700 mt-1">{prediction.prediction}</p>
            </div>
            <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${prediction.confidence === 'High' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
              {prediction.confidence} Confidence
            </span>
          </div>
          <p className="text-xs text-indigo-600 mt-2 font-medium">✨ AI Prediction: {prediction.description}</p>
        </Card>
      )}

      {/* 5. Attendance History */}
      <AttendanceConfirmation />

      {/* 6. Wage Slips */}
      <WageSlipList />

      {/* 7. Disputes & 8. Protection */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 text-center">
          <p className="text-xl font-bold text-gray-900">{activeDisputes}</p>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wide mt-1">Active Disputes</p>
        </Card>
        <Card className="p-4 text-center bg-green-50 border border-green-100">
          <p className="text-xl font-bold text-green-600">Active</p>
          <p className="text-xs text-green-800 font-bold uppercase tracking-wide mt-1">Protection Status</p>
        </Card>
      </div>

      {/* 9. Consent Controls */}
      <ConsentToggle />

      {/* 10. Pending Consent Requests (if any) */}
      {pendingConsentRequest && (
        <Card className="p-4 border-2 border-orange-200 bg-orange-50 mt-4 slide-up">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-orange-800">Consent Request</h4>
            <span className="text-xs bg-orange-200 text-orange-800 font-bold px-2 py-1 rounded-full uppercase">Action Needed</span>
          </div>
          <p className="text-sm text-orange-900 mb-4 leading-relaxed">
            <strong>{pendingConsentRequest.lenderName}</strong> has requested to view your verified KAAM profile for loan assessment.
          </p>
          <div className="flex gap-2">
            <Button className="flex-1 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50">Reject</Button>
            <Button className="flex-1 bg-orange-600 text-white hover:bg-orange-700">Approve</Button>
          </div>
        </Card>
      )}
    </div>
  );
}
