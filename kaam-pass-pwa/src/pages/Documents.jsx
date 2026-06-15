import { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { listSavedDocuments, saveDocument } from '../services/storage/documents';

export default function Documents() {
  const [docs, setDocs] = useState([
    { id: 'doc-aadhaar', title: 'Aadhaar Card', cached: false },
    { id: 'doc-wage', title: 'June Wage Slip', cached: false },
    { id: 'doc-letter', title: 'Appointment Letter', cached: false },
  ]);

  const checkCacheStatus = async () => {
    const savedKeys = await listSavedDocuments();
    setDocs(prev => prev.map(doc => ({
      ...doc,
      cached: savedKeys.includes(doc.id)
    })));
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    checkCacheStatus();
  }, []);

  const handleDownload = async (docId) => {
    // Mock downloading a blob
    const dummyBlob = new Blob(['Mock encrypted document data'], { type: 'text/plain' });
    await saveDocument(docId, dummyBlob);
    checkCacheStatus();
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-2">My Documents (Vault)</h2>
      <p className="text-sm text-gray-500 mb-4">Securely access your records even when offline.</p>
      
      {docs.map(doc => (
        <Card key={doc.id} className="flex justify-between items-center p-4">
          <div>
            <h3 className="font-bold">{doc.title}</h3>
            {doc.cached ? (
              <span className="text-xs text-green-600 font-bold mt-1 inline-block">✓ Available Offline</span>
            ) : (
              <span className="text-xs text-yellow-600 font-bold mt-1 inline-block">Cloud Only</span>
            )}
          </div>
          {doc.cached ? (
            <button className="bg-gray-200 text-gray-800 p-2 rounded-xl text-sm font-bold">View</button>
          ) : (
            <button 
              onClick={() => handleDownload(doc.id)} 
              className="bg-blue-100 text-blue-700 p-2 rounded-xl text-sm font-bold"
            >⬇️ Download</button>
          )}
        </Card>
      ))}
    </div>
  );
}
