export type CatalogItem = {
  slug: string;
  name: string;
  short: string;
  description: string;
  specs: { label: string; value: string }[];
};

export const catalog: CatalogItem[] = [
  {
    slug: "tmt-bars",
    name: "TMT Bars & Reinforcement Steel",
    short: "Fe500/Fe500D grades, 8mm-32mm, construction reinforcement.",
    description:
      "Thermo-mechanically treated reinforcement bars for RCC construction. The most widely traded long product in Eastern India.",
    specs: [
      { label: "Common grades", value: "Fe500, Fe500D, Fe550, Fe550D (IS 1786)" },
      { label: "Common sizes", value: "8mm to 32mm diameter" },
      { label: "Standard length", value: "Approx. 12 metres per bar" },
      { label: "Weight formula", value: "kg per metre = d^2 / 162 (theoretical)" },
    ],
  },
  {
    slug: "ms-sheets-plates",
    name: "MS Sheets & Plates",
    short: "Hot-rolled and cold-rolled mild steel sheets and plates.",
    description:
      "Mild steel flat products used in fabrication, structures, panels and general engineering.",
    specs: [
      { label: "Common standard", value: "IS 2062 (structural steel grades such as E250)" },
      { label: "Thickness range", value: "Thin sheets to heavy plates - confirm available range with supplier" },
      { label: "Weight formula", value: "kg = length(m) x width(m) x thickness(mm) x 7.85" },
    ],
  },
  {
    slug: "gi-corrugated-sheets",
    name: "Galvanized Corrugated Sheets",
    short: "GC sheets in standard profiles and thicknesses.",
    description:
      "Zinc-coated corrugated sheets for roofing and cladding of sheds, godowns and industrial structures.",
    specs: [
      { label: "Coating", value: "Zinc coating expressed in GSM - confirm with supplier" },
      { label: "Common forms", value: "Sheets and coils, standard profiles" },
      { label: "Applications", value: "Roofing, wall cladding, sheds" },
    ],
  },
  {
    slug: "gi-plain-sheets",
    name: "Galvanized Plain Sheets",
    short: "GP sheets for fabrication and ducting.",
    description: "Flat zinc-coated sheets used in ducting, fabrication, panels and general applications.",
    specs: [
      { label: "Coating", value: "Zinc coating in GSM - varies by product" },
      { label: "Common uses", value: "Ducting, fabrication, panels" },
      { label: "Availability", value: "Cut sizes and standard sizes" },
    ],
  },
  {
    slug: "gi-coils",
    name: "Galvanized Coils",
    short: "GI coils in commercial and full-hard qualities.",
    description: "Zinc-coated coils for profiling, corrugation and further processing.",
    specs: [
      { label: "Common widths", value: "Confirm available widths with supplier" },
      { label: "Coating", value: "Zinc coating GSM varies - verify per lot" },
      { label: "Applications", value: "Profile sheets, corrugation, general fabrication" },
    ],
  },
  {
    slug: "ppgi-ppgl-coils",
    name: "Colour Coated Coils (PPGI/PPGL)",
    short: "Pre-painted galvanized and galvalume coils.",
    description:
      "Pre-painted coils for profile sheets and roofing with colour finish. PPGI uses zinc-coated base; PPGL uses zinc-aluminium alloy coated base.",
    specs: [
      { label: "Base types", value: "PPGI (zinc coated base), PPGL (zinc-aluminium alloy coated base)" },
      { label: "Common uses", value: "Profile sheets, roofing, wall panels" },
      { label: "Check before buying", value: "Thickness, coating, paint system, colour code" },
    ],
  },
  {
    slug: "profile-sheets",
    name: "Profile Sheets",
    short: "Trapezoidal and other industrial profiles.",
    description: "Profiled roofing and cladding sheets rolled from GI or colour-coated coils.",
    specs: [
      { label: "Profiles", value: "Trapezoidal and other industrial profiles" },
      { label: "Base material", value: "GI, PPGI or PPGL" },
      { label: "Accessories", value: "Ridge, flashing, screws, closures" },
    ],
  },
  {
    slug: "roofing-sheets",
    name: "Roofing Sheets",
    short: "Roofing and cladding solutions for sheds and factories.",
    description: "The roofing family: GI/GC sheets, profile sheets, colour-coated sheets, FRP and polycarbonate.",
    specs: [
      { label: "Material options", value: "GI, colour-coated, FRP, polycarbonate" },
      { label: "Selection factors", value: "Span, slope, insulation need, budget" },
      { label: "Estimate tip", value: "Add allowance for overlap and wastage" },
    ],
  },
  {
    slug: "frp-sheets",
    name: "FRP / Fiberglass Sheets",
    short: "Sky-light and corrosion-resistant sheets.",
    description: "Translucent fiberglass-reinforced sheets used for natural lighting and corrosion-prone areas.",
    specs: [
      { label: "Common uses", value: "Skylights, industrial roofing in corrosive areas" },
      { label: "Selection factors", value: "Profile match with roofing, light transmission" },
    ],
  },
  {
    slug: "polycarbonate-sheets",
    name: "Polycarbonate Sheets",
    short: "Transparent roofing and glazing.",
    description: "Transparent or tinted polycarbonate sheets for skylights, canopies and glazing.",
    specs: [
      { label: "Common uses", value: "Skylights, canopies, industrial glazing" },
      { label: "Selection factors", value: "Thickness, UV protection, profile match" },
    ],
  },
  {
    slug: "puf-panels",
    name: "PUF / PIR Insulated Panels",
    short: "Insulated sandwich panels for cold storage and clean rooms.",
    description: "Insulated sandwich panels with a rigid foam core between metal facings.",
    specs: [
      { label: "Common uses", value: "Cold storage, clean rooms, temperature-controlled spaces" },
      { label: "Check before buying", value: "Core type, thickness, facing, joint system" },
    ],
  },
  {
    slug: "roofing-screws",
    name: "Roofing Screws & Fasteners",
    short: "Self-drilling screws with washers and colour caps.",
    description: "Self-drilling roofing screws with EPDM washers, matched to sheet and purlin.",
    specs: [
      { label: "Key matching", value: "Screw length to purlin + sheet thickness" },
      { label: "Common items", value: "Screws with EPDM washers, colour caps" },
    ],
  },
  {
    slug: "ridge-flashing-gutter",
    name: "Ridge, Donga, Flashing & Gutter",
    short: "Complete roofing accessories.",
    description: "Ridge caps, donga, flashing and gutter components that complete a roofing system.",
    specs: [
      { label: "Material", value: "Matched to roofing sheet (GI, PPGL, etc.)" },
      { label: "Tip", value: "Order accessories with sheets to ensure profile match" },
    ],
  },
  {
    slug: "ventilation-fans",
    name: "Ventilation Fans & Roof Ventilators",
    short: "Turbine ventilators and industrial fans.",
    description: "Wind-driven turbine ventilators and powered fans for shed and factory ventilation.",
    specs: [
      { label: "Common types", value: "Turbine ventilators, powered industrial fans" },
      { label: "Sizing", value: "Depends on shed volume - consult supplier" },
    ],
  },
  {
    slug: "structural-sections",
    name: "Structural Sections",
    short: "Angles, channels, beams (ISMB/ISA/ISMC).",
    description: "Standard structural sections for fabrication and construction.",
    specs: [
      { label: "Common sections", value: "Angles (ISA), channels (ISMC), beams (ISMB)" },
      { label: "Common standard", value: "IS 2062 grades - confirm with supplier" },
    ],
  },
  {
    slug: "pipes-tubes",
    name: "Pipes & Tubes",
    short: "MS, GI and ERW pipes in standard sizes.",
    description: "MS pipes, GI pipes and ERW tubes for structural, plumbing and engineering use.",
    specs: [
      { label: "Common types", value: "MS, GI, ERW" },
      { label: "Check before buying", value: "Outer diameter, wall thickness, class/grade, standard" },
    ],
  },
];
