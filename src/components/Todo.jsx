import React, { useState } from "react";
import { getLongDate } from "../utils/dateHelper";
import AddTask from "../components/AddTask";
import { FaRegClipboard, FaRegClock, FaPlus } from "react-icons/fa";
import CardTask from "../components/CardTask";

const Todo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="first-row-content flex-1 rounded-b-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] bg-white py-5 px-10 gap-5 flex flex-col">
      <div className="card-header flex flex-col gap-4 first-dashboard-content">
        <div className="content-header flex justify-between items-center">
          <div className="todo flex flex-row gap-2 items-center">
            <div className="content-title relative w-fit">
              <FaRegClipboard className="text-gray-400 text-3xl" />
              <FaRegClock className=" text-gray-400 text-lg absolute -bottom-1 -right-1 border border-white bg-white rounded-full" />
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
          {isOpen && <AddTask onClose={() => setIsOpen(false)} />}
        </div>
        <div className="todo-date flex items-center gap-2">
          <p className="text-xs font-regular font-medium">{getLongDate()}</p>
          <p className="text-gray-400 text-sm">• Today</p>
        </div>
      </div>
      <div className="cards-task flex flex-col gap-3 items-center">
        <CardTask />
        <CardTask />
      </div>
    </div>
  );
};

export default Todo;
