import React from "react";

const TaskDetails = () => {
  return (
    <div className="first-row-content flex-1 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] bg-white border-2 border-gray-200 py-5 px-10 gap-5 flex flex-col h-full">
      <div className="task-header flex flex-col gap-4">
        <h3 className="font-semibold text-lg">Submit Documents</h3>
        <p className="text-xs font-regular">
          Priority: <span className="text-red-500">High</span>
        </p>
        <p className="text-xs font-regular">
          Status: <span className="text-red-500">Not Started</span>
        </p>
      </div>
      <div className="task-second-content flex flex-col h-full justify-between">
        <div className="task-description flex flex-col gap-3 text-base text-gray-600">
          <h3 className="font-bold">Task Description</h3>
          <p className="font-regular">
            Review the list of documents required for submission and ensure all
            necessary documents are ready. Organize the documents accordingly
            and scan them if physical copies need to be submitted digitally.
            Rename the scanned files appropriately for easy identification and
            verify the accepted file formats. Upload the documents securely to
            the designated platform, double-check for accuracy, and obtain
            confirmation of successful submission. Follow up if necessary to
            ensure proper processing.
          </p>
          <p>
            <span className="font-bold">Deadline for this task:</span>{" "}
            <span>2023-12-31</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
