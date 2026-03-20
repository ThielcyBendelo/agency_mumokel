import React, { useEffect, useState } from 'react';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
  }, []);

  return (
    <button
      aria-label="Changer le thème"
      className={`fixed bottom-4 left-4 z-50 px-4 py-2 rounded font-bold shadow ${
        theme === 'dark'
          ? 'bg-gray-800 text-white'
          : 'bg-gray-200 text-gray-800'
      }`}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? 'Mode clair ☀️' : 'Mode sombre 🌙'}
    </button>
  );
}
