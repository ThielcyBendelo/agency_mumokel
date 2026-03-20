import React, { useState } from 'react';

const faqData = [
  {
    question: 'Quels types de projets réalisez-vous ?',
    answer:
      'Nous réalisons des sites web, applications métiers, solutions cloud, maintenance informatique, cybersécurité et transformation digitale pour entreprises.',
  },
  {
    question: 'Comment demander un devis pour un projet ?',
    answer:
      'Contactez-nous via le formulaire en ligne ou par email, en décrivant vos besoins. Nous vous répondrons sous 24h avec une proposition personnalisée.',
  },
  {
    question: 'Quels sont vos délais de livraison ?',
    answer:
      'Les délais varient selon la complexité du projet : de quelques jours pour des sites vitrines à plusieurs semaines pour des solutions sur mesure.',
  },
  {
    question: 'Proposez-vous un support technique après livraison ?',
    answer:
      "Oui, nous assurons un support technique, la maintenance et l'évolution de vos solutions informatiques après la mise en production.",
  },
  {
    question: "Quels secteurs d'activité accompagnez-vous ?",
    answer:
      'Nous travaillons avec des PME, startups, associations, institutions et grands comptes dans tous les secteurs.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-6 text-center">
        FAQ - Questions fréquentes
      </h2>
      <div className="max-w-2xl mx-auto">
        {faqData.map((item, idx) => (
          <div key={idx} className="mb-4 border rounded-lg bg-white shadow">
            <button
              className="w-full text-left px-4 py-3 font-semibold text-purple-700 focus:outline-none"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              {item.question}
            </button>
            {openIndex === idx && (
              <div className="px-4 pb-4 text-gray-700">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
