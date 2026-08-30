export const SITE_URL = "https://northwind.hu";

const galleries = [
  {
    slug: "osszes",
    title: "Összes referenciamunkánk",
    description: "Válogatás lakossági, hőszivattyús, légtechnikai és ipari munkáinkból.",
  },
  {
    slug: "lakossagi-split",
    title: "Lakossági split és multi-split referenciák",
    description: "Otthoni klímaszerelési munkáink – split és multi-split rendszerek.",
  },
  {
    slug: "hoszivattyu",
    title: "Hőszivattyús rendszereink",
    description: "Levegő-levegő és levegő-víz hőszivattyús referenciamunkáink.",
  },
  {
    slug: "legcsatornazhato",
    title: "Rejtett légcsatornázható rendszerek",
    description: "Álmennyezetbe és padlástérbe rejtett, esztétikus klímamegoldások.",
  },
  {
    slug: "karbantartas",
    title: "Karbantartás és prémium zsákos klímamosás",
    description: "Alapos klímamosási és rendszeres karbantartási referenciáink.",
  },
  {
    slug: "ipari-hutes",
    title: "Ipari hűtés és Chiller referenciák",
    description: "Komplex ipari hűtési rendszerek és folyadékhűtő telepítések.",
  },
  {
    slug: "legtechnika",
    title: "Légtechnika és AHU referenciák",
    description: "Központi légkezelők, szűréstechnika és hővisszanyerő rendszerek.",
  },
  {
    slug: "fujitsu-lakossagi",
    title: "Fujitsu lakossági split referenciák",
    description: "Telepített Fujitsu split és multi-split rendszerek otthonokba.",
  },
  {
    slug: "fujitsu-waterstage",
    title: "Fujitsu Waterstage hőszivattyú referenciák",
    description: "Levegő-víz hőszivattyús rendszereink Fujitsu Waterstage egységekkel.",
  },
  {
    slug: "fujitsu-legcsatornazhato",
    title: "Fujitsu légcsatornázható referenciák",
    description: "Álmennyezetbe rejtett Fujitsu légcsatornázható megoldások.",
  },
  {
    slug: "fujitsu-vrf",
    title: "Fujitsu VRF és folyadékhűtő referenciák",
    description: "Ipari és kereskedelmi Fujitsu VRF rendszerek és chillerek.",
  },
];

export const STATIC_PAGE_META = [
  {
    path: "/",
    title: "Klímaszerelés, hőszivattyú és ipari hűtés Budapest | Northwind – szakmai tapasztalat 1993 óta",
    description: "Klímaszerelés, hőszivattyú, klímamosás és ipari hűtéstechnika Budapesten és Pest vármegyében. Szakmai tapasztalat 1993 óta; tételes ajánlat helyszíni felmérés után.",
  },
  {
    path: "/fujitsu",
    title: "Northwind Hűtéstechnika Kft. – Fujitsu Klíma és Hőszivattyú Specialisták",
    description: "A Fujitsu hivatalos partnerlistáján szereplő budapesti kivitelező. Egyes lakossági oldalfali modellekre, feltételekkel akár 10 év kiterjesztett garancia.",
  },
  {
    path: "/lakossagi-klima",
    title: "Lakossági Klíma – Klímaszerelés, hőszivattyú, klímamosás | Northwind Hűtéstechnika",
    description: "Lakossági klímamegoldások: split és multi-split klímaszerelés, hőszivattyú telepítés és prémium zsákos klímamosás Budapesten és Pest vármegyében.",
  },
  {
    path: "/fisher",
    title: "Fisher Klíma Telepítés és Garancia | Northwind Hűtéstechnika",
    description: "Fisher split klímák: egyes lakossági oldalfali modellekre, feltételekkel akár 6 év kiterjesztett garancia. Szakszerű szerelés és karbantartás.",
  },
  {
    path: "/fisher-hoszivattyu",
    title: "Fisher e-HeatR Hőszivattyú Telepítés | Fűtés és melegvíz | Northwind",
    description: "Fisher e-HeatR levegő-víz hőszivattyúk fűtéshez, hűtéshez és melegvízhez. Modellspecifikus műszaki adatok, H árszabási feltételek és helyszíni felmérés.",
  },
  {
    path: "/reszletek",
    title: "Ipari Megoldások – Chiller, AHU, Fan-coil rendszerek | Northwind Hűtéstechnika",
    description: "Ipari hűtéstechnika a Northwind Hűtéstechnikától: folyadékhűtők (Chiller), légkezelő egységek (AHU) és Fan-coil rendszerek tervezése, telepítése és karbantartása.",
  },
  {
    path: "/adatvedelem",
    title: "Adatkezelési tájékoztató | Northwind Hűtéstechnika Kft.",
    description: "Tájékoztatás a Northwind Hűtéstechnika Kft. weboldalán végzett adatkezelésről, a technikai sütikről és az érintettek jogairól.",
  },
  {
    path: "/impresszum",
    title: "Impresszum | Northwind Hűtéstechnika Kft.",
    description: "A northwind.hu üzemeltetőjének kötelező cégadatai és elérhetőségei.",
  },
  ...galleries.map(({ slug, title, description }) => ({
    path: `/referenciak/${slug}`,
    title: `${title} | Northwind Hűtéstechnika`,
    description,
  })),
  {
    path: "/auth",
    title: "Bejelentkezés | Northwind",
    description: "Admin bejelentkezés a Northwind adminfelületre.",
    noindex: true,
  },
  {
    path: "/admin",
    title: "Adminfelület | Northwind",
    description: "A Northwind belső adminfelülete.",
    noindex: true,
  },
];

export const NOT_FOUND_META = {
  path: "/404",
  title: "404 – Az oldal nem található | Northwind Hűtéstechnika",
  description: "A keresett oldal nem található. Térjen vissza a Northwind Hűtéstechnika főoldalára.",
  noindex: true,
};

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/\"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const replaceMeta = (html, selector, tag) => {
  if (!selector.test(html)) {
    throw new Error(`Missing metadata tag: ${selector.source}`);
  }
  return html.replace(selector, tag);
};

export const renderStaticPage = (template, meta) => {
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const canonical = `${SITE_URL}${meta.path === "/" ? "/" : meta.path}`;

  let html = template.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  html = replaceMeta(
    html,
    /<meta name="description" content="[^"]*"\s*\/?\s*>/i,
    `<meta name="description" content="${description}">`,
  );
  html = replaceMeta(
    html,
    /<link rel="canonical" href="[^"]*"\s*\/?\s*>/i,
    `<link rel="canonical" href="${canonical}" />`,
  );
  html = replaceMeta(
    html,
    /<meta property="og:url" content="[^"]*"\s*\/?\s*>/i,
    `<meta property="og:url" content="${canonical}" />`,
  );
  html = replaceMeta(
    html,
    /<meta property="og:title" content="[^"]*"\s*\/?\s*>/i,
    `<meta property="og:title" content="${title}">`,
  );
  html = replaceMeta(
    html,
    /<meta name="twitter:title" content="[^"]*"\s*\/?\s*>/i,
    `<meta name="twitter:title" content="${title}">`,
  );
  html = replaceMeta(
    html,
    /<meta property="og:description" content="[^"]*"\s*\/?\s*>/i,
    `<meta property="og:description" content="${description}">`,
  );
  html = replaceMeta(
    html,
    /<meta name="twitter:description" content="[^"]*"\s*\/?\s*>/i,
    `<meta name="twitter:description" content="${description}">`,
  );

  html = html.replace(/\s*<meta name="robots"[^>]*>/gi, "");
  if (meta.noindex) {
    html = html.replace(
      /(<meta name="author"[^>]*>)/i,
      `$1\n    <meta name="robots" content="noindex, nofollow">`,
    );
    html = html.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, "");
  }

  return html;
};
