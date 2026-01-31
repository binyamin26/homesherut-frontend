// fetchNeighborhoods.mjs
// Exécute avec: node fetchNeighborhoods.mjs

const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';

const query = `
[out:json][timeout:120];
area["ISO3166-1"="IL"]->.israel;
(
  node["place"="neighbourhood"](area.israel);
  node["place"="suburb"](area.israel);
  node["place"="quarter"](area.israel);
  way["place"="neighbourhood"](area.israel);
  way["place"="suburb"](area.israel);
  relation["place"="neighbourhood"](area.israel);
);
out center tags;
`;

async function fetchNeighborhoods() {
  console.log('🔍 Fetching neighborhoods from OpenStreetMap...');
  
  const response = await fetch(OVERPASS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `data=${encodeURIComponent(query)}`,
  });

  const data = await response.json();
  console.log(`✅ Found ${data.elements.length} elements`);
  
  // Grouper par ville
  const byCity = {};
  data.elements.forEach(el => {
    if (!el.tags) return;
    const name = el.tags['name:he'] || el.tags.name;
    const city = el.tags['is_in:city'] || el.tags['addr:city'] || 'Unknown';
    if (!name) return;
    if (!byCity[city]) byCity[city] = [];
    if (!byCity[city].includes(name)) byCity[city].push(name);
  });

  // Afficher les résultats
  const fs = await import('fs');
  fs.writeFileSync('neighborhoods.json', JSON.stringify(byCity, null, 2));
  console.log('💾 Saved to neighborhoods.json');
  
  // Stats
  Object.entries(byCity)
    .sort((a, b) => b[1].length - a[1].length)
    .forEach(([city, hoods]) => console.log(`${city}: ${hoods.length}`));
}

fetchNeighborhoods();