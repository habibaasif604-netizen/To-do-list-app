// DOM Elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const filterBtns = document.querySelectorAll('.filter-btn');

// Application State (Load tasks from localStorage on start)
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

// Render Tasks to UI
function renderTodos() {
    todoList.innerHTML = '';

    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'pending') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true; // 'all'
    });

    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <span class="todo-text" onclick="toggleComplete(${todo.id})">${todo.text}</span>
            <div class="actions">
                <button class="complete-btn" onclick="toggleComplete(${todo.id})">
                    ${todo.completed ? 'Undo' : 'Done'}
                </button>
                <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
            </div>
        `;
        todoList.appendChild(li);
    });

    // Save current state to LocalStorage
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Add New Todo
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = todoInput.value.trim();
    
    if (taskText) {
        const newTodo = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        todos.push(newTodo);
        todoInput.value = '';
        renderTodos();
    }
});

// Toggle Complete Status
window.toggleComplete = function(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    renderTodos();
};

// Delete Todo
window.deleteTodo = function(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
};

// Filter Handling
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.getAttribute('data-filter');
        renderTodos();
    });
});

// Initial Render
renderTodos();