import { Metadata } from 'next';
import { DataModeIndicator } from '@/components/ui/DataModeIndicator';

export const metadata: Metadata = {
  title: 'About System | SpillTrace AI',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface pt-24 pb-20 px-6 lg:px-12 max-w-4xl mx-auto font-body">
      <DataModeIndicator mode="DEMO" />
      
      <header className="mb-16">
        <h1 className="text-h1 font-display text-ink-primary mb-6">About SpillTrace</h1>
        <p className="text-xl text-ink-secondary leading-relaxed">
          SpillTrace is a maritime intelligence platform that combines satellite imagery, physical oceanography, and AIS vessel tracking to detect marine pollution and attribute it to likely sources.
        </p>
      </header>

      <section className="mb-16">
        <h2 className="text-h3 font-display text-ink-primary mb-6 border-b border-surface-subtle pb-2">How It Works</h2>
        <div className="space-y-8 text-ink-secondary">
           <div className="flex gap-4">
             <div className="w-12 h-12 shrink-0 bg-ocean/10 text-ocean flex items-center justify-center rounded-full font-display font-bold">1</div>
             <div>
               <h3 className="text-lg font-medium text-ink-primary mb-2">Detection & Classification</h3>
               <p>Synthetic Aperture Radar (SAR) imagery from Sentinel-1 is continuously analyzed by computer vision models to identify surface anomalies consistent with oil slicks.</p>
             </div>
           </div>
           <div className="flex gap-4">
             <div className="w-12 h-12 shrink-0 bg-ocean/10 text-ocean flex items-center justify-center rounded-full font-display font-bold">2</div>
             <div>
               <h3 className="text-lg font-medium text-ink-primary mb-2">Reverse Drift Modeling</h3>
               <p>Using historical wind and ocean current data, the system runs physics-based reverse trajectories to estimate where the spill originated over a specific time window.</p>
             </div>
           </div>
           <div className="flex gap-4">
             <div className="w-12 h-12 shrink-0 bg-ocean/10 text-ocean flex items-center justify-center rounded-full font-display font-bold">3</div>
             <div>
               <h3 className="text-lg font-medium text-ink-primary mb-2">Kinematic Correlation</h3>
               <p>Historical AIS (Automatic Identification System) vessel tracks are queried against the spatio-temporal origin volume to identify vessels that align with the spill creation parameters.</p>
             </div>
           </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-h3 font-display text-ink-primary mb-6 border-b border-surface-subtle pb-2">System Limitations & Constraints</h2>
        <ul className="list-disc pl-5 space-y-3 text-ink-secondary">
          <li><strong>Satellite Revisit Time:</strong> Detection capability is constrained by the orbital mechanics and revisit frequency of the SAR constellation (typically 1-3 days depending on latitude).</li>
          <li><strong>Probabilistic Nature:</strong> Confidence levels are probabilistic estimates. The system provides evidence, not definitive proof.</li>
          <li><strong>AIS Reliability:</strong> The attribution engine relies on accurate AIS data, which can sometimes be incomplete, spoofed, or turned off by operators (dark vessels).</li>
          <li><strong>Model Uncertainty:</strong> Ocean physics models possess inherent uncertainty, especially in complex coastal regions or during extreme weather events.</li>
        </ul>
      </section>

      <section className="mb-16 p-6 bg-navy/5 rounded-xl border border-navy/10">
        <h2 className="text-lg font-display text-ink-primary mb-3">Human in the Loop</h2>
        <p className="text-ink-secondary">
          SpillTrace is designed as a decision-support tool to assist human investigators. It accelerates evidence gathering and analysis, but it <strong>does not make autonomous enforcement decisions</strong>. All findings should be verified by trained analysts and supported by field observations when possible.
        </p>
      </section>
      
      <footer className="text-sm text-ink-tertiary border-t border-surface-subtle pt-6">
         <p>Data Provenance: Sentinel-1 (Copernicus), Global AIS networks, HYCOM Ocean Models.</p>
      </footer>
    </div>
  );
}
