# 🔄 GUIDE DE RENOMMAGE DU PROJET

**De:** `muamokel-services`
**Vers:** `muamokel-services`

---

## ⚠️ IMPORTANT - AVANT DE COMMENCER

1. **Sauvegardez tout:**

   ```bash
   git add .
   git commit -m "Backup avant renommage du projet"
   ```

2. **Fermez tous les terminaux** en cours d'exécution

3. **Fermez VSCode** (nous allons renommer le dossier)

---

## 📝 ÉTAPE 1: RENOMMER LE DOSSIER PRINCIPAL

```bash
# Depuis c:/Users/pc/Desktop/testsiteweb/
cd c:/Users/pc/Desktop/testsiteweb
Rename-Item -Path "muamokel-services" -NewName "muamokel-services"
```

---

## 📝 ÉTAPE 2: METTRE À JOUR package.json (Frontend)

**Fichier:** `muamokel-services/package.json`

Changez:

```json
{
  "name": "muamokel-services",
```

En:

```json
{
  "name": "muamokel-services",
```

---

## 📝 ÉTAPE 3: METTRE À JOUR package.json (Backend)

**Fichier:** `muamokel-services/backend/package.json`

Changez:

```json
{
  "name": "backend",
```

En:

```json
{
  "name": "muamokel-services-backend",
  "description": "Backend API pour Muamokel Services",
```

---

## 📝 ÉTAPE 4: METTRE À JOUR index.html

**Fichier:** `muamokel-services/index.html`

Changez:

```html
<title>Vite + React</title>
```

En:

```html
<title>Muamokel Services - Solutions Informatiques Professionnelles</title>
```

---

## 📝 ÉTAPE 5: METTRE À JOUR manifest.json

**Fichier:** `muamokel-services/public/manifest.json`

Changez:

```json
{
  "name": "Mon Site App",
  "short_name": "MonSite",
```

En:

```json
{
  "name": "Muamokel Services",
  "short_name": "Muamokel",
  "description": "Solutions informatiques professionnelles",
```

---

## 📝 ÉTAPE 6: METTRE À JOUR README.md

**Fichier:** `muamokel-services/README.md`

Remplacez le contenu par:

```markdown
# 🚀 Muamokel Services

Application web professionnelle pour services informatiques.

## 🎯 Description

Muamokel Services est une plateforme complète offrant:

- Portfolio de projets
- Blog technique
- Système de paiement intégré
- Dashboard administrateur
- Gestion des clients

## 🛠️ Technologies

- **Frontend:** React 18 + Vite + TailwindCSS
- **Backend:** Node.js + Express + MongoDB
- **Paiements:** Stripe + PayPal
- **Email:** EmailJS
- **Auth:** JWT + Firebase

## 📦 Installation

### Frontend

\`\`\`bash
npm install
npm run dev
\`\`\`

### Backend

\`\`\`bash
cd backend
npm install
npm run dev
\`\`\`

## 🚀 Démarrage

1. Configurer les variables d'environnement (.env)
2. Démarrer MongoDB
3. Lancer le backend: `cd backend && npm run dev`
4. Lancer le frontend: `npm run dev`

## 📚 Documentation

- `LISEZ_MOI_ANALYSE.md` - Analyse du projet
- `GUIDE_CONTINUATION.md` - Guide de développement
- `COMMANDES_A_EXECUTER.md` - Commandes utiles

## 👥 Équipe

Développé par l'équipe Muamokel Services

## 📄 Licence

Propriétaire - Tous droits réservés
```

---

## 📝 ÉTAPE 7: METTRE À JOUR server.js (Backend)

**Fichier:** `muamokel-services/backend/src/server.js`

Changez:

```javascript
res.json({
  message: '🚀 API Backend BendeloWeb',
```

En:

```javascript
res.json({
  message: '🚀 API Backend Muamokel Services',
```

---

## 📝 ÉTAPE 8: METTRE À JOUR database.js

**Fichier:** `muamokel-services/backend/src/config/database.js`

Changez:

```javascript
const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bendeloweb', {
```

En:

```javascript
const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/muamokel', {
```

---

## 📝 ÉTAPE 9: METTRE À JOUR .env (Backend)

**Fichier:** `muamokel-services/backend/.env`

Changez:

```env
MONGO_URI=mongodb://localhost:27017/bendeloweb
```

En:

```env
MONGO_URI=mongodb://localhost:27017/muamokel
```

---

## 📝 ÉTAPE 10: METTRE À JOUR LES DOCUMENTS D'ANALYSE

Mettez à jour les références dans:

- `LISEZ_MOI_ANALYSE.md`
- `RAPPORT_ANALYSE_DUPLICATIONS.md`
- `AMELIORATIONS_PROFESSIONNELLES.md`
- `PLAN_REFACTORISATION.md`
- `GUIDE_CONTINUATION.md`
- `COMMANDES_A_EXECUTER.md`

Remplacez toutes les occurrences de:

- `muamokel-services` → `muamokel-services`
- `BendeloWeb` → `Muamokel Services`
- `bendeloweb` → `muamokel`

---

## 📝 ÉTAPE 11: RECHERCHER ET REMPLACER DANS TOUT LE PROJET

### Méthode 1: Avec VSCode

1. Ouvrez VSCode dans le nouveau dossier:

   ```bash
   cd c:/Users/pc/Desktop/testsiteweb/muamokel-services
   code .
   ```

2. Appuyez sur `Ctrl + Shift + H` (Rechercher et remplacer dans les fichiers)

3. Remplacez:
   - `muamokel-services` → `muamokel-services`
   - `BendeloWeb` → `Muamokel Services`
   - `bendeloweb` → `muamokel`
   - `Ir Bendelo` → `Muamokel` (dans les composants UI)

### Méthode 2: Avec PowerShell

```powershell
cd c:/Users/pc/Desktop/testsiteweb/muamokel-services

# Rechercher toutes les occurrences
Get-ChildItem -Recurse -File | Select-String "muamokel-services" | Select-Object Path, LineNumber

# Remplacer dans tous les fichiers (ATTENTION: teste d'abord!)
Get-ChildItem -Recurse -File -Include *.js,*.jsx,*.json,*.md,*.html | ForEach-Object {
    (Get-Content $_.FullName) -replace 'muamokel-services', 'muamokel-services' | Set-Content $_.FullName
}
```

---

## 📝 ÉTAPE 12: METTRE À JOUR Git

```bash
cd c:/Users/pc/Desktop/testsiteweb/muamokel-services

# Vérifier les changements
git status

# Ajouter tous les changements
git add .

# Commiter
git commit -m "Renommage du projet: muamokel-services → muamokel-services"

# Si vous avez un remote, mettre à jour
git remote set-url origin <nouvelle-url-si-nécessaire>
```

---

## 📝 ÉTAPE 13: NETTOYER node_modules

```bash
# Frontend
cd c:/Users/pc/Desktop/testsiteweb/muamokel-services
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install

# Backend
cd backend
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```

---

## 📝 ÉTAPE 14: TESTER

```bash
# Backend
cd c:/Users/pc/Desktop/testsiteweb/muamokel-services/backend
npm run dev

# Frontend (nouveau terminal)
cd c:/Users/pc/Desktop/testsiteweb/muamokel-services
npm run dev
```

Vérifiez:

- ✅ Le serveur démarre sans erreur
- ✅ L'application frontend se charge
- ✅ Le titre de la page est "Muamokel Services"
- ✅ Les logs affichent "Muamokel Services"

---

## ✅ CHECKLIST DE VÉRIFICATION

Après le renommage, vérifiez:

- [ ] Dossier renommé: `muamokel-services`
- [ ] `package.json` (frontend) mis à jour
- [ ] `package.json` (backend) mis à jour
- [ ] `index.html` mis à jour
- [ ] `manifest.json` mis à jour
- [ ] `README.md` mis à jour
- [ ] `server.js` mis à jour
- [ ] `database.js` mis à jour
- [ ] `.env` mis à jour
- [ ] Documents d'analyse mis à jour
- [ ] Recherche/remplacement effectué
- [ ] Git commité
- [ ] `node_modules` réinstallés
- [ ] Tests effectués
- [ ] Tout fonctionne ✅

---

## 🚨 EN CAS DE PROBLÈME

### Erreur: Module non trouvé

```bash
# Réinstaller les dépendances
cd c:/Users/pc/Desktop/testsiteweb/muamokel-services
Remove-Item -Recurse -Force node_modules
npm install

cd backend
Remove-Item -Recurse -Force node_modules
npm install
```

### Erreur: Base de données

```bash
# Vérifier que MongoDB utilise le nouveau nom
# Dans .env: MONGO_URI=mongodb://localhost:27017/muamokel
```

### Revenir en arrière

```bash
cd c:/Users/pc/Desktop/testsiteweb
git checkout .
Rename-Item -Path "muamokel-services" -NewName "muamokel-services"
```

---

## 📊 RÉSUMÉ DES CHANGEMENTS

| Ancien              | Nouveau             |
| ------------------- | ------------------- |
| `muamokel-services` | `muamokel-services` |
| `BendeloWeb`        | `Muamokel Services` |
| `bendeloweb`        | `muamokel`          |
| `Ir Bendelo`        | `Muamokel`          |

---

**Temps estimé:** 15-20 minutes

**Difficulté:** Facile

**Risque:** Faible (avec backup Git)

---

**Prêt à renommer? Suivez les étapes une par une! 🚀**
