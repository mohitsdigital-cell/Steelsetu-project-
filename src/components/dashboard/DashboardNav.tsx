import Link from "next/link";

const links = [
  { href: "/dashboard", label: "📊 Dashboard" },
  { href: "/dashboard/customers", label: "👥 Customers" },
  { href: "/dashboard/suppliers", label: "🏭 Suppliers" },
  { href: "/dashboard/documents/quotation", label: "📄 Quotations" },
  { href: "/dashboard/documents/sale_order", label: "📋 Sale Orders" },
  { href: "/dashboard/documents/tax_invoice", label: "🧾 Invoices" },
  { href: "/dashboard/documents/purchase_order", label: "📦 Purchase Orders" },
  { href: "/dashboard/inventory", label: "🧮 Inventory" },
  { href: "/dashboard/rfq", label: "📥 RFQ Inbox" },
  { href: "/dashboard/ledger", label: "📗 Ledger" },
  { href: "/dashboard/settings", label: "⚙️ Settings" },
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
