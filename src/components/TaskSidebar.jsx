const TaskSidebar = ({ selectedTask, closeSidebar }) => {
    if (!selectedTask) return null;

    return (
        <div className="sidebar">
            <button className="close-btn" onClick={closeSidebar}>
                ✖
            </button>

            <h2>{selectedTask.title}</h2>
        </div>
    );
};

export default TaskSidebar;