"use client";
import { useEffect, useState } from "react";
import { loadDB, saveDB, uid, isPollClosed, type Poll } from "@/lib/community-store";

export default function PollsPage() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [myVotes, setMyVotes] = useState<Record<string, string[]>>({});
  const [clientId, setClientId] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [question, setQuestion] = useState("");
  const [mode, setMode] = useState<"single" | "multi">("single");
  const [closesAt, setClosesAt] = useState("");
  const [opts, setOpts] = useState(["", "", ""]);
  const [multiSel, setMultiSel] = useState<Record<string, string[]>>({});

useEffect(() => {
    const db = loadDB();
    setPolls(db.polls);
    setMyVotes(db.myVotes);
    setClientId(db.clientId);
    setLoaded(true);
  }, []);

function persist(next: Poll[], votes: Record<string, string[]>) {
    setPolls(next);
    setMyVotes(votes);
    const db = loadDB();
    db.polls = next;
    db.myVotes = votes;
    saveDB(db);
  }

function voteSingle(pid: string, oid: string) {
    const p = polls.find((x) => x.id === pid);
    if (!p || isPollClosed(p) || (myVotes[pid] || []).length > 0) return;
    const next = polls.map((x) => (x.id === pid ? { ...x, options: x.options.map((o) => (o.id === oid ? { ...o, votes: o.votes + 1 } : o)) } : x));
    persist(next, { ...myVotes, [pid]: [oid] });
  }

function submitMulti(pid: string) {
    const sel = multiSel[pid] || [];
    if (sel.length === 0) return;
    const next = polls.map((x) =>
      x.id === pid ? { ...x, options: x.options.map((o) => (sel.includes(o.id) ? { ...o, votes: o.votes + 1 } : o)) } : x
    );
    persist(next, { ...myVotes, [pid]: sel });
  }

function toggleMulti(pid: string, oid: string) {
    const sel = multiSel[pid] || [];
    const nextSel = sel.includes(oid) ? sel.filter((x) => x !== oid) : [...sel, oid];
    setMultiSel({ ...multiSel, [pid]: nextSel });
  }

function closePoll(pid: string) {
    const next = polls.map((x) => (x.id === pid ? { ...x, closedByCreator: true } : x));
    persist(next, myVotes);
  }

function createPoll() {
    const labels = opts.map((o) => o.trim()).filter(Boolean);
    if (!question.trim() || labels.length < 2) return;
    const p: Poll = {
      id: uid(), question: question.trim(), mode, closesAt, closedByCreator: false,
      createdBy: clientId, at: new Date().toISOString(),
      options: labels.map((l) => ({ id: uid(), label: l, votes: 0 })),
    };
    persist([p, ...polls], myVotes);
    setQuestion(""); setOpts(["", "", ""]); setMode("single"); setClosesAt("");
  }

return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold text-steel-navy">Weekly Polls</h1>
      <p className="mt-3 text-sm text-steel-charcoal/80 leading-relaxed">
        Market sentiment polls with real counts. Polls are sentiment indicators, not verified
        market prices or representative surveys. Demo mode until accounts go live.
      </p>

<div className="mt-8 bg-white border border-gray-200 rounded-2xl p-6">
        <h2 className="text-sm font-bold text-steel-navy">Create a poll</h2>
        <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Poll question" className="mt-4 w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-steel-blue" />
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <select value={mode} onChange={(e) => setMode(e.target.value as "single" | "multi")} className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-steel-blue">
            <option value="single">Single choice (one vote per user)</option>
            <option value="multi">Multiple choice</option>
          </select>
          <input value={closesAt} onChange={(e) => setClosesAt(e.target.value)} type="datetime-local" title="Poll closing time (optional)" className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-steel-blue" />
        </div>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {opts.map((o, i) => (
            <input key={i} value={o} onChange={(e) => setOpts(opts.map((x, j) => (j === i ? e.target.value : x)))} placeholder={"Option " + (i + 1)} className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-steel-blue" />
          ))}
        </div>
        <button onClick={createPoll} className="mt-3 bg-steel-blue hover:bg-steel-blue/85 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all">Publish poll</button>
      </div>

<div className="mt-8 space-y-5">
        {loaded && polls.length === 0 && <p className="text-sm text-steel-grey">No polls yet. Create the first one above.</p>}
        {polls.map((p) => {
          const total = p.options.reduce((n, o) => n + o.votes, 0);
          const closed = isPollClosed(p);
          const voted = (myVotes[p.id] || []).length > 0;
          const mine = p.createdBy === clientId;
          return (
            <div key={p.id} className="bg-white border border-gray-200 rounded-3xl p-7">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-bold text-steel-navy">{p.question}</h3>
                {closed && <span className="shrink-0 text-[11px] font-semibold text-red-500 border border-red-200 bg-red-50 px-2.5 py-1 rounded-full">Closed</span>}
              </div>
              <p className="mt-1 text-[11px] text-steel-grey">
                {p.mode === "single" ? "Single choice" : "Multiple choice"}
                {p.closesAt ? " - closes " + new Date(p.closesAt).toLocaleString() : ""}
                {" - "}{total} vote{total === 1 ? "" : "s"}
              </p>
              <div className="mt-4 space-y-3">
                {p.options.map((o) => {
                  const pct = total > 0 ? Math.round((o.votes / total) * 100) : 0;
                  const chosen = (myVotes[p.id] || []).includes(o.id);
                  return (
                    <div key={o.id}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-steel-charcoal">{o.label}{chosen ? " (your vote)" : ""}</span>
                        <span className="text-steel-grey">{o.votes} ({pct}%)</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-steel-blue rounded-full transition-all" style={{ width: (voted || closed ? pct : 0) + "%" }} />
                      </div>
                      {!voted && !closed && (
                        <button onClick={() => (p.mode === "single" ? voteSingle(p.id, o.id) : toggleMulti(p.id, o.id))} className={"mt-1.5 text-[11px] font-semibold " + ((multiSel[p.id] || []).includes(o.id) ? "text-steel-navy" : "text-steel-blue") + " hover:underline"}>
                          {p.mode === "single" ? "Vote" : ((multiSel[p.id] || []).includes(o.id) ? "Selected - click to remove" : "Select")}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
              {!voted && !closed && p.mode === "multi" && (
                <button onClick={() => submitMulti(p.id)} className="mt-3 bg-steel-navy hover:bg-steel-navy/85 text-white text-xs font-semibold px-4 py-2 rounded-xl">Submit votes</button>
              )}
              {voted && <p className="mt-3 text-[11px] text-emerald-600 font-semibold">Thanks - your vote is recorded.</p>}
              {mine && !closed && (
                <button onClick={() => closePoll(p.id)} className="mt-3 block text-[11px] text-red-500 hover:underline">Close this poll now</button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
