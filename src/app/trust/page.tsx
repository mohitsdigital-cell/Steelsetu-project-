"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function TrustPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [replies, setReplies] = useState<Record<string, any[]>>({});
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState({ entity: "", role: "buyer", relationship: "customer", rating: 5, body: "" });
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [flagOn, setFlagOn] = useState(true);

async function load() {
    const { data: f } = await supabase.from("feature_flags").select("enabled").eq("key", "trust_public").maybeSingle();
    setFlagOn(f?.enabled !== false);
    if (f?.enabled === false) return;
    const { data } = await supabase.from("reviews").select("*").eq("status", "published").order("created_at", { ascending: false }).limit(50);
    setReviews(data || []);
    const ids = (data || []).map((r: any) => r.id);
    if (ids.length > 0) {
      const { data: reps } = await supabase.from("review_replies").select("*").in("review_id", ids);
      const byReview: Record<string, any[]> = {};
      for (const rep of reps || []) {
        if (!byReview[rep.review_id]) byReview[rep.review_id] = [];
        byReview[rep.review_id].push(rep);
      }
      setReplies(byReview);
    }
  }

useEffect(() => {
    (async () => {
      const { data: { user: u } } = await supabase.auth.getUser();
      setUser(u);
      load();
    })();
  }, []);

async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) { setMsg("Review likhne ke liye login kijiye."); return; }
    if (form.entity.trim().length < 2) { setMsg("Business ka naam likhiye."); return; }
    if (form.body.trim().length < 10) { setMsg("Review kam se kam 10 characters ka ho."); return; }
    setBusy(true); setMsg("");
    const { error } = await supabase.from("reviews").insert({
      entity_name: form.entity.trim(),
      reviewer_role: form.role,
      relationship: form.relationship,
      rating: form.rating,
      body: form.body.trim(),
      reviewer_name: "Verified User",
    });
    setBusy(false);
    if (error) {
      if (error.code === "23505") setMsg("Aap is business par pehle hi review likh chuke hain.");
      else setMsg("Submit nahi hua: " + error.message);
      return;
    }
    setForm({ ...form, entity: "", body: "" });
    setMsg("Review moderation ke liye submit ho gaya ✅ Publish hone par yahan dikhega.");
  }

const inputCls = "border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-steel-blue w-full";

if (!flagOn) {
    return (
      <main className="min-h-screen bg-[#F5F7FB] grid place-items-center px-4">
        <div className="bg-white rounded-2xl shadow p-8 max-w-md text-center">
          <h1 className="text-xl font-extrabold text-[#0B1B2B]">Trust Section Temporarily Offline</h1>
          <p className="mt-3 text-sm text-slate-500">Reviews aur feedback abhi maintenance par hain. Behtar moderation ke saath wapas aayenge.</p>
          <Link href="/" className="inline-block mt-6 bg-steel-navy hover:bg-steel-blue text-white text-sm font-bold px-6 py-2.5 rounded-xl">← Home</Link>
        </div>
      </main>
    );
  }

return (
    <main className="min-h-screen bg-[#F5F7FB]">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold text-[#0B1B2B]">Trust &amp; Market Feedback</h1>
        <p className="mt-2 text-sm text-slate-500">Moderated business reviews — buyer, supplier ya partner ke tajurbe se. Right of reply har business ke paas hai.</p>

<div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            ["Moderated", "Har review publish hone se pehle moderation se guzarta hai"],
            ["Right of Reply", "Reviewed business public reply de sakta hai"],
            ["No Paid Trust", "Positive reviews kabhi nahi bikte"],
          ].map(([t, d]) => (
            <div key={t} className="bg-white rounded-2xl shadow p-4">
              <h3 className="text-sm font-bold text-steel-navy">{t}</h3>
              <p className="mt-1 text-xs text-slate-500">{d}</p>
            </div>
          ))}
        </div>

<form onSubmit={submit} className="mt-6 bg-white rounded-2xl shadow p-6">
          <h2 className="font-bold text-[#0B1B2B]">Ek review likhiye</h2>
          <p className="mt-1 text-xs text-slate-400">Sirf apna real business experience likhiye. Fake/organised reviews reject hoti hain.</p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input className={inputCls} placeholder="Business ka naam *" value={form.entity} onChange={(e) => setForm({ ...form, entity: e.target.value })} />
            <select className={inputCls} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option value="buyer">Aapka role: Buyer</option>
              <option value="supplier">Supplier</option>
              <option value="partner">Business Partner</option>
              <option value="trader">Trader</option>
            </select>
            <select className={inputCls} value={form.relationship} onChange={(e) => setForm({ ...form, relationship: e.target.value })}>
              <option value="customer">Rishta: Customer</option>
              <option value="supplier">Supplier</option>
              <option value="logistics">Logistics/Service</option>
            </select>
            <select className={inputCls} value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}>
              {[5,4,3,2,1].map((r) => <option key={r} value={r}>{"⭐".repeat(r)} ({r}/5)</option>)}
            </select>
          </div>
          <textarea className={inputCls + " mt-3"} rows={4} placeholder="Apna experience likhiye — factual, business-focused, no personal attacks *" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
          <button disabled={busy} className="mt-4 bg-steel-navy hover:bg-steel-blue disabled:opacity-50 text-white text-sm font-bold px-6 py-2.5 rounded-xl">
            {busy ? "Submitting..." : "Submit Review"}
          </button>
          {msg && <p className="mt-3 text-sm font-semibold text-steel-blue">{msg}</p>}
        </form>

<h2 className="mt-8 font-bold text-[#0B1B2B]">Published Reviews</h2>
        <div className="mt-3 space-y-3">
          {reviews.length === 0 && (
            <p className="bg-white rounded-2xl shadow p-6 text-sm text-slate-400">Abhi koi published review nahi. Pehla review aap likhiye — moderation ke baad yahan dikhega.</p>
          )}
          {reviews.map((r) => (
            <div key={r.id} className="bg-white rounded-2xl shadow p-5">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div>
                  <h3 className="font-bold text-[#0B1B2B]">{r.entity_name}</h3>
                  <p className="text-xs text-slate-500">{r.relationship} · Reviewer role: {r.reviewer_role}</p>
                </div>
                <span className="text-sm">{"⭐".repeat(r.rating)}</span>
              </div>
              <p className="mt-2 text-sm text-slate-600 whitespace-pre-line">{r.body}</p>
              {(replies[r.id] || []).length > 0 && (
                <div className="mt-3 border-l-2 border-steel-blue pl-3">
                  <p className="text-xs font-bold text-steel-navy">Business Reply:</p>
                  {(replies[r.id] || []).map((rep: any) => <p key={rep.id} className="text-xs text-slate-500 mt-1">{rep.body}</p>)}
                </div>
              )}
              <p className="mt-3 text-[11px] text-slate-400">{new Date(r.created_at).toLocaleDateString("en-IN")}</p>
            </div>
          ))}
        </div>

<div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <h3 className="text-sm font-bold text-steel-navy">Disclaimer</h3>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed">
            Reviews individual experiences reflect karti hain, business guarantees nahi. Steelsetu moderation apply karta hai aur right-of-reply deta hai, par final commercial due diligence aapki apni zimmedari hai.
          </p>
          <Link href="/grievance" className="inline-block mt-3 text-xs font-bold text-steel-blue hover:underline">Report a Serious Concern →</Link>
        </div>
      </div>
    </main>
  );
}
