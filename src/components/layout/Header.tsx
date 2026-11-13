"use client";

import Link from "next/link";
import { useState } from "react";
import Logo3D from "./Logo3D";
import { catalog } from "@/lib/catalog";
import { accessories, brands } from "@/lib/trade-extras";

const navLinks = [
  { href: "/suppliers", label: "Suppliers" },
  { href: "/brands", label: "Brands" },
  { href: "/rates", label: "Rates" },
  { href: "/community", label: "Community" },
  { href: "/bill-maker", label: "Bill Maker" },
  { href: "/calculators", label: "Calculators" },
  { href: "/knowledge", label: "Knowledge" },
];

const tickerItems = [
  "🔥 Burrabazar daily indicative rates",
  "✅ Verified supplier profiles",
  "⚡ Free TMT & sheet weight calculators",
  "🤝 One structured RFQ → multiple quotations",
];

export default function Header() {
  const [open, setOpen] = useState(false);

return (
    <header className="sticky top-0 z-50">
      <div className="bg-gradient-to-r from-steel-blue via-indigo-600 to-steel-blue overflow-hidden" aria-hidden>
        <div className="ticker-track py-1.5 text-[11px] font-semibold text-white/85">
          {[...tickerItems, ...tickerItems].map((t, i) => (
            <span key={i} className="whitespace-nowrap">{t}</span>
          ))}
        </div>
      </div>

<div className="bg-steel-navy/85 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" aria-label="Steelsetu home">
              <Logo3D variant="beam" />
            </Link>

<nav className="hidden lg:flex items-center gap-1">
              <div className="relative group">
                <button className="px-3.5 py-2 text-sm font-semibold text-white flex items-center gap-1 rounded-lg hover:bg-white/5 transition-colors">
                  Products
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6" /></svg>
                </button>
                <div className="absolute left-0 top-full hidden group-hover:block pt-2 w-[680px]">
                  <div className="rounded-2xl border border-white/10 bg-steel-navy/95 backdrop-blur-xl shadow-2xl p-6 grid grid-cols-3 gap-8">
                    <div>
                      <p className="mega-title">Products</p>
                      <ul className="space-y-2">
                        {catalog.slice(0, 8).map((c) => (
                          <li key={c.slug}>
                            <Link href={"/products/" + c.slug} className="text-sm text-slate-300 hover:text-white transition-colors">{c.name}</Link>
                          </li>
                        ))}
                        <li><Link href="/products" className="text-sm font-bold text-steel-blue hover:text-white">All products →</Link></li>
                      </ul>
                    </div>
                    <div>
                      <p className="mega-title">Accessories</p>
                      <ul className="space-y-2">
                        {accessories.slice(0, 8).map((a) => (
                          <li key={a.name}>
                            <Link href="/accessories" className="text-sm text-slate-300 hover:text-white transition-colors">{a.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="mega-title">Top Brands</p>
                      <ul className="space-y-2">
                        {brands.slice(0, 8).map((b) => (
                          <li key={b.name}>
                            <Link href="/brands" className="text-sm text-slate-300 hover:text-white transition-colors">{b.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

{navLinks.map((l) => (
                <Link key={l.href} href={l.href} className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>

<div className="hidden lg:flex items-center gap-3">
              <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white px-4 py-2 transition-colors">Login</Link>
              <Link href="/rfq" className="text-sm font-bold text-white bg-gradient-to-r from-[#FF6A00] to-[#ff8f3f] hover:brightness-110 px-5 py-2.5 rounded-xl shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.03]">
                Post Requirement
              </Link>
            </div>

<button onClick={() => setOpen(!open)} className="lg:hidden text-white p-2 rounded-lg hover:bg-white/5" aria-label="Menu">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {open ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
              </svg>
            </button>
          </div>
        </div>

{open && (
          <div className="lg:hidden border-t border-white/10 bg-steel-navy/95 backdrop-blur-xl">
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              <Link href="/products" onClick={() => setOpen(false)} className="px-4 py-3 text-sm font-semibold text-white bg-white/5 rounded-lg">Products</Link>
              <Link href="/accessories" onClick={() => setOpen(false)} className="px-4 py-3 text-sm font-semibold text-white bg-white/5 rounded-lg">Accessories</Link>
              <Link href="/brands" onClick={() => setOpen(false)} className="px-4 py-3 text-sm font-semibold text-white bg-white/5 rounded-lg">Brands</Link>
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  {l.label}
                </Link>
              ))}
              <Link href="/rfq" onClick={() => setOpen(false)} className="mt-2 text-center text-sm font-bold text-white bg-gradient-to-r from-[#FF6A00] to-[#ff8f3f] px-5 py-3 rounded-xl">Post Requirement</Link>
              <Link href="/login" onClick={() => setOpen(false)} className="text-center text-sm font-medium text-slate-300 px-5 py-3">Login</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
