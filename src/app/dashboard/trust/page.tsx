"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function TrustModerationPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

async function load() {
    const { data } = await supabase.from("reviews").select("*").eq("status", "pending").order("created_at", { ascending: true }).limit(50);
    setRows(data || []);
    setLoading(false);
  }

useEffect(() => {
    (async () => {
      const { data: { user: u } } = await supabase.auth.getUser();
      setUser(u);
      if (u) load();
      else setLoading(false);
    })();
  }, []);

async function moderate(id: string, status: "published" | "rejected") {
    const { error } = await supabase.from("reviews").update({ status }).eq("id", id);
    if (error) { setMsg("Action fail: " + error.message); return; }
    setMsg(status === "published" ? "Review publish ho gayi ✅" : "Review reject ho gayi.");
    load();
  }

if (loading) return <main className="min-h-screen grid place-items-center text-slate-400">Load ho raha hai...</main>;
  if (!user) return <main className="min-h-screen grid place-items-center text-slate-400">Login kijiye.</main>;

return (
    <main className="min-h-screen bg-[#F5F7FB]">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-2xl font-extrabold text-[#0B1B2B]">Trust Moderation Queue</h1>
          <Link href="/dashboard" className="text-sm font-bold text-slate-500 hover:text-steel-blue">← Dashboard</Link>
        </div>
        <p className="mt-2 text-sm text-slate-500">Pending reviews — publish ya reject kijiye.</p>
        {msg && <p className="mt-3 text-sm font-semibold text-steel-blue">{msg}</p>}

<div className="mt-6 space-y-3">
          {rows.length === 0 && <p className="bg-white rounded-2xl shadow p-6 text-sm text-slate-400">Queue khali hai ✅</p>}
          {rows.map((r) => (
            <div key={r.id} className="bg-white rounded-2xl shadow p-5">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div>
                  <h3 className="font-bold text-[#0B1B2B]">{r.entity_name} — {"⭐".repeat(r.rating)}</h3>
                  <p className="text-xs text-slate-400">{r.reviewer_role} · {r.relationship} · {new Date(r.created_at).toLocaleDateString("en-IN")}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => moderate(r.id, "published")} className="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-4 py-2">Publish</button>
                  <button onClick={() => moderate(r.id, "rejected")} className="text-xs font-bold bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2">Reject</button>
                </div>
              </div>
              <p className="mt-2 text-sm text-slate-600 whitespace-pre-line">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
