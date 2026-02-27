import { useEffect, useState } from "react";
import { getTodos } from "./services/api";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import "./styles/App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getTodos();
      setTodos(response.data);
    } catch (err) {
      setError("Failed to fetch todos. Make sure backend is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const totalCount = todos.length;
  const completedCount = todos.filter(todo => todo.completed).length;
  const pendingCount = totalCount - completedCount;

  useEffect(() => {
    fetchTodos();
  }, []);

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "pending") return !todo.completed;
      return true;
    })
    .filter((todo) =>
      todo.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="app-container">
      <h1>Todo App</h1>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <TodoForm fetchTodos={fetchTodos} />

      <div className="task-stats">
        <p>Total: {totalCount}</p>
        <p>Completed: {completedCount}</p>
        <p>Pending: {pendingCount}</p>
      </div>

      <input type="text" placeholder="Search todos..." value={search} onChange={(e) => setSearch(e.target.value)} className="search-input" />

      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      <TodoList todos={filteredTodos} fetchTodos={fetchTodos} />
    </div>
  );
}

export default App;