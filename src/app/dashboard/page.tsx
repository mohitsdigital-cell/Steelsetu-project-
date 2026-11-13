"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import DashboardNav from "@/components/dashboard/DashboardNav";

type Counts = { customers: number; suppliers: number; items: number };
type Month = { sales: number; purchases: number; payIn: number; payOut: number; salesQty: number; purchaseQty: number };

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [counts, setCounts] = useState<Counts | null>(null);
  const [month, setMonth] = useState<Month>({ sales: 0, purchases: 0, payIn: 0, payOut: 0, salesQty: 0, purchaseQty: 0 });
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

const firstOfMonth = new Date();
        firstOfMonth.setDate(1);
        const from = firstOfMonth.toISOString().slice(0, 10);

const [c, s, i, m] = await Promise.all([
          supabase.from("customers").select("id", { count: "exact", head: true }).eq("org_id", orgId),
          supabase.from("suppliers").select("id", { count: "exact", head: true }).eq("org_id", orgId),
          supabase.from("items").select("id", { count: "exact", head: true }).eq("org_id", orgId),
          supabase.from("transactions").select("txn_type, amount, quantity").eq("org_id", orgId).gte("txn_date", from),
        ]);
        setCounts({ customers: c.count ?? 0, suppliers: s.count ?? 0, items: i.count ?? 0 });

const t = (m.data || []) as any[];
        const sum = (type: string) => t.filter((x) => x.txn_type === type).reduce((a, x) => a + Number(x.amount || 0), 0);
        const sumQty = (type: string) => t.filter((x) => x.txn_type === type).reduce((a, x) => a + Number(x.quantity || 0), 0);
        setMonth({
          sales: sum("sale"), purchases: sum("purchase"),
          payIn: sum("payment_in"), payOut: sum("payment_out"),
          salesQty: sumQty("sale"), purchaseQty: sumQty("purchase"),
        });
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

const fmt = (n: number) => "Rs " + n.toLocaleString("en-IN");

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

<div className="mt-5"><DashboardNav /></div>

<div className="mt-8">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-400">This Month (E2 widgets)</h2>
          <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: "Sales", value: fmt(month.sales), hint: month.salesQty.toFixed(2) + " MT" },
              { label: "Purchases", value: fmt(month.purchases), hint: month.purchaseQty.toFixed(2) + " MT" },
              { label: "Payment In", value: fmt(month.payIn), hint: "Received" },
              { label: "Payment Out", value: fmt(month.payOut), hint: "Paid" },
              { label: "Net Position", value: fmt(month.sales - month.purchases + month.payIn - month.payOut), hint: "Sales-Purch+In-Out" },
              { label: "Credit Given", value: fmt(month.sales - month.payIn), hint: "Udhaari (sales-in)" },
            ].map((card) => (
              <div key={card.label} className="bg-white rounded-2xl shadow p-4">
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">{card.label}</p>
                <p className="mt-1.5 text-lg font-extrabold text-[#0B1B2B]">{card.value}</p>
                <p className="mt-0.5 text-[11px] text-slate-400">{card.hint}</p>
              </div>
            ))}
          </div>
        </div>

<div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Customers", value: counts?.customers ?? 0, hint: "CRM profiles", href: "/dashboard/customers" },
            { label: "Suppliers", value: counts?.suppliers ?? 0, hint: "Supplier CRM", href: "/dashboard/suppliers" },
            { label: "Products / Items", value: counts?.items ?? 0, hint: "Catalogue items", href: "/products" },
          ].map((card) => (
            <a key={card.label} href={card.href} className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition-shadow">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{card.label}</p>
              <p className="mt-2 text-3xl font-extrabold text-[#0B1B2B]">{card.value}</p>
              <p className="mt-1 text-sm text-slate-400">{card.hint}</p>
            </a>
          ))}
        </div>

<div className="mt-8 bg-white rounded-2xl shadow p-6">
          <h2 className="font-bold text-[#0B1B2B]">Aage ka roadmap (E4–E7)</h2>
          <ul className="mt-3 text-sm text-slate-500 list-disc pl-5 space-y-1">
            <li>E4–E5: Sales &amp; Purchase document chains, steel-specific inventory</li>
            <li>E6–E7: Accounting khata &amp; multi-company billing engine</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
