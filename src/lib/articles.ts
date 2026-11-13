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
  {
    slug: "how-to-prepare-a-steel-rfq",
    title: "How to Prepare a Steel RFQ That Gets Useful Quotations",
    excerpt: "The exact fields a supplier needs to quote quickly — and the ones that cause back-and-forth when missing.",
    reviewed: "November 2026",
    sections: [
      {
        heading: "Why structure matters",
        paragraphs: [
          "In Burrabazar, most requirements still travel by phone or WhatsApp in one line: 'rate batao'. The supplier then has to call back with four questions before quoting. A structured RFQ answers those questions upfront, so the first response you receive is actually usable.",
        ],
      },
      {
        heading: "The minimum fields",
        paragraphs: [
          "Product — TMT bars, GP sheet, PPGL profile, coil, pipe or section. Use the trade name used in your market, but add the specification if you know it.",
          "Quantity and unit — 5 tonnes, 200 sheets, 3 coils. Without quantity, no supplier can quote a realistic rate.",
          "Delivery location — city or PIN code. Freight and delivery time depend on it.",
          "Contact preference — WhatsApp or phone, so responses reach you.",
        ],
      },
      {
        heading: "Fields that sharpen the quote",
        paragraphs: [
          "Grade or brand preference — Fe500D, or a specific mill if you have one.",
          "Dimensions — thickness, width, length, profile. For sheets, thickness in millimetres matters more than gauge numbers.",
          "Delivery timeframe — this week, this month, or a dated project schedule.",
          "Required documents — test certificate, GST invoice, e-way bill.",
        ],
      },
      {
        heading: "After you post",
        paragraphs: [
          "Your RFQ gets a reference number, and relevant suppliers respond to the same fields — which makes their quotations directly comparable. Post a requirement on Steelsetu and see the difference a structured RFQ makes.",
        ],
      },
    ],
  },
  {
    slug: "how-to-identify-the-right-steel-product",
    title: "How to Identify the Right Steel Product for Your Job",
    excerpt: "A practical selection path: start from the application, match the product family, then lock the specification.",
    reviewed: "November 2026",
    sections: [
      {
        heading: "Start from the application",
        paragraphs: [
          "Reinforcement for RCC structure — TMT bars. Roofing or cladding — corrugated or profile sheets, plain sheets for ducting and panels. Structural frames — angles, channels, beams. Piping — pipes and tubes. The application narrows the product family faster than any catalogue.",
        ],
      },
      {
        heading: "Match the product family",
        paragraphs: [
          "Within roofing, the choice between galvanised (GC/GP), colour-coated (PPGI/PPGL), FRP or polycarbonate depends on budget, environment and expected life. Within reinforcement, Fe500 vs Fe500D depends on the structural requirement.",
          "If two products look interchangeable, the difference is usually coating, grade or finish — not the shape.",
        ],
      },
      {
        heading: "Lock the specification",
        paragraphs: [
          "Before asking for a rate, write down: product, grade or coating, thickness, width, length and unit. This is the minimum a supplier needs, and it is what separates a comparable quotation from a guess.",
        ],
      },
      {
        heading: "When in doubt",
        paragraphs: [
          "Ask a trade question in the Steelsetu community — experienced traders answer product-selection questions, and every answer stays searchable for the next buyer with the same doubt.",
        ],
      },
    ],
  },
  {
    slug: "steel-thickness-gauge-and-weight",
    title: "Steel Thickness, Gauge and Weight: What Buyers Must Verify",
    excerpt: "Gauge vs millimetres, theoretical vs actual weight, and why the cheapest sheet often is not.",
    reviewed: "November 2026",
    sections: [
      {
        heading: "Thickness vs gauge",
        paragraphs: [
          "In the sheet trade, thickness is often quoted in gauge. But gauge numbers differ between product families, and two '16 gauge' sheets from different suppliers can be different in millimetres. Always convert to millimetres and compare mm to mm.",
          "In colour-coated and galvanised products, confirm whether the stated thickness is base thickness or includes coating — for billing purposes the base thickness in mm is the number to lock.",
        ],
      },
      {
        heading: "Weight basics",
        paragraphs: [
          "Theoretical weight of steel sheet is about 7.85 kg per square metre per millimetre of thickness. A coil or a bundle is heavier than the sheet weight alone — packaging, cores and strapping add gross weight.",
          "For TMT bars, the theoretical weight per metre is d^2/162 kg. These formulas let you sanity-check any quotation before accepting it.",
        ],
      },
      {
        heading: "Billing weight",
        paragraphs: [
          "Rates can be billed on theoretical weight or actual weighment. The two can differ by rolling tolerance. Ask which basis the rate uses, and keep weighment slips for delivered consignments.",
        ],
      },
      {
        heading: "Verify on delivery",
        paragraphs: [
          "Check bundle counts, piece counts and random thickness measurements before unloading is completed. A discrepancy documented at delivery is a simple discussion; the same discrepancy found a week later is a dispute.",
        ],
      },
    ],
  },
  {
    slug: "questions-to-ask-before-placing-steel-order",
    title: "Questions to Ask Before Placing a Steel Order",
    excerpt: "A ten-point checklist covering specification, commercial terms, delivery and documents.",
    reviewed: "November 2026",
    sections: [
      {
        heading: "Specification questions",
        paragraphs: [
          "Is the grade and standard exactly what I asked for — and will the test certificate say so?",
          "Is the thickness the base thickness in millimetres I asked for?",
          "Is the brand the one I selected — or a substitute offered at the same rate?",
        ],
      },
      {
        heading: "Commercial questions",
        paragraphs: [
          "Is the rate per tonne, per piece, per bundle or per square foot — and on theoretical or actual weight?",
          "Is the rate inclusive or exclusive of GST, and is freight included to my site?",
          "What are the payment terms, and does the rate depend on them?",
          "How long is this rate valid?",
        ],
      },
      {
        heading: "Delivery and documents",
        paragraphs: [
          "When will material reach my site or my site's nearest point — and what happens if the date slips?",
          "Will I get the GST invoice, test certificate and transport/LR reference with the consignment?",
          "Whom do I call if there is a shortage or damage at delivery — and what is the process to record it?",
        ],
      },
      {
        heading: "Make it repeatable",
        paragraphs: [
          "These questions take two minutes on a call but save days of back-and-forth. A structured RFQ on Steelsetu asks them upfront, so every supplier answers the same points in writing.",
        ],
      },
    ],
  },
];
