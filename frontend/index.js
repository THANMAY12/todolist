const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const dbConn = require('./dbConfig');
const taskRoutes = require('./routes/taskRoutes');

// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
dbConn();

// Apply Middleware
app.use(cors());
app.use(express.json());

// Set up routes
app.use('/tasks', taskRoutes);

// Simple health check route
app.get('/', (req, res) => {
    res.json({ message: 'To-Do List API is running...' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});