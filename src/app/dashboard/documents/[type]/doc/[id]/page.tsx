import { notFound } from "next/navigation";
import DocView from "@/components/documents/DocView";
import { isDocType } from "@/lib/docTypes";

export default async function DocDetailPage(props: { params: Promise<{ type: string; id: string }> }) {
  const { type, id } = await props.params;
  if (!isDocType(type)) notFound();
  return <DocView docType={type} id={id} />;
}