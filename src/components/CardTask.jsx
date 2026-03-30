import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";

const CardTask = () => {
  const [done, setDone] = useState(false);

  return (
    <div className="border border-gray-400 flex flex-col gap-3 p-5 w-[80%] rounded-2xl">
      <div className="task-header flex gap-2 items-center">
        <button
          onClick={() => setDone(!done)}
          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200
            ${done ? "bg-red-400 border-red-400" : "border-red-400 bg-white"}`}
        >
          {done && <FaCheck className="text-white text-[8px]" />}
        </button>
        <h3
          className={`task-title text-base font-semibold transition-all duration-200 ${done ? "line-through text-gray-400" : ""}`}
        >
          Attend Nischal's Birthday Party
        </h3>
      </div>
      <p className="task-desc text-sm text-gray-400 line-clamp-3">
        Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh
        Elements).....
      </p>
      <div className="card-footer flex justify-between">
        <div className="priority flex text-[10px] font-regular">
          <p>Priority: </p>
          <p className="text-blue-300">Moderate</p>
        </div>
        <div className="status flex text-[10px] font-regular">
          <p>Status: </p>
          <p className="text-red-500">Not Started</p>
        </div>
        <div className="created flex text-[10px] font-regular">
          <p>Created on: 20/06/2023</p>
        </div>
      </div>
    </div>
  );
};

export default CardTask;
