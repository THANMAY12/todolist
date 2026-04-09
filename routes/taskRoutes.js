const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// IMPORTANT API ROUTING: Static explicit routes like '/search' MUST be placed 
// before dynamic parameterized routes like '/:id' to prevent routing interception bugs.
router.get('/', taskController.getTasks);
router.get('/search', taskController.searchTasks); 
router.get('/:id', taskController.getTaskById);

router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.patch('/:id/status', taskController.updateTaskStatus);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
