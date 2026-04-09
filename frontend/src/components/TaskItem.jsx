import { useState } from 'react';

function TaskItem({ task, onToggleStatus, onDelete, onEdit, loading }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description);

  const isCompleted = task.status === 'completed';

  const handleSave = () => {
    if (editTitle.trim() === '' || editDesc.trim() === '') return;
    onEdit(task._id, editTitle, editDesc);
    setIsEditing(false);
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <div className="task-info">
          <input 
            type="text" 
            value={editTitle} 
            onChange={(e) => setEditTitle(e.target.value)} 
            disabled={loading}
          />
          <input 
            type="text" 
            value={editDesc} 
            onChange={(e) => setEditDesc(e.target.value)} 
            disabled={loading}
          />
        </div>
      ) : (
        <div className={`task-info ${isCompleted ? 'completed' : ''}`}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
      )}

      <div className="task-actions">
        {isEditing ? (
          <button className="action-btn" onClick={handleSave} disabled={loading}>Save</button>
        ) : (
          <>
            <button className="action-btn" onClick={() => setIsEditing(true)} disabled={loading}>Edit</button>
            <button 
              className="action-btn"
              onClick={() => onToggleStatus(task._id, task.status)}
              title={isCompleted ? "Mark Pending" : "Mark Complete"}
              disabled={loading}
            >
              {isCompleted ? 'Uncheck' : 'Check'}
            </button>
            
            <button 
              className="action-btn"
              onClick={() => onDelete(task._id)}
              title="Delete Task"
              disabled={loading}
            >
              Del
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskItem;
