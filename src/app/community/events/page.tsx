"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({ title: "", description: "", date: "", location: "", organiser: "" });

async function load() {
    const { data } = await supabase.from("community_events").select("*").order("event_date", { ascending: true }).limit(30);
    const withRsvp: any[] = [];
    for (const ev of data || []) {
      const { data: rsvps } = await supabase.from("community_event_rsvps").select("user_id").eq("event_id", ev.id);
      withRsvp.push({ ...ev, going: rsvps || [] });
    }
    setEvents(withRsvp);
  }

useEffect(() => {
    (async () => {
      const { data: { user: u } } = await supabase.auth.getUser();
      setUser(u);
      load();
    })();
  }, []);

async function rsvp(ev: any) {
    if (!user) { setMsg("RSVP karne ke liye login kijiye."); return; }
    const mine = ev.going.some((r: any) => r.user_id === user.id);
    if (mine) {
      await supabase.from("community_event_rsvps").delete().eq("event_id", ev.id).eq("user_id", user.id);
      setMsg("RSVP hata diya.");
    } else {
      await supabase.from("community_event_rsvps").insert({ event_id: ev.id, user_id: user.id });
      setMsg("RSVP ho gaya ✅ Aap interested hain.");
    }
    load();
  }

async function createEvent(e: React.FormEvent) {
    e.preventDefault();
    if (!user) { setMsg("Event banane ke liye login kijiye."); return; }
    if (form.title.trim().length < 3 || !form.date) { setMsg("Title aur date zaroori hain."); return; }
    const { error } = await supabase.from("community_events").insert({
      title: form.title.trim(),
      description: form.description.trim() || null,
      event_date: new Date(form.date).toISOString(),
      location: form.location.trim() || null,
      organiser: form.organiser.trim() || null,
      created_by: user.id,
    });
    if (error) { setMsg("Event nahi bana: " + error.message); return; }
    setForm({ title: "", description: "", date: "", location: "", organiser: "" });
    setMsg("Event publish ho gaya ✅");
    load();
  }

const inputCls = "border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-steel-blue w-full";

return (
    <main className="min-h-screen bg-[#F5F7FB]">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link href="/community" className="text-sm font-bold text-slate-500 hover:text-steel-blue">← Community Hub</Link>
        <h1 className="mt-2 text-3xl font-extrabold text-[#0B1B2B]">Trade Events</h1>
        <p className="mt-2 text-sm text-slate-500">Events, meetups aur trade gatherings — RSVP se participation dikhayein.</p>

{msg && <p className="mt-4 bg-white rounded-xl shadow px-4 py-3 text-sm font-semibold text-steel-blue">{msg}</p>}

<div className="mt-6 space-y-3">
          {events.length === 0 && <p className="bg-white rounded-2xl shadow p-6 text-sm text-slate-400">Abhi koi event nahi.</p>}
          {events.map((ev) => {
            const mine = user && ev.going.some((r: any) => r.user_id === user.id);
            return (
              <div key={ev.id} className="bg-white rounded-2xl shadow p-5">
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div>
                    <h3 className="font-bold text-[#0B1B2B]">{ev.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">{new Date(ev.event_date).toLocaleString("en-IN")}{ev.location ? " · " + ev.location : ""}</p>
                    {ev.organiser && <p className="text-xs text-slate-400">Organiser: {ev.organiser}</p>}
                    {ev.description && <p className="mt-2 text-sm text-slate-600">{ev.description}</p>}
                  </div>
                  <div className="text-right">
                    <button onClick={() => rsvp(ev)} className={(mine ? "bg-emerald-600 hover:bg-emerald-700" : "bg-steel-navy hover:bg-steel-blue") + " text-white text-xs font-bold px-4 py-2 rounded-xl"}>
                      {mine ? "✓ Going" : "Interested"}
                    </button>
                    <p className="mt-1 text-[11px] text-slate-400">{ev.going.length} interested</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

<form onSubmit={createEvent} className="mt-8 bg-white rounded-2xl shadow p-5">
          <h2 className="font-bold text-[#0B1B2B]">Event list kijiye</h2>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input className={inputCls} placeholder="Event title *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <input className={inputCls} type="datetime-local" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            <input className={inputCls} placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            <input className={inputCls} placeholder="Organiser" value={form.organiser} onChange={(e) => setForm({ ...form, organiser: e.target.value })} />
            <textarea className={inputCls + " sm:col-span-2"} rows={2} placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <button className="mt-4 bg-steel-navy hover:bg-steel-blue text-white text-sm font-bold px-6 py-2.5 rounded-xl">Publish Event</button>
        </form>
      </div>
    </main>
  );
}
