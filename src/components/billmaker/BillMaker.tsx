"use client";
import { useMemo, useState } from "react";

type DocType = "invoice" | "pi" | "quotation" | "po";
type Item = { desc: string; hsn: string; qty: string; rate: string; per: string; other: string; gstRate: number };
type Party = { name: string; address: string; contact: string; state: string; code: string; gstin: string; pan: string };

const round2 = (n: number) => Math.round((Number(n) + Number.EPSILON) * 100) / 100;
const fmt2 = (n: number) => (Number(n) || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmt3 = (n: number) => (Number(n) || 0).toLocaleString("en-IN", { minimumFractionDigits: 3, maximumFractionDigits: 3 });

function numToWords(n: number): string {
  n = Math.floor(Math.abs(Number(n) || 0));
  if (n === 0) return "Zero";
  const ones = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
  const tens = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
  const two = (d: number) => (d < 20 ? ones[d] : tens[Math.floor(d / 10)] + (d % 10 ? " " + ones[d % 10] : ""));
  const three = (d: number) => {
    const h = Math.floor(d / 100), r = d % 100;
    let s = "";
    if (h) s += ones[h] + " Hundred" + (r ? " " : "");
    if (r) s += two(r);
    return s.trim();
  };
  const p: string[] = [];
  const cr = Math.floor(n / 10000000); n %= 10000000;
  const lk = Math.floor(n / 100000); n %= 100000;
  const th = Math.floor(n / 1000); n %= 1000;
  if (cr) p.push(three(cr) + " Crore");
  if (lk) p.push(two(lk) + " Lakh");
  if (th) p.push(two(th) + " Thousand");
  if (n) p.push(three(n));
  return p.join(" ");
}
function amountWords(a: number): string {
  const v = Math.abs(Number(a) || 0);
  const r = Math.floor(v);
  const p = Math.round((v - r) * 100);
  let w = numToWords(r) + " INR";
  if (p > 0) w += " and " + numToWords(p) + " paise";
  return w + " Only.";
}
function initials(name: string): string {
  const w = (name || "").trim().split(/\s+/);
  if (!w[0]) return "--";
  if (w.length === 1) return w[0].slice(0, 2).toUpperCase();
  return (w[0][0] + w[1][0]).toUpperCase();
}
const DOC_META: Record<DocType, { title: string; noLabel: string; dateLabel: string; partyLabel: string; gstRequired: boolean }> = {
  invoice: { title: "TAX INVOICE Cum CHALLAN", noLabel: "Invoice No.", dateLabel: "Invoice Date", partyLabel: "Details of Receiver | Billed To", gstRequired: true },
  pi: { title: "PROFORMA INVOICE", noLabel: "P.I. No.", dateLabel: "P.I. Date", partyLabel: "Details of Receiver | Billed To", gstRequired: true },
  quotation: { title: "QUOTATION", noLabel: "Quotation No.", dateLabel: "Quotation Date", partyLabel: "Quotation For (Buyer)", gstRequired: false },
  po: { title: "PURCHASE ORDER", noLabel: "P.O. No.", dateLabel: "P.O. Date", partyLabel: "Supplier / Vendor Details", gstRequired: false },
};
const DOC_TABS: { key: DocType; label: string }[] = [
  { key: "invoice", label: "Tax Invoice" },
  { key: "pi", label: "Proforma (P.I.)" },
  { key: "quotation", label: "Quotation" },
  { key: "po", label: "Purchase Order (P.O.)" },
];

const newItem = (): Item => ({ desc: "", hsn: "", qty: "", rate: "", per: "M.T", other: "", gstRate: 18 });
const newParty = (): Party => ({ name: "", address: "", contact: "", state: "West Bengal", code: "19", gstin: "", pan: "" });

function blank() {
  return {
    docType: "invoice" as DocType,
    taxType: "intra" as "intra" | "inter",
    sameAddress: true,
    previousDues: "",
    logo: "",
    company: { name: "", regOffice: "", shopAddress: "", contact: "", gstin: "", pan: "", tan: "", email: "" },
    doc: { no: "", date: "", orderNo: "", orderDate: "", salesName: "", salesMobile: "", salesEmail: "", salesPoint: "", ewayNo: "", ewayDate: "", vehicleNo: "", despatched: "", mode: "By Road", deliveryFrom: "", destination: "", irn: "", ackNo: "", ackDate: "" },
    billed: newParty(),
    shipped: newParty(),
    items: [newItem()],
    bank: { name1: "", ac1: "", ifsc1: "", name2: "", ac2: "", ifsc2: "" },
    terms: { main: "1. Interest @ 24% per annum will be charged extra if bill is not paid within due period.", declaration: "The amount indicated represents the price actually charged and there is no flow of additional consideration directly or indirectly from the buyers." },
  };
}

function demo() {
  const d = blank();
  d.company = { name: "Demo Traders Pvt Ltd", regOffice: "Shop Address, Market Road, Kolkata - 700007", shopAddress: "Godown Address, Kolkata - 700007", contact: "033-XXXXXXX", gstin: "19AAAAA0000A1Z5", pan: "AAAAA0000A", tan: "CALMXXXXXX", email: "demo@example.com" };
  d.doc.no = "DT/001/26-27";
  d.doc.date = "01-Dec-26";
  d.doc.orderNo = "PO/001/26-27";
  d.doc.vehicleNo = "WB00X0000";
  d.doc.despatched = "Self Vehicle";
  d.doc.destination = "Kolkata";
  d.billed = { name: "Demo Buyer Enterprises", address: "Buyer Address, Kolkata - 700001", contact: "98XXXXXXXX", state: "West Bengal", code: "19", gstin: "19BBBBB0000B1Z5", pan: "BBBBB0000B" };
  d.shipped = { ...d.billed };
  d.items = [{ desc: "Demo Product (0.50mm)", hsn: "72107000", qty: "1.000", rate: "60000", per: "M.T", other: "500", gstRate: 18 }];
  d.bank = { name1: "Demo Bank Ltd", ac1: "0000000000", ifsc1: "Branch & DEMO0000000", name2: "", ac2: "", ifsc2: "" };
  return d;
}
function Field(props: { label: string; value: string; on: (v: string) => void; textarea?: boolean; rows?: number; ph?: string; req?: boolean; num?: boolean; step?: string }) {
  const cls = "mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-steel-blue";
  return (
    <div>
      <label className="text-xs font-semibold text-steel-navy">{props.label}{props.req && <span className="text-red-500"> *</span>}</label>
      {props.textarea ? (
        <textarea className={cls} rows={props.rows ?? 2} value={props.value} onChange={(e) => props.on(e.target.value)} placeholder={props.ph} />
      ) : (
        <input className={cls} type={props.num ? "number" : "text"} step={props.step} value={props.value} onChange={(e) => props.on(e.target.value)} placeholder={props.ph} />
      )}
    </div>
  );
}

export default function BillMaker() {
  const [S, setS] = useState(blank);
  const [generated, setGenerated] = useState(false);
  const [errs, setErrs] = useState<string[]>([]);
  const [toastMsg, setToastMsg] = useState("");
  const meta = DOC_META[S.docType];
  const intra = S.taxType === "intra";

function toast(m: string) { setToastMsg(m); setTimeout(() => setToastMsg(""), 2200); }

function upd(path: string, val: string) {
    setS((prev) => {
      const n = JSON.parse(JSON.stringify(prev));
      const a = path.split(".");
      let o = n;
      for (let i = 0; i < a.length - 1; i++) o = o[a[i]];
      o[a[a.length - 1]] = val;
      if (n.sameAddress && path.startsWith("billed.")) {
        const b = ("shipped." + path.slice(7)).split(".");
        let oo = n;
        for (let i = 0; i < b.length - 1; i++) oo = oo[b[i]];
        oo[b[b.length - 1]] = val;
      }
      return n;
    });
  }

function updItem(i: number, f: keyof Item, val: string | number) {
    setS((prev) => { const n = JSON.parse(JSON.stringify(prev)); n.items[i][f] = val; return n; });
  }

function onLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 500 * 1024) { toast("Logo 500 KB se chhoti rakhiye"); return; }
    const r = new FileReader();
    r.onload = () => setS((p) => ({ ...p, logo: String(r.result) }));
    r.readAsDataURL(file);
  }
  const T = useMemo(() => {
    let sq = 0, st = 0, so = 0, sta = 0, sc = 0, ss = 0, si = 0;
    const rows = S.items.map((it) => {
      const q = parseFloat(it.qty) || 0, r = parseFloat(it.rate) || 0, o = parseFloat(it.other) || 0, g = Number(it.gstRate) || 0;
      const total = round2(q * r), other = round2(o), taxable = round2(total + other);
      let ca = 0, sa = 0, ia = 0;
      if (intra) { ca = round2(taxable * (g / 2) / 100); sa = round2(taxable * (g / 2) / 100); }
      else ia = round2(taxable * g / 100);
      sq += q; st += total; so += other; sta += taxable; sc += ca; ss += sa; si += ia;
      return { desc: it.desc, hsn: it.hsn, per: it.per, gstRate: it.gstRate, q, r, total, other, taxable, cgstAmt: ca, sgstAmt: sa, igstAmt: ia };
    });
    st = round2(st); so = round2(so); sta = round2(sta); sc = round2(sc); ss = round2(ss); si = round2(si);
    const sumTax = round2(sc + ss + si);
    const grandRaw = round2(sta + sumTax);
    const grand = Math.round(grandRaw);
    const hsnMap: Record<string, { hsn: string; rate: number; tax: number; c: number; s: number; i: number }> = {};
    rows.forEach((it) => {
      const k = (it.hsn || "--") + "|" + it.gstRate;
      if (!hsnMap[k]) hsnMap[k] = { hsn: it.hsn || "--", rate: Number(it.gstRate) || 0, tax: 0, c: 0, s: 0, i: 0 };
      hsnMap[k].tax += it.taxable; hsnMap[k].c += it.cgstAmt; hsnMap[k].s += it.sgstAmt; hsnMap[k].i += it.igstAmt;
    });
    return { rows, hsn: Object.values(hsnMap), sumQty: sq, sumTotal: st, sumOther: so, sumTaxable: sta, sumCgst: sc, sumSgst: ss, sumIgst: si, sumTax, grand, roundOff: round2(grand - grandRaw) };
  }, [S.items, intra]);

const validItems = T.rows.filter((it) => it.desc.trim() && it.q > 0 && it.r > 0);

const chk = {
    company: S.company.name.trim() !== "" && (!meta.gstRequired || S.company.gstin.trim().length >= 15),
    doc: S.doc.no.trim() !== "" && S.doc.date.trim() !== "",
    party: S.billed.name.trim() !== "",
    items: validItems.length > 0,
    bank: S.bank.name1.trim() !== "" && S.bank.ac1.trim() !== "",
  };

function validate(): string[] {
    const e: string[] = [];
    if (!S.company.name.trim()) e.push("Company Name is required");
    if (meta.gstRequired && S.company.gstin.trim().length < 15) e.push("Company GSTIN must be 15 digits");
    if (!S.doc.no.trim()) e.push(meta.noLabel + " is required");
    if (!S.doc.date.trim()) e.push(meta.dateLabel + " is required");
    if (!S.billed.name.trim()) e.push("Party Name is required");
    if (validItems.length === 0) e.push("Add at least 1 item with Description, Qty and Rate");
    return e;
  }

function generate() {
    const e = validate();
    setErrs(e);
    if (e.length > 0) { toast("Fix " + e.length + " missing field(s)"); return; }
    setGenerated(true);
    setTimeout(() => document.getElementById("bill-preview")?.scrollIntoView({ behavior: "smooth" }), 200);
    toast("Generated successfully");
  }

function saveDraft() { try { localStorage.setItem("steelsetu-billmaker-v1", JSON.stringify(S)); toast("Draft saved"); } catch { toast("Save failed"); } }
  function loadDraft() {
    try {
      const d = JSON.parse(localStorage.getItem("steelsetu-billmaker-v1") || "null");
      if (!d) { toast("No draft found"); return; }
      setS(d); setGenerated(false); setErrs([]); toast("Draft loaded - click Generate");
    } catch { toast("Load failed"); }
  }

function billText(): string {
    let t = meta.title + " " + S.doc.no + " Dt " + S.doc.date + "\n" + S.company.name + "\nParty: " + S.billed.name + "\n";
    validItems.forEach((it, i) => { t += (i + 1) + ". " + it.desc + " Qty " + it.q + " " + it.per + " Rate " + it.r + " Taxable Rs " + fmt2(it.taxable) + "\n"; });
    t += "Taxable: Rs " + fmt2(T.sumTaxable) + "\nGST: Rs " + fmt2(T.sumTax) + "\nTotal: Rs " + fmt2(T.grand);
    return t;
  }

const prev = parseFloat(S.previousDues) || 0;
  const qrData = S.doc.irn.trim();
  const tabCls = (active: boolean) => "px-3 py-2 rounded-lg border text-xs font-bold " + (active ? "bg-steel-navy text-white border-steel-navy" : "bg-white text-steel-navy border-gray-300");
  return (
    <div>
      <style>{"@media print{.no-print{display:none!important}body{background:#fff}#bill-sheet{box-shadow:none;border:1px solid #000;margin:0}}"}</style>

<section className="bg-steel-navy text-white grain relative overflow-hidden no-print">
        <div className="absolute -top-20 left-1/3 w-[350px] h-[350px] rounded-full bg-steel-blue/25 blur-[110px]" aria-hidden />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-14">
          <h1 className="text-3xl md:text-4xl font-bold">Bill / Quotation / P.O. / P.I. Maker</h1>
          <p className="mt-3 text-slate-300 max-w-2xl text-sm leading-relaxed">
            Fill your own company details, upload your logo, and generate a GST-ready Tax Invoice, Proforma Invoice, Quotation or Purchase Order. Everything stays in your browser - nothing is uploaded to any server. Free tool for all traders.
          </p>
        </div>
      </section>

<div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-6 no-print">
          <div className="flex flex-wrap gap-2">
            {DOC_TABS.map((d) => (
              <button key={d.key} onClick={() => { setS((p) => ({ ...p, docType: d.key })); setGenerated(false); setErrs([]); }} className={tabCls(S.docType === d.key)}>{d.label}</button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button onClick={() => setS((p) => ({ ...p, taxType: "intra" }))} className={tabCls(intra)}>Intra-State (CGST+SGST)</button>
            <button onClick={() => setS((p) => ({ ...p, taxType: "inter" }))} className={tabCls(!intra)}>Inter-State (IGST)</button>
            <label className="flex items-center gap-1 text-xs font-semibold text-steel-navy ml-2">
              <input type="checkbox" checked={S.sameAddress} onChange={(e) => setS((p) => ({ ...p, sameAddress: e.target.checked, shipped: e.target.checked ? { ...p.billed } : p.shipped }))} />
              Shipped same as billed
            </label>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={() => { setS(demo()); setGenerated(false); setErrs([]); }} className="bg-steel-blue text-white text-xs font-bold px-4 py-2 rounded-lg">Load Demo Data</button>
            <button onClick={() => { setS(blank()); setGenerated(false); setErrs([]); }} className="bg-steel-navy text-white text-xs font-bold px-4 py-2 rounded-lg">Clear All</button>
            <button onClick={saveDraft} className="bg-gray-100 border border-gray-300 text-steel-navy text-xs font-bold px-4 py-2 rounded-lg">Save Draft</button>
            <button onClick={loadDraft} className="bg-gray-100 border border-gray-300 text-steel-navy text-xs font-bold px-4 py-2 rounded-lg">Load Draft</button>
          </div>
        </div>
        <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-6 no-print">
          <h2 className="text-sm font-bold text-steel-navy mb-4">1. Your Company Details</h2>
          <div className="mb-4 p-3 bg-steel-blue/5 border border-steel-blue/20 rounded-xl">
            <label className="text-xs font-semibold text-steel-navy">Company Logo (optional)</label>
            <input type="file" accept="image/png,image/jpeg,image/webp" onChange={onLogo} className="mt-2 block text-xs" />
            {S.logo && <button onClick={() => setS((p) => ({ ...p, logo: "" }))} className="mt-2 text-xs font-bold text-red-500">Remove logo</button>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Company Name" req value={S.company.name} on={(v) => upd("company.name", v)} ph="Your Company Name" />
            <Field label="Contact" value={S.company.contact} on={(v) => upd("company.contact", v)} ph="033-XXXXXXXX" />
            <Field label="Company GSTIN" req={meta.gstRequired} value={S.company.gstin} on={(v) => upd("company.gstin", v)} ph="15 digit GSTIN" />
            <Field label="PAN" value={S.company.pan} on={(v) => upd("company.pan", v)} />
            <Field label="TAN" value={S.company.tan} on={(v) => upd("company.tan", v)} />
            <Field label="Email" value={S.company.email} on={(v) => upd("company.email", v)} />
            <Field label="Registered Office" textarea value={S.company.regOffice} on={(v) => upd("company.regOffice", v)} />
            <Field label="Shop / Godown Address" textarea value={S.company.shopAddress} on={(v) => upd("company.shopAddress", v)} />
          </div>
        </div>

<div className="mt-6 bg-white border border-gray-200 rounded-2xl p-6 no-print">
          <h2 className="text-sm font-bold text-steel-navy mb-4">2. Document &amp; Transport Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label={meta.noLabel} req value={S.doc.no} on={(v) => upd("doc.no", v)} ph="SE/001/26-27" />
            <Field label={meta.dateLabel} req value={S.doc.date} on={(v) => upd("doc.date", v)} ph="12-Dec-26" />
            <Field label="Order No." value={S.doc.orderNo} on={(v) => upd("doc.orderNo", v)} />
            <Field label="Order Date" value={S.doc.orderDate} on={(v) => upd("doc.orderDate", v)} />
            <Field label="Sales Person" value={S.doc.salesName} on={(v) => upd("doc.salesName", v)} />
            <Field label="Sales Mobile" value={S.doc.salesMobile} on={(v) => upd("doc.salesMobile", v)} />
            <Field label="Sales Email" value={S.doc.salesEmail} on={(v) => upd("doc.salesEmail", v)} />
            <Field label="Sales Point" value={S.doc.salesPoint} on={(v) => upd("doc.salesPoint", v)} ph="Burrabazar" />
            <Field label="E-Way Bill No." value={S.doc.ewayNo} on={(v) => upd("doc.ewayNo", v)} />
            <Field label="E-Way Date" value={S.doc.ewayDate} on={(v) => upd("doc.ewayDate", v)} />
            <Field label="Vehicle No." value={S.doc.vehicleNo} on={(v) => upd("doc.vehicleNo", v)} />
            <Field label="Despatched Through" value={S.doc.despatched} on={(v) => upd("doc.despatched", v)} />
            <Field label="Mode of Transport" value={S.doc.mode} on={(v) => upd("doc.mode", v)} />
            <Field label="Delivery From" value={S.doc.deliveryFrom} on={(v) => upd("doc.deliveryFrom", v)} />
            <Field label="Destination" value={S.doc.destination} on={(v) => upd("doc.destination", v)} />
            <Field label="Ack No. (e-invoice)" value={S.doc.ackNo} on={(v) => upd("doc.ackNo", v)} />
            <Field label="Ack Date" value={S.doc.ackDate} on={(v) => upd("doc.ackDate", v)} />
            <Field label="IRN (for QR, optional)" textarea value={S.doc.irn} on={(v) => upd("doc.irn", v)} ph="64-char IRN from government portal" />
          </div>
        </div>
        <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-6 no-print">
          <h2 className="text-sm font-bold text-steel-navy mb-4">3. Party Details</h2>
          <p className="text-xs text-steel-grey mb-3">{meta.partyLabel}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Party Name" req value={S.billed.name} on={(v) => upd("billed.name", v)} />
            <Field label="Contact" value={S.billed.contact} on={(v) => upd("billed.contact", v)} />
            <Field label="State" value={S.billed.state} on={(v) => upd("billed.state", v)} />
            <Field label="State Code" value={S.billed.code} on={(v) => upd("billed.code", v)} />
            <Field label="GSTIN" value={S.billed.gstin} on={(v) => upd("billed.gstin", v)} />
            <Field label="PAN" value={S.billed.pan} on={(v) => upd("billed.pan", v)} />
            <Field label="Address" textarea value={S.billed.address} on={(v) => upd("billed.address", v)} />
          </div>
          {!S.sameAddress && (
            <div className="mt-5 pt-5 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p className="sm:col-span-2 text-xs font-bold text-steel-navy">Shipped To / Consignee</p>
              <Field label="Name" value={S.shipped.name} on={(v) => upd("shipped.name", v)} />
              <Field label="Contact" value={S.shipped.contact} on={(v) => upd("shipped.contact", v)} />
              <Field label="State" value={S.shipped.state} on={(v) => upd("shipped.state", v)} />
              <Field label="State Code" value={S.shipped.code} on={(v) => upd("shipped.code", v)} />
              <Field label="GSTIN" value={S.shipped.gstin} on={(v) => upd("shipped.gstin", v)} />
              <Field label="Address" textarea value={S.shipped.address} on={(v) => upd("shipped.address", v)} />
            </div>
          )}
        </div>

<div className="mt-6 bg-white border border-gray-200 rounded-2xl p-6 no-print">
          <h2 className="text-sm font-bold text-steel-navy mb-4">4. Items</h2>
          {S.items.map((it, i) => (
            <div key={i} className="border border-dashed border-gray-300 rounded-xl p-4 mb-3 bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <b className="text-xs text-steel-navy">Item {i + 1}</b>
                {S.items.length > 1 && <button onClick={() => setS((p) => ({ ...p, items: p.items.filter((_, x) => x !== i) }))} className="text-xs font-bold text-red-500 px-2 py-1 bg-red-50 rounded">Remove</button>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-3"><Field label="Description" req value={it.desc} on={(v) => updItem(i, "desc", v)} ph="e.g. PGL Profile Sheet (0.45mm)" /></div>
                <Field label="HSN" value={it.hsn} on={(v) => updItem(i, "hsn", v)} />
                <Field label="Qty" num step="0.001" value={it.qty} on={(v) => updItem(i, "qty", v)} />
                <Field label="Rate" num step="0.01" value={it.rate} on={(v) => updItem(i, "rate", v)} />
                <div>
                  <label className="text-xs font-semibold text-steel-navy">Per</label>
                  <select value={it.per} onChange={(e) => updItem(i, "per", e.target.value)} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
                    {["M.T", "KG", "PCS", "FT", "MTR", "QTL"].map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <Field label="Other Charges" num step="0.01" value={it.other} on={(v) => updItem(i, "other", v)} />
                <div>
                  <label className="text-xs font-semibold text-steel-navy">GST %</label>
                  <select value={it.gstRate} onChange={(e) => updItem(i, "gstRate", Number(e.target.value))} className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
                    {[0, 5, 12, 18, 28].map((r) => <option key={r} value={r}>{r}%</option>)}
                  </select>
                </div>
              </div>
              {T.rows[i] && <p className="mt-2 text-[11px] text-steel-grey">Total Rs {fmt2(T.rows[i].total)} | Taxable Rs {fmt2(T.rows[i].taxable)} | Tax Rs {fmt2(T.rows[i].cgstAmt + T.rows[i].sgstAmt + T.rows[i].igstAmt)}</p>}
            </div>
          ))}
          <button onClick={() => setS((p) => ({ ...p, items: [...p.items, newItem()] }))} className="bg-steel-navy text-white text-xs font-bold px-4 py-2 rounded-lg">+ Add Item</button>
        </div>
        <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-6 no-print">
          <h2 className="text-sm font-bold text-steel-navy mb-4">5. Ledger, Bank &amp; Terms</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Previous Dues (Rs)" num step="0.01" value={S.previousDues} on={(v) => upd("previousDues", v)} />
            <Field label="Bank 1 Name" value={S.bank.name1} on={(v) => upd("bank.name1", v)} />
            <Field label="Bank 1 A/C No." value={S.bank.ac1} on={(v) => upd("bank.ac1", v)} />
            <Field label="Bank 1 Branch &amp; IFSC" value={S.bank.ifsc1} on={(v) => upd("bank.ifsc1", v)} />
            <Field label="Bank 2 Name (optional)" value={S.bank.name2} on={(v) => upd("bank.name2", v)} />
            <Field label="Bank 2 A/C No." value={S.bank.ac2} on={(v) => upd("bank.ac2", v)} />
            <Field label="Bank 2 Branch &amp; IFSC" value={S.bank.ifsc2} on={(v) => upd("bank.ifsc2", v)} />
            <Field label="Terms &amp; Conditions" textarea value={S.terms.main} on={(v) => upd("terms.main", v)} />
            <Field label="Declaration" textarea value={S.terms.declaration} on={(v) => upd("terms.declaration", v)} />
          </div>
        </div>

<div className="mt-6 bg-white border border-gray-200 rounded-2xl p-6 no-print">
          <h2 className="text-sm font-bold text-steel-navy mb-4">6. Check &amp; Generate</h2>
          <div className="flex flex-wrap gap-2 text-xs">
            {([["Company", chk.company], ["Party", chk.party], ["Items (" + validItems.length + ")", chk.items], [meta.noLabel, chk.doc], ["Bank", chk.bank]] as [string, boolean][]).map(([l, ok]) => (
              <span key={l} className={"px-3 py-1.5 rounded-lg border font-semibold " + (ok ? "bg-green-50 border-green-300 text-green-700" : "bg-red-50 border-red-300 text-red-700")}>{l}: {ok ? "OK" : "pending"}</span>
            ))}
          </div>
          <p className="mt-3 text-xs text-steel-grey">Live estimate - Taxable Rs {fmt2(T.sumTaxable)} | GST Rs {fmt2(T.sumTax)} | Grand Rs {fmt2(T.grand)}</p>
          {errs.length > 0 && (
            <div className="mt-3 bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-xs">
              <b>Please fix {errs.length} issue(s):</b>
              <ul className="list-disc ml-4 mt-1">{errs.map((e, i) => <li key={i}>{e}</li>)}</ul>
            </div>
          )}
          <button onClick={generate} className="mt-4 w-full bg-steel-blue hover:bg-steel-blue/85 text-white font-bold text-base py-3.5 rounded-xl">
            {generated ? "UPDATE / RE-GENERATE" : "GENERATE " + meta.title}
          </button>
        </div>

{!generated && (
          <div className="mt-8 text-center border-2 border-dashed border-gray-300 rounded-2xl p-10 bg-white no-print">
            <b className="text-steel-navy">No document generated yet</b>
            <p className="mt-2 text-xs text-steel-grey">Fill the details above and click GENERATE. The final document will appear here for Print / PDF / WhatsApp.</p>
          </div>
        )}
        {generated && (
          <div id="bill-preview">
            <div className="flex flex-wrap gap-2 mt-8 no-print">
              <button onClick={() => window.print()} className="bg-steel-blue text-white text-xs font-bold px-4 py-2 rounded-lg">Print / Save PDF</button>
              <button onClick={() => window.open("https://wa.me/?text=" + encodeURIComponent(billText()), "_blank")} className="bg-steel-navy text-white text-xs font-bold px-4 py-2 rounded-lg">WhatsApp Share</button>
              <button onClick={() => { navigator.clipboard.writeText(billText()); toast("Summary copied"); }} className="bg-gray-100 border border-gray-300 text-steel-navy text-xs font-bold px-4 py-2 rounded-lg">Copy Summary</button>
              <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="bg-gray-100 border border-gray-300 text-steel-navy text-xs font-bold px-4 py-2 rounded-lg">Edit Details</button>
            </div>

<div id="bill-sheet" className="bg-white text-black border-2 border-black mt-4 max-w-3xl mx-auto text-[11px] p-2">
              <div className="text-center font-extrabold text-[15px] py-1 border-b-2 border-black">{meta.title}</div>
              <div className="flex justify-between items-center gap-2 py-1.5 border-b border-black">
                {S.logo ? <img src={S.logo} alt="logo" className="w-16 h-16 object-contain border border-black rounded" /> : <div className="w-16 h-14 flex items-center justify-center border-2 border-steel-navy rounded font-extrabold text-lg text-steel-navy">{initials(S.company.name)}</div>}
                <div className="flex-1 text-center">
                  <div className="text-xl font-extrabold">{S.company.name || "Your Company Name"}</div>
                  <div>Registered Office: {S.company.regOffice}</div>
                  <div>Shop Address: {S.company.shopAddress}</div>
                  <div>Contact: {S.company.contact}</div>
                </div>
                {S.logo ? <img src={S.logo} alt="logo" className="w-16 h-16 object-contain border border-black rounded" /> : <div className="w-16 h-14 flex items-center justify-center border-2 border-steel-navy rounded font-extrabold text-lg text-steel-navy">{initials(S.company.name)}</div>}
              </div>

<table className="w-full border-collapse"><tbody>
                <tr><td className="border border-black px-1">GST No.: <b>{S.company.gstin}</b></td><td className="border border-black px-1">PAN: <b>{S.company.pan}</b></td><td className="border border-black px-1">TAN: <b>{S.company.tan}</b></td><td className="border border-black px-1">Email: <b>{S.company.email}</b></td></tr>
                <tr><td className="border border-black px-1">Sales Point: {S.doc.salesPoint} Name: <b>{S.doc.salesName}</b></td><td className="border border-black px-1">Mobile: <b>{S.doc.salesMobile}</b> Email: {S.doc.salesEmail}</td><td className="border border-black px-1 text-center" rowSpan={6}>{qrData ? <img src={"https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=" + encodeURIComponent(qrData.slice(0, 180))} alt="QR" width={110} height={110} /> : <div className="text-[10px]">No IRN QR</div>}</td></tr>
                <tr><td className="border border-black px-1">Order No.: <b>{S.doc.orderNo}</b></td><td className="border border-black px-1">Order Date: <b>{S.doc.orderDate}</b></td></tr>
                <tr><td className="border border-black px-1">{meta.noLabel}: <b>{S.doc.no}</b></td><td className="border border-black px-1">{meta.dateLabel}: <b>{S.doc.date}</b></td></tr>
                <tr><td className="border border-black px-1">e-Way Bill No.: {S.doc.ewayNo} Dt: {S.doc.ewayDate}</td><td className="border border-black px-1">Vehicle No.: <b>{S.doc.vehicleNo}</b></td></tr>
                <tr><td className="border border-black px-1">Despatched: <b>{S.doc.despatched}</b></td><td className="border border-black px-1">Mode: <b>{S.doc.mode}</b></td></tr>
                <tr><td className="border border-black px-1">Delivery From: {S.doc.deliveryFrom}</td><td className="border border-black px-1">Destination: <b>{S.doc.destination}</b></td></tr>
                <tr><td className="border border-black px-1" colSpan={2}>IRN: {S.doc.irn}</td></tr>
                <tr><td className="border border-black px-1" colSpan={2}>Ack No.: {S.doc.ackNo} Ack Date: {S.doc.ackDate}</td></tr>
              </tbody></table>

<table className="w-full border-collapse">
                <thead><tr><th className="border border-black px-1">{meta.partyLabel}</th><th className="border border-black px-1">Details of Consignee | Shipped To</th></tr></thead>
                <tbody>
                  <tr>
                    <td className="border border-black px-1 align-top"><b>{S.billed.name || "Party Name"}</b><br />{S.billed.address}<br />Contact: {S.billed.contact}<br />State: {S.billed.state} ({S.billed.code})<br />GSTIN: <b>{S.billed.gstin}</b><br />PAN: <b>{S.billed.pan}</b></td>
                    <td className="border border-black px-1 align-top"><b>{S.shipped.name || "Consignee"}</b><br />{S.shipped.address}<br />Contact: {S.shipped.contact}<br />State: {S.shipped.state} ({S.shipped.code})<br />GSTIN: <b>{S.shipped.gstin}</b><br />PAN: <b>{S.shipped.pan}</b></td>
                  </tr>
                </tbody>
              </table>
              <table className="w-full border-collapse text-[10px]">
                <thead><tr>
                  <th className="border border-black px-1">S.No.</th><th className="border border-black px-1">Description</th><th className="border border-black px-1">HSN</th><th className="border border-black px-1">Qty</th><th className="border border-black px-1">Rate</th><th className="border border-black px-1">Per</th><th className="border border-black px-1">Total</th><th className="border border-black px-1">Other</th><th className="border border-black px-1">Taxable</th>
                  {intra ? <><th className="border border-black px-1">CGST</th><th className="border border-black px-1">SGST</th></> : <th className="border border-black px-1">IGST</th>}
                </tr></thead>
                <tbody>
                  {T.rows.map((it, i) => (
                    <tr key={i}>
                      <td className="border border-black px-1">{i + 1}</td>
                      <td className="border border-black px-1">{it.desc}</td>
                      <td className="border border-black px-1">{it.hsn}</td>
                      <td className="border border-black px-1">{fmt3(it.q)}</td>
                      <td className="border border-black px-1">{fmt2(it.r)}</td>
                      <td className="border border-black px-1">{it.per}</td>
                      <td className="border border-black px-1">{fmt2(it.total)}</td>
                      <td className="border border-black px-1">{fmt2(it.other)}</td>
                      <td className="border border-black px-1">{fmt2(it.taxable)}</td>
                      {intra ? <><td className="border border-black px-1">{fmt2(it.cgstAmt)}</td><td className="border border-black px-1">{fmt2(it.sgstAmt)}</td></> : <td className="border border-black px-1">{fmt2(it.igstAmt)}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>

<div className="flex flex-col sm:flex-row gap-2 mt-2">
                <table className="w-full border-collapse text-[10px] flex-1">
                  <thead><tr><th className="border border-black px-1">HSN</th><th className="border border-black px-1">Taxable</th><th className="border border-black px-1">Rate</th><th className="border border-black px-1">Tax Amt</th></tr></thead>
                  <tbody>
                    {T.hsn.map((g, i) => (
                      <tr key={i}><td className="border border-black px-1">{g.hsn}</td><td className="border border-black px-1">{fmt2(g.tax)}</td><td className="border border-black px-1">{g.rate}%</td><td className="border border-black px-1">{fmt2(round2(g.c + g.s + g.i))}</td></tr>
                    ))}
                  </tbody>
                </table>
                <table className="w-full border-collapse text-[10px] flex-1">
                  <tbody>
                    <tr><td className="border border-black px-1">Goods Value Before Tax</td><td className="border border-black px-1 text-right">{fmt2(T.sumTotal)}</td></tr>
                    <tr><td className="border border-black px-1">Loading &amp; Other Charges</td><td className="border border-black px-1 text-right">{fmt2(T.sumOther)}</td></tr>
                    <tr><td className="border border-black px-1"><b>Total Taxable Amount</b></td><td className="border border-black px-1 text-right"><b>{fmt2(T.sumTaxable)}</b></td></tr>
                    {intra ? (
                      <>
                        <tr><td className="border border-black px-1">SGST</td><td className="border border-black px-1 text-right">{fmt2(T.sumSgst)}</td></tr>
                        <tr><td className="border border-black px-1">CGST</td><td className="border border-black px-1 text-right">{fmt2(T.sumCgst)}</td></tr>
                      </>
                    ) : (
                      <tr><td className="border border-black px-1">IGST</td><td className="border border-black px-1 text-right">{fmt2(T.sumIgst)}</td></tr>
                    )}
                    <tr><td className="border border-black px-1">Rounded Off</td><td className="border border-black px-1 text-right">{T.roundOff < 0 ? "(" + fmt2(T.roundOff) + ")" : fmt2(T.roundOff)}</td></tr>
                    <tr><td className="border border-black px-1"><b>Total Amount</b></td><td className="border border-black px-1 text-right"><b>{fmt2(T.grand)}</b></td></tr>
                  </tbody>
                </table>
              </div>

<table className="w-full border-collapse mt-2"><tbody>
                <tr><td className="border border-black px-1 py-1">Amount (in words): <b>{amountWords(T.grand)}</b><br />GST (in words): <b>{amountWords(T.sumTax)}</b></td></tr>
              </tbody></table>

<div className="flex flex-col sm:flex-row gap-2 mt-2">
                <div className="border border-black p-1.5 flex-1">
                  <b>Ledger Account Summary</b><br />
                  Previous Dues: Rs {fmt2(prev)} Dr<br />
                  This Bill Amount: Rs {fmt2(T.grand)} Dr<br />
                  <b>Total Outstanding: Rs {fmt2(prev + T.grand)} Dr</b><br />
                  <span className="text-[10px]">{numToWords(Math.round(prev + T.grand))} Only.</span>
                </div>
                <div className="border border-black p-1.5 flex-1">
                  <b>Bank Details</b><br />
                  Bank: <b>{S.bank.name1}</b> | A/C: <b>{S.bank.ac1}</b><br />
                  Branch &amp; IFSC: <b>{S.bank.ifsc1}</b>
                  {S.bank.name2 && <><br />Bank: <b>{S.bank.name2}</b> | A/C: <b>{S.bank.ac2}</b> | {S.bank.ifsc2}</>}
                </div>
              </div>

<div className="flex flex-col sm:flex-row gap-2 mt-2">
                <div className="border border-black p-1.5 flex-[1.4]"><b>Terms &amp; Conditions:</b><br />{S.terms.main}<br /><b>Declaration:</b><br />{S.terms.declaration}</div>
                <div className="border border-black p-1.5 text-center">For <b>{S.billed.name}</b><br /><br /><br />Customer Seal &amp; Signature</div>
                <div className="border border-black p-1.5 text-center">For <b>{S.company.name}</b><br /><br /><br />Authorised Signatory</div>
              </div>

<div className="text-center py-1.5 mt-1">
                This is a computer-generated document<br />
                <span className="text-[10px]">Powered by Steelsetu.com - e-invoice IRN comes from the government portal. Verify tax details with your CA.</span>
              </div>
            </div>
          </div>
        )}
      </div>

{toastMsg && <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-steel-navy text-white text-sm font-bold px-5 py-2.5 rounded-full z-50">{toastMsg}</div>}
    </div>
  );
}


