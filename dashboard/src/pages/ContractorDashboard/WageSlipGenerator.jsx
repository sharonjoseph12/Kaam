import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { generateHash } from '../../utils/crypto';
import { generateWageSlipPDF } from '../../utils/pdfGenerator';
import { CheckCircle } from 'lucide-react';

export default function WageSlipGenerator({ site, assignments, onGenerated }) {
  const [loading, setLoading] = useState(false);
  const [slips, setSlips] = useState([]);
  const [period] = useState('June 2026'); // Mocked for simplicity
  const [generated, setGenerated] = useState(false);

  useEffect(() => {
    // Generate draft slips based on assignments
    const drafts = assignments.map(a => {
      // Mocking attendance count since we don't have historical attendance in local state
      // In a real app we'd fetch `attendance` where worker_id = a.worker_id and site_id = site.id
      const daysWorked = 20; 
      const dailyWage = a.daily_wage;
      const basePay = daysWorked * dailyWage;
      const overtime = 0; // mocked
      
      return {
        worker_id: a.worker_id,
        worker_name: a.profiles?.full_name || 'Unknown',
        site_id: site.id,
        site_name: site.name,
        contractor_id: site.contractor_id,
        contractor_name: 'SuperBuild Co', // Mocked, would come from contractor profile
        period: period,
        days_worked: daysWorked,
        daily_wage: dailyWage,
        base_pay: basePay,
        overtime: overtime,
        advances: 0,
        deductions: 0,
        gross_pay: basePay + overtime,
        net_pay: basePay + overtime // initial
      };
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSlips(drafts);
  }, [assignments, site, period]);

  const updateSlip = (workerId, field, value) => {
    setSlips(prev => prev.map(s => {
      if (s.worker_id === workerId) {
        const updated = { ...s, [field]: value };
        updated.net_pay = updated.gross_pay - updated.advances - updated.deductions;
        return updated;
      }
      return s;
    }));
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      for (const slip of slips) {
        // 1. Generate Hash
        const hashPayload = {
          worker_id: slip.worker_id,
          site_id: slip.site_id,
          period: slip.period,
          net_pay: slip.net_pay,
          contractor_id: slip.contractor_id
        };
        const hashId = await generateHash(hashPayload);
        const slipWithHash = { ...slip, hash_id: hashId };

        // 2. Generate PDF
        const pdfBlob = await generateWageSlipPDF(slipWithHash);

        // 3. Upload to Supabase Storage (assume bucket 'wage_slips' exists and is public)
        const fileName = `${slip.contractor_id}/${slip.worker_id}_${hashId}.pdf`;
        const { error: uploadError } = await supabase.storage.from('wage_slips').upload(fileName, pdfBlob, {
          contentType: 'application/pdf',
          upsert: true
        });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage.from('wage_slips').getPublicUrl(fileName);
        const pdfUrl = publicUrlData.publicUrl;

        // 4. Insert into database
        const { error: dbError } = await supabase.from('wage_slips').insert({
          worker_id: slip.worker_id,
          site_id: slip.site_id,
          contractor_id: slip.contractor_id,
          period: slip.period,
          hash_id: hashId,
          pdf_url: pdfUrl,
          net_pay: slip.net_pay,
          status: 'VERIFIED' // Instantly verified by contractor for MVP
        });

        if (dbError) throw dbError;
      }

      setGenerated(true);
      if (onGenerated) onGenerated();
    } catch (err) {
      alert('Error generating wage slips: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (generated) {
    return (
      <div className="card fade-in" style={{ textAlign: 'center', padding: '2rem' }}>
        <CheckCircle size={48} color="var(--color-success)" style={{ margin: '0 auto 1rem' }} />
        <h3>Wage Slips Generated Successfully!</h3>
        <p>They have been cryptographically hashed and PDFs uploaded.</p>
      </div>
    );
  }

  return (
    <div className="card fade-in">
      <h3>Generate Wage Slips: {site.name}</h3>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Period: {period}</p>
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Worker Name</th>
              <th>Days</th>
              <th>Gross Pay</th>
              <th>Advances (₹)</th>
              <th>Deductions (₹)</th>
              <th>Net Pay (₹)</th>
            </tr>
          </thead>
          <tbody>
            {slips.map(s => (
              <tr key={s.worker_id}>
                <td>{s.worker_name}</td>
                <td>{s.days_worked}</td>
                <td>₹{s.gross_pay}</td>
                <td>
                  <input 
                    type="number" 
                    value={s.advances}
                    onChange={e => updateSlip(s.worker_id, 'advances', parseInt(e.target.value) || 0)}
                    className="input-field"
                    style={{ width: '80px', padding: '4px' }}
                  />
                </td>
                <td>
                  <input 
                    type="number" 
                    value={s.deductions}
                    onChange={e => updateSlip(s.worker_id, 'deductions', parseInt(e.target.value) || 0)}
                    className="input-field"
                    style={{ width: '80px', padding: '4px' }}
                  />
                </td>
                <td style={{ fontWeight: 'bold' }}>₹{s.net_pay}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="btn btn-success" onClick={handleGenerate} disabled={loading || slips.length === 0} style={{ marginTop: '1rem' }}>
        {loading ? 'Generating & Hashing...' : 'Generate All Slips'}
      </button>
    </div>
  );
}
