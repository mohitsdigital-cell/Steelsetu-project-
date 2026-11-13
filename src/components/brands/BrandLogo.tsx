const LOGO_MAP: Record<string, { initials: string; from: string; to: string }> = {
  mount:            { initials: "MO", from: "#FF6A00", to: "#FFB347" },
  "tata-tiscon":    { initials: "TT", from: "#0B4DA2", to: "#2E7DD1" },
  sail:             { initials: "SA", from: "#1B3A5C", to: "#3E6D9C" },
  "jsw-neosteel":   { initials: "JN", from: "#0057A8", to: "#33A1E0" },
  "shyam-steel":    { initials: "SS", from: "#B91C1C", to: "#F05252" },
  srmb:             { initials: "SR", from: "#166534", to: "#34A853" },
  kamdhenu:         { initials: "KA", from: "#C2410C", to: "#F59E0B" },
  "jindal-panther": { initials: "JP", from: "#111827", to: "#4B5563" },
  "rathi-steel":    { initials: "RS", from: "#7F1D1D", to: "#C0392B" },
  "vizag-rinl":     { initials: "VZ", from: "#0F766E", to: "#2DD4BF" },
  "tata-bluescope": { initials: "TB", from: "#1E40AF", to: "#60A5FA" },
  "jsw-colouron":   { initials: "JC", from: "#6D28D9", to: "#A78BFA" },
  "surya-roshni":   { initials: "SU", from: "#B45309", to: "#FBBF24" },
  "amns-india":     { initials: "AM", from: "#0C4A6E", to: "#0EA5E9" },
};

export default function BrandLogo({ slug, name, size = "md" }: { slug: string; name: string; size?: "sm" | "md" | "lg" }) {
  const preset = LOGO_MAP[slug] || {
    initials: name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase(),
    from: "#0B1B2B",
    to: "#3E6D9C",
  };

const dims = size === "lg" ? "w-20 h-20 text-2xl rounded-2xl" : size === "sm" ? "w-10 h-10 text-xs rounded-lg" : "w-14 h-14 text-lg rounded-xl";

return (
    <span
      aria-label={`${name} logo tile`}
      className={`inline-grid place-items-center font-extrabold text-white shadow-md shrink-0 select-none ${dims}`}
      style={{ background: `linear-gradient(135deg, ${preset.from}, ${preset.to})` }}
    >
      {preset.initials}
    </span>
  );
}
