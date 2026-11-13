import { notFound } from "next/navigation";
import DocEditor from "@/components/documents/DocEditor";
import { isDocType } from "@/lib/docTypes";

export default async function NewDocPage(props: { params: Promise<{ type: string }> }) {
  const { type } = await props.params;
  if (!isDocType(type)) notFound();
  return <DocEditor docType={type} />;
}