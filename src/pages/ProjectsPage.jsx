import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaEye, FaGithub, FaExternalLinkAlt, FaCalendarAlt, FaUsers, FaStar, FaCode, FaRocket, FaShieldAlt, FaCloud, FaMobile, FaDesktop, FaCog, FaCheckCircle, FaClock, FaUser, FaQuoteLeft, FaShare, FaHeart, FaArrowRight, FaTimes } from 'react-icons/fa';
import NavbarSecured from '../components/NavbarSecured';
import Footer from '../components/Footer';
import ProjetSimple from '../components/ProjetSimple';
import FAQ from '../components/FAQ';
import { projets } from '../assets/assets.js';

export default function ProjectsPage() {
  return (
    <>
      <NavbarSecured />
      <ProjetSimple />
      <FAQ />
      <Footer />
    </>
  );
}
