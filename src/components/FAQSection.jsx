import React from 'react';

const faqs = [
  {
    question: 'Quels types de projets réalisez-vous ?',
    answer:
      'Nous créons des sites web, applications mobiles, solutions cloud, design UI/UX, et proposons des services de cybersécurité et maintenance.',
  },
  {
    question: 'Quels sont vos délais de livraison ?',
    answer:
      'Les délais varient selon le projet : site vitrine (2-4 semaines), e-commerce (3-6 semaines), application mobile (3-6 semaines), etc.',
  },
  {
    question: 'Proposez-vous un accompagnement après livraison ?',
    answer:
      'Oui, nous assurons un support technique, des mises à jour et une maintenance selon le contrat choisi.',
  },
  {
    question: 'Comment garantir la sécurité de mon projet ?',
    answer:
      'Nous réalisons des audits, mettons en place des protocoles de sécurité, et assurons la conformité RGPD.',
  },
];

function FAQSection() {
  return (
    <section
      className="py-16 px-4 bg-gradient-to-b from-gray-50 via-white to-blue-50"
      id="faq"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-extrabold text-blue-900 mb-6 drop-shadow-lg text-center">
          FAQ
        </h2>
        <p className="text-lg text-gray-700 mb-10 text-center">
          Questions fréquentes sur nos services et notre accompagnement.
        </p>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="bg-white rounded-xl shadow p-4 border border-blue-100"
            >
              <summary className="font-semibold text-blue-800 cursor-pointer text-lg">
                {faq.question}
              </summary>
              <div className="mt-2 text-gray-700 text-base">{faq.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
