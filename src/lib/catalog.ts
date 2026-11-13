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
  {
    slug: "hr-coils", name: "Hot Rolled Coils", short: "HR coils for pipes, structures and re-rolling.",
    description: "Hot rolled coils used as feedstock for pipes, cold rolling and structural re-rolling.",
    specs: [
      { label: "Common standard", value: "IS 2062 or equivalent - confirm with supplier" },
      { label: "Check before buying", value: "Width, thickness, mill edge / slit edge" },
    ],
  },
  {
    slug: "cr-coils", name: "Cold Rolled Coils", short: "CR coils for panels, furniture and precision work.",
    description: "Cold rolled coils with better surface finish for fabrication needing tight tolerances.",
    specs: [
      { label: "Common uses", value: "Panels, furniture, drums, precision fabrication" },
      { label: "Check before buying", value: "Thickness, width, skin-pass / annealed condition" },
    ],
  },
  {
    slug: "mini-coils", name: "Mini / Slit Coils", short: "Narrow slit coils for small fabrication units.",
    description: "Slit-width coils cut from full-width GI or CR coils for small roll-forming and fabrication units.",
    specs: [
      { label: "Common widths", value: "Narrow slit widths - confirm available range" },
      { label: "Tip", value: "Match coil ID/OD with your decoiling equipment" },
    ],
  },
  {
    slug: "printed-ppgl-sheets", name: "Printed Colour Coated Sheets", short: "Wood/stone-finish printed profile sheets.",
    description: "Pre-painted printed profile sheets (wood grain, stone, tile patterns) for premium roofing and cladding.",
    specs: [
      { label: "Patterns", value: "Wood grain, stone, tile finishes" },
      { label: "Check before buying", value: "Print layer durability, coating thickness" },
    ],
  },
  {
    slug: "chequered-plates", name: "MS Chequered Plates", short: "Anti-slip tread plates for flooring.",
    description: "Raised-pattern mild steel plates used for industrial flooring, walkways, stair treads and truck bodies.",
    specs: [
      { label: "Common sizes", value: "Confirm thickness and pattern with supplier" },
      { label: "Standard", value: "IS 2062 base - confirm with supplier" },
    ],
  },
  {
    slug: "ss-sheets", name: "Stainless Steel Sheets", short: "SS 304/316 sheets and plates.",
    description: "Austenitic stainless steel sheets (304/316 grades) for food, pharma, architectural and corrosion-prone applications.",
    specs: [
      { label: "Common grades", value: "SS 304, SS 316 (confirm with supplier)" },
      { label: "Finishes", value: "2B, BA, matte, hairline, mirror" },
    ],
  },
  {
    slug: "aluminium-sheets", name: "Aluminium Sheets", short: "Al sheets for cladding, signage and ducting.",
    description: "Aluminium sheets and coils for facade cladding, signage, insulation and HVAC ducting.",
    specs: [
      { label: "Common alloys", value: "Alloy series used for sheets - confirm with supplier" },
      { label: "Applications", value: "Cladding, signage, AC ducting, insulation" },
    ],
  },
  {
    slug: "hollow-sections", name: "Square & Rectangular Hollow Sections", short: "SHS/RHS for modern structures.",
    description: "Square and rectangular hollow sections for fabrication where clean lines and torsional strength matter.",
    specs: [
      { label: "Common sizes", value: "Confirm size range with supplier" },
      { label: "Uses", value: "Railing, truss, furniture, structural frames" },
    ],
  },
  {
    slug: "ms-flats", name: "MS Flats", short: "Flat bars for fabrication and grills.",
    description: "Mild steel flat bars used in grills, gates, frames, base plates and general fabrication.",
    specs: [
      { label: "Common sizes", value: "Width x thickness combinations - confirm with supplier" },
      { label: "Weight formula", value: "kg per metre = width(mm) x thickness(mm) / 127 approx (MS)" },
    ],
  },
  {
    slug: "round-bars", name: "Round Bars & Wire Rods", short: "MS/EN8 rounds and binding wire rods.",
    description: "Round bars for shafts, fasteners and fabrication; wire rods including binding wire for construction sites.",
    specs: [
      { label: "Common types", value: "MS rounds, EN8 rounds, binding wire" },
      { label: "Check before buying", value: "Diameter, grade, straightness" },
    ],
  },
];