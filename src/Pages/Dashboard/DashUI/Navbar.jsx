import { motion } from "framer-motion";
import { useLocation } from "react-router";
import { slideDown, slideLeft } from "../../../Utility/animation";
import { ChevronRight, HomeIcon, Menu, User } from "lucide-react";
import useAuth from "../../../Hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

export default function Navbar({ setSidebarOpen }) {
  const location = useLocation();
  const { user, userRole } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const routePath = location.pathname
    .split("/")
    .filter(Boolean)
    .slice(-1)[0]
    .replaceAll("-", " ");
  const routeName = routePath
    ? routePath.charAt(0).toUpperCase() + routePath.slice(1)
    : "Dashboard";

  const { data: userInfo = {}, refetch } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  return (
    <motion.div
      {...slideDown(0)}
      className="fixed top-0 left-0 right-0 lg:left-[280px] h-24 flex items-center justify-between p-4 z-20 bg-zinc-100 border-b border-gray-200"
    >
      <div>
        {/* Breadcrumb */}
        <div className="hidden sm:block">
          <ol className="flex items-center whitespace-nowrap">
            <li className="inline-flex items-center">
              <a className="flex items-center text-sm text-gray-500 hover:text-blue-600">
                <HomeIcon size={16} className="mr-2" /> Pages
              </a>
              <ChevronRight size={16} className="mx-2" />
            </li>
            <li className="inline-flex items-center text-sm font-semibold text-gray-800 truncate capitalize">
              {routeName}
            </li>
          </ol>
          <h1 className="active-route text-2xl md:text-3xl font-semibold lexend capitalize">
            {routeName}
          </h1>
        </div>

        {/* === Mobile Menu Button === */}
        <div className="lg:hidden flex items-center gap-2 mr-2">
          <button
            onClick={() => setSidebarOpen(true)}
            className="btn p-3 border border-gray-200 rounded-lg lg:hidden"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* === Right Avatar === */}
      <div className="flex items-center gap-3 md:gap-5 ml-auto">
        <input
          type="text"
          placeholder="Search..."
          className="hidden sm:block input input-bordered w-32 md:w-64 py-2 text-sm focus:outline-none focus:border-rose-500 focus:ring-rose-500 transition-all duration-300 rounded-full"
        />

        {/* Avatar dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            className="avatar cursor-pointer"
          >
            <div className="w-9 rounded-full ring ring-sky-400 ring-offset-base-100 ring-offset-2">
              <img
                src={
                  userInfo?.photo || "https://i.postimg.cc/C5kPH183/user-2.png"
                }
                alt="User"
                className="w-full h-full rounded-full"
              />
            </div>
          </div>

          {showDropdown && (
            <motion.div
              {...slideLeft(0)}
              className="absolute right-0 mt-2 w-48 bg-white border-transparent rounded-md shadow-md z-30 p-3"
            >
              <div className="flex items-center gap-2 mb-2">
                <User size={16} />
                <p className="text-sm font-semibold truncate">
                  {user?.displayName || "User"}
                </p>
              </div>
              <p className="text-sm text-zinc-500 capitalize font-semibold">
                {userRole || "Unknown"}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
