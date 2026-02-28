import { useState, useEffect } from "react";
import { updateTodo } from "../services/api";
import { FaCalendarAlt, FaTag, FaFlag } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { deleteTodo } from "../services/api";

const TaskSidebar = ({ selectedTask, closeSidebar, refreshTodos, handleDeleteWithUndo }) => {
    // ✅ All hooks must be at top level
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [category, setCategory] = useState("work");
    const [priority, setPriority] = useState("medium");
    const [repeat, setRepeat] = useState("none");
    const [reminder, setReminder] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);


    useEffect(() => {
        setShowConfirm(false);
    }, [selectedTask]);

    // ✅ Sync state when selectedTask changes
    useEffect(() => {
        if (selectedTask) {
            setTitle(selectedTask.title || "");
            setDueDate(selectedTask.dueDate || "");
            setCategory(selectedTask.category || "work");
            setPriority(selectedTask.priority || "medium");
            setIsEditing(false);
            setRepeat(selectedTask.repeat || "none");
            setReminder(selectedTask.reminder || "");

        }
    }, [selectedTask]);

    // ✅ Only after hooks
    if (!selectedTask) return null;

    const handleSave = async () => {
        await updateTodo(selectedTask.id, {
            ...selectedTask,
            title,
            dueDate,
            category,
            repeat,
            reminder,
            priority
        });

        refreshTodos();
        setIsEditing(false);
    };

    const handleDelete = () => {
        handleDeleteWithUndo(selectedTask);
        closeSidebar();
    };

    const getCreatedText = () => {
        if (!selectedTask.createdAt) {
            return "Created recently";
        }

        const created = new Date(selectedTask.createdAt);
        const now = new Date();

        const diffTime = now - created;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "Created today";
        if (diffDays === 1) return "Created yesterday";

        return `Created ${diffDays} days ago`;
    };

    return (
        <div className="sidebar-overlay" onClick={closeSidebar}>
            <div
                className="sidebar"
                onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >
                <button className="close-btn" onClick={closeSidebar}>
                    ✖
                </button>

                {isEditing ? (
                    <>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="sidebar-input"
                        />

                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="sidebar-input"
                        />

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="sidebar-input"
                        >
                            <option value="work">Work</option>
                            <option value="personal">Personal</option>
                            <option value="study">Study</option>
                            <option value="health">Health</option>
                        </select>

                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="sidebar-input"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>

                        <select
                            value={repeat}
                            onChange={(e) => setRepeat(e.target.value)}
                            className="sidebar-input"
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
                            className="sidebar-input"
                        />

                        <button className="save-btn" onClick={handleSave}>
                            Save Changes
                        </button>
                    </>
                ) : (
                    <>
                        <h2>{selectedTask.title}</h2>

                        <div className="sidebar-section">
                            <FaCalendarAlt />
                            <span>
                                {selectedTask.dueDate
                                    ? new Date(selectedTask.dueDate).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric"
                                    })
                                    : "No due date"}
                            </span>
                        </div>

                        <div className="sidebar-section">
                            <FaTag />
                            <span>{selectedTask.category}</span>
                        </div>

                        <div className="sidebar-section">
                            <FaFlag />
                            <span>{selectedTask.priority}</span>
                        </div>

                        <div className="sidebar-section">
                            <span>Repeat:</span>
                            <span style={{ textTransform: "capitalize" }}>
                                {selectedTask.repeat || "None"}
                            </span>
                        </div>

                        <div className="sidebar-section">
                            <span>Reminder:</span>
                            <span>
                                {selectedTask.reminder
                                    ? new Date(selectedTask.reminder).toLocaleString()
                                    : "No reminder"}
                            </span>
                        </div>

                        <button
                            className="edit-btn"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Task
                        </button>
                        <div className="sidebar-footer">
                            <span className="created-text">
                                {getCreatedText()}
                            </span>

                            <FaTrash
                                className="delete-icon"
                                onClick={() => setShowConfirm(true)}
                            />
                        </div>
                        {showConfirm && (
                            <div
                                className="confirm-overlay"
                                onClick={() => setShowConfirm(false)}
                            >
                                <div
                                    className="confirm-modal"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <p>Are you sure you want to delete this task?</p>

                                    <div className="confirm-actions">
                                        <button
                                            className="cancel-btn"
                                            onClick={() => setShowConfirm(false)}
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={handleDelete}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </>
                )}
            </div>
        </div>
    );
};

export default TaskSidebar;