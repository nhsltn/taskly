import React, { useState } from "react";
import CardTask from "../components/CardTask";
import TaskDetails from "../components/TaskDetails";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const ITEMS_PER_PAGE = 4;

const MyTask = ({ profile, onForceRefresh }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const allTasks = JSON.parse(
    localStorage.getItem(`tasks_${profile.name}`) || "[]",
  ).sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  const totalPages = Math.ceil(allTasks.length / ITEMS_PER_PAGE);
  const tasks = allTasks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
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
    <div className="my-task content-wrapper flex w-full h-full gap-5">
      <div className="first-row-content flex-1 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] bg-white border-2 border-gray-200 py-5 px-10 gap-5 flex flex-col">
        <h1 className="font-semibold text-base">
          <span className="underline decoration-2 decoration-[#FF6767]">
            My{" "}
          </span>
          Tasks
        </h1>
        <div className="task-list-second-content flex flex-col h-full justify-between">
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

          <div className="task-button flex gap-3 justify-end mt-3">
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
        <TaskDetails />
      </div>
    </div>
  );
};

export default MyTask;
