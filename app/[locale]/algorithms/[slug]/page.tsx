import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getAlgorithm, algorithms } from "@/lib/registry";
import AlgorithmPageClient from "./AlgorithmPageClient";

export function generateStaticParams() {
  return algorithms.map((a) => ({ slug: a.slug }));
}

export default async function AlgorithmPage(
  props: PageProps<"/[locale]/algorithms/[slug]">,
) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);

  const algorithm = getAlgorithm(slug);
  if (!algorithm) notFound();

  return <AlgorithmPageClient algorithm={algorithm} />;
}
