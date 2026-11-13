export const metadata = { title: "Review Policy" };

const rules = [
  ["Relevance", "Reviews must describe genuine, first-hand business experience with the entity."],
  ["No personal attacks", "Criticism of business conduct is allowed. Insults, threats and personal information are not."],
  ["Facts vs opinion", "Factual claims should be stated with basis. Allegations of crime or fraud require careful review and are handled through the private report channel."],
  ["Reviewer role visibility", "The reviewer's relevant role (buyer, supplier, partner) is displayed. A verified account does not automatically mean a verified transaction."],
  ["Moderation decisions", "A review is never rejected merely for being negative. Decisions and reasons are recorded."],
  ["No manipulation", "Coordinated fake reviews, conflicts of interest and review bombing are removed."],
  ["Right of reply", "The reviewed business may respond publicly, request factual corrections and appeal."],
  ["No paid trust", "Positive reviews are never sold. Legitimate negative reviews are never removed for payment."],
];

export default function ReviewPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold text-steel-navy">Review Policy</h1>
      <p className="mt-3 text-sm text-steel-charcoal/80 leading-relaxed">
        How business reviews work on Steelsetu — what is allowed, what is moderated, and how
        businesses can respond.
      </p>
      <div className="mt-8 space-y-4">
        {rules.map(([title, text]) => (
          <div key={title} className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-sm font-bold text-steel-navy">{title}</h2>
            <p className="mt-2 text-xs text-steel-charcoal/80 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-xs text-steel-grey leading-relaxed">
        Reviews activate with the accounts phase. Serious concerns can be reported privately at
        any time through the grievance channel.
      </p>
    </div>
  );
}
