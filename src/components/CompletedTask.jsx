/* eslint-disable no-unused-vars */
import React from "react";
import { BsClipboard2Check } from "react-icons/bs";

const priorityColor = {
  extreme: "text-red-500",
  moderate: "text-blue-500",
  low: "text-green-500",
};

const CompletedTask = ({ profile, taskUpdated }) => {
  const completedTasks = JSON.parse(
    localStorage.getItem(`tasks_${profile.name}`) || "[]",
  )
    .filter((t) => t.status === "Completed")
    .sort((a, b) => b.completedAt - a.completedAt)
    .slice(0, 2);

  return (
    <div className="third-dashboard-content completed-task rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] bg-white py-5 px-4 lg:px-10 gap-5 flex flex-col h-full">
      <div className="completed-task-header flex items-center gap-2">
        <BsClipboard2Check className="text-gray-400 text-3xl" />
        <h1 className="font-medium text-base text-[#FF6767]">
          Completed Tasks
        </h1>
      </div>
      <div className="cards-task flex flex-col gap-3 items-center overflow-y-auto">
        {completedTasks.length === 0 ? (
          <p className="text-gray-400 text-sm">Belum ada task selesai.</p>
        ) : (
          completedTasks.map((task) => (
            <div
              key={task.id}
              className="border border-gray-400 flex flex-col gap-3 p-5 w-full rounded-2xl"
            >
              <div className="task-header flex gap-2 items-center">
                <div
                  className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                  style={{ borderColor: "#16a34a", backgroundColor: "#16a34a" }}
                >
                  <BsClipboard2Check className="text-white text-[8px]" />
                </div>
                <h3 className="task-title text-base font-semibold">
                  {task.title}
                </h3>
              </div>
              <p className="task-desc text-sm text-gray-400 line-clamp-3">
                {task.description}
              </p>
              <div className="card-footer flex justify-between">
                <div className="priority flex text-[10px] gap-1">
                  <p>Priority:</p>
                  <p className={priorityColor[task.priority]}>
                    {task.priority.charAt(0).toUpperCase() +
                      task.priority.slice(1)}
                  </p>
                </div>
                <div className="status flex text-[10px] gap-1">
                  <p>Status:</p>
                  <p style={{ color: "#16a34a" }}>Completed</p>
                </div>
                <div className="created flex text-[10px]">
                  <p>Created on: {task.createdAt}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CompletedTask;
