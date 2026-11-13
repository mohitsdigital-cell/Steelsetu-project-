"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/dashboard";

const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

const { error } = await supabase.auth.signInWithPassword({ email, password });

if (error) {
      setError(error.message === "Invalid login credentials"
        ? "Email ya password galat hai."
        : error.message);
      setLoading(false);
      return;
    }
    router.push(next);
  }

return (
    <main className="min-h-screen bg-[#F5F7FB] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-extrabold text-[#0B1B2B]">Login to Steelsetu</h1>
        <p className="mt-1 text-sm text-slate-500">Apne business workspace mein pravesh karein.</p>

{error && (
          <p className="mt-4 text-sm bg-red-50 text-red-600 border border-red-200 rounded-lg px-3 py-2">{error}</p>
        )}

<form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-300 outline-none focus:border-[#FF6A00] text-[#0B1B2B]"
              placeholder="aap@business.com"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-300 outline-none focus:border-[#FF6A00] text-[#0B1B2B]"
              placeholder="Kam se kam 6 characters"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF6A00] hover:bg-[#e05e00] text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-60"
          >
            {loading ? "Login ho raha hai..." : "Login →"}
          </button>
        </form>

<p className="mt-6 text-sm text-slate-500">
          Naya business hai?{" "}
          <Link href="/register" className="text-[#FF6A00] font-bold hover:underline">Register karein</Link>
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
