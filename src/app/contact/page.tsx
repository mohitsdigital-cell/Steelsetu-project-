export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div>
      <section className="bg-steel-navy text-white grain relative overflow-hidden">
        <div className="absolute -top-20 left-1/3 w-[350px] h-[350px] rounded-full bg-steel-blue/25 blur-[110px]" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Contact</h1>
          <p className="mt-4 text-slate-300 max-w-2xl">
            Talk to the Steelsetu team about suppliers, requirements or partnerships.
          </p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10">
          <h2 className="text-xl font-bold text-steel-navy">Operating context</h2>
          <p className="mt-3 text-sm text-steel-charcoal/80 leading-relaxed">
            Steelsetu operates from the environment of Singhi Enterprises, Burrabazar, Kolkata.
            Direct contact channels (phone, WhatsApp, email) go live with the verified supplier
            onboarding phase.
          </p>
          <p className="mt-4 text-sm text-steel-charcoal/80">
            Until then, register your business or post a requirement and it will be picked up
            in the onboarding sequence.
          </p>
        </div>
      </section>
    </div>
  );
}
