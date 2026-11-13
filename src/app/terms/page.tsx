export const metadata = { title: "Terms of Use" };
export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold text-steel-navy">Terms of Use</h1>
      <div className="mt-6 space-y-4 text-sm text-steel-charcoal/80 leading-relaxed">
        <p>Steelsetu is a B2B steel trade discovery, RFQ and information platform. It is not a party to transactions between buyers and suppliers.</p>
        <p>Indicative rates are market references, not offers. Final rates, quality, delivery and payment terms must be confirmed directly with suppliers.</p>
        <p>Verification labels state exactly what has been checked for a listed business. Absence of a label means that item has not yet been checked — nothing more is implied.</p>
        <p>Misuse of the platform — fake enquiries, spam, or misrepresentation of a business — may lead to removal without refund where a paid plan applies.</p>
        <p>This Phase 1 release is a front-end demonstration; interactive accounts and transactions activate in later phases.</p>
      </div>
    </div>
  );
}
