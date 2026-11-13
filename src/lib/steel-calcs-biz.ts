import type { CalcSpec } from "./steel-calcs";

const fmt = (n: number, d = 2) =>
  n.toLocaleString("en-IN", { maximumFractionDigits: d });
const rs = (n: number) => "Rs " + fmt(n, 0);

export const bizSpecs: CalcSpec[] = [
  {
    slug: "gauge-to-mm",
    title: "Sheet Gauge to MM Converter",
    excerpt: "Approximate mm thickness for common GI/GC and PPGI/PPGL sheet gauges.",
    formulaText: "Lookup of common Indian market gauge conventions (22-30 gauge). Not a physical standard.",
    fields: [
      { key: "gauge", label: "Gauge number", unit: "gauge", def: 26, min: 14 },
    ],
    compute: (v) => {
      const gi: Record<number, number> = { 22: 0.75, 24: 0.6, 26: 0.5, 28: 0.4, 30: 0.32 };
      const ppgi: Record<number, number> = { 22: 0.7, 24: 0.55, 26: 0.45, 28: 0.35, 30: 0.3 };
      const g = Math.round(v.gauge);
      if (gi[g] === undefined) {
        return [["Error", "Enter a common gauge: 22, 24, 26, 28 or 30"]];
      }
      return [
        ["Gauge", String(g) + " gauge"],
        ["GI / GC approx thickness", gi[g].toFixed(2) + " mm"],
        ["PPGI / PPGL approx thickness", ppgi[g].toFixed(2) + " mm"],
      ];
    },
    notes: "Gauge conventions differ between products, mills and suppliers - this is a market reference only, not a standard. Always verify actual thickness with a calibrated micrometer before billing.",
  },
  {
    slug: "udhaar-overdue",
    title: "Udhaar / Overdue Interest Calculator",
    excerpt: "Estimated interest on overdue trade credit (udhaar) at a monthly rate.",
    formulaText: "Interest = amount x monthly rate% x (overdue days / 30). Simple interest, 30-day month.",
    fields: [
      { key: "amount", label: "Invoice / udhaar amount", unit: "Rs", def: 100000, min: 1 },
      { key: "overdue", label: "Days overdue (after credit period)", unit: "days", def: 15, min: 0 },
      { key: "rate", label: "Monthly interest rate", unit: "%", def: 1.5, min: 0 },
    ],
    compute: (v) => {
      const interest = v.amount * (v.rate / 100) * (v.overdue / 30);
      return [
        ["Estimated interest", rs(interest)],
        ["Total payable", rs(v.amount + interest)],
        ["Interest per day", rs(interest / Math.max(v.overdue, 1))],
      ];
    },
    notes: "Estimate only - real recovery follows your written commercial terms and, where needed, professional/legal advice. Interest charged must comply with applicable law and your agreement with the party.",
  },
  {
    slug: "profit-margin",
    title: "Steel Profit Margin Calculator",
    excerpt: "Selling price needed for a target margin, with freight, loading and finance costs.",
    formulaText: "Total cost = qty x purchase rate + freight + other + finance. Selling price = total cost x (1 + margin%).",
    fields: [
      { key: "qty", label: "Quantity", unit: "kg", def: 10000, min: 1 },
      { key: "rate", label: "Purchase rate per kg", unit: "Rs", def: 58, min: 1 },
      { key: "freight", label: "Freight total", unit: "Rs", def: 15000, min: 0 },
      { key: "other", label: "Loading / other cost", unit: "Rs", def: 5000, min: 0 },
      { key: "finance", label: "Finance cost", unit: "Rs", def: 3000, min: 0 },
      { key: "margin", label: "Desired margin", unit: "%", def: 3, min: 0 },
    ],
    compute: (v) => {
      const purchase = v.qty * v.rate;
      const total = purchase + v.freight + v.other + v.finance;
      const profit = total * (v.margin / 100);
      const sell = total + profit;
      return [
        ["Total business cost", rs(total)],
        ["Target profit", rs(profit)],
        ["Required selling price", rs(sell)],
        ["Selling rate per kg", rs(sell / v.qty)],
      ];
    },
    notes: "Margin is on cost here (cost-plus). GST collected from the customer is not business profit. Confirm rates and margins against your actual quotation.",
  },
  {
    slug: "break-even-quote",
    title: "Break-Even & Minimum Quote Calculator",
    excerpt: "Minimum quotation price with target profit, GST, and the impact of customer negotiation.",
    formulaText: "Break-even = qty x rate + extra costs. Minimum quote = break-even x (1 + profit%) x (1 + GST%). Negotiation scenario subtracts a per-kg concession.",
    fields: [
      { key: "qty", label: "Quantity", unit: "kg", def: 10000, min: 1 },
      { key: "rate", label: "Purchase rate per kg", unit: "Rs", def: 58, min: 1 },
      { key: "extra", label: "Additional costs total", unit: "Rs", def: 20000, min: 0 },
      { key: "profit", label: "Minimum profit", unit: "%", def: 2, min: 0 },
      { key: "gst", label: "GST rate", unit: "%", def: 18, min: 0 },
      { key: "nego", label: "Expected negotiation cut", unit: "Rs/kg", def: 1, min: 0 },
    ],
    compute: (v) => {
      const breakEven = v.qty * v.rate + v.extra;
      const minBefore = breakEven * (1 + v.profit / 100);
      const gst = minBefore * (v.gst / 100);
      const quote = minBefore + gst;
      const negoRevenue = (minBefore / v.qty - v.nego) * v.qty;
      const negoProfit = negoRevenue - breakEven;
      const rows: [string, string][] = [
        ["Break-even cost", rs(breakEven)],
        ["Break-even rate per kg", rs(breakEven / v.qty)],
        ["Minimum price before GST", rs(minBefore)],
        ["Recommended customer quote", rs(quote)],
        ["After negotiation cut of Rs " + fmt(v.nego) + "/kg", negoProfit >= 0 ? "Profit Rs " + fmt(negoProfit) : "Loss Rs " + fmt(Math.abs(negoProfit))],
      ];
      return rows;
    },
    notes: "Internal planning tool - shows the floor below which a deal stops earning. GST is applied on the pre-tax minimum; your invoice terms govern the actual figures.",
  },
  {
    slug: "truck-load-planner",
    title: "Truck Load & Dispatch Planner",
    excerpt: "Vehicles needed, capacity utilisation and freight per kg for a consignment.",
    formulaText: "Vehicles = ceil(quantity / capacity). Freight per kg = freight total / (quantity x 1000).",
    fields: [
      { key: "capacity", label: "Vehicle capacity", unit: "MT", def: 16, min: 0.1 },
      { key: "qty", label: "Quantity to dispatch", unit: "MT", def: 14, min: 0.1 },
      { key: "freight", label: "Freight total", unit: "Rs", def: 30000, min: 0 },
    ],
    compute: (v) => {
      const vehicles = Math.ceil(v.qty / v.capacity);
      const used = (v.qty / v.capacity) * 100;
      const rows: [string, string][] = [
        ["Vehicles required", fmt(vehicles, 0) + " nos"],
        ["Capacity used (first vehicle)", fmt(used, 1) + " %"],
        ["Remaining capacity", fmt(Math.max(0, v.capacity - v.qty % v.capacity || (v.qty <= v.capacity ? v.capacity - v.qty : 0)), 2) + " MT"],
        ["Freight per kg", rs(v.freight / (v.qty * 1000))],
      ];
      if (v.qty > v.capacity) rows.push(["Warning", "Quantity exceeds one vehicle - plan multiple trips"]);
      return rows;
    },
    notes: "Estimate only. Confirm vehicle capacity, actual weighment and legal loading limits (axle load rules) with the transporter before dispatch.",
  },
  {
    slug: "inventory-reorder",
    title: "Inventory Reorder & Valuation Calculator",
    excerpt: "Reorder level, suggested purchase quantity and stock cover for a product.",
    formulaText: "Reorder level = daily sales x (lead time + safety days). Suggested order = max(MOQ, reorder level - stock).",
    fields: [
      { key: "stock", label: "Current stock", unit: "units", def: 500, min: 0 },
      { key: "daily", label: "Average daily sales", unit: "units/day", def: 15, min: 0 },
      { key: "lead", label: "Supplier lead time", unit: "days", def: 10, min: 0 },
      { key: "safety", label: "Safety stock", unit: "days", def: 7, min: 0 },
      { key: "price", label: "Purchase price per unit", unit: "Rs", def: 1200, min: 0 },
      { key: "moq", label: "Minimum order quantity", unit: "units", def: 100, min: 0 },
    ],
    compute: (v) => {
      const reorder = v.daily * (v.lead + v.safety);
      const need = Math.max(0, Math.ceil(reorder - v.stock));
      const order = Math.max(v.moq, need);
      const cover = v.daily > 0 ? v.stock / v.daily : Infinity;
      const status = v.stock === 0 ? "Out of stock" : v.stock <= reorder ? "Reorder soon" : "Healthy";
      return [
        ["Reorder level", fmt(reorder, 0) + " units"],
        ["Suggested purchase", fmt(order, 0) + " units"],
        ["Stock value", rs(v.stock * v.price)],
        ["Stock cover remaining", cover === Infinity ? "No sales data" : fmt(cover, 1) + " days"],
        ["Status", status],
      ];
    },
    notes: "Planning estimate based on average sales - festivals, price swings and supply gaps break the average. Review reorder levels regularly against actual movement.",
  },
  {
    slug: "gst-inclusive",
    title: "GST Inclusive Amount Calculator",
    excerpt: "Back-calculate taxable value and GST from a GST-inclusive (all-inclusive) amount.",
    formulaText: "Taxable = inclusive / (1 + rate%). GST = inclusive - taxable. Intra-state splits into CGST + SGST.",
    fields: [
      { key: "amount", label: "Inclusive (total) amount", unit: "Rs", def: 118000, min: 1 },
      { key: "rate", label: "GST rate", unit: "%", def: 18, min: 0 },
    ],
    compute: (v) => {
      const taxable = v.amount / (1 + v.rate / 100);
      const gst = v.amount - taxable;
      return [
        ["Taxable value", rs(taxable)],
        ["Total GST", rs(gst)],
        ["CGST (intra-state)", rs(gst / 2)],
        ["SGST (intra-state)", rs(gst / 2)],
      ];
    },
    notes: "Reverse calculation for all-inclusive quotations. Not tax advice - confirm rates, HSN codes and treatment with your CA.",
  },
];
