"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import DashboardNav from "@/components/dashboard/DashboardNav";

const FIELDS: [string, string][] = [
  ["gstin", "GSTIN"],
  ["address", "Address"],
  ["city", "City"],
  ["state", "State"],
  ["pincode", "PIN code"],
  ["phone", "Phone"],
  ["email", "Email"],
  ["bank_name", "Bank name"],
  ["bank_account", "Bank account no"],
  ["bank_ifsc", "IFSC code"],
];

export default function SettingsPage() {
  const [orgId, setOrgId] = useState("");
  const [form, setForm] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }
      const { data: m } = await supabase
        .from("org_members")
        .select("org_id, orgs(*)")
        .eq("user_id", user.id)
        .single();
      if (m?.org_id) {
        setOrgId(m.org_id);
        const org = (m as any).orgs || {};
        const f: Record<string, string> = {};
        for (const [k] of FIELDS) f[k] = (org[k] as string) || "";
        setForm(f);
      }
      setLoading(false);
    })();
  }, []);

async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    const clean: Record<string, string | null> = {};
    for (const [k] of FIELDS) clean[k] = form[k]?.trim() || null;
    const { error } = await supabase.from("orgs").update(clean).eq("id", orgId);
    setBusy(false);
    if (error) { setMsg("Save nahi hua: " + error.message); return; }
    setMsg("Billing profile save ho gaya ✅");
  }

const inputCls = "border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-steel-blue w-full";

if (loading) {
    return <main className="min-h-screen grid place-items-center text-slate-400">Load ho raha hai...</main>;
  }

return (
    <main className="min-h-screen bg-[#F5F7FB]">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-2xl font-extrabold text-[#0B1B2B]">Company Settings (E7)</h1>
          <Link href="/dashboard" className="text-sm font-bold text-slate-500 hover:text-steel-blue">← Dashboard</Link>
        </div>
        <p className="mt-2 text-sm text-slate-500">Ye details quotation/invoice print par automatically lagengi.</p>
        <div className="mt-5"><DashboardNav /></div>

<form onSubmit={save} className="mt-6 bg-white rounded-2xl shadow p-6">
          <h2 className="font-bold text-[#0B1B2B]">Billing / GST profile</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FIELDS.map(([k, label]) => (
              <div key={k}>
                <label className="block text-xs font-bold text-slate-400 uppercase">{label}</label>
                <input className={inputCls} value={form[k] ?? ""} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
              </div>
            ))}
          </div>
          <button disabled={busy} className="mt-5 bg-steel-navy hover:bg-steel-blue disabled:opacity-50 text-white text-sm font-bold px-6 py-2.5 rounded-xl">
            {busy ? "Saving..." : "Save Profile"}
          </button>
          {msg && <p className="mt-3 text-sm font-semibold text-steel-blue">{msg}</p>}
        </form>
      </div>
    </main>
  );
}
