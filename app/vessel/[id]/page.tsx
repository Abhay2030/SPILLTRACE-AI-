import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { DataModeIndicator } from '@/components/ui/DataModeIndicator';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ConfidenceBar } from '@/components/ui/ConfidenceBar';
import { DEMO_VESSELS } from '@/data/demo-vessels';
import { Ship, AlertTriangle, ShieldCheck, ArrowLeft, ExternalLink, Navigation, Compass, Radio } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import AttributionExplainability from '@/components/incident/AttributionExplainability';

export const metadata: Metadata = {
  title: 'Vessel Forensic Profile | SpillTrace AI',
};

export default async function VesselPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  // Lookup vessel by ID or slug
  const vessel = DEMO_VESSELS.find((v: any) => v.id === id || v.id.toLowerCase().includes(id.toLowerCase()));
  if (!vessel) {
    notFound();
  }

  const isPrimaryCandidate = vessel.id === 'VESSEL-A-001';

  return (
    <div className="min-h-screen bg-surface pt-24 pb-16 px-6 lg:px-12 max-w-7xl mx-auto space-y-8">
      {/* Top Breadcrumb & Data Mode */}
      <div className="flex items-center justify-between border-b border-ink-tertiary/15 pb-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-xs text-ink-secondary hover:text-ink-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> BACK TO INVESTIGATION WORKSTATION
        </Link>
        <DataModeIndicator mode="DEMO" />
      </div>

      {/* Header Profile Title */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-ink-primary">
              {vessel.name}
            </h1>
            <StatusBadge
              variant={isPrimaryCandidate ? 'critical' : 'neutral'}
              status={isPrimaryCandidate ? 'PRIMARY CANDIDATE' : 'EXCLUDED / WATCH'}
            />
          </div>

          <p className="text-ink-secondary flex flex-wrap items-center gap-3 font-mono text-xs">
            <span>IMO: <strong>{vessel.imo}</strong></span>
            <span>·</span>
            <span>MMSI: <strong>{vessel.mmsi}</strong></span>
            <span>·</span>
            <span>Flag: <strong>{vessel.flag}</strong></span>
            <span>·</span>
            <span>Type: <strong>{vessel.type}</strong></span>
            <span>·</span>
            <span>Length: <strong>{vessel.length}m</strong></span>
          </p>
        </div>

        {/* Evidence Score Box */}
        <div className="bg-white p-4 rounded-xl border border-ink-tertiary/20 shadow-sm flex items-center gap-4">
          <div>
            <span className="font-mono text-[10px] text-ink-tertiary uppercase block">
              ATTRIBUTION INDEX
            </span>
            <span className="font-display text-3xl font-bold text-ink-primary">
              {vessel.evidenceScore.toFixed(1)}
              <span className="font-mono text-xs text-ink-secondary font-normal"> / 100</span>
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-ocean/10 flex items-center justify-center text-ocean">
            <Ship className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Primary 3-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Vessel Particulars & Kinematics (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-ink-tertiary/20 p-6 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-base text-ink-primary flex items-center gap-2">
              <Compass className="w-4 h-4 text-ocean" /> Vessel Specifications
            </h3>

            <dl className="space-y-2.5 text-xs font-mono">
              <div className="flex justify-between border-b border-ink-tertiary/10 pb-2">
                <dt className="text-ink-secondary">Hull Dimensions</dt>
                <dd className="font-bold text-ink-primary">{vessel.length}m LOA · 32m Beam</dd>
              </div>
              <div className="flex justify-between border-b border-ink-tertiary/10 pb-2">
                <dt className="text-ink-secondary">Gross Tonnage</dt>
                <dd className="font-bold text-ink-primary">64,200 GT</dd>
              </div>
              <div className="flex justify-between border-b border-ink-tertiary/10 pb-2">
                <dt className="text-ink-secondary">Reported Voyage</dt>
                <dd className="font-bold text-ink-primary">Fujairah &rarr; Colombo</dd>
              </div>
              <div className="flex justify-between border-b border-ink-tertiary/10 pb-2">
                <dt className="text-ink-secondary">AIS Transponder Integrity</dt>
                <dd className={cn("font-bold", isPrimaryCandidate ? "text-critical" : "text-verified")}>
                  {isPrimaryCandidate ? '2-hr Gap Flagged' : '100% Broadcast'}
                </dd>
              </div>
              <div className="flex justify-between pt-1">
                <dt className="text-ink-secondary">Nearest Distance to Origin</dt>
                <dd className="font-bold text-ink-primary">
                  {isPrimaryCandidate ? '1.2 km (Dead-Center)' : '8.2 km (Outside 80%)'}
                </dd>
              </div>
            </dl>
          </div>

          {/* Compatibility Breakdown */}
          <div className="bg-white rounded-2xl border border-ink-tertiary/20 p-6 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-base text-ink-primary">
              Evidentiary Compatibility
            </h3>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <div className="flex justify-between text-ink-secondary mb-1">
                  <span>Temporal Fit</span>
                  <span className="font-bold text-ink-primary">{vessel.compatibility.temporal}%</span>
                </div>
                <ConfidenceBar value={vessel.compatibility.temporal / 100} />
              </div>

              <div>
                <div className="flex justify-between text-ink-secondary mb-1">
                  <span>Spatial Proximity</span>
                  <span className="font-bold text-ink-primary">{vessel.compatibility.spatial}%</span>
                </div>
                <ConfidenceBar value={vessel.compatibility.spatial / 100} />
              </div>

              <div>
                <div className="flex justify-between text-ink-secondary mb-1">
                  <span>Drift Mechanics Fit</span>
                  <span className="font-bold text-marine">{vessel.compatibility.drift}%</span>
                </div>
                <ConfidenceBar value={vessel.compatibility.drift / 100} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Historical AIS Track Waypoints & Analysis (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Anomaly Callout Banner */}
          {isPrimaryCandidate ? (
            <div className="p-5 bg-critical/5 border border-critical/20 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-critical">
                <AlertTriangle className="w-4 h-4 text-critical" />
                <span>PRIMARY EVIDENCE: ANOMALOUS TRANSPONDER BLACKOUT</span>
              </div>
              <p className="text-xs font-body text-ink-secondary leading-relaxed">
                Between 13:30 and 15:30 UTC, MV Horizon Trader ceased transmitting AIS messages while operating in open Arabian Sea waters under normal sea state conditions. Prior to signal cessation, vessel speed decreased from 12.5 kts to 9.1 kts. Upon resuming broadcast, the vessel was on a course departing the now-detected slick centroid.
              </p>
            </div>
          ) : (
            <div className="p-5 bg-verified/5 border border-verified/20 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-verified">
                <ShieldCheck className="w-4 h-4 text-verified" />
                <span>EXCULPATORY FINDINGS: DEPRIORITIZED CANDIDATE</span>
              </div>
              <p className="text-xs font-body text-ink-secondary leading-relaxed">
                Transited through the regional corridor 6 hours prior to the estimated oil release window with continuous AIS telemetry broadcasts and steady speed.
              </p>
            </div>
          )}

          {/* Explainability Breakdown */}
          <AttributionExplainability vessel={vessel} />

          {/* Historical Waypoints Table */}
          <div className="bg-white rounded-2xl border border-ink-tertiary/20 shadow-sm overflow-hidden">
            <div className="p-4 bg-surface-subtle border-b border-ink-tertiary/10 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-ocean" />
                <span className="font-bold text-ink-primary">RECONSTRUCTED AIS LOGS</span>
              </div>
              <span className="text-ink-tertiary">{vessel.aisTrack?.length || 0} Recorded Hits</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono text-left">
                <thead className="bg-surface border-b border-ink-tertiary/10 text-ink-tertiary uppercase">
                  <tr>
                    <th className="p-3">Timestamp (UTC)</th>
                    <th className="p-3">Latitude</th>
                    <th className="p-3">Longitude</th>
                    <th className="p-3">Speed</th>
                    <th className="p-3">Heading</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-tertiary/10 text-ink-secondary">
                  {vessel.aisTrack?.map((pt: any, idx: number) => {
                    const isGapPoint = isPrimaryCandidate && idx === 2;
                    return (
                      <tr
                        key={idx}
                        className={cn(
                          "hover:bg-surface-subtle transition-colors",
                          isGapPoint ? "bg-amber-500/10 text-amber-800 font-bold" : ""
                        )}
                      >
                        <td className="p-3">{pt.timestamp}</td>
                        <td className="p-3">{pt.lat.toFixed(2)}°N</td>
                        <td className="p-3">{pt.lng.toFixed(2)}°E</td>
                        <td className="p-3">{pt.speed} kts</td>
                        <td className="p-3">{pt.heading}°</td>
                        <td className="p-3">
                          {isGapPoint ? (
                            <span className="text-critical font-bold">TRANSMISSION GAP</span>
                          ) : (
                            <span className="text-verified">BROADCAST OK</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
