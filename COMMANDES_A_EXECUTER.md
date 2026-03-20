# ⚡ COMMANDES À EXÉCUTER - GUIDE PRATIQUE

**Date:** 6 décembre 2024
**Statut:** Prêt à continuer

---

## 🎯 ÉTAPE ACTUELLE: Finaliser le Backend Unifié

### 1️⃣ CRÉER LE FICHIER .env

```bash
# Créer le fichier .env dans backend/
cd muamokel-services/backend
```

Créez le fichier `backend/.env` avec ce contenu:

```env
# Database
MONGO_URI=mongodb://localhost:27017/bendeloweb

# Server
PORT=5000
NODE_ENV=development

# Frontend
FRONTEND_URL=http://localhost:5173

# JWT
JWT_SECRET=votre-secret-super-securise-changez-moi-en-production
JWT_EXPIRES_IN=7d

# Email (si vous utilisez EmailJS)
EMAILJS_SERVICE_ID=votre_service_id
EMAILJS_TEMPLATE_ID=votre_template_id
EMAILJS_PUBLIC_KEY=votre_public_key
```

### 2️⃣ INSTALLER NODEMON (pour le développement)

```bash
cd muamokel-services/backend
npm install --save-dev nodemon
```

### 3️⃣ METTRE À JOUR package.json

Ouvrez `backend/package.json` et ajoutez ces scripts:

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "echo \"Tests à venir\" && exit 0"
  }
}
```

### 4️⃣ DÉMARRER LE SERVEUR

```bash
# Option 1: Mode production
npm start

# Option 2: Mode développement (avec auto-reload)
npm run dev
```

### 5️⃣ TESTER LE SERVEUR

Ouvrez un nouveau terminal et testez:

```bash
# Test 1: Health check
curl http://localhost:5000/health

# Test 2: Route racine
curl http://localhost:5000/

# Test 3: Route inexistante (doit retourner 404)
curl http://localhost:5000/route-qui-nexiste-pas
```

**Résultats attendus:**

- ✅ Test 1: `{"status":"OK","message":"Serveur backend opérationnel",...}`
- ✅ Test 2: `{"message":"🚀 API Backend BendeloWeb",...}`
- ✅ Test 3: `{"success":false,"error":"Route non trouvée:..."}`

### 6️⃣ COMMITER LES CHANGEMENTS

```bash
cd muamokel-services
git add .
git commit -m "Backend unifié - Configuration complète"
```

---

## 🎯 PROCHAINE ÉTAPE: Authentification Unifiée

### 1️⃣ CRÉER LA STRUCTURE

```bash
cd muamokel-services

# Backend
mkdir -p backend/src/features/auth

# Frontend
mkdir -p src/features/auth/services
mkdir -p src/features/auth/context
mkdir -p src/features/auth/hooks
mkdir -p src/features/auth/components
```

### 2️⃣ INSTALLER LES DÉPENDANCES

```bash
# Backend
cd backend
npm install bcryptjs jsonwebtoken

# Frontend
cd ../
npm install axios
```

### 3️⃣ CRÉER LES FICHIERS

Copiez le code depuis `GUIDE_CONTINUATION.md`:

**Backend:**

- `backend/src/features/auth/auth.service.js`
- `backend/src/features/auth/auth.controller.js`
- `backend/src/features/auth/auth.routes.js`

**Frontend:**

- `src/features/auth/services/authService.js`
- `src/features/auth/context/AuthContext.jsx`
- `src/features/auth/hooks/useAuth.js`

### 4️⃣ METTRE À JOUR App.jsx

Enveloppez votre app avec AuthProvider:

```jsx
import { AuthProvider } from './features/auth/context/AuthContext';

function App() {
  return <AuthProvider>{/* Votre app existante */}</AuthProvider>;
}
```

### 5️⃣ TESTER L'AUTHENTIFICATION

```bash
# Test inscription
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test1234","name":"Test User"}'

# Test connexion
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test1234"}'
```

### 6️⃣ SUPPRIMER LES ANCIENS SERVICES

```bash
cd muamokel-services

# Sauvegarder d'abord
git add .
git commit -m "Auth unifié créé"

# Supprimer les anciens
rm src/services/authService.firebase.js
rm src/services/authApi.js

# Commiter
git add .
git commit -m "Anciens services auth supprimés"
```

---

## 🎯 APRÈS L'AUTHENTIFICATION: Navbar Unifiée

### 1️⃣ CRÉER LA STRUCTURE

```bash
cd muamokel-services
mkdir -p src/shared/components/navigation
```

### 2️⃣ CRÉER LES FICHIERS

Copiez le code depuis `GUIDE_CONTINUATION.md`:

- `src/shared/components/navigation/useNavigation.js`
- `src/shared/components/navigation/Navbar.jsx`
- `src/shared/components/navigation/NavbarMobile.jsx`
- `src/shared/components/navigation/NavbarDesktop.jsx`

### 3️⃣ REMPLACER DANS App.jsx

```jsx
// Ancien
import Navbar from './components/Navbar';
import NavbarSecured from './components/NavbarSecured';

// Nouveau
import { Navbar } from './shared/components/navigation/Navbar';
```

### 4️⃣ TESTER LA NAVBAR

1. Démarrez le frontend: `npm run dev`
2. Ouvrez http://localhost:5173
3. Testez:
   - ✅ Navigation desktop
   - ✅ Menu mobile
   - ✅ Boutons auth
   - ✅ Scroll smooth

### 5️⃣ SUPPRIMER LES ANCIENNES NAVBARS

```bash
cd muamokel-services

# Sauvegarder
git add .
git commit -m "Navbar unifiée créée"

# Supprimer
rm src/components/Navbar-backup.jsx
rm src/components/NavbarClean.jsx
rm src/components/NavbarSimple.jsx

# Garder temporairement Navbar.jsx et NavbarSecured.jsx
# Les supprimer après avoir tout testé

# Commiter
git add .
git commit -m "Anciennes navbars supprimées"
```

---

## 📊 CHECKLIST DE PROGRESSION

### Backend Unifié

- [x] Structure créée
- [x] Configuration database
- [x] Configuration Express
- [x] Middleware erreurs
- [x] Serveur principal
- [ ] Fichier .env créé
- [ ] Tests complets
- [ ] Anciens serveurs supprimés

### Authentification

- [ ] Structure créée
- [ ] Dépendances installées
- [ ] Service backend créé
- [ ] Service frontend créé
- [ ] AuthContext créé
- [ ] Tests
- [ ] Anciens services supprimés

### Navbar

- [ ] Structure créée
- [ ] Hook useNavigation créé
- [ ] Composant Navbar unifié
- [ ] Tests
- [ ] Anciennes navbars supprimées

---

## 🚨 EN CAS DE PROBLÈME

### Le serveur ne démarre pas

```bash
# Vérifier les dépendances
cd muamokel-services/backend
npm install

# Vérifier le fichier .env
cat .env

# Vérifier MongoDB
# Assurez-vous que MongoDB est installé et démarré
```

### Erreur de connexion MongoDB

```bash
# Option 1: Utiliser MongoDB local
# Installer MongoDB: https://www.mongodb.com/try/download/community

# Option 2: Utiliser MongoDB Atlas (cloud)
# Créer un compte gratuit: https://www.mongodb.com/cloud/atlas
# Copier la connection string dans .env
```

### Erreur CORS

```bash
# Vérifier que FRONTEND_URL dans .env correspond à votre URL frontend
# Par défaut: http://localhost:5173
```

### Port déjà utilisé

```bash
# Changer le port dans .env
PORT=5001

# Ou tuer le processus sur le port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:5000 | xargs kill -9
```

---

## 📞 RESSOURCES

**Documents à consulter:**

- `LISEZ_MOI_ANALYSE.md` - Vue d'ensemble
- `GUIDE_CONTINUATION.md` - Code détaillé
- `PLAN_REFACTORISATION.md` - Plan complet
- `PROGRESSION_REFACTORISATION.md` - Suivi

**Commandes Git utiles:**

```bash
# Voir les changements
git status
git diff

# Annuler des changements
git checkout -- <fichier>

# Créer une branche de backup
git branch backup-avant-refactorisation

# Revenir en arrière si besoin
git reset --hard HEAD~1
```

---

## ✅ VALIDATION

Après chaque étape, vérifiez:

**Backend:**

- [ ] Serveur démarre sans erreur
- [ ] MongoDB connecté
- [ ] Routes répondent correctement
- [ ] Logs clairs et informatifs

**Frontend:**

- [ ] Application démarre
- [ ] Pas d'erreurs console
- [ ] Navigation fonctionne
- [ ] Auth fonctionne

**Tests:**

- [ ] Endpoints testés avec curl
- [ ] UI testée manuellement
- [ ] Pas de régression

---

**Vous êtes prêt! Commencez par l'étape 1 et avancez progressivement. Bon courage! 🚀**
