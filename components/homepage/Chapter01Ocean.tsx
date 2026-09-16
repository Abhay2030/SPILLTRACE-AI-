'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ChevronDown } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Chapter01Ocean() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Headline animation
    gsap.fromTo(
      '.headline',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Supporting text animation
    gsap.fromTo(
      '.support-text',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Bounce arrow
    gsap.to('.scroll-arrow', {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: 'power1.inOut',
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="chapter-section min-h-screen relative flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center z-10 flex flex-col items-center">
        <span className="font-mono text-xs text-ink-tertiary uppercase tracking-[0.2em] mb-6">
          CHAPTER 01
        </span>
        <h1 className="headline font-display font-bold text-5xl md:text-7xl text-ink-primary tracking-tight mb-8">
          An oil spill can begin as a signal.
        </h1>
        <p className="support-text font-body text-xl md:text-2xl text-ink-secondary max-w-2xl mx-auto leading-relaxed">
          SpillTrace AI turns satellite observations, ocean dynamics and vessel movements into investigation-ready maritime intelligence.
        </p>
      </div>
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 scroll-arrow text-ink-tertiary">
        <ChevronDown size={32} strokeWidth={1.5} />
      </div>
    </section>
  );
}
