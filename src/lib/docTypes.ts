export type DocType = "enquiry" | "quotation" | "sale_order" | "challan" | "tax_invoice" | "purchase_order";

export const DOC_META: Record<DocType, { label: string; prefix: string; party: "customer" | "supplier"; table: "customers" | "suppliers" }> = {
  enquiry:       { label: "Enquiry",       prefix: "ENQ", party: "customer", table: "customers" },
  quotation:     { label: "Quotation",     prefix: "QT",  party: "customer", table: "customers" },
  sale_order:    { label: "Sale Order",    prefix: "SO",  party: "customer", table: "customers" },
  challan:       { label: "Challan",        prefix: "CHL", party: "customer", table: "customers" },
  tax_invoice:   { label: "Tax Invoice",   prefix: "INV", party: "customer", table: "customers" },
  purchase_order:{ label: "Purchase Order",prefix: "PO",  party: "supplier", table: "suppliers" },
};

export const DOC_TYPES: DocType[] = ["enquiry", "quotation", "sale_order", "challan", "tax_invoice", "purchase_order"];

export function isDocType(t: string): t is DocType {
  return (DOC_TYPES as string[]).includes(t);
}
