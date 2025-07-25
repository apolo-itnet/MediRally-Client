import { Outlet } from "react-router";
import Navbar from "../Pages/Dashboard/DashUI/Navbar";
import Sidebar from "../Pages/Dashboard/DashUI/Sidebar";
import { useState } from "react";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-zinc-100 relative">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 lg:ml-[280px] flex flex-col min-h-screen">
        <Navbar setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 w-full mt-28 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
