"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { roomLabel } from "@/lib/community";

export default function QuestionDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [q, setQ] = useState<any>(null);
  const [answers, setAnswers] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

async function load() {
    const { data: qd } = await supabase.from("community_questions").select("*").eq("id", slug).single();
    setQ(qd);
    const { data: ans } = await supabase.from("community_answers").select("*").eq("question_id", slug).order("created_at");
    setAnswers(ans || []);
  }

useEffect(() => {
    (async () => {
      const { data: { user: u } } = await supabase.auth.getUser();
      setUser(u);
      if (u) {
        const { data: prof } = await supabase.from("profiles").select("full_name").eq("id", u.id).maybeSingle();
        setAuthor(prof?.full_name || "");
      }
      load();
    })();
  }, [slug]);

async function answer(e: React.FormEvent) {
    e.preventDefault();
    if (!user) { setMsg("Jawaab dene ke liye login kijiye."); return; }
    if (body.trim().length < 2) { setMsg("Jawaab likhiye."); return; }
    setBusy(true); setMsg("");
    const { error } = await supabase.from("community_answers").insert({
      question_id: slug,
      body: body.trim(),
      author_name: (author.trim() || "Trader").slice(0, 80),
    });
    setBusy(false);
    if (error) { setMsg("Post nahi hua: " + error.message); return; }
    setBody("");
    setMsg("Jawaab save ho gaya ✅");
    load();
  }

async function markBest(answerId: string) {
    const { error } = await supabase.from("community_questions").update({ best_answer_id: answerId }).eq("id", slug);
    if (error) { setMsg("Mark nahi hua: " + error.message); return; }
    load();
  }

if (!q) return <main className="min-h-screen grid place-items-center text-slate-400">Load ho raha hai...</main>;

const inputCls = "border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-steel-blue w-full";
  const rfqHref = "/rfq?productType=" + encodeURIComponent(q.title.slice(0, 60)) + "&notes=" + encodeURIComponent("Source: community post");

return (
    <main className="min-h-screen bg-[#F5F7FB]">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link href="/community/questions" className="text-sm font-bold text-slate-500 hover:text-steel-blue">← All Questions</Link>
        <div className="mt-3 bg-white rounded-2xl shadow p-6">
          <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-600 rounded-full px-2 py-1">{roomLabel(q.room)}</span>
          <h1 className="mt-2 text-2xl font-extrabold text-[#0B1B2B]">{q.title}</h1>
          {q.body && <p className="mt-3 text-sm text-slate-600 whitespace-pre-line">{q.body}</p>}
          <p className="mt-4 text-xs text-slate-400">by {q.author_name} · {new Date(q.created_at).toLocaleDateString("en-IN")}</p>
          <Link href={rfqHref} className="mt-4 inline-block bg-steel-blue hover:bg-steel-navy text-white text-xs font-bold px-4 py-2 rounded-xl">
            Convert to RFQ →
          </Link>
        </div>

<div className="mt-6 space-y-3">
          <h2 className="font-bold text-[#0B1B2B]">Jawaab ({answers.length})</h2>
          {answers.map((a) => (
            <div key={a.id} className={"bg-white rounded-2xl shadow p-5 " + (q.best_answer_id === a.id ? "border-2 border-emerald-500" : "")}>
              <p className="text-sm text-slate-700 whitespace-pre-line">{a.body}</p>
              <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs text-slate-400">{a.author_name} · {new Date(a.created_at).toLocaleDateString("en-IN")}</span>
                <div className="flex gap-2">
                  {q.best_answer_id === a.id && <span className="text-xs font-bold text-emerald-600">✓ Best Answer</span>}
                  {user && q.created_by === user.id && q.best_answer_id !== a.id && (
                    <button onClick={() => markBest(a.id)} className="text-xs font-bold border border-slate-300 rounded-lg px-3 py-1 hover:bg-slate-50">Mark Best</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

<form onSubmit={answer} className="mt-6 bg-white rounded-2xl shadow p-5">
          <h2 className="font-bold text-[#0B1B2B]">Apna jawaab dijiye</h2>
          <textarea className={inputCls + " mt-3"} rows={3} placeholder={user ? "Jawaab likhiye..." : "Login karke jawaab dijiye"} value={body} onChange={(e) => setBody(e.target.value)} />
          <input className={inputCls + " mt-3"} placeholder="Aapka naam" value={author} onChange={(e) => setAuthor(e.target.value)} />
          <button disabled={busy} className="mt-4 bg-steel-navy hover:bg-steel-blue disabled:opacity-50 text-white text-sm font-bold px-6 py-2.5 rounded-xl">
            {busy ? "Posting..." : "Post Answer"}
          </button>
          {msg && <p className="mt-3 text-sm font-semibold text-steel-blue">{msg}</p>}
        </form>
      </div>
    </main>
  );
}