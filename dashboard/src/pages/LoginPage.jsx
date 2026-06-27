import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Building2, Shield, UserCog } from 'lucide-react';

// fallow-ignore-next-line complexity
export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState('builder');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    login(role);
    navigate(`/${role}`);
  };

  return (
    <div className="login-page">
      <div className="login-card fade-in">
        <div className="login-logo">
          <div className="login-logo-icon">K</div>
          <div>
            <h1>KAAM</h1>
            <span>Compliance Operating System</span>
          </div>
        </div>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleLogin}>
          <label className="form-label" style={{ marginBottom: 8 }}>
            Select your role
          </label>
          <div className="role-selector">
            <button
              type="button"
              className={`role-btn${role === 'builder' ? ' active' : ''}`}
              onClick={() => setRole('builder')}
              id="role-builder"
            >
              <Building2 />
              Builder
            </button>
            <button
              type="button"
              className={`role-btn${role === 'inspector' ? ' active' : ''}`}
              onClick={() => setRole('inspector')}
              id="role-inspector"
            >
              <Shield />
              Inspector
            </button>
            <button
              type="button"
              className={`role-btn${role === 'admin' ? ' active' : ''}`}
              onClick={() => setRole('admin')}
              id="role-admin"
            >
              <UserCog />
              Admin
            </button>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              className="form-input"
              id="email"
              type="email"
              placeholder="demo@kaamfinance.com"
              defaultValue=""
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              className="form-input"
              id="password"
              type="password"
              placeholder="••••••••"
              defaultValue=""
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            id="btn-login"
            style={{ width: '100%', marginTop: 8 }}
          >
            Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>

          <p
            style={{
              textAlign: 'center',
              marginTop: 16,
              fontSize: 12,
              color: 'var(--text-muted)',
            }}
          >
            Demo mode — credentials are optional
          </p>
        </form>
      </div>
    </div>
  );
}
