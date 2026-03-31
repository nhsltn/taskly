/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Todo from "../components/Todo";
import { MdWavingHand } from "react-icons/md";
import { BsClipboard2Check } from "react-icons/bs";
import TaskStatus from "../components/TaskStatus";

const DashboardContent = ({ profile }) => {
  return (
    <div className="content-dashboard flex flex-col gap-5 items-start w-full h-full">
      <div className="greetings flex flex-row gap-3  items-center">
        <h1 className="font-medium text-4xl">Welcome back, {profile.name} </h1>
        <MdWavingHand className="size-9 text-[#FFDD67]" />
      </div>
      <div className="content-wrapper border border-gray-400 p-5 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.07)] w-full h-full">
        <div className="flex gap-2 w-full h-full">
          <Todo />
          <div className="second-row-content flex-1 ml-3">
            <TaskStatus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
