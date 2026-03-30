import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";

function Dashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="dashboard-page h-screen flex flex-col">
      <Navbar />
      <div className="dashboard-container gap-20 flex flex-1 relative h-[93%]">
        <Sidebar activeId={activePage} onNavigate={setActivePage} />
        <div className=" content flex-1 overflow-y-auto pb-8 ">
          {activePage === "dashboard" && <div>Dashboard Content</div>}
          {activePage === "vital" && <div>Vital Task</div>}
          {activePage === "mytask" && <div>My Task</div>}
          {activePage === "taskcategories" && <div>Task Categories</div>}
          {activePage === "settings" && <div>Settings</div>}
          {activePage === "help" && <div>Help</div>}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
