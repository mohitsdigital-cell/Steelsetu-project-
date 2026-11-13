import { catalog } from "@/lib/catalog";
import { brands } from "@/lib/brands";

export type Requirement = {
  productType: string;
  grade: string;
  thickness: string;
  width: string;
  quantity: string;
  city: string;
  budget: string;
  deliveryDate: string;
};

/* Simple, honest keyword matching: product type keywords ke basis par catalog + brands match karta hai.
   Ye recommendation engine hai — final availability supplier confirm karega. */
export function matchProducts(req: Requirement) {
  const keywords = req.productType.toLowerCase().split(/[\s,]+/).filter((w) => w.length > 2);

const scored = catalog.map((item) => {
    const haystack = (item.name + " " + item.short + " " + item.description).toLowerCase();
    let score = 0;
    for (const kw of keywords) {
      if (haystack.includes(kw)) score += 2;
      if (item.slug.includes(kw)) score += 1;
    }
    if (req.grade && (item.name + " " + item.short).toLowerCase().includes(req.grade.toLowerCase())) score += 1;
    return { slug: item.slug, name: item.name, short: item.short, score };
  });

const matched = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score).slice(0, 6);
  const matchedSlugs = matched.map((m) => m.slug);
  const relatedBrands = brands.filter((b) => b.groups.some((g) => matchedSlugs.includes(g)));

return { matched, relatedBrands };
}
