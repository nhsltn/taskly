import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import DashboardContent from "./DashboardContent";
import MyTask from "./MyTask";
import VitalTask from "./VitalTask";

function Dashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [dashboardKey, setDashboardKey] = useState(0);

  const stored =
    sessionStorage.getItem("currentUser") ||
    localStorage.getItem("rememberedUser");
  const profile = JSON.parse(stored);

  return (
    <div className="dashboard-page h-screen flex flex-col">
      <Navbar />
      <div className="dashboard-container gap-20 flex flex-1 relative h-[93%]">
        <Sidebar
          activeId={activePage}
          onNavigate={setActivePage}
          profile={profile}
        />
        <div className="content flex-1 overflow-y-auto pb-8 pr-20 h-full w-full">
          {activePage === "dashboard" && (
            <DashboardContent key={dashboardKey} profile={profile} />
          )}
          {activePage === "vital" && <VitalTask profile={profile} />}
          {activePage === "mytask" && (
            <MyTask
              profile={profile}
              onForceRefresh={() => {
                setDashboardKey((k) => k + 1);
                setActivePage("dashboard");
              }}
            />
          )}
          {activePage === "taskcategories" && <div>Task Categories</div>}
          {activePage === "settings" && <div>Settings</div>}
          {activePage === "help" && <div>Help</div>}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
