// Patch temporaire pour forcer l'affichage du menu mobile
// Ajoutez ce code dans NavbarSecured.jsx pour tester le rendu du menu mobile sur desktop

import React from 'react';

export function ForceMobileMenu({ children }) {
  return (
    <div className="block md:hidden">
      {children}
    </div>
  );
}
