# Backend Node.js/Express

API REST pour la gestion des utilisateurs et des paiements.

## Démarrage

1. Copier `.env.example` en `.env` et configurer la connexion MongoDB si souhaité.
2. Installer les dépendances :
   ```
   npm install
   ```
3. Démarrer le serveur :
   ```
   npm run dev
   ```

## Endpoints principaux

- **Utilisateurs** : `/api/users`
  - GET `/` : liste des utilisateurs
  - POST `/` : créer un utilisateur
  - PUT `/:id` : modifier un utilisateur
  - DELETE `/:id` : supprimer un utilisateur

- **Paiements** : `/api/payments`
  - GET `/` : liste des paiements
  - POST `/` : créer un paiement
  - PUT `/:id` : modifier un paiement
  - DELETE `/:id` : supprimer un paiement

## Fallback mémoire

Si MongoDB n'est pas configuré, le backend démarre en mode mémoire (aucune persistance).

## Sécurité & Validation

- Validation des champs côté modèle
- CORS activé
- Logs via Morgan

## À connecter avec le frontend React

Configurez l’URL du backend dans le frontend pour utiliser les endpoints REST.
