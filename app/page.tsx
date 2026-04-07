import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const defaultTarget = `${basePath}/${routing.defaultLocale}`;

const redirectScript = `(() => {
  try {
    var locales = ${JSON.stringify(routing.locales)};
    var def = ${JSON.stringify(routing.defaultLocale)};
    var base = ${JSON.stringify(basePath)};
    var nav = (navigator.language || "").toLowerCase();
    var picked = def;
    for (var i = 0; i < locales.length; i++) {
      var l = locales[i].toLowerCase();
      if (nav === l || nav.split("-")[0] === l.split("-")[0]) {
        picked = locales[i];
        break;
      }
    }
    location.replace(base + "/" + picked);
  } catch (e) {
    location.replace(${JSON.stringify(defaultTarget)});
  }
})();`;

export const metadata = {
  robots: { index: false, follow: false },
  other: {
    "http-equiv-refresh": `0; url=${defaultTarget}`,
  },
};

export default function RootPage() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${defaultTarget}`} />
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      <p>
        Redirecting to <a href={defaultTarget}>{defaultTarget}</a>…
      </p>
    </>
  );
}
