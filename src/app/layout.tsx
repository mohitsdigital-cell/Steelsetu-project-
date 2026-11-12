import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Steelsetu — The Bridge Between Verified Buyers & Verified Steel Suppliers",
  description:
    "B2B steel and industrial trading platform for Burrabazar, Kolkata and Eastern India. Verified suppliers, structured RFQs, indicative rates, calculators and trade knowledge.",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
