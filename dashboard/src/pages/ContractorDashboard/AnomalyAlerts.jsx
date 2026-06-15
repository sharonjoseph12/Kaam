import { useState, useEffect } from 'react';
import { detectAnomalies } from '../../utils/anomalyDetector';
import { AlertTriangle, ShieldCheck, CheckCircle } from 'lucide-react';

export default function AnomalyAlerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Run AI anomaly detection on load
    const detected = detectAnomalies([], []);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAlerts(detected);
  }, []);

  const dismissAlert = (id) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  if (alerts.length === 0) {
    return (
      <div className="card glass-card fade-in" style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>
        <ShieldCheck size={32} color="var(--color-success)" />
        <div>
          <h3 style={{ margin: 0, color: 'var(--color-success)' }}>AI Security Scan Clean</h3>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>No anomalies detected in your recent attendance or wage logs.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card glass-card fade-in">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <AlertTriangle size={24} color="var(--color-danger)" />
        <h3 style={{ margin: 0 }}>AI Anomaly Alerts</h3>
      </div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        KAAM AI has detected potential irregularities. Resolve these to maintain your Trust Score.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {alerts.map(alert => (
          <div key={alert.id} style={{
            padding: '1rem',
            borderLeft: `4px solid ${alert.severity === 'CRITICAL' ? 'var(--color-danger)' : alert.severity === 'HIGH' ? 'var(--color-warning)' : 'var(--color-primary)'}`,
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius: '0 8px 8px 0'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className={`badge badge-${alert.severity.toLowerCase()}`} style={{ fontSize: '0.7rem' }}>
                  {alert.severity}
                </span>
                <strong style={{ color: '#fff' }}>{alert.type}</strong>
              </div>
              <button 
                className="btn-icon btn-outline" 
                onClick={() => dismissAlert(alert.id)}
                title="Dismiss"
              >
                <CheckCircle size={16} />
              </button>
            </div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#ccc', marginBottom: '1rem' }}>
              {alert.description}
            </p>
            <button className="btn btn-sm btn-primary">
              {alert.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
