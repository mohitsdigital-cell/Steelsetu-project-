"use client";
import { useEffect, useState } from "react";
import { loadDB, saveDB, uid, badgeNote, type RoomPost } from "@/lib/community-store";

export default function RoomFeed({ slug, official }: { slug: string; official?: boolean }) {
  const [posts, setPosts] = useState<RoomPost[]>([]);
  const [me, setMe] = useState({ name: "", role: "" });
  const [text, setText] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [reported, setReported] = useState<string[]>([]);

useEffect(() => {
    const db = loadDB();
    setPosts(db.roomPosts[slug] || []);
    setMe(db.profile);
    setReported(db.reported);
    setLoaded(true);
  }, [slug]);

const canPost = !official || me.role === "Official Publisher";

function post() {
    const t = text.trim();
    if (!t) return;
    const p: RoomPost = { id: uid(), by: me.name || "Guest", role: me.role || "Unbadged", text: t, at: new Date().toISOString() };
    const db = loadDB();
    const next = [p, ...(db.roomPosts[slug] || [])];
    db.roomPosts[slug] = next;
    saveDB(db);
    setPosts(next);
    setText("");
  }

function report(id: string) {
    if (reported.includes(id)) return;
    const db = loadDB();
    db.reported = [...db.reported, id];
    saveDB(db);
    setReported(db.reported);
  }

return (
    <div className="mt-8">
      {official && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <p className="text-xs text-steel-charcoal/85 leading-relaxed">
            <strong className="text-steel-navy">Official room:</strong> only verified institutional
            accounts may publish here - associations, samities and organisations, with identity
            verification and documented permission recorded. In demo mode, select the
            &quot;Official Publisher&quot; role badge on the community page to preview this room.
          </p>
        </div>
      )}

{canPost ? (
        <div className="mt-4 bg-white border border-gray-200 rounded-2xl p-6">
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Share a requirement, market update or question for this room..." rows={3} className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-steel-blue" />
          <button onClick={post} className="mt-3 bg-steel-blue hover:bg-steel-blue/85 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all">Post to room</button>
        </div>
      ) : (
        <div className="mt-4 bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <p className="text-xs text-steel-grey leading-relaxed">
            You need the Official Publisher badge (set on the Community page, demo) to post here.
            Verified institutional verification goes live with the accounts phase.
          </p>
        </div>
      )}

<div className="mt-6 space-y-4">
        {loaded && posts.length === 0 && <p className="text-sm text-steel-grey">No posts yet in this room.</p>}
        {posts.map((p) => (
          <div key={p.id} className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold text-steel-navy">{p.by}</p>
              {p.role && <span className="text-[11px] text-steel-grey border border-gray-200 px-2 py-0.5 rounded-full">{p.role}</span>}
            </div>
            <p className="text-[11px] text-steel-grey">{new Date(p.at).toLocaleString()}</p>
            <p className="mt-2 text-sm text-steel-charcoal/85 leading-relaxed whitespace-pre-wrap">{p.text}</p>
            <button onClick={() => report(p.id)} disabled={reported.includes(p.id)} className={"mt-2 text-[11px] " + (reported.includes(p.id) ? "text-steel-grey" : "text-steel-blue hover:underline")}>
              {reported.includes(p.id) ? "Reported" : "Report"}
            </button>
          </div>
        ))}
      </div>
      <p className="mt-6 text-[11px] text-steel-grey leading-relaxed">{badgeNote}</p>
    </div>
  );
}

