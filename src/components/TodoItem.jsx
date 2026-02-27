import { useState } from "react";
import { deleteTodo, updateTodo } from "../services/api";

const TodoItem = ({ todo, fetchTodos }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(todo.title);

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
                title: editedTitle
            });
            setIsEditing(false);
            fetchTodos();
        } catch (error) {
            console.error("Error editing todo:", error);
        }
    };

    return (
        <li className="todo-item">
            {isEditing ? (
                <>
                    <input
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className="edit-input"
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
                    <span
                        onClick={handleToggle}
                        className={todo.completed ? "completed" : ""}
                    >
                        {todo.title}
                    </span>

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