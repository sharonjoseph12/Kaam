import localforage from 'localforage';

// Configure localforage to use IndexedDB
localforage.config({
  name: 'KAAM_Pass_Storage',
  storeName: 'documents',
  description: 'Stores encrypted blobs of documents for offline access'
});

export async function saveDocument(id, blobData) {
  try {
    await localforage.setItem(id, blobData);
    return true;
  } catch (err) {
    console.error('Error saving document offline:', err);
    return false;
  }
}



export async function listSavedDocuments() {
  try {
    const keys = await localforage.keys();
    return keys;
  } catch (err) {
    console.error('Error listing offline documents:', err);
    return [];
  }
}
