import React, { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { toast } from "react-toastify";

const AddTask = ({ onClose }) => {
  const [form, setForm] = useState({
    title: "",
    deadline: "",
    priority: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.title) {
      toast.error("Title wajib diisi!");
      return;
    }
    if (!form.deadline) {
      toast.error("Deadline wajib diisi!");
      return;
    }
    if (!form.priority) {
      toast.error("Priority wajib diisi!");
      return;
    }
    if (!form.description) {
      toast.error("Description wajib diisi!");
      return;
    }

    const stored =
      sessionStorage.getItem("currentUser") ||
      localStorage.getItem("rememberedUser");
    const user = JSON.parse(stored);

    const userTasksKey = `tasks_${user.name}`;
    const existing = JSON.parse(localStorage.getItem(userTasksKey) || "[]");

    const newTask = {
      ...form,
      id: existing.length > 0 ? existing[existing.length - 1].id + 1 : 1,
      status: "Not Started",
      createdAt: new Date().toLocaleDateString("id-ID"),
    };

    const updatedTasks = [...existing, newTask];
    localStorage.setItem(userTasksKey, JSON.stringify(updatedTasks));

    toast.success("Task berhasil ditambahkan!", {
      onClose: () => onClose(),
      autoClose: 1500,
    });
  };

  return (
    <div className="add-task fixed inset-0 bg-black/90 flex items-center justify-center z-50 w-full h-screen">
      <div className="add-task-card flex flex-col gap-10 rounded-2xl p-15 bg-white w-[50%]">
        <div className="add-task-header flex justify-between items-center">
          <h2 className="text-base font-semibold border-b-2 border-[#F24E1E]">
            Add New Task
          </h2>
          <button onClick={onClose} className="text-sm underline">
            Go Back
          </button>
        </div>

        <div className="add-task-input border border-gray-200 p-4 w-full flex flex-col gap-5">
          <div className="input-title w-[60%] flex flex-col gap-2">
            <label className="font-semibold text-sm">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="border-2 border-gray-300 rounded-md h-9 p-3 text-xs"
            />
          </div>
          <div className="input-deadline w-[60%] flex relative flex-col gap-2">
            <label className="font-semibold text-sm">Deadline</label>
            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
              className="border-2 border-gray-300 rounded-md h-9 p-3 text-xs"
            />
          </div>
          <div className="task-priority flex flex-col gap-2 w-[50%]">
            <p className="font-semibold text-sm">Priority</p>
            <div className="prio-checkbox flex justify-between items-center">
              {[
                { id: "extreme", label: "Extreme", color: "text-red-500" },
                { id: "moderate", label: "Moderate", color: "text-blue-500" },
                { id: "low", label: "Low", color: "text-green-500" },
              ].map(({ id, label, color }) => (
                <div key={id} className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <GoDotFill className={color} />
                    <label htmlFor={id} className="text-gray-400 text-sm">
                      {label}
                    </label>
                  </div>
                  <input
                    type="radio"
                    name="priority"
                    id={id}
                    value={id}
                    checked={form.priority === id}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="input-description w-[60%] flex flex-col gap-2">
            <label className="font-semibold text-sm">Task Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="border-2 border-gray-300 rounded-md h-52 p-3 text-xs"
              placeholder="Start writing here....."
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="h-9 w-22 flex items-center justify-center bg-[#F24E1E] rounded-md text-white text-sm font-medium"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default AddTask;
