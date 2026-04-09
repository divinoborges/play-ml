import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import AlgorithmCatalog from "@/components/shared/AlgorithmCatalog";
import HeroBackdrop from "@/components/shared/HeroBackdrop";

export default async function HomePage(props: PageProps<"/[locale]">) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations();

  return (
    <div>
      {/* Hero Section — Decorative ML-themed backdrop */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
        <HeroBackdrop />
        <div className="relative z-10 mx-auto max-w-4xl">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white">
            {t("common.appName")}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/70 font-body max-w-3xl mx-auto leading-relaxed">
            {t("common.tagline")}
          </p>
          <a
            href="#catalog"
            className="mt-8 inline-flex items-center rounded-full border-2 border-black bg-yellow-pop px-8 py-3 font-heading text-base font-bold text-black uppercase hover:bg-black hover:text-yellow-pop hover:border-yellow-pop transition-colors"
          >
            {t("common.cta")}
          </a>
        </div>
      </section>

      {/* Algorithm Catalog — Sand background */}
      <section id="catalog" className="bg-sand px-4 sm:px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-7xl">
          <AlgorithmCatalog />
        </div>
      </section>
    </div>
  );
}
