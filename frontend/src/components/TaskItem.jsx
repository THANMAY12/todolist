import { useState } from 'react';
import PropTypes from 'prop-types';

function TaskItem(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(props.task.title);
  const [editDesc, setEditDesc] = useState(props.task.description);

  // Check if it's done
  const isCompleted = props.task.status === 'completed';

  const handleSave = () => {
    // Basic validation
    if (editTitle.trim() === '' || editDesc.trim() === '') {
      return;
    }
    props.onEdit(props.task._id, editTitle, editDesc);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Put the text back to what it was
    setEditTitle(props.task.title);
    setEditDesc(props.task.description);
    setIsEditing(false);
  };

  return (
    <div className="task-item">
      {isEditing ? (
        // EDIT MODE UI
        <>
          <div className="task-info">
            <input 
              type="text" 
              value={editTitle} 
              onChange={(e) => setEditTitle(e.target.value)} 
              disabled={props.loading}
              placeholder="Task Title"
            />
            <input 
              type="text" 
              value={editDesc} 
              onChange={(e) => setEditDesc(e.target.value)} 
              disabled={props.loading}
              placeholder="Task Description"
            />
          </div>
          <div className="task-actions">
            <button className="action-btn" onClick={handleSave} disabled={props.loading}>Save</button>
            <button className="action-btn cancel-btn" onClick={handleCancel} disabled={props.loading} style={{marginLeft: '4px'}}>Cancel</button>
          </div>
        </>
      ) : (
        // NORMAL VIEW MODE UI
        <>
          <div className={`task-info ${isCompleted ? 'completed' : ''}`}>
            <h3>{props.task.title}</h3>
            <p>{props.task.description}</p>
          </div>
          <div className="task-actions">
            <button className="action-btn" onClick={() => setIsEditing(true)} disabled={props.loading}>Edit</button>
            <button 
              className="action-btn"
              onClick={() => props.onToggleStatus(props.task._id, props.task.status)}
              title={isCompleted ? "Mark Pending" : "Mark Complete"}
              disabled={props.loading}
            >
              {isCompleted ? 'Uncheck' : 'Check'}
            </button>
            <button 
              className="action-btn delete-btn"
              onClick={() => props.onDelete(props.task._id)}
              title="Delete Task"
              disabled={props.loading}
              style={{marginLeft: '4px', backgroundColor: '#e74c3c'}}
            >
              Del
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// React PropTypes validation per the instructions
TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  onToggleStatus: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default TaskItem;
