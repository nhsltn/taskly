import React, { useState } from "react";
import { getDay, getDateLabel } from "../utils/dateHelper";
import AddTask from "../components/AddTask";
import { FaRegClipboard, FaRegClock, FaPlus } from "react-icons/fa";
import CardTask from "../components/CardTask";

const getTopTasks = (name) =>
  JSON.parse(localStorage.getItem(`tasks_${name}`) || "[]")
    .filter((t) => t.status !== "Completed")
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

const Todo = ({ profile, onTaskUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState(() => getTopTasks(profile.name));

  const handleTaskUpdate = () => {
    setTasks(getTopTasks(profile.name));
    onTaskUpdate();
  };

  const grouped = tasks.reduce((acc, task) => {
    if (!acc[task.deadline]) acc[task.deadline] = [];
    acc[task.deadline].push(task);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped)
    .sort((a, b) => new Date(a) - new Date(b))
    .slice(0, 2);

  const today = new Date().toISOString().split("T")[0];

  let totalRendered = 0;
  const renderedIds = [];

  sortedDates.forEach((date) => {
    const remaining = 2 - totalRendered;
    if (remaining <= 0) return;
    const tasksToShow = grouped[date].slice(0, remaining);
    totalRendered += tasksToShow.length;
    tasksToShow.forEach((t) => renderedIds.push(t.id));
  });

  const nextTask = tasks.find((t) => !renderedIds.includes(t.id));

  return (
    <div className="first-row-content flex-1 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] bg-white py-5 lg:px-10 px-4 gap-5 flex flex-col">
      <div className="card-header flex flex-col gap-4 first-dashboard-content">
        <div className="content-header flex justify-between items-center">
          <div className="todo flex flex-row gap-2 items-center">
            <div className="content-title relative w-fit">
              <FaRegClipboard className="text-gray-400 text-3xl" />
              <FaRegClock className="text-gray-400 text-lg absolute -bottom-1 -right-1 border border-white bg-white rounded-full" />
            </div>
            <h1 className="font-medium text-base text-[#FF6767]">To-Do</h1>
          </div>
          <button
            className="flex gap-2 items-center"
            onClick={() => setIsOpen(true)}
          >
            <FaPlus className="text-base text-[#F24E1E] size-4" />
            <p className="text-base text-gray-400">Add Task</p>
          </button>
          {isOpen && (
            <AddTask
              onClose={() => {
                setIsOpen(false);
                setTasks(getTopTasks(profile.name));
                onTaskUpdate();
              }}
            />
          )}
        </div>
      </div>

      <div className="cards-task flex flex-col gap-5 overflow-y-auto">
        {sortedDates.length === 0 ? (
          <p className="text-gray-400 text-sm">Belum ada task.</p>
        ) : (
          <>
            {sortedDates.map((date) => {
              const tasksToShow = grouped[date].filter((t) =>
                renderedIds.includes(t.id),
              );
              if (tasksToShow.length === 0) return null;

              return (
                <div key={date} className="flex flex-col gap-3">
                  <div className="todo-date flex items-center gap-2">
                    <p className="text-xs font-medium">
                      {new Date(date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                      })}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {getDateLabel(date)}
                    </p>
                  </div>
                  {tasksToShow.map((task) => (
                    <CardTask
                      key={task.id}
                      task={task}
                      profile={profile}
                      onTaskUpdate={handleTaskUpdate}
                    />
                  ))}
                </div>
              );
            })}

            {nextTask && (
              <>
                <hr className="border-gray-200" />
                <div className="flex flex-col gap-3">
                  <div className="todo-date flex items-center gap-2">
                    <p className="text-xs font-medium">
                      {new Date(nextTask.deadline).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                      })}
                    </p>
                    {nextTask.deadline === today ? (
                      <p className="text-gray-400 text-sm">• Today</p>
                    ) : (
                      <p className="text-gray-400 text-sm">
                        • {getDay(new Date(nextTask.deadline))}
                      </p>
                    )}
                  </div>
                  <CardTask
                    key={nextTask.id}
                    task={nextTask}
                    profile={profile}
                    onTaskUpdate={handleTaskUpdate}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Todo;
