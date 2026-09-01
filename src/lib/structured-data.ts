const provider = {
  "@id": "https://northwind.hu/#business",
};

const areaServed = [
  { "@type": "AdministrativeArea", name: "Budapest" },
  { "@type": "AdministrativeArea", name: "Pest vármegye" },
];

export const residentialClimateServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://northwind.hu/lakossagi-klima#service",
  name: "Lakossági klíma- és hőszivattyú-szolgáltatások",
  description:
    "Split és multi-split klímák, hőszivattyúk és légcsatornázható rendszerek telepítése, valamint klímatisztítás és karbantartás.",
  url: "https://northwind.hu/lakossagi-klima",
  serviceType: [
    "Klímaszerelés",
    "Hőszivattyú-telepítés",
    "Légcsatornázható klímarendszerek telepítése",
    "Klímatisztítás és karbantartás",
  ],
  provider,
  areaServed,
};

export const industrialCoolingServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://northwind.hu/reszletek#service",
  name: "Ipari és félipari hűtéstechnikai szolgáltatások",
  description:
    "Chiller-, fan-coil-, légcsatornázható és központi légkezelő rendszerek tervezése, telepítése, diagnosztikája és karbantartása.",
  url: "https://northwind.hu/reszletek",
  serviceType: [
    "Ipari hűtéstechnika",
    "Chiller- és fan-coil rendszerek",
    "Központi légkezelés és szűréstechnika",
    "Ipari szerviz és karbantartás",
  ],
  provider,
  areaServed,
};

export const fisherHeatPumpServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://northwind.hu/fisher-hoszivattyu#service",
  name: "Fisher e-HeatR hőszivattyú telepítés",
  description:
    "Fisher e-HeatR levegő-víz hőszivattyús rendszerek helyszíni felmérése és telepítése fűtéshez, hűtéshez és használati melegvízhez.",
  url: "https://northwind.hu/fisher-hoszivattyu",
  serviceType: "Levegő-víz hőszivattyú telepítése",
  provider,
  areaServed,
};
