import { redirect } from "next/navigation";

export default async function BlogArticlePage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  redirect("/knowledge/" + slug);
}
