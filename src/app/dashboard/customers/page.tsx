import PartyCRM from "@/components/dashboard/PartyCRM";

export const metadata = { title: "Customers" };

export default function CustomersPage() {
  return <PartyCRM party="customer" />;
}
