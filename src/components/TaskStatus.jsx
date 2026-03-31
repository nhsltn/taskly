/* eslint-disable no-unused-vars */

import React from "react";
import { FaRegClipboard, FaCheck } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { PieChart, Pie, Sector } from "recharts";

const DonutChart = ({ value, color }) => {
  const data = [
    { value, fill: color },
    { value: 100 - value, fill: "#e5e7eb" },
  ];
  return (
    <PieChart width={100} height={100}>
      <Pie
        data={data}
        cx={45}
        cy={45}
        innerRadius={30}
        outerRadius={45}
        startAngle={90}
        endAngle={-270}
        dataKey="value"
        shape={(props) => {
          const {
            cx,
            cy,
            innerRadius,
            outerRadius,
            startAngle,
            endAngle,
            fill,
          } = props;
          return (
            <Sector
              cx={cx}
              cy={cy}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              startAngle={startAngle}
              endAngle={endAngle}
              fill={fill}
            />
          );
        }}
      />
    </PieChart>
  );
};
const TaskStatus = ({ profile, taskUpdated }) => {
  const tasks = JSON.parse(
    localStorage.getItem(`tasks_${profile.name}`) || "[]",
  );

  const total = tasks.length;
  const toPercent = (val) =>
    total === 0 ? 0 : Math.round((val / total) * 100);

  const statuses = [
    {
      label: "Completed",
      value: toPercent(tasks.filter((t) => t.status === "Completed").length),
      color: "#16a34a",
    },
    {
      label: "In Progress",
      value: toPercent(tasks.filter((t) => t.status === "In Progress").length),
      color: "#2563eb",
    },
    {
      label: "Not Started",
      value: toPercent(tasks.filter((t) => t.status === "Not Started").length),
      color: "#dc2626",
    },
  ];

  return (
    <div className="second-dashboard-content task-status rounded-b-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] bg-white p-5 flex flex-col py-5 px-10 gap-5">
      <div className="task-status-header flex items-center gap-2">
        <div className="content-title relative w-fit">
          <FaRegClipboard className="text-gray-400 text-3xl" />
          <FaCheck className=" text-gray-400 text-lg absolute -bottom-1 -right-1 border border-white bg-white rounded-full" />
        </div>
        <h1 className="font-medium text-base text-[#FF6767]">Task Status</h1>
      </div>

      <div className="charts flex justify-around items-center">
        {statuses.map(({ label, value, color }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <div className="relative">
              <DonutChart value={value} color={color} />
              <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-semibold">
                {value}%
              </p>
            </div>
            <div className="flex items-center gap-1">
              <GoDotFill style={{ color }} />
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskStatus;
