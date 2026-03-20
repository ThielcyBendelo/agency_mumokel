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
      <div className="relative min-h-screen pb-16 overflow-hidden">
        {/* Professional transparent background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-slate-800/15 to-slate-900/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]" />
        </div>

        {/* Content */}
        <div className="relative z-20">
          <About />
          <FAQ />
        </div>
      </div>
      <Footer />
    </>
  );
}
