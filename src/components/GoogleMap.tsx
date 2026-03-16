import MapEmbed from "./MapEmbed";

const GoogleMap = () => {
  return (
    <section className="w-full">
      <MapEmbed
        className="h-[250px] sm:h-[350px] lg:h-[450px]"
        title="Northwind Hűtéstechnika - 1118 Budapest, Torbágy utca 16."
      />
    </section>
  );
};

export default GoogleMap;
