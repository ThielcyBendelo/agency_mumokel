import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaCalendar,
  FaEdit,
  FaSave,
  FaTimes,
  FaCamera,
  FaShieldAlt
} from 'react-icons/fa';
import NavbarSecured from '../components/NavbarSecured';
import Footer from '../components/Footer';
import authService from '../services/authService';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bio: ''
  });

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      toast.error('Session expirée');
      navigate('/login');
      return;
    }

    setUser(currentUser);
    setFormData({
      name: currentUser.name || '',
      email: currentUser.email || '',
      phone: currentUser.phone || '',
      address: currentUser.address || '',
      bio: currentUser.bio || ''
    });
    setLoading(false);
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await authService.updateProfile(formData);
      setUser({ ...user, ...formData });
      setIsEditing(false);
      toast.success('✅ Profil mis à jour avec succès');
    } catch (error) {
      toast.error('❌ Erreur lors de la mise à jour');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
      bio: user.bio || ''
    });
    setIsEditing(false);
  };

  const getRoleBadge = () => {
    const roleConfig = {
      admin: { label: 'Administrateur', color: 'from-yellow-400 to-orange-500', icon: FaShieldAlt },
      moderator: { label: 'Modérateur', color: 'from-blue-400 to-cyan-500', icon: FaShieldAlt },
      user: { label: 'Utilisateur', color: 'from-purple-400 to-pink-500', icon: FaUser }
    };

    const config = roleConfig[user?.role?.toLowerCase()] || roleConfig.user;
    const Icon = config.icon;

    return (
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${config.color} text-white font-bold`}>
        <Icon className="h-4 w-4" />
        {config.label}
      </div>
    );
  };

  const getAvatar = () => {
    const initial = user?.email?.[0]?.toUpperCase() || user?.name?.[0]?.toUpperCase() || 'U';
    
    if (user?.photoURL) {
      return (
        <img 
          src={user.photoURL} 
          alt="Avatar" 
          className="w-32 h-32 rounded-full object-cover border-4 border-purple-500 shadow-2xl"
        />
      );
    }

    return (
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center text-white text-5xl font-bold shadow-2xl border-4 border-purple-500">
        {initial}
      </div>
    );
  };

  if (loading) {
    return (
      <>
        <NavbarSecured />
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500 mx-auto mb-4"></div>
            <p className="text-white text-lg">Chargement du profil...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavbarSecured />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Card */}
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 mb-8 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                {getAvatar()}
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white hover:bg-purple-700 transition shadow-lg">
                  <FaCamera className="h-5 w-5" />
                </button>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {user?.name || user?.email?.split('@')[0] || 'Utilisateur'}
                </h1>
                <p className="text-gray-400 mb-3">{user?.email}</p>
                {getRoleBadge()}
                
                <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <FaCalendar className="text-purple-400" />
                    Membre depuis {new Date().toLocaleDateString('fr-FR')}
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition shadow-lg"
                >
                  <FaEdit className="h-4 w-4" />
                  Modifier
                </button>
              )}
            </div>
          </div>

          {/* Profile Details Card */}
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Informations du profil</h2>

            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="flex items-center gap-2 text-gray-400 mb-2">
                  <FaUser className="text-purple-400" />
                  Nom complet
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500 transition"
                    placeholder="Votre nom complet"
                  />
                ) : (
                  <p className="text-white text-lg">{user?.name || 'Non renseigné'}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-gray-400 mb-2">
                  <FaEnvelope className="text-purple-400" />
                  Email
                </label>
                <p className="text-white text-lg">{user?.email}</p>
                <p className="text-xs text-gray-500 mt-1">L'email ne peut pas être modifié</p>
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-2 text-gray-400 mb-2">
                  <FaPhone className="text-purple-400" />
                  Téléphone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500 transition"
                    placeholder="+33 6 12 34 56 78"
                  />
                ) : (
                  <p className="text-white text-lg">{user?.phone || 'Non renseigné'}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="flex items-center gap-2 text-gray-400 mb-2">
                  <FaMapMarkerAlt className="text-purple-400" />
                  Adresse
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500 transition"
                    placeholder="Votre adresse"
                  />
                ) : (
                  <p className="text-white text-lg">{user?.address || 'Non renseigné'}</p>
                )}
              </div>

              {/* Bio */}
              <div>
                <label className="flex items-center gap-2 text-gray-400 mb-2">
                  <FaUser className="text-purple-400" />
                  Biographie
                </label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500 transition resize-none"
                    placeholder="Parlez-nous de vous..."
                  />
                ) : (
                  <p className="text-white text-lg">{user?.bio || 'Non renseigné'}</p>
                )}
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition shadow-lg disabled:opacity-50"
                  >
                    <FaSave className="h-4 w-4" />
                    {loading ? 'Enregistrement...' : 'Enregistrer'}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition shadow-lg disabled:opacity-50"
                  >
                    <FaTimes className="h-4 w-4" />
                    Annuler
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl mt-8">
            <h2 className="text-2xl font-bold text-white mb-6">Sécurité</h2>
            <div className="space-y-4">
              <button
                onClick={() => navigate('/settings')}
                className="w-full text-left px-6 py-4 bg-gray-700/50 hover:bg-gray-700 rounded-xl transition flex items-center justify-between group"
              >
                <div>
                  <p className="text-white font-semibold">Changer le mot de passe</p>
                  <p className="text-sm text-gray-400">Dernière modification il y a 30 jours</p>
                </div>
                <FaEdit className="text-gray-400 group-hover:text-purple-400 transition" />
              </button>

              <button
                onClick={() => toast.info('Fonctionnalité à venir')}
                className="w-full text-left px-6 py-4 bg-gray-700/50 hover:bg-gray-700 rounded-xl transition flex items-center justify-between group"
              >
                <div>
                  <p className="text-white font-semibold">Authentification à deux facteurs</p>
                  <p className="text-sm text-gray-400">Sécurisez votre compte</p>
                </div>
                <FaShieldAlt className="text-gray-400 group-hover:text-green-400 transition" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
