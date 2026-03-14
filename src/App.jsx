import { useState, useEffect } from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoFilters from './components/TodoFilters';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) :[];
  });
  
  const [filter, setFilter] = useState('all');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    document.body.style.backgroundColor = isDark ? '#222' : '#f4f4f4';
    document.body.style.color = isDark ? '#fff' : '#333';
    document.body.style.transition = 'background-color 0.3s ease';
  }, [isDark]);

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text: text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, text: newText } : todo));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; 
  });

  const activeCount = todos.filter(todo => !todo.completed).length;

  const containerStyles = {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    borderRadius: '10px',
    backgroundColor: isDark ? '#333' : '#fff',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={containerStyles}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>Менеджер задач</h1>
        <button 
          onClick={() => setIsDark(!isDark)}
          style={{ 
            padding: '8px', 
            cursor: 'pointer', 
            borderRadius: '5px', 
            border: '1px solid #ccc', 
            background: isDark ? '#555' : '#eee', 
            color: isDark ? 'white' : 'black' 
          }}
        >
          {isDark ? 'Светлая' : 'Темная'}
        </button>
      </div>
      
      <br />
      <AddTodoForm onAdd={addTodo} />
      <TodoFilters filter={filter} onFilterChange={setFilter} activeCount={activeCount} />
      {filteredTodos.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#999' }}>
          {filter === 'all' ? 'Задач пока нет' : filter === 'active' ? 'Нет активных задач' : 'Нет выполненных задач'}
        </p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredTodos.map(todo => (
            <TodoItem 
              key={todo.id} 
              task={todo} 
              onToggle={toggleTodo} 
              onDelete={deleteTodo} 
              onEdit={editTodo} 
            />
          ))}
        </ul>
      )}

      {todos.length > 0 && (
        <button
          onClick={() => setTodos([])}
          style={{
            marginTop: '20px', 
            padding: '8px 16px', 
            background: '#dc3545',
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer', 
            width: '100%'
          }}
        >
          Очистить всё
        </button>
      )}
    </div>
  );
}

export default App;