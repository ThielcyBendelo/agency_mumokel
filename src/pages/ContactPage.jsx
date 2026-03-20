import React from 'react';
import NavbarSecured from '../components/NavbarSecured';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';

export default function ContactPage() {
  return (
    <>
      <NavbarSecured />
      <Contact />
      <FAQ />
      <Footer />
    </>
  );
}
