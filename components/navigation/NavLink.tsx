'use client';

import Link from 'next/link';

interface NavLinkProps {
  href: string;
  label: string;
  active: boolean;
}

export default function NavLink({ href, label, active }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`relative py-2 text-sm font-medium transition-colors group ${
        active ? 'text-ocean' : 'text-ink-secondary hover:text-ink-primary'
      }`}
    >
      {label}
      <span
        className={`absolute bottom-0 left-0 h-[2px] bg-ocean transition-all duration-300 ease-out ${
          active ? 'w-full' : 'w-0 group-hover:w-full'
        }`}
      />
    </Link>
  );
}
