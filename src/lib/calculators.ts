export const calculators = [
  {
    slug: "tmt-weight",
    title: "TMT Bar Weight Calculator",
    excerpt: "Theoretical weight per metre, per bar and per bundle using d-squared over 162.",
  },
  {
    slug: "sheet-weight",
    title: "Steel Sheet Weight Calculator",
    excerpt: "Weight of GI, GP, GC and plain sheets from thickness, width and length.",
  },
  {
    slug: "roofing-estimator",
    title: "Roofing Sheet Estimator",
    excerpt: "Estimate sheet count with overlap for a given roof area and profile.",
  },
] as const;

export const TMT_SIZES = [8, 10, 12, 16, 20, 25, 28, 32] as const;
export const STEEL_DENSITY = 7.85; // g/cc - theoretical basis for sheet weight
