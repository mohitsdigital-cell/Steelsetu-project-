"use client";
import { useEffect, useMemo, useState } from "react";
import { loadDB, saveDB, uid, rooms, badgeNote, type Question } from "@/lib/community-store";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [clientId, setClientId] = useState("");
  const [me, setMe] = useState({ name: "", role: "" });
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [roomFilter, setRoomFilter] = useState("all");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [room, setRoom] = useState(rooms[0].slug);
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [reported, setReported] = useState<string[]>([]);

useEffect(() => {
    const db = loadDB();
    setQuestions(db.questions);
    setClientId(db.clientId);
    setMe(db.profile);
    setReported(db.reported);
    setLoaded(true);
  }, []);

function persist(next: Question[], rep?: string[]) {
    setQuestions(next);
    const db = loadDB();
    db.questions = next;
    if (rep) { db.reported = rep; setReported(rep); }
    saveDB(db);
  }

function ask() {
    if (!title.trim()) return;
    const q: Question = {
      id: uid(), ownerId: clientId, title: title.trim(), body: body.trim(),
      by: me.name || "Guest", role: me.role || "Unbadged", room, at: new Date().toISOString(), answers: [],
    };
    persist([q, ...questions]);
    setTitle(""); setBody("");
  }

function answer(qid: string) {
    const text = (replyText[qid] || "").trim();
    if (!text) return;
    const next = questions.map((q) =>
      q.id === qid
        ? { ...q, answers: [...q.answers, { id: uid(), text, by: me.name || "Guest", role: me.role || "Unbadged", at: new Date().toISOString(), best: false }] }
        : q
    );
    persist(next);
    setReplyText({ ...replyText, [qid]: "" });
  }

function markBest(qid: string, aid: string) {
    persist(questions.map((q) => (q.id === qid ? { ...q, answers: q.answers.map((a) => ({ ...a, best: a.id === aid })) } : q)));
  }

function report(id: string) {
    if (reported.includes(id)) return;
    persist(questions, [...reported, id]);
  }

function saveEdit(qid: string) {
    const next = questions.map((q) => (q.id === qid ? { ...q, title: editTitle.trim() || q.title, body: editBody } : q));
    persist(next);
    setEditId(null);
  }

function del(qid: string) {
    if (!window.confirm("Delete this question and its answers? This action is recorded in demo mode.")) return;
    persist(questions.filter((q) => q.id !== qid));
  }

const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return questions.filter((x) => {
      const matchRoom = roomFilter === "all" || x.room === roomFilter;
      const matchText = !q || x.title.toLowerCase().includes(q) || x.body.toLowerCase().includes(q);
      return matchRoom && matchText;
    });
  }, [questions, search, roomFilter]);

return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold text-steel-navy">Trade Q&amp;A</h1>
      <p className="mt-3 text-sm text-steel-charcoal/80 leading-relaxed">
        Ask questions in the right room, reply, and mark the best answer. Report anything that
        breaks the Community Guidelines. Demo mode: saves in this browser.
      </p>

<div className="mt-8 bg-white border border-gray-200 rounded-2xl p-6">
        <h2 className="text-sm font-bold text-steel-navy">Ask a question</h2>
        <select
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="mt-4 w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-steel-blue"
        >
          {rooms.map((r) => (
            <option key={r.slug} value={r.slug}>Room: {r.name}</option>
          ))}
        </select>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Question title" className="mt-3 w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-steel-blue" />
        <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Details - sizes, quantity, location, use case..." rows={3} className="mt-3 w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-steel-blue" />
        <button onClick={ask} className="mt-3 bg-steel-blue hover:bg-steel-blue/85 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all">Post question</button>
      </div>

<div className="mt-8 flex flex-col sm:flex-row gap-3">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search questions..." className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-steel-blue" />
        <select value={roomFilter} onChange={(e) => setRoomFilter(e.target.value)} className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-steel-blue">
          <option value="all">All rooms</option>
          {rooms.map((r) => (
            <option key={r.slug} value={r.slug}>{r.name}</option>
          ))}
        </select>
      </div>

<div className="mt-5 space-y-5">
        {loaded && visible.length === 0 && <p className="text-sm text-steel-grey">No questions match. Ask the first one above.</p>}
        {visible.map((q) => {
          const roomObj = rooms.find((r) => r.slug === q.room);
          const isMine = q.ownerId === clientId;
          return (
            <div key={q.id} className="bg-white border border-gray-200 rounded-3xl p-7">
              {editId === q.id ? (
                <div>
                  <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-steel-blue" />
                  <textarea value={editBody} onChange={(e) => setEditBody(e.target.value)} rows={3} className="mt-3 w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-steel-blue" />
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => saveEdit(q.id)} className="bg-steel-blue hover:bg-steel-blue/85 text-white text-xs font-semibold px-4 py-2 rounded-xl">Save</button>
                    <button onClick={() => setEditId(null)} className="bg-white border border-gray-300 text-steel-navy text-xs font-semibold px-4 py-2 rounded-xl">Cancel</button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-semibold text-steel-blue bg-steel-blue/10 border border-steel-blue/20 px-2.5 py-1 rounded-full">{roomObj ? roomObj.name : q.room}</span>
                    {q.role && <span className="text-[11px] text-steel-grey border border-gray-200 px-2.5 py-1 rounded-full">{q.role}</span>}
                  </div>
                  <h3 className="mt-3 text-base font-bold text-steel-navy leading-snug">{q.title}</h3>
                  <p className="mt-1 text-[11px] text-steel-grey">{q.by} - {new Date(q.at).toLocaleDateString()}</p>
                  {q.body && <p className="mt-3 text-sm text-steel-charcoal/85 leading-relaxed">{q.body}</p>}
                </div>
              )}

<div className="mt-5 space-y-3">
                {q.answers.map((a) => (
                  <div key={a.id} className={"rounded-2xl p-4 border " + (a.best ? "border-emerald-300 bg-emerald-50" : "border-gray-200 bg-gray-50")}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold text-steel-navy">{a.by} {a.role && <span className="ml-1 font-normal text-steel-grey">({a.role})</span>}</p>
                        <p className="mt-1.5 text-sm text-steel-charcoal/85 leading-relaxed">{a.text}</p>
                      </div>
                      {isMine && (
                        <button onClick={() => markBest(q.id, a.id)} className={"shrink-0 text-[11px] font-semibold px-3 py-1.5 rounded-full transition-colors " + (a.best ? "bg-emerald-500 text-white" : "bg-white border border-gray-300 text-steel-navy hover:border-steel-blue")}>
                          {a.best ? "Best answer" : "Mark best"}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {q.answers.length === 0 && <p className="text-xs text-steel-grey">No replies yet.</p>}
              </div>

<div className="mt-4 flex gap-2">
                <input value={replyText[q.id] || ""} onChange={(e) => setReplyText({ ...replyText, [q.id]: e.target.value })} placeholder="Write an answer..." className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-steel-blue" />
                <button onClick={() => answer(q.id)} className="bg-steel-navy hover:bg-steel-navy/85 text-white text-xs font-semibold px-4 py-2 rounded-xl">Reply</button>
              </div>

<div className="mt-3 flex flex-wrap items-center gap-3 text-[11px]">
                <button onClick={() => report(q.id)} disabled={reported.includes(q.id)} className={reported.includes(q.id) ? "text-steel-grey" : "text-steel-blue hover:underline"}>
                  {reported.includes(q.id) ? "Reported" : "Report"}
                </button>
                {isMine && (
                  <>
                    <span className="text-gray-300">|</span>
                    <button onClick={() => { setEditId(q.id); setEditTitle(q.title); setEditBody(q.body); }} className="text-steel-blue hover:underline">Edit</button>
                    <span className="text-gray-300">|</span>
                    <button onClick={() => del(q.id)} className="text-red-500 hover:underline">Delete</button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

<p className="mt-8 text-[11px] text-steel-grey leading-relaxed border-t border-gray-200 pt-5">
        {badgeNote} Edit and delete of your own posts are recorded; moderation, attachments and
        audit activate with the accounts phase. Disputes and serious concerns go to the
        <a href="/grievance" className="text-steel-blue hover:underline"> grievance process</a>, not the public feed.
      </p>
    </div>
  );
}
