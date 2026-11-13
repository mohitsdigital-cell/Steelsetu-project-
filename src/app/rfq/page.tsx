"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { matchProducts, Requirement } from "@/lib/matching";

export default function RFQPage() {
  const [form, setForm] = useState<Requirement>({
    productType: "", grade: "", thickness: "", width: "",
    quantity: "", city: "", budget: "", deliveryDate: "",
  });
  const [contact, setContact] = useState({ name: "", phone: "" });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

const result = useMemo(() => {
    if (form.productType.trim().length < 3) return null;
    return matchProducts(form);
  }, [form]);

async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.productType.trim() || !contact.name.trim() || contact.phone.trim().length < 10) {
      setMsg("Product type, naam aur 10-digit phone zaroori hain");
      return;
    }
    setBusy(true); setMsg("");
    const res = await fetch("/api/rfq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contact_name: contact.name.trim(),
        contact_phone: contact.phone.trim(),
        requirement: form,
        matched_slugs: (result?.matched || []).map((m) => m.slug),
      }),
    });
    setBusy(false);
    if (!res.ok) { setMsg("Submit nahi hua — thodi der baad try kijiye"); return; }
    setMsg("RFQ submit ho gayi ✅ Steelsetu team jaldi contact karegi.");
    setForm({ productType: "", grade: "", thickness: "", width: "", quantity: "", city: "", budget: "", deliveryDate: "" });
    setContact({ name: "", phone: "" });
  }

const inputCls = "border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-steel-blue";

return (
    <main className="min-h-screen bg-[#F5F7FB]">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold text-[#0B1B2B]">Smart Product Matching</h1>
        <p className="mt-2 text-sm text-slate-500">Apni requirement batayein — hum turant matching products aur brands dikhate hain, aur RFQ save karte hain.</p>

<form onSubmit={submit} className="mt-6 bg-white rounded-2xl shadow p-6">
          <h2 className="font-bold text-[#0B1B2B]">Aapki requirement</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-3">
            <input className={inputCls + " sm:col-span-2"} placeholder="Product type * (e.g. TMT bars, GI sheets)" value={form.productType} onChange={(e) => setForm({ ...form, productType: e.target.value })} />
            <input className={inputCls} placeholder="Grade (e.g. Fe500D)" value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} />
            <input className={inputCls} placeholder="Thickness / size" value={form.thickness} onChange={(e) => setForm({ ...form, thickness: e.target.value })} />
            <input className={inputCls} placeholder="Width (if applicable)" value={form.width} onChange={(e) => setForm({ ...form, width: e.target.value })} />
            <input className={inputCls} placeholder="Quantity (e.g. 50 MT)" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
            <input className={inputCls} placeholder="City / delivery location" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            <input className={inputCls} placeholder="Budget (approx Rs)" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} />
            <input className={inputCls} type="date" value={form.deliveryDate} onChange={(e) => setForm({ ...form, deliveryDate: e.target.value })} />
            <input className={inputCls} placeholder="Aapka naam *" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} />
            <input className={inputCls} placeholder="Phone (10 digits) *" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
          </div>

{result && result.matched.length > 0 && (
            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Live matching ({result.matched.length} products)</p>
              <div className="mt-2 space-y-1.5">
                {result.matched.map((m) => (
                  <Link key={m.slug} href={"/products/" + m.slug} className="block text-sm font-semibold text-steel-navy hover:text-steel-blue">
                    • {m.name} <span className="text-xs text-slate-400">— {m.short}</span>
                  </Link>
                ))}
              </div>
              {result.relatedBrands.length > 0 && (
                <p className="mt-3 text-xs text-slate-500">
                  Related brands: {result.relatedBrands.map((b) => b.name).join(", ")}
                </p>
              )}
            </div>
          )}

<button disabled={busy} className="mt-4 bg-steel-navy hover:bg-steel-blue disabled:opacity-50 text-white text-sm font-bold px-6 py-2.5 rounded-xl">
            {busy ? "Submitting..." : "Submit RFQ"}
          </button>
          {msg && <p className="mt-3 text-sm font-semibold text-steel-blue">{msg}</p>}
        </form>
      </div>
    </main>
  );
}
