import { useState, useEffect } from 'react';
import { runProtectionScan } from '../../utils/protectionTrigger';

export default function ProtectionCases() {
  const [cases, setCases] = useState([]);
  const [scanning, setScanning] = useState(false);

  const fetchCases = () => {
    // For MVP, we simulate reading cases from protectionTrigger
    // In a real app we'd fetch from Supabase `protection_cases`
    // We'll just generate the mock data from the utility directly here
    const mockCase = {
      id: 'pc-001',
      workerName: 'Ramesh Kumar',
      triggerType: 'Work Stoppage',
      triggerDate: new Date().toISOString().split('T')[0],
      suggestedSupport: 1000,
      evidence: '24 days work in last 30 days, 0 days in last 7 days.',
      status: 'pending'
    };
    setCases([mockCase]);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCases();
  }, []);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      runProtectionScan();
      setScanning(false);
      fetchCases();
    }, 1500);
  };

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3>Income Interruption Cases</h3>
        <button className="btn btn-outline" onClick={handleScan} disabled={scanning}>
          {scanning ? 'Scanning...' : 'Run Protection Scan'}
        </button>
      </div>

      <div className="card" style={{ marginBottom: '1rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
        <p style={{ margin: 0, color: 'var(--text-muted)' }}>
          <strong>Note:</strong> System DETECTS and RECOMMENDS. Partners decide on disbursements. Wording avoids "insurance payout" per regulations.
        </p>
      </div>

      <div className="grid-2">
        {cases.map(c => (
          <div key={c.id} className="card" style={{ borderLeft: '4px solid var(--color-warning)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{c.workerName}</span>
              <span style={{ 
                padding: '0.25rem 0.5rem', 
                backgroundColor: 'rgba(234, 179, 8, 0.2)', 
                color: 'var(--color-warning)', 
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                {c.status.toUpperCase()}
              </span>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Trigger Event</div>
              <div style={{ fontWeight: 'bold' }}>{c.triggerType}</div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Evidence</div>
              <div style={{ fontSize: '0.9rem', backgroundColor: 'var(--bg-secondary)', padding: '0.5rem', borderRadius: '4px', marginTop: '0.25rem' }}>
                {c.evidence}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Suggested Support</div>
                <div style={{ fontWeight: 'bold', color: 'var(--color-success)', fontSize: '1.1rem' }}>₹{c.suggestedSupport}</div>
              </div>
              <button className="btn btn-sm btn-primary">Review Case</button>
            </div>
          </div>
        ))}
        {cases.length === 0 && (
          <p style={{ color: 'var(--text-muted)' }}>No active protection cases.</p>
        )}
      </div>
    </div>
  );
}
