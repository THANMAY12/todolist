const Task = require('../models/Task');

// Get all tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 }); // Newest first
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch tasks", error: error.message });
    }
};

// Get task by ID
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Error fetching task", error: error.message });
    }
};

// Create a new task
const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        
        if (!title || !description) {
            return res.status(400).json({ message: "Please provide a title and description" });
        }
        
        const newTask = new Task({ title, description });
        await newTask.save();
        
        res.status(201).json({ message: "Task created successfully", task: newTask });
    } catch (error) {
        res.status(500).json({ message: "Failed to create task", error: error.message });
    }
};

// Update an existing task
const updateTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        
        const task = await Task.findByIdAndUpdate(
            req.params.id, 
            { title, description }, 
            { new: true, runValidators: true }
        );
        
        if (!task) return res.status(404).json({ message: "Task not found" });
        
        res.status(200).json({ message: "Task updated", task });
    } catch (error) {
        res.status(500).json({ message: "Error updating task", error: error.message });
    }
};

// Update just the status of a task
const updateTaskStatus = async (req, res) => {
    try {
        const { status } = req.body;
        
        if (!['pending', 'in-progress', 'completed'].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!task) return res.status(404).json({ message: "Task not found" });
        
        res.status(200).json({ message: "Status updated", task });
    } catch (error) {
        res.status(500).json({ message: "Error updating status", error: error.message });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        
        if (!task) return res.status(404).json({ message: "Task not found" });
        
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error: error.message });
    }
};

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask
};
