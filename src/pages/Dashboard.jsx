import React from "react";
import Navbar from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";

function Dashboard() {
  return (
    <div className="h-screen relative">
      <Navbar />
      <Sidebar />
    </div>
  );
}

export default Dashboard;
