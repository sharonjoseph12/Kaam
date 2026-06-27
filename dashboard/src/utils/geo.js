// Haversine formula to calculate distance between two coordinates in meters
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth radius in meters
  const radLat1 = (Math.PI * lat1) / 180;
  const radLat2 = (Math.PI * lat2) / 180;
  const radTheta = (Math.PI * (lon1 - lon2)) / 180;
  const a = Math.sin((radLat2 - radLat1) / 2) * Math.sin((radLat2 - radLat1) / 2) +
            Math.cos(radLat1) * Math.cos(radLat2) *
            Math.sin(radTheta / 2) * Math.sin(radTheta / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function verifyLocation(contractorLat, contractorLon, siteLat, siteLon, radiusMeters = 200) {
  const distance = getDistance(contractorLat, contractorLon, siteLat, siteLon);
  return {
    verified: distance <= radiusMeters,
    distance,
    trustLevel: distance <= radiusMeters ? 2 : 1
  };
}
