import Link from "next/link";

const links = [
  { href: "/dashboard", label: "📊 Dashboard" },
  { href: "/dashboard/customers", label: "👥 Customers" },
  { href: "/dashboard/suppliers", label: "🏭 Suppliers" },
];

export default function DashboardNav() {
  return (
    <nav className="flex flex-wrap gap-2">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="text-sm font-semibold text-slate-600 hover:text-white hover:bg-steel-navy bg-white border border-slate-200 rounded-lg px-4 py-2 transition-colors"
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
