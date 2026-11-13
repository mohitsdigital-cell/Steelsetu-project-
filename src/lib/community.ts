export const ROOMS = [
  { slug: "buy-requirements-rfq", label: "Buy Requirements & RFQ" },
  { slug: "price-trends-sentiment", label: "Price Trends & Sentiment" },
  { slug: "official-bulletin", label: "Official Bulletin" },
  { slug: "logistics-dispatch", label: "Logistics & Dispatch" },
] as const;

export const roomLabel = (slug: string) =>
  ROOMS.find((r) => r.slug === slug)?.label || slug;
