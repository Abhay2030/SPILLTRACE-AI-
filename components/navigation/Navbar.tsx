'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import NavLink from './NavLink';

const NAV_LINKS = [
  { href: '/investigate', label: 'Investigate' },
  { href: '/incidents', label: 'Incidents' },
  { href: '/vessels', label: 'Vessels' },
  { href: '/analytics', label: 'Analytics' },
  { href: '/response', label: 'Response' },
  { href: '/about', label: 'About' },
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
          : 'bg-transparent border-b border-transparent h-20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-baseline gap-1 font-display font-bold">
          <span className="text-xl tracking-tight text-ink-primary">SPILLTRACE</span>
          <span className="text-sm font-semibold text-ocean">AI</span>
        </Link>

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

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-surface-muted text-ink-tertiary text-xs font-mono border border-border">
            <span>⌘</span>
            <span>K</span>
          </div>
          <button className="bg-ocean hover:bg-ocean-deep text-white px-4 py-2 rounded text-xs font-semibold tracking-wider uppercase transition-colors">
            Start Investigation
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
                  className={`text-2xl font-display font-medium ${
                    pathname === link.href ? 'text-ocean' : 'text-ink-primary'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pb-12">
              <button className="w-full bg-ocean text-white py-4 rounded-lg font-semibold tracking-wider uppercase">
                Start Investigation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
