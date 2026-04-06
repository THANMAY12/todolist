function TaskItem({ task, onToggleStatus, onDelete }) {
  const isCompleted = task.status === 'completed';

  return (
    <div className="task-item">
      <div className={`task-info ${isCompleted ? 'completed' : ''}`}>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>

      <div className="task-actions">
        <button 
          className="action-btn"
          onClick={() => onToggleStatus(task._id, task.status)}
          title={isCompleted ? "Mark Pending" : "Mark Complete"}
        >
          {isCompleted ? '☑️' : '◻️'}
        </button>
        
        <button 
          className="action-btn"
          onClick={() => onDelete(task._id)}
          title="Delete Task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
