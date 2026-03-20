require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/database');
const configureExpress = require('./src/config/express');
const { errorHandler, notFoundHandler } = require('./src/shared/middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Import new feature routes
const usersRoutes = require('./src/features/users/routes');
const paymentsRoutes = require('./src/features/payments/routes');
const contactFeatureRoutes = require('./src/features/contact/routes');
const quotesRoutes = require('./src/features/quotes/routes');

// Create Express app
const app = express();

// Configure Express middleware
configureExpress(app);

// Connect to database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/contact', contactRoutes);

// New feature routes
app.use('/api/users', usersRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/contact', contactFeatureRoutes);
app.use('/api/quotes', quotesRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Muamokel Services API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      payments: '/api/payments',
      contact: '/api/contact',
      quotes: '/api/quotes',
      health: '/health'
    }
  });
});

// Error handling middleware (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
