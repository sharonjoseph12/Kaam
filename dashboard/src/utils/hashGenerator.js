import CryptoJS from "crypto-js";

/**
 * Normalizes the wage slip data and generates a SHA-256 hash.
 * This guarantees any change to the wage slip produces a completely different hash.
 * @param {Object} data - Wage slip payload
 * @returns {string} SHA-256 Hash
 */
export const generateDocumentHash = (data) => {
  // Sort keys to ensure deterministic hashing
  const sortedData = Object.keys(data).sort().reduce((acc, key) => {
    acc[key] = data[key];
    return acc;
  }, {});

  const jsonString = JSON.stringify(sortedData);
  return CryptoJS.SHA256(jsonString).toString(CryptoJS.enc.Hex);
};
