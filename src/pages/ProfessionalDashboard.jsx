import React from 'react';
import { motion } from 'framer-motion';
import ProfessionalSidebar from '../components/ProfessionalSidebar';
import NavbarSecured from '../components/NavbarSecured';
import Footer from '../components/Footer';

export default function ProfessionalDashboard() {
  return (
    <>
      <ProfessionalSidebar />

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
          <NavbarSecured />
        </motion.header>

        {/* Main Content - Advanced CSS Grid with Dashboard Layout */}
        <main className="relative overflow-hidden"
              style={{
                gridArea: 'main',
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gridTemplateRows: 'repeat(6, auto)',
                gridTemplateAreas: `
                  "welcome welcome welcome welcome welcome welcome welcome welcome welcome welcome welcome welcome"
                  "stats stats stats stats stats stats stats stats stats stats stats stats"
                  "activities activities activities activities activities activities activities activities actions actions actions actions"
                  "charts charts charts charts charts charts charts charts charts charts charts charts"
                  "projects projects projects projects projects projects projects projects projects projects projects projects"
                  "notifications notifications notifications notifications notifications notifications notifications notifications notifications notifications notifications notifications"
                `,
                gap: '0'
              }}>

          {/* Welcome Section - Full Width Grid Area */}
          <motion.section
            style={{ gridArea: 'welcome' }}
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
            className="relative p-8"
          >
            <div className="text-center">
              <motion.h1
                className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Bienvenue sur votre Dashboard Professionnel
              </motion.h1>
              <motion.p
                className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Gérez vos projets, suivez vos performances et accédez à tous vos outils professionnels en un seul endroit.
              </motion.p>
            </div>
          </motion.section>

          {/* Stats Section - Full Width Grid Area */}
          <motion.section
            style={{ gridArea: 'stats' }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Projets Actifs', value: '12', color: 'from-blue-500 to-blue-600', icon: '📊' },
                { title: 'Tâches Terminées', value: '47', color: 'from-green-500 to-green-600', icon: '✅' },
                { title: 'Revenus Mensuels', value: '€2,450', color: 'from-purple-500 to-purple-600', icon: '💰' },
                { title: 'Clients Satisfaits', value: '98%', color: 'from-orange-500 to-orange-600', icon: '⭐' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.title}
                  className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 text-white shadow-lg`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.title}</div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Activities and Actions Section */}
          <motion.section
            style={{ gridArea: 'activities' }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative p-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Activités Récentes</h2>
            <div className="space-y-4">
              {[
                { action: 'Nouveau projet créé', time: 'Il y a 2h', type: 'success' },
                { action: 'Paiement reçu de €500', time: 'Il y a 4h', type: 'info' },
                { action: 'Tâche "Design Logo" terminée', time: 'Il y a 6h', type: 'success' },
                { action: 'Rendez-vous client programmé', time: 'Il y a 1j', type: 'warning' }
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className={`w-3 h-3 rounded-full mr-4 ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex items-center justify-between flex-1">
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">{activity.action}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Quick Actions Section */}
          <motion.section
            style={{ gridArea: 'actions' }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative p-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Actions Rapides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Nouveau Projet', icon: '➕', color: 'bg-blue-500 hover:bg-blue-600' },
                { title: 'Facturer Client', icon: '💳', color: 'bg-green-500 hover:bg-green-600' },
                { title: 'Planifier RDV', icon: '📅', color: 'bg-purple-500 hover:bg-purple-600' },
                { title: 'Support', icon: '🆘', color: 'bg-orange-500 hover:bg-orange-600' }
              ].map((action, index) => (
                <motion.button
                  key={action.title}
                  className={`p-4 ${action.color} text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xl">{action.icon}</span>
                  <span>{action.title}</span>
                </motion.button>
              ))}
            </div>
          </motion.section>

          {/* Charts Section - Full Width */}
          <motion.section
            style={{ gridArea: 'charts' }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative p-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Analyses & Graphiques</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Revenus Mensuels</h3>
                <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📈</div>
                    <p className="text-gray-600 dark:text-gray-300">Graphique des revenus</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Intégration API en cours</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Projets par Statut</h3>
                <div className="h-64 flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-lg">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📊</div>
                    <p className="text-gray-600 dark:text-gray-300">Diagramme circulaire</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Intégration API en cours</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Projects Section - Full Width */}
          <motion.section
            style={{ gridArea: 'projects' }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative p-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Projets Récents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Site E-commerce', client: 'TechCorp', status: 'En cours', progress: 75 },
                { name: 'Application Mobile', client: 'StartUp Inc', status: 'Révision', progress: 90 },
                { name: 'Refonte Branding', client: 'DesignCo', status: 'Terminé', progress: 100 }
              ].map((project, index) => (
                <motion.div
                  key={project.name}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                >
                  <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">{project.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">{project.client}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Terminé' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
                      project.status === 'En cours' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' :
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                    }`}>
                      {project.status}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${project.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2, duration: 1 }}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Notifications Section - Full Width */}
          <motion.section
            style={{ gridArea: 'notifications' }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="relative p-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Notifications</h2>
            <div className="space-y-3">
              {[
                { message: 'Nouveau message de Jean Dupont', type: 'message', unread: true },
                { message: 'Rappel: Rendez-vous demain à 14h', type: 'reminder', unread: true },
                { message: 'Facture #1234 payée', type: 'payment', unread: false },
                { message: 'Mise à jour disponible', type: 'update', unread: false }
              ].map((notification, index) => (
                <motion.div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    notification.unread
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        notification.type === 'message' ? 'bg-blue-500' :
                        notification.type === 'reminder' ? 'bg-orange-500' :
                        notification.type === 'payment' ? 'bg-green-500' : 'bg-purple-500'
                      }`}></div>
                      <p className={`font-medium ${
                        notification.unread ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        {notification.message}
                      </p>
                    </div>
                    {notification.unread && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </main>

        {/* Footer - Full Width Grid Area */}
        <motion.footer
          style={{ gridArea: 'footer' }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
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
