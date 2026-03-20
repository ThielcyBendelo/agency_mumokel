import React from 'react';
import NavbarSecured from '../components/NavbarSecured';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';

const partners = [
  {
    id: 1,
    name: 'Microsoft',
    logo: '/images/partners/microsoft.png',
    description: 'Partenaire Cloud et solutions professionnelles.',
  },
  {
    id: 2,
    name: 'Google',
    logo: '/images/partners/google.png',
    description: 'Partenaire Workspace et Cloud.',
  },
  {
    id: 3,
    name: 'AWS',
    logo: '/images/partners/aws.png',
    description: 'Certifié AWS Solutions Architect.',
  },
];

const certifications = [
  {
    id: 1,
    name: 'ISO 27001',
    logo: '/images/certifications/iso27001.png',
    description: 'Sécurité de l’information.',
  },
  {
    id: 2,
    name: 'Google Cloud Certified',
    logo: '/images/certifications/googlecloud.png',
    description: 'Expertise Cloud Google.',
  },
];

export default function PartnersPage() {
  return (
    <>
      <NavbarSecured />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">
          Partenaires & Certifications
        </h1>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Nos partenaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-16 mb-2"
                />
                <h3 className="text-lg font-bold mb-1">{partner.name}</h3>
                <p className="text-gray-700 text-center">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
              >
                <img src={cert.logo} alt={cert.name} className="h-12 mb-2" />
                <h3 className="text-lg font-bold mb-1">{cert.name}</h3>
                <p className="text-gray-700 text-center">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FAQSection />
      <Footer />
    </>
  );
}
