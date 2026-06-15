import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { verifyLocation } from '../../utils/geo';
import { SeverityBadge } from '../../components/ui';

export default function MarkAttendance({ site, assignments, onAttendanceMarked }) {
  const [loading, setLoading] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  
  // State for attendance selections
  const [selections, setSelections] = useState({});

  useEffect(() => {
    // Initialize selections
    const initial = {};
    assignments.forEach(a => {
      initial[a.worker_id] = { status: 'PRESENT', hours: 8 };
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelections(initial);
  }, [assignments]);

  const handleGetLocation = () => {
    setGpsLoading(true);
    setErrorMsg('');
    if (!navigator.geolocation) {
      setErrorMsg('Geolocation is not supported by your browser');
      setGpsLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setGpsLoading(false);
      },
      () => {
        setErrorMsg('Could not get location. Trust level will be Level 1.');
        setGpsLoading(false);
      }
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let isVerified = false;
      let trustLevel = 1;
      
      if (location) {
        const result = verifyLocation(location.lat, location.lon, site.latitude, site.longitude, site.geofence_radius_m);
        isVerified = result.verified;
        trustLevel = result.trustLevel;
      }
      
      const records = assignments.map(a => {
        const sel = selections[a.worker_id];
        return {
          worker_id: a.worker_id,
          site_id: site.id,
          date: new Date().toISOString().split('T')[0],
          status: sel.status,
          hours_worked: sel.status === 'ABSENT' ? 0 : sel.hours,
          gps_verified: isVerified,
          trust_level: trustLevel,
          contractor_id: site.contractor_id
        };
      });

      const { error } = await supabase.from('attendance').insert(records);
      if (error) {
        if (error.code === '23505') {
          throw new Error('Attendance already marked for today.');
        }
        throw error;
      }
      
      alert('Attendance marked successfully!');
      if (onAttendanceMarked) onAttendanceMarked();
    } catch (err) {
      alert('Error marking attendance: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateSelection = (workerId, field, value) => {
    setSelections(prev => ({
      ...prev,
      [workerId]: { ...prev[workerId], [field]: value }
    }));
  };

  return (
    <div className="card fade-in">
      <h3>Mark Attendance: {site.name}</h3>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Date: {new Date().toLocaleDateString()}</p>
      
      <div style={{ marginBottom: '1rem' }}>
        <button className="btn btn-sm btn-outline" onClick={handleGetLocation} disabled={gpsLoading}>
          {gpsLoading ? 'Getting Location...' : location ? 'Location Captured ✓' : 'Capture Location'}
        </button>
        {errorMsg && <div style={{ color: 'var(--color-warning)', fontSize: '0.875rem', marginTop: '0.5rem' }}>{errorMsg}</div>}
        {location && (
          <div style={{ marginTop: '0.5rem' }}>
            <SeverityBadge severity={verifyLocation(location.lat, location.lon, site.latitude, site.longitude, site.geofence_radius_m).verified ? 'LOW' : 'HIGH'} />
            <span style={{ marginLeft: 8, fontSize: '0.875rem' }}>
              {verifyLocation(location.lat, location.lon, site.latitude, site.longitude, site.geofence_radius_m).verified ? 'Within Geofence (Level 2)' : 'Outside Geofence (Level 1)'}
            </span>
          </div>
        )}
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Worker Name</th>
              <th>Status</th>
              <th>Hours</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map(a => (
              <tr key={a.id}>
                <td>{a.profiles?.full_name || 'Unknown'}</td>
                <td>
                  <select 
                    value={selections[a.worker_id]?.status || 'PRESENT'}
                    onChange={e => updateSelection(a.worker_id, 'status', e.target.value)}
                    className="input-field"
                    style={{ padding: '4px', fontSize: '14px' }}
                  >
                    <option value="PRESENT">Present</option>
                    <option value="HALF_DAY">Half Day</option>
                    <option value="ABSENT">Absent</option>
                  </select>
                </td>
                <td>
                  <input 
                    type="number" 
                    value={selections[a.worker_id]?.hours || 8}
                    onChange={e => updateSelection(a.worker_id, 'hours', parseInt(e.target.value))}
                    disabled={selections[a.worker_id]?.status === 'ABSENT'}
                    className="input-field"
                    style={{ width: '60px', padding: '4px' }}
                    min="0"
                    max="16"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="btn btn-primary" onClick={handleSubmit} disabled={loading || assignments.length === 0} style={{ marginTop: '1rem' }}>
        {loading ? 'Submitting...' : 'Submit All'}
      </button>
    </div>
  );
}
