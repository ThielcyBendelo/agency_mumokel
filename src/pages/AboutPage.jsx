import React from 'react';
import NavbarSecured from '../components/NavbarSecured';
import About from '../components/About';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';
import RippleGrid from '../components/RippleGrid';

export default function AboutPage() {
  return (
    <>
      <NavbarSecured />
 

        {/* Content */}
    
          <About />
          <FAQ />

      <Footer />
    </>
  );
}
