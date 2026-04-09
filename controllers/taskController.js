const Task = require('../models/Task');

// Get all tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
};

// Search tasks
const searchTasks = async (req, res) => {
    try {
        const keyword = req.query.q;
        if (!keyword) {
            return res.status(400).send("Please provide a search keyword");
        }
        const tasks = await Task.find({
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        });
        res.json(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
};

// Get task by ID
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
           return res.status(404).send("Task not found");
        }
        res.json(task);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
};

// Create a new task
const createTask = async (req, res) => {
    try {
        if (!req.body.title || !req.body.description) {
            return res.status(400).send("Missing title or description");
        }
        
        const newTask = new Task({ 
            title: req.body.title, 
            description: req.body.description 
        });
        await newTask.save();
        
        res.status(201).json({ message: "Created", task: newTask });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
};

// Update an existing task
const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id, 
            { 
               title: req.body.title, 
               description: req.body.description 
            }, 
            { new: true }
        );
        
        if (!task) {
            return res.status(404).send("Task not found");
        }
        
        res.json({ message: "Updated", task: task });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
};

// Update just the status of a task
const updateTaskStatus = async (req, res) => {
    try {
        if (req.body.status !== 'pending' && req.body.status !== 'in-progress' && req.body.status !== 'completed') {
            return res.status(400).send("Invalid status");
        }

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        if (!task) {
           return res.status(404).send("Task not found");
        }
        
        res.json({ message: "Status updated", task: task });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        
        if (!task) {
           return res.status(404).send("Task not found");
        }
        
        res.send("Task deleted");
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
};

module.exports = {
    getTasks,
    searchTasks,
    getTaskById,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask
};
