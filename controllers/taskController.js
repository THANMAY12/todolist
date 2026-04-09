const mongoose = require('mongoose');
const Task = require('../models/Task');

// Get all tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, message: "Got all tasks", data: tasks });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error while getting tasks" });
    }
};

// Search tasks
const searchTasks = async (req, res) => {
    try {
        const searchWord = req.query.q;
        
        if (!searchWord) {
            return res.status(400).json({ success: false, message: "Please type something to search!" });
        }
        
        // Fix for ReDoS attack - strip out special regex characters
        const safeString = searchWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        const tasks = await Task.find({
            $or: [
                { title: { $regex: safeString, $options: "i" } },
                { description: { $regex: safeString, $options: "i" } }
            ]
        });
        
        res.status(200).json({ success: true, message: "Search worked", data: tasks });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error during search" });
    }
};

// Get task by ID
const getTaskById = async (req, res) => {
    try {
        // Validate if ID is a real MongoDB id first
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ success: false, message: "That ID format is wrong" });
        }

        const task = await Task.findById(req.params.id);
        
        if (!task) {
           return res.status(404).json({ success: false, message: "Task not found in the database" });
        }
        
        res.status(200).json({ success: true, message: "Task found", data: task });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error getting this task" });
    }
};

// Create a new task
const createTask = async (req, res) => {
    try {
        // Check if user sent everything
        if (!req.body.title) {
            return res.status(400).json({ success: false, message: "You forgot the title!" });
        }
        if (!req.body.description) {
            return res.status(400).json({ success: false, message: "You forgot the description!" });
        }
        
        const newTask = new Task({ 
            title: req.body.title, 
            description: req.body.description 
        });
        
        // Save to mongo
        await newTask.save();
        
        res.status(201).json({ success: true, message: "Task created!", data: newTask });
    } catch (error) {
        console.log(error);
        // Schema validation errors look like this
        if (error.name === 'ValidationError') {
            return res.status(400).json({ success: false, message: "MongoDB Validation failed", error: error.message });
        }
        res.status(500).json({ success: false, message: "Server error making task" });
    }
};

// Update an existing task
const updateTask = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ success: false, message: "Bad ID format" });
        }

        const task = await Task.findByIdAndUpdate(
            req.params.id, 
            { 
               title: req.body.title, 
               description: req.body.description 
            }, 
            { new: true, runValidators: true } // make sure rules apply here too
        );
        
        if (!task) {
            return res.status(404).json({ success: false, message: "Could not find task to update" });
        }
        
        res.status(200).json({ success: true, message: "Task updated", data: task });
    } catch (error) {
        console.log(error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ success: false, message: "Validation error on update", error: error.message });
        }
        res.status(500).json({ success: false, message: "Server error updating task" });
    }
};

// Update just the status of a task
const updateTaskStatus = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ success: false, message: "Bad ID format" });
        }

        const allowed = ['pending', 'in-progress', 'completed'];
        if (!allowed.includes(req.body.status)) {
            return res.status(400).json({ success: false, message: "Not a valid status string" });
        }

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true, runValidators: true }
        );

        if (!task) {
           return res.status(404).json({ success: false, message: "Task not found to change status" });
        }
        
        res.status(200).json({ success: true, message: "Status changed", data: task });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error on status change" });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ success: false, message: "Bad ID format" });
        }

        const task = await Task.findByIdAndDelete(req.params.id);
        
        if (!task) {
           return res.status(404).json({ success: false, message: "Task not found to delete" });
        }
        
        res.status(200).json({ success: true, message: "Task deleted", data: null });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error deleting task" });
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
