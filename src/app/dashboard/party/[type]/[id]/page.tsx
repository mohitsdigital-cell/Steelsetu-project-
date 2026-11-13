"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import DashboardNav from "@/components/dashboard/DashboardNav";

export default function PartyLedgerPage() {
  const params = useParams<{ type: string; id: string }>();
  const router = useRouter();
  const party = params.type === "supplier" ? "supplier" : "customer";
  const id = params.id;
  const table = party === "customer" ? "customers" : "suppliers";
  const fk = party === "customer" ? "customer_id" : "supplier_id";
  const label = party === "customer" ? "Customer" : "Supplier";
  const billType = party === "customer" ? "sale" : "purchase";
  const payType = party === "customer" ? "payment_in" : "payment_out";
  const billLabel = party === "customer" ? "Sale" : "Purchase";
  const payLabel = party === "customer" ? "Payment In" : "Payment Out";

const [row, setRow] = useState<any>(null);
  const [txns, setTxns] = useState<any[]>([]);
  const [entry, setEntry] = useState({ item_name: "", quantity: "", unit: "MT", rate: "", txn_date: new Date().toISOString().slice(0, 10) });
  const [pay, setPay] = useState({ amount: "", txn_date: new Date().toISOString().slice(0, 10), notes: "" });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

async function load() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.replace("/login?next=/dashboard"); return; }
    const { data: p } = await supabase.from(table).select("id, name, phone, city, credit_limit, payment_terms").eq("id", id).single();
    setRow(p);
    const { data: t } = await supabase
      .from("transactions")
      .select("id, txn_type, item_name, quantity, unit, rate, amount, txn_date, notes")
      .eq(fk, id)
      .order("txn_date", { ascending: true })
      .order("created_at", { ascending: true });
    setTxns(t || []);
    setLoading(false);
  }

useEffect(() => { load(); }, [id]);

function totals() {
    let bill = 0, settled = 0, billQty = 0;
    for (const t of txns) {
      if (t.txn_type === billType) { bill += Number(t.amount || 0); billQty += Number(t.quantity || 0); }
      if (t.txn_type === payType) settled += Number(t.amount || 0);
    }
    return { bill, settled, billQty, balance: bill - settled };
  }

async function saveEntry(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setMsg("");
    const { data: { user } } = await supabase.auth.getUser();
    const { data: m } = await supabase.from("org_members").select("org_id").eq("user_id", user!.id).single();
    const qty = Number(entry.quantity) || 0;
    const rate = Number(entry.rate) || 0;
    const { error } = await supabase.from("transactions").insert({
      org_id: m!.org_id, txn_type: billType, [fk]: id, party_name: row?.name || "",
      item_name: entry.item_name.trim() || null, quantity: qty, unit: entry.unit, rate: rate,
      amount: qty * rate, txn_date: entry.txn_date, created_by: user!.id,
    });
    setBusy(false);
    if (error) { setMsg("Save nahi hua: " + error.message); return; }
    setMsg(billLabel + " entry ho gayi ✅");
    setEntry({ ...entry, item_name: "", quantity: "", rate: "" });
    load();
  }

async function savePay(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setMsg("");
    const { data: { user } } = await supabase.auth.getUser();
    const { data: m } = await supabase.from("org_members").select("org_id").eq("user_id", user!.id).single();
    const { error } = await supabase.from("transactions").insert({
      org_id: m!.org_id, txn_type: payType, [fk]: id, party_name: row?.name || "",
      amount: Number(pay.amount) || 0, txn_date: pay.txn_date,
      notes: pay.notes.trim() || null, created_by: user!.id,
    });
    setBusy(false);
    if (error) { setMsg("Save nahi hua: " + error.message); return; }
    setMsg(payLabel + " entry ho gayi ✅");
    setPay({ ...pay, amount: "", notes: "" });
    load();
  }

const T = totals();
  const fmt = (n: number) => "Rs " + n.toLocaleString("en-IN");
  const inputCls = "border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-steel-blue";
  const ledger = (() => { let run = 0; return txns.map((t) => { if (t.txn_type === billType) run += Number(t.amount); else if (t.txn_type === payType) run -= Number(t.amount); return { ...t, run }; }); })();

return (
    <main className="min-h-screen bg-[#F5F7FB]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0B1B2B]">{row?.name || label} — Khata Ledger</h1>
            <p className="mt-1 text-sm text-slate-500">{row?.city || ""} {row?.phone ? "· " + row.phone : ""} {row?.payment_terms ? "· Terms: " + row.payment_terms : ""}</p>
          </div>
          <Link href={"/dashboard/" + (party === "customer" ? "customers" : "suppliers")} className="text-sm font-bold text-slate-500 hover:text-steel-blue">← {label} list</Link>
        </div>
        <div className="mt-5"><DashboardNav /></div>

<div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Total " + billLabel, value: fmt(T.bill), hint: T.billQty.toFixed(2) + " " + (txns.find((x: any) => x.txn_type === billType)?.unit || "MT") },
            { label: payLabel, value: fmt(T.settled), hint: "Settled" },
            { label: "Balance", value: fmt(T.balance), hint: T.balance > 0 ? "Baaki (udhaari)" : "Clear" },
            { label: "Credit Limit", value: row?.credit_limit ? fmt(Number(row.credit_limit)) : "—", hint: "Approved" },
          ].map((c) => (
            <div key={c.label} className="bg-white rounded-2xl shadow p-4">
              <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">{c.label}</p>
              <p className="mt-1.5 text-lg font-extrabold text-[#0B1B2B]">{c.value}</p>
              <p className="mt-0.5 text-[11px] text-slate-400">{c.hint}</p>
            </div>
          ))}
        </div>

<div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <form onSubmit={saveEntry} className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-bold text-[#0B1B2B]">{billLabel} entry (bill)</h2>
            <div className="mt-4 space-y-3">
              <input className={inputCls + " w-full"} placeholder="Item name (e.g. TMT 12mm)" value={entry.item_name} onChange={(e) => setEntry({ ...entry, item_name: e.target.value })} />
              <div className="grid grid-cols-3 gap-3">
                <input className={inputCls} type="number" step="0.01" placeholder="Qty *" value={entry.quantity} onChange={(e) => setEntry({ ...entry, quantity: e.target.value })} />
                <select className={inputCls} value={entry.unit} onChange={(e) => setEntry({ ...entry, unit: e.target.value })}>
                  <option>MT</option><option>Kg</option><option>Pcs</option><option>Sqm</option><option>Rmt</option>
                </select>
                <input className={inputCls} type="number" step="0.01" placeholder="Rate *" value={entry.rate} onChange={(e) => setEntry({ ...entry, rate: e.target.value })} />
              </div>
              <input className={inputCls + " w-full"} type="date" value={entry.txn_date} onChange={(e) => setEntry({ ...entry, txn_date: e.target.value })} />
              <p className="text-xs text-slate-400">Amount auto: {fmt((Number(entry.quantity) || 0) * (Number(entry.rate) || 0))}</p>
            </div>
            <button disabled={busy} className="mt-2 bg-steel-navy hover:bg-steel-blue disabled:opacity-50 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-colors w-full">
              {busy ? "Saving..." : "Save " + billLabel}
            </button>
          </form>

<form onSubmit={savePay} className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-bold text-[#0B1B2B]">{payLabel} entry (khata)</h2>
            <div className="mt-4 space-y-3">
              <input className={inputCls + " w-full"} type="number" step="0.01" placeholder="Amount (Rs) *" value={pay.amount} onChange={(e) => setPay({ ...pay, amount: e.target.value })} />
              <input className={inputCls + " w-full"} placeholder="Notes (e.g. UPI, cash, cheque no.)" value={pay.notes} onChange={(e) => setPay({ ...pay, notes: e.target.value })} />
              <input className={inputCls + " w-full"} type="date" value={pay.txn_date} onChange={(e) => setPay({ ...pay, txn_date: e.target.value })} />
            </div>
            <button disabled={busy} className="mt-2 bg-gradient-to-r from-[#FF6A00] to-[#ff8f3f] hover:brightness-110 disabled:opacity-50 text-white text-sm font-bold px-6 py-2.5 rounded-xl w-full">
              {busy ? "Saving..." : "Save " + payLabel}
            </button>
          </form>
        </div>

{msg && <p className="mt-4 text-sm font-semibold text-steel-blue">{msg}</p>}

<div className="mt-6 bg-white rounded-2xl shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="font-bold text-[#0B1B2B]">Ledger ({txns.length} entries)</h2>
          </div>
          {loading ? (
            <p className="p-6 text-sm text-slate-400">Load ho raha hai...</p>
          ) : ledger.length === 0 ? (
            <p className="p-6 text-sm text-slate-400">Abhi koi entry nahi — upar form se pehli entry kijiye.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                <tr>
                  <th className="text-left px-6 py-3">Date</th>
                  <th className="text-left px-4 py-3">Type</th>
                  <th className="text-left px-4 py-3">Item / Note</th>
                  <th className="text-right px-4 py-3">Qty</th>
                  <th className="text-right px-4 py-3">Bill</th>
                  <th className="text-right px-4 py-3">Received/Paid</th>
                  <th className="text-right px-6 py-3">Running Balance</th>
                </tr>
              </thead>
              <tbody>
                {ledger.map((t) => (
                  <tr key={t.id} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="px-6 py-3 text-slate-500">{t.txn_date}</td>
                    <td className="px-4 py-3 font-semibold text-[#0B1B2B]">{t.txn_type === billType ? billLabel : payLabel}</td>
                    <td className="px-4 py-3 text-slate-500">{t.txn_type === billType ? (t.item_name || "—") + " @ " + t.rate : (t.notes || "—")}</td>
                    <td className="px-4 py-3 text-right text-slate-500">{t.txn_type === billType ? Number(t.quantity) + " " + t.unit : "—"}</td>
                    <td className="px-4 py-3 text-right font-bold text-slate-700">{t.txn_type === billType ? fmt(Number(t.amount)) : "—"}</td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-600">{t.txn_type === payType ? fmt(Number(t.amount)) : "—"}</td>
                    <td className="px-6 py-3 text-right font-extrabold text-orange-600">{fmt(t.run)}</td>
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