import Link from "next/link";
import { calculators } from "@/lib/calculators";
import { allCalcSpecs } from "@/lib/steel-calcs-extra";

export const metadata = { title: "Calculators" };

export default function CalculatorsPage() {
  const all = [
    ...calculators.map((c) => ({ slug: c.slug, title: c.title, excerpt: c.excerpt })),
    ...allCalcSpecs.map((c) => ({ slug: c.slug, title: c.title, excerpt: c.excerpt })),
  ];

return (
    <div>
      <section className="bg-steel-navy text-white grain relative overflow-hidden">
        <div className="absolute -top-20 left-1/3 w-[350px] h-[350px] rounded-full bg-steel-blue/25 blur-[110px]" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Trade Calculators</h1>
          <p className="mt-4 text-slate-300 max-w-2xl">
            29 honest estimation tools for weights, quantities, coverage, costs and business
            decisions - with formulas, units and limitations stated clearly.
          </p>
        </div>
      </section>

<section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {all.map((c) => (
            <Link key={c.slug} href={"/calculators/" + c.slug} className="bg-white border border-gray-200 rounded-3xl p-7 card-hover">
              <h2 className="text-base font-bold text-steel-navy leading-snug">{c.title}</h2>
              <p className="mt-3 text-xs text-steel-charcoal/70 leading-relaxed">{c.excerpt}</p>
              <p className="mt-4 text-xs font-semibold text-steel-blue">Open calculator →</p>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-xs text-steel-grey leading-relaxed">
          All calculators show their formula and assumptions and give theoretical or estimated
          figures for planning. They are not billing documents, and no output is certified
          structural or engineering design. Final quantities and rates are confirmed with
          suppliers and your technical advisor.
        </p>
      </section>
    </div>
  );
}
