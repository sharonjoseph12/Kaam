import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { useAuth } from './AuthContext';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import ContractorDashboard from './pages/ContractorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminSettings from './pages/AdminSettings';
import LenderDashboard from './pages/LenderDashboard';

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}`} replace />;
  }
  return children;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to={`/${user.role}`} replace /> : <LoginPage />} />

      {/* Contractor */}
      <Route path="/contractor" element={<ProtectedRoute allowedRoles={['contractor']}><ContractorDashboard /></ProtectedRoute>} />
      <Route path="/contractor/*" element={<ProtectedRoute allowedRoles={['contractor']}><ContractorDashboard /></ProtectedRoute>} />

      {/* Admin */}
      <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={['admin']}><AdminSettings /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/*" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />

      {/* Lender */}
      <Route path="/lender" element={<ProtectedRoute allowedRoles={['lender']}><LenderDashboard /></ProtectedRoute>} />
      <Route path="/lender/*" element={<ProtectedRoute allowedRoles={['lender']}><LenderDashboard /></ProtectedRoute>} />

      {/* Default */}
      <Route path="*" element={<Navigate to={user ? `/${user.role}` : '/login'} replace />} />
    </Routes>
  );
}

function AppLayout() {
  const { user } = useAuth();

  if (!user) {
    return <AppRoutes />;
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-main">
        <AppRoutes />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}
