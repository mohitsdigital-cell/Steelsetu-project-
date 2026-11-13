"use client";
import { useEffect, useState } from "react";
import { loadDB, saveDB, uid, type EventItem } from "@/lib/community-store";

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [clientId, setClientId] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [title, setTitle] = useState("");
  const [organiser, setOrganiser] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [onlineLink, setOnlineLink] = useState("");
  const [desc, setDesc] = useState("");
  const [capacity, setCapacity] = useState("");

useEffect(() => {
    const db = loadDB();
    setEvents(db.events);
    setClientId(db.clientId);
    setLoaded(true);
  }, []);

function persist(next: EventItem[]) {
    setEvents(next);
    const db = loadDB();
    db.events = next;
    saveDB(db);
  }

function addEvent() {
    if (!title.trim() || !date.trim()) return;
    const e: EventItem = {
      id: uid(), createdBy: clientId, title: title.trim(), organiser: organiser.trim() || "To be announced",
      date: date.trim(), time: time.trim(), location: location.trim(), onlineLink: onlineLink.trim(),
      desc: desc.trim(), capacity: Number(capacity) || 0, status: "Upcoming", rsvps: [],
    };
    persist([e, ...events]);
    setTitle(""); setOrganiser(""); setDate(""); setTime(""); setLocation(""); setOnlineLink(""); setDesc(""); setCapacity("");
  }

function setStatus(id: string, status: EventItem["status"]) {
    persist(events.map((e) => (e.id === id ? { ...e, status } : e)));
  }

function rsvp(id: string) {
    persist(events.map((e) => (e.id === id ? { ...e, rsvps: e.rsvps.includes(clientId) ? e.rsvps.filter((x) => x !== clientId) : [...e.rsvps, clientId] } : e)));
  }

return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold text-steel-navy">Trade Events</h1>
      <p className="mt-3 text-sm text-steel-charcoal/80 leading-relaxed">
        Events with organiser identity, capacity and status - RSVP counts are real, never padded.
        Demo mode: data saves in this browser.
      </p>

<div className="mt-8 bg-white border border-gray-200 rounded-2xl p-6">
        <h2 className="text-sm font-bold text-steel-navy">List an event</h2>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event title" className="mt-4 w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-steel-blue" />
        <input value={organiser} onChange={(e) => setOrganiser(e.target.value)} placeholder="Organiser name / institution" className="mt-3 w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-steel-blue" />
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-steel-blue" />
          <input value={time} onChange={(e) => setTime(e.target.value)} type="time" className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-steel-blue" />
          <input value={capacity} onChange={(e) => setCapacity(e.target.value)} type="number" min="0" placeholder="Capacity (0 = no limit)" className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-steel-blue" />
        </div>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Physical location" className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-steel-blue" />
          <input value={onlineLink} onChange={(e) => setOnlineLink(e.target.value)} placeholder="Online link (optional)" className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-steel-blue" />
        </div>
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Short description..." rows={2} className="mt-3 w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-steel-blue" />
        <button onClick={addEvent} className="mt-3 bg-steel-blue hover:bg-steel-blue/85 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all">Add event</button>
      </div>

<div className="mt-8 space-y-4">
        {loaded && events.length === 0 && <p className="text-sm text-steel-grey">No events yet. List the first one above.</p>}
        {events.map((e) => {
          const going = e.rsvps.includes(clientId);
          const full = e.capacity > 0 && e.rsvps.length >= e.capacity;
          const active = e.status === "Upcoming" || e.status === "Live";
          const mine = e.createdBy === clientId;
          return (
            <div key={e.id} className="bg-white border border-gray-200 rounded-3xl p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={"text-[11px] font-semibold px-2.5 py-1 rounded-full border " + (e.status === "Cancelled" ? "text-red-500 border-red-200 bg-red-50" : e.status === "Completed" ? "text-steel-grey border-gray-200 bg-gray-50" : e.status === "Live" ? "text-emerald-600 border-emerald-200 bg-emerald-50" : "text-steel-blue border-steel-blue/20 bg-steel-blue/10")}>
                      {e.status}
                    </span>
                    {full && active && <span className="text-[11px] font-semibold text-amber-600 border border-amber-200 bg-amber-50 px-2.5 py-1 rounded-full">Full</span>}
                  </div>
                  <h3 className="mt-3 text-base font-bold text-steel-navy">{e.title}</h3>
                  <p className="mt-1 text-[11px] text-steel-grey">
                    {e.date}{e.time ? " at " + e.time : ""} - {e.location || "Online"}
                    {e.onlineLink && <span> - <a href={e.onlineLink} className="text-steel-blue hover:underline">online link</a></span>}
                  </p>
                  <p className="mt-1 text-[11px] text-steel-grey">Organiser: {e.organiser}</p>
                  {e.desc && <p className="mt-3 text-sm text-steel-charcoal/80 leading-relaxed">{e.desc}</p>}
                  <p className="mt-3 text-xs text-steel-grey">
                    {e.rsvps.length} RSVP{e.rsvps.length === 1 ? "" : "s"}
                    {e.capacity > 0 ? " of " + e.capacity + " capacity" : ""}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  {active && (going || !full) && (
                    <button onClick={() => rsvp(e.id)} className={"text-xs font-semibold px-4 py-2 rounded-xl transition-all " + (going ? "bg-emerald-500 text-white" : "bg-steel-navy hover:bg-steel-navy/85 text-white")}>
                      {going ? "Going" : "RSVP"}
                    </button>
                  )}
                  {active && !going && full && <p className="text-xs text-amber-600 font-semibold">Capacity full</p>}
                  {mine && (
                    <div className="mt-2 space-y-1">
                      <button onClick={() => setStatus(e.id, "Completed")} className="block ml-auto text-[11px] text-steel-blue hover:underline">Mark completed</button>
                      <button onClick={() => setStatus(e.id, "Cancelled")} className="block ml-auto text-[11px] text-red-500 hover:underline">Cancel event</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-8 text-[11px] text-steel-grey leading-relaxed border-t border-gray-200 pt-5">
        Reminder notifications and verified institutional organiser status activate with the
        accounts phase. Claimed institutional organisers are not published without documented
        verification and permission.
      </p>
    </div>
  );
}
