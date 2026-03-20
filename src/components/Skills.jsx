// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.section
      id="skills"
      className="py-20 px-4 bg-dark-100 border-0"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow-lg"
          variants={itemVariants}
        >
          Expertises de l’Agence Muamokel
        </motion.h2>
        <motion.p
          className="text-lg text-center text-gray-300 mb-10"
          variants={itemVariants}
        >
          Nos domaines d’excellence pour accompagner votre transformation
          digitale.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          <div className="bg-dark-200 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-purple mb-2">
              Développement web moderne
            </h3>
            <p className="text-gray-200">React, Node.js, Next.js</p>
          </div>
          <div className="bg-dark-200 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-purple mb-2">
              Cybersécurité & Audit
            </h3>
            <p className="text-gray-200">
              Sécurité, conformité, audit technique
            </p>
          </div>
          <div className="bg-dark-200 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-purple mb-2">
              Cloud & DevOps
            </h3>
            <p className="text-gray-200">AWS, Azure, Docker, CI/CD</p>
          </div>
          <div className="bg-dark-200 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-purple mb-2">
              UI/UX Design & Accessibilité
            </h3>
            <p className="text-gray-200">
              Design moderne, expérience utilisateur, accessibilité
            </p>
          </div>
          <div className="bg-dark-200 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-purple mb-2">
              Intégration API
            </h3>
            <p className="text-gray-200">
              Stripe, PayPal, EmailJS, API sur mesure
            </p>
          </div>
          <div className="bg-dark-200 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-purple mb-2">
              Maintenance & Optimisation
            </h3>
            <p className="text-gray-200">Performance, support, évolutivité</p>
          </div>
          <div className="bg-dark-200 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-purple mb-2">
              Conseil & Accompagnement digital
            </h3>
            <p className="text-gray-200">
              Stratégie, audit, transformation digitale
            </p>
          </div>
        </div>
        {/* Section Certifications & Partenaires */}
        <div className="mt-12 w-full">
          <h2 className="text-2xl font-bold text-purple mb-4 text-center">
            Certifications & Partenaires
          </h2>
          <ul className="list-disc list-inside text-gray-200 text-center">
            <li>AWS Certified Solutions Architect</li>
            <li>Microsoft Azure Fundamentals</li>
            <li>React Professional Developer</li>
            <li>Scrum Master & Agile Project Management</li>
            <li>Partenaires : Stripe, PayPal, Google Cloud</li>
          </ul>
        </div>
        {/* Section Méthodologie & Valeurs */}
        <div className="mt-12 w-full">
          <h2 className="text-2xl font-bold text-purple mb-4 text-center">
            Méthodologie & Valeurs
          </h2>
          <ul className="list-disc list-inside text-gray-200 text-center">
            <li>Transparence et communication</li>
            <li>Respect des délais et des engagements</li>
            <li>Innovation et formation continue</li>
            <li>Orientation client et satisfaction</li>
            <li>Agilité et adaptation</li>
          </ul>
        </div>
        {/* Section Témoignages clients */}
        <div className="mt-12 w-full">
          <h2 className="text-2xl font-bold text-purple mb-4 text-center">
            Témoignages clients
          </h2>
          <div className="flex flex-col gap-6 items-center">
            <blockquote className="bg-dark-200 rounded-xl p-6 shadow-lg text-gray-200 max-w-xl">
              “Muamokel a transformé notre infrastructure digitale avec
              professionnalisme et rapidité.”
              <br />
              <span className="text-purple font-semibold">
                — CEO, Startup Kinshasa
              </span>
            </blockquote>
            <blockquote className="bg-dark-200 rounded-xl p-6 shadow-lg text-gray-200 max-w-xl">
              “L’équipe Muamokel est à l’écoute et propose des solutions
              innovantes adaptées à nos besoins.”
              <br />
              <span className="text-purple font-semibold">
                — Responsable IT, PME
              </span>
            </blockquote>
          </div>
        </div>
        {/* Section Contact rapide */}
        <div className="mt-12 w-full text-center">
          <h2 className="text-2xl font-bold text-purple mb-4">
            Contactez-nous
          </h2>
          <p className="text-gray-200 mb-2">
            Pour un devis gratuit, une démonstration ou un rendez-vous,
            contactez l’agence Muamokel !
          </p>
          <p className="text-gray-200 mb-2">
            Pour un devis gratuit, une démonstration ou un rendez-vous,
            contactez l’agence Muamokel !
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple to-pink text-white rounded-lg font-semibold shadow-lg hover:scale-105 transition-all"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
