import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import Header from "@/components/shared/Header";
import ColorBorder from "@/components/shared/ColorBorder";
import Footer from "@/components/shared/Footer";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout(
  props: LayoutProps<"/[locale]">,
) {
  const { locale } = await props.params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ColorBorder />
      <Header />
      <main className="flex-1">{props.children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
