require('dotenv').config();
const express = require('express');
const cors = require('cors');

// 1. Initialize Express App
const app = express();
const PORT = process.env.PORT || 5000;

// 2. Middlewares
app.use(cors());
app.use(express.json());

// 3. Import Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const permissionsRoutes = require('./routes/permissions');
const modulesRoutes = require('./routes/modules');

// 4. Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/permissions', permissionsRoutes);
app.use('/api/modules', modulesRoutes);

// Root Health Check Route
app.get('/', (req, res) => {
    res.send('HOPE ERP API Server is running...');
});

// 5. Start Server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 HOPE ERP Backend Server is listening on http://localhost:${PORT}`);
    });
}

module.exports = app;