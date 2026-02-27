import TodoItem from "./TodoItem";

const TodoList = ({ todos, fetchTodos }) => {
    return (
        <ul className="todo-list">
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} fetchTodos={fetchTodos} />
            ))}
        </ul>
    );
};

export default TodoList;