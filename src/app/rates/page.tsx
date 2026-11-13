export const metadata = { title: "Indicative Rates" };

export default function RatesPage() {
  return (
    <div>
      <section className="bg-steel-navy text-white grain relative overflow-hidden">
        <div className="absolute -top-20 right-0 w-[350px] h-[350px] rounded-full bg-steel-blue/25 blur-[110px]" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Indicative Rates</h1>
          <p className="mt-4 text-slate-300 max-w-2xl">
            Market reference rates — with date, unit, source and limitations always stated.
          </p>
        </div>
      </section>

<section className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-8">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 shrink-0 w-8 h-8 rounded-full bg-amber-100 grid place-items-center text-amber-600 font-bold text-sm">!</span>
            <div>
              <h2 className="font-bold text-steel-navy">Rates table coming with verified sources</h2>
              <p className="mt-2 text-sm text-steel-charcoal/80 leading-relaxed">
                Steelsetu will never show auto-generated or guessed prices. The rates table goes live
                only when each figure can carry a real date, unit, source and known limitations.
                Indicative rates are references — always confirm final rates directly with suppliers.
              </p>
            </div>
          </div>
        </div>

<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            ["No fake live tickers", "We would rather show an honest empty table than a fake live price."],
            ["Always dated", "Every rate row will show the as-on date and unit clearly."],
            ["Source stated", "Indicative, dealer-reported or published — the source is named."],
            ["Never firm offers", "Rates are market references, not commitments from suppliers."],
          ].map(([title, text]) => (
            <div key={title} className="bg-white border border-gray-200 rounded-2xl p-6 card-hover">
              <h3 className="font-bold text-steel-navy text-sm">{title}</h3>
              <p className="mt-2 text-xs text-steel-charcoal/70 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
