import Link from "next/link";
import { rooms } from "@/lib/community-store";
import RoomFeed from "@/components/community/RoomFeed";

export function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const room = rooms.find((r) => r.slug === slug);
  return { title: room ? room.name : "Trade Room" };
}

export default async function RoomPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const room = rooms.find((r) => r.slug === slug);
  if (!room) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-2xl font-bold text-steel-navy">Room not found</h1>
        <Link href="/community" className="inline-block mt-6 text-sm font-semibold text-steel-blue hover:underline">Back to Community</Link>
      </div>
    );
  }

return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <p className="text-xs text-steel-grey mb-3">
        <Link href="/community" className="hover:text-steel-blue">Community</Link> / {room.name}
      </p>
      <h1 className="text-3xl font-bold text-steel-navy">{room.name}</h1>
      <p className="mt-4 text-sm text-steel-charcoal/80 leading-relaxed">{room.desc}</p>

<RoomFeed slug={room.slug} official={room.slug === "official-bulletin"} />

<p className="mt-6 text-[11px] text-steel-grey leading-relaxed">
        Demo mode: posts save in this browser and become visible to all members with the accounts
        phase. Disputes go to the Trust / grievance process, never this feed.
      </p>
    </div>
  );
}
