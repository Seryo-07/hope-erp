require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const permissionsRoutes = require('./routes/permissions');
const authRoutes = require('./routes/auth'); // Relative sa app.js
 feature/S1-DEV-05-user-management

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

 main

const app = express(); // 1. Initialize 'app' first!
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 2. Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const permissionsRoutes = require('./routes/permissions');
const modulesRoutes = require('./routes/modules');

// 3. Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/permissions', permissionsRoutes);
app.use('/api/modules', modulesRoutes);
// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/permissions', permissionsRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('HOPE ERP API Server is running...');
});

// Start listening only if executed directly (not when required in tests)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 HOPE ERP Backend Server is listening on http://localhost:${PORT}`);
    });
}
app.listen(PORT, () => {
    console.log(`🚀 HOPE ERP Backend Server is listening on http://localhost:${PORT}`);
});

module.exports = app;