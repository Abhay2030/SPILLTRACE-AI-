'use client';
import { useState, useEffect } from 'react';
import { DataModeIndicator } from '@/components/ui/DataModeIndicator';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const DETECTIONS_DATA = [
  { date: '2026-08-01', count: 4 }, { date: '2026-08-02', count: 7 }, { date: '2026-08-03', count: 3 },
  { date: '2026-08-04', count: 12 }, { date: '2026-08-05', count: 8 }, { date: '2026-08-06', count: 5 },
  { date: '2026-08-07', count: 9 }, { date: '2026-08-08', count: 11 }, { date: '2026-08-09', count: 2 },
  { date: '2026-08-10', count: 6 }, { date: '2026-08-11', count: 14 }, { date: '2026-08-12', count: 5 },
  { date: '2026-08-13', count: 8 }, { date: '2026-08-14', count: 10 }, { date: '2026-08-15', count: 3 },
  { date: '2026-08-16', count: 7 }, { date: '2026-08-17', count: 13 }, { date: '2026-08-18', count: 9 },
  { date: '2026-08-19', count: 4 }, { date: '2026-08-20', count: 11 }, { date: '2026-08-21', count: 6 },
  { date: '2026-08-22', count: 8 }, { date: '2026-08-23', count: 15 }, { date: '2026-08-24', count: 5 },
  { date: '2026-08-25', count: 9 }, { date: '2026-08-26', count: 12 }, { date: '2026-08-27', count: 7 },
  { date: '2026-08-28', count: 4 }, { date: '2026-08-29', count: 10 }, { date: '2026-08-30', count: 8 },
];

const CONFIDENCE_DATA = [
  { range: '0-50%', count: 12 },
  { range: '50-70%', count: 45 },
  { range: '70-90%', count: 89 },
  { range: '90-100%', count: 134 }
];

const COLORS = ['#0f172a', '#0369a1', '#06b6d4', '#d97706'];

export default function AnalyticsPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-surface pt-20 pb-12 px-6 lg:px-12 max-w-7xl mx-auto">
      <DataModeIndicator mode="DEMO" />
      
      <div className="mb-8">
        <h1 className="text-h2 font-display text-ink-primary mb-2">System Analytics</h1>
        <p className="text-ink-secondary">Global performance and detection metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Detection Statistics */}
        <div className="bg-white rounded-xl border border-surface-subtle p-6 shadow-sm lg:col-span-2">
          <h3 className="font-display font-medium text-ink-primary mb-6">Detection Volume (30 Days)</h3>
          <div className="h-64">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DETECTIONS_DATA}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0369a1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0369a1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="date" tick={{fontSize: 12}} tickLine={false} axisLine={false} minTickGap={30} />
                  <YAxis tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Area type="monotone" dataKey="count" stroke="#0369a1" strokeWidth={2} fillOpacity={1} fill="url(#colorCount)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* System Accuracy */}
        <div className="bg-white rounded-xl border border-surface-subtle p-6 shadow-sm flex flex-col justify-center items-center text-center">
          <h3 className="font-display font-medium text-ink-primary mb-2 w-full text-left">Attribution Accuracy</h3>
          <div className="relative w-40 h-40 flex items-center justify-center mt-4">
             <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="10" fill="none" />
                <circle cx="50" cy="50" r="40" stroke="#059669" strokeWidth="10" fill="none" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.87)} />
             </svg>
             <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-display font-bold text-ink-primary">87%</span>
                <span className="text-xs text-ink-secondary">Verified</span>
             </div>
          </div>
          <p className="text-sm text-ink-secondary mt-6">Based on 1,240 verified incidents.</p>
        </div>

        {/* Confidence Distribution */}
        <div className="bg-white rounded-xl border border-surface-subtle p-6 shadow-sm">
          <h3 className="font-display font-medium text-ink-primary mb-6">Confidence Distribution</h3>
          <div className="h-48">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CONFIDENCE_DATA} layout="vertical" margin={{ top: 0, right: 0, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="range" type="category" tick={{fontSize: 12}} tickLine={false} axisLine={false} width={60} />
                  <Tooltip cursor={{fill: '#f8fafc'}} />
                  <Bar dataKey="count" fill="#06b6d4" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* False Positives vs True Positives */}
        <div className="bg-white rounded-xl border border-surface-subtle p-6 shadow-sm">
          <h3 className="font-display font-medium text-ink-primary mb-2">Signal Analysis</h3>
          <div className="h-56 relative">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'True Spill', value: 840 },
                      { name: 'Look-alike (Wind)', value: 120 },
                      { name: 'Look-alike (Algae)', value: 80 }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {[0, 1, 2].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
        
        {/* Additional placeholder panel */}
        <div className="bg-white rounded-xl border border-surface-subtle p-6 shadow-sm flex flex-col">
          <h3 className="font-display font-medium text-ink-primary mb-2">Processing Latency</h3>
          <div className="flex-1 flex items-center justify-center">
             <div className="text-center">
                <span className="text-4xl font-mono text-ocean">14.2</span>
                <span className="text-ink-secondary ml-2">min</span>
                <p className="text-xs text-ink-tertiary mt-2">Avg. time from acquisition to alert</p>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
