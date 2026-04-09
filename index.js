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

// Apply Security and Request Middleware correctly
app.use(cors({
    origin: CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}));
app.use(express.json());

// Set up standardized API routing
app.use('/tasks', taskRoutes);

// Simple health check route
app.get('/', (req, res) => {
    res.json({ success: true, message: 'To-Do List API is running securely...' });
});

// Start the server natively
app.listen(PORT, () => {
    console.log(`Server running effectively on port: ${PORT}`);
    console.log(`Allowing CORS origin: ${CORS_ORIGIN}`);
});