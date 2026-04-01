import React from "react";
import PriorityTask from "../components/PriorityTask";
import DeadlineTask from "../components/DeadlineTask";

const VitalTask = ({ profile }) => {
  return (
    <div className="vital-task flex lg:flex-row flex-col w-full h-full gap-5">
      <PriorityTask profile={profile} />
      <DeadlineTask profile={profile} />
    </div>
  );
};

export default VitalTask;
