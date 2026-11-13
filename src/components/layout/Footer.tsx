import Link from "next/link";

const columns = [
  {
    title: "Platform",
    links: [
      { href: "/suppliers", label: "Suppliers" },
      { href: "/products", label: "Products" },
      { href: "/brands", label: "Brands" },
      { href: "/rates", label: "Indicative Rates" },
      { href: "/calculators", label: "Calculators" },
      { href: "/rfq", label: "Post a Requirement" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/knowledge", label: "Knowledge" },
      { href: "/community", label: "Community" },
      { href: "/register", label: "Register Business" },
    ],
  },
  {
    title: "Trust & Legal",
    links: [
      { href: "/trust", label: "Trust & Feedback" },
      { href: "/review-policy", label: "Review Policy" },
      { href: "/terms", label: "Terms of Use" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/disclaimer", label: "Disclaimer" },
      { href: "/grievance", label: "Grievance" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-steel-navy text-white overflow-hidden">
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-steel-blue/20 blur-[120px] pointer-events-none"
        aria-hidden
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-steel-blue to-indigo-500 grid place-items-center font-bold text-lg">
                S
              </span>
              <span className="font-bold text-xl tracking-tight">
                Steel<span className="text-gradient">setu</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              The Bridge Between Verified Buyers &amp; Verified Steel Suppliers.
              Built for Burrabazar, Kolkata and Eastern India steel trade.
            </p>
            <p className="mt-4 text-xs text-slate-500">
              Discover. Compare. Connect. Trade with Clarity.
            </p>
          </div>

{columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-slate-200 mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-slate-400 hover:text-steel-blue transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

<div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-slate-500">
          <p>
            Rates shown on Steelsetu are indicative market references, not firm offers.
            Confirm final rates directly with suppliers.
          </p>
          <p>© {new Date().getFullYear()} Steelsetu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
