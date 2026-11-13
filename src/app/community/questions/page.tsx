"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ROOMS, roomLabel } from "@/lib/community";

export default function QuestionsPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState({ title: "", body: "", room: "buy-requirements-rfq", author: "" });
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

async function load() {
    const { data } = await supabase
      .from("community_questions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    setRows((data || []).filter((r: any) => r.status === "published"));
  }

useEffect(() => {
    (async () => {
      const { data: { user: u } } = await supabase.auth.getUser();
      setUser(u);
      if (u) {
        const { data: prof } = await supabase.from("profiles").select("full_name").eq("id", u.id).maybeSingle();
        setForm((f) => ({ ...f, author: prof?.full_name || "" }));
      }
      load();
    })();
  }, []);

async function ask(e: React.FormEvent) {
    e.preventDefault();
    if (!user) { setMsg("Question post karne ke liye pehle login kijiye."); return; }
    if (form.title.trim().length < 5) { setMsg("Title kam se kam 5 characters ka hona chahiye."); return; }
    setBusy(true); setMsg("");
    const { error } = await supabase.from("community_questions").insert({
      title: form.title.trim(),
      body: form.body.trim() || null,
      room: form.room,
      author_name: (form.author.trim() || "Trader").slice(0, 80),
      created_by: user.id,
    });
    setBusy(false);
    if (error) { setMsg("Post nahi hua: " + error.message); return; }
    setForm({ ...form, title: "", body: "" });
    setMsg("Question publish ho gaya ✅");
    load();
  }

const inputCls = "border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-steel-blue w-full";

return (
    <main className="min-h-screen bg-[#F5F7FB]">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link href="/community" className="text-sm font-bold text-slate-500 hover:text-steel-blue">← Community Hub</Link>
        <h1 className="mt-2 text-3xl font-extrabold text-[#0B1B2B]">Trade Questions &amp; Answers</h1>
        <p className="mt-2 text-sm text-slate-500">Trade sawal poochhiye, tajurbe se jawaab paayein. Zero-drama, business-focused.</p>

<form onSubmit={ask} className="mt-6 bg-white rounded-2xl shadow p-5">
          <h2 className="font-bold text-[#0B1B2B]">Ek sawal poochhiye</h2>
          <div className="mt-3 grid gap-3">
            <input className={inputCls} placeholder="Question title *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <textarea className={inputCls} rows={3} placeholder="Details (optional)" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <select className={inputCls} value={form.room} onChange={(e) => setForm({ ...form, room: e.target.value })}>
                {ROOMS.map((r) => <option key={r.slug} value={r.slug}>{r.label}</option>)}
              </select>
              <input className={inputCls} placeholder="Aapka naam" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
            </div>
          </div>
          <button disabled={busy} className="mt-4 bg-steel-navy hover:bg-steel-blue disabled:opacity-50 text-white text-sm font-bold px-6 py-2.5 rounded-xl">
            {busy ? "Posting..." : "Post Question"}
          </button>
          {msg && <p className="mt-3 text-sm font-semibold text-steel-blue">{msg}</p>}
        </form>

<div className="mt-6 space-y-3">
          {rows.length === 0 && <p className="bg-white rounded-2xl shadow p-6 text-sm text-slate-400">Abhi koi question nahi. Pehla sawal aap poochhiye!</p>}
          {rows.map((q) => (
            <Link key={q.id} href={"/community/questions/" + q.id} className="block bg-white rounded-2xl shadow p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-600 rounded-full px-2 py-1">{roomLabel(q.room)}</span>
                <span className="text-xs text-slate-400">{new Date(q.created_at).toLocaleDateString("en-IN")}</span>
              </div>
              <h3 className="mt-2 font-bold text-[#0B1B2B]">{q.title}</h3>
              <p className="mt-1 text-xs text-slate-500">by {q.author_name}{q.best_answer_id ? " · ✓ Best answer marked" : ""}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
