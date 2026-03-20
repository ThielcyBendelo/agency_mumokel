# 🧪 Guide de Tests Complets - Phase 1

## 📋 Prérequis

- ✅ Serveur de développement lancé : `npm run dev`
- ✅ URL : http://localhost:5173/
- ✅ Navigateur ouvert (Chrome/Firefox recommandé)
- ✅ Console développeur ouverte (F12)

---

## Test 1 : Routes Publiques ✅

### Objectif
Vérifier que les pages publiques sont accessibles sans authentification.

### Étapes
1. Ouvrir http://localhost:5173/
2. Vérifier que la page d'accueil se charge
3. Tester les liens suivants :
   - `/about` - Page À propos
   - `/services` - Page Services
   - `/contact` - Page Contact
   - `/blog` - Page Blog
   - `/portfolio` - Page Portfolio
   - `/projects` - Page Projets

### Résultat Attendu
- ✅ Toutes les pages se chargent sans erreur
- ✅ Aucune redirection vers /login
- ✅ Navigation fluide

### Vérification Console
```
Aucune erreur dans la console
```

---

## Test 2 : Routes Privées (Non Connecté) 🔐

### Objectif
Vérifier que les routes privées redirigent vers /login avec un message.

### Étapes
1. **Sans être connecté**, accéder à :
   - http://localhost:5173/profile
   - http://localhost:5173/notifications
   - http://localhost:5173/settings
   - http://localhost:5173/clients
   - http://localhost:5173/paiement

### Résultat Attendu
- ✅ Redirection automatique vers `/login`
- ✅ Toast message : "🔐 Veuillez vous connecter pour accéder à cette page"
- ✅ URL de destination sauvegardée dans l'état

### Vérification Console
```javascript
// Devrait afficher :
[PrivateRoute] User not authenticated
```

---

## Test 3 : Authentification 🔑

### Objectif
Tester le processus de connexion.

### Étapes
1. Aller sur http://localhost:5173/login
2. Utiliser les identifiants de test :
   - **Admin** :
     - Email : `bendelothielcy@gmail.com`
     - Password : `bendelo1996$$$$$`
   - **Utilisateur** :
     - Email : `user@example.com`
     - Password : `User@12345`

3. Cliquer sur "Se connecter"

### Résultat Attendu
- ✅ Toast : "Connexion réussie !"
- ✅ Redirection vers la page d'origine ou `/`
- ✅ UserMenu apparaît dans la navbar
- ✅ Avatar avec initiales visible

### Vérification Console
```javascript
[authService] INIT: utilisateur récupéré = { email: "...", role: "..." }
✅ Mock Login successful for: ...
```

---

## Test 4 : Routes Privées (Connecté) ✅

### Objectif
Vérifier l'accès aux routes privées une fois connecté.

### Étapes
1. **Connecté en tant qu'utilisateur**, accéder à :
   - http://localhost:5173/profile
   - http://localhost:5173/notifications
   - http://localhost:5173/settings

### Test Profile Page
- ✅ Affichage des informations utilisateur
- ✅ Cliquer sur "Modifier"
- ✅ Changer le nom
- ✅ Cliquer sur "Enregistrer"
- ✅ Toast : "✅ Profil mis à jour avec succès"

### Test Notifications Page
- ✅ Liste des notifications affichée
- ✅ Compteur de non lues visible
- ✅ Cliquer sur "Toutes" / "Non lues" / "Lues"
- ✅ Marquer une notification comme lue
- ✅ Supprimer une notification

### Test Settings Page
- ✅ Onglets visibles (Sécurité, Notifications, Apparence, Confidentialité)
- ✅ Changer d'onglet
- ✅ Modifier les préférences
- ✅ Cliquer sur "Enregistrer"
- ✅ Toast de confirmation

---

## Test 5 : Routes Admin (Utilisateur Normal) ❌

### Objectif
Vérifier que les utilisateurs normaux ne peuvent pas accéder aux routes admin.

### Étapes
1. **Connecté en tant qu'utilisateur normal**, accéder à :
   - http://localhost:5173/dashboard
   - http://localhost:5173/admin
   - http://localhost:5173/user-management
   - http://localhost:5173/payment-management

### Résultat Attendu
- ✅ Redirection vers `/`
- ✅ Toast : "❌ Accès refusé : Droits administrateur requis"
- ✅ Log dans la console

### Vérification Console
```javascript
❌ AdminRoute: User is not admin
[AUDIT] ... | USER | ... | DENIED_ACCESS | /dashboard
```

---

## Test 6 : Routes Admin (Admin) ✅

### Objectif
Vérifier l'accès complet pour les administrateurs.

### Étapes
1. **Se déconnecter** (cliquer sur UserMenu → Déconnexion)
2. **Se reconnecter en tant qu'admin** :
   - Email : `bendelothielcy@gmail.com`
   - Password : `bendelo1996$$$$$`

3. Accéder aux routes admin :
   - http://localhost:5173/dashboard
   - http://localhost:5173/admin
   - http://localhost:5173/admin/clients
   - http://localhost:5173/admin/projects
   - http://localhost:5173/admin/analytics
   - http://localhost:5173/user-management
   - http://localhost:5173/payment-management

### Résultat Attendu
- ✅ Accès autorisé à toutes les routes
- ✅ Dashboard s'affiche correctement
- ✅ Sidebar admin visible
- ✅ Navigation entre les sections fonctionne

### Vérification Console
```javascript
✅ Login successful for: bendelothielcy@gmail.com | Role: admin
[AUDIT] ... | ADMIN | ... | ACCESSED | /admin
```

---

## Test 7 : UserMenu 📱

### Objectif
Vérifier le fonctionnement du menu utilisateur.

### Étapes
1. **Connecté**, cliquer sur l'avatar dans la navbar
2. Vérifier les éléments du menu :
   - ✅ Avatar avec initiales
   - ✅ Nom et email
   - ✅ Badge de rôle (Admin/Utilisateur)
   - ✅ Compteur de notifications

3. Tester chaque lien :
   - Cliquer sur "Mon Profil" → `/profile`
   - Cliquer sur "Dashboard" → `/dashboard` (si admin)
   - Cliquer sur "Notifications" → `/notifications`
   - Cliquer sur "Paramètres" → `/settings`
   - Cliquer sur "Déconnexion"

### Résultat Attendu
- ✅ Menu s'ouvre/ferme correctement
- ✅ Tous les liens fonctionnent
- ✅ Navigation fluide
- ✅ Déconnexion réussie avec toast

---

## Test 8 : Page 404 🔍

### Objectif
Vérifier la page d'erreur 404.

### Étapes
1. Accéder à une route inexistante :
   - http://localhost:5173/route-qui-nexiste-pas
   - http://localhost:5173/xyz123

### Résultat Attendu
- ✅ Page 404 s'affiche
- ✅ Animation du "404" visible
- ✅ Message : "Page non trouvée"
- ✅ Bouton "Retour à l'accueil" fonctionne
- ✅ Bouton "Page précédente" fonctionne
- ✅ Liens rapides fonctionnent

---

## Test 9 : Redirection Post-Login 🔄

### Objectif
Vérifier que l'utilisateur est redirigé vers sa destination après login.

### Étapes
1. **Se déconnecter**
2. Essayer d'accéder à http://localhost:5173/profile
3. Être redirigé vers `/login`
4. Se connecter
5. Vérifier la redirection

### Résultat Attendu
- ✅ Après login, redirection vers `/profile` (destination d'origine)
- ✅ Pas de redirection vers `/`

### Note
⚠️ Cette fonctionnalité nécessite une modification dans `Login.jsx` (Phase 2)

---

## Test 10 : Persistance de Session 💾

### Objectif
Vérifier que la session persiste au rechargement.

### Étapes
1. **Connecté**, recharger la page (F5)
2. Vérifier l'état de connexion

### Résultat Attendu
- ✅ Utilisateur toujours connecté
- ✅ UserMenu visible
- ✅ Pas de redirection vers login

### Vérification Console
```javascript
[authService] INIT: token récupéré = mock_token_...
[authService] INIT: utilisateur récupéré = { ... }
```

---

## Test 11 : Navigation Complète 🗺️

### Objectif
Parcours utilisateur complet.

### Scénario Utilisateur Normal
1. Visiter la page d'accueil
2. Naviguer vers Services
3. Cliquer sur "S'inscrire"
4. Créer un compte (ou se connecter)
5. Accéder au profil
6. Modifier les informations
7. Consulter les notifications
8. Changer les paramètres
9. Se déconnecter

### Scénario Admin
1. Se connecter en tant qu'admin
2. Accéder au dashboard
3. Naviguer vers Clients
4. Consulter les projets
5. Vérifier les analytics
6. Accéder aux paramètres admin
7. Se déconnecter

### Résultat Attendu
- ✅ Parcours fluide sans erreur
- ✅ Toutes les pages se chargent
- ✅ Navigation cohérente
- ✅ Aucune erreur console

---

## Test 12 : Responsive Design 📱

### Objectif
Vérifier l'affichage sur mobile.

### Étapes
1. Ouvrir DevTools (F12)
2. Activer le mode responsive (Ctrl+Shift+M)
3. Tester différentes tailles :
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1920px)

### Pages à Tester
- Page d'accueil
- Profile
- Notifications
- Settings
- Dashboard (admin)
- Page 404

### Résultat Attendu
- ✅ Layout s'adapte correctement
- ✅ Menu mobile fonctionne
- ✅ Textes lisibles
- ✅ Boutons accessibles
- ✅ Pas de débordement horizontal

---

## 📊 Checklist Finale

### Routes
- [ ] Routes publiques accessibles
- [ ] Routes privées protégées (non connecté)
- [ ] Routes admin protégées (utilisateur normal)
- [ ] Routes admin accessibles (admin)
- [ ] Page 404 fonctionne

### Authentification
- [ ] Login fonctionne
- [ ] Register fonctionne
- [ ] Logout fonctionne
- [ ] Session persiste
- [ ] Messages toast affichés

### Nouvelles Pages
- [ ] ProfilePage fonctionne
- [ ] NotificationsPage fonctionne
- [ ] SettingsPage fonctionne
- [ ] NotFound fonctionne

### Navigation
- [ ] UserMenu fonctionne
- [ ] Tous les liens actifs
- [ ] Redirection post-login
- [ ] Navigation fluide

### UX
- [ ] Messages clairs
- [ ] Animations fluides
- [ ] Design cohérent
- [ ] Responsive

### Console
- [ ] Aucune erreur critique
- [ ] Logs d'audit présents
- [ ] Warnings acceptables

---

## 🐛 Bugs Potentiels à Surveiller

### 1. Erreur ESLint (Non bloquant)
```
'motion' is defined but never used
```
**Solution** : Ignorer ou ajouter `// eslint-disable-next-line`

### 2. Warnings React (Non bloquant)
```
Unnecessary try/catch wrapper
```
**Solution** : Refactoriser dans une future version

### 3. Style JSX (Non bloquant)
```
<style jsx> not supported
```
**Solution** : Utiliser styled-components ou CSS modules

---

## 📝 Rapport de Tests

### Format
Pour chaque test, noter :
- ✅ Réussi
- ⚠️ Réussi avec warnings
- ❌ Échoué

### Exemple
```
Test 1 : Routes Publiques
✅ / - OK
✅ /about - OK
✅ /services - OK
✅ /contact - OK
```

---

## 🚀 Après les Tests

### Si Tous les Tests Passent
1. Marquer la Phase 1 comme complétée
2. Passer à la Phase 2 (Amélioration du Menu)
3. Déployer en staging

### Si Des Tests Échouent
1. Noter les erreurs
2. Corriger les bugs
3. Re-tester
4. Documenter les changements

---

**Bonne chance avec les tests ! 🎉**

**Temps estimé** : 30-45 minutes
**Difficulté** : Moyenne
**Importance** : Critique
