import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-steel-navy text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        <div>
          <p className="font-bold text-lg mb-2">Steelsetu</p>
          <p className="opacity-80">
            The Bridge Between Verified Buyers &amp; Verified Steel Suppliers.
            Burrabazar, Kolkata and Eastern India.
          </p>
        </div>
        <div>
          <p className="font-semibold mb-3">Platform</p>
          <ul className="space-y-2 opacity-80">
            <li><Link href="/suppliers" className="hover:text-steel-blue">Suppliers</Link></li>
            <li><Link href="/products" className="hover:text-steel-blue">Products</Link></li>
            <li><Link href="/rates" className="hover:text-steel-blue">Indicative Rates</Link></li>
            <li><Link href="/calculators" className="hover:text-steel-blue">Calculators</Link></li>
            <li><Link href="/rfq" className="hover:text-steel-blue">Post a Requirement</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-3">Company</p>
          <ul className="space-y-2 opacity-80">
            <li><Link href="/about" className="hover:text-steel-blue">About</Link></li>
            <li><Link href="/contact" className="hover:text-steel-blue">Contact</Link></li>
            <li><Link href="/knowledge" className="hover:text-steel-blue">Knowledge</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-3">Legal</p>
          <ul className="space-y-2 opacity-80">
            <li><Link href="/terms" className="hover:text-steel-blue">Terms of Use</Link></li>
            <li><Link href="/privacy" className="hover:text-steel-blue">Privacy Policy</Link></li>
            <li><Link href="/disclaimer" className="hover:text-steel-blue">Disclaimer</Link></li>
            <li><Link href="/grievance" className="hover:text-steel-blue">Grievance</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 text-xs opacity-70">
          Rates shown on Steelsetu are indicative market references, not firm offers. Confirm final
          rates directly with the supplier. © {new Date().getFullYear()} Steelsetu.
        </div>
      </div>
    </footer>
  );
}
