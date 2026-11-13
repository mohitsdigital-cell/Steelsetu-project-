"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();

const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [bizName, setBizName] = useState("");
  const [gstin, setGstin] = useState("");
  const [city, setCity] = useState("Kolkata");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setNotice(null);

const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, phone },
      },
    });

if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

if (!data.session) {
      setNotice("Account ban gaya! Apne email inbox verify link ke liye check karein, phir login karein.");
      setLoading(false);
      return;
    }

const { data: org, error: orgError } = await supabase
      .from("orgs")
      .insert({ name: bizName, legal_name: bizName, gstin: gstin || null, city, state: "West Bengal" })
      .select()
      .single();

if (orgError) {
      setError("Business workspace create nahi hua: " + orgError.message);
      setLoading(false);
      return;
    }

const { error: memberError } = await supabase
      .from("org_members")
      .insert({ org_id: org.id, user_id: data.user!.id, role: "owner" });

if (memberError) {
      setError("Owner membership create nahi hui: " + memberError.message);
      setLoading(false);
      return;
    }

router.push("/dashboard");
  }

return (
    <main className="min-h-screen bg-[#F5F7FB] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-extrabold text-[#0B1B2B]">Business Register karein</h1>
        <p className="mt-1 text-sm text-slate-500">Aapka apna secure workspace — customer khata, stock, billing sab ek jagah.</p>

{error && <p className="mt-4 text-sm bg-red-50 text-red-600 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
        {notice && <p className="mt-4 text-sm bg-green-50 text-green-700 border border-green-200 rounded-lg px-3 py-2">{notice}</p>}

<form onSubmit={handleRegister} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Aapka Naam *</label>
            <input required value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-300 outline-none focus:border-[#FF6A00]" placeholder="Mohit Siddhi" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Business Name *</label>
            <input required value={bizName} onChange={(e) => setBizName(e.target.value)} className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-300 outline-none focus:border-[#FF6A00]" placeholder="Singhi Enterprises" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Email *</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-300 outline-none focus:border-[#FF6A00]" placeholder="aap@business.com" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-300 outline-none focus:border-[#FF6A00]" placeholder="98XXXXXXXX" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">GSTIN (optional)</label>
            <input value={gstin} onChange={(e) => setGstin(e.target.value.toUpperCase())} className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-300 outline-none focus:border-[#FF6A00] uppercase" placeholder="19ABCDE1234F1Z5" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">City</label>
            <input value={city} onChange={(e) => setCity(e.target.value)} className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-300 outline-none focus:border-[#FF6A00]" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Password *</label>
            <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-300 outline-none focus:border-[#FF6A00]" placeholder="Kam se kam 6 characters" />
          </div>
          <button type="submit" disabled={loading} className="sm:col-span-2 bg-[#FF6A00] hover:bg-[#e05e00] text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-60">
            {loading ? "Bana raha hoon..." : "Workspace Banao →"}
          </button>
        </form>

<p className="mt-6 text-sm text-slate-500">Pehle se account hai? <Link href="/login" className="text-[#FF6A00] font-bold hover:underline">Login karein</Link></p>
      </div>
    </main>
  );
}
