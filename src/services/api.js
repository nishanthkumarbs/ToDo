import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// GET all todos
export const getTodos = () => API.get("/todos");

// CREATE todo
export const createTodo = (todo) => API.post("/todos", todo);

// DELETE todo
export const deleteTodo = (id) => API.delete(`/todos/${id}`);

// UPDATE todo
export const updateTodo = (id, updatedTodo) =>
  API.put(`/todos/${id}`, updatedTodo);