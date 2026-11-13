import Link from "next/link";
import { brands } from "@/lib/brands";

export const metadata = { title: "Brands — Steelsetu" };

export default function BrandsPage() {
  return (
    <div>
      <section className="bg-steel-navy text-white grain relative overflow-hidden">
        <div className="absolute -top-20 right-0 w-[350px] h-[350px] rounded-full bg-indigo-500/20 blur-[110px]" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Brand Directory</h1>
          <p className="mt-4 text-slate-300 max-w-2xl">
            Steel brands traded in Burrabazar and Eastern India — information-level listings with honest verification status.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs">
            <span className="bg-white/10 border border-white/15 rounded-full px-3 py-1">{brands.length} brands</span>
            <span className="bg-white/10 border border-white/15 rounded-full px-3 py-1">Verification: pending</span>
          </div>
        </div>
      </section>

<section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {brands.map((b) => (
            <Link key={b.slug} href={"/brands/" + b.slug} className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-bold text-steel-navy group-hover:text-steel-blue">{b.name}</h2>
                <span className="text-[10px] font-bold uppercase tracking-wide bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-2 py-0.5">Info listing</span>
              </div>
              <p className="mt-1 text-xs text-slate-400">{b.hq}</p>
              <p className="mt-3 text-sm text-steel-charcoal/80 leading-relaxed">{b.about}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {b.groups.slice(0, 3).map((g) => (
                  <span key={g} className="text-[10px] font-semibold bg-slate-100 text-slate-600 rounded-full px-2 py-1">{g}</span>
                ))}
                {b.groups.length > 3 && <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 rounded-full px-2 py-1">+{b.groups.length - 3} more</span>}
              </div>
            </Link>
          ))}
        </div>

<div className="mt-10 bg-white border border-gray-200 rounded-3xl p-8">
          <h2 className="text-xl font-bold text-steel-navy">How brand pages work on Steelsetu</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              ["Evidence first", "A verified badge appears only after the brand-supplier relationship is documented and reviewed."],
              ["Correct mapping", "A seller listing a brand never implies the brand manufactures or authorises them."],
              ["Trademark respect", "All trademarks belong to their owners. Steelsetu is an independent platform."],
            ].map(([title, text]) => (
              <div key={title} className="border border-gray-200 rounded-2xl p-5">
                <h3 className="text-sm font-bold text-steel-navy">{title}</h3>
                <p className="mt-2 text-xs text-steel-charcoal/70 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
          <Link href="/register" className="inline-block mt-6 bg-steel-blue hover:bg-steel-blue/85 text-white font-semibold px-6 py-3 rounded-xl glow-sm transition-all">
            Register Your Business →
          </Link>
        </div>
      </section>
    </div>
  );
}
