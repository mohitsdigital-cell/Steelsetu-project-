"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import DashboardNav from "@/components/dashboard/DashboardNav";

export default function LedgerPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [from, setFrom] = useState(() => {
    const d = new Date(); d.setDate(1); d.setMonth(d.getMonth() - 3);
    return d.toISOString().slice(0, 10);
  });
  const [to, setTo] = useState(new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(true);

async function load() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }
    const { data: m } = await supabase.from("org_members").select("org_id").eq("user_id", user.id).single();
    if (!m?.org_id) { setLoading(false); return; }
    const { data } = await supabase
      .from("transactions")
      .select("*")
      .eq("org_id", m.org_id)
      .gte("txn_date", from)
      .lte("txn_date", to)
      .order("txn_date", { ascending: true });
    setRows(data || []);
    setLoading(false);
  }

useEffect(() => { load(); }, []);

const sum = (type: string) => rows.filter((r) => r.txn_type === type).reduce((a, r) => a + Number(r.amount || 0), 0);
  const sales = sum("sale"), purchases = sum("purchase");
  const payIn = sum("payment_in"), payOut = sum("payment_out");
  const net = sales - purchases + payIn - payOut;
  const fmt = (n: number) => "Rs " + n.toLocaleString("en-IN");

const inputCls = "border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-steel-blue";

return (
    <main className="min-h-screen bg-[#F5F7FB]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-2xl font-extrabold text-[#0B1B2B]">Ledger Report (E6)</h1>
          <Link href="/dashboard" className="text-sm font-bold text-slate-500 hover:text-steel-blue">← Dashboard</Link>
        </div>
        <div className="mt-5"><DashboardNav /></div>

<form onSubmit={(e) => { e.preventDefault(); load(); }} className="mt-6 bg-white rounded-2xl shadow p-5 flex flex-wrap items-end gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase">From</label>
            <input className={inputCls} type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase">To</label>
            <input className={inputCls} type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
          <button className="bg-steel-navy hover:bg-steel-blue text-white text-sm font-bold px-5 py-2.5 rounded-xl">Apply</button>
          <button type="button" onClick={() => window.print()} className="text-sm font-bold border border-slate-300 rounded-xl px-4 py-2.5 hover:bg-slate-50">🖨️ Print</button>
        </form>

<div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: "Sales", v: fmt(sales) }, { label: "Purchases", v: fmt(purchases) },
            { label: "Payment In", v: fmt(payIn) }, { label: "Payment Out", v: fmt(payOut) },
            { label: "Net Position", v: fmt(net) },
          ].map((c) => (
            <div key={c.label} className="bg-white rounded-2xl shadow p-4">
              <p className="text-[11px] font-bold uppercase text-slate-400">{c.label}</p>
              <p className="mt-1 text-lg font-extrabold text-[#0B1B2B]">{c.v}</p>
            </div>
          ))}
        </div>

<div className="mt-6 bg-white rounded-2xl shadow overflow-hidden print:shadow-none">
          <div className="px-6 py-4 border-b border-slate-100"><h2 className="font-bold text-[#0B1B2B]">Transactions ({rows.length})</h2></div>
          {loading ? <p className="p-6 text-sm text-slate-400">Load ho raha hai...</p> : rows.length === 0 ? (
            <p className="p-6 text-sm text-slate-400">Is period mein koi transaction nahi.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                <tr>
                  <th className="text-left px-6 py-3">Date</th>
                  <th className="text-left px-4 py-3">Type</th>
                  <th className="text-left px-4 py-3">Party</th>
                  <th className="text-left px-4 py-3">Item</th>
                  <th className="text-right px-4 py-3">Qty</th>
                  <th className="text-right px-4 py-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-t border-slate-100">
                    <td className="px-6 py-3 text-slate-500">{r.txn_date}</td>
    <td className="px-4 py-3"><span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-600 rounded-full px-2 py-1">{r.txn_type.replace("_", " ")}</span></td>
                    <td className="px-4 py-3 font-semibold text-slate-700">{r.party_name}</td>
                    <td className="px-4 py-3 text-slate-500">{r.item_name || "—"}</td>
                    <td className="px-4 py-3 text-right text-slate-500">{Number(r.quantity) || "—"} {r.item_name ? r.unit : ""}</td>
                    <td className="px-4 py-3 text-right font-bold text-slate-700">{fmt(Number(r.amount))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}
