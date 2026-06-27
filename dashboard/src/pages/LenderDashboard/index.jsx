import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import WorkerList from './WorkerList';
import WorkerProfileDetail from './WorkerProfileDetail';
import ConsentRequest from './ConsentRequest';
import ProtectionCases from './ProtectionCases';
import { Users, ShieldAlert, BarChart2 } from 'lucide-react';
import { StatCard } from '../../components/ui';

// fallow-ignore-next-line complexity
export default function LenderDashboard() {
  const [activeTab, setActiveTab] = useState('workers');
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);

  const loadWorkers = async () => {
    // In a real app we'd also check lender_consents table if lender-specific consent exists.
    // For MVP, we fetch workers where consent_status === 'granted'
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id, full_name, phone, role, consent_status,
          workers!inner(skill, emergency_contact, language_preference)
        `)
        .eq('consent_status', 'granted');

      if (!error && data) {
        // Mock metrics for MVP, since we don't have full history in local state
        const enriched = data.map(w => ({
          ...w,
          verifiedIncome: 16800,
          kaamScore: 83,
          kaamBand: 'Good',
          trustScore: 92,
          disputes: 0,
          safeLoanLimit: 5040
        }));
        setWorkers(enriched);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadWorkers();
  }, []);

  if (selectedWorker) {
    return (
      <WorkerProfileDetail 
        worker={selectedWorker} 
        onBack={() => setSelectedWorker(null)} 
      />
    );
  }

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1>Lender Dashboard</h1>
        <p>Review consented worker profiles and provide safe financial inclusion</p>
      </div>

      <div className="stats-grid" style={{ marginBottom: 'var(--space-xl)' }}>
        <StatCard icon={Users} label="Consented Workers" value={workers.length} variant="primary" />
        <StatCard icon={BarChart2} label="Avg KAAM Score" value="81" variant="success" />
        <StatCard icon={ShieldAlert} label="Active Protection Cases" value="1" variant="warning" />
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          className={`btn ${activeTab === 'workers' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('workers')}
        >
          Consented Workers
        </button>
        <button 
          className={`btn ${activeTab === 'consent' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('consent')}
        >
          Request Consent
        </button>
        <button 
          className={`btn ${activeTab === 'protection' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('protection')}
        >
          Protection Triggers
        </button>
      </div>

      {activeTab === 'workers' && (
        <WorkerList workers={workers} onViewProfile={setSelectedWorker} />
      )}
      
      {activeTab === 'consent' && (
        <ConsentRequest />
      )}

      {activeTab === 'protection' && (
        <ProtectionCases />
      )}
    </div>
  );
}
