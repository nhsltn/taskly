import React, { useState } from "react";
import CardTask from "./CardTask";

const PRIORITY_ORDER = { extreme: 1, moderate: 2, low: 3 };
const ITEMS_PER_PAGE = 4;

const PriorityTask = ({ profile }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const tasks = JSON.parse(
    localStorage.getItem(`tasks_${profile.name}`) || "[]",
  )
    .filter((t) => t.status !== "Completed")
    .sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);

  const totalPages = Math.ceil(tasks.length / ITEMS_PER_PAGE);
  const pagedTasks = tasks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="flex-1 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] bg-white border-2 border-gray-200 py-5 px-4 lg:px-10 gap-5 flex flex-col">
      <h1 className="font-semibold text-base">
        <span className="underline decoration-2 decoration-[#FF6767]">
          Priority{" "}
        </span>
        Tasks
      </h1>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-3 overflow-y-auto">
          {pagedTasks.length === 0 ? (
            <p className="text-gray-400 text-sm">Belum ada task.</p>
          ) : (
            pagedTasks.map((task) => (
              <CardTask
                key={task.id}
                task={task}
                profile={profile}
                onTaskUpdate={() => {}}
                disableHide={true}
                showDeadline={true}
              />
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination flex items-center justify-center gap-2 mt-3">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="text-xs px-3 py-1 rounded-md bg-gray-100 disabled:opacity-40"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`text-xs px-3 py-1 rounded-md ${
                  currentPage === page
                    ? "bg-[#FF6767] text-white"
                    : "bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="text-xs px-3 py-1 rounded-md bg-gray-100 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriorityTask;
