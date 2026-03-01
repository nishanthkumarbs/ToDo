import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});
export default API;

// GET all todos
export const getTodos = () => API.get("/todos");

// CREATE todo
export const createTodo = (todo) => API.post("/todos", todo);

// DELETE todo
export const deleteTodo = (id) => API.delete(`/todos/${id}`);

// UPDATE todo
export const updateTodo = (id, updatedTodo) =>
  API.put(`/todos/${id}`, updatedTodo);

// 🔐 Register
export const registerUser = async (userData) => {
  const existingUser = await API.get("/users", {
    params: { email: userData.email }
  });

  if (existingUser.data.length > 0) {
    throw new Error("EMAIL_EXISTS");
  }

  const res = await API.post("/users", {
    name: userData.name,
    email: userData.email,
    password: userData.password,
    avatar: null
  });

  return res.data;
};

// 🔐 Login
export const loginUser = async (email, password) => {
  const res = await API.get("/users", {
    params: { email }
  });

  if (res.data.length === 0) {
    throw new Error("USER_NOT_FOUND");
  }

  const user = res.data[0];

  if (user.password !== password) {
    throw new Error("INVALID_PASSWORD");
  }

  return user;
};