import { useState } from "react";
import { createTodo } from "../services/api";

const TodoForm = ({ fetchTodos }) => {
    const [title, setTitle] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        try {
            await createTodo({
                title: title,
                completed: false
            });

            setTitle("");
            fetchTodos(); // refresh list
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <input type="text" placeholder="Enter todo..." value={title} onChange={(e) => setTitle(e.target.value)}
                style={{ padding: "8px", width: "250px" }}
            />
            <button type="submit" style={{ marginLeft: "10px", padding: "8px" }}>
                Add
            </button>
        </form>
    );
};

export default TodoForm;