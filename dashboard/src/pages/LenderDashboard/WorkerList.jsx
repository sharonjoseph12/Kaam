import { useState } from 'react';
import * as XLSX from 'xlsx';
import { SeverityBadge, EmptyState } from '../../components/ui';

export default function WorkerList({ workers, onViewProfile }) {
  const [filterBand, setFilterBand] = useState('All');

  const filtered = filterBand === 'All' 
    ? workers 
    : workers.filter(w => w.kaamBand === filterBand);

  const exportToXlsx = () => {
    const wsData = filtered.map(w => ({
      'Name': w.full_name,
      'Phone': w.phone,
      'Skill': w.workers?.skill || 'Unskilled',
      'KAAM Score': w.kaamScore,
      'KAAM Band': w.kaamBand,
      'Verified Income (Rs)': w.verifiedIncome,
      'Safe Loan Limit (Rs)': w.safeLoanLimit,
      'Contractor Trust Score': w.trustScore
    }));
    
    const ws = XLSX.utils.json_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Consented Workers");
    XLSX.writeFile(wb, "KAAM_Consented_Workers.xlsx");
  };

  return (
    <div className="card fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0 }}>Consented Worker Profiles</h3>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select 
            className="input-field" 
            value={filterBand} 
            onChange={e => setFilterBand(e.target.value)}
            style={{ width: '150px' }}
          >
            <option value="All">All Scores</option>
            <option value="Strong">Strong (86+)</option>
            <option value="Good">Good (71-85)</option>
            <option value="Medium">Medium (51-70)</option>
            <option value="Low">Low (&lt;=50)</option>
          </select>
          <button className="btn btn-outline" onClick={exportToXlsx} disabled={filtered.length === 0}>
            Export XLSX
          </button>
        </div>
      </div>

      {filtered.length === 0 ? <EmptyState message="No consented workers match the criteria." /> : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Skill</th>
                <th>Verified Income</th>
                <th>KAAM Score</th>
                <th>Safe Loan Limit</th>
                <th>Contractor Trust</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(w => (
                <tr key={w.id}>
                  <td>{w.full_name}</td>
                  <td>{w.workers?.skill || 'Unknown'}</td>
                  <td style={{ fontWeight: 'bold', color: 'var(--color-success)' }}>₹{w.verifiedIncome}</td>
                  <td>
                    <SeverityBadge 
                      severity={w.kaamScore > 70 ? 'LOW' : w.kaamScore > 50 ? 'MEDIUM' : 'HIGH'} 
                      label={`${w.kaamScore} (${w.kaamBand})`} 
                    />
                  </td>
                  <td>₹{w.safeLoanLimit}</td>
                  <td>{w.trustScore}/100</td>
                  <td>
                    <button className="btn btn-sm btn-primary" onClick={() => onViewProfile(w)}>
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
