import React, { useState } from "react";
import { RiFileEditFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import AddTask from "./AddTask";

const priorityColor = {
  extreme: "text-red-500",
  moderate: "text-blue-500",
  low: "text-green-500",
};

const statusColor = {
  "Not Started": "text-red-500",
  "In Progress": "text-blue-500",
  Completed: "text-green-600",
};

const TaskDetails = ({ task, profile, onTaskUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    const confirmToast = toast(
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Hapus task ini?</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              const userTasksKey = `tasks_${profile.name}`;
              const tasks = JSON.parse(
                localStorage.getItem(userTasksKey) || "[]",
              );
              const updatedTasks = tasks.filter((t) => t.id !== task.id);
              localStorage.setItem(userTasksKey, JSON.stringify(updatedTasks));
              toast.dismiss(confirmToast);
              toast.success("Task berhasil dihapus!", { autoClose: 1500 });
              setTimeout(() => onTaskUpdate(), 1500);
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

  if (!task)
    return (
      <div className="flex-1 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] bg-white border-2 border-gray-200 py-5 px-10 gap-5 flex flex-col h-full items-center justify-center">
        <p className="text-gray-400 text-sm">Pilih task untuk melihat detail</p>
      </div>
    );

  return (
    <>
      <div className="flex-1 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] bg-white border-2 border-gray-200 py-5 px-4 lg:px-10 gap-5 flex flex-col h-full">
        <div className="task-header flex flex-col gap-4">
          <h3 className="font-semibold text-lg">{task.title}</h3>
          <p className="text-xs">
            Priority:{" "}
            <span className={priorityColor[task.priority]}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
          </p>
          <p className="text-xs">
            Status:{" "}
            <span className={statusColor[task.status]}>{task.status}</span>
          </p>
        </div>
        <div className="task-second-content flex flex-col h-full justify-between">
          <div className="task-description flex flex-col gap-3 text-base text-gray-600">
            <h3 className="font-bold">Task Description</h3>
            <p className="font-regular">{task.description}</p>
            <p>
              <span className="font-bold">Deadline for this task:</span>{" "}
              <span>{task.deadline}</span>
            </p>
          </div>
          <div className="task-button flex gap-3 justify-end">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-[#FF6767] rounded-lg size-9 flex items-center justify-center text-white"
            >
              <RiFileEditFill />
            </button>
            <button
              onClick={handleDelete}
              className="bg-[#FF6767] rounded-lg size-9 flex items-center justify-center text-white"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>

      {isEditing && (
        <AddTask
          onClose={() => {
            setIsEditing(false);
            onTaskUpdate();
          }}
          initialData={task}
          isEdit={true}
        />
      )}
    </>
  );
};

export default TaskDetails;
