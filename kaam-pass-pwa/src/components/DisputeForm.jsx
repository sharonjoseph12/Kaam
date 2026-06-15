import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useWorker } from '../context/WorkerContext';

export default function DisputeForm({ attendanceRecord, onClose, onDisputeSubmitted }) {
  const { profile } = useWorker();
  const [loading, setLoading] = useState(false);
  const [disputeType, setDisputeType] = useState('');
  const [description, setDescription] = useState('');

  const types = [
    { id: 'MISSING_ATTENDANCE', icon: '📅', label: 'Missing Day' },
    { id: 'WRONG_HOURS', icon: '⏰', label: 'Wrong Hours' },
    { id: 'OVERTIME_MISSING', icon: '⏳', label: 'No Overtime' },
    { id: 'WRONG_WAGE_RATE', icon: '💰', label: 'Wrong Pay Rate' },
    { id: 'UNFAIR_DEDUCTION', icon: '✂️', label: 'Unfair Cut' },
    { id: 'WAGE_SLIP_ERROR', icon: '📄', label: 'Slip Error' }
  ];

  const handleSubmit = async () => {
    if (!disputeType) return;
    setLoading(true);
    try {
      const { error } = await supabase.from('disputes').insert({
        worker_id: profile.id,
        contractor_id: attendanceRecord.contractor_id,
        alert_type: disputeType,
        description: `Dispute for attendance on ${attendanceRecord.date}. ${description}`,
        status: 'OPEN',
        severity: 'MEDIUM'
      });
      if (error) throw error;
      
      // Also update attendance status if it's an attendance issue
      await supabase.from('attendance')
        .update({ status: 'DISPUTED' })
        .eq('id', attendanceRecord.id);

      onDisputeSubmitted();
    } catch (err) {
      alert('Error submitting dispute: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-4 w-full max-w-sm fade-in shadow-xl">
        <h3 className="font-bold text-lg mb-4">Something wrong?</h3>
        <p className="text-sm text-gray-600 mb-4">Select what is wrong with the attendance on {attendanceRecord.date}</p>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          {types.map(t => (
            <button 
              key={t.id}
              onClick={() => setDisputeType(t.id)}
              className={`p-2 border rounded-lg text-center flex flex-col items-center justify-center gap-1
                ${disputeType === t.id ? 'bg-blue-50 border-blue-500' : 'bg-white border-gray-200'}
              `}
            >
              <span className="text-2xl">{t.icon}</span>
              <span className="text-[10px] font-medium leading-tight">{t.label}</span>
            </button>
          ))}
        </div>

        <textarea 
          placeholder="Optional: Add details..."
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg text-sm mb-4"
          rows={3}
        />

        <div className="flex gap-2">
          <button 
            onClick={onClose}
            className="flex-1 py-2 text-gray-600 font-medium rounded-lg border border-gray-300"
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="flex-1 py-2 bg-blue-600 text-white font-medium rounded-lg"
            disabled={loading || !disputeType}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}
