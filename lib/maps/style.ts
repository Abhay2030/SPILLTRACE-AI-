export const MARITIME_MAP_STYLE = {
  version: 8,
  name: 'SpillTrace Maritime',
  sources: {
    basemap: {
      type: 'raster',
      tiles: ['https://demotiles.maplibre.org/tiles/{z}/{x}/{y}.png'],
      tileSize: 256
    }
  },
  layers: [
    {
      id: 'background',
      type: 'background',
      paint: {
        'background-color': '#0F172A'
      }
    },
    {
      id: 'basemap-layer',
      type: 'raster',
      source: 'basemap',
      paint: {
        'raster-opacity': 0.6,
        'raster-contrast': 0.2,
        'raster-saturation': -0.8
      }
    }
  ]
};

export function getMapStyle() {
  return MARITIME_MAP_STYLE;
}
