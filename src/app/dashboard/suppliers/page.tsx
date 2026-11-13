import PartyCRM from "@/components/dashboard/PartyCRM";

export const metadata = { title: "Suppliers" };

export default function SuppliersPage() {
  return <PartyCRM party="supplier" />;
}
