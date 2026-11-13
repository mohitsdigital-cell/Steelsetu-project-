"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { DOC_META, DocType } from "@/lib/docTypes";

export default function DocList({ docType }: { docType: DocType }) {
  const meta = DOC_META[docType];
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: m } = await supabase.from("org_members").select("org_id").eq("user_id", user.id).single();
      if (!m?.org_id) { setLoading(false); return; }
      const { data } = await supabase
        .from("documents")
        .select("id, doc_no, party_name, doc_date, total, status")
        .eq("org_id", m.org_id)
        .eq("doc_type", docType)
        .order("created_at", { ascending: false });
      setRows(data || []);
      setLoading(false);
    })();
  }, [docType]);

const fmt = (n: number) => "Rs " + n.toLocaleString("en-IN");

return (
    <main className="min-h-screen bg-[#F5F7FB]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-2xl font-extrabold text-[#0B1B2B]">{meta.label}s</h1>
          <Link href={"/dashboard/documents/" + docType + "/new"} className="bg-steel-navy hover:bg-steel-blue text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors">
            + New {meta.label}
          </Link>
        </div>

<div className="mt-6 bg-white rounded-2xl shadow overflow-hidden">
          {loading ? (
            <p className="p-6 text-sm text-slate-400">Load ho raha hai...</p>
          ) : rows.length === 0 ? (
            <p className="p-6 text-sm text-slate-400">Abhi koi {meta.label.toLowerCase()} nahi — upar button se pehla bana iye.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                <tr>
                  <th className="text-left px-6 py-3">Doc No</th>
                  <th className="text-left px-4 py-3">{meta.party === "customer" ? "Customer" : "Supplier"}</th>
                  <th className="text-left px-4 py-3">Date</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-right px-4 py-3">Total</th>
                  <th className="text-right px-6 py-3">View</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="px-6 py-3 font-semibold text-[#0B1B2B]">{r.doc_no}</td>
                    <td className="px-4 py-3 text-slate-500">{r.party_name}</td>
                    <td className="px-4 py-3 text-slate-500">{r.doc_date}</td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] font-bold uppercase rounded-full px-2 py-1 bg-slate-100 text-slate-600">{r.status}</span>
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-slate-700">{fmt(Number(r.total))}</td>
                    <td className="px-6 py-3 text-right">
                      <Link href={"/dashboard/documents/" + docType + "/doc/" + r.id} className="font-bold text-steel-blue hover:underline">Open →</Link>
                    </td>
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
