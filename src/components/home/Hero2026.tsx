"use client";

import Link from "next/link";

const CATS = [
  { label: "TMT Bars & Rebar", slug: "/products" },
  { label: "MS Sheets & Plates", slug: "/products" },
  { label: "GI / PPGI / PPGL Coils", slug: "/products" },
  { label: "Corrugated Roofing Sheets", slug: "/products" },
  { label: "Structural Steel (Beams)", slug: "/products" },
  { label: "Pipes & Tubes", slug: "/products" },
  { label: "Wires & Binding Wire", slug: "/products" },
  { label: "Fasteners & Screws", slug: "/products" },
  { label: "PUF / Insulated Panels", slug: "/products" },
  { label: "Polycarbonate & FRP", slug: "/products" },
  { label: "Scrap & Recycled Steel", slug: "/products" },
  { label: "All Categories →", slug: "/products" },
];

export default function Hero2026() {
  return (
    <section className="bg-[#F5F7FB] pt-4 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr_260px] gap-4">
          {/* LEFT — Category sidebar */}
          <div className="ss-cat-side hidden md:block">
            <p className="px-4 py-3 bg-[#0B1B2B] text-white text-xs font-bold uppercase tracking-wider">
              All Categories
            </p>
            {CATS.map((c) => (
              <Link key={c.label} href={c.slug}>
                {c.label} <span>›</span>
              </Link>
            ))}
          </div>
          {/* CENTER — Hero banner with background */}
          <div className="relative rounded-2xl overflow-hidden min-h-[340px] md:min-h-[430px] shadow-xl">
            <div className="absolute inset-0 ss-hero-img" aria-hidden />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B2B]/90 via-[#0B1B2B]/40 to-transparent" aria-hidden />
            <div className="relative h-full flex flex-col justify-end p-6 sm:p-10 text-white">
              <span className="ss-badge bg-white/15 text-emerald-300 border-white/25 w-fit">Kolkata Burrabazar • Verified Trade</span>
              <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold leading-[1.1] max-w-lg">
                The Bridge Between <span className="text-amber-400">Verified Buyers</span> & Verified Steel Suppliers
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-200 max-w-md">
                Calculators, Bill Maker, indicative rates aur RFQ — sab kuch ek jagah. Mobile-first.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-2 max-w-lg">
                <input
                  type="text"
                  placeholder="Search: TMT Fe550D, PPGL 0.50mm..."
                  className="flex-1 px-4 py-3.5 rounded-xl outline-none text-[#0B1B2B] font-medium bg-white"
                />
                <Link href="/products" className="ss-orange-cta px-6 py-3.5 text-center">
                  Search
                </Link>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {["TMT Bars", "Roofing Sheets", "GI Coils"].map((t) => (
                  <Link key={t} href="/products" className="text-xs font-semibold bg-white/10 border border-white/25 rounded-full px-3 py-1.5 hover:bg-white/20 transition-colors">
                    {t}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {/* RIGHT — Quick action cards */}
          <div className="flex md:flex-col flex-wrap gap-4">
            <div className="ss-card flex-1 min-w-[220px] p-5">
              <p className="text-xs font-bold text-[#FF6A00] uppercase tracking-wide">Free Service</p>
              <h3 className="mt-1 text-lg font-extrabold text-[#0B1B2B]">Post Your Requirement</h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                1 RFQ → multiple verified suppliers. Unique reference number.
              </p>
              <Link href="/rfq" className="ss-orange-cta block mt-4 px-4 py-2.5 text-center text-sm">
                Post RFQ →
              </Link>
            </div>
            <div className="ss-card flex-1 min-w-[220px] p-5">
              <p className="text-xs font-bold text-[#1B6BFF] uppercase tracking-wide">GST Tool</p>
              <h3 className="mt-1 text-lg font-extrabold text-[#0B1B2B]">Bill Maker</h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                GST invoice banao, PDF export karo. 2 minute demo.
              </p>
              <Link href="/bill-maker" className="block mt-4 px-4 py-2.5 text-center text-sm font-bold rounded-xl bg-[#1B6BFF]/10 text-[#1B6BFF] hover:bg-[#1B6BFF]/20 transition-colors">
                Open Bill Maker
              </Link>
            </div>
            <div className="ss-card hidden md:block p-5 text-center">
              <p className="text-3xl font-extrabold text-gradient">26+</p>
              <p className="text-xs text-slate-500 font-medium mt-1">Trade Calculators ready</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
