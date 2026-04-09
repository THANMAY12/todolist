import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './index.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    setLoading(true);
    axios.get(API_URL)
      .then((response) => {
        setTasks(response.data);
        setError('');
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError('Failed to fetch tasks');
        setLoading(false);
      });
  };

  const handleAddTask = (taskData) => {
    setLoading(true);
    axios.post(API_URL, taskData)
      .then((response) => {
        setTasks([response.data.task, ...tasks]);
        setError('');
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError('Failed to create task');
        setLoading(false);
      });
  };

  const handleUpdateStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    setLoading(true);
    axios.patch(API_URL + '/' + id + '/status', { status: newStatus })
      .then((response) => {
        setTasks(tasks.map((task) => {
          if (task._id === id) {
            return response.data.task;
          }
          return task;
        }));
        setError('');
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError('Failed to update status');
        setLoading(false);
      });
  };
  
  const handleEditTask = (id, newTitle, newDescription) => {
    setLoading(true);
    axios.put(API_URL + '/' + id, { title: newTitle, description: newDescription })
      .then((response) => {
        setTasks(tasks.map((task) => {
          if (task._id === id) {
            return response.data.task;
          }
          return task;
        }));
        setError('');
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError('Failed to update task');
        setLoading(false);
      });
  };

  const handleDeleteTask = (id) => {
    setLoading(true);
    axios.delete(API_URL + '/' + id)
      .then(() => {
        setTasks(tasks.filter((task) => {
          return task._id !== id;
        }));
        setError('');
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError('Failed to delete task');
        setLoading(false);
      });
  };

  return (
    <div className="app-container">
      <h1 className="header">Future Tasks</h1>
      
      {error !== '' ? <p className="error">{error}</p> : null}
      {loading === true ? <p className="loading" style={{textAlign: 'center', color: '#666'}}>Loading...</p> : null}
      
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
