// Response scenarios and assets

export const DEMO_RESPONSE_ASSETS: any[] = [
  { id: 'AST-01', name: 'CGV Samarth', type: 'COAST_GUARD_VESSEL', lat: 15.35, lng: 73.00, status: 'EN_ROUTE' },
  { id: 'AST-02', name: 'Rapid Boom Deployer', type: 'OIL_BOOM', lat: 15.38, lng: 73.78, status: 'STANDBY' },
  { id: 'AST-03', name: 'SkimMaster I', type: 'SKIMMER', lat: 15.42, lng: 73.80, status: 'MAINTENANCE' },
  { id: 'AST-04', name: 'AeroEye-X', type: 'SURVEILLANCE_DRONE', lat: 15.40, lng: 73.81, status: 'DEPLOYED' },
  { id: 'AST-05', name: 'Buoy Network Alpha', type: 'MONITORING_BUOY', lat: 15.10, lng: 72.20, status: 'ACTIVE' },
  { id: 'AST-06', name: 'CG Heli 84', type: 'HELICOPTER', lat: 15.38, lng: 73.83, status: 'STANDBY' }
];

export const DEMO_RESPONSE_SCENARIOS: any[] = [
  {
    id: 'SCEN-01',
    name: 'Contain East',
    description: 'Deploy booms to the east of the spill to prevent drift towards coastline.',
    predictedOutcome: '78% containment rate, 12h execution time',
    assetsRequired: ['AST-01', 'AST-02', 'AST-04'],
    priority: 'HIGH'
  },
  {
    id: 'SCEN-02',
    name: 'Protect Coast',
    description: 'Establish primary defense line 50km from shoreline to protect sensitive zones.',
    predictedOutcome: '95% coastal protection, 24h execution time',
    assetsRequired: ['AST-01', 'AST-02', 'AST-03', 'AST-06'],
    priority: 'MEDIUM'
  },
  {
    id: 'SCEN-03',
    name: 'Intercept Drift',
    description: 'Aggressive interception at predicted T+12h location to neutralize slick.',
    predictedOutcome: '60% containment rate, 8h execution time',
    assetsRequired: ['AST-01', 'AST-03', 'AST-04', 'AST-06'],
    priority: 'LOW'
  }
];
