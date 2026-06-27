import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useWorker } from '../context/WorkerContext';

export default function WageSlipList() {
  const { profile } = useWorker();
  const [slips, setSlips] = useState([]);

  useEffect(() => {
    // fallow-ignore-next-line complexity
    const loadSlips = async () => {
      if (!profile?.id) return;
      const { data, error } = await supabase
        .from('wage_slips')
        .select('*')
        .eq('worker_id', profile.id)
        .order('created_at', { ascending: false });
      
      if (!error && data) setSlips(data);
    }
    loadSlips();
  }, [profile?.id]);

  if (slips.length === 0) return null;

  return (
    <div className="mb-4">
      <h3 className="font-bold text-gray-800 mb-2">Wage Slips ({slips.length})</h3>
      <div className="space-y-3">
        {slips.map(slip => (
          <div key={slip.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between fade-in">
            <div>
              <p className="font-bold text-gray-800">{slip.period}</p>
              <p className="text-sm text-gray-500">{slip.sites?.name || 'Site'}</p>
              <p className="font-bold text-green-600">₹{slip.net_pay}</p>
            </div>
            <div>
              {slip.pdf_url ? (
                <a 
                  href={slip.pdf_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-medium text-sm inline-block"
                >
                  Download PDF
                </a>
              ) : (
                <span className="text-xs text-gray-400">Processing...</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
