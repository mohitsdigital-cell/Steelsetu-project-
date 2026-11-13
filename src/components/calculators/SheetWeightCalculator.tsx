"use client";
import { useState } from "react";
import { STEEL_DENSITY } from "@/lib/calculators";

export default function SheetWeightCalculator() {
  const [thickness, setThickness] = useState<string>("0.5");
  const [width, setWidth] = useState<string>("1.22");
  const [length, setLength] = useState<string>("2.44");
  const [sheets, setSheets] = useState<string>("1");
  const [rate, setRate] = useState<string>("");

const t = Number(thickness) || 0;
  const w = Number(width) || 0;
  const l = Number(length) || 0;
  const n = Number(sheets) || 0;

// Weight (kg) = thickness(mm) x width(m) x length(m) x density(7.85)
  const kgPerSheet = t * w * l * STEEL_DENSITY;
  const totalKg = kgPerSheet * n;
  const totalTonne = totalKg / 1000;
  const rateNum = Number(rate) || 0;
  const estValue = rateNum > 0 ? totalTonne * rateNum : null;

return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold text-steel-navy">Steel Sheet Weight Calculator</h1>
      <p className="mt-3 text-sm text-steel-charcoal/80 leading-relaxed">
        Theoretical weight of flat steel sheets (GI, GP, PPGI, PPGL, plain CR/HR) using thickness
        &times; width &times; length &times; 7.85 density. For GC (corrugated) sheets the profile
        adds a small forming allowance - treat results as estimates.
      </p>

<div className="mt-8 bg-white border border-gray-200 rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-steel-navy">Thickness (mm)</label>
          <input type="number" min="0" step="0.01" value={thickness} onChange={(e) => setThickness(e.target.value)}
            className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-steel-blue" />
        </div>
        <div>
          <label className="text-xs font-semibold text-steel-navy">Width (metres)</label>
          <input type="number" min="0" step="0.01" value={width} onChange={(e) => setWidth(e.target.value)}
            className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-steel-blue" />
        </div>
        <div>
          <label className="text-xs font-semibold text-steel-navy">Length (metres)</label>
          <input type="number" min="0" step="0.01" value={length} onChange={(e) => setLength(e.target.value)}
            className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-steel-blue" />
        </div>
        <div>
          <label className="text-xs font-semibold text-steel-navy">Number of sheets</label>
          <input type="number" min="1" step="1" value={sheets} onChange={(e) => setSheets(e.target.value)}
            className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-steel-blue" />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-semibold text-steel-navy">Indicative rate per tonne (optional)</label>
          <input type="number" min="0" step="100" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g. 62000"
            className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-steel-blue" />
        </div>
      </div>

<div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          ["Per sheet", kgPerSheet.toFixed(2) + " kg"],
          ["Total (" + n + " sheets)", totalKg.toFixed(1) + " kg"],
          ["Total tonnes", totalTonne.toFixed(4) + " t"],
        ].map(([label, val]) => (
          <div key={label} className="bg-steel-navy text-white rounded-2xl p-6 relative overflow-hidden grain">
            <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-steel-blue/30 blur-[50px]" aria-hidden />
            <div className="relative">
              <p className="text-[11px] text-slate-300 uppercase tracking-wide">{label}</p>
              <p className="mt-2 text-xl font-bold">{val}</p>
            </div>
          </div>
        ))}
      </div>

{estValue !== null && (
        <div className="mt-4 bg-white border border-gray-200 rounded-2xl p-6">
          <p className="text-sm text-steel-charcoal/85">
            Estimated value at Rs {Number(rate).toLocaleString("en-IN")}/tonne:{" "}
            <strong className="text-steel-navy">Rs {estValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</strong>
          </p>
        </div>
      )}

<p className="mt-6 text-xs text-steel-grey leading-relaxed border-t border-gray-200 pt-5">
        Theoretical weights only. Actual weights vary with coating thickness, profile and rolling
        tolerance - confirm with supplier documents. Rates are indicative references, not offers.
      </p>
    </div>
  );
}
