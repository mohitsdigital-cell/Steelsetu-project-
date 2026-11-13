import type { CalcSpec } from "./steel-calcs";
import { calcSpecs } from "./steel-calcs";
import { bizSpecs } from "./steel-calcs-biz";

const fmt = (n: number, d = 2) =>
  n.toLocaleString("en-IN", { maximumFractionDigits: d });

export const extraSpecs: CalcSpec[] = [
  {
    slug: "structural-beam-weight",
    title: "Structural Beam Weight Calculator (Approximate)",
    excerpt: "Approximate I/H beam weight per metre from depth, flange and web dimensions.",
    formulaText: "Area (mm2) = 2 x flange width x flange thickness + (depth - 2 x flange thickness) x web thickness. kg/m = Area x 0.00785.",
    fields: [
      { key: "h", label: "Overall depth", unit: "mm", def: 200, min: 10 },
      { key: "bf", label: "Flange width", unit: "mm", def: 100, min: 5 },
      { key: "tf", label: "Flange thickness", unit: "mm", def: 7.5, min: 1 },
      { key: "tw", label: "Web thickness", unit: "mm", def: 5.4, min: 1 },
      { key: "len", label: "Length", unit: "m", def: 6, min: 0.1 },
      { key: "pcs", label: "Pieces", unit: "nos", def: 1, min: 1 },
    ],
    compute: (v) => {
      const area = 2 * v.bf * v.tf + (v.h - 2 * v.tf) * v.tw;
      const kgPerM = area * 0.00785;
      const total = kgPerM * v.len * v.pcs;
      return [
        ["Cross-section area", fmt(area, 0) + " mm2"],
        ["Approx. weight per metre", fmt(kgPerM, 3) + " kg/m"],
        ["Total (" + v.pcs + " pcs x " + v.len + " m)", fmt(total, 1) + " kg"],
        ["Total tonnes", fmt(total / 1000, 4) + " t"],
      ];
    },
    notes: "Rectangular-profile approximation - it excludes root fillets and tapers, so real rolled sections (ISMB/ISHB) usually weigh a little more. For billing and design, use the published IS section table (SP:6) value; this tool is only for rough planning. Not certified structural design.",
  },
  {
    slug: "cutting-nesting-estimator",
    title: "Cutting & Nesting Estimator (Sheets)",
    excerpt: "Estimate how many flat pieces fit on a sheet, both laying orientations, and sheets needed.",
    formulaText: "Try both orientations: pieces = floor(sheet length / part length) x floor(sheet width / part width), with a cutting gap added to each part. Take the better orientation, then sheets = ceil(demand / pieces per sheet).",
    fields: [
      { key: "sheetL", label: "Sheet length", unit: "m", def: 2.44, min: 0.1 },
      { key: "sheetW", label: "Sheet width", unit: "m", def: 1.22, min: 0.1 },
      { key: "partL", label: "Part length", unit: "m", def: 0.6, min: 0.01 },
      { key: "partW", label: "Part width", unit: "m", def: 0.4, min: 0.01 },
      { key: "gap", label: "Cutting gap / kerf", unit: "mm", def: 5, min: 0 },
      { key: "demand", label: "Parts required", unit: "nos", def: 100, min: 1 },
    ],
    compute: (v) => {
      const g = v.gap / 1000;
      const pl = v.partL + g;
      const pw = v.partW + g;
      const n1 = Math.floor(v.sheetL / pl) * Math.floor(v.sheetW / pw);
      const n2 = Math.floor(v.sheetL / pw) * Math.floor(v.sheetW / pl);
      const best = Math.max(n1, n2);
      const sheets = best > 0 ? Math.ceil(v.demand / best) : 0;
      const util = sheets > 0 ? (v.demand * v.partL * v.partW) / (sheets * v.sheetL * v.sheetW) * 100 : 0;
      return [
        ["Orientation A (part along length)", fmt(n1, 0) + " pcs/sheet"],
        ["Orientation B (part rotated 90)", fmt(n2, 0) + " pcs/sheet"],
        ["Best orientation", fmt(best, 0) + " pcs/sheet"],
        ["Sheets required", fmt(sheets, 0) + " sheets"],
        ["Sheet utilisation", fmt(util, 1) + " %"],
      ];
    },
    notes: "Simple guillotine-style estimate for rectangular parts - no mixed nesting, no offcuts reuse, no profiling. Real CNC/laser nesting software will do better. Treat as a rough planning number only.",
  },
  {
    slug: "polycarbonate-coverage",
    title: "Polycarbonate Sheet Coverage Calculator",
    excerpt: "Sheets needed for a roof or canopy from area, cover width, overlap and slope.",
    formulaText: "Area = L x W x (1 + slope%). Effective cover = sheet width - overlap. Rows = ceil(W / effective cover). Sheets per row = ceil(L / sheet length). Total x (1 + waste%).",
    fields: [
      { key: "roofL", label: "Roof length", unit: "m", def: 6, min: 0.1 },
      { key: "roofW", label: "Roof width", unit: "m", def: 3, min: 0.1 },
      { key: "sheetLen", label: "Sheet length", unit: "m", def: 6, min: 0.1 },
      { key: "coverW", label: "Sheet overall width", unit: "m", def: 2.1, min: 0.1 },
      { key: "overlap", label: "Side-lap overlap", unit: "m", def: 0.1, min: 0 },
      { key: "slope", label: "Slope allowance", unit: "%", def: 10, min: 0 },
      { key: "waste", label: "Cutting wastage", unit: "%", def: 5, min: 0 },
    ],
    compute: (v) => {
      const area = v.roofL * v.roofW * (1 + v.slope / 100);
      const effCover = v.coverW - v.overlap;
      if (effCover <= 0) {
        return [["Error", "Overlap must be smaller than sheet width"]];
      }
      const rows = Math.ceil(v.roofW / effCover);
      const perRow = Math.ceil(v.roofL / v.sheetLen);
      const total = rows * perRow;
      const withWaste = Math.ceil(total * (1 + v.waste / 100));
      return [
        ["Coverage area (with slope)", fmt(area, 1) + " m2"],
        ["Effective cover width", fmt(effCover, 2) + " m"],
        ["Rows across width", fmt(rows, 0) + " rows"],
        ["Sheets per row", fmt(perRow, 0) + " nos"],
        ["Total sheets", fmt(total, 0) + " nos"],
        ["With wastage allowance", fmt(withWaste, 0) + " nos"],
      ];
    },
    notes: "Polycarbonate profiles vary by brand (solid, multiwall, corrugated) - effective cover width differs per profile, so use the manufacturer datasheet value. UV-protected face must face up; follow the maker's fixing and thermal expansion rules.",
  },
  {
    slug: "frp-coverage",
    title: "FRP Sheet Coverage Calculator",
    excerpt: "FRP/profiled roofing sheets needed for a roof area with overlap and slope.",
    formulaText: "Area = L x W x (1 + slope%). Effective cover = sheet width - overlap. Rows = ceil(W / effective cover). Sheets per row = ceil(L / sheet length). Total x (1 + waste%).",
    fields: [
      { key: "roofL", label: "Roof length", unit: "m", def: 10, min: 0.1 },
      { key: "roofW", label: "Roof width", unit: "m", def: 6, min: 0.1 },
      { key: "sheetLen", label: "Sheet length", unit: "m", def: 6, min: 0.1 },
      { key: "coverW", label: "Sheet overall width", unit: "m", def: 1.1, min: 0.1 },
      { key: "overlap", label: "Side-lap overlap", unit: "m", def: 0.15, min: 0 },
      { key: "slope", label: "Slope allowance", unit: "%", def: 10, min: 0 },
      { key: "waste", label: "Cutting wastage", unit: "%", def: 5, min: 0 },
    ],
    compute: (v) => {
      const area = v.roofL * v.roofW * (1 + v.slope / 100);
      const effCover = v.coverW - v.overlap;
      if (effCover <= 0) {
        return [["Error", "Overlap must be smaller than sheet width"]];
      }
      const rows = Math.ceil(v.roofW / effCover);
      const perRow = Math.ceil(v.roofL / v.sheetLen);
      const total = rows * perRow;
      const withWaste = Math.ceil(total * (1 + v.waste / 100));
      return [
        ["Coverage area (with slope)", fmt(area, 1) + " m2"],
        ["Effective cover width", fmt(effCover, 2) + " m"],
        ["Rows across width", fmt(rows, 0) + " rows"],
        ["Sheets per row", fmt(perRow, 0) + " nos"],
        ["Total sheets", fmt(total, 0) + " nos"],
        ["With wastage allowance", fmt(withWaste, 0) + " nos"],
      ];
    },
    notes: "FRP profiles (corrugated, ribbed) have profile-specific cover widths - confirm from the manufacturer datasheet. Overlap direction must follow wind/rain exposure; end laps need sealant as per maker instructions.",
  },
  {
    slug: "puf-panel-area",
    title: "PUF Panel Area Calculator",
    excerpt: "Wall and roof coverage area of a PUF/PIR sandwich panel building, with panel count.",
    formulaText: "Wall area = 2 x (L + W) x height - openings. Roof area = L x W x (1 + slope%). Panels = ceil(total area / (panel length x effective cover width)).",
    fields: [
      { key: "bldgL", label: "Building length", unit: "m", def: 10, min: 0.1 },
      { key: "bldgW", label: "Building width", unit: "m", def: 6, min: 0.1 },
      { key: "wallH", label: "Wall height", unit: "m", def: 4, min: 0.5 },
      { key: "panelCover", label: "Panel effective cover width", unit: "m", def: 1.0, min: 0.1 },
      { key: "panelLen", label: "Panel length used", unit: "m", def: 4, min: 0.5 },
      { key: "openings", label: "Door/window openings to deduct", unit: "m2", def: 0, min: 0 },
      { key: "roofSlope", label: "Roof slope allowance", unit: "%", def: 10, min: 0 },
    ],
    compute: (v) => {
      const wallArea = 2 * (v.bldgL + v.bldgW) * v.wallH - v.openings;
      const roofArea = v.bldgL * v.bldgW * (1 + v.roofSlope / 100);
      const totalArea = wallArea + roofArea;
      const panelArea = v.panelLen * v.panelCover;
      const panels = Math.ceil(totalArea / panelArea);
      return [
        ["Wall area (net of openings)", fmt(wallArea, 1) + " m2"],
        ["Roof area (with slope)", fmt(roofArea, 1) + " m2"],
        ["Total panel coverage", fmt(totalArea, 1) + " m2"],
        ["Panels required", fmt(panels, 0) + " nos"],
      ];
    },
    notes: "Planning estimate only. Real panel layouts are cut-to-length per elevation, include gable/end cuts, flashings, corner trims and joint details - the fabricator's shop drawing governs. Panel cover widths differ by maker (typically 1.0-1.15 m).",
  },
  {
    slug: "project-material-estimator",
    title: "Basic Project Material Estimator",
    excerpt: "Rough concrete volume and reinforcement steel for a slab area, with steel intensity.",
    formulaText: "Concrete (m3) = area x thickness. Steel (kg) = concrete x steel ratio (kg/m3). Ratio default 80 kg/m3 is a common RCC slab planning figure.",
    fields: [
      { key: "area", label: "Built-up slab area", unit: "m2", def: 100, min: 1 },
      { key: "thk", label: "Slab thickness", unit: "mm", def: 125, min: 25 },
      { key: "ratio", label: "Steel ratio", unit: "kg/m3", def: 80, min: 10 },
      { key: "rateT", label: "TMT rate per tonne (optional)", unit: "Rs", def: 0, min: 0 },
    ],
    compute: (v) => {
      const concrete = v.area * (v.thk / 1000);
      const steelKg = concrete * v.ratio;
      const rows: [string, string][] = [
        ["Concrete volume", fmt(concrete, 1) + " m3"],
        ["Reinforcement steel", fmt(steelKg, 0) + " kg"],
        ["Steel tonnes", fmt(steelKg / 1000, 3) + " t"],
        ["Steel intensity", fmt(steelKg / v.area, 1) + " kg/m2"],
      ];
      if (v.rateT > 0) {
        rows.push(["Estimated steel cost", "Rs " + fmt((steelKg / 1000) * v.rateT, 0)]);
      }
      return rows;
    },
    notes: "Very rough planning estimate for a simple RCC slab only - it excludes beams, columns, footings, walls, wastage and bar-bending schedules. The steel ratio depends on span, loading and design code; your structural designer's bar schedule is the only valid quantity source. Not certified structural design in any form.",
  },
];

export const allCalcSpecs: CalcSpec[] = [...calcSpecs, ...extraSpecs, ...bizSpecs];
