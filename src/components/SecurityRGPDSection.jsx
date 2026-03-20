import React from 'react';

export default function SecurityRGPDSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">Sécurité & RGPD</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold text-lg mb-2 text-blue-800">
            Politique de confidentialité
          </h3>
          <p className="text-gray-700 mb-4">
            Nous respectons la vie privée de nos utilisateurs et clients. Toutes
            les données sont traitées conformément au RGPD et stockées de façon
            sécurisée.
          </p>
          <h3 className="font-semibold text-lg mb-2 text-blue-800">
            Sécurité des données
          </h3>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>Chiffrement des données sensibles</li>
            <li>Authentification forte (2FA)</li>
            <li>Backups réguliers</li>
            <li>Audit de sécurité annuel</li>
            <li>Accès restreint aux données</li>
          </ul>
          <h3 className="font-semibold text-lg mb-2 text-blue-800">
            Conformité RGPD
          </h3>
          <p className="text-gray-700">
            Droit d’accès, de rectification et de suppression des données.
            Contactez-nous pour toute demande liée à vos données personnelles.
          </p>
        </div>
      </div>
    </section>
  );
}
