import React from 'react';
import NavbarSecured from '../components/NavbarSecured';
import Services from '../components/Services';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';
import RippleGrid from '../components/RippleGrid';

export default function ServicesPage() {
  return (
    <>
      <NavbarSecured />

        {/* Content */}
          <Services />
          <FAQ />
      <Footer />
    </>
  );
}
