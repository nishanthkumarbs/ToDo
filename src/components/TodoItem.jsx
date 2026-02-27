import { deleteTodo, updateTodo } from "../services/api";

const TodoItem = ({ todo, fetchTodos }) => {

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

    return (
        <li className="todo-item">
            <span
                onClick={handleToggle}
                className={todo.completed ? "completed" : ""}
            >
                {todo.title}
            </span>

            <button className="delete-btn" onClick={handleDelete}>
                ❌
            </button>
        </li>
    );
};

export default TodoItem;