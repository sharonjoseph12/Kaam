import { useState } from 'react';
import { Save, ShieldAlert, Settings, Download } from 'lucide-react';
import { useAuth } from '../AuthContext';

export default function AdminSettings() {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
    }, 800);
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1>Platform Settings</h1>
        <p>Manage your account preferences and Compliance OS configuration</p>
      </div>

      <div className="grid-2">
        {/* Profile Settings Card */}
        <div className="card" style={{ boxShadow: 'var(--shadow-md)', border: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--space-lg)', justifyContent: 'center', flexDirection: 'column' }}>
            <div style={{ width: '48px', height: '48px', background: 'var(--kaam-primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
              K
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>Administrator Profile</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '-8px' }}>Update your account details</p>
          </div>
          
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-input" defaultValue={user?.name || 'Admin User'} />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-input" defaultValue="admin@kaam.com" />
            </div>
            <div className="form-group">
              <label className="form-label">Role Designation</label>
              <input type="text" className="form-input" value="Super Administrator" disabled style={{ opacity: 0.7 }} />
            </div>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              <Save size={16} />
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </form>
        </div>

        {/* Security Settings Card */}
        <div className="card" style={{ boxShadow: 'var(--shadow-md)', border: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-lg)' }}>
            <div style={{ width: '32px', height: '32px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--kaam-primary)' }}>
              <ShieldAlert size={18} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>Security & Authentication</h3>
          </div>
          
          <form onSubmit={handleSave}>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
              Contractor Score Penalty Factor
            </label>
            <input type="number" defaultValue="1.5" step="0.1" className="input-field" />
          </div>
            <div className="form-group">
              <label className="form-label">Current Password</label>
              <input type="password" className="form-input" placeholder="••••••••" />
            </div>
            <div className="form-group">
              <label className="form-label">New Password</label>
              <input type="password" className="form-input" placeholder="••••••••" />
            </div>
            <div className="form-group" style={{ marginBottom: 'var(--space-lg)' }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ width: '16px', height: '16px', accentColor: 'var(--kaam-primary)' }} />
                Require Two-Factor Authentication (2FA) for Admin login
              </label>
            </div>
            <button type="submit" className="btn btn-outline" disabled={saving}>
              Update Security Settings
            </button>
          </form>
        </div>

        {/* System Configuration */}
        <div className="card" style={{ boxShadow: 'var(--shadow-md)', border: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-lg)' }}>
            <div style={{ width: '32px', height: '32px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--kaam-primary)' }}>
              <Settings size={18} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>System Configuration</h3>
          </div>
          
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label className="form-label">GPS Geofence Strictness (meters)</label>
              <select className="form-input form-select" defaultValue="500">
                <option value="100">Strict (100m radius)</option>
                <option value="500">Standard (500m radius)</option>
                <option value="1000">Relaxed (1km radius)</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Anomaly Auto-Escalation Time</label>
              <select className="form-input form-select" defaultValue="24">
                <option value="12">12 Hours</option>
                <option value="24">24 Hours</option>
                <option value="48">48 Hours</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              Apply Configuration
            </button>
          </form>
        </div>

        {/* Data & Compliance */}
        <div className="card" style={{ boxShadow: 'var(--shadow-md)', borderTop: '4px solid var(--color-danger)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-lg)' }}>
            <div style={{ width: '32px', height: '32px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-danger)' }}>
              <Download size={18} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>Data & Compliance Logs</h3>
          </div>
          
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)' }}>
            Download complete audit logs of all anomalies, GPS overrides, and system access history. This action is recorded in the immutable compliance ledger.
          </p>
          
          <button type="button" className="btn btn-danger" onClick={() => alert('Preparing secure audit log export...')}>
            <Download size={16} />
            Export Audit Logs (PDF)
          </button>
        </div>
      </div>
    </div>
  );
}
