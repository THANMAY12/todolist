const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const dbConn = require('./dbConfig');
const taskRoutes = require('./routes/taskRoutes');

// Load environment configuration
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

// Connect to MongoDB
dbConn();

// Allow frontend to talk to this backend (CORS fix)
app.use(cors({
    origin: CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}));
app.use(express.json());

// Connect task routes
app.use('/tasks', taskRoutes);

// Simple health check route
app.get('/', (req, res) => {
    res.json({ success: true, message: 'To-Do List API is running securely...' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});