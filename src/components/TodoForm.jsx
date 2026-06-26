import React, { useState } from 'react';

function TodoForm({ onAdd }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('Personal');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    // Direct object send kar rahe hain exact variables ke sath
    onAdd({
      text: text.trim(),
      priority: priority,
      category: category.trim() || 'Personal',
      dueDate: dueDate
    });

    // Form khali karna
    setText('');
    setPriority('medium');
    setCategory('Personal');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form-advanced">
      <input
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="todo-input"
        required
      />
      
      <div className="form-meta-row">
        {/* Priority Selector */}
        <select 
          value={priority} 
          onChange={(e) => setPriority(e.target.value)} 
          className="meta-select"
        >
          <option value="low">🟢 Low Priority</option>
          <option value="medium">🟡 Medium Priority</option>
          <option value="high">🔴 High Priority</option>
        </select>

        {/* Category Input */}
        <input 
          type="text" 
          placeholder="Category..." 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="meta-input"
        />

        {/* Date Input */}
        <input 
          type="date" 
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="meta-date"
          onClick={(e) => {
            if (typeof e.target.showPicker === 'function') {
              e.target.showPicker();
            }
          }}
        />
      </div>

      <button type="submit" className="add-btn-full">Add Extended Task</button>
    </form>
  );
}

export default TodoForm;