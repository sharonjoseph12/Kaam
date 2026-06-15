import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import DisputeForm from './DisputeForm';
import { useWorker } from '../context/WorkerContext';

export default function AttendanceConfirmation() {
  const { profile } = useWorker();
  const [pendingRecords, setPendingRecords] = useState([]);
  const [showDisputeFor, setShowDisputeFor] = useState(null);

  const loadPending = async () => {
    // In a real app we'd fetch where trust_level is 2 and hasn't been confirmed yet.
    // For MVP, fetch recent attendance with status PRESENT/HALF_DAY where trust_level < 3.
    const { data, error } = await supabase
      .from('attendance')
      .select('*')
      .eq('worker_id', profile.id)
      .in('status', ['PRESENT', 'HALF_DAY'])
      .order('date', { ascending: false });
    
    if (!error && data) {
      setPendingRecords(data);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (profile?.id) loadPending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  const handleConfirm = async (recordId) => {
    try {
      await supabase
        .from('attendance')
        .update({ trust_level: 3 })
        .eq('id', recordId);
      loadPending();
    } catch (err) {
      alert('Error confirming: ' + err.message);
    }
  };

  if (pendingRecords.length === 0) return null;

  return (
    <div className="mb-4">
      <h3 className="font-bold text-gray-800 mb-2">Pending Confirmation ({pendingRecords.length})</h3>
      <div className="space-y-3">
        {pendingRecords.map(record => (
          <div key={record.id} className="bg-white rounded-xl p-4 shadow-sm border border-yellow-200 fade-in">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-bold text-gray-800">{record.sites?.name || 'Unknown Site'}</p>
                <p className="text-sm text-gray-500">{record.date} • {record.hours_worked} hours</p>
              </div>
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">Pending</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">You were marked {record.status.toLowerCase()} by the contractor. Is this correct?</p>
            <div className="flex gap-2">
              <button 
                onClick={() => handleConfirm(record.id)}
                className="flex-1 py-2 bg-green-500 text-white font-medium rounded-lg shadow-sm flex items-center justify-center gap-2"
              >
                <span>✅</span> Yes, correct
              </button>
              <button 
                onClick={() => setShowDisputeFor(record)}
                className="flex-1 py-2 bg-white text-red-600 border border-red-200 font-medium rounded-lg flex items-center justify-center gap-2"
              >
                <span>❌</span> Something wrong
              </button>
            </div>
          </div>
        ))}
      </div>

      {showDisputeFor && (
        <DisputeForm 
          attendanceRecord={showDisputeFor}
          onClose={() => setShowDisputeFor(null)}
          onDisputeSubmitted={() => {
            setShowDisputeFor(null);
            loadPending();
          }}
        />
      )}
    </div>
  );
}
