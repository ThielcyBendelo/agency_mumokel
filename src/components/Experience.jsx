// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export default function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.section
      id="experience"
      className="py-20 px-4 bg-dark-100"
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
          Réalisations et Parcours Muamokel
        </motion.h2>
        <motion.p
          className="text-lg text-center text-gray-300 mb-10"
          variants={itemVariants}
        >
          Projets menés, clients accompagnés, certifications et succès.
        </motion.p>
        <motion.ul
          className="flex flex-col gap-6 w-full"
          variants={containerVariants}
        >
          <motion.li
            className="bg-dark-200 rounded-xl p-6 shadow-lg text-gray-200 text-lg"
            variants={itemVariants}
          >
            +50 projets web et mobile livrés
          </motion.li>
          <motion.li
            className="bg-dark-200 rounded-xl p-6 shadow-lg text-gray-200 text-lg"
            variants={itemVariants}
          >
            Clients internationaux (PME, startups, ONG)
          </motion.li>
          <motion.li
            className="bg-dark-200 rounded-xl p-6 shadow-lg text-gray-200 text-lg"
            variants={itemVariants}
          >
            Plateformes e-commerce, SaaS, blogs, CRM
          </motion.li>
          <motion.li
            className="bg-dark-200 rounded-xl p-6 shadow-lg text-gray-200 text-lg"
            variants={itemVariants}
          >
            Déploiement sécurisé sur cloud public et privé
          </motion.li>
          <motion.li
            className="bg-dark-200 rounded-xl p-6 shadow-lg text-gray-200 text-lg"
            variants={itemVariants}
          >
            Certifications (AWS, Azure, React, Scrum)
          </motion.li>
          <motion.li
            className="bg-dark-200 rounded-xl p-6 shadow-lg text-gray-200 text-lg"
            variants={itemVariants}
          >
            Méthodologie agile, respect des délais, innovation continue
          </motion.li>
        </motion.ul>
      </div>
    </motion.section>
  );
}
