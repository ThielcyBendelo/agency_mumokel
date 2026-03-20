# 🔧 Correction Urgente - CSP Firebase

## ❌ Problème Détecté

L'erreur CSP bloque les appels à Firebase Authentication :
```
Connecting to 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=VOTRE_API_KEY' 
violates the following Content Security Policy directive: "connect-src 'self' http://localhost:* 
https://api.github.com https://auth.monsite.com"
```

## ✅ Solution Rapide

### Fichier à Modifier
`muamokel-services/src/utils/cspConfig.js`

### Changements à Effectuer

**Ligne 24-29** (section development) :
```javascript
// AVANT
'connect-src': [
  "'self'",
  'http://localhost:*',
  'https://api.github.com',
  'https://auth.monsite.com',
],

// APRÈS
'connect-src': [
  "'self'",
  'http://localhost:*',
  'https://api.github.com',
  'https://auth.monsite.com',
  'https://identitytoolkit.googleapis.com',
  'https://securetoken.googleapis.com',
  'https://*.firebaseio.com',
  'https://*.googleapis.com',
  'https://firestore.googleapis.com',
],
```

**Ligne 48-53** (section production) :
```javascript
// AVANT
'connect-src': [
  "'self'",
  'https://api.yourdomain.com',
  'https://api.emailjs.com',
  'https://auth.monsite.com',
],

// APRÈS
'connect-src': [
  "'self'",
  'https://api.yourdomain.com',
  'https://api.emailjs.com',
  'https://auth.monsite.com',
  'https://identitytoolkit.googleapis.com',
  'https://securetoken.googleapis.com',
  'https://*.firebaseio.com',
  'https://*.googleapis.com',
  'https://firestore.googleapis.com',
],
```

## 📝 Étapes Manuelles

1. Ouvrir `muamokel-services/src/utils/cspConfig.js`
2. Trouver la section `development` → `'connect-src'`
3. Ajouter les 5 lignes Firebase après `'https://auth.monsite.com',`
4. Trouver la section `production` → `'connect-src'`
5. Ajouter les 5 lignes Firebase après `'https://auth.monsite.com',`
6. Sauvegarder le fichier
7. Le serveur Vite devrait recharger automatiquement

## 🔍 Vérification

Après modification, recharger la page et vérifier :
- ✅ Plus d'erreur CSP dans la console
- ✅ Firebase peut se connecter
- ✅ Login fonctionne

## 🚀 Domaines Firebase Ajoutés

- `https://identitytoolkit.googleapis.com` - Authentication API
- `https://securetoken.googleapis.com` - Token management
- `https://*.firebaseio.com` - Realtime Database
- `https://*.googleapis.com` - Google APIs générales
- `https://firestore.googleapis.com` - Firestore Database

## ⚠️ Note Importante

Ces domaines sont nécessaires pour que Firebase fonctionne correctement. Sans eux, toutes les opérations d'authentification seront bloquées par le CSP.
