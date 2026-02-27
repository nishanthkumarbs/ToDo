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
                    />
                    <button onClick={handleUpdate}>💾</button>
                </>
            ) : (
                <>
                    <span
                        onClick={handleToggle}
                        className={todo.completed ? "completed" : ""}
                    >
                        {todo.title}
                    </span>

                    <div>
                        <button onClick={() => setIsEditing(true)}>✏</button>
                        <button className="delete-btn" onClick={handleDelete}>
                            ❌
                        </button>
                    </div>
                </>
            )}
        </li>
    );
};

export default TodoItem;