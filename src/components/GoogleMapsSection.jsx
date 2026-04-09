import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react'; // Installez lucide-react ou utilisez des SVG

function GoogleMapsSection() {
  return (
    <section className="py-20 px-6 bg-slate-50" id="localisation">
      <div className="max-w-6xl mx-auto">
        
        {/* En-tête avec un style plus moderne */}
        <div className="mb-12 text-left border-l-4 border-blue-600 pl-6">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            NOTRE <span className="text-blue-600">SIÈGE</span>
          </h2>
          <p className="text-gray-500 mt-2 max-w-xl">
            Venez discuter de vos projets digitaux dans nos bureaux à Kinshasa. 
            Une expertise locale pour une ambition internationale.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Colonne Infos - Prend 1/3 de l'espace */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Adresse</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Avenue Kimwenza A/A25,<br />Kinshasa, RD Congo
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Contact</h3>
                  <p className="text-sm text-gray-600">+243 82 90 54 350</p>
                  <p className="text-sm text-gray-600">servicebanamokeli@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 bg-blue-600 text-white">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-white">Disponibilité</h3>
                  <p className="text-sm text-blue-100">Lun - Ven : 08h00 - 17h00</p>
                  <p className="text-sm text-blue-100">Sam : Sur rendez-vous</p>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne Carte - Prend 2/3 de l'espace */}
          <div className="lg:col-span-2 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative h-full min-h-[400px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <iframe
                title="Google Maps localisation"
                src="https://www.google.com/maps?q=Avenue+Kimwenza+A%2FA25,+Kinshasa,+DR+Congo&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1)' }}
                allowFullScreen=""
                loading="lazy"
                className="hover:grayscale-0 transition-all duration-500"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default GoogleMapsSection;
