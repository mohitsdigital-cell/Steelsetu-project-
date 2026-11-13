"use client";
import { useEffect, useState } from "react";
import { loadDB, saveDB, roles, badgeNote } from "@/lib/community-store";

export default function ProfileCard() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [loaded, setLoaded] = useState(false);

useEffect(() => {
    const db = loadDB();
    setName(db.profile.name);
    setRole(db.profile.role);
    setLoaded(true);
  }, []);

function save() {
    const db = loadDB();
    db.profile = { name: name.trim(), role };
    saveDB(db);
  }

return (
    <div className="bg-white border border-gray-200 rounded-3xl p-7">
      <h2 className="text-sm font-bold text-steel-navy">Your community profile (demo)</h2>
      <p className="mt-2 text-xs text-steel-charcoal/70 leading-relaxed">
        Pick the role badge that fits your business. It is shown on your posts so readers know
        your market position.
      </p>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          value={name}
          onChange={(e) => { setName(e.target.value); }}
          onBlur={save}
          placeholder="Display name"
          className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-steel-blue"
        />
        <select
          value={role}
          onChange={(e) => { setRole(e.target.value); const db = loadDB(); db.profile.role = e.target.value; if (!db.profile.name && name.trim()) db.profile.name = name.trim(); saveDB(db); }}
          className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-steel-blue"
        >
          <option value="">Select role badge...</option>
          {roles.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>
      {loaded && role && (
        <div className="mt-4 flex items-center gap-3">
          <span className="text-[11px] font-semibold text-steel-navy bg-steel-blue/10 border border-steel-blue/20 px-3 py-1.5 rounded-full">{role}</span>
          <span className="text-[11px] text-steel-grey">Badge preview</span>
        </div>
      )}
      <p className="mt-4 text-[11px] text-steel-grey leading-relaxed">{badgeNote}</p>
    </div>
  );
}
