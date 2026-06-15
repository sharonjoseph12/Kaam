import { QRCodeCanvas } from 'qrcode.react';

export default function SiteQR({ site }) {
  if (!site) return null;
  
  const qrData = JSON.stringify({ site_id: site.id, name: site.name });
  
  return (
    <div className="card fade-in" style={{ textAlign: 'center' }}>
      <h3>{site.name} QR Code</h3>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Workers can scan this to mark attendance.</p>
      <div style={{ background: 'white', padding: '1rem', display: 'inline-block', borderRadius: '8px' }}>
        <QRCodeCanvas value={qrData} size={200} />
      </div>
    </div>
  );
}
