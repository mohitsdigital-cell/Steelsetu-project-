export const metadata = { title: "Community Guidelines" };

const rules = [
  "Zero-drama policy: discuss markets, products and trade — not people.",
  "No personal attacks, doxxing, threats or harassment.",
  "No unsupported accusations. Serious concerns go to the private Trust report channel, not the public feed.",
  "No private commercial documents posted publicly.",
  "No fake polls, fake member counts or duplicate accounts.",
  "Community posts are not for dispute resolution — disputes go to the Trust process.",
  "Official posts publish only from approved, verified institutional accounts.",
  "Moderators may edit or remove content that breaks these rules, with the action recorded.",
];

export default function CommunityGuidelinesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold text-steel-navy">Community Guidelines</h1>
      <p className="mt-3 text-sm text-steel-charcoal/80 leading-relaxed">
        The Steelsetu community exists to help real trade happen. These rules keep it useful.
      </p>
      <ol className="mt-8 space-y-3">
        {rules.map((r, i) => (
          <li key={i} className="bg-white border border-gray-200 rounded-2xl p-5 flex gap-4">
            <span className="shrink-0 w-7 h-7 rounded-lg bg-steel-blue/10 text-steel-blue grid place-items-center text-xs font-bold">
              {i + 1}
            </span>
            <p className="text-sm text-steel-charcoal/85 leading-relaxed">{r}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
