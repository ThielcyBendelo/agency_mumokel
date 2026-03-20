# 🚀 AMÉLIORATIONS PROFESSIONNELLES RECOMMANDÉES

**Projet:** muamokel-services (BendeloWeb)
**Objectif:** Transformer le projet en application de niveau production

---

## 📋 TABLE DES MATIÈRES

1. [Architecture & Structure](#architecture)
2. [Performance & Optimisation](#performance)
3. [Sécurité](#sécurité)
4. [Qualité du Code](#qualité)
5. [DevOps & Déploiement](#devops)
6. [UX/UI](#ux-ui)
7. [Tests](#tests)
8. [Documentation](#documentation)

---

## 🏗️ 1. ARCHITECTURE & STRUCTURE {#architecture}

### 1.1 Restructuration des Dossiers

**Structure actuelle:** Fichiers mélangés, pas de séparation claire

**Structure proposée:**

```
muamokel-services/
├── frontend/                    # Application React
│   ├── src/
│   │   ├── app/                # Configuration app
│   │   │   ├── App.jsx
│   │   │   ├── routes.jsx
│   │   │   └── providers.jsx
│   │   ├── features/           # Fonctionnalités par domaine
│   │   │   ├── auth/
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   ├── services/
│   │   │   │   └── index.js
│   │   │   ├── blog/
│   │   │   ├── payments/
│   │   │   ├── projects/
│   │   │   └── dashboard/
│   │   ├── shared/             # Code partagé
│   │   │   ├── components/     # Composants réutilisables
│   │   │   │   ├── ui/         # Boutons, inputs, etc.
│   │   │   │   ├── layout/     # Navbar, Footer, etc.
│   │   │   │   └── forms/      # Composants formulaires
│   │   │   ├── hooks/          # Hooks personnalisés
│   │   │   ├── utils/          # Fonctions utilitaires
│   │   │   └── constants/      # Constantes
│   │   ├── assets/             # Images, fonts, etc.
│   │   ├── styles/             # Styles globaux
│   │   └── types/              # Types TypeScript (futur)
│   ├── public/
│   └── package.json
│
├── backend/                     # API Node.js
│   ├── src/
│   │   ├── config/             # Configuration
│   │   │   ├── database.js
│   │   │   ├── express.js
│   │   │   └── environment.js
│   │   ├── features/           # Fonctionnalités
│   │   │   ├── auth/
│   │   │   │   ├── auth.controller.js
│   │   │   │   ├── auth.service.js
│   │   │   │   ├── auth.routes.js
│   │   │   │   ├── auth.model.js
│   │   │   │   └── auth.validation.js
│   │   │   ├── users/
│   │   │   ├── payments/
│   │   │   └── blog/
│   │   ├── shared/             # Code partagé
│   │   │   ├── middleware/
│   │   │   ├── utils/
│   │   │   └── constants/
│   │   ├── database/           # Migrations, seeds
│   │   └── server.js           # Point d'entrée unique
│   ├── tests/
│   └── package.json
│
├── shared/                      # Code partagé frontend/backend
│   ├── types/                  # Types partagés
│   └── constants/              # Constantes partagées
│
├── docs/                        # Documentation
├── scripts/                     # Scripts utilitaires
└── docker/                      # Configuration Docker
```

**Avantages:**

- ✅ Séparation claire frontend/backend
- ✅ Organisation par fonctionnalité (feature-based)
- ✅ Code partagé facilement identifiable
- ✅ Scalabilité améliorée

---

### 1.2 Pattern "Feature-Based" (Recommandé)

Au lieu d'organiser par type de fichier (components/, services/), organiser par fonctionnalité:

**Exemple - Feature Auth:**

```
src/features/auth/
├── components/
│   ├── LoginForm.jsx
│   ├── RegisterForm.jsx
│   └── AuthGuard.jsx
├── hooks/
│   ├── useAuth.js
│   └── useAuthForm.js
├── services/
│   ├── authService.js
│   └── authApi.js
├── context/
│   └── AuthContext.jsx
├── utils/
│   └── tokenManager.js
├── constants.js
└── index.js                    # Export public
```

**Avantages:**

- ✅ Tout le code d'une fonctionnalité au même endroit
- ✅ Facilite la maintenance
- ✅ Permet le lazy loading par feature
- ✅ Équipes peuvent travailler en parallèle

---

### 1.3 Composants Réutilisables (Design System)

**Créer une bibliothèque de composants UI:**

```javascript
// src/shared/components/ui/Button.jsx
import { forwardRef } from 'react';
import { cn } from '@/shared/utils/classNames';

const buttonVariants = {
  primary: 'bg-purple-600 hover:bg-purple-700 text-white',
  secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
  outline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50',
  ghost: 'hover:bg-gray-100 text-gray-700',
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export const Button = forwardRef(
  (
    {
      variant = 'primary',
      size = 'md',
      className,
      children,
      isLoading,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'rounded-lg font-semibold transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Spinner size="sm" />
            Chargement...
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);
```

**Composants à créer:**

- Button, Input, Select, Checkbox, Radio
- Card, Modal, Drawer, Tooltip
- Alert, Toast, Badge
- Table, Pagination
- Skeleton, Spinner

---

## ⚡ 2. PERFORMANCE & OPTIMISATION {#performance}

### 2.1 Code Splitting & Lazy Loading

**Implémenter le lazy loading pour les routes:**

```javascript
// src/app/routes.jsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Loader } from '@/shared/components/ui/Loader';

// Lazy load des pages
const Home = lazy(() => import('@/features/home/pages/HomePage'));
const Blog = lazy(() => import('@/features/blog/pages/BlogPage'));
const Dashboard = lazy(() =>
  import('@/features/dashboard/pages/DashboardPage')
);
const Portfolio = lazy(() => import('@/features/projects/pages/PortfolioPage'));

export function AppRoutes() {
  return (
    <Suspense fallback={<Loader fullScreen />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </Suspense>
  );
}
```

**Gains attendus:**

- ⚡ Réduction du bundle initial de ~60%
- ⚡ Temps de chargement initial divisé par 2
- ⚡ Meilleure performance mobile

---

### 2.2 Optimisation des Images

**Implémenter un composant Image optimisé:**

```javascript
// src/shared/components/ui/OptimizedImage.jsx
import { useState, useEffect } from 'react';
import { cn } from '@/shared/utils/classNames';

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(
    priority ? src : '/placeholder.svg'
  );

  useEffect(() => {
    if (!priority) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setCurrentSrc(src);
        setIsLoading(false);
      };
    }
  }, [src, priority]);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <img
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        className={cn(
          'transition-opacity duration-300',
          isLoading && !priority ? 'opacity-0' : 'opacity-100'
        )}
        {...props}
      />
      {isLoading && !priority && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
}
```

**Recommandations:**

- ✅ Utiliser WebP avec fallback
- ✅ Implémenter le lazy loading
- ✅ Générer plusieurs tailles (responsive)
- ✅ Utiliser un CDN (Cloudinary, ImageKit)

---

### 2.3 Memoization & Optimisation React

**Utiliser React.memo, useMemo, useCallback:**

```javascript
// src/features/projects/components/ProjectCard.jsx
import { memo } from 'react';

export const ProjectCard = memo(({ project, onView }) => {
  return (
    <div className="project-card">
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <button onClick={() => onView(project.id)}>Voir le projet</button>
    </div>
  );
});

// src/features/projects/pages/ProjectsPage.jsx
import { useMemo, useCallback } from 'react';

export function ProjectsPage() {
  const [filter, setFilter] = useState('all');
  const [projects, setProjects] = useState([]);

  // Memoize filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => filter === 'all' || p.category === filter);
  }, [projects, filter]);

  // Memoize callback
  const handleViewProject = useCallback(
    (id) => {
      navigate(`/projects/${id}`);
    },
    [navigate]
  );

  return (
    <div>
      {filteredProjects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onView={handleViewProject}
        />
      ))}
    </div>
  );
}
```

---

### 2.4 Virtualisation pour Longues Listes

**Utiliser react-window pour les listes:**

```javascript
// src/features/blog/components/BlogList.jsx
import { FixedSizeList } from 'react-window';

export function BlogList({ posts }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <BlogCard post={posts[index]} />
    </div>
  );

  return (
    <FixedSizeList
      height={600}
      itemCount={posts.length}
      itemSize={200}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

---

## 🔒 3. SÉCURITÉ {#sécurité}

### 3.1 Validation des Données (Zod)

**Implémenter Zod pour la validation:**

```javascript
// src/features/auth/schemas/authSchemas.js
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email invalide').min(1, 'Email requis'),
  password: z
    .string()
    .min(8, 'Minimum 8 caractères')
    .regex(/[A-Z]/, 'Au moins une majuscule')
    .regex(/[0-9]/, 'Au moins un chiffre'),
});

export const registerSchema = loginSchema
  .extend({
    name: z
      .string()
      .min(2, 'Minimum 2 caractères')
      .max(50, 'Maximum 50 caractères'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });
```

**Utilisation dans les formulaires:**

```javascript
// src/features/auth/components/LoginForm.jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../schemas/authSchemas';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await authService.login(data);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <input type="password" {...register('password')} />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        Connexion
      </button>
    </form>
  );
}
```

---

### 3.2 Protection CSRF & XSS

**Implémenter la protection CSRF:**

```javascript
// backend/src/shared/middleware/csrf.js
const csrf = require('csurf');

const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  },
});

module.exports = csrfProtection;
```

**Sanitization des entrées:**

```javascript
// backend/src/shared/middleware/sanitize.js
const DOMPurify = require('isomorphic-dompurify');

function sanitizeInput(req, res, next) {
  if (req.body) {
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = DOMPurify.sanitize(req.body[key]);
      }
    });
  }
  next();
}

module.exports = sanitizeInput;
```

---

### 3.3 Rate Limiting

**Implémenter le rate limiting:**

```javascript
// backend/src/shared/middleware/rateLimiter.js
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 tentatives
  message: 'Trop de tentatives, réessayez dans 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Trop de requêtes, réessayez plus tard',
});

module.exports = { authLimiter, apiLimiter };
```

---

## ✨ 4. QUALITÉ DU CODE {#qualité}

### 4.1 ESLint & Prettier Configuration

**Configuration ESLint professionnelle:**

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  rules: {
    'react/prop-types': 'warn',
    'react/react-in-jsx-scope': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
};
```

**Configuration Prettier:**

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "arrowParens": "avoid"
}
```

---

### 4.2 Hooks Personnalisés

**Créer des hooks réutilisables:**

```javascript
// src/shared/hooks/useDebounce.js
import { useState, useEffect } from 'react';

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// src/shared/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [key, value]);

  return [value, setValue];
}

// src/shared/hooks/useFetch.js
import { useState, useEffect } from 'react';

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, options);
        if (!response.ok) throw new Error('Network response was not ok');
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
```

---

### 4.3 Error Boundaries

**Implémenter des Error Boundaries:**

```javascript
// src/shared/components/ErrorBoundary.jsx
import { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Envoyer à un service de monitoring (Sentry, etc.)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Oups! Une erreur est survenue</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>
            Recharger la page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

## 🔄 5. DEVOPS & DÉPLOIEMENT {#devops}

### 5.1 Variables d'Environnement

**Structure des fichiers .env:**

```bash
# .env.example
# Database
MONGO_URI=mongodb://localhost:27017/bendeloweb
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d

# Email
EMAILJS_SERVICE_ID=your-service-id
EMAILJS_TEMPLATE_ID=your-template-id
EMAILJS_PUBLIC_KEY=your-public-key

# Payment
STRIPE_PUBLIC_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
PAYPAL_CLIENT_ID=xxx

# Firebase
FIREBASE_API_KEY=xxx
FIREBASE_AUTH_DOMAIN=xxx
FIREBASE_PROJECT_ID=xxx

# API
API_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173

# Environment
NODE_ENV=development
PORT=5000
```

---

### 5.2 Docker Configuration

**Dockerfile pour le frontend:**

```dockerfile
# frontend/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Dockerfile pour le backend:**

```dockerfile
# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

EXPOSE 5000
CMD ["node", "src/server.js"]
```

**docker-compose.yml:**

```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - '3000:80'
    environment:
      - VITE_API_URL=http://localhost:5000
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - '5000:5000'
    environment:
      - MONGO_URI=mongodb://mongo:27017/bendeloweb
      - NODE_ENV=production
    depends_on:
      - mongo

  mongo:
    image: mongo:6
    ports:
      - '27017:27017'
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

---

### 5.3 CI/CD avec GitHub Actions

**Workflow de déploiement:**

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run lint

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v3
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 🎨 6. UX/UI AMÉLIORATIONS {#ux-ui}

### 6.1 Animations Fluides

**Utiliser Framer Motion de manière optimisée:**

```javascript
// src/shared/components/animations/FadeIn.jsx
import { motion } from 'framer-motion';

export function FadeIn({ children, delay = 0, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// src/shared/components/animations/SlideIn.jsx
export function SlideIn({ children, direction = 'left', ...props }) {
  const directions = {
    left: { x: -100 },
    right: { x: 100 },
    up: { y: -100 },
    down: { y: 100 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
```

---

### 6.2 Accessibilité (A11y)

**Checklist d'accessibilité:**

- ✅ Tous les boutons ont des labels
- ✅ Images ont des alt text descriptifs
- ✅ Navigation au clavier fonctionnelle
- ✅ Contraste de couleurs suffisant (WCAG AA)
- ✅ Focus visible sur les éléments interactifs
- ✅ ARIA labels pour les éléments complexes
- ✅ Formulaires avec labels associés
- ✅ Messages d'erreur accessibles

**Exemple de composant accessible:**

```javascript
// src/shared/components/ui/AccessibleButton.jsx
export function AccessibleButton({
  children,
  ariaLabel,
  onClick,
  disabled,
  ...props
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      className="focus:outline-none focus:ring-2 focus:ring-purple-500"
      {...props}
    >
      {children}
    </button>
  );
}
```

---

### 6.3 Mode Sombre Optimisé

**Implémenter un système de thème robuste:**

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

---

## 🧪 7. TESTS {#tests}

### 7.1 Tests Unitaires (Vitest)

**Configuration Vitest:**

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
```

**Exemple de test:**

```javascript
// src/features/auth/components/LoginForm.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('should render login form', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('should show validation errors', async () => {
    render(<LoginForm />);
    const submitButton = screen.getByRole('button', { name: /connexion/i });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email requis/i)).toBeInTheDocument();
    });
  });

  it('should submit form with valid data', async () => {
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'Password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /connexion/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'Password123',
      });
    });
  });
});
```

---

### 7.2 Tests E2E (Playwright)

**Configuration Playwright:**

```javascript
// playwright.config.js
import { defineConfig } from '@playwright/
```
