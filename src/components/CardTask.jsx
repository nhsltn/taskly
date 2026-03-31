import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";

const priorityColor = {
  extreme: "text-red-500",
  moderate: "text-blue-500",
  low: "text-green-500",
};

const statusColor = {
  "Not Started": "#ef4444",
  "In Progress": "#3b82f6",
  Completed: "#16a34a",
};

const CardTask = ({ task, profile, onTaskUpdate, onSelect, isActive }) => {
  const [done, setDone] = useState(task.status === "Completed");
  const [status, setStatus] = useState(task.status);
  const [hiding, setHiding] = useState(false);
  const btnColor = statusColor[status];

  const handleDone = () => {
    const newDone = !done;

    if (newDone) {
      setHiding(true);
      setTimeout(() => {
        const newStatus = "Completed";
        setDone(true);
        setStatus(newStatus);
        const userTasksKey = `tasks_${profile.name}`;
        const tasks = JSON.parse(localStorage.getItem(userTasksKey) || "[]");
        const updatedTasks = tasks.map((t) =>
          t.id === task.id
            ? { ...t, status: newStatus, completedAt: Date.now() }
            : t,
        );
        localStorage.setItem(userTasksKey, JSON.stringify(updatedTasks));
        console.log("onTaskUpdate dipanggil, status baru:", newStatus);
        onTaskUpdate();
      }, 400);
    } else {
      setDone(false);
      setStatus("Not Started");
      const userTasksKey = `tasks_${profile.name}`;
      const tasks = JSON.parse(localStorage.getItem(userTasksKey) || "[]");
      const updatedTasks = tasks.map((t) =>
        t.id === task.id
          ? { ...t, status: "Not Started", completedAt: null }
          : t,
      );
      localStorage.setItem(userTasksKey, JSON.stringify(updatedTasks));
      onTaskUpdate();
    }
  };

  return (
    <div
      onClick={onSelect}
      className={`border flex flex-col gap-3 p-5 w-full rounded-2xl transition-all duration-400 cursor-pointer
        ${hiding ? "opacity-0 -translate-x-10" : "opacity-100 translate-x-0"}
        ${isActive ? "border-[#FF6767] bg-red-50" : "border-gray-400"}
      `}
    >
      <div className="task-header flex gap-2 items-center">
        <button
          onClick={handleDone}
          style={{
            borderColor: btnColor,
            backgroundColor: done ? btnColor : "white",
          }}
          className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200"
        >
          {done && <FaCheck className="text-white text-[8px]" />}
        </button>
        <h3
          className={`task-title text-base font-semibold transition-all duration-200 ${done ? "line-through text-gray-400" : ""}`}
        >
          {task.title}
        </h3>
      </div>
      <p className="task-desc text-sm text-gray-400 wrap-break-word">
        {task.description.length > 100
          ? task.description.slice(0, 100) + "..."
          : task.description}
      </p>
      <div className="card-footer flex justify-between">
        <div className="priority flex text-[10px] gap-1">
          <p>Priority:</p>
          <p className={priorityColor[task.priority]}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </p>
        </div>
        <div className="status flex text-[10px] gap-1">
          <p>Status:</p>
          <p style={{ color: statusColor[status] }}>{status}</p>
        </div>
        <div className="created flex text-[10px]">
          <p>Created on: {task.createdAt}</p>
        </div>
      </div>
    </div>
  );
};

export default CardTask;
