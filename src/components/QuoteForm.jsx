import React, { useState } from 'react';

export default function QuoteForm() {
  const [form, setForm] = useState({
    nom: '',
    email: '',
    type: '',
    details: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous pouvez ajouter la génération PDF ou l’envoi au backend
    setSubmitted(true);
    setForm({ nom: '', email: '', type: '', details: '' });
  };

  return (
    <div className="max-w-lg mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Demander un devis</h2>
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
        <label className="mb-2 font-semibold">Type de projet</label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="mb-4 p-2 border rounded"
          required
        >
          <option value="">Sélectionner</option>
          <option value="site">Site vitrine</option>
          <option value="ecommerce">E-commerce</option>
          <option value="app">Application mobile</option>
          <option value="autre">Autre</option>
        </select>
        <label className="mb-2 font-semibold">Détails</label>
        <textarea
          name="details"
          value={form.details}
          onChange={handleChange}
          className="mb-4 p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-purple-600 text-white py-2 rounded font-bold hover:bg-purple-700"
        >
          Envoyer
        </button>
        {submitted && (
          <span className="text-green-600 mt-2">Demande envoyée !</span>
        )}
      </form>
    </div>
  );
}
