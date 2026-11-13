"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const [q, setQ] = useState("");
  const router = useRouter();

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (query) router.push("/search?q=" + encodeURIComponent(query));
  }

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar */}
      <div className="bg-steel-navy text-white/80 text-[11px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-8 flex items-center justify-between">
          <p className="font-medium">The Bridge Between Verified Buyers &amp; Verified Steel Suppliers</p>
          <div className="hidden sm:flex items-center gap-4">
            <Link href="/register" className="hover:text-white transition-colors">Sell on Steelsetu</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Help</Link>
            <Link href="/login" className="hover:text-white transition-colors">Login</Link>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="bg-gradient-to-r from-steel-blue via-indigo-600 to-steel-blue overflow-hidden" aria-hidden>
        <div className="ticker-track py-1.5 text-[11px] font-semibold text-white/85">
          {[...tickerItems, ...tickerItems].map((t, i) => (
            <span key={i} className="whitespace-nowrap">{t}</span>
          ))}
        </div>
      </div>

      {/* White main header with central search */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 gap-4">
            <Link href="/" aria-label="Steelsetu home">
              <Logo3D variant="beam" dark />
            </Link>

            {/* Central search — Alibaba style */}
            <form onSubmit={submitSearch} className="hidden md:flex flex-1 max-w-2xl">
              <div className="flex w-full rounded-full border-2 border-steel-navy overflow-hidden bg-white">
                <input
                  type="text"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search TMT bars, GC sheets, brands, knowledge…"
                  className="flex-1 px-5 py-2.5 text-sm outline-none text-steel-navy placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#FF6A00] to-[#ff8f3f] hover:brightness-110 text-white text-sm font-bold px-8 transition"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="hidden md:flex items-center gap-3">
              <Link href="/rfq" className="text-sm font-bold text-white bg-gradient-to-r from-[#FF6A00] to-[#ff8f3f] hover:brightness-110 px-5 py-2.5 rounded-full shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.03]">
                Post Requirement
              </Link>
            </div>

            <button onClick={() => setOpen(!open)} className="md:hidden text-steel-navy p-2 rounded-lg hover:bg-slate-100" aria-label="Menu">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {open ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
              </svg>
            </button>
          </div>

          {/* Category row */}
          <div className="hidden lg:flex items-center gap-1 h-10">
            <div className="relative group">
              <button className="px-3.5 py-2 text-sm font-semibold text-steel-navy flex items-center gap-1 rounded-lg hover:bg-steel-blue/10 transition-colors">
                All Categories
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6" /></svg>
              </button>
              <div className="absolute left-0 top-full hidden group-hover:block pt-2 w-[720px]">
                <div className="rounded-2xl border border-slate-200 bg-white shadow-2xl p-6 grid grid-cols-3 gap-8">
                  <div>
                    <p className="mega-title text-steel-navy">Products</p>
                    <ul className="space-y-2">
                      {catalog.slice(0, 8).map((c) => (
                        <li key={c.slug}>
                          <Link href={"/products/" + c.slug} className="text-sm text-slate-600 hover:text-steel-blue transition-colors">{c.name}</Link>
                        </li>
                      ))}
                      <li><Link href="/products" className="text-sm font-bold text-steel-blue hover:text-steel-navy">All products →</Link></li>
                    </ul>
                  </div>
                  <div>
                    <p className="mega-title text-steel-navy">Accessories</p>
                    <ul className="space-y-2">
                      {accessories.slice(0, 8).map((a) => (
                        <li key={a.name}>
                          <Link href="/accessories" className="text-sm text-slate-600 hover:text-steel-blue transition-colors">{a.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mega-title text-steel-navy">Top Brands</p>
                    <ul className="space-y-2">
                      {brands.slice(0, 8).map((b) => (
                        <li key={b.name}>
                          <Link href="/brands" className="text-sm text-slate-600 hover:text-steel-blue transition-colors">{b.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-steel-navy hover:bg-steel-blue/10 rounded-lg transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <form onSubmit={submitSearch} className="px-4 pt-4">
              <div className="flex rounded-full border-2 border-steel-navy overflow-hidden">
                <input
                  type="text"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search products, brands…"
                  className="flex-1 px-4 py-2.5 text-sm outline-none text-steel-navy placeholder:text-slate-400"
                />
                <button type="submit" className="bg-gradient-to-r from-[#FF6A00] to-[#ff8f3f] text-white text-sm font-bold px-5">Search</button>
              </div>
            </form>
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              <Link href="/products" onClick={() => setOpen(false)} className="px-4 py-3 text-sm font-semibold text-steel-navy bg-steel-blue/10 rounded-lg">All Products</Link>
              <Link href="/accessories" onClick={() => setOpen(false)} className="px-4 py-3 text-sm font-semibold text-steel-navy bg-steel-blue/10 rounded-lg">Accessories</Link>
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="px-4 py-3 text-sm font-medium text-slate-600 hover:text-steel-navy hover:bg-slate-100 rounded-lg transition-colors">
                  {l.label}
                </Link>
              ))}
              <Link href="/rfq" onClick={() => setOpen(false)} className="mt-2 text-center text-sm font-bold text-white bg-gradient-to-r from-[#FF6A00] to-[#ff8f3f] px-5 py-3 rounded-full">Post Requirement</Link>
              <Link href="/login" onClick={() => setOpen(false)} className="text-center text-sm font-medium text-slate-500 px-5 py-3">Login</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}