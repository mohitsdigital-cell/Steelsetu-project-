"use client";
import { useMemo, useState } from "react";
import { calcDisclaimer, type CalcSpec } from "@/lib/steel-calcs";
import { allCalcSpecs } from "@/lib/steel-calcs-extra";

export default function SteelCalcForm({ slug }: { slug: string }) {
  const spec: CalcSpec | undefined = allCalcSpecs.find((c) => c.slug === slug);

const [vals, setVals] = useState<Record<string, string>>(() =>
    Object.fromEntries((spec ? spec.fields : []).map((f) => [f.key, String(f.def)]))
  );
  const [copied, setCopied] = useState(false);

const { valid, numbers, errors } = useMemo(() => {
    const numbers: Record<string, number> = {};
    const errors: Record<string, boolean> = {};
    let valid = true;
    if (!spec) return { valid: false, numbers, errors };
    for (const f of spec.fields) {
      const n = Number(vals[f.key]);
      if (vals[f.key] === undefined || String(vals[f.key]).trim() === "" || isNaN(n) || n < f.min) {
        valid = false;
        errors[f.key] = true;
      }
      numbers[f.key] = isNaN(n) ? 0 : n;
    }
    return { valid, numbers, errors };
  }, [vals, spec]);

if (!spec) return null;

const results = valid ? spec.compute(numbers) : [];

function copy() {
    if (!spec) return;
    const text =
      spec.title + " (estimate)\n" +
      "Inputs: " + spec.fields.map((f) => f.label + " = " + vals[f.key] + " " + f.unit).join(", ") + "\n" +
      "Formula: " + spec.formulaText + "\n" +
      "Results:\n" + results.map(([l, v]) => "  " + l + ": " + v).join("\n") + "\n" +
      "Estimate for planning only - Steelsetu";
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold text-steel-navy">{spec.title}</h1>
      <p className="mt-3 text-sm text-steel-charcoal/80 leading-relaxed">{spec.excerpt}</p>

<div className="mt-6 bg-steel-blue/5 border border-steel-blue/20 rounded-2xl p-5">
        <p className="text-[11px] font-bold text-steel-blue uppercase tracking-wide">Formula &amp; assumptions</p>
        <p className="mt-2 text-xs text-steel-charcoal/85 leading-relaxed">{spec.formulaText}</p>
      </div>

<div className="mt-6 bg-white border border-gray-200 rounded-3xl p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {spec.fields.map((f) => (
            <div key={f.key}>
              <label className="text-xs font-semibold text-steel-navy">
                {f.label} <span className="text-steel-grey font-normal">({f.unit})</span>
              </label>
              <input
                type="number"
                value={vals[f.key]}
                onChange={(e) => setVals({ ...vals, [f.key]: e.target.value })}
                className={"mt-2 w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none " + (errors[f.key] ? "border-red-400 focus:border-red-400" : "border-gray-300 focus:border-steel-blue")}
              />
              {errors[f.key] && (
                <p className="mt-1 text-[11px] text-red-500">Enter a number of at least {f.min} {f.unit}.</p>
              )}
            </div>
          ))}
        </div>
      </div>

{results.length > 0 && (
        <>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {results.slice(0, 3).map(([label, val]) => (
              <div key={label} className="bg-steel-navy text-white rounded-2xl p-6 relative overflow-hidden grain">
                <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-steel-blue/30 blur-[50px]" aria-hidden />
                <div className="relative">
                  <p className="text-[11px] text-slate-300 uppercase tracking-wide">{label}</p>
                  <p className="mt-2 text-lg font-bold break-words">{val}</p>
                </div>
              </div>
            ))}
          </div>

{results.length > 3 && (
            <div className="mt-4 bg-white border border-gray-200 rounded-2xl p-6">
              {results.slice(3).map(([label, val]) => (
                <p key={label} className="text-sm text-steel-charcoal/85 py-1.5 border-b border-gray-100 last:border-0">
                  {label}: <strong className="text-steel-navy">{val}</strong>
                </p>
              ))}
            </div>
          )}

<button
            onClick={copy}
            className="mt-4 bg-steel-blue hover:bg-steel-blue/85 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
          >
            {copied ? "Copied!" : "Copy results"}
          </button>
        </>
      )}

<p className="mt-4 inline-block text-[11px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
        Estimate only - not certified design
      </p>

{spec.notes && (
        <p className="mt-4 text-xs text-steel-charcoal/75 leading-relaxed border-t border-gray-200 pt-4">{spec.notes}</p>
      )}
      <p className="mt-4 text-[11px] text-steel-grey leading-relaxed">{calcDisclaimer}</p>
    </div>
  );
}

