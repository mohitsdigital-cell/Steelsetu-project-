"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { DOC_META, DocType } from "@/lib/docTypes";

export default function DocView({ docType, id }: { docType: DocType; id: string }) {
  const meta = DOC_META[docType];
  const [doc, setDoc] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [org, setOrg] = useState<any>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    (async () => {
      const { data: d } = await supabase.from("documents").select("*").eq("id", id).single();
      setDoc(d);
      const { data: it } = await supabase.from("document_items").select("*").eq("document_id", id).order("sort_no");
      setItems(it || []);
      if (d?.org_id) {
        const { data: o } = await supabase.from("orgs").select("*").eq("id", d.org_id).single();
        setOrg(o || null);
      }
      setLoading(false);
    })();
  }, [id]);

async function setStatus(status: string) {
    await supabase.from("documents").update({ status }).eq("id", id);
    setDoc({ ...doc, status });
  }

const fmt = (n: number) => "Rs " + n.toLocaleString("en-IN");

if (loading) return <main className="min-h-screen grid place-items-center text-slate-400">Load ho raha hai...</main>;
  if (!doc) return <main className="min-h-screen grid place-items-center text-slate-400">Document nahi mila.</main>;

const orgAddr = [org?.address, org?.city, org?.state, org?.pincode].filter(Boolean).join(", ");

return (
    <main className="min-h-screen bg-[#F5F7FB]">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between print:hidden flex-wrap gap-3">
          <Link href={"/dashboard/documents/" + docType} className="text-sm font-bold text-slate-500 hover:text-steel-blue">← {meta.label}s</Link>
          <div className="flex gap-2">
            <button onClick={() => window.print()} className="text-sm font-bold border border-slate-300 rounded-lg px-4 py-2 hover:bg-slate-50">🖨️ Print</button>
            {doc.status === "draft" && <button onClick={() => setStatus("sent")} className="text-sm font-bold bg-steel-navy text-white rounded-lg px-4 py-2 hover:bg-steel-blue">Mark Sent</button>}
            {doc.status === "sent" && <button onClick={() => setStatus("confirmed")} className="text-sm font-bold bg-emerald-600 text-white rounded-lg px-4 py-2 hover:bg-emerald-700">Mark Confirmed</button>}
          </div>
        </div>

<div className="mt-4 bg-white rounded-2xl shadow p-8">
          <div className="flex items-start justify-between flex-wrap gap-3 border-b border-slate-100 pb-5">
            <div>
              <h1 className="text-xl font-extrabold text-[#0B1B2B]">{org?.name || "Steelsetu"}</h1>
              {orgAddr && <p className="text-xs text-slate-500 mt-1 max-w-xs">{orgAddr}</p>}
              {org?.gstin && <p className="text-xs text-slate-500">GSTIN: <b>{org.gstin}</b></p>}
              {(org?.phone || org?.email) && (
                <p className="text-xs text-slate-400">{[org.phone, org.email].filter(Boolean).join(" · ")}</p>
              )}
            </div>
            <div className="text-right">
              <h2 className="text-lg font-bold text-steel-navy">{meta.label.toUpperCase()}</h2>
              <p className="text-sm font-bold text-slate-500">{doc.doc_no}</p>
              <p className="text-xs text-slate-400">Date: {doc.doc_date}{doc.valid_until ? " · Valid till: " + doc.valid_until : ""}</p>
              <span className="inline-block mt-1 text-[10px] font-bold uppercase rounded-full px-2 py-1 bg-slate-100 text-slate-600 print:bg-white print:border print:border-slate-300">{doc.status}</span>
            </div>
          </div>

<p className="mt-5 text-sm"><span className="text-slate-400">To: </span><b className="text-[#0B1B2B]">{doc.party_name}</b></p>

<table className="mt-5 w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
              <tr>
                <th className="text-left px-3 py-2">Item</th>
                <th className="text-right px-3 py-2">Qty</th>
                <th className="text-right px-3 py-2">Rate</th>
                <th className="text-right px-3 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id} className="border-t border-slate-100">
                  <td className="px-3 py-2 font-semibold text-slate-700">{it.item_name}</td>
                  <td className="px-3 py-2 text-right text-slate-500">{Number(it.quantity)} {it.unit}</td>
                  <td className="px-3 py-2 text-right text-slate-500">{fmt(Number(it.rate))}</td>
                  <td className="px-3 py-2 text-right font-bold text-slate-700">{fmt(Number(it.amount))}</td>
                </tr>
              ))}
            </tbody>
          </table>

<div className="mt-5 border-t border-slate-100 pt-4 ml-auto max-w-xs space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-slate-400">Subtotal</span><b>{fmt(Number(doc.subtotal))}</b></div>
            {Number(doc.cgst) > 0 && <div className="flex justify-between"><span className="text-slate-400">CGST 9%</span><b>{fmt(Number(doc.cgst))}</b></div>}
            {Number(doc.sgst) > 0 && <div className="flex justify-between"><span className="text-slate-400">SGST 9%</span><b>{fmt(Number(doc.sgst))}</b></div>}
            <div className="flex justify-between text-base border-t border-slate-100 pt-2"><span className="text-slate-400">Total</span><b className="text-[#0B1B2B]">{fmt(Number(doc.total))}</b></div>
          </div>

{(org?.bank_name || org?.bank_account) && (
            <div className="mt-5 border-t border-slate-100 pt-3 text-xs text-slate-500">
              <b className="text-slate-600">Bank:</b> {org.bank_name || "—"} · A/c: {org.bank_account || "—"} · IFSC: {org.bank_ifsc || "—"}
            </div>
          )}

{doc.notes && <p className="mt-5 text-xs text-slate-400">Notes: {doc.notes}</p>}
          <p className="mt-6 text-[10px] text-slate-400 text-center">This is a computer generated document — Steelsetu</p>
        </div>
      </div>
    </main>
  );
}
