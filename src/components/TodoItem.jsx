import { useState } from "react";
import { deleteTodo, updateTodo } from "../services/api";
import { FaCalendarAlt } from "react-icons/fa";

const TodoItem = ({ todo, fetchTodos }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(todo.title);
    const [editedDueDate, setEditedDueDate] = useState(todo.dueDate || "");

    const handleDelete = async () => {
        try {
            await deleteTodo(todo.id);
            fetchTodos();
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    const handleToggle = async () => {
        try {
            await updateTodo(todo.id, {
                ...todo,
                completed: !todo.completed
            });
            fetchTodos();
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    const handleUpdate = async () => {
        if (!editedTitle.trim()) return;

        try {
            await updateTodo(todo.id, {
                ...todo,
                title: editedTitle,
                dueDate: editedDueDate
            });
            setIsEditing(false);
            fetchTodos();
        } catch (error) {
            console.error("Error editing todo:", error);
        }
    };

    const getDaysLeft = (dueDate) => {
        if (!dueDate) return null;

        const today = new Date();
        const due = new Date(dueDate);

        // Remove time part for accurate day calculation
        today.setHours(0, 0, 0, 0);
        due.setHours(0, 0, 0, 0);

        const diffTime = due - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays;
    };

    const daysLeft = getDaysLeft(todo.dueDate);

    return (
        <li className="todo-item">
            {isEditing ? (
                <>
                    <input
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className="edit-input"
                    />

                    <input
                        type="date"
                        value={editedDueDate}
                        onChange={(e) => setEditedDueDate(e.target.value)}
                        className="edit-date-input"
                    />

                    <div className="action-buttons">
                        <button className="save-btn" onClick={handleUpdate}>
                            Save
                        </button>

                        <button
                            className="cancel-btn"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="todo-content">
                        <span
                            onClick={handleToggle}
                            className={`${todo.completed ? "completed" : ""} priority-${todo.priority}`}
                        >
                            {todo.title}
                        </span>

                        {todo.dueDate && (
                            <div
                                className={`due-date-row ${daysLeft < 0
                                        ? "due-overdue"
                                        : daysLeft === 0
                                            ? "due-today"
                                            : ""
                                    }`}
                            >
                                <span className="due-label">
                                    <FaCalendarAlt className="due-icon" />
                                    Due:
                                </span>

                                <span className="due-value">
                                    {new Date(todo.dueDate).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric"
                                    })}
                                </span>
                            </div>
                        )}
                    </div>

                    {daysLeft !== null && (
                        <span
                            className={`countdown-badge ${daysLeft < 0
                                ? "overdue"
                                : daysLeft === 0
                                    ? "today"
                                    : daysLeft <= 2
                                        ? "warning"
                                        : "safe"
                                }`}
                        >
                            {daysLeft > 0
                                ? `${daysLeft} day${daysLeft > 1 ? "s" : ""} left`
                                : daysLeft === 0
                                    ? "Due today"
                                    : "Overdue"}
                        </span>
                    )}

                    <div className="action-buttons">
                        <button
                            className="edit-btn"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit
                        </button>

                        <button
                            className="delete-btn"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                </>
            )}
        </li>
    );
};

export default TodoItem;