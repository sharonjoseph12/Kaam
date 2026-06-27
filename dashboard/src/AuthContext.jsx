/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

const ROLES = {
  builder: { label: 'Builder', color: '#4f46e5' },
  inspector: { label: 'Labour Inspector', color: '#06b6d4' },
  admin: { label: 'KAAM Admin', color: '#f59e0b' },
};

const DEMO_USERS = {
  builder: { name: 'Arun Shetty', email: 'arun@shettybuilders.com' },
  inspector: { name: 'Kavitha Rao', email: 'kavitha.rao@karnataka.gov.in' },
  admin: { name: 'Priya Nair', email: 'priya@kaamfinance.com' },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('kaam_user');
    return saved ? JSON.parse(saved) : null;
  });

  // fallow-ignore-next-line complexity
  const login = useCallback((role, name, email) => {
    const u = {
      role,
      name: name || DEMO_USERS[role]?.name || 'Demo User',
      email: email || DEMO_USERS[role]?.email || 'demo@kaam.com',
      ...ROLES[role],
    };
    localStorage.setItem('kaam_user', JSON.stringify(u));
    setUser(u);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('kaam_user');
    localStorage.removeItem('kaam_token');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, ROLES }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
