const profileImg = '/logoM.png';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import LazyImage from './LazyImage';
import GoogleMapsSection from './GoogleMapsSection';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <>
      <motion.section
        id="about"
        className="py-20 px-4 grid grid-cols-1 md:grid-cols-5 gap-10 items-start justify-center min-h-screen bg-dark-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* Profil à gauche */}
        <motion.div
          variants={imageVariants}
          whileHover={{
            scale: 1.08,
            rotate: [0, -3, 3, 0],
            transition: { duration: 0.3 },
          }}
          className="flex flex-col items-center md:items-start md:justify-start mb-8 col-span-1"
        >
          <LazyImage
            src={profileImg}
            alt="Logo Muamokel"
            className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-lg border-4 border-blue-500 bg-white mb-4"
            placeholder={
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-500/20 animate-pulse border-4 border-blue-500 mb-4 shadow-lg" />
            }
          />
        </motion.div>
        {/* Contenus à droite */}
        <div className="col-span-1 md:col-span-4 flex flex-col gap-8">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold mb-8 text-left bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow-lg"
            variants={textVariants}
          >
            À propos de l'agence
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-200 text-left leading-relaxed max-w-2xl mb-8"
            variants={textVariants}
          >
            Initié par la passion deux ingénieurs professionnels dépuis 2023, Mr BENDELO BOKUNGU Thielcy et Mr ILUNGA TSHIANYI Christian, qui a commencé par la conception et développements (Solutions digitales, cloud, sécurité, design et innovation pour
            entreprises et organisations. Développement web, cloud,
            cybersécurité, design UX/UI, conseil et accompagnement digital.). Nous continuons à développer notre activité en gérant de plus grande projets technologiques.
          </motion.p>
          <motion.p
            className="text-lg md:text-xl text-gray-200 text-left leading-relaxed max-w-2xl mb-8"
            variants={textVariants}
          >
            "MUAMOKEL" a été fondée en 2024 en République Démocratique du Congo (RDC), le nom représente cette envie des initiateurs de léguer un héritage technologie mooderne à la future génération. Habitué à méner de projet innovant en suivant une approche méthodique, de la définition des besoins à la livraison, en passant par le développement et les tests, tout en gérant les ressources et en assurant une communication et une collaboration constantes avec les clients et les équipes, MUAMOKEL s'efforce toujours d'améliorer la qualité de son travail en fournissant en permanence le meilleur service, ce qui donne non seulement la conception détaillée mais aussi en assurant de la conformité aux attentes initiales. 
          </motion.p>
              <motion.p
            className="text-lg md:text-xl text-gray-200 text-left leading-relaxed max-w-2xl mb-8"
            variants={textVariants}
          >
            L'agence des ingénieurs MUAMOKEL.COM travaille dans un esprit d'équipe où la délégation des compétences prend tout son sens . Un environnement familial, une équipe d'ingénieurs talentueux, chacun aménant son propre potentiel. Un bureau à taille humaine qui permet une proximité avec ses clients et collaborateurs. La grande expérience acquise de ses ingénieurs offre une grande connaissance des différents secteurs, une réactivité hors pair pour développer les projets quelques soient les besoins en répondant toujours aux attentes de manière irreprochable.
          </motion.p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={textVariants}
          >
            <div className="w-full">
              <h2 className="text-2xl font-bold text-purple mb-2 text-left">
                Expertise & Spécialisations
              </h2>
              <ul className="list-disc list-inside text-gray-200 text-left">
                <li>Développement web moderne (React, Node.js, Next.js)</li>
                <li>Cybersécurité et audit</li>
                <li>Cloud & DevOps (AWS, Azure, Docker, CI/CD)</li>
                <li>UI/UX Design et accessibilité</li>
                <li>Intégration API (Stripe, PayPal, EmailJS)</li>
                <li>Maintenance et optimisation de performance</li>
              </ul>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-bold text-purple mb-2 text-left">
                Expériences & Réalisations
              </h2>
              <ul className="list-disc list-inside text-gray-200 text-left">
                <li>+50 projets web et mobile livrés</li>
                <li>Clients internationaux (PME, startups, ONG)</li>
                <li>Plateformes e-commerce, SaaS, blogs, CRM</li>
                <li>Déploiement sécurisé sur cloud public et privé</li>
              </ul>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-bold text-purple mb-2 text-left">
                Certifications & Technologies
              </h2>
              <ul className="list-disc list-inside text-gray-200 text-left">
                <li>AWS Certified Solutions Architect</li>
                <li>Microsoft Azure Fundamentals</li>
                <li>React Professional Developer</li>
                <li>Scrum Master & Agile Project Management</li>
              </ul>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-bold text-purple mb-2 text-left">
                Valeurs & Méthodologie
              </h2>
              <ul className="list-disc list-inside text-gray-200 text-left">
                <li>Transparence et communication</li>
                <li>Respect des délais et des engagements</li>
                <li>Innovation et formation continue</li>
                <li>Orientation client et satisfaction</li>
              </ul>
            </div>
          </motion.div>
          <motion.p
            className="text-base md:text-lg text-gray-300 text-left mt-8"
            variants={textVariants}
          >
            <strong>Contactez-nous</strong> pour un devis gratuit, une
            démonstration, ou un rendez-vous dans nos bureaux à Kinshasa. Votre
            transformation digitale commence ici !
          </motion.p>
        </div>
      </motion.section>
      <GoogleMapsSection />
    </>
  );
}
