import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let todos = [];

app.get('/api/todos', (req, res) => {
    res.json(todos);
});

app.post('/api/todos', (req, res) => {
    console.log("Backend received raw body:", req.body);
    
    const { text, priority, category, dueDate } = req.body;
    
    const newTodo = { 
        id: Date.now(), 
        text, 
        completed: false,
        priority: priority || 'medium',
        category: category || 'General',
        dueDate: dueDate || '' 
    };
    
    console.log("Backend constructed object:", newTodo);
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    if (!todo) return res.status(404).json({ error: "Task not found" });
    todo.completed = !todo.completed;
    res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(t => t.id !== id);
    res.json({ success: true, id });
});

app.listen(PORT, () => {
    console.log(`Debug Server running on http://localhost:${PORT}`);
});