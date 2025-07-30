import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9395d3',
    },
    secondary: {
      main: '#8b8787',
    },
  },
  typography: {
    fontFamily: 'Jost, sans-serif',
  },
});

// PUBLIC_INTERFACE
function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: 'TODO TITLE', subtitle: 'TODO SUB TITLE', completed: false },
    { id: 2, title: 'TODO TITLE', subtitle: 'TODO SUB TITLE', completed: false },
    { id: 3, title: 'TODO TITLE', subtitle: 'TODO SUB TITLE', completed: false },
    { id: 4, title: 'TODO TITLE', subtitle: 'TODO SUB TITLE', completed: false },
    { id: 5, title: 'TODO TITLE', subtitle: 'TODO SUB TITLE', completed: false },
  ]);
  const [filter, setFilter] = useState('all');
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const filteredTodos = filter === 'completed' 
    ? todos.filter(todo => todo.completed)
    : todos;

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleEdit = (id) => {
    // Implement edit functionality
    console.log('Edit todo:', id);
  };

  const handleAdd = () => {
    // Implement add functionality
    console.log('Add new todo');
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        {/* Status Bar */}
        <div className="status-bar">
          <div className="status-bar__time">{time}</div>
          <div className="status-bar__icons">
            <i className="fas fa-signal"></i>
            <i className="fas fa-wifi"></i>
            <i className="fas fa-battery-full"></i>
          </div>
        </div>

        {/* App Bar */}
        <div className="app-bar">
          <h1 className="app-bar__title">TODO APP</h1>
        </div>

        {/* Navigation Bar */}
        <div className="nav-bar">
          <button 
            className={`nav-bar__button ${filter === 'all' ? 'nav-bar__button--active' : ''}`}
            onClick={() => setFilter('all')}
          >
            <i className="fas fa-list"></i>
            <span>All</span>
          </button>
          <button 
            className={`nav-bar__button ${filter === 'completed' ? 'nav-bar__button--active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            <CheckCircleOutlineIcon />
            <span>Completed</span>
          </button>
        </div>

        {/* Todo List */}
        <div className="todo-list">
          {filteredTodos.map(todo => (
            <div key={todo.id} className="todo-item">
              <div className="todo-item__content">
                <h3 className="todo-item__title">{todo.title}</h3>
                <p className="todo-item__subtitle">{todo.subtitle}</p>
              </div>
              <div className="todo-item__actions">
                <button className="action-button" onClick={() => handleEdit(todo.id)}>
                  <EditIcon fontSize="small" />
                </button>
                <button className="action-button" onClick={() => handleDelete(todo.id)}>
                  <DeleteOutlineIcon fontSize="small" />
                </button>
                <button className="action-button" onClick={() => handleComplete(todo.id)}>
                  <CheckCircleOutlineIcon fontSize="small" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Button */}
        <button className="add-button" onClick={handleAdd}>
          <AddIcon className="add-button__icon" />
        </button>
      </div>
    </ThemeProvider>
  );
}

export default App;
