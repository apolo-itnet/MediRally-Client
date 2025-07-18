import { Outlet } from "react-router";
import Navbar from "../Pages/Dashboard/DashUI/Navbar";
import Sidebar from "../Pages/Dashboard/DashUI/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-zinc-100">
      <aside className="md:flex flex-col hidden fixed left-0 top-0 z-50">
        <Sidebar />
      </aside>
      <div className="flex-1">
        <header>
          <Navbar />
        </header>
        <main className="flex  ml-72 mt-24 p-6 mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

