import React, { useEffect, useState } from 'react'
import { getTodos } from './services/api';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import "./styles/App.css";

const App = () => {
  const [todos, setTodos] = useState([]);

  // Fetch todos from backend
  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);


  return (
    <div className="app-container">
      <h1>Todo App</h1>
      <TodoForm fetchTodos={fetchTodos} />
      <TodoList todos={todos} fetchTodos={fetchTodos} />
    </div>
  );
}

export default App