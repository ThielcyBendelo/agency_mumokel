import React, { useState } from 'react';

export default function PaymentForm() {
  const [form, setForm] = useState({ nom: '', email: '', montant: '' });
  const [paid, setPaid] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous pouvez intégrer Stripe ou PayPal
    setPaid(true);
    setForm({ nom: '', email: '', montant: '' });
  };

  return (
    <div className="max-w-lg mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Paiement en ligne</h2>
      <form
        className="bg-white rounded-lg shadow-md p-6 flex flex-col"
        onSubmit={handleSubmit}
      >
        <label className="mb-2 font-semibold">Nom</label>
        <input
          type="text"
          name="nom"
          value={form.nom}
          onChange={handleChange}
          className="mb-4 p-2 border rounded"
          required
        />
        <label className="mb-2 font-semibold">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="mb-4 p-2 border rounded"
          required
        />
        <label className="mb-2 font-semibold">Montant (€)</label>
        <input
          type="number"
          name="montant"
          value={form.montant}
          onChange={handleChange}
          className="mb-4 p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-purple-600 text-white py-2 rounded font-bold hover:bg-purple-700"
        >
          Payer
        </button>
        {paid && (
          <span className="text-green-600 mt-2">Paiement effectué !</span>
        )}
      </form>
      <div className="mt-4 text-center text-gray-500 text-sm">
        Paiement sécurisé via Stripe ou PayPal.
      </div>
    </div>
  );
}
