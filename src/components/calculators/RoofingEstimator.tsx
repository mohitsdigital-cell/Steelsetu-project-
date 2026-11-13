"use client";
import { useState } from "react";

export default function RoofingEstimator() {
  const [lengthM, setLengthM] = useState<string>("10");
  const [widthM, setWidthM] = useState<string>("6");
  const [sheetW, setSheetW] = useState<string>("1.0");
  const [overlapM, setOverlapM] = useState<string>("0.15");
  const [slopePct, setSlopePct] = useState<string>("10");

const L = Number(lengthM) || 0;
  const W = Number(widthM) || 0;
  const sw = Number(sheetW) || 0;
  const ov = Number(overlapM) || 0;
  const slope = Number(slopePct) || 0;

const roofArea = L * W * (1 + slope / 100); // slope allowance
  const effectiveWidth = sw - ov;
  const rowsAlongWidth = effectiveWidth > 0 ? Math.ceil(W / effectiveWidth) : 0;
  const sheetsPerRow = Math.ceil(L / sw); // sheets laid along length, same length unit
  const totalSheets = rowsAlongWidth * sheetsPerRow;
  const screws = totalSheets * rowsAlongWidth > 0 ? Math.ceil(totalSheets * 6) : 0; // rough: ~6 screws per sheet edge run

const stats: [string, string][] = [
    ["Roof area (with slope)", roofArea.toFixed(1) + " m2"],
    ["Effective sheet width", effectiveWidth.toFixed(2) + " m"],
    ["Rows across width", String(rowsAlongWidth)],
    ["Sheets per row", String(sheetsPerRow)],
    ["Total sheets needed", String(totalSheets)],
    ["Roofing screws (rough)", String(screws)],
  ];

return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold text-steel-navy">Roofing Sheet Estimator</h1>
      <p className="mt-3 text-sm text-steel-charcoal/80 leading-relaxed">
        Estimate how many roofing sheets a job needs, accounting for side-lap overlap and roof
        slope. Get your fabricator to confirm the final cutting plan - profile, purlin spacing
        and ridge details change real consumption.
      </p>

<div className="mt-8 bg-white border border-gray-200 rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-steel-navy">Roof length (m)</label>
          <input type="number" min="0" step="0.1" value={lengthM} onChange={(e) => setLengthM(e.target.value)}
            className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-steel-blue" />
        </div>
        <div>
          <label className="text-xs font-semibold text-steel-navy">Roof width (m)</label>
          <input type="number" min="0" step="0.1" value={widthM} onChange={(e) => setWidthM(e.target.value)}
            className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-steel-blue" />
        </div>
        <div>
          <label className="text-xs font-semibold text-steel-navy">Sheet cover width (m)</label>
          <input type="number" min="0" step="0.01" value={sheetW} onChange={(e) => setSheetW(e.target.value)}
            className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-steel-blue" />
        </div>
        <div>
          <label className="text-xs font-semibold text-steel-navy">Side-lap overlap (m)</label>
          <input type="number" min="0" step="0.01" value={overlapM} onChange={(e) => setOverlapM(e.target.value)}
            className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-steel-blue" />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-semibold text-steel-navy">Roof slope allowance (%)</label>
          <input type="number" min="0" step="1" value={slopePct} onChange={(e) => setSlopePct(e.target.value)}
            className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-steel-blue" />
          <p className="mt-1 text-[11px] text-steel-grey">Sloped roofs need more sheet than the flat footprint. 0% for a truly flat cover.</p>
        </div>
      </div>

<div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.slice(0, 3).map(([label, val]) => (
          <div key={label} className="bg-steel-navy text-white rounded-2xl p-6 relative overflow-hidden grain">
            <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-steel-blue/30 blur-[50px]" aria-hidden />
            <div className="relative">
              <p className="text-[11px] text-slate-300 uppercase tracking-wide">{label}</p>
              <p className="mt-2 text-xl font-bold">{val}</p>
            </div>
          </div>
        ))}
      </div>

<div className="mt-4 bg-white border border-gray-200 rounded-2xl p-6">
        {stats.slice(3).map(([label, val]) => (
          <p key={label} className="text-sm text-steel-charcoal/85 py-1 border-b border-gray-100 last:border-0">
            {label}: <strong className="text-steel-navy">{val}</strong>
          </p>
        ))}
      </div>

<p className="mt-6 text-xs text-steel-grey leading-relaxed border-t border-gray-200 pt-5">
        Estimate only - for planning, not a cutting list. Actual sheet count depends on profile,
        direction of laying, end laps, ridge and gutter details. Confirm quantities with your
        supplier or fabricator before ordering.
      </p>
    </div>
  );
}
