export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  reviewed: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const articles: Article[] = [
  {
    slug: "tmt-grades-explained",
    title: "TMT Grades Explained: Fe500, Fe500D and What the Numbers Mean",
    excerpt: "How to read TMT grade markings, what the D suffix changes, and what to check before buying.",
    reviewed: "November 2026",
    sections: [
      {
        heading: "What TMT means",
        paragraphs: [
          "TMT stands for Thermo-Mechanically Treated. The bar is hot-rolled and then rapidly cooled on the surface while the core cools slowly. The result is a hard outer layer for strength with a comparatively ductile core for bendability.",
        ],
      },
      {
        heading: "Reading the grade",
        paragraphs: [
          "In Fe500, the number 500 refers to the minimum yield strength in N/mm2. Fe550 bars offer a higher minimum yield strength.",
          "The D suffix (as in Fe500D) marks a higher-ductility class with stricter limits on elements such as sulphur and phosphorus under IS 1786. D-grade bars are generally preferred where ductility matters.",
          "Always confirm the governing standard and grade on documents — do not rely on the rib pattern alone.",
        ],
      },
      {
        heading: "Weight you can verify",
        paragraphs: [
          "Theoretical weight per metre of a round bar is d^2 / 162 kilograms, where d is the diameter in millimetres. For a 12mm bar that is about 0.889 kg per metre.",
          "Actual rolling tolerances apply, so delivered weights can differ slightly from theoretical figures. For billing based on weight, verify the weighment slips.",
        ],
      },
      {
        heading: "Before you buy",
        paragraphs: [
          "Ask for the mill test certificate (MTC) and check that the grade and standard on the certificate match what you ordered.",
          "Check bundle tagging and markings. Uniform rib patterns and consistent branding are basic quality signals.",
          "Confirm length per bar and pieces per bundle — these affect your total usable quantity.",
        ],
      },
    ],
  },
  {
    slug: "gi-gp-ppgi-ppgl-explained",
    title: "GI, GP, PPGI and PPGL: A Plain-Language Guide",
    excerpt: "Zinc-coated and colour-coated sheet terms demystified for buyers.",
    reviewed: "November 2026",
    sections: [
      {
        heading: "GI - the coating family",
        paragraphs: [
          "GI stands for galvanised iron — steel coated with zinc, typically by hot-dip galvanising. The zinc coating protects the steel from corrosion.",
          "Coating weight is commonly expressed in GSM (grams per square metre). Higher GSM generally means better corrosion protection, at a higher cost.",
        ],
      },
      {
        heading: "GP vs GC",
        paragraphs: [
          "GP sheets are galvanised plain — flat zinc-coated sheets used in ducting, fabrication and panelling.",
          "GC sheets are galvanised corrugated — the same coating family but rolled into a corrugated profile, mainly for roofing.",
        ],
      },
      {
        heading: "PPGI and PPGL - colour-coated products",
        paragraphs: [
          "PPGI is pre-painted GI: a zinc-coated base with a paint system applied before profiling. It gives colour finish with the base protection of zinc.",
          "PPGL is pre-painted on a zinc-aluminium alloy coated base. Zinc-aluminium coatings are commonly used for their corrosion performance characteristics.",
          "Neither is automatically better for every project. Match the choice to environment, budget and span.",
        ],
      },
      {
        heading: "What to confirm with your supplier",
        paragraphs: [
          "Confirm base thickness in millimetres (not just gauge), coating type and weight, width, profile and colour code before comparing prices.",
          "Two sheets quoted at the same price can differ significantly if thickness or coating differs.",
        ],
      },
    ],
  },
  {
    slug: "how-to-compare-steel-quotations",
    title: "How to Compare Steel Quotations Fairly",
    excerpt: "The fields that decide whether two quotations are actually comparable.",
    reviewed: "November 2026",
    sections: [
      {
        heading: "Why quotations differ",
        paragraphs: [
          "Two suppliers can quote different rates for the same product because of grade, brand, quantity, tax treatment, freight, delivery distance and payment terms. A rate number alone tells you very little.",
        ],
      },
      {
        heading: "The comparison checklist",
        paragraphs: [
          "Product and grade or standard — is it the same specification?",
          "Brand — same brand, or different brands quoted at the same price?",
          "Dimensions — thickness, width, length and profile match?",
          "Quantity and unit — per tonne, per piece, per bundle, per square foot?",
          "Rate basis — theoretical weight or actual weighment?",
          "Tax — is the rate inclusive or exclusive of GST?",
          "Freight — included, or extra to your site?",
          "Delivery timeline and payment terms.",
          "Offer validity — how long does the rate hold?",
          "Documents — does the quote include test certificates?",
        ],
      },
      {
        heading: "Red flags",
        paragraphs: [
          "A rate with no unit basis, no tax status, or vague phrases should be clarified before comparison.",
          "The lowest rate with missing details is often not the lowest landed cost.",
        ],
      },
      {
        heading: "Use a structured RFQ",
        paragraphs: [
          "When you post one structured RFQ on Steelsetu, every supplier responds to the same fields — which makes genuine comparison possible.",
        ],
      },
    ],
  },
];
