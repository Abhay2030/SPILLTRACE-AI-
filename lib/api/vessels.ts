export interface Vessel {
  id: string;
  name: string;
  type: string;
  imo: string;
}

export interface VesselAPI {
  getVessel(id: string): Promise<Vessel>;
  listVessels(): Promise<Vessel[]>;
  getCandidates(incidentId: string): Promise<Vessel[]>;
  getAISTrack(vesselId: string): Promise<any>;
}

const MOCK_VESSEL: Vessel = {
  id: 'v-1234',
  name: 'Demo Tanker Alpha',
  type: 'Oil Tanker',
  imo: '9123456'
};

export const vesselAPI: VesselAPI = {
  async getVessel(id: string) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_VESSEL;
  },
  
  async listVessels() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [MOCK_VESSEL];
  },
  
  async getCandidates(incidentId: string) {
    await new Promise(resolve => setTimeout(resolve, 700));
    return [MOCK_VESSEL];
  },
  
  async getAISTrack(vesselId: string) {
    await new Promise(resolve => setTimeout(resolve, 400));
    return {
      type: 'FeatureCollection',
      features: []
    };
  }
};
