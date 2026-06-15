import { useState } from 'react';
import { useWorker } from '../context/WorkerContext';

export default function ConsentToggle() {
  const { profile, updateProfile } = useWorker();
  const [loading, setLoading] = useState(false);

  // default to false if null/undefined
  const isConsented = profile?.consent_status === 'granted';

  const handleToggle = async () => {
    if (!profile) return;
    setLoading(true);
    
    const newStatus = isConsented ? 'revoked' : 'granted';
    try {
      // Simulate API call since consent_status is not in the db schema
      await new Promise(resolve => setTimeout(resolve, 500));
      updateProfile({ consent_status: newStatus });
    } catch (err) {
      console.error('Error toggling consent', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
      <div>
        <h4 className="font-bold text-gray-800">Share Data with Lenders</h4>
        <p className="text-xs text-gray-500 mt-1">Allow safe lenders to view your KAAM Pass</p>
      </div>
      <button 
        onClick={handleToggle}
        disabled={loading}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isConsented ? 'bg-green-500' : 'bg-gray-300'}`}
      >
        <span 
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isConsented ? 'translate-x-6' : 'translate-x-1'}`}
        />
      </button>
    </div>
  );
}
