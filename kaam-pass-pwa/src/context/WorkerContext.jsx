import { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import localforage from 'localforage';

const WorkerContext = createContext();

export function WorkerProvider({ children }) {
  const [profile, setProfile] = useState({
    id: null,
    name: '',
    phone: '',
    kaamCreditScore: 0,
    isVerified: false,
    earnedThisMonth: 0,
    daysLogged: 0,
    bloodGroup: 'O+',
    emergencyContact: '+919988776655'
  });

  useEffect(() => {
    localforage.getItem('kaam_worker_profile').then(cachedProfile => {
      if (cachedProfile) {
        setProfile(cachedProfile);
      }
    });
  }, []);

  useEffect(() => {
    async function loadProfile() {
      if (!profile.id) return;
      
      const { data, error } = await supabase
        .from('workers')
        .select('*')
        .eq('id', profile.id)
        .single();
      
      if (data && !error) {
        setProfile(prev => {
          const updated = {
            ...prev,
            name: data.name,
            phone: data.phone
          };
          localforage.setItem('kaam_worker_profile', updated);
          return updated;
        });
      }
    }
    loadProfile();
  }, [profile.id]);

  const updateProfile = (updates) => {
    setProfile(prev => {
      const updated = { ...prev, ...updates };
      localforage.setItem('kaam_worker_profile', updated);
      return updated;
    });
  };

  return (
    <WorkerContext.Provider value={{ profile, updateProfile }}>
      {children}
    </WorkerContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWorker() {
  return useContext(WorkerContext);
}
