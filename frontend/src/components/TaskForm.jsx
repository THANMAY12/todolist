import { useState } from 'react';

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    onAdd({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        className="input-field" 
        placeholder="Task Title" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input 
        type="text" 
        className="input-field" 
        placeholder="Short description" 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit" className="submit-btn">Add Task</button>
    </form>
  );
}

export default TaskForm;
