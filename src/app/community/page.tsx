import Link from "next/link";
import ProfileCard from "@/components/community/ProfileCard";
import { rooms } from "@/lib/community-store";

export const metadata = { title: "Community" };

export default function CommunityPage() {
  return (
    <div>
      <section className="bg-steel-navy text-white grain relative overflow-hidden">
        <div className="absolute -top-20 right-0 w-[350px] h-[350px] rounded-full bg-indigo-500/20 blur-[110px]" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Trade Community</h1>
          <p className="mt-4 text-slate-300 max-w-2xl">
            A focused, moderated community for real steel trade - zero drama, no fake counts.
          </p>
        </div>
      </section>

<section className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProfileCard />
          </div>
          <div className="bg-white border border-gray-200 rounded-3xl p-7">
            <h2 className="text-sm font-bold text-steel-navy">All hubs are live (demo)</h2>
            <p className="mt-2 text-xs text-steel-charcoal/70 leading-relaxed">
              Your posts, votes and RSVPs save in this browser. Multi-user accounts, moderation
              and verified institutional posting arrive with the accounts phase.
            </p>
            <Link href="/community-guidelines" className="inline-block mt-4 text-xs font-semibold text-steel-blue hover:underline">Community Guidelines →</Link>
          </div>
        </div>

<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { href: "/community/questions", title: "Trade Q&A", text: "Ask in the right room, reply, mark the best answer, search and report." },
            { href: "/community/polls", title: "Weekly Polls", text: "Single or multi-choice polls with closing times - real counts only." },
            { href: "/community/events", title: "Events", text: "Organiser, capacity, status and honest RSVP counts." },
          ].map((h) => (
            <Link key={h.href} href={h.href} className="bg-white border border-gray-200 rounded-3xl p-8 card-hover">
              <h2 className="text-lg font-bold text-steel-navy">{h.title}</h2>
              <p className="mt-2 text-sm text-steel-charcoal/70">{h.text}</p>
              <p className="mt-4 text-xs font-semibold text-steel-blue">Open →</p>
            </Link>
          ))}
        </div>

<p className="mt-8 text-sm font-bold text-steel-navy">Trade Rooms</p>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rooms.map((r) => (
            <Link key={r.slug} href={"/community/rooms/" + r.slug} className="bg-white border border-gray-200 rounded-2xl p-5 card-hover">
              <p className="text-sm font-semibold text-steel-navy">{r.name}</p>
              <p className="mt-1 text-xs text-steel-charcoal/70 leading-relaxed">{r.desc}</p>
            </Link>
          ))}
        </div>
        <p className="mt-4 text-[11px] text-steel-grey leading-relaxed">
          Four focused rooms only - new rooms will be added only when there is genuine participation.
        </p>
      </section>
    </div>
  );
}
