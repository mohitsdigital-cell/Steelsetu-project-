"use client";

import Link from "next/link";
import { useState } from "react";
import Logo3D from "./Logo3D";
import { catalog } from "@/lib/catalog";

const columns = [
  {
    title: "Platform",
    links: [
      { href: "/suppliers", label: "Suppliers" },
      { href: "/products", label: "Products" },
      { href: "/accessories", label: "Accessories" },
      { href: "/brands", label: "Brands" },
      { href: "/rates", label: "Indicative Rates" },
      { href: "/rfq", label: "Post a Requirement" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/knowledge", label: "Knowledge" },
      { href: "/community", label: "Community" },
      { href: "/register", label: "Register Business" },
    ],
  },
  {
    title: "Trust & Legal",
    links: [
      { href: "/trust", label: "Trust & Feedback" },
      { href: "/review-policy", label: "Review Policy" },
      { href: "/terms", label: "Terms of Use" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/disclaimer", label: "Disclaimer" },
      { href: "/grievance", label: "Grievance" },
    ],
  },
  {
    title: "Top Tools",
    links: [
      { href: "/calculators", label: "Weight Calculators" },
      { href: "/bill-maker", label: "Bill Maker (GST)" },
      { href: "/search", label: "Search" },
      { href: "/community/questions", label: "Trade Q&A" },
      { href: "/community/polls", label: "Market Polls" },
      { href: "/login", label: "Login / Dashboard" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer className="bg-[#0B1B2B] text-white overflow-hidden">
      <div className="footer-grad-line" aria-hidden />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-steel-blue/20 blur-[120px] pointer-events-none" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-10">
          <div className="lg:col-span-2">
            <Logo3D variant="molten" />
            <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-xs">
              The Bridge Between Verified Buyers &amp; Verified Steel Suppliers.
              Built for Burrabazar, Kolkata and Eastern India steel trade.
            </p>

            <form
              onSubmit={(e) => { e.preventDefault(); if (email.trim()) setDone(true); }}
              className="mt-5 flex max-w-sm"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aap@business.com"
                className="flex-1 bg-white/10 border border-white/15 rounded-l-xl px-4 py-2.5 text-sm outline-none focus:border-steel-blue placeholder:text-slate-500"
              />
              <button type="submit" className="bg-gradient-to-r from-[#FF6A00] to-[#ff8f3f] hover:brightness-110 font-bold text-sm text-white px-5 rounded-r-xl transition">
                Join
              </button>
            </form>
            {done && <p className="mt-2 text-xs text-emerald-400">Shukriya! Aap rate updates ki list mein add ho gaye.</p>}

            <div className="mt-6 flex items-center gap-3">
              <Link href="/contact" aria-label="X (Twitter)" className="w-9 h-9 grid place-items-center rounded-lg bg-white/10 hover:bg-steel-blue transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 1.2h3.7l-8.1 9.2L24 22.8h-7.5l-5.9-7.7-6.7 7.7H.2l8.7-9.9L0 1.2h7.7l5.3 7 6-7zm-1.3 19.4h2.1L6.6 3.3H4.4l13.2 17.3z" /></svg>
              </Link>
              <Link href="/contact" aria-label="LinkedIn" className="w-9 h-9 grid place-items-center rounded-lg bg-white/10 hover:bg-steel-blue transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.2V8h3.4v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v7.2zM5.3 6.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.4H3.5V8h3.6v12.4z" /></svg>
              </Link>
              <Link href="/contact" aria-label="YouTube" className="w-9 h-9 grid place-items-center rounded-lg bg-white/10 hover:bg-steel-blue transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z" /></svg>
              </Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-200 mb-4">Top Products</p>
            <ul className="space-y-2.5">
              {catalog.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link href={"/products/" + c.slug} className="text-sm text-slate-400 hover:text-steel-blue transition-colors">{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-slate-200 mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href} className="text-sm text-slate-400 hover:text-steel-blue transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-slate-500">
          <p>Rates shown on Steelsetu are indicative market references, not firm offers. Confirm final rates directly with suppliers.</p>
          <div className="flex items-center gap-4">
            <p>© {new Date().getFullYear()} Steelsetu. All rights reserved.</p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-8 h-8 grid place-items-center rounded-lg bg-white/10 hover:bg-steel-blue text-white transition-colors"
              aria-label="Back to top"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" /></svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}