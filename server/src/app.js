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

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/permissions', permissionsRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('HOPE ERP API Server is running...');
});

app.listen(PORT, () => {
    console.log(`🚀 HOPE ERP Backend Server is listening on http://localhost:${PORT}`);
});

module.exports = app;