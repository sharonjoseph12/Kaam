import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorker } from '../context/WorkerContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { supabase } from '../lib/supabase';
import { Fingerprint } from 'lucide-react';

export default function Login() {
  const [phone, setPhone] = useState('+919876543210');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { updateProfile } = useWorker();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Production Hackathon Auth: We lookup the worker by phone.
      // In a real scenario, this would trigger an SMS OTP via Supabase Auth.
      const { data, error: dbError } = await supabase
        .from('workers')
        .select('id, name')
        .eq('phone', phone)
        .single();

      if (dbError || !data) {
        throw new Error('Worker not found. Check phone number.');
      }

      updateProfile({ id: data.id, name: data.name, phone: phone });
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBiometricLogin = async () => {
    try {
      if (!window.PublicKeyCredential) {
        throw new Error('Biometrics not supported on this browser');
      }

      setLoading(true);
      setError('');

      const challenge = new Uint8Array(32);
      crypto.getRandomValues(challenge);

      // Trigger the native OS biometric prompt (FaceID/Fingerprint)
      await navigator.credentials.create({
        publicKey: {
          challenge: challenge,
          rp: { name: "KAAM Pass", id: window.location.hostname },
          user: {
            id: new Uint8Array(16),
            name: phone,
            displayName: "Worker",
          },
          pubKeyCredParams: [{ type: "public-key", alg: -7 }],
          authenticatorSelection: {
            authenticatorAttachment: "platform", // Enforces device biometrics
            userVerification: "required"
          },
          timeout: 60000,
          attestation: "none"
        }
      });

      // Biometric success - proceed with login
      const { data, error: dbError } = await supabase
        .from('workers')
        .select('id, name')
        .eq('phone', phone)
        .single();

      if (dbError || !data) throw new Error('Worker not found.');

      updateProfile({ id: data.id, name: data.name, phone: phone });
      navigate('/');
    } catch (err) {
      if (err.name === 'NotAllowedError') {
        setError('Authentication was cancelled.');
      } else {
        setError(err.message || 'Biometric login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">K</div>
          <h2 className="text-2xl font-bold">Welcome to KAAM</h2>
          <p className="text-gray-500 text-sm mt-1">Enter your registered mobile number</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-bold text-gray-700 mb-1 block">Phone Number</label>
            <input 
              type="tel"
              className="w-full border rounded-lg p-3"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91..."
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
          <Button type="submit" variant="primary" className="bg-blue-600" disabled={loading}>
            {loading ? 'Verifying...' : 'Login via SMS'}
          </Button>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-bold uppercase">Or use</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <Button 
            type="button" 
            onClick={handleBiometricLogin}
            className="bg-gray-900 text-white flex items-center justify-center gap-2 hover:bg-gray-800" 
            disabled={loading}
          >
            <Fingerprint size={18} />
            Biometric Login
          </Button>
        </form>
      </Card>
    </div>
  );
}
