import { useState, useEffect } from "react";
import { updateTodo } from "../services/api";
import { FaCalendarAlt, FaTag, FaFlag } from "react-icons/fa";

const TaskSidebar = ({ selectedTask, closeSidebar, refreshTodos }) => {
    // ✅ All hooks must be at top level
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [category, setCategory] = useState("work");
    const [priority, setPriority] = useState("medium");
    const [repeat, setRepeat] = useState("none");

    // ✅ Sync state when selectedTask changes
    useEffect(() => {
        if (selectedTask) {
            setTitle(selectedTask.title || "");
            setDueDate(selectedTask.dueDate || "");
            setCategory(selectedTask.category || "work");
            setPriority(selectedTask.priority || "medium");
            setIsEditing(false);
            setRepeat(selectedTask.repeat || "none");
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
            priority
        });

        refreshTodos();
        setIsEditing(false);
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

                        <div className="sidebar-section">
                            <span>Repeat:</span>
                            <span style={{ textTransform: "capitalize" }}>
                                {selectedTask.repeat || "None"}
                            </span>
                        </div>

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

                        <button
                            className="edit-btn"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Task
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default TaskSidebar;