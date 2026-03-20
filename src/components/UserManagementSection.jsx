import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api/users';

function UserManagementSection() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'Utilisateur',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Charger les utilisateurs
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsers(data);
    } catch {
      setError('Erreur de chargement des utilisateurs');
      toast.error('Erreur de chargement des utilisateurs');
    }
    setLoading(false);
  };

  // Ajout d'un utilisateur
  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erreur lors de l'ajout");
      await fetchUsers();
      setForm({ name: '', email: '', role: 'Utilisateur' });
      toast.success('Utilisateur ajouté avec succès');
    } catch {
      setError("Erreur lors de l'ajout");
      toast.error("Erreur lors de l'ajout");
    }
    setLoading(false);
  };

  // Suppression d'un utilisateur
  const handleDeleteUser = async (id) => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Erreur lors de la suppression');
      await fetchUsers();
      toast.success('Utilisateur supprimé');
    } catch {
      setError('Erreur lors de la suppression');
      toast.error('Erreur lors de la suppression');
    }
    setLoading(false);
  };

  // Préparation de l'édition
  const handleEditUser = (user) => {
    setEditingId(user._id);
    setForm({ name: user.name, email: user.email, role: user.role });
  };

  // Validation de l'édition
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Erreur lors de la mise à jour');
      await fetchUsers();
      setEditingId(null);
      setForm({ name: '', email: '', role: 'Utilisateur' });
      toast.success('Utilisateur mis à jour');
    } catch {
      setError('Erreur lors de la mise à jour');
      toast.error('Erreur lors de la mise à jour');
    }
    setLoading(false);
  };

  return (
    <section
      className="py-12 px-4 bg-gradient-to-b from-blue-50 via-white to-gray-50"
      id="user-management"
    >
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-4 drop-shadow-lg">
          Gestion des utilisateurs
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Administrez vos utilisateurs, attribuez des rôles, et gérez les accès
          à vos services informatiques en toute sécurité.
        </p>
        <div className="rounded-xl shadow-lg border border-blue-100 bg-white p-6">
          {error && <div className="text-red-600 mb-4">{error}</div>}
          {loading && <div className="text-blue-600 mb-4">Chargement...</div>}
          <table className="w-full text-left border-collapse mb-6">
            <thead>
              <tr className="bg-blue-100">
                <th className="py-2 px-4">Nom</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Rôle</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.role}</td>
                  <td className="py-2 px-4">
                    <button
                      className="text-blue-600 hover:underline mr-2"
                      onClick={() => handleEditUser(user)}
                    >
                      Modifier
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <form
            onSubmit={editingId ? handleUpdateUser : handleAddUser}
            className="flex flex-col md:flex-row gap-4 items-center justify-center"
          >
            <input
              type="text"
              placeholder="Nom"
              className="border px-4 py-2 rounded-lg"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="border px-4 py-2 rounded-lg"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <select
              className="border px-4 py-2 rounded-lg"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="Utilisateur">Utilisateur</option>
              <option value="Administrateur">Administrateur</option>
              <option value="Manager">Manager</option>
            </select>
            <button
              type="submit"
              className={`px-6 py-2 rounded-lg shadow text-white transition ${
                editingId
                  ? 'bg-yellow-600 hover:bg-yellow-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {editingId ? 'Mettre à jour' : 'Ajouter'}
            </button>
            {editingId && (
              <button
                type="button"
                className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400"
                onClick={() => {
                  setEditingId(null);
                  setForm({ name: '', email: '', role: 'Utilisateur' });
                }}
              >
                Annuler
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default UserManagementSection;
