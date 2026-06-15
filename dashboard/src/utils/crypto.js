// crypto.js

// Function to generate a SHA-256 hash using the Web Crypto API
export async function generateHash(dataObject) {
  // Normalize the object: sort keys to ensure consistent hashing
  const sortedData = Object.keys(dataObject)
    .sort()
    .reduce((acc, key) => {
      acc[key] = dataObject[key];
      return acc;
    }, {});

  const jsonString = JSON.stringify(sortedData);
  const encoder = new TextEncoder();
  const data = encoder.encode(jsonString);

  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return hashHex;
}
