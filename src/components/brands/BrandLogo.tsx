"use client";

import Image from "next/image";
import { useState } from "react";

/* Real brand logos live in public/brands/{slug}.svg (preferred), .png, .webp or .jpg.
   If a logo file is missing or fails to load, the branded initials tile is shown instead
   so the UI never breaks. Logos are shown for identification only (nominative fair use). */

const FALLBACK: Record<string, { initials: string; from: string; to: string }> = {
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

const BOX =
  size === "lg" ? "w-20 h-20 rounded-2xl" :
  size === "sm" ? "w-10 h-10 rounded-lg" :
  "w-14 h-14 rounded-xl";

const TXT =
  size === "lg" ? "text-2xl" :
  size === "sm" ? "text-xs" :
  "text-lg";

export default function BrandLogo({ slug, name, size = "md" }: { slug: string; name: string; size?: "sm" | "md" | "lg" }) {
  const [ext, setExt] = useState<"svg" | "png" | "webp" | "jpg" | null>("svg");

  // Real logo — public/brands/{slug}.svg / .png / .webp / .jpg (jo bhi mile)
  if (ext) {
    return (
      <span className={`relative block overflow-hidden bg-white ring-1 ring-slate-200 shadow-sm shrink-0 ${BOX}`}>
        <Image
          src={`/brands/${slug}.${ext}`}
          alt={`${name} logo`}
          fill
          sizes="80px"
          className="object-contain p-1"
          onError={() => setExt(prev => prev === "svg" ? "png" : prev === "png" ? "webp" : prev === "webp" ? "jpg" : null)}
        />
      </span>
    );
  }

  // Fallback tile — logo file na mile tab
  const preset = FALLBACK[slug] || {
    initials: name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase(),
    from: "#0B1B2B",
    to: "#3E6D9C",
  };

  return (
    <span
      aria-label={`${name} logo tile`}
      className={`inline-grid place-items-center font-extrabold text-white shadow-md shrink-0 select-none ${BOX} ${TXT}`}
      style={{ background: `linear-gradient(135deg, ${preset.from}, ${preset.to})` }}
    >
      {preset.initials}
    </span>
  );
}