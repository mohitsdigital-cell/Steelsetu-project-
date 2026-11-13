"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { DOC_META, DocType } from "@/lib/docTypes";

type Line = { item_name: string; quantity: string; unit: string; rate: string };

export default function DocEditor({ docType }: { docType: DocType }) {
  const router = useRouter();
  const meta = DOC_META[docType];
  const [parties, setParties] = useState<any[]>([]);
  const [partyId, setPartyId] = useState("");
  const [docDate, setDocDate] = useState(new Date().toISOString().slice(0, 10));
  const [validUntil, setValidUntil] = useState("");
  const [gstOn, setGstOn] = useState(docType === "tax_invoice");
  const [notes, setNotes] = useState("");
  const [lines, setLines] = useState<Line[]>([{ item_name: "", quantity: "", unit: "MT", rate: "" }]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.replace("/login?next=/dashboard"); return; }
      const { data: m } = await supabase.from("org_members").select("org_id").eq("user_id", user.id).single();
      if (!m?.org_id) return;
      const { data: p } = await supabase.from(meta.table).select("id, name").eq("org_id", m.org_id).order("name");
      setParties(p || []);
    })();
  }, []);

const num = (v: string) => Number(v) || 0;
  const subtotal = lines.reduce((a, l) => a + num(l.quantity) * num(l.rate), 0);
  const cgst = gstOn ? Math.round(subtotal * 0.09 * 100) / 100 : 0;
  const sgst = gstOn ? Math.round(subtotal * 0.09 * 100) / 100 : 0;
  const total = subtotal + cgst + sgst;
  const fmt = (n: number) => "Rs " + n.toLocaleString("en-IN");

function setLine(i: number, patch: Partial<Line>) {
    setLines((ls) => ls.map((l, idx) => (idx === i ? { ...l, ...patch } : l)));
  }

async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!partyId) { setMsg("Pehle party select kijiye"); return; }
    const valid = lines.filter((l) => l.item_name.trim() && num(l.quantity) > 0);
    if (valid.length === 0) { setMsg("Kam se kam ek valid line item chahiye"); return; }
    setBusy(true); setMsg("");
    const { data: { user } } = await supabase.auth.getUser();
    const { data: m } = await supabase.from("org_members").select("org_id").eq("user_id", user!.id).single();
    const orgId = m!.org_id;
    const party = parties.find((p) => p.id === partyId);

const { count } = await supabase
      .from("documents").select("id", { count: "exact", head: true })
      .eq("org_id", orgId).eq("doc_type", docType);
    const docNo = meta.prefix + "-" + String((count ?? 0) + 1).padStart(4, "0");

const { data: doc, error } = await supabase.from("documents").insert({
      org_id: orgId, doc_type: docType, doc_no: docNo,
      party_type: meta.party,
      customer_id: meta.party === "customer" ? partyId : null,
      supplier_id: meta.party === "supplier" ? partyId : null,
      party_name: party?.name || "",
      doc_date: docDate, valid_until: validUntil || null,
      status: "draft", subtotal, cgst, sgst, total,
      notes: notes.trim() || null, created_by: user!.id,
    }).select("id").single();

if (error) { setBusy(false); setMsg("Save nahi hua: " + error.message); return; }

const { error: itemErr } = await supabase.from("document_items").insert(
      valid.map((l, i) => ({
        document_id: doc.id, item_name: l.item_name.trim(),
        quantity: num(l.quantity), unit: l.unit, rate: num(l.rate),
        amount: num(l.quantity) * num(l.rate), sort_no: i,
      }))
    );
    setBusy(false);
    if (itemErr) { setMsg("Items save nahi hue: " + itemErr.message); return; }
    router.replace("/dashboard/documents/" + docType + "/doc/" + doc.id);
  }

const inputCls = "border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-steel-blue";

return (
    <main className="min-h-screen bg-[#F5F7FB]">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-extrabold text-[#0B1B2B]">Naya {meta.label}</h1>

<form onSubmit={save} className="mt-6 bg-white rounded-2xl shadow p-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <select className={inputCls} value={partyId} onChange={(e) => setPartyId(e.target.value)}>
              <option value="">— {meta.party === "customer" ? "Customer" : "Supplier"} select —</option>
              {parties.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <input className={inputCls} type="date" value={docDate} onChange={(e) => setDocDate(e.target.value)} />
            {docType === "quotation" && (
              <input className={inputCls} type="date" value={validUntil} onChange={(e) => setValidUntil(e.target.value)} title="Valid until" />
            )}
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <input type="checkbox" checked={gstOn} onChange={(e) => setGstOn(e.target.checked)} /> GST 18% (9+9)
            </label>
          </div>

<div className="mt-6">
            <div className="grid grid-cols-12 gap-2 text-[11px] font-bold uppercase text-slate-400 px-1">
              <div className="col-span-5">Item</div><div className="col-span-2">Qty</div><div className="col-span-2">Unit</div><div className="col-span-2">Rate</div><div className="col-span-1 text-right">Amt</div>
            </div>
            {lines.map((l, i) => (
              <div key={i} className="mt-2 grid grid-cols-12 gap-2">
                <input className={inputCls + " col-span-5"} placeholder="Item name (e.g. TMT 12mm)" value={l.item_name} onChange={(e) => setLine(i, { item_name: e.target.value })} />
                <input className={inputCls + " col-span-2"} type="number" step="0.01" placeholder="Qty" value={l.quantity} onChange={(e) => setLine(i, { quantity: e.target.value })} />
                <select className={inputCls + " col-span-2"} value={l.unit} onChange={(e) => setLine(i, { unit: e.target.value })}>
                  <option>MT</option><option>Kg</option><option>Pcs</option><option>Sqm</option><option>Rmt</option>
                </select>
                <input className={inputCls + " col-span-2"} type="number" step="0.01" placeholder="Rate" value={l.rate} onChange={(e) => setLine(i, { rate: e.target.value })} />
                <div className="col-span-1 flex items-center justify-between text-sm font-bold text-slate-700">
                  <span>{fmt(num(l.quantity) * num(l.rate))}</span>
                  {lines.length > 1 && (
                    <button type="button" onClick={() => setLines((ls) => ls.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600 font-bold">✕</button>
                  )}
                </div>
              </div>
            ))}
            <button type="button" onClick={() => setLines((ls) => [...ls, { item_name: "", quantity: "", unit: "MT", rate: "" }])} className="mt-3 text-sm font-bold text-steel-blue hover:underline">+ Add line</button>
          </div>

<textarea className={inputCls + " mt-5 w-full"} rows={2} placeholder="Terms / notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} />

<div className="mt-5 border-t border-slate-100 pt-4 flex items-center justify-between flex-wrap gap-3">
            <div className="text-sm text-slate-500 space-y-1">
              <p>Subtotal: <b className="text-slate-700">{fmt(subtotal)}</b></p>
              {gstOn && <p>CGST 9% + SGST 9%: <b className="text-slate-700">{fmt(cgst + sgst)}</b></p>}
              <p className="text-base">Total: <b className="text-[#0B1B2B]">{fmt(total)}</b></p>
            </div>
            <button disabled={busy} className="bg-steel-navy hover:bg-steel-blue disabled:opacity-50 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-colors">
              {busy ? "Saving..." : "Save " + meta.label}
            </button>
          </div>
          {msg && <p className="mt-3 text-sm font-semibold text-orange-600">{msg}</p>}
        </form>
      </div>
    </main>
  );
}
