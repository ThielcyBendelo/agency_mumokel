import React from 'react';
import NavbarSecured from '../components/NavbarSecured';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';

const articles = [
  {
    id: 1,
    title: 'Tendances IT 2025',
    image: '/images/blog/it2025.jpg',
    summary: 'Découvrez les grandes tendances technologiques à suivre en 2025.',
    date: '15/11/2025',
    category: 'Tendances',
    content:
      'Les technologies cloud, IA et cybersécurité seront au cœur des enjeux...',
  },
  {
    id: 2,
    title: 'Conseils pour sécuriser votre site',
    image: '/images/blog/securite.jpg',
    summary:
      'Les bonnes pratiques pour protéger vos données et vos utilisateurs.',
    date: '01/11/2025',
    category: 'Sécurité',
    content:
      'Utilisez HTTPS, mettez à jour vos dépendances, surveillez les accès...',
  },
];

export default function BlogPage() {
  const [selected, setSelected] = React.useState(null);

  return (
    <>
      <NavbarSecured />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Blog & Actualités</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col cursor-pointer"
              onClick={() => setSelected(article)}
            >
              <img
                src={article.image}
                alt={article.title}
                className="h-32 w-full object-cover rounded mb-2"
              />
              <h2 className="text-xl font-semibold mb-1">{article.title}</h2>
              <p className="text-gray-500 text-sm mb-1">
                {article.date} | {article.category}
              </p>
              <p className="text-gray-700 mb-2">{article.summary}</p>
              <span className="text-purple-600 font-bold">Lire plus</span>
            </div>
          ))}
        </div>
        {selected && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-500 text-xl"
                onClick={() => setSelected(null)}
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-2">{selected.title}</h2>
              <p className="text-gray-500 text-sm mb-2">
                {selected.date} | {selected.category}
              </p>
              <img
                src={selected.image}
                alt={selected.title}
                className="h-40 w-full object-cover rounded mb-4"
              />
              <p className="text-gray-700 mb-4">{selected.content}</p>
            </div>
          </div>
        )}
      </div>
      <FAQSection />
      <Footer />
    </>
  );
}
