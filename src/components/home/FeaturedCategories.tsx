import Link from "next/link";
import { catalog } from "@/lib/catalog";

const icons = ["🔥", "⚡", "🏭", "🏗️", "🔧", "🚛", "📊", "🛡️"];

export default function FeaturedCategories() {
  const top = catalog.slice(0, 8);

return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-24">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <span className="trending-badge">Burrabazar Top Traded</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-steel-navy tracking-tight">Featured Categories</h2>
          <p className="mt-3 text-steel-grey max-w-xl">
            Burrabazar ke sabse zyada traded products — ek click mein product details, specs aur ready RFQ.
          </p>
        </div>
        <Link href="/products" className="text-sm font-semibold text-steel-blue hover:gap-2 inline-flex items-center gap-1 transition-all">
          Saari categories dekhein →
        </Link>
      </div>

<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {top.map((c, i) => (
          <Link key={c.slug} href={"/products/" + c.slug} className="featured-card group">
            <span className="text-2xl">{icons[i % icons.length]}</span>
            <p className="mt-3 font-bold text-steel-navy text-sm leading-snug">{c.name}</p>
            <p className="mt-1.5 text-xs text-steel-charcoal/70 leading-relaxed">{c.short}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-steel-blue group-hover:gap-2 transition-all">
              View details →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
