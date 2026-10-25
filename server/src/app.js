const express = require('express');
const cors = require('cors');
const supabase = require('./config/supabase');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'App skeleton running successfully.' });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});