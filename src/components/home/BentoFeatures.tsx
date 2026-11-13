import Link from "next/link";

const QUADS = [
  { cls: "q-tl", title: "TMT Bars & Rebar", href: "/products" },
  { cls: "q-tr", title: "GI / PPGL Coils", href: "/products" },
  { cls: "q-bl", title: "Roofing Sheets", href: "/products" },
  { cls: "q-br", title: "Structural Steel", href: "/products" },
];

const SERVICES = [
  { icon: "🧮", title: "26+ Calculators", href: "/calculators" },
  { icon: "🧾", title: "Bill Maker", href: "/bill-maker" },
  { icon: "📊", title: "Indicative Rates", href: "/rates" },
  { icon: "🏭", title: "Suppliers", href: "/suppliers" },
  { icon: "💬", title: "Community", href: "/community" },
];

export default function BentoFeatures() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1B2B]">Featured Categories</h2>
      <p className="mt-1 text-sm text-slate-500">Burrabazar ke top traded products</p>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {QUADS.map((q) => (
          <Link key={q.title} href={q.href} className="group relative rounded-2xl overflow-hidden aspect-square shadow-md">
            {/* Single 2x2 photo sliced into quadrants */}
            <img
              src="https://d3p662obnq9uz2.cloudfront.net/generated-images/8b1914e0.webp"
              alt={q.title}
              className={`quad-img ${q.cls} group-hover:scale-105 transition-transform duration-300`}
              aria-hidden
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
            <p className="absolute bottom-3 left-3 right-3 text-white font-bold text-sm drop-shadow">
              {q.title}
            </p>
          </Link>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-3">
        {SERVICES.map((s) => (
          <Link key={s.title} href={s.href} className="ss-svc">
            <p className="text-2xl">{s.icon}</p>
            <p className="mt-1.5 text-xs font-bold text-[#0B1B2B]">{s.title}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
