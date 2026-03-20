import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
} from 'react-icons/fa';
import { contact } from '../assets/assets.js';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialIcons = {
    Email: FaEnvelope,
    LinkedIn: FaLinkedin,
    GitHub: FaGithub,
    Instagram: FaInstagram,
    Facebook: FaFacebook,
    WhatsApp: FaWhatsapp,
  };


  return (
    <footer className="bg-dark-200 text-gray-300 py-8 font-saira" role="contentinfo" aria-label="Pied de page agence informatique">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo et Description agence */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold text-white tracking-wide" style={{fontFamily: 'Antonio, Saira, sans-serif'}}>
                Muamokel<span className="text-pink-400">.Tech</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs">
              Agence de développements informatiques : développement web, cloud, cybersécurité, design UX/UI, conseil et accompagnement digital.
            </p>
          </div>

          {/* Liens rapides */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4" id="footer-quick-links">Liens Rapides</h4>
            <ul className="space-y-2" aria-labelledby="footer-quick-links">
              <li>
                <Link to="/about" className="hover:text-purple transition-colors">À propos</Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-purple transition-colors">Support</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-purple transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Réseaux sociaux */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-4">Nous Suivre</h4>
            <div className="flex justify-center md:justify-end space-x-4">
              {contact
                .filter((item) => !['Instagram', 'Facebook', 'WhatsApp'].includes(item.label))
                .map((item) => {
                  const Icon = socialIcons[item.label];
                  if (!Icon) return null;
                  // If the contact link is an email address (no protocol), convert to mailto
                  let href = item.link;
                  if (item.label === 'Email' && !/^mailto:/i.test(href)) {
                    href = `mailto:${href}`;
                  }
                  return (
                    <a
                      key={item.label}
                      href={href}
                      target={href.startsWith('mailto:') ? undefined : '_blank'}
                      rel={
                        href.startsWith('mailto:')
                          ? undefined
                          : 'noopener noreferrer'
                      }
                      className="text-2xl hover:text-purple transition-colors hover:scale-110 transform duration-200"
                      aria-label={item.label}
                    >
                      <Icon />
                    </a>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Copyright agence */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>© {currentYear} Muamokel.Tech | Agence de développements informatiques. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
