import Link from "next/link";
import { catalog } from "@/lib/catalog";
import Hero2026 from "@/components/home/Hero2026";
import BentoFeatures from "@/components/home/BentoFeatures";
import FeaturedCategories from "@/components/home/FeaturedCategories";

const steps = [
  { no: "01", title: "Discover", text: "Find verified suppliers by product, location and category with precise verification labels." },
  { no: "02", title: "Compare", text: "Understand products, indicative rates and verification status side by side." },
  { no: "03", title: "Connect", text: "Send one structured RFQ instead of repeating yourself to every supplier." },
  { no: "04", title: "Trade", text: "Receive comparable quotations with reference numbers. Trade with clarity." },
];

export default function HomePage() {
  return (
    <div>
      {/* HERO 2026 */}
      <Hero2026 />

      <BentoFeatures />
      <FeaturedCategories />

{/* BENTO — Why Steelsetu */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        <h2 className="text-3xl md:text-4xl font-bold text-steel-navy tracking-tight">Why Steelsetu</h2>
        <p className="mt-3 text-steel-grey max-w-xl">
          Not another generic marketplace. Built around how steel actually trades in Eastern India.
        </p>

<div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2 glass-card card-hover p-8 md:p-10 bg-white">
            <h3 className="text-xl font-bold text-steel-navy">Verified Supplier Directory</h3>
            <p className="mt-3 text-steel-charcoal/80 text-sm md:text-base leading-relaxed max-w-lg">
              Every business profile carries precise verification labels showing exactly what was
              checked — phone, email, address evidence, GSTIN where applicable. No vague
              &quot;trusted seller&quot; badges, no paid trust.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Phone Verified", "Email Verified", "Address Evidence", "GSTIN Checked", "Real Counts Only"].map((t) => (
                <span key={t} className="text-xs font-medium text-steel-navy bg-steel-blue/10 border border-steel-blue/20 px-3 py-1.5 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          </div>

<div className="glass-card card-hover p-8 bg-white">
            <h3 className="text-xl font-bold text-steel-navy">Structured RFQs</h3>
            <p className="mt-3 text-sm text-steel-charcoal/80 leading-relaxed">
              Post one clear requirement. Each RFQ gets a unique reference number and comparable
              supplier quotations — no repeating yourself.
            </p>
          </div>

<div className="glass-card card-hover p-8 bg-white">
            <h3 className="text-xl font-bold text-steel-navy">Honest Indicative Rates</h3>
            <p className="mt-3 text-sm text-steel-charcoal/80 leading-relaxed">
              Market reference rates with date, unit, source and limitations. Never fake
              live prices, never presented as firm offers.
            </p>
          </div>

<div className="md:col-span-2 glass-card card-hover p-8 bg-white">
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
      </section>

{/* HOW IT WORKS */}
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

{/* CATEGORIES — now linked to real product pages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        <h2 className="text-3xl md:text-4xl font-bold text-steel-navy tracking-tight">Product Categories</h2>
        <p className="mt-3 text-steel-grey">The core catalogue for Eastern India steel trade. Click any category to open its product page.</p>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {catalog.map((c) => (
            <Link
              key={c.slug}
              href={"/products/" + c.slug}
              className="card-hover bg-white border border-gray-200 hover:border-steel-blue/50 rounded-2xl p-5 text-sm font-medium text-steel-charcoal"
            >
              <p className="font-semibold text-steel-navy text-[13px] leading-snug">{c.name}</p>
              <p className="mt-2 text-xs text-steel-charcoal/70 leading-relaxed">{c.short}</p>
              <p className="mt-3 text-xs font-semibold text-steel-blue">View details →</p>
            </Link>
          ))}
        </div>
      </section>

{/* CTA */}
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


