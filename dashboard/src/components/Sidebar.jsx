import { NavLink } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import {
  LayoutDashboard,
  Users,
  MapPin,
  AlertTriangle,
  FileText,
  Settings,
  LogOut,
  Building2,
  Scale,
  UserCog,
  ShieldAlert,
} from 'lucide-react';

const NAV_CONFIG = {
  builder: [
    { section: 'Dashboard' },
    { to: '/builder', icon: LayoutDashboard, label: 'Overview' },
    { to: '/builder/contractors', icon: Users, label: 'Sub-Contractors' },
    { to: '/builder/sites', icon: MapPin, label: 'Site Map' },
    { section: 'Compliance' },
    { to: '/builder/anomalies', icon: AlertTriangle, label: 'Anomaly Alerts' },
    { to: '/builder/mandates', icon: FileText, label: 'Mandates' },
  ],
  inspector: [
    { section: 'Dashboard' },
    { to: '/inspector', icon: LayoutDashboard, label: 'Overview' },
    { to: '/inspector/contractors', icon: Users, label: 'Contractors' },
    { to: '/inspector/sites', icon: MapPin, label: 'Jurisdiction Map' },
    { section: 'Enforcement' },
    { to: '/inspector/anomalies', icon: AlertTriangle, label: 'Anomalies' },
    { to: '/inspector/disputes', icon: Scale, label: 'Disputes' },
  ],
  admin: [
    { section: 'Dashboard' },
    { to: '/admin', icon: LayoutDashboard, label: 'Overview' },
    { to: '/admin/anomalies', icon: AlertTriangle, label: 'Anomaly Resolution' },
    { to: '/admin/contractors', icon: Building2, label: 'Contractors' },
    { section: 'Management' },
    { to: '/admin/gps-overrides', icon: MapPin, label: 'GPS Overrides' },
    { to: '/admin/users', icon: UserCog, label: 'User Management' },
    { to: '/admin/settings', icon: Settings, label: 'Settings' },
  ],
  lender: [
    { section: 'Dashboard' },
    { to: '/lender', icon: LayoutDashboard, label: 'Overview' },
    { to: '/lender/protection', icon: ShieldAlert, label: 'Protection Cases' },
  ],
};

export default function Sidebar() {
  const { user, logout } = useAuth();
  if (!user) return null;

  const links = NAV_CONFIG[user.role] || [];

  return (
    <aside className="sidebar" id="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-logo">K</div>
        <div className="sidebar-brand-text">
          <h1>KAAM</h1>
          <span>Compliance OS</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {links.map((item, i) =>
          item.section ? (
            <div className="sidebar-section-label" key={`s-${i}`}>
              {item.section}
            </div>
          ) : (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === `/${user.role}`}
              className={({ isActive }) =>
                `sidebar-link${isActive ? ' active' : ''}`
              }
            >
              <item.icon />
              <span>{item.label}</span>
            </NavLink>
          ),
        )}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{user.name}</div>
            <div className="sidebar-user-role">{user.label}</div>
          </div>
          <button
            className="btn-icon btn-outline"
            onClick={logout}
            title="Logout"
            id="btn-logout"
            style={{ marginLeft: 'auto' }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
