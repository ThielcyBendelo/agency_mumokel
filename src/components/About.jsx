import { motion } from 'framer-motion';
import LazyImage from './LazyImage';
import GoogleMapsSection from './GoogleMapsSection';
import { FaShieldAlt, FaCode, FaCloud, FaUsers } from 'react-icons/fa';

const profileImg = '/logoM.png';

export default function About() {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const expertises = [
    { title: "Expertise & Spécialisations", icon: <FaCode />, items: ["React, Node.js, Next.js", "UI/UX Design", "Intégration API"] },
    { title: "Cloud & Sécurité", icon: <FaShieldAlt />, items: ["Cybersécurité & Audit", "AWS, Azure, Docker", "CI/CD & DevOps"] },
    { title: "Expériences", icon: <FaCloud />, items: ["+ projets livrés", "Clients Internationaux", "SaaS & E-commerce"] },
    { title: "Valeurs", icon: <FaUsers />, items: ["Transparence", "Agilité (Scrum)", "Innovation continue"] }
  ];

  return (
    <div className="bg-[#0a0a0c] text-white">
      <motion.section
        id="about"
        className="max-w-7xl mx-auto py-24 px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* COLONNE GAUCHE : Image & Branding */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
            <motion.div 
              variants={textVariants}
              className="sticky top-32 space-y-8 text-center lg:text-left"
            >
              <div className="relative inline-block">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-purple-600 rounded-full blur opacity-40 animate-pulse"></div>
                <LazyImage
                  src={profileImg}
                  alt="Logo Muamokel"
                  className="relative w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-2 border-white/10 bg-gray-900 shadow-2xl"
                />
              </div>
              <div>
                <h2 className="text-3xl font-black tracking-tighter">MUAMOKEL</h2>
                <p className="text-red-500 font-mono text-sm tracking-[0.2em] uppercase">Est. 2024 • RDC</p>
              </div>
            </motion.div>
          </div>

          {/* COLONNE DROITE : Contenu */}
          <div className="lg:col-span-8 space-y-12">
            <motion.div variants={textVariants} className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-black leading-none uppercase italic tracking-tighter">
                L'héritage <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">Technologique</span>
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed font-light">
  Initié par une synergie d'ingénieurs passionnés, 
  <span className="text-white font-medium"> MUAMOKEL</span> est née de l'ambition de bâtir un écosystème technologique d'excellence et de léguer un héritage numérique moderne à la future génération en République Démocratique du Congo.
</p>
<p className="text-gray-400 leading-relaxed">
  Véritable partenaire stratégique, nous propulsons la transformation digitale des entreprises et institutions grâce à une ingénierie logicielle rigoureuse : du conseil architectural à la livraison de solutions sécurisées, scalables et parfaitement alignées sur vos défis métiers.
</p>
<p className="text-gray-400 leading-relaxed">
  Notre force repose sur une culture d'innovation continue et d'agilité technologique. En combinant la maîtrise du Cloud, de l'Intelligence Artificielle et du développement sur-mesure, nous concevons des infrastructures résilientes prêtes à soutenir la croissance de nos clients dans un marché en perpétuelle mutation.
</p>
<p className="text-gray-400 leading-relaxed">
  Au-delà des lignes de code, nous investissons activement dans le capital humain local. À travers nos projets, nous formons et intégrons les meilleurs talents tech de la RDC, créant ainsi une passerelle solide entre l'excellence académique et les exigences de l'industrie logicielle internationale.
</p>


            </motion.div>

            {/* GRILLE D'EXPERTISE (Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">
              {expertises.map((exp, idx) => (
                <motion.div
                  key={idx}
                  variants={textVariants}
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-red-500/50 transition-all group"
                >
                  <div className="text-3xl text-red-500 mb-4 group-hover:scale-110 transition-transform">{exp.icon}</div>
                  <h3 className="text-xl font-bold mb-4">{exp.title}</h3>
                  <ul className="space-y-2">
                    {exp.items.map((item, i) => (
                      <li key={i} className="text-gray-500 text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500/50"></span> {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* CTA Final */}
            <motion.div 
              variants={textVariants}
              className="p-8 rounded-3xl bg-gradient-to-r from-red-600/10 to-transparent border border-red-600/20"
            >
              <p className="text-lg text-gray-300">
                <span className="text-white font-bold italic">Votre transformation commence ici.</span> Contactez-nous pour un devis gratuit ou un rendez-vous dans nos bureaux à Kinshasa.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
        <GoogleMapsSection />
      </div>
  );
}
