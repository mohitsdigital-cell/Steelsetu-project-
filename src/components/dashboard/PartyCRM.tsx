"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import DashboardNav from "@/components/dashboard/DashboardNav";

type Party = "customer" | "supplier";

export default function PartyCRM({ party }: { party: Party }) {
  const router = useRouter();
  const table = party === "customer" ? "customers" : "suppliers";
  const fk = party === "customer" ? "customer_id" : "supplier_id";
  const label = party === "customer" ? "Customer" : "Supplier";

const [rows, setRows] = useState<any[]>([]);
  const [txns, setTxns] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", phone: "", city: "", credit_limit: "", payment_terms: "" });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

async function load() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.replace("/login?next=/dashboard"); return; }
    const { data: m } = await supabase.from("org_members").select("org_id").eq("user_id", user.id).single();
    if (!m?.org_id) { setLoading(false); return; }
    const [p, t] = await Promise.all([
      supabase.from(table).select("id, name, phone, city, credit_limit, payment_terms").eq("org_id", m.org_id).order("created_at", { ascending: false }),
      supabase.from("transactions").select("id, " + fk + ", txn_type, amount").eq("org_id", m.org_id),
    ]);
    setRows(p.data || []);
    setTxns(t.data || []);
    setLoading(false);
  }

useEffect(() => { load(); }, []);

function balanceOf(id: string) {
    const billType = party === "customer" ? "sale" : "purchase";
    const payType = party === "customer" ? "payment_in" : "payment_out";
    const billed = txns.filter((t) => t[fk] === id && t.txn_type === billType).reduce((a, t) => a + Number(t.amount || 0), 0);
    const settled = txns.filter((t) => t[fk] === id && t.txn_type === payType).reduce((a, t) => a + Number(t.amount || 0), 0);
    return billed - settled;
  }

async function addParty(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    setBusy(true); setMsg("");
    const { data: { user } } = await supabase.auth.getUser();
    const { data: m } = await supabase.from("org_members").select("org_id").eq("user_id", user!.id).single();
    const { error } = await supabase.from(table).insert({
      org_id: m!.org_id,
      name: form.name.trim(),
      phone: form.phone.trim() || null,
      city: form.city.trim() || null,
      credit_limit: form.credit_limit ? Number(form.credit_limit) : null,
      payment_terms: form.payment_terms.trim() || null,
    });
    setBusy(false);
    if (error) { setMsg("Save nahi hua: " + error.message); return; }
    setMsg(label + " add ho gaya ✅");
    setForm({ name: "", phone: "", city: "", credit_limit: "", payment_terms: "" });
    load();
  }

const inputCls = "border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-steel-blue";

return (
    <main className="min-h-screen bg-[#F5F7FB]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-2xl font-extrabold text-[#0B1B2B]">{label} CRM — Khata</h1>
          <Link href="/dashboard" className="text-sm font-bold text-slate-500 hover:text-steel-blue">← Dashboard</Link>
        </div>
        <div className="mt-5"><DashboardNav /></div>

<form onSubmit={addParty} className="mt-6 bg-white rounded-2xl shadow p-6">
          <h2 className="font-bold text-[#0B1B2B]">Naya {label} add karein</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-5 gap-3">
            <input className={inputCls} placeholder="Business / party name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className={inputCls} placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <input className={inputCls} placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            <input className={inputCls} placeholder="Credit limit (Rs)" type="number" value={form.credit_limit} onChange={(e) => setForm({ ...form, credit_limit: e.target.value })} />
            <input className={inputCls} placeholder="Payment terms" value={form.payment_terms} onChange={(e) => setForm({ ...form, payment_terms: e.target.value })} />
          </div>
          <button disabled={busy} className="mt-4 bg-steel-navy hover:bg-steel-blue disabled:opacity-50 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-colors">
            {busy ? "Saving..." : "Add " + label}
          </button>
          {msg && <p className="mt-3 text-sm font-semibold text-steel-blue">{msg}</p>}
        </form>

<div className="mt-6 bg-white rounded-2xl shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="font-bold text-[#0B1B2B]">Saare {label}s ({rows.length})</h2>
          </div>
          {loading ? (
            <p className="p-6 text-sm text-slate-400">Load ho raha hai...</p>
          ) : rows.length === 0 ? (
            <p className="p-6 text-sm text-slate-400">Abhi koi {label.toLowerCase()} nahi — upar form se add kijiye.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                <tr>
                  <th className="text-left px-6 py-3">Name</th>
                  <th className="text-left px-4 py-3">Phone</th>
                  <th className="text-left px-4 py-3">City</th>
                  <th className="text-left px-4 py-3">Credit Limit</th>
                  <th className="text-right px-4 py-3">Balance</th>
                  <th className="text-right px-6 py-3">Ledger</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const bal = balanceOf(r.id);
                  return (
                    <tr key={r.id} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="px-6 py-3 font-semibold text-[#0B1B2B]">{r.name}</td>
                      <td className="px-4 py-3 text-slate-500">{r.phone || "—"}</td>
                      <td className="px-4 py-3 text-slate-500">{r.city || "—"}</td>
                      <td className="px-4 py-3 text-slate-500">{r.credit_limit ? "Rs " + Number(r.credit_limit).toLocaleString("en-IN") : "—"}</td>
                      <td className={"px-4 py-3 text-right font-bold " + (bal > 0 ? "text-orange-600" : bal < 0 ? "text-emerald-600" : "text-slate-400")}>
                        Rs {bal.toLocaleString("en-IN")}
                      </td>
                      <td className="px-6 py-3 text-right">
                        <Link href={"/dashboard/party/" + party + "/" + r.id} className="font-bold text-steel-blue hover:underline">
                          Khata →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}
