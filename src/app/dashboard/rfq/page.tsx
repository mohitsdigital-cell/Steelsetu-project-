"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import DashboardNav from "@/components/dashboard/DashboardNav";

export default function RfqInboxPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("rfq_submissions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      setRows(data || []);
      setLoading(false);
    })();
  }, []);

return (
    <main className="min-h-screen bg-[#F5F7FB]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-2xl font-extrabold text-[#0B1B2B]">RFQ Inbox</h1>
          <Link href="/dashboard" className="text-sm font-bold text-slate-500 hover:text-steel-blue">← Dashboard</Link>
        </div>
        <div className="mt-5"><DashboardNav /></div>

<div className="mt-6 bg-white rounded-2xl shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100"><h2 className="font-bold text-[#0B1B2B]">Buyer requirements ({rows.length})</h2></div>
          {loading ? (
            <p className="p-6 text-sm text-slate-400">Load ho raha hai...</p>
          ) : rows.length === 0 ? (
            <p className="p-6 text-sm text-slate-400">Abhi koi RFQ nahi aayi.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                <tr>
                  <th className="text-left px-6 py-3">Date</th>
                  <th className="text-left px-4 py-3">Buyer</th>
                  <th className="text-left px-4 py-3">Phone</th>
                  <th className="text-left px-4 py-3">Requirement</th>
                  <th className="text-right px-6 py-3">Matched</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-t border-slate-100 hover:bg-slate-50 align-top">
                    <td className="px-6 py-3 text-slate-500">{new Date(r.created_at).toLocaleDateString("en-IN")}</td>
                    <td className="px-4 py-3 font-semibold text-[#0B1B2B]">{r.contact_name}</td>
                    <td className="px-4 py-3 text-slate-500">{r.contact_phone}</td>
                    <td className="px-4 py-3 text-slate-500">
                      {r.requirement?.productType || "—"}
                      {r.requirement?.quantity ? " · " + r.requirement.quantity : ""}
                      {r.requirement?.city ? " · " + r.requirement.city : ""}
                    </td>
                    <td className="px-6 py-3 text-right">
                      {(r.matched_slugs || []).length > 0
                        ? <Link href={"/products/" + r.matched_slugs[0]} className="font-bold text-steel-blue hover:underline">{r.matched_slugs.length} products →</Link>
                        : <span className="text-slate-300">—</span>}
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
