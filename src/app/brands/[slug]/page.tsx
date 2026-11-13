import Link from "next/link";
import { notFound } from "next/navigation";
import { brands, getBrand } from "@/lib/brands";
import BrandLogo from "@/components/brands/BrandLogo";

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const b = getBrand(slug);
  return { title: b ? b.name + " — Steelsetu" : "Brand" };
}

export default async function BrandDetailPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const b = getBrand(slug);
  if (!b) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
      <Link href="/brands" className="text-sm font-semibold text-steel-blue hover:underline">← All Brands</Link>

      <div className="mt-6 bg-white border border-gray-200 rounded-3xl p-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-5">
            <BrandLogo slug={b.slug} name={b.name} size="lg" />
            <div>
              <h1 className="text-3xl font-bold text-steel-navy">{b.name}</h1>
              <p className="mt-1 text-sm text-slate-400">{b.hq}</p>
            </div>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wide bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-3 py-1">
            Information listing — verification pending
          </span>
        </div>
        <p className="mt-4 text-sm text-steel-charcoal/85 leading-relaxed">{b.about}</p>
      </div>

      <div className="mt-6 bg-white border border-gray-200 rounded-3xl p-8">
        <h2 className="text-lg font-bold text-steel-navy">Product groups ({b.groups.length})</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {b.groups.map((g) => (
            <Link key={g} href={"/products/" + g} className="group border border-gray-200 rounded-2xl px-4 py-3 hover:border-steel-blue transition-colors">
              <p className="text-sm font-semibold text-steel-charcoal group-hover:text-steel-blue">{g.replace(/-/g, " ")}</p>
              <p className="mt-0.5 text-xs text-slate-400">View product info →</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-6 bg-white border border-gray-200 rounded-3xl p-8">
        <h2 className="text-lg font-bold text-steel-navy">Suppliers dealing in {b.name}</h2>
        <p className="mt-3 text-sm text-steel-charcoal/80 leading-relaxed">
          Verified supplier mapping for this brand publishes after the brand-supplier relationship is evidenced and
          reviewed. Suppliers can register and submit documentation for review.
        </p>
        <Link href="/suppliers" className="inline-block mt-4 text-sm font-semibold text-steel-blue hover:underline">Browse supplier directory →</Link>
      </div>

      <p className="mt-6 text-xs text-slate-400 leading-relaxed">
        {b.name} and related marks are trademarks of their respective owners. This page is an independent
        information listing by Steelsetu and does not imply ownership, manufacturing, or authorisation. The
        logo tile shown is a stylised identifier created by Steelsetu, not an official trademark.
      </p>
    </div>
  );
}