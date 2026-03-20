# 🔧 PLAN DE REFACTORISATION - GUIDE D'IMPLÉMENTATION

**Projet:** muamokel-services (BendeloWeb)
**Durée estimée:** 6 semaines
**Objectif:** Éliminer les duplications et moderniser l'architecture

---

## 📅 PLANNING DÉTAILLÉ

### 🔴 PHASE 1 - CRITIQUE (Semaines 1-2)

#### Semaine 1: Backend Unifié

**Jour 1-2: Consolidation des serveurs**

1. **Créer la structure backend unifiée**

```bash
mkdir -p backend/src/{config,features,shared}
mkdir -p backend/src/features/{auth,users,payments,quotes,contact}
mkdir -p backend/src/shared/{middleware,utils,constants}
```

2. **Migrer la configuration**

```javascript
// backend/src/config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB connecté: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ Erreur MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

```javascript
// backend/src/config/express.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const configureExpress = (app) => {
  // Security
  app.use(helmet());

  // CORS
  app.use(
    cors({
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      credentials: true,
    })
  );

  // Body parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Logging
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  return app;
};

module.exports = configureExpress;
```

3. **Créer le serveur principal**

```javascript
// backend/src/server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const configureExpress = require('./config/express');

// Import routes
const authRoutes = require('./features/auth/auth.routes');
const userRoutes = require('./features/users/user.routes');
const paymentRoutes = require('./features/payments/payment.routes');
const quoteRoutes = require('./features/quotes/quote.routes');
const contactRoutes = require('./features/contact/contact.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Configure Express
configureExpress(app);

// Connect to database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/contact', contactRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Erreur serveur',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV}`);
});

module.exports = app;
```

4. **Supprimer les anciens serveurs**

```bash
# Sauvegarder d'abord
git add .
git commit -m "Backup avant suppression serveurs"

# Supprimer
rm server.mjs
rm stripe-server.mjs
rm -rf server/
```

**Jour 3-4: Authentification unifiée**

1. **Créer le service d'authentification unifié**

```javascript
// backend/src/features/auth/auth.service.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../users/user.model');

class AuthService {
  async register(userData) {
    const { email, password, name } = userData;

    // Vérifier si l'utilisateur existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Email déjà utilisé');
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      role: 'user',
    });

    // Générer le token
    const token = this.generateToken(user);

    return {
      user: this.sanitizeUser(user),
      token,
    };
  }

  async login(email, password) {
    // Trouver l'utilisateur
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new Error('Email ou mot de passe incorrect');
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Email ou mot de passe incorrect');
    }

    // Générer le token
    const token = this.generateToken(user);

    return {
      user: this.sanitizeUser(user),
      token,
    };
  }

  generateToken(user) {
    return jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Token invalide');
    }
  }

  sanitizeUser(user) {
    const userObj = user.toObject();
    delete userObj.password;
    return userObj;
  }
}

module.exports = new AuthService();
```

2. **Frontend: Service d'authentification unifié**

```javascript
// src/features/auth/services/authService.js
import { api } from '@/shared/services/api';

class AuthService {
  constructor() {
    this.TOKEN_KEY = 'auth_token';
    this.USER_KEY = 'auth_user';
  }

  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    this.setSession(response.data);
    return response.data;
  }

  async register(userData) {
    const response = await api.post('/auth/register', userData);
    this.setSession(response.data);
    return response.data;
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    window.location.href = '/';
  }

  setSession({ token, user }) {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUser() {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated() {
    return !!this.getToken();
  }
}

export const authService = new AuthService();
```

3. **Supprimer les anciens services d'auth**

```bash
rm src/services/authService.firebase.js
rm src/services/authApi.js
# Garder uniquement authService.js et le renommer
mv src/services/authService.js src/features/auth/services/authService.js
```

**Jour 5: Navbar unifiée**

1. **Créer la nouvelle structure**

```bash
mkdir -p src/shared/components/navigation
```

2. **Composant Navbar unifié**

```javascript
// src/shared/components/navigation/Navbar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { NavbarMobile } from './NavbarMobile';
import { NavbarDesktop } from './NavbarDesktop';
import { NavbarAuth } from './NavbarAuth';
import { useNavigation } from './useNavigation';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { navItems, handleNavClick } = useNavigation();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-dark-100/80 backdrop-blur z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold">Ir Bendelo</span>
          </Link>

          {/* Desktop Navigation */}
          <NavbarDesktop
            items={navItems}
            onNavClick={handleNavClick}
            className="hidden md:flex"
          />

          {/* Auth & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <NavbarAuth isAuthenticated={isAuthenticated} user={user} />

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {/* Icon */}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <NavbarMobile
          items={navItems}
          onNavClick={handleNavClick}
          onClose={() => setIsMobileMenuOpen(false)}
          isAuthenticated={isAuthenticated}
          user={user}
        />
      )}
    </nav>
  );
}
```

3. **Hook de navigation personnalisé**

```javascript
// src/shared/components/navigation/useNavigation.js
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function useNavigation() {
  const navigate = useNavigate();

  const navItems = [
    { href: '/', label: 'Accueil', icon: '🏠' },
    { href: '/about', label: 'À propos', icon: '👤' },
    { href: '/services', label: 'Services', icon: '⚡' },
    { href: '/portfolio', label: 'Portfolio', icon: '🎨' },
    { href: '/blog', label: 'Blog', icon: '📝' },
    { href: '/contact', label: 'Contact', icon: '📞' },
  ];

  const handleNavClick = useCallback(
    (href, e) => {
      if (href.startsWith('#')) {
        e?.preventDefault();
        const element = document.getElementById(href.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(href);
      }
    },
    [navigate]
  );

  return { navItems, handleNavClick };
}
```

4. **Supprimer les anciennes navbars**

```bash
rm src/components/Navbar-backup.jsx
rm src/components/NavbarClean.jsx
rm src/components/NavbarSimple.jsx
# Garder Navbar.jsx et NavbarSecured.jsx temporairement
# Les remplacer progressivement
```

---

#### Semaine 2: Composants Projets & Formulaires

**Jour 1-2: Unifier les composants projets**

1. **Créer la structure**

```bash
mkdir -p src/features/projects/{components,hooks,services}
```

2. **Composant ProjectCard unifié**

```javascript
// src/features/projects/components/ProjectCard.jsx
import { motion } from 'framer-motion';
import { OptimizedImage } from '@/shared/components/ui/OptimizedImage';

export function ProjectCard({ project, variant = 'default' }) {
  const variants = {
    default: 'bg-white shadow-md',
    dark: 'bg-dark-100 shadow-purple',
    minimal: 'bg-transparent border border-gray-200',
  };

  return (
    <motion.div
      className={`rounded-lg overflow-hidden hover:shadow-lg transition-shadow ${variants[variant]}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <OptimizedImage
        src={project.image}
        alt={project.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>

        {project.technologies && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Démo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
```

3. **Grille de projets réutilisable**

```javascript
// src/features/projects/components/ProjectGrid.jsx
import { ProjectCard } from './ProjectCard';

export function ProjectGrid({ projects, variant = 'default', columns = 3 }) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-8`}>
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id || index}
          project={project}
          variant={variant}
        />
      ))}
    </div>
  );
}
```

4. **Supprimer les anciens composants**

```bash
rm src/components/Projet.jsx
rm src/components/ProjetSimple.jsx
rm src/components/ProjetCard.jsx
# Garder ProjectCard.jsx et le migrer
```

**Jour 3-4: Unifier les formulaires**

1. **Hook de validation personnalisé**

```javascript
// src/shared/hooks/useFormValidation.js
import { useState } from 'react';
import { z } from 'zod';

export function useFormValidation(schema) {
  const [errors, setErrors] = useState({});

  const validate = (data) => {
    try {
      schema.parse(data);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = {};
        error.errors.forEach((err) => {
          formattedErrors[err.path[0]] = err.message;
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const clearErrors = () => setErrors({});

  return { errors, validate, clearErrors };
}
```

2. **Composant de formulaire de base**

```javascript
// src/shared/components/forms/BaseForm.jsx
import { useState } from 'react';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';

export function BaseForm({
  fields,
  onSubmit,
  submitLabel = 'Envoyer',
  isLoading = false,
}) {
  const [formData, setFormData] = useState({});

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <Input
          key={field.name}
          {...field}
          value={formData[field.name] || ''}
          onChange={(e) => handleChange(field.name, e.target.value)}
        />
      ))}

      <Button type="submit" isLoading={isLoading} className="w-full">
        {submitLabel}
      </Button>
    </form>
  );
}
```

**Jour 5: Tests et validation**

1. **Tester le backend unifié**

```bash
cd backend
npm test
```

2. **Tester l'authentification**

```bash
# Tester login/register
# Vérifier les tokens
# Tester les routes protégées
```

3. **Tester la navbar**

```bash
# Navigation desktop
# Navigation mobile
# Authentification
```

---

### 🟡 PHASE 2 - MOYEN (Semaines 3-4)

#### Semaine 3: Services & Contexts

**Jour 1-2: Contexts React**

1. **AuthContext**

```javascript
// src/features/auth/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Auth init error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const { user } = await authService.login(email, password);
    setUser(user);
  };

  const register = async (userData) => {
    const { user } = await authService.register(userData);
    setUser(user);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

2. **ThemeContext unifié**

```javascript
// src/shared/contexts/ThemeContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

**Jour 3-4: Hooks personnalisés**

Créer tous les hooks utilitaires (voir AMELIORATIONS_PROFESSIONNELLES.md section 4.2)

**Jour 5: Nettoyage des configurations**

1. **Garder uniquement les versions ESM**

```bash
rm tailwind.config.cjs
rm postcss.config.cjs
```

2. **Fusionner les configs Vite**

```bash
# Merger vite.config.optimized.js dans vite.config.js
rm vite.config.optimized.js
```

---

#### Semaine 4: Optimisations & Performance

**Jour 1-2: Lazy Loading**

Implémenter le code splitting (voir AMELIORATIONS_PROFESSIONNELLES.md section 2.1)

**Jour 3-4: Optimisation des images**

Implémenter OptimizedImage component (voir section 2.2)

**Jour 5: Tests de performance**

```bash
npm run build
npm run preview
# Tester avec Lighthouse
```

---

### ✨ PHASE 3 - OPTIMISATION (Semaines 5-6)

#### Semaine 5: Tests & Documentation

**Jour 1-3: Tests unitaires**

Écrire les tests pour:

- Composants critiques
- Services
- Hooks personnalisés

**Jour 4-5: Documentation**

Documenter:

- Architecture
- Composants
- API
- Guide de contribution

---

#### Semaine 6: Déploiement & Monitoring

**Jour 1-2: Configuration Docker**

Créer les Dockerfiles et docker-compose.yml

**Jour 3-4: CI/CD**

Configurer GitHub Actions

**Jour 5: Monitoring**

- Configurer Sentry pour les erreurs
- Mettre en place Google Analytics
- Configurer les logs

---

## ✅ CHECKLIST DE VALIDATION

### Backend

- [ ] Serveur unique fonctionnel
- [ ] Toutes les routes migrées
- [ ] Tests passent
- [ ] Documentation API

### Frontend

- [ ] Navbar unifiée
- [ ] Authentification fonctionnelle
- [ ] Composants projets unifiés
- [ ] Formulaires unifiés
- [ ] Thème fonctionnel
- [ ] Performance optimisée

### DevOps

- [ ] Docker configuré
- [ ] CI/CD fonctionnel
- [ ] Déploiement automatisé
- [ ] Monitoring actif

---

## 📊 MÉTRIQUES DE SUCCÈS

**Avant refactorisation:**

- ~15,000 lignes de code
- ~6,900 lignes dupliquées (46%)
- 5 versions de Navbar
- 6 serveurs backend
- Temps de build: ~45s
- Bundle size: ~800KB

**Après refactorisation (objectifs):**

- ~9,000 lignes de code (-40%)
- <500 lignes dupliquées (<6%)
- 1 Navbar modulaire
- 1 serveur backend
- Temps de build: ~20s (-55%)
- Bundle size: ~400KB (-50%)

---

## 🚨 POINTS D'ATTENTION

1. **Backup réguliers**

   - Commit après chaque étape majeure
   - Tester avant de supprimer l'ancien code

2. **Tests continus**

   - Tester après chaque modification
   - Ne pas casser les fonctionnalités existantes

3. **Communication**

   - Documenter les changements
   - Informer l'équipe des modifications

4. **Rollback plan**
   - Garder les branches de backup
   - Possibilité de revenir en arrière

---

**Prochaines étapes:** Voir `GUIDE_IMPLEMENTATION_DETAILLE.md` pour les exemples de code complets
