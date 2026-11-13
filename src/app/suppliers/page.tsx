import Link from "next/link";

export const metadata = { title: "Suppliers" };

export default function SuppliersPage() {
  return (
    <div>
      <section className="bg-steel-navy text-white grain relative overflow-hidden">
        <div className="absolute -top-20 right-0 w-[350px] h-[350px] rounded-full bg-steel-blue/25 blur-[110px]" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Verified Suppliers</h1>
          <p className="mt-4 text-slate-300 max-w-2xl">
            A directory built on precision, not volume. Every listing carries exact verification
            labels — you always know what was checked.
          </p>
        </div>
      </section>

<section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="glass-card p-6 md:p-8 bg-white border-gray-200">
          <h2 className="text-xl font-bold text-steel-navy">Supplier onboarding in progress</h2>
          <p className="mt-3 text-steel-charcoal/80 text-sm leading-relaxed max-w-2xl">
            We are deliberately not launching with a long fake list. Supplier profiles go live
            only after document collection and verification checks are complete for each business —
            starting with Burrabazar, Kolkata. If you run a steel business, you can register early.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link href="/register" className="text-center bg-steel-blue hover:bg-steel-blue/85 text-white font-semibold px-6 py-3 rounded-xl glow-sm transition-all">
              Register Your Business
            </Link>
            <Link href="/rfq" className="text-center border border-gray-300 hover:border-steel-blue text-steel-navy font-semibold px-6 py-3 rounded-xl transition-colors">
              Post a Requirement Instead
            </Link>
          </div>
        </div>

<div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            ["What &quot;Verified&quot; means here", "Exact labels per profile: phone verified, email verified, address evidence, GSTIN checked where applicable. Nothing implied."],
            ["No paid trust", "Verification is never sold. Paid plans never make a listing appear more trustworthy."],
            ["Real counts only", "The directory shows only real, auditable listings — no inflated numbers."],
          ].map(([title, text]) => (
            <div key={title} className="bg-white border border-gray-200 rounded-2xl p-6 card-hover">
              <h3 className="font-bold text-steel-navy text-sm" dangerouslySetInnerHTML={{ __html: title }} />
              <p className="mt-2 text-xs text-steel-charcoal/70 leading-relaxed" dangerouslySetInnerHTML={{ __html: text }} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
