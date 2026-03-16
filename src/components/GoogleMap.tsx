const GoogleMap = () => {
  return (
    <section className="w-full">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2696.5!2d19.0234!3d47.4634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741ddbd5f0b9a3b%3A0x0!2s1118+Budapest%2C+Torb%C3%A1gy+utca+16!5e0!3m2!1shu!2shu!4v1700000000000"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Northwind Hűtéstechnika - 1118 Budapest, Torbágy utca 16."
        className="w-full h-[250px] sm:h-[350px] lg:h-[450px]"
      />
    </section>
  );
};

export default GoogleMap;
