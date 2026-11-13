export const metadata = { title: "Privacy Policy" };
export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold text-steel-navy">Privacy Policy</h1>
      <div className="mt-6 space-y-4 text-sm text-steel-charcoal/80 leading-relaxed">
        <p>Steelsetu collects only the information needed to run supplier discovery, RFQ flows and platform communication.</p>
        <p>In this Phase 1 release, forms run entirely in your browser — no data is transmitted or stored by the platform.</p>
        <p>When accounts activate, business details submitted for verification are used only for verification and platform operation, and are never sold.</p>
        <p>Confidential complaint evidence shared with the grievance channel is never published or monetised.</p>
      </div>
    </div>
  );
}
