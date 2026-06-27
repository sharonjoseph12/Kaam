import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

// fallow-ignore-next-line complexity
export default function Verify() {
  const { hash } = useParams();
  const [loading, setLoading] = useState(true);
  const [wageSlip, setWageSlip] = useState(null);

  useEffect(() => {
    // fallow-ignore-next-line complexity
    async function verifyHash() {
      if (!hash) return;
      try {
        const { data, error } = await supabase
          .from('wage_slips')
          .select('*, workers:worker_id(name)')
          .eq('hash_id', hash)
          .single();
        
        if (!error && data) {
          setWageSlip(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    verifyHash();
  }, [hash]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="font-bold text-gray-500">Verifying Cryptographic Hash...</p>
      </div>
    );
  }

  if (!wageSlip) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✗</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Verification Failed</h2>
          <p className="text-gray-600 mb-6">This wage slip could not be verified. It may be invalid or tampered with.</p>
          <Link to="/" className="text-blue-600 font-medium hover:underline">Back to KAAM Pass</Link>
        </div>
      </div>
    );
  }

  // Mask name for privacy (e.g. "Rahul S***")
  const workerName = wageSlip.workers?.full_name || 'Worker';
  const nameParts = workerName.split(' ');
  const maskedName = nameParts.length > 1 
    ? `${nameParts[0]} ${nameParts[1].charAt(0)}***` 
    : `${workerName.substring(0, 3)}***`;

  return (
    <div className="min-h-screen bg-gray-100 p-4 pb-20">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-green-500 p-6 text-center text-white">
            <div className="w-16 h-16 bg-white text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-lg">✓</div>
            <h2 className="text-2xl font-bold mb-1">Wage Slip Verified</h2>
            <p className="text-green-100 text-sm opacity-90 break-all">{hash}</p>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-500">Worker</span>
              <span className="font-bold text-gray-900">{maskedName}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-500">Site</span>
              <span className="font-bold text-gray-900">{wageSlip.sites?.name || 'Unknown'}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-500">Period</span>
              <span className="font-bold text-gray-900">{wageSlip.period}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-500">Status</span>
              <span className="font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md text-sm">{wageSlip.status}</span>
            </div>
            
            <div className="mt-6 bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
              <p className="text-gray-500 text-sm mb-1">Net Pay</p>
              <p className="text-3xl font-bold text-gray-900">₹{wageSlip.net_pay}</p>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 mb-4">Secured by KAAM Setu Trust Layer</p>
          <Link to="/" className="text-blue-600 font-medium hover:underline bg-white px-6 py-2 rounded-full shadow-sm">Go to KAAM Pass</Link>
        </div>
      </div>
    </div>
  );
}
