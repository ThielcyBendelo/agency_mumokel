import React, { useState } from 'react';
import NavbarSecured from '../components/NavbarSecured';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';

const team = [
  {
    name: 'Thielcy Bendelo',
    role: 'Ingénieur Logiciel de l’agence',
    avatar: '/Irbendelo.jpg',
    bio: "Ingénieur logiciel spécialisé en développement web, cloud, sécurité et solutions sur mesure pour l'agence Muamokel. Passionné par l'innovation, la qualité et l'accompagnement digital.",
    skills: [
      'Développement web',
      'Cloud',
      'Sécurité',
      'Architecture logicielle',
      'DevOps',
      'AI',
    ],
    certifications: ['AWS Certified', 'React Pro', 'Scrum Master'],
    experience: '10 ans, +100 projets livrés',
    linkedin: 'https://www.linkedin.com/in/irbendelo/',
    github: 'https://github.com/irbendelo',
    email: 'irbendelo@muamokel.com',
    available: true,
    highlight: true,
  },
  {
    name: 'Christian Tshianyi',
    role: 'Ingénieur en réseaux',
    avatar: '/IrChrist.jpg',
    bio: "Ingénieur en réseaux spécialisé dans l'architecture, la sécurité et la gestion des infrastructures informatiques. Expert en optimisation et déploiement de solutions réseau pour l'agence Muamokel.",
    skills: ['Réseaux', 'Sécurité', 'Infrastructure', 'Cisco', 'Firewall'],
    certifications: ['Cisco Certified', 'ISO 27001'],
    experience: '8 ans, +70 projets réseaux',
    linkedin: '',
    github: '',
    email: 'christian@muamokel.com',
    available: true,
  },
  // Profils génériques ajoutés
  {
    name: 'Alex Dupont',
    role: 'Designer UI/UX',
    avatar: '/images/generic-avatar-1.png',
    bio: "Spécialiste de l'expérience utilisateur et du design moderne.",
    skills: ['Design', 'UI/UX', 'Prototypage'],
    certifications: ['Adobe XD', 'Figma Pro'],
    experience: '5 ans, +30 projets design',
    linkedin: '',
    github: '',
    email: 'alex.dupont@example.com',
    available: false,
  },
  {
    name: 'Sophie Martin',
    role: 'Développeuse Frontend',
    avatar: '/images/generic-avatar-2.png',
    bio: "Passionnée par la création d'interfaces réactives et accessibles.",
    skills: ['React', 'Accessibility', 'CSS'],
    certifications: ['React Pro', 'Web Accessibility'],
    experience: '4 ans, +25 interfaces développées',
    linkedin: '',
    github: '',
    email: 'sophie.martin@example.com',
    available: false,
  },
  {
    name: 'Jean Petit',
    role: 'Chef de projet',
    avatar: '/images/generic-avatar-3.png',
    bio: 'Organisateur et coordinateur de projets digitaux, orienté résultats.',
    skills: ['Gestion de projet', 'Scrum', 'Communication'],
    certifications: ['PMP', 'Scrum Master'],
    experience: '6 ans, +40 projets coordonnés',
    linkedin: '',
    github: '',
    email: 'jean.petit@example.com',
    available: false,
  },
  {
    name: 'Emmanuel Mputu',
    role: 'Ingénieur en maintenance et système',
    avatar: '/IrEmma.jpg',
    bio: 'Ingénieur en maintenance et systèmes, expert en gestion, optimisation et sécurisation des parcs informatiques. Spécialiste support technique et déploiement de solutions pour Muamokel.',
    skills: ['Maintenance', 'Systèmes', 'Support', 'Windows', 'Linux'],
    certifications: ['ITIL', 'Microsoft Certified'],
    experience: '7 ans, +60 systèmes gérés',
    linkedin: '',
    github: '',
    email: 'emmanuel@muamokel.com',
    available: true,
  },
  {
    name: 'Merveille Suka',
    role: 'Lead Designer UX/UI',
    avatar: '/IrMerveille.jpg',
    bio: "Lead Designer UX/UI, spécialiste en création d'expériences utilisateurs, design d'interfaces et branding pour Muamokel. Passionné par l'innovation visuelle et l'accessibilité.",
    skills: ['UX/UI', 'Design', 'Branding', 'Figma', 'Accessibilité'],
    certifications: ['UX Designer', 'Adobe Certified'],
    experience: '9 ans, +80 interfaces créées',
    linkedin: '',
    github: '',
    email: 'merveille@muamokel.com',
    available: true,
  },
  {
    name: 'Louiscar Ingeba',
    role: 'Chargé de Relation Public',
    avatar: '/ChargéRP.jpg',
    bio: "Chargé de Relation Public, expert en communication, gestion d'événements et relations partenaires pour Muamokel. Spécialiste de la visibilité et de l'image de l'agence.",
    skills: [
      'Communication',
      'Relations publiques',
      'Événementiel',
      'Partenariats',
      'Médias',
    ],
    certifications: ['Communication Pro', 'Event Manager'],
    experience: '6 ans, +50 événements organisés',
    linkedin: '',
    github: '',
    email: 'louiscar@muamokel.com',
    available: true,
  },
];

export default function TeamDetailPage() {
  const [selected, setSelected] = useState(0);
  return (
    <>
      <NavbarSecured />
      <section className="py-10 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Notre équipe</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            {team.map((member, idx) => (
              <button
                key={member.name}
                className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  selected === idx
                    ? 'border-purple-500 ring-2 ring-purple-300'
                    : 'border-gray-200'
                }`}
                onClick={() => setSelected(idx)}
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-28 h-28 rounded-full border-4"
                  style={
                    [
                      'Thielcy Bendelo',
                      'Christian Tshianyi',
                      'Louiscar Ingeba',
                    ].includes(member.name)
                      ? { objectFit: 'contain', background: '#fff' }
                      : member.highlight
                      ? { objectFit: 'cover', background: '#fff' }
                      : { objectFit: 'cover' }
                  }
                />
                <div>
                  <div className="font-bold text-lg">{member.name}</div>
                  <div className="text-purple-700 font-semibold">
                    {member.role}
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <img
              src={team[selected].avatar}
              alt={team[selected].name}
              className="w-40 h-40 rounded-full mb-4 border-4 shadow"
              style={
                [
                  'Thielcy Bendelo',
                  'Christian Tshianyi',
                  'Louiscar Ingeba',
                ].includes(team[selected].name)
                  ? { objectFit: 'contain', background: '#fff' }
                  : team[selected].highlight
                  ? { objectFit: 'cover', background: '#fff' }
                  : { objectFit: 'cover' }
              }
            />
            <h3 className="text-2xl font-bold mb-2">{team[selected].name}</h3>
            <div className="text-purple-700 font-semibold mb-2">
              {team[selected].role}
            </div>
            <div className="text-gray-700 mb-4 text-center">
              {team[selected].bio}
            </div>
            <div className="flex flex-wrap gap-2 mb-2 justify-center">
              {team[selected].skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-2 justify-center">
              {team[selected].certifications.map((cert, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold"
                >
                  {cert}
                </span>
              ))}
            </div>
            <div className="text-gray-800 mb-2">
              {team[selected].experience}
            </div>
            <div className="flex gap-4 mt-4">
              {team[selected].linkedin && (
                <a
                  href={team[selected].linkedin}
                  target="_blank"
                  rel="noopener"
                  aria-label="LinkedIn"
                  className="text-blue-700 hover:text-blue-900"
                >
                  <svg width="24" height="24" fill="currentColor">
                    <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75c.97 0 1.75.79 1.75 1.75s-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.07-.93-2-2-2s-2 .93-2 2v4.5h-3v-9h3v1.22c.41-.6 1.36-1.22 2.25-1.22 1.93 0 3.75 1.57 3.75 4.5v4.5z" />
                  </svg>
                </a>
              )}
              {team[selected].github && (
                <a
                  href={team[selected].github}
                  target="_blank"
                  rel="noopener"
                  aria-label="GitHub"
                  className="text-gray-900 hover:text-black"
                >
                  <svg width="24" height="24" fill="currentColor">
                    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.93.58.11.79-.25.79-.56v-2.02c-3.2.7-3.87-1.54-3.87-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.75-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.1 11.1 0 012.92-.39c.99.01 1.99.13 2.92.39 2.22-1.49 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.41-5.27 5.7.42.36.8 1.09.8 2.2v3.26c0 .31.21.67.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" />
                  </svg>
                </a>
              )}
              {team[selected].email && (
                <a
                  href={`mailto:${team[selected].email}`}
                  aria-label="Email"
                  className="text-red-700 hover:text-red-900"
                >
                  <svg width="24" height="24" fill="currentColor">
                    <path d="M12 13.5l8-6.5H4l8 6.5zm0 2.5l-8-6.5V18h16v-8.5l-8 6.5z" />
                  </svg>
                </a>
              )}
            </div>
            <div className="mt-4">
              {team[selected].available ? (
                <span className="inline-block bg-green-200 text-green-900 rounded-full px-4 py-1 text-sm font-semibold">
                  Disponible
                </span>
              ) : (
                <span className="inline-block bg-gray-300 text-gray-900 rounded-full px-4 py-1 text-sm font-semibold">
                  Indisponible
                </span>
              )}
            </div>
          </div>
        </div>
      </section>
      <FAQ />
      <Footer />
    </>
  );
}
