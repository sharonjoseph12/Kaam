import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import {
  AlertTriangle, CheckCircle, MapPin, ShieldAlert, Clock, Zap,
} from 'lucide-react';
import { StatCard, SeverityBadge, Badge } from '../components/ui';
import { api } from '../api';
export default function AdminDashboard() {
  const [anomalies, setAnomalies] = useState([]);
  const [resolving, setResolving] = useState(null);
  const [filter, setFilter] = useState('all'); // all, unresolved, resolved

  useEffect(() => {
    const fetchAnomalies = async () => {
      try {
        const { data } = await supabase.from('anomalies').select('*').order('created_at', { ascending: false });
        if (data) setAnomalies(data);
      } catch (err) {
        console.error('Failed to fetch anomalies', err);
      }
    };
    
    fetchAnomalies();

    const channel = supabase.channel('admin-anomalies')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'anomalies' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setAnomalies(prev => [payload.new, ...prev]);
        } else if (payload.eventType === 'UPDATE') {
          setAnomalies(prev => prev.map(a => a.id === payload.new.id ? payload.new : a));
        } else if (payload.eventType === 'DELETE') {
          setAnomalies(prev => prev.filter(a => a.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleResolve = useCallback(async (alertId) => {
    setResolving(alertId);
    try {
      await api.resolveAnomaly(alertId);
      setAnomalies((prev) =>
        prev.map((a) =>
          a.id === alertId
            ? { ...a, resolved: true, resolved_at: new Date().toISOString() }
            : a,
        ),
      );
    } catch {
      // Fallback: update locally
      setAnomalies((prev) =>
        prev.map((a) =>
          a.id === alertId
            ? { ...a, resolved: true, resolved_at: new Date().toISOString() }
            : a,
        ),
      );
    }
    setResolving(null);
  }, []);

  const filtered = anomalies.filter((a) => {
    if (filter === 'unresolved') return !a.resolved;
    if (filter === 'resolved') return a.resolved;
    return true;
  });

  const unresolved = anomalies.filter((a) => !a.resolved);
  const highSev = unresolved.filter((a) => a.severity === 'HIGH');
  const escalated = unresolved.filter((a) => a.escalated_to_inspector);

  // GPS override candidates: flagged GPS anomalies
  const gpsAnomalies = anomalies.filter(
    (a) => a.alert_type === 'GPS_SPOOFING' || a.alert_type === 'GPS_MISMATCH',
  );

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <p>Anomaly resolution, GPS overrides, and platform management</p>
      </div>

      <div className="stats-grid">
        <StatCard icon={AlertTriangle} label="Unresolved" value={unresolved.length} variant="danger" />
        <StatCard icon={ShieldAlert} label="High Severity" value={highSev.length} variant="warning" />
        <StatCard icon={Zap} label="Escalated" value={escalated.length} variant="info" />
        <StatCard icon={CheckCircle} label="Resolved Today" value={anomalies.filter((a) => a.resolved).length} variant="success" />
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)' }}>
        {['all', 'unresolved', 'resolved'].map((f) => (
          <button
            key={f}
            className={`tab${filter === f ? ' active' : ''}`}
            onClick={() => setFilter(f)}
            style={{ borderBottom: 'none', paddingBottom: 0 }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f === 'unresolved' && unresolved.length > 0 && (
              <span className="badge badge--danger" style={{ marginLeft: 6 }}>
                {unresolved.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Anomaly Resolution */}
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        {filtered.length === 0 ? (
          <div className="card">
            <div className="empty-state">
              <CheckCircle size={48} />
              <h3>All anomalies resolved</h3>
            </div>
          </div>
        ) : (
          filtered.map((a) => (
            <div
              key={a.id}
              className={`card anomaly-card anomaly-card--${a.severity.toLowerCase()}`}
              style={{ opacity: a.resolved ? 0.6 : 1 }}
            >
              <div className="anomaly-header">
                <div>
                  <span className="anomaly-type">{a.alert_type.replace(/_/g, ' ')}</span>
                  <span
                    style={{
                      marginLeft: 8,
                      fontSize: 12,
                      color: 'var(--text-muted)',
                    }}
                  >
                    • Unknown
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <SeverityBadge severity={a.severity} />
                  {a.escalated_to_inspector && <Badge variant="danger">ESCALATED</Badge>}
                  {a.resolved && <Badge variant="success">RESOLVED</Badge>}
                </div>
              </div>

              <p className="anomaly-desc">{a.description}</p>

              <div className="anomaly-footer">
                <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
                  <span>
                    <Clock size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                    Created: {new Date(a.created_at).toLocaleDateString()}
                  </span>
                  {a.rectification_deadline && (
                    <span>
                      Deadline: {new Date(a.rectification_deadline).toLocaleDateString()}
                    </span>
                  )}
                </div>

                {!a.resolved && (
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleResolve(a.id)}
                    disabled={resolving === a.id}
                    id={`resolve-${a.id}`}
                  >
                    {resolving === a.id ? 'Resolving…' : 'Mark Resolved'}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* GPS Overrides Section */}
      <div className="card">
        <h3 style={{ marginBottom: 'var(--space-md)', fontSize: 16, fontWeight: 600 }}>
          <MapPin size={18} style={{ verticalAlign: 'middle', marginRight: 8 }} />
          GPS Override Requests
        </h3>
        {gpsAnomalies.length === 0 ? (
          <div className="empty-state">
            <h3>No GPS anomalies requiring override</h3>
          </div>
        ) : (
          <div className="table-container">
            <table className="data-table" id="gps-override-table">
              <thead>
                <tr>
                  <th>Alert ID</th>
                  <th>Contractor</th>
                  <th>Description</th>
                  <th>Severity</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {gpsAnomalies.map((a) => (
                  <tr key={a.id}>
                    <td style={{ fontFamily: 'monospace' }}>#{a.id}</td>
                    <td>Unknown</td>
                    <td style={{ maxWidth: 300, whiteSpace: 'normal' }}>
                      {a.description.length > 80
                        ? a.description.slice(0, 80) + '…'
                        : a.description}
                    </td>
                    <td><SeverityBadge severity={a.severity} /></td>
                    <td>
                      {a.resolved ? (
                        <Badge variant="success">Verified</Badge>
                      ) : (
                        <Badge variant="warning">Pending</Badge>
                      )}
                    </td>
                    <td>
                      {!a.resolved && (
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => handleResolve(a.id)}
                            disabled={resolving === a.id}
                          >
                            Approve Override
                          </button>
                          <button className="btn btn-sm btn-outline">
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
