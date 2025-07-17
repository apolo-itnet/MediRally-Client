import { Outlet, NavLink } from "react-router";
import useAuth from "../Hooks/useAuth";
import Navbar from "../Pages/Dashboard/DashUI/Navbar";

const DashboardLayout = () => {
  const { userRole } = useAuth();

  return (
    <div className="flex min-h-screen">


      <aside className="w-64 p-4 z-30 md:flex flex-col hidden">
        <h2 className="text-xl font-bold mb-4">Dashboard Hello</h2>

        {userRole === "Organizer" && (
          <>
            <div className="flex flex-col  space-y-2">
              <NavLink to="/dashboard/organizer/add-camp">Add Camp</NavLink>
              <NavLink to="/dashboard/organizer/manage-camps">
                Manage Camps
              </NavLink>
              <NavLink to="/dashboard/organizer/registered-camps">
                Manage Registered Camps
              </NavLink>
            </div>
          </>
        )}

        {userRole === "Participant" && (
          <>
            <NavLink to="/dashboard/participant/analytics">Analytics</NavLink>
            <NavLink to="/dashboard/participant/registered-camps">
              Registered Camps
            </NavLink>
            <NavLink to="/dashboard/participant/payment-history">
              Payment History
            </NavLink>
          </>
        )}
      </aside>

      <header>
        <Navbar/>
      </header>

      <main className="flex-1 p-6 bg-zinc-50">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
