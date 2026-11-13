"use client";

import { useState } from "react";
import Link from "next/link";
import { catalog } from "@/lib/catalog";
import { accessories, brands } from "@/lib/trade-extras";

const head = "w-full px-4 py-3 text-left text-sm font-bold flex items-center justify-between transition-colors";

export default function CategorySidebar() {
  const [sec, setSec] = useState<"products" | "accessories" | "brands">("products");

return (
    <aside className="lg:sticky lg:top-28 self-start space-y-4">
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <button onClick={() => setSec("products")} className={head + (sec === "products" ? " bg-steel-navy text-white" : " text-steel-navy hover:bg-slate-50")}>
          <span>📦 Products</span><span className="text-[10px]">{catalog.length}</span>
        </button>
        {sec === "products" && (
          <ul className="p-3 space-y-1 max-h-[380px] overflow-y-auto">
            {catalog.map((c) => (
              <li key={c.slug}>
                <Link href={"/products/" + c.slug} className="block px-3 py-2 text-sm text-steel-charcoal hover:text-steel-blue hover:bg-steel-blue/5 rounded-lg transition-colors">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        )}

<button onClick={() => setSec("accessories")} className={head + " border-t border-gray-100" + (sec === "accessories" ? " bg-steel-navy text-white" : " text-steel-navy hover:bg-slate-50")}>
          <span>🔧 Accessories</span><span className="text-[10px]">{accessories.length}</span>
        </button>
        {sec === "accessories" && (
          <ul className="p-3 space-y-1 max-h-[380px] overflow-y-auto">
            {accessories.map((a) => (
              <li key={a.name}>
                <Link href="/accessories" className="block px-3 py-2 text-sm text-steel-charcoal hover:text-steel-blue hover:bg-steel-blue/5 rounded-lg transition-colors">
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        )}

<button onClick={() => setSec("brands")} className={head + " border-t border-gray-100" + (sec === "brands" ? " bg-steel-navy text-white" : " text-steel-navy hover:bg-slate-50")}>
          <span>🏭 Brands</span><span className="text-[10px]">{brands.length}</span>
        </button>
        {sec === "brands" && (
          <ul className="p-3 space-y-1 max-h-[380px] overflow-y-auto">
            {brands.map((b) => (
              <li key={b.name}>
                <Link href="/brands" className="block px-3 py-2 text-sm text-steel-charcoal hover:text-steel-blue hover:bg-steel-blue/5 rounded-lg transition-colors">
                  {b.name} <span className="text-[11px] text-steel-charcoal/50">· {b.tagline}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

<div className="bg-steel-navy rounded-2xl p-5 text-white">
        <p className="text-sm font-bold">Requirement hai?</p>
        <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">Ek structured RFQ bhejiye — relevant suppliers se comparable quotations milenge.</p>
        <Link href="/rfq" className="mt-4 inline-block text-xs font-bold bg-gradient-to-r from-[#FF6A00] to-[#ff8f3f] px-4 py-2.5 rounded-lg hover:brightness-110 transition">
          Post Requirement →
        </Link>
      </div>
    </aside>
  );
}
