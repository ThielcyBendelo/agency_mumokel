# 🔧 Solution - Erreur 400 Firebase

## ❌ Problème Identifié

**Erreur** : `Failed to load resource: the server responded with a status of 400 ()`

**Cause** : Firebase essaie de s'initialiser avec des placeholders invalides dans `src/services/firebase.js`

---

## ✅ Solution Recommandée : Utiliser le Mode Mock

Votre application est déjà configurée pour fonctionner en mode MOCK (sans Firebase réel). C'est la solution la plus rapide pour tester la Phase 1.

### Étape 1 : Vérifier le Mode Mock

**Fichier** : `src/services/authService.js`

**Ligne 11** : Vérifier que `USE_MOCK_AUTH` est à `true`
```javascript
const USE_MOCK_AUTH = true; // ✅ Devrait être TRUE
```

### Étape 2 : Désactiver l'Initialisation Firebase

**Option A - Commentaire Temporaire** (Recommandé pour tests)

**Fichier** : `src/services/authService.firebase.js`

Commenter l'import de firebase.js :
```javascript
// AVANT
import { db } from './firebase';

// APRÈS
// import { db } from './firebase'; // ⚠️ Désactivé temporairement pour mode mock
const db = null; // Mock
```

**Option B - Fichier .env** (Pour production future)

Créer `.env.local` :
```env
VITE_USE_MOCK_AUTH=true
VITE_FIREBASE_API_KEY=your_real_key
VITE_FIREBASE_AUTH_DOMAIN=your_real_domain
# ... autres clés
```

---

## 🔄 Solution Alternative : Configurer Firebase Réel

Si vous voulez utiliser Firebase réellement :

### Étape 1 : Obtenir les Vraies Clés

1. Aller sur [Firebase Console](https://console.firebase.google.com/)
2. Sélectionner votre projet (ou en créer un)
3. Aller dans **Paramètres du projet** ⚙️
4. Copier les valeurs de configuration

### Étape 2 : Mettre à Jour firebase.js

**Fichier** : `src/services/firebase.js`

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", // Votre vraie clé
  authDomain: "votre-projet.firebaseapp.com",
  projectId: "votre-projet-id",
  storageBucket: "votre-projet.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

### Étape 3 : Autoriser le Domaine

Dans Firebase Console :
1. **Authentication** → **Settings** → **Authorized domains**
2. Ajouter : `localhost`

### Étape 4 : Mettre à Jour CSP

Dans `src/utils/cspConfig.js`, remplacer `'https://auth.monsite.com'` par votre vrai domaine Firebase :
```javascript
'frame-src': [
  "'self'",
  'https://votre-projet.firebaseapp.com', // ← Votre domaine réel
  'https://*.google.com',
],
```

---

## 🚀 Solution Rapide (Recommandée pour Tests)

### Fichier à Modifier : `src/services/authService.firebase.js`

```javascript
// Service d'authentification et gestion des rôles avec Firebase
import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
// import { db } from './firebase'; // ⚠️ DÉSACTIVÉ pour mode mock
import { doc, getDoc } from 'firebase/firestore';

// Mock db pour éviter l'erreur
const db = null;

let app;
let auth;

// Ne pas initialiser Firebase si en mode mock
const USE_MOCK = true; // ← Ajouter cette ligne

if (!USE_MOCK) {
  if (!getApps().length) {
    app = initializeApp({
      /* voir firebase.js pour config */
    });
  } else {
    app = getApps()[0];
  }
  auth = getAuth(app);
}

export const authService = {
  signIn(email, password) {
    if (USE_MOCK) {
      // Mode mock - retourner une promesse résolue
      return Promise.resolve({
        user: { uid: 'mock-uid', email }
      });
    }
    return signInWithEmailAndPassword(auth, email, password);
  },
  signOut() {
    if (USE_MOCK) {
      return Promise.resolve();
    }
    return signOut(auth);
  },
  onAuthStateChanged(callback) {
    if (USE_MOCK) {
      // Ne rien faire en mode mock
      return () => {};
    }
    return onAuthStateChanged(auth, callback);
  },
  async getUserRole(uid) {
    if (USE_MOCK || !db) {
      // Retourner un rôle par défaut en mode mock
      return 'user';
    }
    // Récupère le rôle depuis Firestore (collection users, champ role)
    const userDoc = await getDoc(doc(db, 'users', uid));
    return userDoc.exists() ? userDoc.data().role : 'reader';
  },
};
```

---

## 🔍 Vérification

Après modification :

### Console du Navigateur
- ✅ Plus d'erreur 400
- ✅ Plus d'erreur CSP Firebase
- ✅ Login fonctionne en mode mock

### Test de Login
1. Aller sur http://localhost:5173/login
2. Utiliser : `admin@example.com` / `bendelo1996$$$$$`
3. Vérifier la connexion réussie

---

## 📋 Checklist

- [ ] Vérifier `USE_MOCK_AUTH = true` dans `authService.js`
- [ ] Modifier `authService.firebase.js` pour désactiver Firebase
- [ ] Recharger la page
- [ ] Tester le login
- [ ] Vérifier qu'il n'y a plus d'erreur 400

---

## 💡 Recommandation

**Pour la Phase 1 (Tests)** : Utiliser le mode MOCK
- ✅ Pas besoin de Firebase
- ✅ Tests rapides
- ✅ Pas de configuration complexe

**Pour la Production** : Configurer Firebase réel
- Obtenir les vraies clés
- Configurer les domaines autorisés
- Mettre à jour le CSP
- Désactiver `USE_MOCK_AUTH`

---

**Temps estimé** : 2 minutes (mode mock) ou 15 minutes (Firebase réel)
**Difficulté** : Facile (mock) ou Moyenne (Firebase)
**Priorité** : Critique
