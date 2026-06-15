import { useState } from 'react';

export default function ConsentRequest() {
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);

  const handleRequest = (e) => {
    e.preventDefault();
    if (phone.length >= 10) {
      // In a real app we'd insert a record into consent_requests
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setPhone('');
      }, 3000);
    }
  };

  return (
    <div className="card fade-in" style={{ maxWidth: '600px' }}>
      <h3 style={{ marginBottom: '0.5rem' }}>Request Worker Consent</h3>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Enter a worker's phone number or KAAM ID to request access to their verified profile.
      </p>

      {sent ? (
        <div style={{ padding: '1rem', backgroundColor: 'rgba(34, 197, 94, 0.1)', color: 'var(--color-success)', borderRadius: 'var(--radius-md)', fontWeight: 'bold' }}>
          Consent request sent to worker's KAAM Pass!
        </div>
      ) : (
        <form onSubmit={handleRequest}>
          <div className="form-group">
            <label className="form-label">Worker Phone Number</label>
            <input 
              type="tel" 
              className="input-field" 
              placeholder="e.g. 9876543210" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Send Request</button>
        </form>
      )}
    </div>
  );
}
