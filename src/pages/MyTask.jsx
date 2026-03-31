import React from "react";
import CardTask from "../components/CardTask";
import TaskDetails from "../components/TaskDetails";

const MyTask = ({ profile }) => {
  const tasks = JSON.parse(
    localStorage.getItem(`tasks_${profile.name}`) || "[]",
  )
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 2);

  return (
    <div className="my-task content-wrapper flex w-full h-full gap-5">
      <div className="first-row-content flex-1 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] bg-white border-2 border-gray-200 py-5 px-10 gap-5 flex flex-col">
        <h1 className="font-semibold text-base">
          <span className="underline decoration-2 decoration-[#FF6767]">
            My{" "}
          </span>
          Tasks
        </h1>
        <div className="cards-task flex flex-col gap-3 items-center overflow-y-auto">
          {tasks.length === 0 ? (
            <p className="text-gray-400 text-sm">Belum ada task.</p>
          ) : (
            tasks.map((task) => (
              <CardTask
                key={task.id}
                task={task}
                profile={profile}
                onTaskUpdate={() => {}}
              />
            ))
          )}
        </div>
      </div>
      <div className="second-row-content flex-1">
        <TaskDetails />
      </div>
    </div>
  );
};

export default MyTask;
