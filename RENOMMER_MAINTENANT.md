# 🔄 RENOMMER LE PROJET MAINTENANT

**De:** `muamokel-services` → **Vers:** `muamokel-services`

---

## ⚡ MÉTHODE RAPIDE (5 MINUTES)

### ÉTAPE 1: Sauvegarder (30 secondes)

```bash
cd c:/Users/pc/Desktop/testsiteweb/muamokel-services
git add .
git commit -m "Backup avant renommage"
```

### ÉTAPE 2: Fermer VSCode

Fermez complètement VSCode avant de continuer.

### ÉTAPE 3: Renommer le dossier (10 secondes)

```powershell
# Dans PowerShell
cd c:/Users/pc/Desktop/testsiteweb
Rename-Item -Path "muamokel-services" -NewName "muamokel-services"
```

### ÉTAPE 4: Mettre à jour les fichiers (2 minutes)

Rouvrez VSCode dans le nouveau dossier:

```bash
cd c:/Users/pc/Desktop/testsiteweb/muamokel-services
code .
```

Puis utilisez la fonction "Rechercher et remplacer" de VSCode:

- Appuyez sur `Ctrl + Shift + H`
- Cochez "Utiliser une expression régulière" (icône `.*`)

**Remplacement 1:**

- Rechercher: `muamokel-services`
- Remplacer par: `muamokel-services`
- Cliquez sur "Remplacer tout"

**Remplacement 2:**

- Rechercher: `BendeloWeb`
- Remplacer par: `Muamokel Services`
- Cliquez sur "Remplacer tout"

**Remplacement 3:**

- Rechercher: `bendeloweb`
- Remplacer par: `muamokel`
- Cliquez sur "Remplacer tout"

**Remplacement 4:**

- Rechercher: `Ir Bendelo`
- Remplacer par: `Muamokel`
- Cliquez sur "Remplacer tout"

### ÉTAPE 5: Mettre à jour manuellement (1 minute)

**Fichier: `index.html`**
Changez:

```html
<title>Vite + React</title>
```

En:

```html
<title>Muamokel Services - Solutions Informatiques</title>
```

**Fichier: `public/manifest.json`**
Changez:

```json
"name": "Mon Site App",
"short_name": "MonSite",
```

En:

```json
"name": "Muamokel Services",
"short_name": "Muamokel",
"description": "Solutions informatiques professionnelles",
```

### ÉTAPE 6: Réinstaller les dépendances (1 minute)

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

### ÉTAPE 7: Tester (30 secondes)

```bash
# Terminal 1 - Backend
cd c:/Users/pc/Desktop/testsiteweb/muamokel-services/backend
npm run dev

# Terminal 2 - Frontend
cd c:/Users/pc/Desktop/testsiteweb/muamokel-services
npm run dev
```

Vérifiez:

- ✅ Le serveur démarre
- ✅ L'application se charge
- ✅ Le titre est "Muamokel Services"

### ÉTAPE 8: Commiter (30 secondes)

```bash
cd c:/Users/pc/Desktop/testsiteweb/muamokel-services
git add .
git commit -m "Renommage: muamokel-services → muamokel-services"
```

---

## ✅ C'EST FAIT!

Votre projet s'appelle maintenant **Muamokel Services**! 🎉

---

## 🔍 VÉRIFICATION RAPIDE

Vérifiez ces fichiers pour confirmer:

1. **package.json** (ligne 2):

   ```json
   "name": "muamokel-services",
   ```

2. **backend/package.json** (ligne 2):

   ```json
   "name": "muamokel-services-backend",
   ```

3. **index.html** (ligne ~7):

   ```html
   <title>Muamokel Services - Solutions Informatiques</title>
   ```

4. **backend/src/server.js** (ligne ~20):

   ```javascript
   message: '🚀 API Backend Muamokel Services',
   ```

5. **backend/src/config/database.js** (ligne ~5):
   ```javascript
   'mongodb://localhost:27017/muamokel';
   ```

---

## 🚨 EN CAS DE PROBLÈME

### Erreur: Module non trouvé

```bash
cd c:/Users/pc/Desktop/testsiteweb/muamokel-services
npm install
cd backend && npm install
```

### Revenir en arrière

```bash
cd c:/Users/pc/Desktop/testsiteweb
Rename-Item -Path "muamokel-services" -NewName "muamokel-services"
cd muamokel-services
git reset --hard HEAD~1
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

**Temps total: ~5 minutes**

**Prêt? Commencez par l'ÉTAPE 1! 🚀**
