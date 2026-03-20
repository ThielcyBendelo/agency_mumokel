import React, { useState } from 'react';

const guides = [
  {
    id: 1,
    title: 'Guide utilisateur',
    link: '/docs/guide-utilisateur.pdf'
  },
  {
    id: 2,
    title: 'FAQ technique',
    link: '/docs/faq-technique.pdf'
  }
];

export default function SupportPage() {
  const [ticket, setTicket] = useState({ nom: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Ici, vous pouvez ajouter l’envoi vers le backend ou un service externe
    setSent(true);
    setTicket({ nom: '', email: '', message: '' });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Support & Assistance</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Chat en ligne</h2>
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <p className="text-gray-700 mb-2">Notre équipe est disponible pour répondre à vos questions.</p>
            <button className="bg-purple-600 text-white py-2 px-4 rounded font-bold hover:bg-purple-700">Lancer le chat</button>
          </div>
          <h2 className="text-xl font-semibold mb-4">Guides & Documentation</h2>
          <ul className="mb-4">
            {guides.map(guide => (
              <li key={guide.id} className="mb-2">
                <a href={guide.link} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">{guide.title}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Ticket d’assistance</h2>
          <form className="bg-white rounded-lg shadow-md p-4 flex flex-col" onSubmit={handleSubmit}>
            <label className="mb-2 font-semibold">Nom</label>
            <input type="text" name="nom" value={ticket.nom} onChange={handleChange} className="mb-4 p-2 border rounded" required />
            <label className="mb-2 font-semibold">Email</label>
            <input type="email" name="email" value={ticket.email} onChange={handleChange} className="mb-4 p-2 border rounded" required />
            <label className="mb-2 font-semibold">Message</label>
            <textarea name="message" value={ticket.message} onChange={handleChange} className="mb-4 p-2 border rounded" required />
            <button type="submit" className="bg-purple-600 text-white py-2 rounded font-bold hover:bg-purple-700">Envoyer</button>
            {sent && <span className="text-green-600 mt-2">Ticket envoyé !</span>}
          </form>
        </div>
      </div>
    </div>
  );
}
