import { useState } from "react";
import { createTodo } from "../services/api";

const TodoForm = ({ fetchTodos }) => {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("medium");
    const [dueDate, setDueDate] = useState("");
    const [category, setCategory] = useState("work");
    const [repeat, setRepeat] = useState("none");
    const [reminder, setReminder] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        try {
            await createTodo({
                title,
                completed: false,
                priority,
                dueDate,
                category,
                repeat,
                reminder,
                createdAt: new Date().toISOString()
            });

            setTitle("");
            setDueDate("");
            setCategory("work");
            setRepeat("none");
            setReminder("");
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
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="category-select"
            >
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="study">Study</option>
                <option value="health">Health</option>
            </select>

            <select
                value={repeat}
                onChange={(e) => setRepeat(e.target.value)}
                className="category-select"
            >
                <option value="none">No Repeat</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
            </select>

            <input
                type="datetime-local"
                value={reminder}
                onChange={(e) => setReminder(e.target.value)}
                className="category-select"
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