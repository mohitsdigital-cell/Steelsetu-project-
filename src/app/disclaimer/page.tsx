export const metadata = { title: "Disclaimer" };
export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold text-steel-navy">Disclaimer</h1>
      <div className="mt-6 space-y-4 text-sm text-steel-charcoal/80 leading-relaxed">
        <p>Steelsetu does not manufacture, sell, certify or guarantee any steel product. It is a discovery, information and RFQ platform.</p>
        <p>All rates shown are indicative market references with stated dates, units, sources and limitations. They are not firm offers and must not be treated as quotations.</p>
        <p>Buyers must independently verify products, prices, documentation and supplier credentials before any transaction.</p>
      </div>
    </div>
  );
}
