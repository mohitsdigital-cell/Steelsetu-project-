"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import DashboardNav from "@/components/dashboard/DashboardNav";

export default function InventoryPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [form, setForm] = useState({ item_name: "", brand: "", grade: "", unit: "MT", reorder_level: "" });
  const [move, setMove] = useState({ id: "", qty: "", dir: "in" });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

async function load() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data: m } = await supabase.from("org_members").select("org_id").eq("user_id", user.id).single();
    if (!m?.org_id) { setLoading(false); return; }
    const { data } = await supabase.from("inventory").select("*").eq("org_id", m.org_id).order("created_at", { ascending: false });
    setRows(data || []);
    setLoading(false);
  }

useEffect(() => { load(); }, []);

async function addItem(e: React.FormEvent) {
    e.preventDefault();
    if (!form.item_name.trim()) return;
    setBusy(true); setMsg("");
    const { data: { user } } = await supabase.auth.getUser();
    const { data: m } = await supabase.from("org_members").select("org_id").eq("user_id", user!.id).single();
    const { error } = await supabase.from("inventory").insert({
      org_id: m!.org_id,
      item_name: form.item_name.trim(),
      brand: form.brand.trim() || null,
      grade: form.grade.trim() || null,
      unit: form.unit,
      reorder_level: Number(form.reorder_level) || 0,
      created_by: user!.id,
    });
    setBusy(false);
    if (error) { setMsg("Save nahi hua: " + error.message); return; }
    setMsg("Item add ho gaya ✅");
    setForm({ item_name: "", brand: "", grade: "", unit: "MT", reorder_level: "" });
    load();
  }

async function applyMove(e: React.FormEvent) {
    e.preventDefault();
    if (!move.id || !Number(move.qty)) { setMsg("Item aur qty select kijiye"); return; }
    setBusy(true); setMsg("");
    const row = rows.find((r) => r.id === move.id);
    const patch = move.dir === "in"
      ? { in_qty: Number(row.in_qty) + Number(move.qty) }
      : { out_qty: Number(row.out_qty) + Number(move.qty) };
    const { error } = await supabase.from("inventory").update(patch).eq("id", move.id);
    setBusy(false);
    if (error) { setMsg("Update nahi hua: " + error.message); return; }
    setMsg((move.dir === "in" ? "Stock IN" : "Stock OUT") + " ho gaya ✅");
    setMove({ id: "", qty: "", dir: "in" });
    load();
  }

const inputCls = "border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-steel-blue";

return (
    <main className="min-h-screen bg-[#F5F7FB]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-2xl font-extrabold text-[#0B1B2B]">Inventory (E5)</h1>
          <Link href="/dashboard" className="text-sm font-bold text-slate-500 hover:text-steel-blue">← Dashboard</Link>
        </div>
        <div className="mt-5"><DashboardNav /></div>

<div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <form onSubmit={addItem} className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-bold text-[#0B1B2B]">Naya item add karein</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <input className={inputCls} placeholder="Item name *" value={form.item_name} onChange={(e) => setForm({ ...form, item_name: e.target.value })} />
              <input className={inputCls} placeholder="Brand (optional)" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
              <input className={inputCls} placeholder="Grade / size (optional)" value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} />
              <select className={inputCls} value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })}>
                <option>MT</option><option>Kg</option><option>Pcs</option><option>Sqm</option><option>Rmt</option>
              </select>
              <input className={inputCls} type="number" placeholder="Reorder level" value={form.reorder_level} onChange={(e) => setForm({ ...form, reorder_level: e.target.value })} />
            </div>
            <button disabled={busy} className="mt-4 bg-steel-navy hover:bg-steel-blue disabled:opacity-50 text-white text-sm font-bold px-6 py-2.5 rounded-xl">Add Item</button>
          </form>

<form onSubmit={applyMove} className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-bold text-[#0B1B2B]">Stock IN / OUT entry</h2>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <select className={inputCls + " col-span-1"} value={move.id} onChange={(e) => setMove({ ...move, id: e.target.value })}>
                <option value="">— Item —</option>
                {rows.map((r) => <option key={r.id} value={r.id}>{r.item_name}</option>)}
              </select>
              <input className={inputCls} type="number" step="0.01" placeholder="Qty" value={move.qty} onChange={(e) => setMove({ ...move, qty: e.target.value })} />
              <select className={inputCls} value={move.dir} onChange={(e) => setMove({ ...move, dir: e.target.value })}>
                <option value="in">IN (+)</option><option value="out">OUT (−)</option>
              </select>
            </div>
            <button disabled={busy} className="mt-4 bg-gradient-to-r from-[#FF6A00] to-[#ff8f3f] hover:brightness-110 disabled:opacity-50 text-white text-sm font-bold px-6 py-2.5 rounded-xl">Apply</button>
          </form>
        </div>

{msg && <p className="mt-4 text-sm font-semibold text-steel-blue">{msg}</p>}

<div className="mt-6 bg-white rounded-2xl shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100"><h2 className="font-bold text-[#0B1B2B]">Stock list ({rows.length})</h2></div>
          {loading ? (
            <p className="p-6 text-sm text-slate-400">Load ho raha hai...</p>
          ) : rows.length === 0 ? (
            <p className="p-6 text-sm text-slate-400">Abhi koi item nahi — upar form se add kijiye.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                <tr>
                  <th className="text-left px-6 py-3">Item</th>
                  <th className="text-left px-4 py-3">Brand</th>
                  <th className="text-left px-4 py-3">Grade</th>
                  <th className="text-right px-4 py-3">In</th>
                  <th className="text-right px-4 py-3">Out</th>
                  <th className="text-right px-4 py-3">Stock</th>
                  <th className="text-right px-6 py-3">Alert</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const stock = Number(r.in_qty) - Number(r.out_qty);
                  const low = stock <= Number(r.reorder_level) && Number(r.reorder_level) > 0;
                  return (
                    <tr key={r.id} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="px-6 py-3 font-semibold text-[#0B1B2B]">{r.item_name}</td>
                      <td className="px-4 py-3 text-slate-500">{r.brand || "—"}</td>
                      <td className="px-4 py-3 text-slate-500">{r.grade || "—"}</td>
                      <td className="px-4 py-3 text-right text-slate-500">{Number(r.in_qty)} {r.unit}</td>
                      <td className="px-4 py-3 text-right text-slate-500">{Number(r.out_qty)} {r.unit}</td>
                      <td className="px-4 py-3 text-right font-bold text-slate-700">{stock} {r.unit}</td>
                      <td className="px-6 py-3 text-right">{low ? <span className="text-[10px] font-bold uppercase text-orange-700 bg-orange-50 border border-orange-200 rounded-full px-2 py-1">Reorder</span> : <span className="text-slate-300">—</span>}</td>
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
