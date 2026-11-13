export const metadata = { title: "Regional Rates" };

export default async function RegionalRatesPage(props: { params: Promise<{ region: string }> }) {
  await props.params;
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold text-steel-navy">Regional rate details</h1>
      <p className="mt-4 text-sm text-steel-charcoal/80 leading-relaxed">
        Region and product specific rate pages will publish only when each figure carries a real
        date, unit, source and known limitations. Indicative rates are market references — always
        confirm final rates directly with suppliers.
      </p>
    </div>
  );
}
