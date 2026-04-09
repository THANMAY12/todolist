import TaskItem from './TaskItem';

function TaskList({ tasks, onToggleStatus, onDelete, onEdit, loading }) {
  if (tasks.length === 0) {
    return <p className="empty">No tasks yet. Stay productive!</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem 
          key={task._id} 
          task={task} 
          onToggleStatus={onToggleStatus} 
          onDelete={onDelete}
          onEdit={onEdit}
          loading={loading}
        />
      ))}
    </div>
  );
}

export default TaskList;
