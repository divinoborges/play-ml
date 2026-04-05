"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export default function Header() {
  const t = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function toggleLocale() {
    const next = locale === "en" ? "pt-BR" : "en";
    router.replace(pathname, { locale: next });
  }

  return (
    <header className="bg-black">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-heading text-xl font-bold text-white uppercase tracking-tight">
            {t("appName")}
          </Link>
          <nav className="hidden sm:flex items-center gap-4">
<Link
              href="/metrics"
              className="inline-flex items-center rounded-full bg-yellow-pop px-4 py-1.5 font-heading text-sm font-bold text-black hover:bg-black hover:text-yellow-pop hover:ring-2 hover:ring-yellow-pop transition-colors"
            >
              {t("metrics")}
            </Link>
          </nav>
        </div>
        <button
          onClick={toggleLocale}
          className="rounded-full border-2 border-white px-4 py-1.5 font-heading text-sm font-bold text-white uppercase hover:bg-white hover:text-black transition-colors"
        >
          {locale === "en" ? "PT-BR" : "EN"}
        </button>
      </div>
    </header>
  );
}
