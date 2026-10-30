const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

// Enable CORS for all local dev origins and handle preflight OPTIONS requests
app.use(
    cors({
        origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:5000', 'http://127.0.0.1:5000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })
);

app.use(express.json());

// Auth routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

// Listen on all network interfaces (0.0.0.0) so both localhost and 127.0.0.1 work
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started on port ${PORT}`);
});