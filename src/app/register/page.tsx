export const metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <div>
      <section className="bg-steel-navy text-white grain relative overflow-hidden">
        <div className="absolute -top-20 right-0 w-[350px] h-[350px] rounded-full bg-steel-blue/25 blur-[110px]" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Register Your Business</h1>
          <p className="mt-4 text-slate-300 max-w-2xl">
            Suppliers join the directory through verification — never by paying for trust.
          </p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10">
          <h2 className="text-xl font-bold text-steel-navy">Verification-first onboarding</h2>
          <p className="mt-3 text-sm text-steel-charcoal/80 leading-relaxed">
            Business registration opens with the supplier onboarding phase. Each profile goes live
            only after document collection and verification checks — exact labels, real evidence.
            This is how the directory stays trustworthy from day one.
          </p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {["Phone", "Email", "Address", "GSTIN"].map((v) => (
              <div key={v} className="text-center text-xs font-medium text-steel-navy bg-steel-blue/10 border border-steel-blue/20 rounded-xl py-3">
                {v} check
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
