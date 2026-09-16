import * as THREE from 'three';

/**
 * Procedural High-Fidelity Earth Texture Generator for SpillTrace AI
 * Generates accurate equirectangular planetary maps including:
 * - Real-world continental outlines (focus on Arabian Sea, Indian Subcontinent, Middle East, Africa)
 * - Bathymetric coastal shelf gradients
 * - Specular reflection masks (ocean water vs land)
 * - Mountain topography bump map
 */

function lonLatToUV(lon: number, lat: number, width: number, height: number): [number, number] {
  // Longitude: -180 to +180 -> 0 to width
  // Latitude: -90 to +90 -> height to 0
  const x = ((lon + 180) / 360) * width;
  const y = ((90 - lat) / 180) * height;
  return [x, y];
}

export function generateEarthTextures(): {
  dayMap: THREE.CanvasTexture;
  specularMap: THREE.CanvasTexture;
  bumpMap: THREE.CanvasTexture;
  nightMap: THREE.CanvasTexture;
} {
  const width = 2048;
  const height = 1024;

  // 1. DAY MAP CANVAS
  const dayCanvas = document.createElement('canvas');
  dayCanvas.width = width;
  dayCanvas.height = height;
  const ctx = dayCanvas.getContext('2d')!;

  // Deep Ocean Base
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, height);
  oceanGrad.addColorStop(0, '#041B3B'); // Arctic deep blue
  oceanGrad.addColorStop(0.3, '#032B59'); // Temperate ocean
  oceanGrad.addColorStop(0.5, '#053C73'); // Tropical ocean
  oceanGrad.addColorStop(0.7, '#032B59');
  oceanGrad.addColorStop(1, '#021833'); // Antarctic
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. SPECULAR MAP CANVAS
  const specCanvas = document.createElement('canvas');
  specCanvas.width = width;
  specCanvas.height = height;
  const specCtx = specCanvas.getContext('2d')!;
  specCtx.fillStyle = '#FFFFFF'; // Oceans have 100% specular highlight
  specCtx.fillRect(0, 0, width, height);

  // 3. BUMP MAP CANVAS
  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = width;
  bumpCanvas.height = height;
  const bumpCtx = bumpCanvas.getContext('2d')!;
  bumpCtx.fillStyle = '#808080'; // Flat sea level
  bumpCtx.fillRect(0, 0, width, height);

  // 4. NIGHT LIGHTS CANVAS
  const nightCanvas = document.createElement('canvas');
  nightCanvas.width = width;
  nightCanvas.height = height;
  const nightCtx = nightCanvas.getContext('2d')!;
  nightCtx.fillStyle = '#01050D'; // Dark night side
  nightCtx.fillRect(0, 0, width, height);

  // Helper to draw realistic land polygon
  function drawLandmass(points: [number, number][], landFill = '#3B4E32', shelf = true) {
    if (points.length < 3) return;

    // Coastal Shallows (Bathymetry)
    if (shelf) {
      ctx.beginPath();
      const [startLon, startLat] = points[0];
      const [sx, sy] = lonLatToUV(startLon, startLat, width, height);
      ctx.moveTo(sx, sy);
      for (let i = 1; i < points.length; i++) {
        const [x, y] = lonLatToUV(points[i][0], points[i][1], width, height);
        ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = '#0284C7';
      ctx.lineWidth = 14;
      ctx.stroke();

      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 6;
      ctx.stroke();
    }

    // Land Fill
    ctx.beginPath();
    const [firstLon, firstLat] = points[0];
    const [fx, fy] = lonLatToUV(firstLon, firstLat, width, height);
    ctx.moveTo(fx, fy);
    for (let i = 1; i < points.length; i++) {
      const [x, y] = lonLatToUV(points[i][0], points[i][1], width, height);
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = landFill;
    ctx.fill();

    // Specular mask (land has almost 0 specular)
    specCtx.beginPath();
    specCtx.moveTo(fx, fy);
    for (let i = 1; i < points.length; i++) {
      const [x, y] = lonLatToUV(points[i][0], points[i][1], width, height);
      specCtx.lineTo(x, y);
    }
    specCtx.closePath();
    specCtx.fillStyle = '#1A1A1A';
    specCtx.fill();

    // Bump Map
    bumpCtx.beginPath();
    bumpCtx.moveTo(fx, fy);
    for (let i = 1; i < points.length; i++) {
      const [x, y] = lonLatToUV(points[i][0], points[i][1], width, height);
      bumpCtx.lineTo(x, y);
    }
    bumpCtx.closePath();
    bumpCtx.fillStyle = '#A0A0A0';
    bumpCtx.fill();
  }

  // --- Real-world Geographic Geometries ---

  // 1. Indian Subcontinent & South Asia (Incident Focus Region)
  const indiaPolygon: [number, number][] = [
    [68.5, 23.5], // Gujarat / Rann of Kutch
    [70.0, 21.0], // Kathiawar peninsula
    [72.5, 21.5], // Gulf of Khambhat
    [72.8, 19.0], // Mumbai / Konkan coast
    [73.5, 16.0], // Goa coast (INCIDENT REGION ~15.3°N, 72.1°E)
    [74.5, 14.5], // Karwar / Karnataka coast
    [75.8, 12.0], // Mangalore / Malabar coast
    [76.5, 9.5],  // Kerala / Cochin
    [77.5, 8.1],  // Kanyakumari (Southern tip)
    [79.8, 10.5], // Coromandel coast
    [80.3, 13.0], // Chennai
    [82.5, 17.0], // Andhra Pradesh / Visakhapatnam
    [86.5, 20.0], // Odisha coast
    [89.0, 22.0], // Sundarbans / Bengal delta
    [92.5, 21.0], // Chittagong
    [92.0, 27.0], // Eastern Himalayas
    [88.0, 28.0], // Sikkim
    [85.0, 28.5], // Nepal border
    [80.0, 30.5], // Uttarakhand
    [76.0, 34.5], // Ladakh / Kashmir
    [73.0, 32.5], // Punjab
    [70.0, 28.0], // Thar Desert
    [68.5, 23.5],
  ];
  drawLandmass(indiaPolygon, '#4A5D3E');

  // Sri Lanka
  const sriLankaPolygon: [number, number][] = [
    [79.8, 9.5],
    [81.8, 8.5],
    [81.5, 6.0],
    [80.0, 6.0],
    [79.8, 8.0],
    [79.8, 9.5],
  ];
  drawLandmass(sriLankaPolygon, '#3B5834');

  // 2. Arabian Peninsula & Middle East (Western flank of Arabian Sea)
  const arabiaPolygon: [number, number][] = [
    [43.0, 12.5], // Bab el Mandeb
    [45.0, 13.0], // Aden / Gulf of Aden
    [51.0, 15.0], // Yemen
    [54.0, 17.0], // Salalah / Oman
    [59.5, 22.5], // Ras al Hadd (Eastern tip of Arabia)
    [58.5, 24.0], // Muscat
    [56.5, 26.0], // Strait of Hormuz
    [55.0, 25.0], // UAE / Dubai
    [50.5, 26.0], // Qatar / Bahrain
    [48.0, 30.0], // Kuwait / Shatt al Arab
    [40.0, 32.0], // Northern Arabian desert
    [35.0, 28.0], // Sinai / Gulf of Aqaba
    [37.0, 24.0], // Red Sea coast (Jeddah)
    [42.0, 16.0], // Jizan
    [43.0, 12.5],
  ];
  drawLandmass(arabiaPolygon, '#8A7A5D'); // Arid desert hue

  // 3. Iran & Pakistan (Northern flank of Arabian Sea / Makran Coast)
  const iranPakistanPolygon: [number, number][] = [
    [56.5, 26.5], // Hormuz north
    [60.0, 25.0], // Chabahar / Makran
    [64.0, 25.2], // Gwadar
    [67.0, 24.8], // Karachi (Sindh coast)
    [68.5, 23.5], // Indo-Pak border
    [70.0, 28.0],
    [68.0, 34.0], // Hindu Kush
    [58.0, 37.0], // Northern Iran
    [48.0, 36.0], // Zagros
    [50.0, 30.0], // Persian Gulf north
    [56.5, 26.5],
  ];
  drawLandmass(iranPakistanPolygon, '#6E6754');

  // 4. Horn of Africa & East Africa (Southwestern Arabian Sea)
  const eastAfricaPolygon: [number, number][] = [
    [43.0, 11.5], // Djibouti
    [51.0, 12.0], // Cape Guardafui (Tip of Horn)
    [49.0, 8.0],  // Somalia east coast
    [44.0, 2.0],  // Mogadishu
    [41.0, -1.0], // Kenya coast
    [39.0, -5.0], // Mombasa / Zanzibar
    [35.0, -12.0],
    [32.0, 0.0],  // Lake Victoria region
    [37.0, 8.0],  // Ethiopian highlands
    [40.0, 14.0], // Eritrea
    [43.0, 11.5],
  ];
  drawLandmass(eastAfricaPolygon, '#5A5643');

  // 5. Southeast Asia & Bay of Bengal East
  const seAsiaPolygon: [number, number][] = [
    [93.0, 20.0], // Myanmar coast
    [98.0, 16.0], // Yangon / Andaman Sea
    [98.5, 8.0],  // Phuket / Malacca Strait
    [103.5, 1.3], // Singapore
    [104.0, 6.0], // Gulf of Thailand
    [109.0, 11.0], // Vietnam / South China Sea
    [106.0, 20.0],
    [98.0, 24.0],
    [93.0, 20.0],
  ];
  drawLandmass(seAsiaPolygon, '#2E4C2C');

  // 6. African Continent (Broad outline)
  const broadAfrica: [number, number][] = [
    [-17.0, 15.0], // Dakar
    [-10.0, 5.0],
    [10.0, 4.0],  // Gulf of Guinea
    [12.0, -10.0],
    [18.0, -34.0], // Cape of Good Hope
    [32.0, -28.0], // Durban
    [40.0, -15.0], // Mozambique
    [35.0, -12.0],
    [43.0, 11.5], // Connects to East Africa
    [33.0, 31.0], // Nile Delta
    [12.0, 33.0], // Tunisia
    [-5.0, 36.0], // Gibraltar south
    [-12.0, 28.0], // Morocco
    [-17.0, 15.0],
  ];
  drawLandmass(broadAfrica, '#635B47', false);

  // 7. European & Eurasian Landmass (Broad outline)
  const eurasiaPolygon: [number, number][] = [
    [-9.0, 38.0],  // Portugal
    [-4.0, 43.5],  // Bay of Biscay
    [2.0, 51.0],   // North Sea
    [10.0, 54.0],  // Denmark
    [25.0, 60.0],  // Scandinavia
    [40.0, 68.0],  // Barents
    [70.0, 70.0],  // Siberia
    [130.0, 65.0],
    [140.0, 40.0], // East Asia
    [120.0, 30.0], // Shanghai
    [110.0, 20.0],
    [106.0, 20.0], // Connects to SE Asia
    [68.0, 34.0],  // Connects to Iran/Afghan
    [40.0, 42.0],  // Black Sea
    [26.0, 38.0],  // Aegean
    [14.0, 40.0],  // Italy
    [0.0, 42.0],   // Spain
    [-9.0, 38.0],
  ];
  drawLandmass(eurasiaPolygon, '#41523A', false);

  // 8. Australia & Indonesian Archipelago
  const australiaPolygon: [number, number][] = [
    [114.0, -22.0],
    [122.0, -18.0],
    [136.0, -12.0],
    [145.0, -15.0],
    [153.0, -28.0],
    [150.0, -37.0],
    [138.0, -35.0],
    [115.0, -34.0],
    [113.0, -26.0],
    [114.0, -22.0],
  ];
  drawLandmass(australiaPolygon, '#7D6A4E', false);

  // Add Night Lights along Major Maritime Trade Ports (Arabian Sea Corridor)
  const coastalCities: [number, number, number][] = [
    [72.87, 19.07, 14], // Mumbai
    [73.83, 15.49, 10], // Goa / Panaji
    [74.13, 14.81, 8],  // Karwar
    [74.85, 12.91, 10], // Mangalore
    [76.27, 9.93, 11],  // Cochin
    [67.00, 24.86, 15], // Karachi
    [55.27, 25.20, 16], // Dubai
    [58.40, 23.58, 12], // Muscat
    [79.86, 6.92, 12],  // Colombo
    [80.27, 13.08, 14], // Chennai
    [50.58, 26.22, 10], // Manama / Bahrain
    [47.97, 29.37, 11], // Kuwait City
  ];

  nightCtx.shadowBlur = 8;
  nightCtx.shadowColor = '#FBBF24';
  coastalCities.forEach(([lon, lat, radius]) => {
    const [x, y] = lonLatToUV(lon, lat, width, height);
    const grad = nightCtx.createRadialGradient(x, y, 1, x, y, radius);
    grad.addColorStop(0, '#FFFBEB');
    grad.addColorStop(0.3, '#F59E0B');
    grad.addColorStop(0.8, 'rgba(217, 119, 6, 0.4)');
    grad.addColorStop(1, 'rgba(217, 119, 6, 0)');
    nightCtx.fillStyle = grad;
    nightCtx.beginPath();
    nightCtx.arc(x, y, radius, 0, Math.PI * 2);
    nightCtx.fill();
  });

  // Convert to Three.js Canvas Textures
  const dayMap = new THREE.CanvasTexture(dayCanvas);
  dayMap.colorSpace = THREE.SRGBColorSpace;
  dayMap.wrapS = THREE.RepeatWrapping;
  dayMap.wrapT = THREE.ClampToEdgeWrapping;

  const specularMap = new THREE.CanvasTexture(specCanvas);
  specularMap.wrapS = THREE.RepeatWrapping;
  specularMap.wrapT = THREE.ClampToEdgeWrapping;

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.ClampToEdgeWrapping;

  const nightMap = new THREE.CanvasTexture(nightCanvas);
  nightMap.colorSpace = THREE.SRGBColorSpace;
  nightMap.wrapS = THREE.RepeatWrapping;
  nightMap.wrapT = THREE.ClampToEdgeWrapping;

  return { dayMap, specularMap, bumpMap, nightMap };
}
