"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const CATEGORIES = [
  "Suspected fake business identity",
  "Product specification / quality concern",
  "Weight / gauge discrepancy",
  "Delivery damage",
  "Payment or documentation concern",
  "Review manipulation",
  "Harassment / threats",
  "Other",
];

export default function GrievancePage() {
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState({ entity: "", category: CATEGORIES[0], details: "", reporter: "" });
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState(false);

useEffect(() => {
    (async () => {
      const { data: { user: u } } = await supabase.auth.getUser();
      setUser(u);
    })();
  }, []);

async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) { setMsg("Private report ke liye login kijiye — taaki hum aapse contact kar sakein."); return; }
    if (form.entity.trim().length < 2) { setMsg("Business ka naam likhiye."); return; }
    if (form.details.trim().length < 10) { setMsg("Details kam se kam 10 characters ki likhiye."); return; }
    setBusy(true); setMsg("");
    const { error } = await supabase.from("private_reports").insert({
      entity_name: form.entity.trim(),
      category: form.category,
      details: form.details.trim(),
      reporter_name: form.reporter.trim() || null,
    });
    setBusy(false);
    if (error) { setMsg("Report submit nahi hui: " + error.message); return; }
    setSubmitted(true);
  }

const inputCls = "border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-steel-blue w-full";

return (
    <main className="min-h-screen bg-[#F5F7FB]">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <Link href="/trust" className="text-sm font-bold text-slate-500 hover:text-steel-blue">← Trust</Link>
        <h1 className="mt-2 text-3xl font-extrabold text-[#0B1B2B]">Report a Serious Concern</h1>
        <p className="mt-2 text-sm text-slate-500">
          Serious concerns yahan privately jaati hain — sirf authorised Trust/Admin staff dekh sakte hain. Ye public feed mein kabhi nahi aata.
        </p>

{submitted ? (
          <div className="mt-6 bg-white rounded-2xl shadow p-8 text-center">
            <p className="text-4xl">🔒</p>
            <h2 className="mt-3 font-bold text-[#0B1B2B]">Report privately submit ho gayi</h2>
            <p className="mt-2 text-sm text-slate-500">Hum review karke aapse contact karenge. Aapki details private rahengi.</p>
            <Link href="/trust" className="inline-block mt-6 bg-steel-navy hover:bg-steel-blue text-white text-sm font-bold px-6 py-2.5 rounded-xl">← Back to Trust</Link>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 bg-white rounded-2xl shadow p-6">
            <div className="grid gap-3">
              <input className={inputCls} placeholder="Business ka naam (jiske baare mein concern) *" value={form.entity} onChange={(e) => setForm({ ...form, entity: e.target.value })} />
              <select className={inputCls} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <textarea className={inputCls} rows={5} placeholder="Details likhiye — kya hua, kab hua, kya evidence hai *" value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} />
              <input className={inputCls} placeholder="Aapka naam/phone (optional — contact ke liye)" value={form.reporter} onChange={(e) => setForm({ ...form, reporter: e.target.value })} />
            </div>
            <button disabled={busy} className="mt-4 bg-steel-navy hover:bg-steel-blue disabled:opacity-50 text-white text-sm font-bold px-6 py-2.5 rounded-xl">
              {busy ? "Submitting..." : "Submit Private Report"}
            </button>
            {msg && <p className="mt-3 text-sm font-semibold text-steel-blue">{msg}</p>}
          </form>
        )}
      </div>
    </main>
  );
}
