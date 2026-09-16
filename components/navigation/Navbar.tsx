'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Compass, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import NavLink from './NavLink';

const NAV_LINKS = [
  { href: '/investigate', label: 'Workstation' },
  { href: '/incident/ST-2026-0042', label: 'Active Case' },
  { href: '/analytics', label: 'Analytics' },
  { href: '/response', label: 'Response' },
  { href: '/about', label: 'System Architecture' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/90 backdrop-blur-md border-b border-border-subtle shadow-subtle h-16'
          : 'bg-surface/60 backdrop-blur-sm border-b border-ink-tertiary/10 h-16 md:h-18'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo & Operational Status */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-baseline gap-1 font-display font-bold">
            <span className="text-xl tracking-tight text-ink-primary">SPILLTRACE</span>
            <span className="text-sm font-semibold text-ocean">AI</span>
          </Link>

          {/* Surveillance Telemetry Pill */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface-subtle border border-ink-tertiary/15 text-[11px] font-mono text-ink-secondary">
            <span className="w-2 h-2 rounded-full bg-verified animate-ping" />
            <span className="font-bold text-ink-primary">LIVE SECTOR:</span>
            <span>ARABIAN SEA (15.3°N, 72.1°E)</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              active={pathname === link.href}
            />
          ))}
        </nav>

        {/* Right Section: Command Palette Hint + Action */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-surface-subtle text-ink-tertiary text-xs font-mono border border-ink-tertiary/15">
            <span>⌘</span>
            <span>K</span>
          </div>

          <Link
            href="/investigate"
            className="bg-ocean hover:bg-ocean/90 text-white px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-colors shadow-sm"
          >
            WORKSTATION
          </Link>
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-surface flex flex-col pt-20 px-6"
          >
            <button
              className="absolute top-6 right-6 p-2 text-ink-primary"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>

            <nav className="flex flex-col gap-6 mt-8">
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
              <div className="pt-6 border-t border-ink-tertiary/20">
                <Link
                  href="/investigate"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 bg-ocean text-white rounded-xl font-mono text-xs font-bold text-center block"
                >
                  START INVESTIGATION
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
