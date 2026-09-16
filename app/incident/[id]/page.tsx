import { Metadata } from 'next';
import { DataModeIndicator } from '@/components/ui/DataModeIndicator';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ConfidenceBar } from '@/components/ui/ConfidenceBar';
import { DEMO_INCIDENT } from '@/data/demo-incident';
import { DEMO_VESSELS } from '@/data/demo-vessels';
import { formatTimestamp, formatArea, cn } from '@/lib/utils';
import { Download, MapPin, Compass, ArrowRight, ShieldCheck, AlertTriangle, Layers, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Incident Dossier | SpillTrace AI',
};

export default async function IncidentPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id || 'ST-2026-0042';
  const incident = DEMO_INCIDENT;

  const area = incident.spillCharacterization?.areaKm2 ?? 18.4;
  const confidence = incident.spillCharacterization?.oilProbability ?? 0.942;
  const origin = incident.driftForecast?.originZone;
  const evidence = incident.evidenceChain?.distribution;

  return (
    <div className="min-h-screen bg-surface pt-24 pb-16 px-6 lg:px-12 max-w-7xl mx-auto space-y-8">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ink-tertiary/15 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-ink-primary">
              Incident Case #{id}
            </h1>
            <StatusBadge variant="critical" status="ACTIVE INVESTIGATION" />
          </div>
          <p className="text-ink-secondary flex items-center gap-2 font-mono text-xs">
            <span>Detected: {formatTimestamp(incident.detectedAt)}</span>
            <span>·</span>
            <span>Sector: {incident.region} (15.34°N, 72.11°E)</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/investigate"
            className="px-4 py-2 bg-ocean hover:bg-ocean/90 text-white rounded-xl font-mono text-xs font-bold tracking-wider transition-colors flex items-center gap-2 shadow-sm"
          >
            OPEN IN WORKSTATION <ArrowRight className="w-4 h-4" />
          </Link>
          <DataModeIndicator mode="DEMO" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (4 cols): Sensor Metadata & Threat */}
        <div className="lg:col-span-4 space-y-6">
          {/* Spatial Coordinate Card */}
          <div className="bg-white rounded-2xl border border-ink-tertiary/20 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-ink-tertiary uppercase tracking-wider">
                PRIMARY DETECTION COORDINATE
              </span>
              <MapPin className="w-4 h-4 text-ocean" />
            </div>

            <div className="font-mono text-2xl font-bold text-ink-primary bg-surface-subtle p-3 rounded-xl border border-ink-tertiary/15">
              15.342°N, 72.115°E
            </div>

            <div className="text-xs font-mono text-ink-secondary space-y-1 pt-1">
              <div className="flex justify-between">
                <span className="text-ink-tertiary">Sensor Swath:</span>
                <span className="font-bold text-ink-primary">Sentinel-1A (C-SAR)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-tertiary">Pixel Resolution:</span>
                <span className="font-bold text-ink-primary">10 meters / pixel</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-tertiary">Polarization:</span>
                <span className="font-bold text-ink-primary">VV + VH Dual-Pol</span>
              </div>
            </div>
          </div>

          {/* Spill Morphometry */}
          <div className="bg-white rounded-2xl border border-ink-tertiary/20 p-6 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-base text-ink-primary">
              Spill Morphometry & Bonn Class
            </h3>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-ink-secondary">Surface Area:</span>
                <span className="font-bold text-ink-primary">{formatArea(area)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-secondary">Estimated Discharge Age:</span>
                <span className="font-bold text-ink-primary">12–20 Hours Ago</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-secondary">Bonn Classification:</span>
                <span className="font-bold text-ocean">Code 4/5 (Emulsified)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-secondary">Estimated Minimum Volume:</span>
                <span className="font-bold text-ink-primary">142 MT (~165,000 L)</span>
              </div>

              <div className="pt-2 border-t border-ink-tertiary/10 space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-ink-tertiary">Hydrocarbon Probability</span>
                  <span className="font-bold text-verified">94.2%</span>
                </div>
                <ConfidenceBar value={confidence} />
              </div>
            </div>
          </div>

          {/* Threat Assessment */}
          <div className="bg-white rounded-2xl border border-ink-tertiary/20 p-6 shadow-sm space-y-3">
            <h3 className="font-display font-bold text-base text-ink-primary">
              Threat Summary
            </h3>

            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between items-center">
                <span className="text-ink-secondary">Ecological Risk:</span>
                <StatusBadge variant="critical" status="TIER 1 (HIGH)" size="sm" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-ink-secondary">Netrani Marine Sanctuary:</span>
                <span className="font-bold text-ink-primary">42 km ENE</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-ink-secondary">Shoreline Beaching Risk:</span>
                <StatusBadge variant="verified" status="LOW (< 1.8%)" size="sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (8 cols): Candidate Vessels & Forensic Chains */}
        <div className="lg:col-span-8 space-y-6">
          {/* Candidate Vessels Table */}
          <div className="bg-white rounded-2xl border border-ink-tertiary/20 shadow-sm overflow-hidden">
            <div className="p-4 bg-surface-subtle border-b border-ink-tertiary/10 flex items-center justify-between font-mono text-xs">
              <span className="font-bold text-ink-primary">CORRELATED VESSEL CANDIDATES</span>
              <span className="text-ink-tertiary">3 Vessels under review</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-surface border-b border-ink-tertiary/10 text-ink-tertiary uppercase">
                  <tr>
                    <th className="p-3.5">Candidate Vessel</th>
                    <th className="p-3.5">Flag & Type</th>
                    <th className="p-3.5">Closest Approach</th>
                    <th className="p-3.5">Attribution Score</th>
                    <th className="p-3.5 text-right">Dossier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-tertiary/10">
                  {DEMO_VESSELS.map((candidate: any, idx: number) => (
                    <tr key={candidate.id} className="hover:bg-surface-subtle/50 transition-colors">
                      <td className="p-3.5">
                        <Link
                          href={`/vessel/${candidate.id}`}
                          className="font-bold text-ink-primary hover:text-ocean flex items-center gap-1.5"
                        >
                          {candidate.name}
                          {idx === 0 && <span className="w-2 h-2 rounded-full bg-critical" />}
                        </Link>
                        <span className="text-[10px] text-ink-tertiary block">IMO {candidate.imo}</span>
                      </td>
                      <td className="p-3.5 text-ink-secondary">
                        {candidate.flag} · {candidate.type}
                      </td>
                      <td className="p-3.5 text-ink-secondary">
                        {idx === 0 ? '1.2 km (Centroid)' : idx === 1 ? '8.2 km' : '14.5 km'}
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-2">
                          <span className={cn("font-bold", idx === 0 ? "text-critical" : "text-ink-secondary")}>
                            {candidate.evidenceScore.toFixed(1)}%
                          </span>
                          <div className="w-16">
                            <ConfidenceBar value={candidate.evidenceScore / 100} />
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5 text-right">
                        <Link
                          href={`/vessel/${candidate.id}`}
                          className="text-ocean hover:text-ocean/80 font-bold inline-flex items-center gap-1"
                        >
                          VIEW <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Evidence Distribution & Origin Backtrack Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Evidence Findings */}
            <div className="bg-white rounded-2xl border border-ink-tertiary/20 p-6 shadow-sm space-y-4">
              <h3 className="font-display font-bold text-base text-ink-primary">
                Evidence Synthesis Distribution
              </h3>

              <div className="space-y-2.5 font-mono text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-verified/10 text-verified font-bold">
                  <span>Corroborating Evidence Points</span>
                  <span>{evidence?.supporting ?? 7}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-critical/10 text-critical font-bold">
                  <span>Critical Transponder Anomaly</span>
                  <span>{evidence?.contradicting ?? 1}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-ink-primary/5 text-ink-secondary">
                  <span>Neutral Background Signals</span>
                  <span>{evidence?.neutral ?? 2}</span>
                </div>
              </div>
            </div>

            {/* Backtrack Probable Origin */}
            <div className="bg-white rounded-2xl border border-ink-tertiary/20 p-6 shadow-sm space-y-4">
              <h3 className="font-display font-bold text-base text-ink-primary">
                Origin Backtrack Coordinates
              </h3>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between border-b border-ink-tertiary/10 pb-2">
                  <span className="text-ink-secondary">Origin Centroid:</span>
                  <span className="font-bold text-ink-primary">
                    {origin ? `${origin.centerLat.toFixed(3)}°N, ${origin.centerLng.toFixed(3)}°E` : '15.281°N, 72.048°E'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-ink-tertiary/10 pb-2">
                  <span className="text-ink-secondary">Bayesian Uncertainty Radius:</span>
                  <span className="font-bold text-ink-primary">±{origin?.uncertaintyKm ?? 6.4} km</span>
                </div>
                <div className="flex justify-between border-b border-ink-tertiary/10 pb-2">
                  <span className="text-ink-secondary">Backtrack Confidence:</span>
                  <span className="font-bold text-marine">{((origin?.confidence ?? 0.78) * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-ink-secondary">Ocean Current Forcing:</span>
                  <span className="font-bold text-ink-primary">INCOIS 0.38 m/s @ 045°</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
