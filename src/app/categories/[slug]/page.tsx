import Link from "next/link";
import { notFound } from "next/navigation";
import { catalog } from "@/lib/catalog";

export function generateStaticParams() {
  return catalog.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const item = catalog.find((p) => p.slug === slug);
  return { title: item ? item.name : "Category" };
}

export default async function CategoryPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const item = catalog.find((p) => p.slug === slug);
  if (!item) notFound();

return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <p className="text-xs text-steel-grey mb-3">
        <Link href="/products" className="hover:text-steel-blue">Products</Link> / Category
      </p>
      <h1 className="text-3xl font-bold text-steel-navy">{item.name}</h1>
      <p className="mt-4 text-steel-charcoal/80">{item.description}</p>
      <div className="mt-8 bg-white border border-gray-200 rounded-3xl p-8 card-hover">
        <h2 className="text-lg font-bold text-steel-navy">{item.short}</h2>
        <p className="mt-2 text-sm text-steel-charcoal/70">
          Full specifications, related accessories and RFQ option are on the product page.
        </p>
        <Link
          href={"/products/" + item.slug}
          className="inline-block mt-5 bg-steel-blue hover:bg-steel-blue/85 text-white font-semibold px-6 py-3 rounded-xl glow-sm transition-all"
        >
          Open {item.name} →
        </Link>
      </div>
    </div>
  );
}
