import { useState } from 'react';
import { supabase } from '../../supabaseClient';

export default function WorkerForm({ sites, onWorkerAdded }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    skill_category: 'Unskilled',
    daily_wage: '',
    site_id: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Insert or get worker
      // In a real app we'd check if phone exists. For now, just insert a new profile + worker, 
      // or assume the backend trigger handles it. Actually, workers must have a profile.
      // Since we don't have the auth layer, we'll insert into workers directly if possible.
      // But workers table references profiles. Let's create a profile first.
      
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert({
          full_name: formData.name,
          phone: formData.phone,
          role: 'worker'
        })
        .select()
        .single();
        
      if (profileError && profileError.code !== '23505') throw profileError; // Ignore unique constraint for demo
      
      // We need the worker ID. In this MVP, we just insert into worker_site_assignments.
      // Wait, we need the worker record too.
      // For simplicity in this demo, let's just insert into worker_site_assignments assuming we have the worker ID,
      // or we do a direct insert if we created the profile.
      
      let workerId = profileData ? profileData.id : null;
      if (!workerId) {
        // fetch existing profile by phone
        const { data: existing } = await supabase.from('profiles').select('id').eq('phone', formData.phone).single();
        if (existing) workerId = existing.id;
      }
      
      if (!workerId) throw new Error("Could not create or find worker profile.");

      // insert into workers
      const { error: workerError } = await supabase
        .from('workers')
        .upsert({
          id: workerId,
          skill_category: formData.skill_category,
          language_preference: 'hi'
        });
      
      if (workerError) throw workerError;

      // insert assignment
      const { data: assignmentData, error: assignError } = await supabase
        .from('worker_site_assignments')
        .insert({
          worker_id: workerId,
          site_id: formData.site_id,
          daily_wage: parseFloat(formData.daily_wage),
          status: 'PENDING',
          start_date: new Date().toISOString().split('T')[0]
        })
        .select()
        .single();
        
      if (assignError) throw assignError;

      onWorkerAdded(assignmentData);
      setFormData({...formData, name: '', phone: '', daily_wage: ''});
    } catch (err) {
      alert('Error adding worker: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card fade-in">
      <h3>Add New Worker</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
        <input 
          type="text" 
          placeholder="Worker Name" 
          value={formData.name} 
          onChange={e => setFormData({...formData, name: e.target.value})} 
          required 
          className="input-field"
        />
        <input 
          type="tel" 
          placeholder="Phone Number" 
          value={formData.phone} 
          onChange={e => setFormData({...formData, phone: e.target.value})} 
          required 
          className="input-field"
        />
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select 
            value={formData.skill_category} 
            onChange={e => setFormData({...formData, skill_category: e.target.value})}
            className="input-field"
            style={{ flex: 1 }}
          >
            <option value="Unskilled">Unskilled</option>
            <option value="Semi-skilled">Semi-skilled</option>
            <option value="Skilled">Skilled</option>
            <option value="Highly Skilled">Highly Skilled</option>
          </select>
          <input 
            type="number" 
            placeholder="Daily Wage (₹)" 
            value={formData.daily_wage} 
            onChange={e => setFormData({...formData, daily_wage: e.target.value})} 
            required 
            className="input-field"
            style={{ flex: 1 }}
          />
        </div>
        <select 
          value={formData.site_id} 
          onChange={e => setFormData({...formData, site_id: e.target.value})}
          required
          className="input-field"
        >
          <option value="">Select Site...</option>
          {sites.map(site => (
            <option key={site.id} value={site.id}>{site.name}</option>
          ))}
        </select>
        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          * Worker will receive an SMS to provide consent. Status will remain Pending until accepted.
        </div>
        <button type="submit" disabled={loading || !formData.site_id} className="btn btn-primary">
          {loading ? 'Adding...' : 'Add Worker'}
        </button>
      </form>
    </div>
  );
}
