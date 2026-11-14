import Link from "next/link";
import { catalog } from "@/lib/catalog";
import { brands } from "@/lib/brands";
import Hero2026 from "@/components/home/Hero2026";
import BentoFeatures from "@/components/home/BentoFeatures";
import FeaturedCategories from "@/components/home/FeaturedCategories";

const steps = [
  { no: "01", title: "Discover", text: "Find verified suppliers by product, location and category with precise verification labels." },
  { no: "02", title: "Compare", text: "Understand products, indicative rates and verification status side by side." },
  { no: "03", title: "Connect", text: "Send one structured RFQ instead of repeating yourself to every supplier." },
  { no: "04", title: "Trade", text: "Receive comparable quotations with reference numbers. Trade with clarity." },
];

const stats = [
  { num: "26+", label: "Product Categories" },
  { num: "14", label: "Top Brands" },
  { num: "26+", label: "Trade Calculators" },
  { num: "100%", label: "Free Core Tools" },
];

const trustChips = [
  "Phone Verified",
  "Email Verified",
  "Address Evidence",
  "GSTIN Checked",
  "Real Counts Only",
];

export default function HomePage() {
  return (
    <div>
      {/* HERO 2026 */}
      <Hero2026 />

      {/* STATS STRIP — quick evergreen trust numbers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="ss-soft-card p-4 text-center">
              <p className="ss-stat-num text-2xl md:text-3xl">{s.num}</p>
              <p className="mt-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <BentoFeatures />

      {/* WHY STEELSETU — soft evergreen cards */}
      <section className="ss-soft-section py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="ss-kicker">Why Steelsetu</p>
          <h2 className="ss-evergreen-h2 mt-2 text-3xl md:text-4xl">Not another generic marketplace</h2>
          <p className="mt-3 text-slate-500 max-w-xl">
            Built around how steel actually trades in Eastern India — Burrabazar-first, mobile-first, tools-first.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-2 ss-soft-card p-8 md:p-10">
              <h3 className="text-xl font-bold text-steel-navy">Verified Supplier Directory</h3>
              <p className="mt-3 text-steel-charcoal/80 text-sm md:text-base leading-relaxed max-w-lg">
                Every business profile carries precise verification labels showing exactly what was
                checked — phone, email, address evidence, GSTIN where applicable. No vague
                &quot;trusted seller&quot; badges, no paid trust.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {trustChips.map((t) => (
                  <span key={t} className="text-xs font-medium text-steel-navy bg-steel-blue/10 border border-steel-blue/20 px-3 py-1.5 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="ss-soft-card p-8">
              <h3 className="text-xl font-bold text-steel-navy">Structured RFQs</h3>
              <p className="mt-3 text-sm text-steel-charcoal/80 leading-relaxed">
                Post one clear requirement. Each RFQ gets a unique reference number and comparable
                supplier quotations — no repeating yourself.
              </p>
              <Link href="/rfq" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-steel-blue hover:gap-2 transition-all">
                Post an RFQ →
              </Link>
            </div>

            <div className="ss-soft-card p-8">
              <h3 className="text-xl font-bold text-steel-navy">Honest Indicative Rates</h3>
              <p className="mt-3 text-sm text-steel-charcoal/80 leading-relaxed">
                Market reference rates with date, unit, source and limitations. Never fake
                live prices, never presented as firm offers.
              </p>
            </div>

            <div className="md:col-span-2 ss-soft-card p-8">
              <h3 className="text-xl font-bold text-steel-navy">Practical Trade Tools</h3>
              <p className="mt-3 text-sm text-steel-charcoal/80 leading-relaxed max-w-lg">
                Working TMT weight calculator, sheet weight calculator, roofing coverage estimators
                and trade knowledge written for real Burrabazar-style trading.
              </p>
              <Link href="/calculators" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-steel-blue hover:gap-2 transition-all">
                Try the Calculators →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — navy + gradient numbers, evergreen */}
      <section className="bg-steel-navy text-white relative overflow-hidden grain">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-steel-blue/20 blur-[120px]" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How It Works</h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.no} className="glass-card card-hover p-7">
                <p className="text-4xl font-bold text-gradient">{s.no}</p>
                <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedCategories />

      {/* BRANDS STRIP — evergreen brand trust */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 md:pb-28">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="ss-kicker">Brand Directory</p>
            <h2 className="ss-evergreen-h2 mt-2 text-3xl md:text-4xl">Top Brands in Burrabazar Trade</h2>
            <p className="mt-3 text-slate-500 max-w-xl">
              Information-level brand directory — verification of brand-supplier relationships is in progress.
            </p>
          </div>
          <Link href="/brands" className="text-sm font-semibold text-steel-blue hover:gap-2 inline-flex items-center gap-1 transition-all">
            All brands →
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {brands.slice(0, 7).map((b) => (
            <Link key={b.slug} href={"/brands/" + b.slug} className="ss-soft-card p-5 text-center">
              <p className="font-bold text-sm text-steel-navy">{b.name}</p>
              <p className="mt-1 text-[11px] text-slate-500">{b.hq}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CATEGORIES — now linked to real product pages */}
      <section className="ss-soft-section py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="ss-kicker">Full Catalogue</p>
          <h2 className="ss-evergreen-h2 mt-2 text-3xl md:text-4xl">Product Categories</h2>
          <p className="mt-3 text-slate-500">The core catalogue for Eastern India steel trade. Click any category to open its product page.</p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {catalog.map((c) => (
              <Link
                key={c.slug}
                href={"/products/" + c.slug}
                className="ss-soft-card p-5 text-sm font-medium text-steel-charcoal"
              >
                <p className="font-semibold text-steel-navy text-[13px] leading-snug">{c.name}</p>
                <p className="mt-2 text-xs text-steel-charcoal/70 leading-relaxed">{c.short}</p>
                <p className="mt-3 text-xs font-semibold text-steel-blue">View details →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — evergreen clean gradient CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        <div className="relative bg-steel-navy text-white rounded-3xl p-10 md:p-16 text-center overflow-hidden grain">
          <div className="absolute -top-20 left-1/4 w-[300px] h-[300px] rounded-full bg-steel-blue/25 blur-[100px] animate-pulse-slow" aria-hidden />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Have a steel requirement?</h2>
            <p className="mt-4 text-slate-300 max-w-xl mx-auto">
              Submit a structured RFQ once. Receive comparable quotations from relevant suppliers.
            </p>
            <Link
              href="/rfq"
              className="inline-block mt-8 bg-steel-blue hover:bg-steel-blue/85 font-semibold px-8 py-4 rounded-2xl glow transition-all hover:scale-[1.03]"
            >
              Post Your Requirement →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}