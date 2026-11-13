import Link from "next/link";

export const metadata = { title: "Brand" };

export default async function BrandDetailPage(props: { params: Promise<{ slug: string }> }) {
  await props.params;
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold text-steel-navy">Brand page under verification</h1>
      <p className="mt-4 text-sm text-steel-charcoal/80 leading-relaxed">
        This brand page will be published once the brand relationship and information are
        evidenced and approved. Steelsetu does not publish unverified brand claims.
      </p>
      <Link href="/brands" className="inline-block mt-8 text-sm font-semibold text-steel-blue hover:underline">
        ← Back to Brands
      </Link>
    </div>
  );
}
