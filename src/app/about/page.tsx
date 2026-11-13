export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div>
      <section className="bg-steel-navy text-white grain relative overflow-hidden">
        <div className="absolute -top-20 right-0 w-[350px] h-[350px] rounded-full bg-steel-blue/25 blur-[110px]" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">About Steelsetu</h1>
          <p className="mt-4 text-slate-300 max-w-2xl">
            Digitising how Burrabazar actually trades — not forcing it into a generic e-commerce mould.
          </p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-6">
        <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 card-hover">
          <h2 className="text-xl font-bold text-steel-navy">Born in Burrabazar</h2>
          <p className="mt-3 text-sm text-steel-charcoal/80 leading-relaxed">
            Steelsetu begins with the real trading environment of Burrabazar, Kolkata — where
            relationships, phone calls, WhatsApp, references and negotiated quotations are how
            business actually gets done. We organise those behaviours digitally instead of
            replacing them with an unfamiliar system.
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 card-hover">
          <h2 className="text-xl font-bold text-steel-navy">Our promise</h2>
          <ul className="mt-3 space-y-2 text-sm text-steel-charcoal/80 list-disc pl-5">
            <li>Only real, auditable listings and counts</li>
            <li>Verification that is never sold or implied by payment</li>
            <li>Indicative rates with honest limitations, never fake prices</li>
            <li>One integrated, mobile-first platform built in phases</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
