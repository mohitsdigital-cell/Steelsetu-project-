import Link from "next/link";
import Logo3D from "@/components/layout/Logo3D";
import { accessories } from "@/lib/trade-extras";

export const metadata = { title: "Accessories" };

export default function AccessoriesPage() {
  return (
    <div>
      <section className="bg-steel-navy text-white grain relative overflow-hidden">
        <div className="absolute -top-20 right-0 w-[350px] h-[350px] rounded-full bg-steel-blue/25 blur-[110px]" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20 flex items-center justify-between gap-8">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Steel Accessories</h1>
            <p className="mt-4 text-slate-300 max-w-2xl">
              Roofing, fabrication aur construction ke saath chalne wale accessories —
              Burrabazar trade ke hisaab se curated list.
            </p>
          </div>
          <div className="hidden md:block shrink-0">
            <Logo3D variant="plates" />
          </div>
        </div>
      </section>

<section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {accessories.map((a) => (
            <div key={a.name} className="bg-white border border-gray-200 rounded-2xl p-5 card-hover">
              <p className="font-bold text-steel-navy text-sm">{a.name}</p>
              <p className="mt-2 text-xs text-steel-charcoal/70 leading-relaxed">{a.note}</p>
            </div>
          ))}
        </div>

<div className="mt-12 bg-steel-navy text-white rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute -top-20 left-1/4 w-[300px] h-[300px] rounded-full bg-steel-blue/25 blur-[100px]" aria-hidden />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Koi accessory chahiye?</h2>
            <p className="mt-3 text-slate-300 max-w-xl mx-auto text-sm">
              Quantity, specification aur delivery location ke saath RFQ post kijiye.
            </p>
            <Link href="/rfq" className="inline-block mt-6 bg-gradient-to-r from-[#FF6A00] to-[#ff8f3f] hover:brightness-110 font-bold px-8 py-4 rounded-2xl shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.03]">
              Post Your Requirement →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
