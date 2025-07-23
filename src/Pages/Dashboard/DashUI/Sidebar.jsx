import { motion } from "framer-motion";
import {
  Home,
  User,
  LayoutDashboard,
  ListChecks,
  BarChart2,
  CreditCard,
  ListPlus,
  HomeIcon,
  LogOut,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import { slideRight } from "../../../Utility/animation";
import SecondaryBtn from "../../../Shared/Button/SecondaryBtn";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Contexts/AuthContexts";
import Loader from "../../../Shared/Loader/Loader";
import { toastError, toastSuccess } from "../../../Utility/toastmsg";
import { Toaster } from "react-hot-toast";

export default function Sidebar() {
  const OrgNavLinks = [
    { label: "Main Dashboard", href: "", icon: <LayoutDashboard /> },
    {
      label: "Add Camp",
      href: "organizer/add-camp",
      icon: <ListPlus />,
    },
    {
      label: "Manage Camps",
      href: "organizer/manage-camps",
      icon: <ListChecks />,
    },
    {
      label: "Manage Registered Camps",
      href: "organizer/registered-camps",
      icon: <BarChart2 />,
    },
    { label: "Profile", href: "organizer/profile", icon: <User /> },
  ];

  const PartNavLinks = [
    { label: "Main Dashboard", href: "", icon: <LayoutDashboard /> },
    {
      label: "Registered Camps",
      href: "participant/registered-camps",
      icon: <BarChart2 />,
    },
    {
      label: "Payment",
      href: "participant/payment-history",
      icon: <CreditCard />,
    },
    {
      label: "Feedback",
      href: "participant/feedback",
      icon: <ListChecks />,
    },
    {
      label: "Profile",
      href: "participant/profile",
      icon: <User />,
    },
  ];

  const { userRole } = useAuth();
  const navigate = useNavigate();
  const { SignOut } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignout = async () => {
    setIsLoading(true);
    try {
      await SignOut();
      toastSuccess("Successfully signed out!");
      navigate("/signin", { replace: true });
    } catch (error) {
      console.error("Sign-out error:", error);
      toastError(`Sign-out failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white z-50">
      {isLoading && <Loader />}
      <Toaster reverseOrder={false} />
      <motion.div {...slideRight(0)} className="w-70 h-screen lexend">
        <div className="flex flex-col justify-between w-full h-full">
          {/* Logo */}
          <div className="py-5 flex items-center justify-center border-b border-gray-300">
            <div className="flex items-center gap-2 py-2">
              <img
                src="https://i.postimg.cc/QMJ1T5CC/stethoscope-logo-1.png"
                alt="logo"
                className="w-8 h-8"
              />
              <h1 className="text-4xl font-bold zain text-rose-500">
                Medi <span className="text-green-500">Rally</span>
              </h1>
            </div>
          </div>

          {/* Nav Links */}
          <motion.nav
            {...slideRight(0.2)}
            className="flex space-y-4 px-4 mb-10 w-full "
          >
            {userRole === "Organizer" && (
              <ul className="space-y-3">
                {OrgNavLinks.map((link, index) => (
                  <li key={index}>
                    <NavLink
                      to={link.href}
                      end
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 transition-all duration-200 ${
                          isActive
                            ? "hover:bg-rose-50 border-r-4 border-rose-500 text-zinc-800 font-semibold"
                            : "text-zinc-400 hover:bg-gray-100"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span
                            className={`text-sm ${
                              isActive ? "text-rose-500" : "text-zinc-400"
                            }`}
                          >
                            {link.icon}
                          </span>
                          <span className="text-sm font-medium">
                            {link.label}
                          </span>
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}

            {userRole === "Participant" && (
              <ul className="space-y-3">
                {PartNavLinks.map((link, index) => (
                   <li key={index}>
                    <NavLink
                      to={link.href}
                      end
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 transition-all duration-200 ${
                          isActive
                            ? "hover:bg-rose-50 border-r-4 border-rose-500 text-zinc-800 font-semibold"
                            : "text-zinc-400 hover:bg-gray-100"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span
                            className={`text-sm ${
                              isActive ? "text-rose-500" : "text-zinc-400"
                            }`}
                          >
                            {link.icon}
                          </span>
                          <span className="text-sm font-medium">
                            {link.label}
                          </span>
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </motion.nav>

          {/* Bottom Links */}
          <div className="px-4 pb-4 space-y-3 mb-20 flex flex-col justify-center">
            <SecondaryBtn
              onClick={() => navigate("/")}
              type="button"
              label="Go to Home"
              icon={HomeIcon}
              iconProps={{ size: 18 }}
              iconClassName="group-hover:rotate-0"
              className="text-xs"
            />

            {/* <SecondaryBtn
              onClick={handleSignout}
              type="button"
              label="Sign Out"
              icon={LogOut}
              iconProps={{ size: 18 }}
              iconClassName="group-hover:rotate-0"
              className="text-xs"
            /> */}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
