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
import { NavLink, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import { slideRight } from "../../../Utility/animation";
import SecondaryBtn from "../../../Shared/Button/SecondaryBtn";
import { useEffect, useState } from "react";
import Loader from "../../../Shared/Loader/Loader";
import { Toaster } from "react-hot-toast";

export default function Sidebar({ isOpen, onClose }) {
  const OrgNavLinks = [
    { label: "Analytics", href: "/dashboard", icon: <LayoutDashboard /> },
    {
      label: "Add Camp",
      href: "/dashboard/organizer/add-camp",
      icon: <ListPlus />,
    },
    {
      label: "Manage Camps",
      href: "/dashboard/organizer/manage-camps",
      icon: <ListChecks />,
    },
    {
      label: "Manage Registered Camps",
      href: "/dashboard/organizer/manage-registered-camps",
      icon: <BarChart2 />,
    },
    { label: "Profile", href: "/dashboard/organizer/profile", icon: <User /> },
  ];

  const PartNavLinks = [
    {
      label: "Analytics",
      href: "/dashboard/participant/analytics",
      icon: <LayoutDashboard />,
    },
    {
      label: "Registered Camps",
      href: "/dashboard/participant/registered-camps",
      icon: <BarChart2 />,
    },
    {
      label: "Payment History",
      href: "/dashboard/participant/payment-history",
      icon: <CreditCard />,
    },
    {
      label: "Feedback",
      href: "/dashboard/participant/feedback",
      icon: <ListChecks />,
    },
    {
      label: "Profile",
      href: "/dashboard/participant/profile",
      icon: <User />,
    },
  ];

  const { userRole } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="bg-white z-50">
      {isLoading && <Loader />}
      <Toaster reverseOrder={false} />

      {/* Overlay for small screens */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      <motion.div
        {...slideRight(0)}
        className={`lexend fixed top-0 left-0 h-screen w-[280px] bg-white z-50 shadow-lg transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:fixed lg:block`}
      >
        <div className="flex flex-col justify-between w-full h-full">
          {/* Logo */}
          <div className="py-5 flex items-center justify-center border-b border-gray-300">
            <div className="flex items-center gap-2 py-2">
              <img
                src="https://i.postimg.cc/QMJ1T5CC/stethoscope-logo-1.png"
                alt="logo"
                className="w-8 h-8"
              />
              <h1 className="zain opacity-80 flex gap-4">
                <span className="text-4xl font-black text-rose-500">
                  Medi Rally
                </span>
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
          </div>
        </div>
      </motion.div>
    </div>
  );
}
