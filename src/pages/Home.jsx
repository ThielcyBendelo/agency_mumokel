import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TechnologiesSection from '../components/TechnologiesSection';
import NavbarSecured from '../components/NavbarSecured';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import PortfolioSection from '../components/PortfolioSection';
import ProcessSection from '../components/ProcessSection';
import ProfessionalSidebar from '../components/ProfessionalSidebar';
import FAQ from '../components/FAQ';

export default function Home() {
  const [isProfessionalSidebarOpen, setIsProfessionalSidebarOpen] = useState(false);

  return (
    <>
      <ProfessionalSidebar
        isOpen={isProfessionalSidebarOpen}
        onClose={() => setIsProfessionalSidebarOpen(false)}
      />

      {/* Advanced CSS Grid Layout with Named Grid Areas */}
      <div className="min-h-screen grid grid-cols-[1fr] grid-rows-[auto_1fr_auto] gap-0"
           style={{
             gridTemplateAreas: `
               "header"
               "main"
               "footer"
             `
           }}>

        {/* Navigation - Fixed Header with Grid Area */}
        <motion.header
          className="sticky top-0 z-50"
          style={{ gridArea: 'header' }}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <NavbarSecured onProfessionalMenuClick={() => setIsProfessionalSidebarOpen(true)} />
        </motion.header>

        {/* Main Content - Advanced CSS Grid with Subgrids and Template Areas */}
        <main className="relative overflow-hidden"
              style={{
                gridArea: 'main',
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gridTemplateRows: 'repeat(5, auto)',
                gridTemplateAreas: `
                  "hero hero hero hero hero hero hero hero hero hero hero hero"
                  "portfolio portfolio portfolio portfolio portfolio portfolio portfolio portfolio portfolio portfolio portfolio portfolio"
                  "process process process process process process process process process process process process"
                  "tech tech tech tech tech tech tech tech tech tech tech tech"
                  "faq faq faq faq faq faq faq faq faq faq faq faq"
                `,
                gap: '0'
              }}>

          {/* Hero Section - Full Width Grid Area */}
          <motion.section
            style={{ gridArea: 'hero' }}
            initial={{
              opacity: 0,
              scale: 0.95,
              boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.02)"
            }}
            animate={{
              opacity: 1,
              scale: 1,
              boxShadow: [
                "0 4px 20px -2px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.02)",
                "0 20px 50px -10px rgba(0, 0, 0, 0.15), 0 0 25px rgba(59, 130, 246, 0.06), 0 0 50px rgba(147, 51, 234, 0.04)",
                "0 4px 20px -2px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.02)"
              ]
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 35px 80px -20px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.08), 0 0 60px rgba(59, 130, 246, 0.12), 0 0 100px rgba(147, 51, 234, 0.08), 0 0 150px rgba(236, 72, 153, 0.06)"
            }}
            className="relative"
          >
            <Hero />
          </motion.section>

          {/* Portfolio Section - Full Width Grid Area */}
          <motion.section
            style={{ gridArea: 'portfolio' }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 35px 80px -20px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.08), 0 0 50px rgba(34, 197, 94, 0.2), 0 0 100px rgba(59, 130, 246, 0.15), 0 0 150px rgba(16, 185, 129, 0.1)"
            }}
            animate={{
              boxShadow: [
                "0 15px 35px -8px rgba(0, 0, 0, 0.3), 0 0 20px rgba(34, 197, 94, 0.1)",
                "0 25px 60px -15px rgba(0, 0, 0, 0.4), 0 0 30px rgba(34, 197, 94, 0.15), 0 0 50px rgba(59, 130, 246, 0.1)",
                "0 15px 35px -8px rgba(0, 0, 0, 0.3), 0 0 20px rgba(34, 197, 94, 0.1)"
              ]
            }}
            transition={{
              whileInView: { duration: 0.8, delay: 0.2 },
              animate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          >
            {/* Advanced Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-emerald-800/5 to-teal-900/10"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.08),transparent_50%)]"></div>

            {/* Dynamic Border Glow */}
            <div className="absolute inset-0 rounded-lg border border-green-500/20 shadow-[inset_0_0_20px_rgba(34,197,94,0.1)]"></div>

            <PortfolioSection />
          </motion.section>

          {/* Process Section - Full Width Grid Area */}
          <motion.section
            style={{
              gridArea: 'process'
            }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 35px 80px -20px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.08), 0 0 50px rgba(249, 115, 22, 0.2), 0 0 100px rgba(59, 130, 246, 0.15), 0 0 150px rgba(234, 88, 12, 0.1)"
            }}
            animate={{
              boxShadow: [
                "0 15px 35px -8px rgba(0, 0, 0, 0.3), 0 0 20px rgba(249, 115, 22, 0.1)",
                "0 25px 60px -15px rgba(0, 0, 0, 0.4), 0 0 30px rgba(249, 115, 22, 0.15), 0 0 50px rgba(59, 130, 246, 0.1)",
                "0 15px 35px -8px rgba(0, 0, 0, 0.3), 0 0 20px rgba(249, 115, 22, 0.1)"
              ]
            }}
            transition={{
              whileInView: { duration: 0.8, delay: 0.3 },
              animate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          >
            {/* Advanced Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-900/10 via-amber-800/5 to-red-900/10"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(234,88,12,0.08),transparent_50%)]"></div>

            {/* Dynamic Border Glow */}
            <div className="absolute inset-0 rounded-lg border border-orange-500/20 shadow-[inset_0_0_20px_rgba(249,115,22,0.1)]"></div>

            <ProcessSection />
          </motion.section>

          {/* Technologies Section - Full Width with Advanced CSS Grid Masonry */}
          <motion.section
            style={{ gridArea: 'tech' }}
            className="relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05), 0 0 30px rgba(139, 92, 246, 0.15), 0 0 60px rgba(59, 130, 246, 0.1)"
            }}
            animate={{
              boxShadow: [
                "0 8px 25px -5px rgba(0, 0, 0, 0.12)",
                "0 12px 35px -8px rgba(0, 0, 0, 0.18), 0 0 20px rgba(139, 92, 246, 0.08)",
                "0 8px 25px -5px rgba(0, 0, 0, 0.12)"
              ]
            }}
            transition={{
              whileInView: { duration: 0.8, delay: 0.4 },
              animate: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            {/* Advanced CSS Grid Masonry Background */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="h-full"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                  gridTemplateRows: 'masonry',
                  gap: '2px'
                }}
              >
                {Array.from({ length: 48 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="bg-gradient-to-br from-purple-200/20 to-pink-200/20 border border-purple-300/30"
                    style={{
                      height: `${Math.random() * 100 + 50}px`,
                      gridRowEnd: `span ${Math.floor(Math.random() * 3) + 1}`
                    }}
                    initial={{ opacity: 0, scale: 0, rotate: -10 }}
                    animate={{
                      opacity: 0.3,
                      scale: 1,
                      rotate: 0
                    }}
                    transition={{
                      delay: i * 0.02,
                      duration: 0.8,
                      type: "spring",
                      stiffness: 120
                    }}
                    whileHover={{
                      opacity: 0.6,
                      scale: 1.1,
                      rotate: Math.random() * 10 - 5,
                      transition: { duration: 0.3 }
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Interactive Grid Hexagons */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div
                className="h-full w-full"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
                  gridTemplateRows: 'repeat(auto-fit, minmax(70px, 1fr))',
                  transform: 'rotate(30deg) scale(1.2)'
                }}
              >
                {Array.from({ length: 60 }).map((_, i) => (
                  <motion.div
                    key={`hex-${i}`}
                    className="relative"
                    style={{
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                    }}
                  >
                    <motion.div
                      className="w-full h-full bg-gradient-to-br from-purple-400/10 to-pink-400/10 border border-purple-300/20"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 0.4, 0],
                        scale: [0.8, 1.2, 0.8],
                        rotate: [0, 180, 360]
                      }}
                      transition={{
                        delay: i * 0.15,
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Dynamic Wave Pattern */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full opacity-5" viewBox="0 0 1200 800">
                <defs>
                  <pattern id="wavePattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    <motion.path
                      d="M0,50 Q25,0 50,50 T100,50"
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                      className="text-purple-400"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#wavePattern)" />
              </svg>
            </div>

            {/* CSS Grid Fractal Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(16, 1fr)',
                  gridTemplateRows: 'repeat(16, 1fr)',
                  height: '100%',
                  width: '100%'
                }}
              >
                {Array.from({ length: 256 }).map((_, i) => {
                  const row = Math.floor(i / 16);
                  const col = i % 16;
                  const distance = Math.sqrt((row - 8) ** 2 + (col - 8) ** 2);
                  return (
                    <motion.div
                      key={`fractal-${i}`}
                      className="border border-purple-200/30"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: Math.max(0.1, 1 - distance / 12),
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        delay: i * 0.005,
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                  );
                })}
              </div>
            </div>

            <TechnologiesSection />
          </motion.section>

          {/* FAQ Section - Full Width Grid Area */}
          <motion.section
            style={{ gridArea: 'faq' }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05), 0 0 30px rgba(168, 85, 247, 0.15), 0 0 60px rgba(59, 130, 246, 0.1)"
            }}
            animate={{
              boxShadow: [
                "0 8px 25px -5px rgba(0, 0, 0, 0.12)",
                "0 12px 35px -8px rgba(0, 0, 0, 0.18), 0 0 20px rgba(168, 85, 247, 0.08)",
                "0 8px 25px -5px rgba(0, 0, 0, 0.12)"
              ]
            }}
            transition={{
              whileInView: { duration: 0.8, delay: 0.5 },
              animate: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative"
          >
            <FAQ />
          </motion.section>
        </main>

        {/* Footer - Full Width Grid Area */}
        <motion.footer
          style={{ gridArea: 'footer' }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Footer />
        </motion.footer>
      </div>

      {/* Advanced Floating Elements with CSS Grid Positioning */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* CSS Grid for Floating Elements */}
        <div
          className="absolute inset-0"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(10, 1fr)',
            gridTemplateRows: 'repeat(10, 1fr)',
            gap: '10px'
          }}
        >
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full"
              style={{
                gridColumn: Math.floor(Math.random() * 10) + 1,
                gridRow: Math.floor(Math.random() * 10) + 1,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0, 1.5, 0],
                x: [0, Math.random() * 20 - 10, 0],
                y: [0, Math.random() * 20 - 10, 0],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Large Floating Orbs */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full blur-xl"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              left: `${Math.random() * 80}%`,
              top: `${Math.random() * 80}%`,
              background: `radial-gradient(circle, rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.1) 0%, transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
              x: [0, Math.random() * 50 - 25, 0],
              y: [0, Math.random() * 50 - 25, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Interactive Grid Lines */}
        <div className="absolute inset-0 opacity-10">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(20, 1fr)',
              gridTemplateRows: 'repeat(20, 1fr)',
              height: '100%',
              width: '100%'
            }}
          >
            {Array.from({ length: 400 }).map((_, i) => (
              <motion.div
                key={`line-${i}`}
                className="border border-purple-200/20"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.2, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  delay: i * 0.05,
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic CSS Grid Background Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(50px, 1fr))',
            gridTemplateRows: 'repeat(auto-fit, minmax(50px, 1fr))',
            height: '100vh',
            width: '100vw'
          }}
        >
          {Array.from({ length: 200 }).map((_, i) => (
            <motion.div
              key={`bg-${i}`}
              className="border border-purple-100/5"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.05, 0],
                backgroundColor: [
                  'rgba(147, 51, 234, 0)',
                  'rgba(147, 51, 234, 0.02)',
                  'rgba(147, 51, 234, 0)'
                ]
              }}
              transition={{
                delay: i * 0.1,
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>
      </div>

      {/* Advanced Particle System */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-px h-px bg-gradient-to-r from-purple-400 to-pink-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 4,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </>
  );
}
