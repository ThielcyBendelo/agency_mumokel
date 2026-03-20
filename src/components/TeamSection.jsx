import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
// ...existing code...

const team = [
  {
    name: 'Ir Bendelo',
    role: 'Responsable Projets Digitaux',
    bio: 'Coordination de projets web et cloud pour entreprises. Spécialiste transformation digitale et relation client.',
    avatar: '/IrBendelo.jpg',
    linkedin: 'https://www.linkedin.com/in/irbendelo/',
    skills: ['Gestion de projet', 'Cloud', 'Relation client', 'Agilité'],
    badge: 'Chef Projet',
  },
  {
    name: 'Mohamed Ben Salah',
    role: 'Expert Sécurité & DevOps',
    bio: 'Automatisation, sécurité, CI/CD, infrastructures cloud. Garant de la performance et de la protection des données clients.',
    avatar: '/assets/icon-cloud.png',
    linkedin: 'https://www.linkedin.com/in/mohamedbensalah/',
    skills: ['DevOps', 'Sécurité', 'Docker', 'CI/CD'],
    badge: 'DevOps Pro',
  },
  {
    name: 'Laura Garcia',
    role: 'Product Owner & Scrum Master',
    bio: 'Gestion de produit, organisation agile, satisfaction client. Experte en pilotage de projets informatiques.',
    avatar: '/assets/icon-design.png',
    linkedin: 'https://www.linkedin.com/in/lauragarcia/',
    skills: ['Agile', 'Scrum', 'Communication', 'Gestion Produit'],
    badge: 'Scrum Master',
  },
  {
    name: 'Fatou Ndiaye',
    role: 'Développeuse Frontend & Animatrice Tech',
    bio: "Spécialiste React, animations web, accessibilité. Passionnée par l'éducation et la vulgarisation tech.",
    avatar: 'https://randomuser.me/api/portraits/women/49.jpg',
    linkedin: 'https://www.linkedin.com/in/fatoundiaye/',
    skills: ['React', 'GSAP', 'Accessibilité', 'Pédagogie'],
    badge: 'Animatrice Tech',
  },
  {
    name: 'Mohamed Ben Salah',
    role: 'DevOps & Backend Engineer',
    bio: 'Automatisation, CI/CD, APIs robustes. Garant de la performance et de la sécurité des infrastructures.',
    avatar: 'https://randomuser.me/api/portraits/men/50.jpg',
    linkedin: 'https://www.linkedin.com/in/mohamedbensalah/',
    skills: ['Node.js', 'Docker', 'CI/CD', 'Sécurité'],
    badge: 'DevOps Pro',
  },
  {
    name: 'Laura Garcia',
    role: 'Product Owner & Scrum Master',
    bio: 'Gestion de projet agile, communication, vision produit. Experte en organisation et satisfaction client.',
    avatar: 'https://randomuser.me/api/portraits/women/51.jpg',
    linkedin: 'https://www.linkedin.com/in/lauragarcia/',
    skills: ['Agile', 'Scrum', 'Communication', 'Gestion Produit'],
    badge: 'Scrum Master',
  },
];

function TeamSection() {
  return (
    <section
      className="py-16 px-4 bg-gradient-to-b from-white via-blue-50 to-gray-50"
      id="team"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-blue-900 mb-6 drop-shadow-lg animate-pulse">
          L’équipe Muamokel
        </h2>
        <p className="text-lg text-gray-700 mb-10 animate-fade-in">
          Des experts en digital, cloud, sécurité et design, réunis pour
          propulser votre entreprise vers l’innovation et la performance.
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center border border-blue-100 hover:shadow-2xl transition"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, type: 'spring', stiffness: 120 }}
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-32 h-32 rounded-full mb-4 border-4 border-blue-200 shadow"
              />
              <div className="font-bold text-blue-800 text-lg mb-1 flex items-center gap-2">
                {member.name}
                <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-semibold">
                  {member.badge}
                </span>
              </div>
              <div className="text-sm text-purple-700 mb-2">{member.role}</div>
              <div className="mb-2 flex flex-wrap gap-2 justify-center">
                {member.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs font-semibold shadow"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <p className="text-gray-700 text-center mb-2">{member.bio}</p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800 text-sm"
              >
                LinkedIn
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamSection;
