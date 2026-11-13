import BillMaker from "@/components/billmaker/BillMaker";

export const metadata = {
  title: "GST Bill, Quotation, P.O. & P.I. Maker",
  description:
    "Free tool to create GST tax invoices, proforma invoices, quotations and purchase orders with your own logo and bank details. Runs fully in your browser.",
};

export default function BillMakerPage() {
  return <BillMaker />;
}
