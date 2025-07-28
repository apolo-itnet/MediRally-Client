import { use, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import {
  FaHome,
  FaSearch,
  FaUserCircle,
  FaSignOutAlt,
  FaUserFriends,
  FaAddressBook,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { slideDown, slideRight } from "../Utility/animation";
import { toastError, toastSuccess } from "../Utility/toastmsg";
import { Toaster } from "react-hot-toast";
import { LayoutDashboard, LogOut, Users } from "lucide-react";
import Loader from "./Loader/Loader";
import { AuthContext } from "../Contexts/AuthContexts";
import SecondaryBtn from "./Button/SecondaryBtn";
import PrimaryBtn from "./Button/PrimaryBtn";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const { user, SignOut } = use(AuthContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const { data: userInfo = {}, refetch } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const handleSignout = async () => {
    setIsDropdownOpen(false);
    setIsLoading(true);

    try {
      await SignOut();
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      toastSuccess("Successfully signed out!");
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      console.error("Sign-out error:", error);
      toastError(`Sign-out failed: ${error.message}`, {
        style: { color: "red" },
      });
    }
  };

  const navLinks = [
    { label: "Home", href: "/", icon: <FaHome /> },
    { label: "Available Camps", href: "/all-camps", icon: <FaSearch /> },
    { label: "About Us", href: "/about", icon: <FaUserFriends /> },
    { label: "Contact", href: "/contact", icon: <FaAddressBook /> },
  ];

  const privateLinks = [
    { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard /> },
  ];

  return (
    <div>
      {isLoading && <Loader />}
      <Toaster reverseOrder={false} />
      <div className="flex justify-between items-center py-2 bg-zinc-100 border-b border-gray-100 nunito">
        <motion.div
          variants={slideDown(0.2)}
          initial="initial"
          animate="animate"
          className="navbar flex justify-between items-center w-full res-pad"
        >
          {/* Left (Mobile Menu + Logo) */}
          <div className="flex items-center justify-between w-full lg:hidden">
            {/* Mobile Dropdown Menu */}
            <div className="dropdown relative">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>

              <ul
                tabIndex={0}
                className="dropdown-content mt-3 z-[1] p-4 shadow bg-base-100 rounded-box w-72 flex flex-col items-start"
              >
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 py-2">
                  <img
                    src="https://i.postimg.cc/QMJ1T5CC/stethoscope-logo-1.png"
                    alt="logo"
                    className="w-8 h-8"
                  />
                </Link>

                {/* Nav Links */}
                <ul className="text-xs font-medium flex flex-col items-start gap-2 py-4 border-t border-zinc-200 w-full">
                  {navLinks.map((link, index) => (
                    <li key={index}>
                      <NavLink
                        to={link.href}
                        className="flex justify-start items-center gap-2 px-2 py-2 group"
                      >
                        {({ isActive }) => (
                          <>
                            <span
                              className={`text-lg ${
                                isActive
                                  ? "text-rose-500"
                                  : "text-zinc-400 group-hover:text-rose-500"
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

                {/* Mobile Auth Buttons */}
                {user ? (
                  <SecondaryBtn
                    label="Sign Out"
                    icon={LogOut}
                    onClick={handleSignout}
                    className="mt-4 hidden"
                  />
                ) : (
                  <div className="flex  gap-2 mt-4 w-full">
                    <Link to="/signin">
                      <SecondaryBtn label="Sign In" />
                    </Link>
                    <Link to="/signup">
                      <PrimaryBtn label="Sign Up" altLabel="Now!" />
                    </Link>
                  </div>
                )}
              </ul>
            </div>

            {/* Mobile Logo */}
            {!user && (
              <Link to="/" className="flex lg:hidden items-center gap-2">
                <img
                  src="https://i.postimg.cc/QMJ1T5CC/stethoscope-logo-1.png"
                  alt="logo"
                  className="w-8 h-8"
                />
                <h1 className="text-xl font-bold zain text-pink-700">
                  Medi <span className="text-green-500">Rally</span>
                </h1>
              </Link>
            )}
          </div>

          {/* Desktop Center Menu */}
          <div className="hidden lg:flex flex-1 items-center justify-between mr-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
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
            </Link>

            {/* Nav Links */}
            <ul className="text-sm font-semibold flex items-center gap-3">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.href}
                    className="flex justify-between items-center gap-2 px-2 group"
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={`text-lg ${
                            isActive
                              ? "text-rose-500"
                              : "text-zinc-400 group-hover:text-rose-500"
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

            {/* hidden */}
            <div>
              <h1></h1>
            </div>
          </div>

          {/* Right Avatar / Auth Buttons */}
          <div className="flex items-center gap-4 lg:gap-6 lg:mt-0 lg:ml-auto">
            {user ? (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="w-16 rounded-full">
                    {user.photoURL ? (
                      <img
                        src={
                          userInfo?.photo ||
                          "https://i.postimg.cc/C5kPH183/user-2.png"
                        }
                        alt="User"
                        className="w-full h-full rounded-full"
                      />
                    ) : (
                      <FaUserCircle />
                    )}
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow rounded-box w-50 flex flex-col items-start justify-center gap-2 poppins bg-zinc-100"
                >
                  <span className="text-sm font-semibold">
                    {user.displayName || "User"}
                  </span>
                  {privateLinks.map((link, index) => (
                    <li key={index} className="w-full">
                      <NavLink
                        to={link.href}
                        className={({ isActive }) =>
                          `text-xs flex items-center gap-2 px-3 py-3 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-zinc-400 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] rounded-md transition-all ease-in-out duration-300 
                    ${
                      isActive
                        ? "active"
                        : "hover:after:origin-bottom-left hover:after:scale-x-100 after:origin-bottom-right after:scale-x-0"
                    }`
                        }
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {link.icon} <span>{link.label}</span>
                      </NavLink>
                    </li>
                  ))}
                  <SecondaryBtn
                    label="Sign Out"
                    icon={LogOut}
                    onClick={handleSignout}
                    className="mt-4"
                    iconClassName="group-hover:rotate-0"
                  />
                </ul>
              </div>
            ) : (
              <div className="hidden md:flex gap-4">
                <Link to="/signin">
                  <SecondaryBtn label="Sign In" />
                </Link>
                <Link to="/signup">
                  <PrimaryBtn label="Sign Up" altLabel="Now!" />
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Navbar;
