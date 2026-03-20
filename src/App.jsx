import React, { Suspense, lazy } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { NotificationsProvider } from './contexts/NotificationsContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';

// Components
import ContactQuickButton from './components/ContactQuickButton.jsx';
import Loader from './components/Loader.jsx';
import ThemeSwitcher from './components/ThemeSwitcher.jsx';
import ProfessionalSplashScreen from './components/ProfessionalSplashScreen';
import OfflineIndicator from './components/OfflineIndicator.jsx';

// Route Guards
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

// Public Pages
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage.jsx';
import Portfolio from './pages/Portfolio.jsx';
import OffersPage from './pages/OffersPage.jsx';
import CareersPage from './pages/CareersPage.jsx';
import PartnersPage from './pages/PartnersPage.jsx';
import SupportPage from './pages/SupportPage.jsx';
import ExperiencePage from './pages/ExperiencePage';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import TestimonialsPage from './pages/TestimonialsPage';
import TeamDetailPage from './pages/TeamDetailPage.jsx';
import TeamPage from './pages/TeamPage';
import WorkPage from './pages/WorkPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';

// Auth Pages
import Login from './pages/Login.jsx';
import SecureRegister from './components/SecureRegister';

// Private Pages (Authenticated Users)
import ProfilePage from './pages/ProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import SettingsPage from './pages/SettingsPage';
import ClientRegistrationPage from './pages/ClientRegistrationPage';
import PaymentPage from './pages/PaymentPage';

// Admin Pages
import DashboardPage from './pages/DashboardPage';
import UserManagementPage from './pages/UserManagementPage';
import PaymentManagementPage from './pages/PaymentManagementPage';

// Dashboard Components (Admin)
import {
  AdminHome,
  Clients,
  Subscribers,
  PaymentManagement,
  InvoiceManagement,
  Analytics,
  Projects,
  Messaging,
  Profile,
} from './dashboard';
import FinanceDashboard from './dashboard/FinanceDashboard';
import AdminLayout from './dashboard/components/AdminLayout';
import ProjectDetails from './dashboard/pages/ProjectDetails';

// 404 Page
import NotFound from './pages/NotFound';

// User Menu System Components (Intégration complète - Étape 2) - Lazy loaded to prevent build errors
const UserDashboard = lazy(() => import('./user-menu-system/pages/UserDashboard'));
const ManagerDashboard = lazy(() => import('./user-menu-system/pages/ManagerDashboard'));
const AdminDashboard = lazy(() => import('./user-menu-system/pages/AdminDashboard'));
const UserMenuProfilePage = lazy(() => import('./user-menu-system/pages/UserMenuProfilePage'));
const UserMenuSettingsPage = lazy(() => import('./user-menu-system/pages/UserMenuSettingsPage'));

// Additional User Menu Pages - Lazy loaded
const CreatePage = lazy(() => import('./user-menu-system/pages/CreatePage'));
const ReportsPage = lazy(() => import('./user-menu-system/pages/ReportsPage'));
const HelpPage = lazy(() => import('./user-menu-system/pages/HelpPage'));
const UserMenuNotificationsPage = lazy(() => import('./user-menu-system/pages/NotificationsPage'));
const UserMenuTeamPage = lazy(() => import('./user-menu-system/pages/TeamPage'));
const ActivitiesPage = lazy(() => import('./user-menu-system/pages/ActivitiesPage'));

const App = () => {
  const [splashDone, setSplashDone] = React.useState(false);

  return (
    <AuthProvider>
      <ThemeProvider>
        <NotificationsProvider>
        <Suspense fallback={<Loader label="Chargement de la page..." />}>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <ThemeSwitcher />
          <ContactQuickButton />

          <Routes>
            {/* ==================== ROUTES PUBLIQUES ==================== */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/offres" element={<OffersPage />} />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/checkout/:offerId" element={<CheckoutPage />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
            <Route path="/carriere" element={<CareersPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/partenaires" element={<PartnersPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/equipe" element={<TeamPage />} />
            <Route path="/team/:id" element={<TeamDetailPage />} />
            <Route path="/work" element={<WorkPage />} />

            {/* ==================== AUTHENTIFICATION ==================== */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SecureRegister />} />

            {/* ==================== ROUTES PRIVÉES (Utilisateurs Connectés) ==================== */}
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <PrivateRoute>
                  <NotificationsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <SettingsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/clients"
              element={
                <PrivateRoute>
                  <ClientRegistrationPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/paiement"
              element={
                <PrivateRoute>
                  <PaymentPage />
                </PrivateRoute>
              }
            />

            {/* ==================== USER MENU SYSTEM ROUTES (Améliorées) ==================== */}
            {/* Routes principales du système utilisateur */}
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/manager-dashboard" element={<ManagerDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/user-menu/profile" element={<UserMenuProfilePage />} />
            <Route path="/user-menu/settings" element={<UserMenuSettingsPage />} />
            <Route path="/user-menu/create" element={<CreatePage />} />
            <Route path="/user-menu/reports" element={<ReportsPage />} />
            <Route path="/user-menu/help" element={<HelpPage />} />
            <Route path="/user-menu/notifications" element={<UserMenuNotificationsPage />} />
            <Route path="/user-menu/team" element={<UserMenuTeamPage />} />
            <Route path="/user-menu/activities" element={<ActivitiesPage />} />

            {/* Routes de redirection automatique vers user-menu-system */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/user-management" element={<UserManagementPage />} />
            <Route path="/payment-management" element={<PaymentManagementPage />} />

            {/* Routes Admin Dashboard avec Layout */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminHome />} />
              <Route path="clients" element={<Clients />} />
              <Route path="subscribers" element={<Subscribers />} />
              <Route path="payments" element={<PaymentManagement />} />
              <Route path="invoices" element={<InvoiceManagement />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="finance" element={<FinanceDashboard />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:id" element={<ProjectDetails />} />
              <Route path="messaging" element={<Messaging />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* ==================== ROUTE 404 ==================== */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Offline Indicator */}
          <OfflineIndicator />

          {!splashDone && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 9999,
                background: 'rgba(255,255,255,0.95)',
              }}
            >
              <ProfessionalSplashScreen
                onComplete={() => setSplashDone(true)}
              />
            </div>
          )}
        </Suspense>
      </NotificationsProvider>
    </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
