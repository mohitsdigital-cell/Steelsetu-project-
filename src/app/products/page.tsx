import Link from "next/link";
import { catalog } from "@/lib/catalog";
import CategorySidebar from "@/components/products/CategorySidebar";

export const metadata = { title: "Products" };

export default function ProductsPage() {
  return (
    <div>
      <section className="bg-steel-navy text-white grain relative overflow-hidden">
        <div className="absolute -top-20 left-0 w-[350px] h-[350px] rounded-full bg-indigo-500/20 blur-[110px]" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Products &amp; Categories</h1>
          <p className="mt-4 text-slate-300 max-w-2xl">
            The core catalogue of steel and roofing products traded in Eastern India.
            Side se category chuniye — product, accessories aur brands sab organized.
          </p>
        </div>
      </section>

<section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
          <CategorySidebar />

<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {catalog.map((p) => (
              <Link key={p.slug} href={"/products/" + p.slug} className="bg-white border border-gray-200 rounded-2xl p-6 card-hover">
                <h3 className="font-bold text-steel-navy text-sm">{p.name}</h3>
                <p className="mt-2 text-xs text-steel-charcoal/70 leading-relaxed">{p.short}</p>
                <p className="mt-3 text-xs font-semibold text-steel-blue">View details →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
