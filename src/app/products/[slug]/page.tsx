import Link from "next/link";
import { notFound } from "next/navigation";
import { catalog } from "@/lib/catalog";

export function generateStaticParams() {
  return catalog.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const item = catalog.find((p) => p.slug === slug);
  return { title: item ? item.name : "Product" };
}

export default async function ProductDetailPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const item = catalog.find((p) => p.slug === slug);
  if (!item) notFound();

return (
    <div>
      <section className="bg-steel-navy text-white grain relative overflow-hidden">
        <div className="absolute -top-20 right-0 w-[350px] h-[350px] rounded-full bg-steel-blue/25 blur-[110px]" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <p className="text-xs text-slate-400 mb-3">
            <Link href="/products" className="hover:text-steel-blue">Products</Link> / {item.name}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{item.name}</h1>
          <p className="mt-4 text-slate-300 max-w-2xl">{item.description}</p>
        </div>
      </section>

<section className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10">
          <h2 className="text-xl font-bold text-steel-navy mb-6">Practical specifications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {item.specs.map((s) => (
              <div key={s.label} className="border border-gray-200 rounded-xl p-4">
                <p className="text-xs font-semibold text-steel-grey uppercase tracking-wide">{s.label}</p>
                <p className="mt-1 text-sm text-steel-charcoal">{s.value}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-steel-grey leading-relaxed">
            General reference information. Exact availability, grades, sizes and standards vary by
            supplier and lot - always confirm specifications with the supplier before ordering.
          </p>
        </div>

<div className="mt-8 bg-steel-navy text-white rounded-3xl p-8 md:p-10 text-center relative overflow-hidden grain">
          <div className="absolute -top-16 left-1/4 w-[250px] h-[250px] rounded-full bg-steel-blue/25 blur-[90px]" aria-hidden />
          <div className="relative">
            <h2 className="text-2xl font-bold">Need {item.name}?</h2>
            <p className="mt-3 text-slate-300 max-w-md mx-auto">
              Post one structured RFQ and get comparable quotations from relevant suppliers.
            </p>
            <Link
              href="/rfq"
              className="inline-block mt-6 bg-steel-blue hover:bg-steel-blue/85 font-semibold px-8 py-4 rounded-2xl glow transition-all"
            >
              Request Quotation →
            </Link>
          </div>
        </div>

<div className="mt-10">
          <p className="text-sm font-semibold text-steel-navy mb-4">More products</p>
          <div className="flex flex-wrap gap-2">
            {catalog.filter((p) => p.slug !== item.slug).map((p) => (
              <Link
                key={p.slug}
                href={"/products/" + p.slug}
                className="text-xs font-medium text-steel-navy bg-white border border-gray-200 hover:border-steel-blue rounded-full px-3 py-1.5 transition-colors"
              >
                {p.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
