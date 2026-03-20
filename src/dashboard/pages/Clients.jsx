import { useState, useEffect } from 'react';
import dataService from '../../services/dataService';
import ExportModal from '../components/ExportModal';
import NavbarSecured from '../../components/NavbarSecured';
import Footer from '../../components/Footer';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  useEffect(() => {
    setClients(dataService.getClients());
  }, []);

  const updateStatus = (id, newStatus) => {
    dataService.updateClient(id, { status: newStatus });
    setClients(dataService.getClients());
  };

  const deleteClient = (id) => {
    if (confirm('Supprimer ce client ?')) {
      dataService.deleteClient(id);
      setClients(dataService.getClients());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navbar professionnelle */}
      <NavbarSecured />

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl text-white font-bold">
              Demandes de Projets ({clients.length})
            </h2>

            <div className="flex gap-3">
              <button
                onClick={() => setIsExportModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg
                         hover:shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Exporter
              </button>

              <button
                onClick={() => setClients(dataService.getClients())}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Actualiser
              </button>
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-6 overflow-x-auto">
            {clients.length === 0 ? (
              <p className="text-gray-400 text-center py-8">
                Aucune demande de projet pour le moment
              </p>
            ) : (
              <table className="w-full text-left text-gray-200 min-w-[800px]">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="pb-3 text-gray-300 font-semibold">Nom</th>
                    <th className="pb-3 text-gray-300 font-semibold">Email</th>
                    <th className="pb-3 text-gray-300 font-semibold">Entreprise</th>
                    <th className="pb-3 text-gray-300 font-semibold">Projet</th>
                    <th className="pb-3 text-gray-300 font-semibold">Budget</th>
                    <th className="pb-3 text-gray-300 font-semibold">Statut</th>
                    <th className="pb-3 text-gray-300 font-semibold">Date</th>
                    <th className="pb-3 text-gray-300 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((c) => (
                    <tr key={c.id} className="border-t border-gray-600 hover:bg-gray-700/50 transition-colors">
                      <td className="py-4">{c.name}</td>
                      <td className="py-4">{c.email}</td>
                      <td className="py-4">{c.company || '-'}</td>
                      <td className="py-4">{c.projectType || '-'}</td>
                      <td className="py-4">{c.budget || '-'}</td>
                      <td className="py-4">
                        <select
                          value={c.status}
                          onChange={(e) => updateStatus(c.id, e.target.value)}
                          className="bg-gray-600 text-white px-3 py-1 rounded text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        >
                          <option value="nouveau">Nouveau</option>
                          <option value="en_cours">En cours</option>
                          <option value="termine">Terminé</option>
                        </select>
                      </td>
                      <td className="py-4 text-sm text-gray-400">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4">
                        <button
                          onClick={() => deleteClient(c.id)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm transition-colors"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Modal d'export */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        data={clients}
        type="clients"
      />
    </div>
  );
}
