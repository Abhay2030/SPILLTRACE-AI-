export const SPILL_LAYER = {
  id: 'spill-layer',
  type: 'fill',
  paint: {
    'fill-color': '#1a1a1a',
    'fill-opacity': 0.8,
    'fill-outline-color': '#06B6D4'
  }
};

export const ORIGIN_ZONE_LAYER = {
  id: 'origin-zone-layer',
  type: 'heatmap',
  paint: {
    'heatmap-weight': 1,
    'heatmap-intensity': 1,
    'heatmap-color': [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0, 'rgba(0,0,0,0)',
      0.2, '#0ea5e9',
      0.5, '#8b5cf6',
      0.8, '#d946ef',
      1, '#f43f5e'
    ],
    'heatmap-radius': 30,
    'heatmap-opacity': 0.7
  }
};

export const DRIFT_PATH_LAYER = {
  id: 'drift-path-layer',
  type: 'line',
  paint: {
    'line-color': '#06B6D4',
    'line-width': 2,
    'line-dasharray': [2, 2]
  }
};

export const AIS_TRACK_LAYER = {
  id: 'ais-track-layer',
  type: 'line',
  paint: {
    'line-color': '#D97706',
    'line-width': 1.5,
    'line-opacity': 0.8
  }
};

export const THREAT_ZONE_LAYER = {
  id: 'threat-zone-layer',
  type: 'fill',
  paint: {
    'fill-color': '#DC2626',
    'fill-opacity': 0.3,
    'fill-outline-color': '#DC2626'
  }
};

export const PROTECTED_AREA_LAYER = {
  id: 'protected-area-layer',
  type: 'fill',
  paint: {
    'fill-color': '#059669',
    'fill-opacity': 0.2,
    'fill-outline-color': '#059669'
  }
};

export const RESPONSE_ASSET_LAYER = {
  id: 'response-asset-layer',
  type: 'circle',
  paint: {
    'circle-color': '#38BDF8',
    'circle-radius': 6,
    'circle-stroke-width': 2,
    'circle-stroke-color': '#ffffff'
  }
};
