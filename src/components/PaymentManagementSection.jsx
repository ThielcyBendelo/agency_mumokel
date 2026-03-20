import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api/payments';

function PaymentManagementSection() {
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({
    client: '',
    amount: '',
    status: 'En attente',
    date: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Charger les paiements
  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setPayments(data);
    } catch {
      setError('Erreur de chargement des paiements');
      toast.error('Erreur de chargement des paiements');
    }
    setLoading(false);
  };

  // Ajout d'un paiement
  const handleAddPayment = async (e) => {
    e.preventDefault();
    if (!form.client || !form.amount || !form.date) return;
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
        body: JSON.stringify({ ...form, amount: parseFloat(form.amount) }),
      });
      if (!res.ok) throw new Error("Erreur lors de l'ajout");
      await fetchPayments();
      setForm({ client: '', amount: '', status: 'En attente', date: '' });
      toast.success('Paiement ajouté avec succès');
    } catch {
      setError("Erreur lors de l'ajout");
      toast.error("Erreur lors de l'ajout");
    }
    setLoading(false);
  };

  // Suppression d'un paiement
  const handleDeletePayment = async (id) => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Erreur lors de la suppression');
      await fetchPayments();
      toast.success('Paiement supprimé');
    } catch {
      setError('Erreur lors de la suppression');
      toast.error('Erreur lors de la suppression');
    }
    setLoading(false);
  };

  // Préparation de l'édition
  const handleEditPayment = (payment) => {
    setEditingId(payment._id);
    setForm({
      client: payment.client,
      amount: payment.amount,
      status: payment.status,
      date: payment.date,
    });
  };

  // Validation de l'édition
  const handleUpdatePayment = async (e) => {
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
        body: JSON.stringify({ ...form, amount: parseFloat(form.amount) }),
      });
      if (!res.ok) throw new Error('Erreur lors de la mise à jour');
      await fetchPayments();
      setEditingId(null);
      setForm({ client: '', amount: '', status: 'En attente', date: '' });
      toast.success('Paiement mis à jour');
    } catch {
      setError('Erreur lors de la mise à jour');
      toast.error('Erreur lors de la mise à jour');
    }
    setLoading(false);
  };

  return (
    <section
      className="py-12 px-4 bg-gradient-to-b from-gray-50 via-white to-green-50"
      id="payment-management"
    >
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-green-900 mb-4 drop-shadow-lg">
          Gestion des paiements
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Suivez l’historique des paiements, gérez les statuts, et intégrez des
          solutions sécurisées comme Stripe ou PayPal.
        </p>
        <div className="rounded-xl shadow-lg border border-green-100 bg-white p-6">
          {error && <div className="text-red-600 mb-4">{error}</div>}
          {loading && <div className="text-green-600 mb-4">Chargement...</div>}
          <table className="w-full text-left border-collapse mb-6">
            <thead>
              <tr className="bg-green-100">
                <th className="py-2 px-4">Client</th>
                <th className="py-2 px-4">Montant</th>
                <th className="py-2 px-4">Statut</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id}>
                  <td className="py-2 px-4">{payment.client}</td>
                  <td className="py-2 px-4">${payment.amount}</td>
                  <td
                    className={`py-2 px-4 ${
                      payment.status === 'Payé'
                        ? 'text-green-600'
                        : payment.status === 'Annulé'
                        ? 'text-red-600'
                        : 'text-yellow-600'
                    }`}
                  >
                    {payment.status}
                  </td>
                  <td className="py-2 px-4">{payment.date}</td>
                  <td className="py-2 px-4">
                    <button
                      className="text-blue-600 hover:underline mr-2"
                      onClick={() => handleEditPayment(payment)}
                    >
                      Modifier
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDeletePayment(payment._id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <form
            onSubmit={editingId ? handleUpdatePayment : handleAddPayment}
            className="flex flex-col md:flex-row gap-4 items-center justify-center"
          >
            <input
              type="text"
              placeholder="Client"
              className="border px-4 py-2 rounded-lg"
              value={form.client}
              onChange={(e) => setForm({ ...form, client: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Montant"
              className="border px-4 py-2 rounded-lg"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              required
            />
            <select
              className="border px-4 py-2 rounded-lg"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="En attente">En attente</option>
              <option value="Payé">Payé</option>
              <option value="Annulé">Annulé</option>
            </select>
            <input
              type="date"
              className="border px-4 py-2 rounded-lg"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
            />
            <button
              type="submit"
              className={`px-6 py-2 rounded-lg shadow text-white transition ${
                editingId
                  ? 'bg-yellow-600 hover:bg-yellow-700'
                  : 'bg-green-600 hover:bg-green-700'
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
                  setForm({
                    client: '',
                    amount: '',
                    status: 'En attente',
                    date: '',
                  });
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

export default PaymentManagementSection;
