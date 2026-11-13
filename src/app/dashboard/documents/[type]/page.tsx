import { notFound } from "next/navigation";
import DocList from "@/components/documents/DocList";
import { isDocType } from "@/lib/docTypes";

export default async function DocsByTypePage(props: { params: Promise<{ type: string }> }) {
  const { type } = await props.params;
  if (!isDocType(type)) notFound();
  return <DocList docType={type} />;
}