export type Brand = {
  slug: string;
  name: string;
  hq: string;
  about: string;
  groups: string[];
};

/* Information-level brand directory (Burrabazar trade context).
   Brand-supplier relationship verification pending — shown honestly on every page. */
export const brands: Brand[] = [
  { slug: "mount", name: "Mount", hq: "Kolkata, West Bengal", about: "Roofing and colour-coated steel ecosystem brand with a wide product family for sheds, factories and industrial buildings.", groups: ["gi-corrugated-sheets", "gi-plain-sheets", "gi-coils", "ppgi-ppgl-coils", "profile-sheets", "roofing-sheets", "ridge-flashing-gutter", "roofing-screws"] },
  { slug: "tata-tiscon", name: "Tata Tiscon", hq: "Jamshedpur, Jharkhand", about: "Tata Steel's TMT rebar brand, widely traded for RCC construction across Eastern India.", groups: ["tmt-bars"] },
  { slug: "sail", name: "SAIL", hq: "New Delhi", about: "Steel Authority of India — public sector producer of TMT, structural sections, plates and sheets.", groups: ["tmt-bars", "structural-sections", "ms-sheets-plates"] },
  { slug: "jsw-neosteel", name: "JSW Neosteel", hq: "Mumbai, Maharashtra", about: "JSW Steel's TMT rebar brand known for consistent rib geometry and bendability.", groups: ["tmt-bars"] },
  { slug: "shyam-steel", name: "Shyam Steel", hq: "Kolkata, West Bengal", about: "Eastern India TMT producer with strong distribution in Bengal and Burrabazar trade.", groups: ["tmt-bars"] },
  { slug: "srmb", name: "SRMB", hq: "Kolkata, West Bengal", about: "TMT rebar brand with a long-standing presence in the Bengal construction market.", groups: ["tmt-bars"] },
  { slug: "kamdhenu", name: "Kamdhenu", hq: "Gurugram, Haryana", about: "TMT rebar brand distributed widely through regional stockists.", groups: ["tmt-bars"] },
  { slug: "jindal-panther", name: "Jindal Panther", hq: "New Delhi", about: "Jindal Steel & Power's TMT rebar brand for structural reinforcement.", groups: ["tmt-bars"] },
  { slug: "rathi-steel", name: "Rathi Steel", hq: "Ghaziabad, Uttar Pradesh", about: "North India TMT bar producer with pan-India stockist network.", groups: ["tmt-bars"] },
  { slug: "vizag-rinl", name: "Vizag Steel (RINL)", hq: "Visakhapatnam, Andhra Pradesh", about: "Rashtriya Ispat Nigam's TMT and structural products, common in eastern projects.", groups: ["tmt-bars", "structural-sections"] },
  { slug: "tata-bluescope", name: "Tata BlueScope", hq: "Pune, Maharashtra", about: "Colour-coated steel roofing and cladding systems for industrial and residential buildings.", groups: ["ppgi-ppgl-coils", "profile-sheets", "roofing-sheets"] },
  { slug: "jsw-colouron", name: "JSW Colouron+", hq: "Mumbai, Maharashtra", about: "JSW's pre-painted colour-coated profile sheet brand for roofing and wall cladding.", groups: ["ppgi-ppgl-coils", "profile-sheets", "roofing-sheets"] },
  { slug: "surya-roshni", name: "Surya Roshni", hq: "New Delhi (Registered: Bahadurgarh, Haryana)", about: "India's largest exporter of ERW pipes and a major producer of ERW GI pipes, hollow sections, spiral pipes and CR strips.", groups: ["pipes-tubes", "hollow-sections"] },
  { slug: "amns-india", name: "AMNS India", hq: "Hazira, Surat, Gujarat (Corporate: Mumbai)", about: "ArcelorMittal Nippon Steel India — 10 MTPA integrated steel producer of HR coils, plates, coated and CR products.", groups: ["hr-coils", "cr-coils", "ms-sheets-plates"] },
];

export function getBrand(slug: string) {
  return brands.find((b) => b.slug === slug);
}
