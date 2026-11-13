export type CalcField = {
  key: string;
  label: string;
  unit: string;
  def: number;
  min: number;
};

export type CalcSpec = {
  slug: string;
  title: string;
  excerpt: string;
  formulaText: string;
  fields: CalcField[];
  compute: (v: Record<string, number>) => [string, string][];
  notes?: string;
};

const fmt = (n: number, d = 2) =>
  n.toLocaleString("en-IN", { maximumFractionDigits: d });

export const calcSpecs: CalcSpec[] = [
  {
    slug: "round-bar-weight",
    title: "Round Bar Weight Calculator",
    excerpt: "Weight of bright/forge round bars from diameter, length and pieces.",
    formulaText: "kg/m = d^2 / 162 (d = diameter in mm). Derived from density 7850 kg/m3.",
    fields: [
      { key: "dia", label: "Diameter", unit: "mm", def: 25, min: 1 },
      { key: "len", label: "Bar length", unit: "m", def: 6, min: 0.1 },
      { key: "pcs", label: "Pieces", unit: "nos", def: 1, min: 1 },
    ],
    compute: (v) => {
      const kgPerM = (v.dia * v.dia) / 162;
      const perBar = kgPerM * v.len;
      const total = perBar * v.pcs;
      return [
        ["Weight per metre", fmt(kgPerM, 3) + " kg/m"],
        ["Per bar (" + v.len + " m)", fmt(perBar) + " kg"],
        ["Total (" + v.pcs + " pcs)", fmt(total, 1) + " kg"],
        ["Total tonnes", fmt(total / 1000, 4) + " t"],
      ];
    },
  },
  {
    slug: "pipe-tube-weight",
    title: "Pipe & Tube Weight Calculator",
    excerpt: "Weight of round pipes and tubes from OD, wall thickness and length.",
    formulaText: "kg/m = (OD - t) x t x 0.02466 (OD, t in mm). Hollow section, theoretical.",
    fields: [
      { key: "od", label: "Outer diameter", unit: "mm", def: 48, min: 1 },
      { key: "t", label: "Wall thickness", unit: "mm", def: 3, min: 0.1 },
      { key: "len", label: "Length", unit: "m", def: 6, min: 0.1 },
      { key: "pcs", label: "Pieces", unit: "nos", def: 1, min: 1 },
    ],
    compute: (v) => {
      const kgPerM = (v.od - v.t) * v.t * 0.02466;
      const perPc = kgPerM * v.len;
      const total = perPc * v.pcs;
      return [
        ["Weight per metre", fmt(kgPerM, 3) + " kg/m"],
        ["Per piece (" + v.len + " m)", fmt(perPc) + " kg"],
        ["Total (" + v.pcs + " pcs)", fmt(total, 1) + " kg"],
        ["Total tonnes", fmt(total / 1000, 4) + " t"],
      ];
    },
  },
  {
    slug: "flat-angle-channel-weight",
    title: "Flat, Angle & Channel Weight Calculator",
    excerpt: "Section weight per metre for flats, angles (ISA) and channels (ISMC approx).",
    formulaText: "Flat: kg/m = w x t x 0.00785. Angle: kg/m = (A + B - t) x t x 0.00785. Channel (approx): kg/m = (h x t + 2 x (b - t) x t) x 0.00785.",
    fields: [
      { key: "section", label: "Section type (1=Flat, 2=Angle, 3=Channel)", unit: "1-3", def: 1, min: 1 },
      { key: "w", label: "Flat width / Angle leg A / Channel flange b", unit: "mm", def: 50, min: 1 },
      { key: "h", label: "Angle leg B / Channel web h (0 for flat)", unit: "mm", def: 40, min: 0 },
      { key: "t", label: "Thickness", unit: "mm", def: 6, min: 0.1 },
      { key: "len", label: "Length", unit: "m", def: 6, min: 0.1 },
      { key: "pcs", label: "Pieces", unit: "nos", def: 1, min: 1 },
    ],
    compute: (v) => {
      let kgPerM = 0;
      let kind = "";
      if (v.section >= 2.5) {
        kgPerM = (v.h * v.t + 2 * (v.w - v.t) * v.t) * 0.00785;
        kind = "Channel (approx)";
      } else if (v.section >= 1.5) {
        kgPerM = (v.w + v.h - v.t) * v.t * 0.00785;
        kind = "Angle";
      } else {
        kgPerM = v.w * v.t * 0.00785;
        kind = "Flat";
      }
      const total = kgPerM * v.len * v.pcs;
      return [
        ["Section", kind],
        ["Weight per metre", fmt(kgPerM, 3) + " kg/m"],
        ["Total (" + v.pcs + " pcs x " + v.len + " m)", fmt(total, 1) + " kg"],
        ["Total tonnes", fmt(total / 1000, 4) + " t"],
      ];
    },
    notes: "Channel weight is a close approximation from flat dimensions - published ISMC tables should be used for billing. Angles use the standard (A+B-t) approximation.",
  },
  {
    slug: "bundle-weight-quantity",
    title: "Bundle Weight & Quantity Calculator",
    excerpt: "TMT bundle weight from diameter, bar length and pieces per bundle.",
    formulaText: "kg/bundle = (d^2 / 162) x bar length x pieces per bundle.",
    fields: [
      { key: "dia", label: "Diameter", unit: "mm", def: 12, min: 1 },
      { key: "len", label: "Bar length", unit: "m", def: 12, min: 0.1 },
      { key: "bars", label: "Bars per bundle", unit: "nos", def: 20, min: 1 },
    ],
    compute: (v) => {
      const perBar = (v.dia * v.dia) / 162 * v.len;
      const bundle = perBar * v.bars;
      return [
        ["Per bar", fmt(perBar) + " kg"],
        ["Per bundle (" + v.bars + " bars)", fmt(bundle, 1) + " kg"],
        ["Tonnes per bundle", fmt(bundle / 1000, 4) + " t"],
        ["Bundles per tonne", fmt(1000 / bundle, 2) + " bundles"],
      ];
    },
  },
  {
    slug: "coil-length",
    title: "Coil Length Calculator",
    excerpt: "Strip length inside a coil from coil weight, thickness and width.",
    formulaText: "Length (m) = weight (kg) / [thickness (mm) x width (m) x 7.85].",
    fields: [
      { key: "weight", label: "Coil weight", unit: "kg", def: 4000, min: 1 },
      { key: "t", label: "Thickness", unit: "mm", def: 0.5, min: 0.01 },
      { key: "w", label: "Width", unit: "m", def: 1.25, min: 0.05 },
    ],
    compute: (v) => {
      const lengthM = v.weight / (v.t * v.w * 7.85);
      return [
        ["Strip length", fmt(lengthM, 1) + " m"],
        ["Strip length", fmt(lengthM / 1000, 3) + " km"],
      ];
    },
    notes: "Theoretical, based on 7.85 g/cc. Coating and tension vary actual length.",
  },
  {
    slug: "coil-od-id-estimator",
    title: "Coil OD / ID Estimator",
    excerpt: "Estimate coil outer diameter from weight, thickness, width and core ID.",
    formulaText: "Step 1: L = weight / (t x w x 7.85). Step 2: OD = sqrt(ID^2 + 4 x t x L) with consistent mm units (tightly wound approximation).",
    fields: [
      { key: "weight", label: "Coil weight", unit: "kg", def: 4000, min: 1 },
      { key: "t", label: "Thickness", unit: "mm", def: 0.5, min: 0.01 },
      { key: "w", label: "Width", unit: "m", def: 1.25, min: 0.05 },
      { key: "id", label: "Core / inner diameter", unit: "mm", def: 508, min: 10 },
    ],
    compute: (v) => {
      const lengthM = v.weight / (v.t * v.w * 7.85);
      const od = Math.sqrt(v.id * v.id + (4 * v.t * lengthM * 1000) / Math.PI);
      return [
        ["Strip length", fmt(lengthM, 1) + " m"],
        ["Estimated OD", fmt(od, 0) + " mm"],
        ["Wall build (OD - ID)/2", fmt((od - v.id) / 2, 0) + " mm"],
      ];
    },
    notes: "Tightly-wound approximation; real coils have air gaps, so measured OD is usually a bit larger.",
  },
  {
    slug: "scrap-melting-loss",
    title: "Scrap & Melting Loss Calculator",
    excerpt: "Melting yield from scrap weight and typical melt loss percentage.",
    formulaText: "Output (kg) = scrap (kg) x (1 - loss%). Yield% = 100 - loss%.",
    fields: [
      { key: "scrap", label: "Scrap charged", unit: "kg", def: 1000, min: 1 },
      { key: "loss", label: "Melting / burn loss", unit: "%", def: 5, min: 0 },
    ],
    compute: (v) => {
      const lossKg = v.scrap * (v.loss / 100);
      return [
        ["Loss", fmt(lossKg, 1) + " kg"],
        ["Liquid / usable output", fmt(v.scrap - lossKg, 1) + " kg"],
        ["Yield", fmt(100 - v.loss, 1) + " %"],
      ];
    },
    notes: "Actual melt loss varies with scrap grade, contamination and furnace practice - this is a planning estimate only.",
  },
  {
    slug: "billet-rolling-margin",
    title: "Billet-to-Rolling Margin Calculator",
    excerpt: "Finished output tonnage from billet input with rolling loss percentage.",
    formulaText: "Finished (t) = billet (t) x (1 - rolling loss%).",
    fields: [
      { key: "billet", label: "Billet input", unit: "tonnes", def: 10, min: 0.01 },
      { key: "loss", label: "Rolling / crop loss", unit: "%", def: 4, min: 0 },
    ],
    compute: (v) => {
      const lossT = v.billet * (v.loss / 100);
      return [
        ["Loss", fmt(lossT, 3) + " t"],
        ["Finished rolled output", fmt(v.billet - lossT, 3) + " t"],
        ["Yield", fmt(100 - v.loss, 1) + " %"],
      ];
    },
    notes: "Mill-specific - actual yield depends on section, pass design and crop-end practice.",
  },
  {
    slug: "gst-igst",
    title: "GST / IGST Calculator",
    excerpt: "GST split (CGST + SGST) or IGST, and invoice total from base value.",
    formulaText: "GST amount = base x rate%. Intra-state: CGST = SGST = rate/2 each. Inter-state: IGST = rate%.",
    fields: [
      { key: "base", label: "Taxable value", unit: "Rs", def: 100000, min: 1 },
      { key: "rate", label: "GST rate", unit: "%", def: 18, min: 0 },
    ],
    compute: (v) => {
      const gst = v.base * (v.rate / 100);
      return [
        ["GST amount", "Rs " + fmt(gst)],
        ["CGST (" + v.rate / 2 + "%)", "Rs " + fmt(gst / 2)],
        ["SGST (" + v.rate / 2 + "%)", "Rs " + fmt(gst / 2)],
        ["IGST (inter-state, " + v.rate + "%)", "Rs " + fmt(gst)],
        ["Invoice total", "Rs " + fmt(v.base + gst)],
      ];
    },
    notes: "CGST/SGST apply to intra-state supplies, IGST to inter-state - the total tax is the same. Not tax advice; confirm rates and HSN with your CA.",
  },
  {
    slug: "credit-interest",
    title: "Credit Interest Calculator",
    excerpt: "Interest cost on trade credit / working capital for principal, rate and days.",
    formulaText: "Interest = P x rate% x (days / 365).",
    fields: [
      { key: "principal", label: "Principal / credit taken", unit: "Rs", def: 1000000, min: 1 },
      { key: "rate", label: "Annual interest rate", unit: "%", def: 12, min: 0 },
      { key: "days", label: "Credit period", unit: "days", def: 30, min: 1 },
    ],
    compute: (v) => {
      const interest = v.principal * (v.rate / 100) * (v.days / 365);
      return [
        ["Interest cost", "Rs " + fmt(interest)],
        ["Total payable", "Rs " + fmt(v.principal + interest)],
        ["Interest per day", "Rs " + fmt(interest / v.days)],
      ];
    },
    notes: "Simple interest, 365-day year. Actual terms come from your lender or supplier agreement.",
  },
  {
    slug: "landed-cost-freight",
    title: "Landed Cost & Freight Calculator",
    excerpt: "Delivered cost of a consignment: material + freight + GST, per tonne and total.",
    formulaText: "Landed = (rate/tonne + freight/tonne) x qty, then + GST%.",
    fields: [
      { key: "rate", label: "Material rate", unit: "Rs/tonne", def: 51000, min: 1 },
      { key: "freight", label: "Freight", unit: "Rs/tonne", def: 1200, min: 0 },
      { key: "qty", label: "Quantity", unit: "tonnes", def: 10, min: 0.01 },
      { key: "gst", label: "GST rate", unit: "%", def: 18, min: 0 },
    ],
    compute: (v) => {
      const material = v.rate * v.qty;
      const freight = v.freight * v.qty;
      const pre = material + freight;
      const tax = pre * (v.gst / 100);
      return [
        ["Material cost", "Rs " + fmt(material)],
        ["Freight", "Rs " + fmt(freight)],
        ["Landed before GST", "Rs " + fmt(pre)],
        ["Landed per tonne (pre-GST)", "Rs " + fmt(v.rate + v.freight)],
        ["GST (" + v.gst + "%)", "Rs " + fmt(tax)],
        ["Grand total", "Rs " + fmt(pre + tax)],
      ];
    },
    notes: "Excludes loading, unloading, insurance and any other charges - add them per your quotation.",
  },
  {
    slug: "roofing-screw-quantity",
    title: "Roofing Screw Quantity Estimator",
    excerpt: "Approximate roofing fastener count from roof area, slope and fixing density.",
    formulaText: "Area = L x W x (1 + slope%). Screws = area x screws per m2.",
    fields: [
      { key: "len", label: "Roof length", unit: "m", def: 10, min: 0.1 },
      { key: "wid", label: "Roof width", unit: "m", def: 6, min: 0.1 },
      { key: "slope", label: "Slope allowance", unit: "%", def: 10, min: 0 },
      { key: "density", label: "Screws per m2", unit: "nos/m2", def: 4, min: 1 },
    ],
    compute: (v) => {
      const area = v.len * v.wid * (1 + v.slope / 100);
      const screws = Math.ceil(area * v.density);
      return [
        ["Roof area (with slope)", fmt(area, 1) + " m2"],
        ["Screws required", fmt(screws, 0) + " nos"],
        ["Add wastage (~5%)", fmt(Math.ceil(screws * 1.05), 0) + " nos"],
      ];
    },
    notes: "Actual fixing count depends on purlin spacing, profile and wind zone - confirm with your fabricator.",
  },
  {
    slug: "ventilation-requirement",
    title: "Ventilation Requirement Estimator",
    excerpt: "Airflow needed for a shed or hall from room size and air changes per hour.",
    formulaText: "Volume = L x W x H. Airflow (m3/h) = Volume x ACH.",
    fields: [
      { key: "len", label: "Room length", unit: "m", def: 10, min: 0.1 },
      { key: "wid", label: "Room width", unit: "m", def: 6, min: 0.1 },
      { key: "hgt", label: "Ceiling height", unit: "m", def: 4, min: 0.5 },
      { key: "ach", label: "Air changes per hour", unit: "ACH", def: 6, min: 0.5 },
    ],
    compute: (v) => {
      const vol = v.len * v.wid * v.hgt;
      const m3h = vol * v.ach;
      return [
        ["Room volume", fmt(vol, 1) + " m3"],
        ["Airflow required", fmt(m3h, 0) + " m3/h"],
        ["Airflow required", fmt(m3h / 3.6, 0) + " l/s"],
        ["Airflow required", fmt(m3h * 0.588, 0) + " CFM (approx)"],
      ];
    },
    notes: "Typical guidance: warehouses 2-4 ACH, workshops 6-10 ACH, hot processes higher. This is planning guidance, not a certified HVAC design.",
  },
];

export const calcDisclaimer =
  "Estimates for planning only - not billing documents and not certified structural or engineering design. All formulas and assumptions should be reviewed by a competent technical professional before publication, per the Steelsetu calculator rules.";
