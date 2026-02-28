import { useState, useMemo } from "react";

const CalendarView = ({ todos, setSelectedTask }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    const startDay = firstDayOfMonth.getDay();

    const days = useMemo(() => {
        const calendarDays = [];

        // Empty cells before month starts
        for (let i = 0; i < startDay; i++) {
            calendarDays.push(null);
        }

        // Actual month days
        for (let date = 1; date <= lastDateOfMonth; date++) {
            calendarDays.push(new Date(year, month, date));
        }

        return calendarDays;
    }, [year, month, startDay, lastDateOfMonth]);

    const tasksByDate = {};
    todos.forEach((todo) => {
        if (!todo.dueDate) return;
        tasksByDate[todo.dueDate] = tasksByDate[todo.dueDate] || [];
        tasksByDate[todo.dueDate].push(todo);
    });

    return (
        <div className="calendar-container">
            <div className="calendar-header-bar">
                <button
                    onClick={() =>
                        setCurrentDate(new Date(year, month - 1, 1))
                    }
                >
                    ◀
                </button>

                <h2>
                    {currentDate.toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric"
                    })}
                </h2>

                <button
                    onClick={() =>
                        setCurrentDate(new Date(year, month + 1, 1))
                    }
                >
                    ▶
                </button>
            </div>

            <div className="calendar-grid">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="calendar-header">
                        {day}
                    </div>
                ))}

                {days.map((date, index) => {
                    if (!date) {
                        return <div key={index} className="calendar-cell empty" />;
                    }

                    const formattedDate = date.toISOString().split("T")[0];

                    const today = new Date();
                    const isToday =
                        date.getDate() === today.getDate() &&
                        date.getMonth() === today.getMonth() &&
                        date.getFullYear() === today.getFullYear();

                    return (
                        <div
                            key={index}
                            className={`calendar-cell ${isToday ? "today-cell" : ""}`}
                        >
                            <div className="calendar-date">
                                {date.getDate()}
                            </div>

                            {tasksByDate[formattedDate]?.map((task) => (
                                <div
                                    key={task.id}
                                    className="calendar-task"
                                    onClick={() => setSelectedTask(task)}
                                >
                                    {task.title}
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarView;