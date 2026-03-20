import React from 'react';
import NavbarSecured from '../components/NavbarSecured';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';

// Exemple de projets (à remplacer par vos données réelles)
const projects = [
  {
    id: 1,
    title: 'Refonte site e-commerce',
    image: '/images/project1.jpg',
    description: 'Migration vers React, optimisation SEO, intégration Stripe.',
    client: 'Boutique Paris',
    result: 'Augmentation du trafic de 40%',
    testimonial: 'Equipe très professionnelle et réactive.',
  },
  {
    id: 2,
    title: 'Application mobile RH',
    image: '/images/project2.jpg',
    description: 'Développement d’une app RH pour gestion des congés.',
    client: 'Startup Lyon',
    result: 'Réduction du temps de traitement de 60%',
    testimonial: 'Solution sur-mesure, conforme à nos attentes.',
  },
];

export default function Portfolio() {
  return (
    <>
      <NavbarSecured />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Nos réalisations</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
      <FAQSection />
      <Footer />
    </>
  );
}
