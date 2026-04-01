import React, { useState } from "react";
import CardTask from "../components/CardTask";
import TaskDetails from "../components/TaskDetails";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { getDateLabel } from "../utils/dateHelper";

const ITEMS_PER_PAGE = 4;

const MyTask = ({ profile, onForceRefresh }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTask, setSelectedTask] = useState(null);

  const [allTasks, setAllTasks] = useState(
    JSON.parse(localStorage.getItem(`tasks_${profile.name}`) || "[]").sort(
      (a, b) => new Date(a.deadline) - new Date(b.deadline),
    ),
  );

  const refreshTasks = () => {
    setAllTasks(
      JSON.parse(localStorage.getItem(`tasks_${profile.name}`) || "[]").sort(
        (a, b) => new Date(a.deadline) - new Date(b.deadline),
      ),
    );
  };

  const totalPages = Math.ceil(allTasks.length / ITEMS_PER_PAGE);
  const pagedTasks = allTasks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const grouped = pagedTasks.reduce((acc, task) => {
    if (!acc[task.deadline]) acc[task.deadline] = [];
    acc[task.deadline].push(task);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort(
    (a, b) => new Date(a) - new Date(b),
  );

  const handleDeleteAll = () => {
    const confirmToast = toast(
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Hapus semua task?</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              localStorage.removeItem(`tasks_${profile.name}`);
              setCurrentPage(1);
              toast.dismiss(confirmToast);
              toast.success("Semua task berhasil dihapus!");
              onForceRefresh();
            }}
            className="bg-red-500 text-white text-xs px-3 py-1 rounded-md"
          >
            Hapus
          </button>
          <button
            onClick={() => toast.dismiss(confirmToast)}
            className="bg-gray-200 text-xs px-3 py-1 rounded-md"
          >
            Batal
          </button>
        </div>
      </div>,
      { autoClose: false, closeButton: false },
    );
  };

  return (
    <div className="my-task content-wrapper flex lg:flex-row flex-col w-full h-full gap-5">
      <div className="first-row-content flex-1 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] bg-white border-2 border-gray-200 py-5 px-4 lg:px-10 gap-3 flex flex-col min-h-0">
        <h1 className="font-semibold text-base">
          <span className="underline decoration-2 decoration-[#FF6767]">
            My{" "}
          </span>
          Tasks
        </h1>
        <div className="task-list-second-content flex flex-col min-h-0 flex-1 justify-between">
          <div className="cards-task flex flex-col gap-5 w-full overflow-y-auto min-h-0 flex-1">
            {sortedDates.length === 0 ? (
              <p className="text-gray-400 text-sm">Belum ada task.</p>
            ) : (
              sortedDates.map((date) => (
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
                  {grouped[date].map((task) => (
                    <CardTask
                      key={task.id}
                      task={task}
                      profile={profile}
                      onTaskUpdate={() => {}}
                      onSelect={() => setSelectedTask(task)}
                      isActive={selectedTask?.id === task.id}
                      disableHide={true}
                    />
                  ))}
                </div>
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
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
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
                ),
              )}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="text-xs px-3 py-1 rounded-md bg-gray-100 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}

          <div className="task-button flex gap-3 justify-end mt-3 shrink-0">
            <button
              onClick={handleDeleteAll}
              className="bg-[#FF6767] rounded-lg size-9 flex items-center justify-center text-white"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
      <div className="second-row-content flex-1">
        <TaskDetails
          task={selectedTask}
          profile={profile}
          onTaskUpdate={() => {
            setSelectedTask(null);
            refreshTasks();
            setTimeout(() => {
              const updatedTasks = JSON.parse(
                localStorage.getItem(`tasks_${profile.name}`) || "[]",
              );
              const updatedSelected = updatedTasks.find(
                (t) => t.id === selectedTask?.id,
              );
              setSelectedTask(updatedSelected ? { ...updatedSelected } : null);
            }, 100);
          }}
        />
      </div>
    </div>
  );
};

export default MyTask;
