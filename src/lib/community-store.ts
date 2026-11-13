export const roles = [
  "Buyer", "Supplier", "Trader", "Stockist", "Manufacturer",
  "Distributor", "Fabricator", "Logistics Partner",
  "Verified Business", "Official Publisher",
] as const;
export type Role = (typeof roles)[number];

export const badgeNote = "A role badge identifies a profile category or verified status. It does not certify honesty, quality or financial reliability.";

export type Answer = { id: string; text: string; by: string; role: string; at: string; best: boolean };
export type Question = { id: string; ownerId: string; title: string; body: string; by: string; role: string; room: string; at: string; answers: Answer[] };
export type PollOption = { id: string; label: string; votes: number };
export type Poll = { id: string; question: string; mode: "single" | "multi"; closesAt: string; closedByCreator: boolean; createdBy: string; options: PollOption[]; at: string };
export type EventItem = { id: string; createdBy: string; title: string; organiser: string; date: string; time: string; location: string; onlineLink: string; desc: string; capacity: number; status: "Upcoming" | "Live" | "Completed" | "Cancelled"; rsvps: string[] };
export type RoomPost = { id: string; by: string; role: string; text: string; at: string };

export const rooms = [
  { slug: "buy-requirements-rfq", name: "Buy Requirements & RFQ", desc: "Buyer requirements and RFQ discussion. Relevant posts can be converted into a structured RFQ." },
  { slug: "price-trends-sentiment", name: "Price Trends & Market Sentiment", desc: "Market direction discussion. Sentiment only - never presented as verified prices." },
  { slug: "official-bulletin", name: "Official / Institutional Bulletin", desc: "Posts from verified institutional accounts only - associations, samities, organisations." },
  { slug: "logistics-dispatch", name: "Logistics & Dispatch", desc: "Transport, dispatch and documentation discussion for steel consignments." },
];

export type DB = {
  clientId: string;
  profile: { name: string; role: string };
  questions: Question[];
  polls: Poll[];
  events: EventItem[];
  roomPosts: Record<string, RoomPost[]>;
  myVotes: Record<string, string[]>;
  reported: string[];
};

const KEY = "steelsetu-community-v2";

export function uid(): string {
  return Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
}

export function isPollClosed(p: Poll): boolean {
  if (p.closedByCreator) return true;
  if (p.closesAt && new Date(p.closesAt).getTime() < Date.now()) return true;
  return false;
}

export function loadDB(): DB {
  if (typeof window === "undefined") {
    return { clientId: "server", profile: { name: "", role: "" }, questions: [], polls: [], events: [], roomPosts: {}, myVotes: {}, reported: [] };
  }
  let db: DB;
  try {
    db = JSON.parse(window.localStorage.getItem(KEY) || "null") as DB;
  } catch {
    db = null as unknown as DB;
  }
  if (!db || !db.clientId) {
    db = {
      clientId: uid(),
      profile: { name: "", role: "" },
      questions: [
        {
          id: "q1", ownerId: "seed-owner-1", room: "buy-requirements-rfq", by: "R. Sharma", role: "Buyer",
          title: "Fe500D vs Fe550D for a 4-storey RCC frame - worth the premium?",
          body: "Contractor in Howrah. Supplier quoting Fe550D noticeably above Fe500D. Is the premium justified for a 4-storey residential frame?",
          at: "2026-11-10T09:30:00.000Z",
          answers: [
            { id: "a1", text: "For typical 4-storey residential frames, Fe500D is the common, code-compliant choice. Fe550D can reduce tonnage in some designs, but that must come from your structural designer, not from the seller.", by: "Trade Desk", role: "Trader", at: "2026-11-10T11:00:00.000Z", best: true },
            { id: "a2", text: "Check the MTC either way - grade on paper should match grade on bars.", by: "M. Dutta", role: "Stockist", at: "2026-11-11T08:15:00.000Z", best: false },
          ],
        },
        {
          id: "q2", ownerId: "seed-owner-2", room: "price-trends-sentiment", by: "S. Ghosh", role: "Fabricator",
          title: "0.5mm vs 0.6mm GC sheet for a 20m span shed?",
          body: "Which thickness is practical for a 20m clear span industrial shed in coastal South 24 Parganas?",
          at: "2026-11-11T14:00:00.000Z",
          answers: [
            { id: "a3", text: "Span and purlin spacing decide this more than coating alone - get your fabricator to confirm purlin spacing before choosing thickness. In coastal areas also weigh higher GSM.", by: "Fabricator", role: "Fabricator", at: "2026-11-12T10:30:00.000Z", best: false },
          ],
        },
      ],
      polls: [
        { id: "p1", question: "Where is TMT demand heading in your market next week?", mode: "single", closesAt: "", closedByCreator: false, createdBy: "seed", at: "2026-11-09T06:00:00.000Z", options: [{ id: "o1", label: "Rising", votes: 7 }, { id: "o2", label: "Steady", votes: 12 }, { id: "o3", label: "Falling", votes: 3 }] },
        { id: "p2", question: "Is your GC/GP sheet stock position?", mode: "single", closesAt: "", closedByCreator: false, createdBy: "seed", at: "2026-11-09T06:00:00.000Z", options: [{ id: "o4", label: "Building up", votes: 5 }, { id: "o5", label: "Holding", votes: 9 }, { id: "o6", label: "Running down", votes: 4 }] },
      ],
      events: [
        { id: "e1", createdBy: "seed", title: "Burrabazar Traders Meetup - Steelsetu Intro Session", organiser: "Steelsetu Team (demo entry)", date: "2026-11-25", time: "17:00", location: "Burrabazar, Kolkata", onlineLink: "", desc: "Informal session introducing structured RFQs and the verification system to local traders.", capacity: 60, status: "Upcoming", rsvps: ["seed-1", "seed-2", "seed-3"] },
      ],
      roomPosts: {},
      myVotes: {},
      reported: [],
    };
  }
  if (!db.profile) db.profile = { name: "", role: "" };
  if (!db.myVotes) db.myVotes = {};
  if (!db.reported) db.reported = [];
  if (!db.roomPosts) db.roomPosts = {};
  return db;
}

export function saveDB(db: DB): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(db));
}
