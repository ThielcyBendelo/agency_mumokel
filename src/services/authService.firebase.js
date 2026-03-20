// Service d'authentification et gestion des rôles avec Firebase
// ⚠️ MODE MOCK ACTIVÉ - Firebase désactivé pour éviter les erreurs CSP

// Imports commentés pour éviter l'initialisation Firebase
// import { initializeApp, getApps } from 'firebase/app';
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
// } from 'firebase/auth';
// import { db } from './firebase';
// import { doc, getDoc } from 'firebase/firestore';

export const authService = {
  signIn(email, _password) {
    // Mode mock - retourner une promesse résolue
    console.log('🔧 [authService.firebase] Mode MOCK - Login simulé');
    return Promise.resolve({
      user: { 
        uid: 'mock-uid-' + Date.now(), 
        email,
        displayName: email.split('@')[0]
      }
    });
  },
  
  signOut() {
    console.log('🔧 [authService.firebase] Mode MOCK - Logout simulé');
    return Promise.resolve();
  },
  
  onAuthStateChanged(_callback) {
    console.log('🔧 [authService.firebase] Mode MOCK - Auth state change ignoré');
    // Ne rien faire en mode mock
    return () => {};
  },
  
  async getUserRole(_uid) {
    console.log('🔧 [authService.firebase] Mode MOCK - Rôle par défaut retourné');
    // Retourner un rôle par défaut en mode mock
    return 'user';
  },
};

console.log('✅ authService.firebase chargé en MODE MOCK (Firebase désactivé)');
