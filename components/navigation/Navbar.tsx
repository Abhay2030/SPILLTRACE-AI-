'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Play, Maximize, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import NavLink from './NavLink';
import { useAppStore, Sector } from '@/lib/state/useAppStore';

const NAV_LINKS = [
  { href: '/', label: 'Workstation' },
  { href: '/incident/ST-2026-0042', label: 'Active Case' },
  { href: '/analytics', label: 'Analytics' },
  { href: '/response', label: 'Response' },
  { href: '/about', label: 'System Architecture' },
];

const SECTORS: Sector[] = [
  'Arabian Sea',
  'Bay of Bengal',
  'Indian Ocean',
  'Mediterranean',
  'North Atlantic',
  'Custom Region'
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sectorDropdownOpen, setSectorDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const pathname = usePathname();
  
  const sector = useAppStore(state => state.sector);
  const setSector = useAppStore(state => state.setSector);
  const presentationMode = useAppStore(state => state.presentationMode);
  const setPresentationMode = useAppStore(state => state.setPresentationMode);
  const focusMode = useAppStore(state => state.focusMode);
  const setFocusMode = useAppStore(state => state.setFocusMode);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSectorDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  // Hide Navbar completely in Focus Mode
  if (focusMode) {
    return (
      <div className="fixed top-4 right-4 z-[60]">
         <button 
           onClick={() => setFocusMode(false)}
           className="bg-surface-elevated/80 backdrop-blur-md text-ink-primary p-2 rounded-full border border-border-subtle shadow-lg hover:bg-surface-hover transition-colors"
           title="Exit Focus Mode"
         >
           <Maximize2 className="w-5 h-5" />
         </button>
      </div>
    );
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/90 backdrop-blur-md border-b border-border-subtle shadow-subtle h-16'
          : 'bg-surface/60 backdrop-blur-sm border-b border-ink-tertiary/10 h-16 md:h-18'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo & Operational Status */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-baseline gap-1 font-display font-bold">
            <span className="text-xl tracking-tight text-ink-primary">SPILLTRACE</span>
            <span className="text-sm font-semibold text-ocean">AI</span>
          </Link>

          {/* Interactive Surveillance Telemetry Pill */}
          <div className="relative hidden lg:block" ref={dropdownRef}>
            <button 
              onClick={() => setSectorDropdownOpen(!sectorDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-subtle border border-ink-tertiary/15 text-[11px] font-mono text-ink-secondary hover:bg-surface-hover transition-colors cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-verified animate-ping" />
              <span className="font-bold text-ink-primary">LIVE SECTOR:</span>
              <span className="uppercase text-ocean">{sector}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${sectorDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {sectorDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-2 w-48 bg-surface-elevated border border-border-subtle shadow-xl rounded-lg py-1 z-50"
                >
                  <div className="px-3 py-2 text-[10px] font-mono text-ink-tertiary uppercase border-b border-border-subtle mb-1">
                    Select Demo Region
                  </div>
                  {SECTORS.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setSector(s);
                        setSectorDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-mono transition-colors ${
                        sector === s ? 'text-ocean bg-ocean/10' : 'text-ink-secondary hover:bg-surface-hover hover:text-ink-primary'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 xl:gap-4">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              active={pathname === link.href || (link.href === '/' && pathname === '/investigate')}
            />
          ))}
        </nav>

        {/* Right Section: Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setFocusMode(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-ink-secondary hover:text-ink-primary hover:bg-surface-subtle transition-colors text-xs font-mono border border-transparent"
            title="Focus Mode (F)"
          >
            <Maximize className="w-3.5 h-3.5" />
            <span>FOCUS</span>
          </button>
          
          <div className="w-px h-4 bg-border-subtle mx-1" />

          <button
            onClick={() => setPresentationMode(!presentationMode)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-colors shadow-sm border ${
              presentationMode 
                ? 'bg-alert text-white border-alert/20 animate-pulse'
                : 'bg-ocean hover:bg-ocean/90 text-white border-ocean/20'
            }`}
          >
            {presentationMode ? (
              <>
                <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                PRESENTING
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" fill="currentColor" />
                PRESENT
              </>
            )}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-ink-primary"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-50 bg-surface flex flex-col pt-20 px-6"
          >
            <button
              className="absolute top-6 right-6 p-2 text-ink-primary"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-8">
               <span className="text-xs font-mono text-ink-tertiary uppercase">Live Sector</span>
               <div className="mt-2 text-ocean font-bold">{sector}</div>
            </div>

            <nav className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display text-xl text-ink-primary hover:text-ocean transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-6 border-t border-ink-tertiary/20 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setPresentationMode(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 bg-ocean text-white rounded-xl font-mono text-xs font-bold text-center flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" fill="currentColor" />
                  START PRESENTATION
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
