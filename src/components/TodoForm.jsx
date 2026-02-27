import { useState } from "react";
import { createTodo } from "../services/api";

const TodoForm = ({ fetchTodos }) => {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("medium");
    const [dueDate, setDueDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        try {
            await createTodo({
                title: title,
                completed: false,
                priority: priority,
                dueDate: dueDate
            });

            setTitle("");
            setDueDate("");
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

            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="date-input"
            />

            <select
                className={`priority-select prioritys-${priority}`}
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            <button type="submit" style={{ marginLeft: "10px", padding: "8px" }}>
                Add
            </button>
        </form>
    );
};

export default TodoForm;