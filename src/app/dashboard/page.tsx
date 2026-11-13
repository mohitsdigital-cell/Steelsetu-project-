"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Counts = { customers: number; suppliers: number; items: number };

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [counts, setCounts] = useState<Counts | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace("/login?next=/dashboard");
        return;
      }

const name = (user.user_metadata?.full_name as string) || user.email?.split("@")[0] || "Trader";
      setUserName(name);

const hour = new Date().getHours();
      setGreeting(hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening");

const { data: membership } = await supabase
        .from("org_members")
        .select("org_id, orgs(name)")
        .eq("user_id", user.id)
        .single();

if (membership?.org_id) {
        setOrgName((membership as any).orgs?.name || "");
        const orgId = membership.org_id;

const [c, s, i] = await Promise.all([
          supabase.from("customers").select("id", { count: "exact", head: true }).eq("org_id", orgId),
          supabase.from("suppliers").select("id", { count: "exact", head: true }).eq("org_id", orgId),
          supabase.from("items").select("id", { count: "exact", head: true }).eq("org_id", orgId),
        ]);
        setCounts({ customers: c.count ?? 0, suppliers: s.count ?? 0, items: i.count ?? 0 });
      }
      setLoading(false);
    }
    load();
  }, [router]);

async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

if (loading) {
    return <main className="min-h-screen grid place-items-center text-slate-400">Workspace load ho raha hai...</main>;
  }

return (
    <main className="min-h-screen bg-[#F5F7FB]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-3xl font-extrabold text-[#0B1B2B]">{greeting}, {userName} 👋</h1>
            <p className="mt-1 text-slate-500">{orgName ? `${orgName} — Merchant Operating System` : "Business workspace not found"}</p>
          </div>
          <button onClick={handleLogout} className="text-sm font-bold text-slate-500 hover:text-red-600 border border-slate-300 rounded-lg px-4 py-2">Logout</button>
        </div>

<div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Customers", value: counts?.customers ?? 0, hint: "CRM profiles" },
            { label: "Suppliers", value: counts?.suppliers ?? 0, hint: "Supplier CRM" },
            { label: "Products / Items", value: counts?.items ?? 0, hint: "Catalogue items" },
          ].map((card) => (
            <div key={card.label} className="bg-white rounded-2xl shadow p-6">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{card.label}</p>
              <p className="mt-2 text-3xl font-extrabold text-[#0B1B2B]">{card.value}</p>
              <p className="mt-1 text-sm text-slate-400">{card.hint}</p>
            </div>
          ))}
        </div>

<div className="mt-8 bg-white rounded-2xl shadow p-6">
          <h2 className="font-bold text-[#0B1B2B]">Aage ka roadmap (E2–E7)</h2>
          <ul className="mt-3 text-sm text-slate-500 list-disc pl-5 space-y-1">
            <li>E2: Sales / Purchase / Stock summary widgets</li>
            <li>E3: Customer &amp; Supplier CRM pages with khata ledger</li>
            <li>E4–E5: Sales &amp; Purchase document chains, steel-specific inventory</li>
            <li>E6–E7: Accounting khata &amp; multi-company billing engine</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
