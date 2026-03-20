import React from 'react';

function GoogleMapsSection() {
  return (
    <section
      className="py-12 px-4 bg-gradient-to-b from-gray-50 via-white to-blue-50"
      id="localisation"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-4 drop-shadow-lg">
          Localisation professionnelle
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Retrouvez-nous à notre siège, Avenue Kimwenza A/A25, Kinshasa, DR
          Congo. Nous sommes disponibles pour tous vos projets professionnels.
        </p>
        <div className="rounded-2xl overflow-hidden shadow-xl border border-blue-100">
          <iframe
            title="Google Maps localisation"
            src="https://www.google.com/maps?q=Avenue+Kimwenza+A%2FA25,+Kinshasa,+DR+Congo&output=embed"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="mt-6 text-gray-700 text-base">
          <strong>Adresse :</strong> Avenue Kimwenza A/A25, Kinshasa, DR Congo
          <br />
          <strong>Téléphone :</strong> +243 82 90 54 350
          <br />
          <strong>Email :</strong> servicebanamokeli@gmail.com
        </div>
      </div>
    </section>
  );
}

export default GoogleMapsSection;
