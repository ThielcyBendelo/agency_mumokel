# ✅ RENOMMAGE AUTOMATIQUE - PROGRESSION

## 🎯 OBJECTIF

Renommer le projet de `muamokel-services` à `muamokel-services`

---

## ✅ FICHIERS DÉJÀ MODIFIÉS

### 1. package.json (Frontend) ✅

**Changement effectué:**

```json
"name": "muamokel-services"
```

### 2. backend/package.json ✅

**Changements effectués:**

```json
"name": "muamokel-services-backend",
"description": "Backend API pour Muamokel Services - Solutions informatiques professionnelles",
"main": "src/server.js",
"scripts": {
  "start": "node src/server.js",
  "dev": "nodemon src/server.js",
  "test": "echo \"Tests à venir\" && exit 0"
}
```

---

## 📝 FICHIERS À MODIFIER MANUELLEMENT

### 3. index.html

**Ouvrez:** `muamokel-services/index.html`

**Changements à faire:**

**Ligne 9 - Titre:**

```html
<!-- AVANT -->
<title>Muamokel IT | Agence de services informatiques</title>

<!-- APRÈS -->
<title>Muamokel Services | Solutions Informatiques Professionnelles</title>
```

**Ligne 10 - Description:**

```html
<!-- AVANT -->
<meta name="description" content="Application web de muamokel." />

<!-- APRÈS -->
<meta
  name="description"
  content="Muamokel Services - Agence de développement web et solutions informatiques professionnelles. Expertise en React, Node.js, et technologies modernes."
/>
```

**Ligne 12-15 - Keywords et Author:**

```html
<!-- AVANT -->
<meta
  name="keywords"
  content="Agence de services informatiques, développement web, applications web, React, Node.js, portfolio développeur, Muamokel.com"
/>
<meta name="author" content="Muamokel IT" />

<!-- APRÈS -->
<meta
  name="keywords"
  content="Muamokel Services, agence informatique, développement web, applications web, React, Node.js, solutions IT, portfolio développeur"
/>
<meta name="author" content="Muamokel Services" />
```

**Ligne 44 - Apple Title:**

```html
<!-- AVANT -->
<meta name="apple-mobile-web-app-title" content="Ir Bendelo" />

<!-- APRÈS -->
<meta name="apple-mobile-web-app-title" content="Muamokel Services" />
```

**Ligne 62 - Canonical URL:**

```html
<!-- AVANT -->
<link rel="canonical" href="https://muamokel-services.com/" />

<!-- APRÈS -->
<link rel="canonical" href="https://muamokel-services.com/" />
```

**Lignes 75-82 - Open Graph:**

```html
<!-- AVANT -->
<meta property="og:title" content="Ir Bendelo | Développeur Web Full Stack" />
<meta
  property="og:description"
  content="Portfolio professionnel de Thielcy Bendelo - Développeur Web spécialisé en technologies modernes"
/>
<meta property="og:url" content="https://ir-bendelo.com" />

<!-- APRÈS -->
<meta
  property="og:title"
  content="Muamokel Services | Solutions Informatiques Professionnelles"
/>
<meta
  property="og:description"
  content="Muamokel Services - Agence de développement web et solutions informatiques. Expertise en React, Node.js et technologies modernes."
/>
<meta property="og:url" content="https://muamokel-services.com" />
```

**Lignes 91-96 - Twitter Card:**

```html
<!-- AVANT -->
<meta name="twitter:title" content="Ir Bendelo | Développeur Web Full Stack" />
<meta
  name="twitter:description"
  content="Portfolio professionnel de développeur web spécialisé en React et Node.js"
/>

<!-- APRÈS -->
<meta
  name="twitter:title"
  content="Muamokel Services | Solutions Informatiques"
/>
<meta
  name="twitter:description"
  content="Agence de développement web et solutions informatiques professionnelles"
/>
```

---

### 4. public/manifest.json

**Ouvrez:** `muamokel-services/public/manifest.json`

**Changements à faire:**

```json
{
  "name": "Muamokel Services",
  "short_name": "Muamokel",
  "description": "Solutions informatiques professionnelles"
}
```

---

### 5. backend/src/server.js

**Ouvrez:** `muamokel-services/backend/src/server.js`

**Ligne ~20 - Message API:**

```javascript
// AVANT
message: '🚀 API Backend BendeloWeb',

// APRÈS
message: '🚀 API Backend Muamokel Services',
```

---

### 6. backend/src/config/database.js

**Ouvrez:** `muamokel-services/backend/src/config/database.js`

**Ligne ~5 - MongoDB URI:**

```javascript
// AVANT
'mongodb://localhost:27017/bendeloweb';

// APRÈS
'mongodb://localhost:27017/muamokel';
```

---

### 7. README.md

**Ouvrez:** `muamokel-services/README.md`

**Remplacez tout le contenu par:**

```markdown
# 🚀 Muamokel Services

Application web professionnelle pour services informatiques.

## 🎯 Description

Muamokel Services est une plateforme complète offrant:

- 💼 Portfolio de projets
- 📝 Blog technique
- 💳 Système de paiement intégré (Stripe + PayPal)
- 📊 Dashboard administrateur
- 👥 Gestion des clients
- 📧 Système de contact avancé
- 🔐 Authentification sécurisée

## 🛠️ Technologies

### Frontend

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** TailwindCSS
- **Routing:** React Router v7
- **Animations:** Framer Motion

### Backend

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB + Mongoose
- **Auth:** JWT + Firebase

## 📦 Installation

\`\`\`bash

# Frontend

npm install
npm run dev

# Backend

cd backend
npm install
npm run dev
\`\`\`

## 🚀 Démarrage

1. Configurer les variables d'environnement (.env)
2. Démarrer MongoDB
3. Lancer le backend: \`cd backend && npm run dev\`
4. Lancer le frontend: \`npm run dev\`

## 📚 Documentation

- \`LISEZ_MOI_ANALYSE.md\` - Analyse du projet
- \`GUIDE_CONTINUATION.md\` - Guide de développement
- \`COMMANDES_A_EXECUTER.md\` - Commandes utiles

## 👥 Équipe

Développé par l'équipe Muamokel Services

## 📄 Licence

Propriétaire - Tous droits réservés © 2024 Muamokel Services
```

---

## 🔍 RECHERCHE ET REMPLACEMENT GLOBAL

### Utiliser VSCode (Recommandé)

1. **Ouvrir la recherche globale:** `Ctrl + Shift + H`

2. **Remplacement 1:**

   - Rechercher: `muamokel-services`
   - Remplacer par: `muamokel-services`
   - Cliquer sur "Remplacer tout"

3. **Remplacement 2:**

   - Rechercher: `BendeloWeb`
   - Remplacer par: `Muamokel Services`
   - Cliquer sur "Remplacer tout"

4. **Remplacement 3:**

   - Rechercher: `bendeloweb`
   - Remplacer par: `muamokel`
   - Cliquer sur "Remplacer tout"

5. **Remplacement 4:**
   - Rechercher: `Ir Bendelo`
   - Remplacer par: `Muamokel`
   - Cliquer sur "Remplacer tout"

---

## ✅ CHECKLIST FINALE

Après avoir fait tous les changements:

- [ ] index.html mis à jour
- [ ] manifest.json mis à jour
- [ ] server.js mis à jour
- [ ] database.js mis à jour
- [ ] README.md mis à jour
- [ ] Recherche/remplacement global effectué
- [ ] Vérifier qu'il n'y a plus de références à l'ancien nom

---

## 🧪 TESTS

Après les modifications:

```bash
# 1. Vérifier les fichiers
git status

# 2. Tester le backend
cd backend
npm run dev
# Vérifier: http://localhost:5000/health

# 3. Tester le frontend
npm run dev
# Vérifier: http://localhost:5173
```

---

## 📊 RÉSUMÉ

**Fichiers modifiés automatiquement:** 2/7

- ✅ package.json
- ✅ backend/package.json

**Fichiers à modifier manuellement:** 5/7

- ⏳ index.html
- ⏳ manifest.json
- ⏳ server.js
- ⏳ database.js
- ⏳ README.md

**Recherche/remplacement global:** À faire

---

**Temps estimé pour finir:** 5-10 minutes

**Suivez les instructions ci-dessus pour compléter le renommage! 🚀**
