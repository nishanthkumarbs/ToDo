import { FaCalendarAlt, FaTag, FaFlag } from "react-icons/fa";

const TaskSidebar = ({ selectedTask, closeSidebar }) => {
    if (!selectedTask) return null;

    return (
        <div className="sidebar">
            <button className="close-btn" onClick={closeSidebar}>
                ✖
            </button>

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
                <span style={{ textTransform: "capitalize" }}>
                    {selectedTask.category || "No category"}
                </span>
            </div>

            <div className="sidebar-section">
                <FaFlag />
                <span style={{ textTransform: "capitalize" }}>
                    {selectedTask.priority || "No priority"}
                </span>
            </div>

            <div className="sidebar-section">
                <span>
                    Status: {selectedTask.completed ? "Completed" : "Pending"}
                </span>
            </div>
        </div>
    );
};

export default TaskSidebar;