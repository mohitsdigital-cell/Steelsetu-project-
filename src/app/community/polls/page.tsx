"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function PollsPage() {
  const [polls, setPolls] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({ question: "", opt1: "", opt2: "", opt3: "", opt4: "" });

async function load() {
    const { data } = await supabase.from("community_polls").select("*").order("created_at", { ascending: false }).limit(20);
    const withOpts: any[] = [];
    for (const p of data || []) {
      const { data: opts } = await supabase.from("community_poll_options").select("*").eq("poll_id", p.id).order("sort_no");
      const { data: votes } = await supabase.from("community_poll_votes").select("option_id, user_id").eq("poll_id", p.id);
      withOpts.push({ ...p, options: opts || [], votes: votes || [] });
    }
    setPolls(withOpts);
  }

useEffect(() => {
    (async () => {
      const { data: { user: u } } = await supabase.auth.getUser();
      setUser(u);
      load();
    })();
  }, []);

async function vote(pollId: string, optionId: string) {
    if (!user) { setMsg("Vote karne ke liye login kijiye."); return; }
    const { error } = await supabase.from("community_poll_votes").insert({ poll_id: pollId, option_id: optionId, user_id: user.id });
    if (error) {
      if (error.code === "23505") { setMsg("Aap is poll mein pehle hi vote kar chuke hain."); }
      else { setMsg("Vote nahi hua: " + error.message); }
      return;
    }
    setMsg("Vote record ho gaya ✅");
    load();
  }

async function createPoll(e: React.FormEvent) {
    e.preventDefault();
    if (!user) { setMsg("Poll banane ke liye login kijiye."); return; }
    if (form.question.trim().length < 5 || !form.opt1.trim() || !form.opt2.trim()) {
      setMsg("Question aur kam se kam 2 options zaroori hain."); return;
    }
    const { data: p, error } = await supabase.from("community_polls").insert({ question: form.question.trim(), created_by: user.id }).select().single();
    if (error) { setMsg("Poll nahi bana: " + error.message); return; }
    const opts = [form.opt1, form.opt2, form.opt3, form.opt4].filter((o) => o.trim()).map((label, i) => ({ poll_id: p.id, label: label.trim(), sort_no: i }));
    await supabase.from("community_poll_options").insert(opts);
    setForm({ question: "", opt1: "", opt2: "", opt3: "", opt4: "" });
    setMsg("Poll live ho gaya ✅");
    load();
  }

const inputCls = "border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-steel-blue w-full";

return (
    <main className="min-h-screen bg-[#F5F7FB]">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link href="/community" className="text-sm font-bold text-slate-500 hover:text-steel-blue">← Community Hub</Link>
        <h1 className="mt-2 text-3xl font-extrabold text-[#0B1B2B]">Market Sentiment Polls</h1>
        <p className="mt-2 text-sm text-slate-500">Sentiment indicators hain — verified market price ya survey nahi.</p>

{msg && <p className="mt-4 bg-white rounded-xl shadow px-4 py-3 text-sm font-semibold text-steel-blue">{msg}</p>}

<div className="mt-6 space-y-4">
          {polls.length === 0 && <p className="bg-white rounded-2xl shadow p-6 text-sm text-slate-400">Abhi koi poll nahi. Neeche se pehla poll banaiye.</p>}
          {polls.map((p) => {
            const total = p.votes.length;
            const myVote = user ? p.votes.find((v: any) => v.user_id === user.id) : null;
            return (
              <div key={p.id} className="bg-white rounded-2xl shadow p-5">
                <h3 className="font-bold text-[#0B1B2B]">{p.question}</h3>
                <p className="text-xs text-slate-400 mt-1">{total} vote{total === 1 ? "" : "s"} · {new Date(p.created_at).toLocaleDateString("en-IN")}</p>
                <div className="mt-3 space-y-2">
                  {p.options.map((o: any) => {
                    const count = p.votes.filter((v: any) => v.option_id === o.id).length;
                    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                    return (
                      <button key={o.id} onClick={() => vote(p.id, o.id)} disabled={!!myVote}
                        className="w-full text-left border border-slate-200 rounded-xl px-4 py-2.5 hover:border-steel-blue disabled:hover:border-slate-200 transition-colors">
                        <div className="flex justify-between text-sm">
                          <span className="font-semibold text-slate-700">{o.label} {myVote?.option_id === o.id ? "✓" : ""}</span>
                          <span className="text-slate-500">{myVote ? pct + "% (" + count + ")" : "Vote →"}</span>
                        </div>
                        {myVote && <div className="mt-1.5 h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-steel-blue rounded-full" style={{ width: pct + "%" }}></div></div>}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

<form onSubmit={createPoll} className="mt-8 bg-white rounded-2xl shadow p-5">
          <h2 className="font-bold text-[#0B1B2B]">Naya poll banaiye</h2>
          <input className={inputCls + " mt-3"} placeholder="Poll question *" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} />
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input className={inputCls} placeholder="Option 1 *" value={form.opt1} onChange={(e) => setForm({ ...form, opt1: e.target.value })} />
            <input className={inputCls} placeholder="Option 2 *" value={form.opt2} onChange={(e) => setForm({ ...form, opt2: e.target.value })} />
            <input className={inputCls} placeholder="Option 3 (optional)" value={form.opt3} onChange={(e) => setForm({ ...form, opt3: e.target.value })} />
            <input className={inputCls} placeholder="Option 4 (optional)" value={form.opt4} onChange={(e) => setForm({ ...form, opt4: e.target.value })} />
          </div>
          <button className="mt-4 bg-steel-navy hover:bg-steel-blue text-white text-sm font-bold px-6 py-2.5 rounded-xl">Create Poll</button>
        </form>
      </div>
    </main>
  );
}
