import Link from "next/link";
import { articles } from "@/lib/articles";

export const metadata = { title: "Knowledge" };

export default function KnowledgePage() {
  return (
    <div>
      <section className="bg-steel-navy text-white grain relative overflow-hidden">
        <div className="absolute -top-20 left-0 w-[350px] h-[350px] rounded-full bg-steel-blue/25 blur-[110px]" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Trade Knowledge</h1>
          <p className="mt-4 text-slate-300 max-w-2xl">
            Plain-language guides written for real trading. Every article states its limitations.
          </p>
        </div>
      </section>

<section className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={"/knowledge/" + a.slug}
              className="bg-white border border-gray-200 rounded-3xl p-7 card-hover"
            >
              <p className="text-[11px] font-medium text-steel-blue uppercase tracking-wide">Reviewed {a.reviewed}</p>
              <h2 className="mt-2 text-base font-bold text-steel-navy leading-snug">{a.title}</h2>
              <p className="mt-3 text-xs text-steel-charcoal/70 leading-relaxed">{a.excerpt}</p>
              <p className="mt-4 text-xs font-semibold text-steel-blue">Read article →</p>
            </Link>
          ))}
        </div>

<div className="mt-10 bg-white border border-gray-200 rounded-3xl p-8">
          <h2 className="text-lg font-bold text-steel-navy">More articles in preparation</h2>
          <p className="mt-3 text-sm text-steel-charcoal/80 leading-relaxed">
            Upcoming: reading mill test certificates, GC sheet profile and thickness basics,
            GST and freight fields in quotations, and roofing accessory selection. Published
            only after fact-checking.
          </p>
        </div>
      </section>
    </div>
  );
}
