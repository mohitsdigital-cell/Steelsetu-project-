import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] grid place-items-center px-4 text-center">
      <div>
        <p className="text-8xl md:text-9xl font-bold text-gradient">404</p>
        <h1 className="mt-4 text-2xl font-bold text-steel-navy">This page is not forged yet</h1>
        <p className="mt-3 text-steel-grey max-w-md mx-auto">
          The page you are looking for does not exist. Head back to the marketplace.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <Link href="/" className="bg-steel-blue hover:bg-steel-blue/85 text-white font-semibold px-6 py-3 rounded-xl glow-sm transition-all">
            Back to Home
          </Link>
          <Link href="/suppliers" className="border border-gray-300 hover:border-steel-blue text-steel-navy font-semibold px-6 py-3 rounded-xl transition-colors">
            Browse Suppliers
          </Link>
        </div>
      </div>
    </div>
  );
}
