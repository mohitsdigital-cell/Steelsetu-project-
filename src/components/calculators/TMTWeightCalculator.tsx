"use client";
import { useEffect, useState } from "react";
import { TMT_SIZES } from "@/lib/calculators";

export default function TMTWeightCalculator() {
  const [dia, setDia] = useState<number>(12);
  const [lengthM, setLengthM] = useState<number>(12);
  const [pieces, setPieces] = useState<number>(1);
  const [rate, setRate] = useState<string>("");

const kgPerM = dia * dia / 162;
  const kgPerBar = kgPerM * lengthM;
  const totalKg = kgPerBar * pieces;
  const totalTonne = totalKg / 1000;
  const rateNum = Number(rate) || 0;
  const estValue = rateNum > 0 ? totalTonne * rateNum : null;

return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold text-steel-navy">TMT Bar Weight Calculator</h1>
      <p className="mt-3 text-sm text-steel-charcoal/80 leading-relaxed">
        Theoretical weight for TMT bars using the standard formula: weight per metre = d&sup2; / 162,
        where d is diameter in millimetres. Useful for estimation only.
      </p>

<div className="mt-8 bg-white border border-gray-200 rounded-3xl p-8">
        <label className="text-xs font-semibold text-steel-navy">Diameter (mm)</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {TMT_SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setDia(s)}
              className={"text-sm font-semibold px-4 py-2 rounded-xl border transition-all " + (dia === s ? "bg-steel-blue text-white border-steel-blue" : "bg-white text-steel-navy border-gray-300 hover:border-steel-blue")}
            >
              {s}mm
            </button>
          ))}
        </div>

<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-steel-navy">Length per bar (metres)</label>
            <input
              type="number" min="1" step="0.5" value={lengthM}
              onChange={(e) => setLengthM(Number(e.target.value) || 0)}
              className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-steel-blue"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-steel-navy">Number of bars / pieces</label>
            <input
              type="number" min="1" step="1" value={pieces}
              onChange={(e) => setPieces(Number(e.target.value) || 0)}
              className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-steel-blue"
            />
          </div>
        </div>

<div className="mt-6">
          <label className="text-xs font-semibold text-steel-navy">Indicative rate per tonne (optional)</label>
          <input
            type="number" min="0" step="100" value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="e.g. 51000"
            className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-steel-blue"
          />
        </div>
      </div>

<div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          ["Per metre", kgPerM.toFixed(3) + " kg/m"],
          ["Per bar (" + lengthM + "m)", kgPerBar.toFixed(2) + " kg"],
          ["Total (" + pieces + " bars)", totalKg.toFixed(1) + " kg" + (totalKg >= 1000 ? "" : "")],
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

<div className="mt-4 bg-white border border-gray-200 rounded-2xl p-6">
        <p className="text-sm text-steel-charcoal/85">
          Total weight: <strong className="text-steel-navy">{totalKg.toFixed(1)} kg</strong>
          {" "}({totalTonne.toFixed(4)} tonnes)
        </p>
        {estValue !== null && (
          <p className="mt-2 text-sm text-steel-charcoal/85">
            Estimated value at Rs {Number(rate).toLocaleString("en-IN")}/tonne:{" "}
            <strong className="text-steel-navy">Rs {estValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</strong>
          </p>
        )}
      </div>

<p className="mt-6 text-xs text-steel-grey leading-relaxed border-t border-gray-200 pt-5">
        Theoretical weights only. Actual delivered weight can differ due to rolling tolerances -
        verify against weighment slips. Rates are indicative references, not offers. Confirm
        final rates with suppliers.
      </p>
    </div>
  );
}
