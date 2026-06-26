import React, { useState, useEffect } from 'react';
import TodoFilters from './components/TodoFilters';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const API_URL = 'http://localhost:5000/api/todos';

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error loading todos:", err));
  }, []);

  // 🚀 BULLETPROOF ADD FUNCTION
  const addTodo = (todoData) => {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: todoData.text,
        priority: todoData.priority,
        category: todoData.category,
        dueDate: todoData.dueDate
      })
    })
      .then((res) => res.json())
      .then((newTodo) => {
        setTodos((prevTodos) => [...prevTodos, newTodo]);
      })
      .catch((err) => console.error("Error creating todo:", err));
  };

  const toggleTodo = (id) => {
    fetch(`${API_URL}/${id}`, { method: 'PUT' })
      .then((res) => res.json())
      .then((updatedTodo) => {
        setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
      })
      .catch((err) => console.error("Error updating state:", err));
  };

  const deleteTodo = (id) => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then(() => setTodos(todos.filter(todo => todo.id !== id)))
      .catch((err) => console.error("Error purging item:", err));
  };

  const totalTasks = todos.length;
  const completedTasks = todos.filter(t => t.completed).length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const filteredTodos = todos.filter(todo => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'active' && !todo.completed) || 
                         (filter === 'completed' && todo.completed);
                         
    const taskText = todo.text ? todo.text.toLowerCase() : '';
    const taskCategory = todo.category ? todo.category.toLowerCase() : '';
    const search = searchTerm.toLowerCase();
                         
    return matchesFilter && (taskText.includes(search) || taskCategory.includes(search));
  });

  return (
    <div className="app-container">
      <div className="todo-box advanced-box">
        <h1 className="title">Premium Task Manager Pro</h1>
        
        <div className="progress-section">
          <div className="progress-labels">
            <span>Progress Metric Dashboard</span>
            <span>{completedTasks}/{totalTasks} ({progressPercent}%)</span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        <div className="search-container">
          <input 
            type="text" 
            placeholder="🔍 Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <TodoForm onAdd={addTodo} />
        <TodoFilters currentFilter={filter} onFilterChange={setFilter} />
        
        <div className="todo-list custom-scroll">
          {filteredTodos.length === 0 ? (
            <p className="empty-msg">No tasks found.</p>
          ) : (
            filteredTodos.map(todo => (
              <TodoItem 
                key={todo.id} 
                todo={todo} 
                onToggle={toggleTodo} 
                onDelete={deleteTodo} 
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;