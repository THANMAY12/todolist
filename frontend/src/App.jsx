import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './index.css';

const API_URL = import.meta.env.VITE_API_URL ;

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Load tasks on start
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      // Backend returns { success, data, message }
      // Using || [] as safety net in case something goes wrong
      setTasks(response.data.data || []);
      setError('');
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Network error: Could not load tasks");
      }
    }
    setLoading(false);
  };

  const handleAddTask = async (taskData) => {
    setLoading(true);
    try {
      const response = await axios.post(API_URL, taskData);
      if (response.data.data) {
        setTasks([response.data.data, ...tasks]);
      }
      setError('');
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Error: Title and Description are required!");
      }
    }
    setLoading(false);
  };

  const handleUpdateStatus = async (id, currentStatus) => {
    let newStatus = 'completed';
    if (currentStatus === 'completed') {
      newStatus = 'pending';
    }

    setLoading(true);
    try {
      const response = await axios.patch(API_URL + '/' + id + '/status', { status: newStatus });
      
      // Update the correct task in our state list
      const updatedList = tasks.map(function(task) {
        if (task._id === id) {
          return response.data.data;
        } else {
          return task;
        }
      });
      
      setTasks(updatedList);
      setError('');
    } catch (err) {
      console.log(err);
      setError("Failed to change the status");
    }
    setLoading(false);
  };
  
  const handleEditTask = async (id, newTitle, newDescription) => {
    setLoading(true);
    try {
      const response = await axios.put(API_URL + '/' + id, { 
        title: newTitle, 
        description: newDescription 
      });
      
      const updatedList = tasks.map((task) => {
        if (task._id === id) return response.data.data;
        return task;
      });
      
      setTasks(updatedList);
      setError('');
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("Failed to edit the task");
      }
    }
    setLoading(false);
  };

  const handleDeleteTask = async (id) => {
    setLoading(true);
    try {
      await axios.delete(API_URL + '/' + id);
      
      // Remove it from the screen
      const filteredList = tasks.filter((task) => task._id !== id);
      setTasks(filteredList);
      setError('');
    } catch (err) {
      console.log(err);
      setError("Failed to delete this task");
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1 className="header">Future Tasks</h1>
      
      {error && <p className="error">{error}</p>}
      {loading && <p className="loading" style={{textAlign: 'center', color: '#666'}}>Loading...</p>}
      
      <TaskForm onAdd={handleAddTask} loading={loading} />
      
      <TaskList 
        tasks={tasks} 
        onToggleStatus={handleUpdateStatus} 
        onDelete={handleDeleteTask} 
        onEdit={handleEditTask}
        loading={loading}
      />
    </div>
  );
}

export default App;
