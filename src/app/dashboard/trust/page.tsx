"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function TrustModerationPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [appeals, setAppeals] = useState<any[]>([]);
  const [audit, setAudit] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

async function load() {
    const { data: pend } = await supabase.from("reviews").select("*").eq("status", "pending").order("created_at", { ascending: true }).limit(50);
    setRows(pend || []);
    const { data: ap } = await supabase.from("review_appeals").select("*").eq("status", "open").order("created_at", { ascending: true }).limit(30);
    setAppeals(ap || []);
    const { data: log } = await supabase.from("trust_audit_log").select("*").order("created_at", { ascending: false }).limit(20);
    setAudit(log || []);
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
    setMsg(status === "published" ? "Review publish ho gayi ✅ (audit logged)" : "Review reject ho gayi. (audit logged)");
    load();
  }

async function resolveAppeal(id: string, outcome: "resolved" | "dismissed") {
    const { error } = await supabase.from("review_appeals").update({ status: outcome }).eq("id", id);
    if (error) { setMsg("Appeal update fail: " + error.message); return; }
    setMsg("Appeal " + outcome + " ho gayi.");
    load();
  }

if (loading) return <main className="min-h-screen grid place-items-center text-slate-400">Load ho raha hai...</main>;
  if (!user) return <main className="min-h-screen grid place-items-center text-slate-400">Login kijiye.</main>;

const btn = "text-xs font-bold rounded-lg px-4 py-2 text-white";

return (
    <main className="min-h-screen bg-[#F5F7FB]">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-2xl font-extrabold text-[#0B1B2B]">Trust Moderation</h1>
          <Link href="/dashboard" className="text-sm font-bold text-slate-500 hover:text-steel-blue">← Dashboard</Link>
        </div>
        {msg && <p className="mt-3 text-sm font-semibold text-steel-blue">{msg}</p>}

<h2 className="mt-6 font-bold text-[#0B1B2B]">Pending Reviews ({rows.length})</h2>
        <div className="mt-3 space-y-3">
          {rows.length === 0 && <p className="bg-white rounded-2xl shadow p-5 text-sm text-slate-400">Queue khali hai ✅</p>}
          {rows.map((r) => (
            <div key={r.id} className="bg-white rounded-2xl shadow p-5">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div>
                  <h3 className="font-bold text-[#0B1B2B]">{r.entity_name} — {"⭐".repeat(r.rating)}</h3>
                  <p className="text-xs text-slate-400">{r.reviewer_role} · {r.relationship} · {new Date(r.created_at).toLocaleDateString("en-IN")}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => moderate(r.id, "published")} className={btn + " bg-emerald-600 hover:bg-emerald-700"}>Publish</button>
                  <button onClick={() => moderate(r.id, "rejected")} className={btn + " bg-red-600 hover:bg-red-700"}>Reject</button>
                </div>
              </div>
              <p className="mt-2 text-sm text-slate-600 whitespace-pre-line">{r.body}</p>
            </div>
          ))}
        </div>

<h2 className="mt-8 font-bold text-[#0B1B2B]">Open Appeals ({appeals.length})</h2>
        <div className="mt-3 space-y-3">
          {appeals.length === 0 && <p className="bg-white rounded-2xl shadow p-5 text-sm text-slate-400">Koi open appeal nahi ✅</p>}
          {appeals.map((a) => (
            <div key={a.id} className="bg-white rounded-2xl shadow p-5">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div>
                  <h3 className="font-bold text-[#0B1B2B]">Appeal by {a.requester_name}</h3>
                  <p className="text-xs text-slate-400">{new Date(a.created_at).toLocaleDateString("en-IN")}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => resolveAppeal(a.id, "resolved")} className={btn + " bg-emerald-600 hover:bg-emerald-700"}>Resolve</button>
                  <button onClick={() => resolveAppeal(a.id, "dismissed")} className={btn + " bg-slate-500 hover:bg-slate-600"}>Dismiss</button>
                </div>
              </div>
              <p className="mt-2 text-sm text-slate-600 whitespace-pre-line">{a.reason}</p>
            </div>
          ))}
        </div>

<h2 className="mt-8 font-bold text-[#0B1B2B]">Recent Audit Log</h2>
        <div className="mt-3 bg-white rounded-2xl shadow p-5">
          {audit.length === 0 && <p className="text-sm text-slate-400">Abhi koi action logged nahi. Publish/Reject karte hi yahan entry aayegi.</p>}
          <div className="space-y-2">
            {audit.map((l) => (
              <div key={l.id} className="flex justify-between text-xs border-b border-slate-100 pb-2">
                <span className="font-semibold text-steel-navy">{l.action}</span>
                <span className="text-slate-400">{l.details} · {new Date(l.created_at).toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
