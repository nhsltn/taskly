import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDashboard, MdLogout } from "react-icons/md";
import { FaExclamation, FaTasks, FaBars, FaTimes } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { IoMdHelpCircle } from "react-icons/io";
import SidebarButtons from "./SidebarButtons";
import { BiTask } from "react-icons/bi";
import Profpic from "/assets/images/profile-photo.jpg";

export const Sidebar = ({ activeId, onNavigate, profile }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

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

  const handleLogout = () => {
    sessionStorage.removeItem("currentUser");
    localStorage.removeItem("rememberedUser");
    navigate("/signin");
  };

  const handleNavigate = (id) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Overlay — mobile only */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Hamburger button — mobile only, keliatan kalo sidebar tertutup */}
      {!isOpen && (
        <button
          className="sm:hidden fixed left-0 top-1/2 -translate-y-1/2 z-50 bg-[#FF6767] text-white p-2 rounded-r-xl shadow-md"
          onClick={() => setIsOpen(true)}
        >
          <FaBars />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`
    sidebar shadow-[10px_4px_12px_rgba(0,0,0,0.1)] bg-[#FF6767] rounded-r-3xl
    flex flex-col h-full text-white py-8 pr-5 pl-3
    w-72 sm:w-82.5
    transition-transform duration-300 z-50
    fixed sm:static top-0 left-0
    ${isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
  `}
      >
        {/* Close button — mobile only */}
        <button
          className="sm:hidden absolute top-4 right-4 text-white text-xl"
          onClick={() => setIsOpen(false)}
        >
          <FaTimes />
        </button>

        <img
          src={Profpic}
          alt="Profile"
          className="size-21.5 rounded-full object-cover object-top top-3 lg:-top-11 left-1/2 -translate-x-1/2 relative lg:absolute border border-white"
        />
        <div className="profile flex items-center flex-col my-5">
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
                onClick={() => handleNavigate(id)}
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
    </>
  );
};
