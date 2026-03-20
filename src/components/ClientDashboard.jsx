import React, { useState } from 'react';

const projects = [
  { id: 1, name: 'Site vitrine', status: 'En cours', deadline: '15/12/2025' },
  {
    id: 2,
    name: 'Application mobile',
    status: 'Livré',
    deadline: '01/11/2025',
  },
];
const invoices = [
  { id: 1, amount: '990€', status: 'Payée', date: '01/11/2025' },
  { id: 2, amount: '2490€', status: 'En attente', date: '15/12/2025' },
];

export default function ClientDashboard() {
  const [tab, setTab] = useState('projets');

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Espace Client</h1>
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setTab('projets')}
          className={`px-4 py-2 rounded font-bold ${
            tab === 'projets'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Suivi de projet
        </button>
        <button
          onClick={() => setTab('factures')}
          className={`px-4 py-2 rounded font-bold ${
            tab === 'factures'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Factures
        </button>
        <button
          onClick={() => setTab('support')}
          className={`px-4 py-2 rounded font-bold ${
            tab === 'support'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Support
        </button>
      </div>
      {tab === 'projets' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Projets</h2>
          <ul>
            {projects.map((p) => (
              <li
                key={p.id}
                className="mb-2 p-4 bg-white rounded shadow flex justify-between items-center"
              >
                <span className="font-bold text-blue-800">{p.name}</span>
                <span className="text-sm text-gray-500">{p.status}</span>
                <span className="text-xs text-gray-400">
                  Deadline : {p.deadline}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {tab === 'factures' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Factures</h2>
          <ul>
            {invoices.map((f) => (
              <li
                key={f.id}
                className="mb-2 p-4 bg-white rounded shadow flex justify-between items-center"
              >
                <span className="font-bold text-green-700">{f.amount}</span>
                <span className="text-sm text-gray-500">{f.status}</span>
                <span className="text-xs text-gray-400">Date : {f.date}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {tab === 'support' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Support</h2>
          <p className="text-gray-700 mb-2">
            Contactez notre équipe pour toute question ou problème.
          </p>
          <button className="bg-purple-600 text-white py-2 px-4 rounded font-bold hover:bg-purple-700">
            Ouvrir un ticket
          </button>
        </div>
      )}
    </div>
  );
}
