import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { lazy, Suspense, useState } from 'react';
import { WorkerProvider, useWorker } from './context/WorkerContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AnimatePresence, motion } from 'framer-motion';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));
const SafeLoan = lazy(() => import('./pages/SafeLoan'));
const Documents = lazy(() => import('./pages/Documents'));
const Verify = lazy(() => import('./pages/Verify'));

function AuthGuard({ children }) {
  const { profile } = useWorker();
  if (!profile.id) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function Layout({ children }) {
  const { lang, setLang } = useLanguage();
  const [pushEnabled, setPushEnabled] = useState(Notification.permission === 'granted');

  const enablePush = async () => {
    try {
      const permission = await Notification.requestPermission();
      setPushEnabled(permission === 'granted');
      
      if (permission === 'granted') {
        new Notification('KAAM Pass', {
          body: 'You will now receive instant alerts for loan requests and disputes.',
          icon: '/pwa-192x192.png'
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900 pb-20">
      <header className="bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">K</div>
          <h1 className="font-bold text-xl">KAAM Pass</h1>
        </div>
        <div className="flex items-center gap-3">
          {!pushEnabled && (
            <button 
              onClick={enablePush}
              className="text-gray-400 hover:text-blue-600 relative animate-pulse"
              title="Enable Notifications"
            >
              <span className="text-xl">🔔</span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          )}
          <button 
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            className="border rounded px-2 py-1 text-xs font-bold bg-gray-50 hover:bg-gray-200"
          >
            {lang === 'en' ? 'A/अ' : 'अ/A'}
          </button>
        </div>
      </header>
      <main className="p-4 max-w-md mx-auto">
        {children}
      </main>
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around p-3 pb-safe max-w-md left-1/2 -translate-x-1/2">
        <Link to="/" className="flex flex-col items-center text-gray-500 hover:text-blue-600">
          <span className="text-xl">🏠</span>
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/docs" className="flex flex-col items-center text-gray-500 hover:text-blue-600">
          <span className="text-xl">📄</span>
          <span className="text-xs mt-1">Vault</span>
        </Link>
      </nav>
    </div>
  );
}

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500 animate-pulse">Loading...</div>}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/verify/:hash" element={<PageTransition><Verify /></PageTransition>} />
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/" element={<AuthGuard><PageTransition><Dashboard /></PageTransition></AuthGuard>} />
          <Route path="/loan" element={<AuthGuard><PageTransition><SafeLoan /></PageTransition></AuthGuard>} />
          <Route path="/docs" element={<AuthGuard><PageTransition><Documents /></PageTransition></AuthGuard>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <WorkerProvider>
        <BrowserRouter>
          <Layout>
            <AnimatedRoutes />
          </Layout>
        </BrowserRouter>
      </WorkerProvider>
    </LanguageProvider>
  );
}
