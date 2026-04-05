import { setRequestLocale } from "next-intl/server";
import MetricsPageClient from "./MetricsPageClient";

export default async function MetricsPage(
  props: PageProps<"/[locale]/metrics">,
) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  return <MetricsPageClient />;
}
