import React from "react";

const SidebarButtons = ({ label, icon, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex w-full items-center text-md font-medium rounded-2xl py-2 px-3 gap-3
        transition-all duration-200
        ${
          isActive
            ? "bg-white text-[#FF6767] hover:brightness-95"
            : "bg-transparent text-white hover:bg-white/20"
        }
      `}
    >
      <div className="flex size-8">{icon}</div>
      <p>{label}</p>
    </button>
  );
};

export default SidebarButtons;
