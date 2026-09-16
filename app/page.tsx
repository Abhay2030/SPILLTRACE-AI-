import dynamic from 'next/dynamic';
import { DataModeIndicator } from '@/components/ui/DataModeIndicator';
import DemoController from '@/components/demo/DemoController';

// Dynamic imports for each chapter (code splitting with named exports)
const Chapter01 = dynamic(() => import('@/components/homepage/Chapter01Ocean').then(m => m.Chapter01Ocean));
const Chapter02 = dynamic(() => import('@/components/homepage/Chapter02Watch').then(m => m.Chapter02Watch));
const Chapter03 = dynamic(() => import('@/components/homepage/Chapter03Satellite').then(m => m.Chapter03Satellite));
const Chapter04 = dynamic(() => import('@/components/homepage/Chapter04SAR').then(m => m.Chapter04SAR));
const Chapter05 = dynamic(() => import('@/components/homepage/Chapter05Validation').then(m => m.Chapter05Validation));
const Chapter06 = dynamic(() => import('@/components/homepage/Chapter06Characterize').then(m => m.Chapter06Characterize));
const Chapter07 = dynamic(() => import('@/components/homepage/Chapter07Rewind').then(m => m.Chapter07Rewind));
const Chapter08 = dynamic(() => import('@/components/homepage/Chapter08Origin').then(m => m.Chapter08Origin));
const Chapter09 = dynamic(() => import('@/components/homepage/Chapter09Drift').then(m => m.Chapter09Drift));
const Chapter10 = dynamic(() => import('@/components/homepage/Chapter10Threat').then(m => m.Chapter10Threat));
const Chapter11 = dynamic(() => import('@/components/homepage/Chapter11AIS').then(m => m.Chapter11AIS));
const Chapter12 = dynamic(() => import('@/components/homepage/Chapter12Candidates').then(m => m.Chapter12Candidates));
const Chapter13 = dynamic(() => import('@/components/homepage/Chapter13WhyVessel').then(m => m.Chapter13WhyVessel));
const Chapter14 = dynamic(() => import('@/components/homepage/Chapter14WhyNot').then(m => m.Chapter14WhyNot));
const Chapter15 = dynamic(() => import('@/components/homepage/Chapter15Evidence').then(m => m.Chapter15Evidence));
const Chapter16 = dynamic(() => import('@/components/homepage/Chapter16Response').then(m => m.Chapter16Response));
const Chapter17 = dynamic(() => import('@/components/homepage/Chapter17Simulation').then(m => m.Chapter17Simulation));
const Chapter18 = dynamic(() => import('@/components/homepage/Chapter18Monitoring').then(m => m.Chapter18Monitoring));
const Chapter19 = dynamic(() => import('@/components/homepage/Chapter19System').then(m => m.Chapter19System));
const Chapter20 = dynamic(() => import('@/components/homepage/Chapter20Final').then(m => m.Chapter20Final));

export default function HomePage() {
  return (
    <div className="relative">
      <DataModeIndicator mode="DEMO" />
      <DemoController />
      <Chapter01 />
      <Chapter02 />
      <Chapter03 />
      <Chapter04 />
      <Chapter05 />
      <Chapter06 />
      <Chapter07 />
      <Chapter08 />
      <Chapter09 />
      <Chapter10 />
      <Chapter11 />
      <Chapter12 />
      <Chapter13 />
      <Chapter14 />
      <Chapter15 />
      <Chapter16 />
      <Chapter17 />
      <Chapter18 />
      <Chapter19 />
      <Chapter20 />
    </div>
  );
}
