import { jsPDF } from 'jspdf';
import { ScoreRing } from '../../components/ui';

export default function WorkerProfileDetail({ worker, onBack }) {
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('KAAM Setu - Verified Worker Profile', 20, 20);
    
    doc.setFontSize(14);
    doc.text(`Name: ${worker.full_name}`, 20, 40);
    doc.text(`Phone: ${worker.phone}`, 20, 50);
    doc.text(`Skill: ${worker.workers?.skill}`, 20, 60);
    
    doc.text(`KAAM Score: ${worker.kaamScore} (${worker.kaamBand})`, 20, 80);
    doc.text(`Verified Monthly Income: Rs. ${worker.verifiedIncome}`, 20, 90);
    doc.text(`Safe Loan Limit: Rs. ${worker.safeLoanLimit}`, 20, 100);
    doc.text(`Primary Contractor Trust Score: ${worker.trustScore}/100`, 20, 110);
    
    doc.save(`${worker.full_name.replace(' ', '_')}_Profile.pdf`);
  };

  return (
    <div className="fade-in">
      <button className="btn btn-outline" onClick={onBack} style={{ marginBottom: '1rem' }}>
        &larr; Back to List
      </button>

      <div className="grid-2">
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ marginBottom: '0.5rem' }}>{worker.full_name}</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>{worker.phone} • {worker.workers?.skill || 'Unskilled'}</p>
            </div>
            <button className="btn btn-primary" onClick={exportPDF}>Export PDF</button>
          </div>
          
          <div style={{ borderTop: '1px solid var(--border-color)', margin: '1rem 0', paddingTop: '1rem' }}>
            <h4 style={{ marginBottom: '1rem' }}>Income Data</h4>
            <div className="stats-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div>
                <div className="stat-label">Verified Monthly Income</div>
                <div className="stat-value" style={{ color: 'var(--color-success)' }}>₹{worker.verifiedIncome}</div>
              </div>
              <div>
                <div className="stat-label">Safe Loan Limit</div>
                <div className="stat-value text-blue">₹{worker.safeLoanLimit}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 style={{ alignSelf: 'flex-start' }}>KAAM Score</h3>
          <div style={{ margin: '2rem 0' }}>
            <ScoreRing score={worker.kaamScore} size={150} />
          </div>
          <span style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', fontWeight: 'bold' }}>
            Band: {worker.kaamBand}
          </span>
        </div>
      </div>

      <div className="card" style={{ marginTop: 'var(--space-xl)' }}>
        <h3 style={{ marginBottom: '1rem' }}>Score Explanation</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', color: 'var(--color-success)' }}>
            <span style={{ marginRight: '8px' }}>✓</span> +23/25 Consistent attendance in last 30 days
          </li>
          <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', color: 'var(--color-success)' }}>
            <span style={{ marginRight: '8px' }}>✓</span> +20/25 Stable wage income
          </li>
          <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', color: 'var(--color-warning)' }}>
            <span style={{ marginRight: '8px' }}>!</span> No repayment history (Neutral)
          </li>
        </ul>
        
        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
          <h4 style={{ marginBottom: '0.5rem' }}>Data Quality Signal</h4>
          <p>This worker's income is verified by a contractor with <strong>Trust Score {worker.trustScore}/100</strong>.</p>
        </div>
      </div>
    </div>
  );
}
