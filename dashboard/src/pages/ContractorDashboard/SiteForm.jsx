import { useState } from 'react';
import { supabase } from '../../supabaseClient';

export default function SiteForm({ contractorId, onSiteCreated }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    latitude: '',
    longitude: '',
    geofence_radius_m: 200,
    wage_cycle: 'weekly'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('sites')
        .insert({
          contractor_id: contractorId,
          name: formData.name,
          address: formData.address,
          latitude: parseFloat(formData.latitude),
          longitude: parseFloat(formData.longitude),
          geofence_radius_m: parseInt(formData.geofence_radius_m),
          wage_cycle: formData.wage_cycle
        })
        .select()
        .single();
      
      if (error) throw error;
      onSiteCreated(data);
    } catch (err) {
      alert('Error creating site: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card fade-in">
      <h3>Create New Site</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
        <input 
          type="text" 
          placeholder="Site Name" 
          value={formData.name} 
          onChange={e => setFormData({...formData, name: e.target.value})} 
          required 
          className="input-field"
        />
        <input 
          type="text" 
          placeholder="Address" 
          value={formData.address} 
          onChange={e => setFormData({...formData, address: e.target.value})} 
          required 
          className="input-field"
        />
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input 
            type="number" 
            step="any" 
            placeholder="Latitude" 
            value={formData.latitude} 
            onChange={e => setFormData({...formData, latitude: e.target.value})} 
            required 
            className="input-field"
          />
          <input 
            type="number" 
            step="any" 
            placeholder="Longitude" 
            value={formData.longitude} 
            onChange={e => setFormData({...formData, longitude: e.target.value})} 
            required 
            className="input-field"
          />
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input 
            type="number" 
            placeholder="Geofence Radius (m)" 
            value={formData.geofence_radius_m} 
            onChange={e => setFormData({...formData, geofence_radius_m: e.target.value})} 
            required 
            className="input-field"
          />
          <select 
            value={formData.wage_cycle} 
            onChange={e => setFormData({...formData, wage_cycle: e.target.value})}
            className="input-field"
          >
            <option value="weekly">Weekly</option>
            <option value="fortnightly">Fortnightly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? 'Creating...' : 'Create Site'}
        </button>
      </form>
    </div>
  );
}
