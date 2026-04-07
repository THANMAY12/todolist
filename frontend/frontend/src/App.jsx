import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './index.css';

const API_URL = 'http://localhost:5000/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch tasks. Is the backend running?');
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const response = await axios.post(API_URL, taskData);
      setTasks([response.data.task, ...tasks]);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task.');
    }
  };

  const handleUpdateStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    try {
      const response = await axios.patch(`${API_URL}/${id}/status`, { status: newStatus });
      setTasks(tasks.map(task => (task._id === id ? response.data.task : task)));
      setError('');
    } catch (err) {
      setError('Failed to update task status.');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
      setError('');
    } catch (err) {
      setError('Failed to delete task.');
    }
  };

  return (
    <div className="app-container">
      <h1 className="header">Future Tasks</h1>
      
      {error && <p className="error">{error}</p>}
      
      <TaskForm onAdd={handleAddTask} />
      <TaskList 
        tasks={tasks} 
        onToggleStatus={handleUpdateStatus} 
        onDelete={handleDeleteTask} 
      />
    </div>
  );
}

export default App;
