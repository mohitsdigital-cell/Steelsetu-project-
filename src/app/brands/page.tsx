import Link from "next/link";

export const metadata = { title: "Brands" };

export default function BrandsPage() {
  return (
    <div>
      <section className="bg-steel-navy text-white grain relative overflow-hidden">
        <div className="absolute -top-20 right-0 w-[350px] h-[350px] rounded-full bg-indigo-500/20 blur-[110px]" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Brand Directory</h1>
          <p className="mt-4 text-slate-300 max-w-2xl">
            Accurate brand information with verified brand-supplier relationships — never guessed.
          </p>
        </div>
      </section>

<section className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
        <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10">
          <h2 className="text-xl font-bold text-steel-navy">Brand pages publish after verification</h2>
          <p className="mt-3 text-sm text-steel-charcoal/80 leading-relaxed">
            A brand page on Steelsetu appears only after the brand-supplier relationship is
            evidenced and reviewed. We never imply ownership, manufacturing or authorisation
            without documented proof.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              ["Evidence first", "Authorisation or relationship documents reviewed before a brand page goes live."],
              ["Correct mapping", "A seller listing a brand never implies the brand manufactures or authorises them."],
              ["Trademark respect", "All trademarks belong to their owners. Steelsetu is an independent platform."],
            ].map(([title, text]) => (
              <div key={title} className="border border-gray-200 rounded-2xl p-5">
                <h3 className="text-sm font-bold text-steel-navy">{title}</h3>
                <p className="mt-2 text-xs text-steel-charcoal/70 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
          <Link
            href="/register"
            className="inline-block mt-8 bg-steel-blue hover:bg-steel-blue/85 text-white font-semibold px-6 py-3 rounded-xl glow-sm transition-all"
          >
            Register Your Business →
          </Link>
        </div>
      </section>
    </div>
  );
}
