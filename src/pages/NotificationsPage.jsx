import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  FaBell, 
  FaCheck, 
  FaTrash, 
  FaFilter,
  FaCheckDouble,
  FaExclamationCircle,
  FaInfoCircle,
  FaCheckCircle
} from 'react-icons/fa';
import NavbarSecured from '../components/NavbarSecured';
import Footer from '../components/Footer';
import authService from '../services/authService';

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all'); // all, unread, read
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      toast.error('Session expirée');
      navigate('/login');
      return;
    }

    // Mock notifications - À remplacer par un appel API
    const mockNotifications = [
      {
        id: 1,
        type: 'success',
        title: 'Paiement confirmé',
        message: 'Votre paiement de 150€ a été traité avec succès',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: false
      },
      {
        id: 2,
        type: 'info',
        title: 'Nouveau message',
        message: 'Vous avez reçu un nouveau message de l\'équipe support',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        read: false
      },
      {
        id: 3,
        type: 'warning',
        title: 'Mise à jour requise',
        message: 'Veuillez mettre à jour vos informations de profil',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        read: true
      },
      {
        id: 4,
        type: 'info',
        title: 'Bienvenue',
        message: 'Bienvenue sur muamokel.com ! Découvrez nos services',
        timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
        read: true
      },
      {
        id: 5,
        type: 'success',
        title: 'Compte vérifié',
        message: 'Votre compte a été vérifié avec succès',
        timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000),
        read: true
      }
    ];

    setNotifications(mockNotifications);
    setLoading(false);
  }, [navigate]);

  const getNotificationIcon = (type) => {
    const icons = {
      success: { icon: FaCheckCircle, color: 'text-green-400', bg: 'bg-green-600/20' },
      info: { icon: FaInfoCircle, color: 'text-blue-400', bg: 'bg-blue-600/20' },
      warning: { icon: FaExclamationCircle, color: 'text-yellow-400', bg: 'bg-yellow-600/20' },
      error: { icon: FaExclamationCircle, color: 'text-red-400', bg: 'bg-red-600/20' }
    };

    const config = icons[type] || icons.info;
    const Icon = config.icon;

    return (
      <div className={`w-12 h-12 rounded-full ${config.bg} flex items-center justify-center`}>
        <Icon className={`h-6 w-6 ${config.color}`} />
      </div>
    );
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    if (days < 7) return `Il y a ${days}j`;
    return timestamp.toLocaleDateString('fr-FR');
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
    toast.success('Notification marquée comme lue');
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    toast.success('Toutes les notifications marquées comme lues');
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
    toast.success('Notification supprimée');
  };

  const deleteAllRead = () => {
    setNotifications(notifications.filter(notif => !notif.read));
    toast.success('Notifications lues supprimées');
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <>
        <NavbarSecured />
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500 mx-auto mb-4"></div>
            <p className="text-white text-lg">Chargement des notifications...</p>
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
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 mb-8 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center">
                  <FaBell className="h-8 w-8 text-purple-400" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Notifications</h1>
                  <p className="text-gray-400">
                    {unreadCount > 0 ? `${unreadCount} non lue${unreadCount > 1 ? 's' : ''}` : 'Aucune nouvelle notification'}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition shadow-lg"
                  >
                    <FaCheckDouble className="h-4 w-4" />
                    Tout marquer lu
                  </button>
                )}
                {notifications.some(n => n.read) && (
                  <button
                    onClick={deleteAllRead}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition shadow-lg"
                  >
                    <FaTrash className="h-4 w-4" />
                    Supprimer lues
                  </button>
                )}
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setFilter('all')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
                  filter === 'all'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <FaFilter className="h-4 w-4" />
                Toutes ({notifications.length})
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
                  filter === 'unread'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <FaBell className="h-4 w-4" />
                Non lues ({unreadCount})
              </button>
              <button
                onClick={() => setFilter('read')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
                  filter === 'read'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <FaCheck className="h-4 w-4" />
                Lues ({notifications.filter(n => n.read).length})
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-12 text-center">
                <FaBell className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Aucune notification</h3>
                <p className="text-gray-400">
                  {filter === 'unread' && 'Vous n\'avez aucune notification non lue'}
                  {filter === 'read' && 'Vous n\'avez aucune notification lue'}
                  {filter === 'all' && 'Vous n\'avez aucune notification'}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-xl transition-all hover:shadow-2xl hover:border-purple-500/30 ${
                    !notif.read ? 'border-l-4 border-l-purple-500' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {getNotificationIcon(notif.type)}

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-lg font-bold text-white">{notif.title}</h3>
                        <span className="text-sm text-gray-400 whitespace-nowrap">
                          {formatTimestamp(notif.timestamp)}
                        </span>
                      </div>
                      <p className="text-gray-400 mb-4">{notif.message}</p>

                      <div className="flex gap-2">
                        {!notif.read && (
                          <button
                            onClick={() => markAsRead(notif.id)}
                            className="flex items-center gap-2 px-3 py-1.5 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition text-sm"
                          >
                            <FaCheck className="h-3 w-3" />
                            Marquer comme lu
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notif.id)}
                          className="flex items-center gap-2 px-3 py-1.5 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition text-sm"
                        >
                          <FaTrash className="h-3 w-3" />
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
