import { useEffect, useState } from "react";
import { getTodos, deleteTodo } from "./services/api";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import "./styles/App.css";
import { FaMoon, FaSun } from "react-icons/fa";
import TaskSidebar from "./components/TaskSidebar";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("none");
  const [selectedTask, setSelectedTask] = useState(null);

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

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

  const clearCompleted = async () => {
    const completedTodos = todos.filter(todo => todo.completed);

    try {
      await Promise.all(
        completedTodos.map(todo => deleteTodo(todo.id))
      );
      fetchTodos();
    } catch (error) {
      console.error("Error clearing completed todos:", error);
    }
  };

  const totalCount = todos.length;
  const completedCount = todos.filter(todo => todo.completed).length;
  const pendingCount = totalCount - completedCount;

  useEffect(() => {
    fetchTodos();
  }, []);

  const priorityRank = {
    high: 3,
    medium: 2,
    low: 1
  };

  let filteredTodos = todos
    .filter((todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "pending") return !todo.completed;
      return true;
    })
    .filter((todo) =>
      todo.title.toLowerCase().includes(search.toLowerCase())
    );

  filteredTodos = [...filteredTodos].sort((a, b) => {

    // PRIORITY: High → Low
    if (sortOrder === "priority-desc") {
      return priorityRank[b.priority] - priorityRank[a.priority];
    }

    // PRIORITY: Low → High
    if (sortOrder === "priority-asc") {
      return priorityRank[a.priority] - priorityRank[b.priority];
    }

    // DUE DATE: Earliest First
    if (sortOrder === "date-asc") {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    }

    // DUE DATE: Latest First
    if (sortOrder === "date-desc") {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(b.dueDate) - new Date(a.dueDate);
    }

    // COMBINED: Due Date → Then Priority
    if (sortOrder === "date-priority") {

      // First compare due dates
      if (a.dueDate && b.dueDate) {
        const dateDiff =
          new Date(a.dueDate) - new Date(b.dueDate);

        if (dateDiff !== 0) return dateDiff;
      }

      // If same date OR no date → compare priority
      return priorityRank[b.priority] - priorityRank[a.priority];
    }

    return 0;
  });

  return (
    <>
      <div className="background-overlay">
        <div className={`app-container ${darkMode ? "dark" : ""}`}>
          <button
            className="dark-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
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
            <button
              className={filter === "all" ? "active-filter" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </button>

            <div className="sort-container">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="sort-select"
              >
                <option value="none">Sort Options</option>

                <option value="priority-desc">
                  Priority: High → Low
                </option>

                <option value="priority-asc">
                  Priority: Low → High
                </option>

                <option value="date-asc">
                  Due Date: Earliest First
                </option>

                <option value="date-desc">
                  Due Date: Latest First
                </option>

                <option value="date-priority">
                  Due Date → Then Priority
                </option>
              </select>
            </div>

            <button
              className={filter === "completed" ? "active-filter" : ""}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>

            <button
              className={filter === "pending" ? "active-filter" : ""}
              onClick={() => setFilter("pending")}
            >
              Pending
            </button>
          </div>

          {completedCount > 0 && (
            <button className="clear-btn" onClick={clearCompleted}>
              Clear Completed
            </button>
          )}

          <TodoList
            todos={filteredTodos}
            fetchTodos={fetchTodos}
            setTodos={setTodos}
            setSelectedTask={setSelectedTask}
          />
        </div>
      </div>
      <TaskSidebar
        selectedTask={selectedTask}
        closeSidebar={() => setSelectedTask(null)}
        refreshTodos={fetchTodos}
      />
    </>


  );
}

export default App;