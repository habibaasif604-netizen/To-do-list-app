import React from 'react';

function TodoItem({ todo, onToggle, onDelete }) {
  const priority = todo.priority || 'medium';
  const category = todo.category || 'General';

  return (
    <div className={`todo-item advanced-card priority-${priority} ${todo.completed ? 'completed' : ''}`}>
      <div className="card-main-content">
        <span className="todo-text">{todo.text}</span>
        
        <div className="card-meta-badges">
          <span className="badge category-badge">📁 {category}</span>
          
          {/* Direct verification rendering indicator */}
          {todo.dueDate ? (
            <span className="badge date-badge" style={{ backgroundColor: '#21262d', color: '#58a6ff' }}>
              📅 Due: {todo.dueDate}
            </span>
          ) : null}
          
          <span className={`badge priority-badge tag-${priority}`}>
            ⚡ {priority.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="item-actions">
        <button onClick={() => onToggle(todo.id)} className={`action-btn ${todo.completed ? 'undo-btn' : 'done-btn'}`}>
          {todo.completed ? 'Undo' : 'Done'}
        </button>
        <button onClick={() => onDelete(todo.id)} className="action-btn delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;