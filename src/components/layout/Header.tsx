import Link from "next/link";

const navLinks = [
  { href: "/suppliers", label: "Suppliers" },
  { href: "/products", label: "Products" },
  { href: "/rates", label: "Rates" },
  { href: "/calculators", label: "Calculators" },
  { href: "/knowledge", label: "Knowledge" },
  { href: "/rfq", label: "Post Requirement" },
];

export default function Header() {
  return (
    <header className="bg-steel-navy text-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="bg-steel-blue text-white rounded-lg px-2 py-1">S</span>
            Steelsetu
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-steel-blue transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm border border-white/30 rounded-lg px-4 py-2 hover:bg-white/10"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="hidden sm:block text-sm bg-steel-blue hover:bg-steel-charcoal rounded-lg px-4 py-2 font-semibold"
            >
              Register
            </Link>
          </div>
        </div>
        <nav className="md:hidden flex items-center gap-4 overflow-x-auto pb-3 text-sm">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="whitespace-nowrap hover:text-steel-blue">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
