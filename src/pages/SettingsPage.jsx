import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  FaCog, 
  FaLock, 
  FaBell, 
  FaPalette,
  FaShieldAlt,
  FaEye,
  FaEyeSlash,
  FaSave,
  FaTrash
} from 'react-icons/fa';
import NavbarSecured from '../components/NavbarSecured';
import Footer from '../components/Footer';
import authService from '../services/authService';

export default function SettingsPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('security');
  
  // Security settings
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  
  // Appearance settings
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('fr');

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      toast.error('Session expirée');
      navigate('/login');
      return;
    }

    // Charger les préférences depuis localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedLanguage = localStorage.getItem('language') || 'fr';
    const savedEmailNotif = localStorage.getItem('emailNotifications') !== 'false';
    const savedPushNotif = localStorage.getItem('pushNotifications') !== 'false';
    const savedMarketing = localStorage.getItem('marketingEmails') === 'true';

    setTheme(savedTheme);
    setLanguage(savedLanguage);
    setEmailNotifications(savedEmailNotif);
    setPushNotifications(savedPushNotif);
    setMarketingEmails(savedMarketing);
  }, [navigate]);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    try {
      setLoading(true);
      await authService.changePassword(currentPassword, newPassword);
      toast.success('✅ Mot de passe modifié avec succès');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast.error('❌ Erreur lors du changement de mot de passe');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotifications = () => {
    localStorage.setItem('emailNotifications', emailNotifications);
    localStorage.setItem('pushNotifications', pushNotifications);
    localStorage.setItem('marketingEmails', marketingEmails);
    toast.success('✅ Préférences de notifications enregistrées');
  };

  const handleSaveAppearance = () => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('language', language);
    toast.success('✅ Préférences d\'apparence enregistrées');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('⚠️ Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
      toast.info('Fonctionnalité à venir - Contactez le support');
    }
  };

  const tabs = [
    { id: 'security', label: 'Sécurité', icon: FaLock },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'appearance', label: 'Apparence', icon: FaPalette },
    { id: 'privacy', label: 'Confidentialité', icon: FaShieldAlt }
  ];

  return (
    <>
      <NavbarSecured />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 mb-8 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center">
                <FaCog className="h-8 w-8 text-purple-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Paramètres</h1>
                <p className="text-gray-400">Gérez vos préférences et votre compte</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Tabs */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                        activeTab === tab.id
                          ? 'bg-purple-600 text-white'
                          : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
                {/* Security Tab */}
                {activeTab === 'security' && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Sécurité</h2>
                    
                    <form onSubmit={handleChangePassword} className="space-y-6">
                      <div>
                        <label className="block text-gray-400 mb-2">Mot de passe actuel</label>
                        <div className="relative">
                          <input
                            type={showPasswords ? 'text' : 'password'}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500 transition pr-12"
                            placeholder="Entrez votre mot de passe actuel"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPasswords(!showPasswords)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                          >
                            {showPasswords ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-2">Nouveau mot de passe</label>
                        <input
                          type={showPasswords ? 'text' : 'password'}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500 transition"
                          placeholder="Minimum 8 caractères"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-2">Confirmer le nouveau mot de passe</label>
                        <input
                          type={showPasswords ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500 transition"
                          placeholder="Confirmez votre mot de passe"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition shadow-lg disabled:opacity-50"
                      >
                        <FaSave className="h-4 w-4" />
                        {loading ? 'Enregistrement...' : 'Changer le mot de passe'}
                      </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-gray-700">
                      <h3 className="text-xl font-bold text-white mb-4">Authentification à deux facteurs</h3>
                      <p className="text-gray-400 mb-4">
                        Ajoutez une couche de sécurité supplémentaire à votre compte
                      </p>
                      <button
                        onClick={() => toast.info('Fonctionnalité à venir')}
                        className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition shadow-lg"
                      >
                        <FaShieldAlt className="h-4 w-4" />
                        Activer 2FA
                      </button>
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Notifications</h2>
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl">
                        <div>
                          <h3 className="text-white font-semibold">Notifications par email</h3>
                          <p className="text-sm text-gray-400">Recevoir des notifications par email</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={emailNotifications}
                            onChange={(e) => setEmailNotifications(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl">
                        <div>
                          <h3 className="text-white font-semibold">Notifications push</h3>
                          <p className="text-sm text-gray-400">Recevoir des notifications sur votre appareil</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={pushNotifications}
                            onChange={(e) => setPushNotifications(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl">
                        <div>
                          <h3 className="text-white font-semibold">Emails marketing</h3>
                          <p className="text-sm text-gray-400">Recevoir des offres et actualités</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={marketingEmails}
                            onChange={(e) => setMarketingEmails(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>

                      <button
                        onClick={handleSaveNotifications}
                        className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition shadow-lg"
                      >
                        <FaSave className="h-4 w-4" />
                        Enregistrer les préférences
                      </button>
                    </div>
                  </div>
                )}

                {/* Appearance Tab */}
                {activeTab === 'appearance' && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Apparence</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-gray-400 mb-3">Thème</label>
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            onClick={() => setTheme('dark')}
                            className={`p-4 rounded-xl border-2 transition ${
                              theme === 'dark'
                                ? 'border-purple-500 bg-purple-600/20'
                                : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                            }`}
                          >
                            <div className="text-white font-semibold mb-2">Sombre</div>
                            <div className="h-20 bg-gray-900 rounded-lg"></div>
                          </button>
                          <button
                            onClick={() => setTheme('light')}
                            className={`p-4 rounded-xl border-2 transition ${
                              theme === 'light'
                                ? 'border-purple-500 bg-purple-600/20'
                                : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                            }`}
                          >
                            <div className="text-white font-semibold mb-2">Clair</div>
                            <div className="h-20 bg-gray-100 rounded-lg"></div>
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-3">Langue</label>
                        <select
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500 transition"
                        >
                          <option value="fr">Français</option>
                          <option value="en">English</option>
                          <option value="es">Español</option>
                        </select>
                      </div>

                      <button
                        onClick={handleSaveAppearance}
                        className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition shadow-lg"
                      >
                        <FaSave className="h-4 w-4" />
                        Enregistrer les préférences
                      </button>
                    </div>
                  </div>
                )}

                {/* Privacy Tab */}
                {activeTab === 'privacy' && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Confidentialité</h2>
                    
                    <div className="space-y-6">
                      <div className="p-6 bg-yellow-600/10 border border-yellow-600/30 rounded-xl">
                        <h3 className="text-yellow-400 font-bold mb-2">Zone dangereuse</h3>
                        <p className="text-gray-400 mb-4">
                          Les actions suivantes sont irréversibles. Procédez avec prudence.
                        </p>
                      </div>

                      <button
                        onClick={handleDeleteAccount}
                        className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition shadow-lg"
                      >
                        <FaTrash className="h-4 w-4" />
                        Supprimer mon compte
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
