import Link from "next/link";

export const metadata = { title: "Trust & Market Feedback" };

const pillars = [
  ["Business reviews & ratings", "Reviews with disclosed reviewer roles — buyer, supplier, partner — and moderation before publication."],
  ["Right of reply", "Every reviewed business can respond publicly, request corrections and appeal decisions."],
  ["Private report channel", "Serious concerns go to authorised staff privately. Evidence is never published by default."],
  ["No paid trust", "Positive reviews are never sold. Legitimate criticism is never removed for payment."],
];

export default function TrustPage() {
  return (
    <div>
      <section className="bg-steel-navy text-white grain relative overflow-hidden">
        <div className="absolute -top-20 left-1/3 w-[350px] h-[350px] rounded-full bg-steel-blue/25 blur-[110px]" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Trust &amp; Market Feedback</h1>
          <p className="mt-4 text-slate-300 max-w-2xl">
            Fair, moderated business feedback — inside Steelsetu, never a separate complaint site.
          </p>
        </div>
      </section>

<section className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10">
          <h2 className="text-xl font-bold text-steel-navy">Reviews activate with verified accounts</h2>
          <p className="mt-3 text-sm text-steel-charcoal/80 leading-relaxed">
            Written reviews, ratings and market conduct notes go live together with the accounts
            phase — with moderation, right of reply, appeals and a grievance process already in
            place. We will not launch an unmoderated feedback wall.
          </p>
          <Link href="/review-policy" className="inline-block mt-6 text-sm font-semibold text-steel-blue hover:underline">
            Read the Review Policy →
          </Link>
        </div>

<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pillars.map(([title, text]) => (
            <div key={title} className="bg-white border border-gray-200 rounded-2xl p-6 card-hover">
              <h3 className="font-bold text-steel-navy text-sm">{title}</h3>
              <p className="mt-2 text-xs text-steel-charcoal/70 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

<div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-steel-navy">Disclaimer</h3>
          <p className="mt-2 text-xs text-steel-charcoal/80 leading-relaxed">
            Reviews and market feedback reflect individual experiences and the information
            available to Steelsetu at the time of publication. They are not guarantees of future
            performance, financial standing, product quality or transaction outcomes. Steelsetu
            applies moderation and provides a right-of-reply process, but users should conduct
            their own commercial due diligence.
          </p>
        </div>
      </section>
    </div>
  );
}
