"use client";

import { useState } from "react";

export default function RfqPage() {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [details, setDetails] = useState("");
  const [ref, setRef] = useState("");

const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const d = new Date();
    const stamp = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
    const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
    setRef(`RFQ-${stamp}-${rand}`);
  };

return (
    <div>
      <section className="bg-steel-navy text-white grain relative overflow-hidden">
        <div className="absolute -top-20 right-0 w-[350px] h-[350px] rounded-full bg-steel-blue/25 blur-[110px]" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Post a Requirement</h1>
          <p className="mt-4 text-slate-300 max-w-2xl">
            One structured RFQ instead of repeating yourself to every supplier.
          </p>
        </div>
      </section>

<section className="max-w-2xl mx-auto px-4 sm:px-6 py-14">
        {ref ? (
          <div className="bg-white border border-gray-200 rounded-3xl p-10 text-center shadow-xl shadow-steel-blue/10">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 grid place-items-center">
              <span className="text-emerald-600 text-3xl">✓</span>
            </div>
            <h2 className="mt-6 text-xl font-bold text-steel-navy">Requirement reference created</h2>
            <p className="mt-4 text-sm text-steel-charcoal/70">Save this reference number:</p>
            <p className="mt-2 text-2xl font-bold text-steel-blue tracking-wider">{ref}</p>
            <p className="mt-6 text-xs text-steel-grey leading-relaxed">
              This is the Phase 1 front-end demo. Supplier matching and WhatsApp-based flow
              arrive with the CRM integration — no data leaves your browser right now.
            </p>
            <button
              onClick={() => setRef("")}
              className="mt-8 text-sm font-semibold text-steel-blue hover:underline"
            >
              Post another requirement
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 shadow-xl shadow-steel-blue/10 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-steel-navy mb-2">Product required *</label>
              <input
                required
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="e.g. Fe500D TMT Bars 12mm"
                className="w-full border border-gray-300 focus:border-steel-blue focus:ring-2 focus:ring-steel-blue/20 rounded-xl px-4 py-3 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-steel-navy mb-2">Quantity *</label>
              <input
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 5 tonnes"
                className="w-full border border-gray-300 focus:border-steel-blue focus:ring-2 focus:ring-steel-blue/20 rounded-xl px-4 py-3 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-steel-navy mb-2">
                Specifications / delivery details
              </label>
              <textarea
                rows={4}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Grade, brand preference, delivery location, timeline..."
                className="w-full border border-gray-300 focus:border-steel-blue focus:ring-2 focus:ring-steel-blue/20 rounded-xl px-4 py-3 outline-none transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-steel-blue hover:bg-steel-blue/85 text-white font-semibold py-4 rounded-xl glow transition-all hover:scale-[1.01]"
            >
              Create RFQ Reference →
            </button>
            <p className="text-[11px] text-steel-grey text-center">
              Phase 1 demo — runs entirely in your browser.
            </p>
          </form>
        )}
      </section>
    </div>
  );
}
