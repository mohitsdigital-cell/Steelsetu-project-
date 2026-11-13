import { notFound } from "next/navigation";
import { calculators } from "@/lib/calculators";
import { allCalcSpecs } from "@/lib/steel-calcs-extra";
import TMTWeightCalculator from "@/components/calculators/TMTWeightCalculator";
import SheetWeightCalculator from "@/components/calculators/SheetWeightCalculator";
import RoofingEstimator from "@/components/calculators/RoofingEstimator";
import SteelCalcForm from "@/components/calculators/SteelCalcForm";

export function generateStaticParams() {
  return [
    ...calculators.map((c) => ({ slug: c.slug })),
    ...allCalcSpecs.map((c) => ({ slug: c.slug })),
  ];
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const c =
    calculators.find((x) => x.slug === slug) || allCalcSpecs.find((x) => x.slug === slug);
  return { title: c ? c.title : "Calculator" };
}

export default async function CalculatorDetailPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  if (slug === "tmt-weight") return <TMTWeightCalculator />;
  if (slug === "sheet-weight") return <SheetWeightCalculator />;
  if (slug === "roofing-estimator") return <RoofingEstimator />;
  const spec = allCalcSpecs.find((c) => c.slug === slug);
  if (!spec) notFound();
  return <SteelCalcForm slug={spec.slug} />;
}
