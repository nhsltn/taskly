import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDashboard, MdLogout } from "react-icons/md";
import { FaExclamation, FaTasks } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { IoMdHelpCircle } from "react-icons/io";
import SidebarButtons from "./SidebarButtons";
import { BiTask } from "react-icons/bi";
import Profpic from "/assets/images/profile-photo.jpg";

export const Sidebar = () => {
  const navigate = useNavigate();

  const stored =
    sessionStorage.getItem("currentUser") ||
    localStorage.getItem("rememberedUser");
  const profile = JSON.parse(stored);

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <MdDashboard className="w-full h-full" />,
    },
    {
      id: "vital",
      label: "Vital Task",
      icon: <FaExclamation className="w-full h-full" />,
    },
    {
      id: "mytask",
      label: "My Task",
      icon: <BiTask className="w-full h-full" />,
    },
    {
      id: "taskcategories",
      label: "Task Categories",
      icon: <FaTasks className="w-full h-full" />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <IoSettingsSharp className="w-full h-full" />,
    },
    {
      id: "help",
      label: "Help",
      icon: <IoMdHelpCircle className="w-full h-full" />,
    },
  ];

  const [activeId, setActiveId] = useState("dashboard");

  const handleLogout = () => {
    sessionStorage.removeItem("currentUser");
    navigate("/signin");
  };
  return (
    <div className="sidebar shadow-[10px_4px_12px_rgba(0,0,0,0.1)] bg-[#FF6767] rounded-r-3xl flex flex-col absolute bottom-0 left-0 gap-5 h-[86%] w-82.5 text-white py-8 pr-5 pl-3 ">
      <img
        src={Profpic}
        alt="Profile"
        className="size-21.5 rounded-full object-cover object-top -top-11 left-1/2 -translate-x-1/2 absolute border border-white"
      />
      <div className="profile flex items-center flex-col mt-4">
        <p>{profile.name}</p>
        <p>{profile.position}</p>
      </div>
      <div className="sidebar-buttons flex flex-col justify-between h-full">
        <div className="main-feature flex flex-col gap-5">
          {navItems.map(({ id, label, icon }) => (
            <SidebarButtons
              key={id}
              label={label}
              icon={icon}
              isActive={activeId === id}
              onClick={() => setActiveId(id)}
            />
          ))}
        </div>
        <SidebarButtons
          id="logout"
          label="Logout"
          onClick={handleLogout}
          icon={<MdLogout className="w-full h-full" />}
        />
      </div>
    </div>
  );
};
