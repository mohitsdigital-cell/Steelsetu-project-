"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/suppliers", label: "Suppliers" },
  { href: "/products", label: "Products" },
  { href: "/rates", label: "Rates" },
  { href: "/bill-maker", label: "Bill Maker" },
  { href: "/calculators", label: "Calculators" },
  { href: "/knowledge", label: "Knowledge" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

return (
    <header className="sticky top-0 z-50 bg-steel-navy/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-steel-blue to-indigo-500 grid place-items-center font-bold text-white text-lg glow-sm group-hover:scale-105 transition-transform">
              S
            </span>
            <span className="font-bold text-xl text-white tracking-tight">
              Steel<span className="text-gradient">setu</span>
            </span>
          </Link>

<nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

<div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-300 hover:text-white px-4 py-2 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/rfq"
              className="text-sm font-semibold text-white bg-steel-blue hover:bg-steel-blue/80 px-5 py-2.5 rounded-xl glow-sm transition-all hover:scale-[1.03]"
            >
              Post Requirement
            </Link>
          </div>

<button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/5"
            aria-label="Menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

{open && (
        <div className="lg:hidden border-t border-white/10 bg-steel-navy/95 backdrop-blur-xl">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/rfq"
              onClick={() => setOpen(false)}
              className="mt-2 text-center text-sm font-semibold text-white bg-steel-blue px-5 py-3 rounded-xl"
            >
              Post Requirement
            </Link>
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="text-center text-sm font-medium text-slate-300 px-5 py-3"
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

