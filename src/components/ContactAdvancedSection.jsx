import React from 'react';

export default function ContactAdvancedSection() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">Contact avancé</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <h3 className="font-semibold text-lg mb-2 text-blue-800">
              Prendre rendez-vous
            </h3>
            <iframe
              src="https://calendar.google.com/calendar/embed?src=fr.french%23holiday%40group.v.calendar.google.com&ctz=Europe%2FParis"
              style={{ border: 0 }}
              width="300"
              height="300"
              frameBorder="0"
              scrolling="no"
              title="Calendrier"
              className="rounded shadow mb-4"
            ></iframe>
            <p className="text-gray-600 text-sm">
              Choisissez un créneau pour un appel ou une rencontre.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="font-semibold text-lg mb-2 text-blue-800">
              Nous trouver
            </h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9999999999995!2d2.294481315674!3d48.8583700792876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fddf1c1e1e1%3A0x1e1e1e1e1e1e1e1e!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1630000000000!5m2!1sfr!2sfr"
              width="300"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Google Maps"
              className="rounded shadow mb-4"
            ></iframe>
            <p className="text-gray-600 text-sm">
              Adresse : 1 rue de l’Agence, Paris
              <br />
              Horaires : Lun-Ven 9h-18h
            </p>
            <div className="flex gap-4 mt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
              >
                Facebook
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-800"
              >
                LinkedIn
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
