import { use, useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import {
  FaHome,
  FaSearch,
  FaUserCircle,
  FaSignOutAlt,
  FaPlus,
  FaList,
  FaCheckCircle,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi2";
import { RiContactsBook3Line } from "react-icons/ri";
import Button from "./Button/PrimaryBtn";
import { motion } from "framer-motion";
import { slideDown } from "../Utility/animation";
import { toastError, toastSuccess } from "../Utility/toastmsg";
import { Toaster } from "react-hot-toast";
import { ArrowRight, Contact, LayoutDashboard, Users } from "lucide-react";
import Loader from "./Loader/Loader";
import { AuthContext } from "../Contexts/AuthContexts";
import SecondaryBtn from "./Button/SecondaryBtn";
import PrimaryBtn from "./Button/PrimaryBtn";

const Navbar = () => {
  const { user, SignOut } = use(AuthContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignout = async () => {
    setIsDropdownOpen(false);
    setIsLoading(true);

    try {
      await SignOut();
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      toastSuccess("Successfully signed out!");
      // navigate("/");
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
    { label: "About Us", href: "/about", icon: <HiOutlineUsers /> },
    { label: "Contact", href: "/contact", icon: <RiContactsBook3Line /> },
  ];

  const privateLinks = [
    { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard /> },
  ];

  return (
    <div>
      {isLoading && <Loader />}
      <Toaster reverseOrder={false} />
      <div className="flex justify-between items-center py-2 bg-zinc-100 border-b border-gray-100 res-pad nunito">
        <motion.div
          variants={slideDown(0.2)}
          initial="initial"
          animate="animate"
          className="navbar flex justify-between items-center w-full"
        >
          {/* Mobile Menu */}
          <div className="md:navbar-start lg:flex-1 ">

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
                className="dropdown-content mt-3 z-[1] p-4 shadow bg-base-100 rounded-box w-70 h-fit flex flex-col items-start justify-between"
                >

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 py-2">
                  <img
                    src="https://i.postimg.cc/QMJ1T5CC/stethoscope-logo-1.png"
                    alt="logo"
                    className="w-8 h-8"
                  />
                  <h1 className="text-2xl font-bold zain text-pink-700">
                    Medi <span className="text-green-500">Rally</span>
                  </h1>
                </Link>

                {/* Nav Links */}
                <ul className="text-xs font-medium flex flex-col items-start gap-2 py-4 border-y border-zinc-400 w-full">
                  {navLinks.map((link, index) => (
                    <li key={index}>
                      <NavLink
                        to={link.href}
                        className={({ isActive }) =>
                          `flex items-center gap-2 px-3 py-3 relative  after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-zinc-400                     after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] rounded-md transition-all ease-in-out duration-300 
                      ${
                        isActive
                          ? "active"
                          : "hover:after:origin-bottom-left hover:after:scale-x-100 after:origin-bottom-right after:scale-x-0"
                      } `
                        }
                      >
                        {link.icon} {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                {user ? (
                  <div className="w-full  p-2 rounded-md flex  transition-colors ease-in-out duration-300">
                    <button
                      onClick={handleSignout}
                      className="btn flex items-center gap-2"
                    >
                      <FaSignOutAlt /> Signout
                    </button>
                  </div>
                ) : (
                  <div className="md:hidden gap-4 flex py-2">
                    <Link to="/signin">
                      <SecondaryBtn
                        label="Sign In"
                        className="font-bold "
                      />
                    </Link>
                    <Link to="/signup">
                      <PrimaryBtn
                        label="Sign Up"
                        altLabel="Now!"
                        icon={<ArrowRight className="w-4 h-4" />}
                        className="font-bold"
                      />
                    </Link>
                  </div>
                )}
              </ul>
            </div>

            <Link to="/" className="hidden md:flex">
              <img
                src="https://i.postimg.cc/QMJ1T5CC/stethoscope-logo-1.png"
                alt="logo"
                className="w-8 h-8"
              />
              <h1 className="text-3xl font-bold zain text-pink-700 px-2">
                Medi <span className="text-green-500">Rally</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-center hidden lg:flex justify-center items-center">
            <ul className="text-sm font-semibold flex items-center gap-3">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.href}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-3 relative  after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-zinc-400                     after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] rounded-md transition-all ease-in-out duration-300 
                      ${
                        isActive
                          ? "active"
                          : "hover:after:origin-bottom-left hover:after:scale-x-100 after:origin-bottom-right after:scale-x-0"
                      } `
                    }
                  >
                    {link.icon} {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Dropdown avatar menu*/}
          <div className="navbar-end flex-1 gap-6">
            {user ? (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom"
                  // data-tip={user.displayName || "User"}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="w-16 rounded-full ">
                    {user.photoURL ? (
                      <img
                        src={
                          user?.photoURL ||
                          "https://i.postimg.cc/C5kPH183/user-2.png"
                        }
                        alt="User"
                        className="w-full h-full rounded-full"
                      />
                    ) : (
                      <FaUserCircle/>
                    )}
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow rounded-box w-50 flex flex-col items-start justify-center gap-2 poppins bg-zinc-100"
                >
                  <span className="text-sm font-semibold">{user.displayName || "User"}</span>
                  {privateLinks.map((link, index) => (
                    <li key={index} className="w-full">
                      <NavLink
                        to={link.href}
                        className={({ isActive }) =>
                          `text-xs flex items-center gap-2 px-3 py-3 relative  after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-zinc-400   after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] rounded-md transition-all ease-in-out duration-300 
                      ${
                        isActive
                          ? "active"
                          : "hover:after:origin-bottom-left hover:after:scale-x-100 after:origin-bottom-right after:scale-x-0"
                      } `
                        }
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {link.icon} <span className="">{link.label}</span>
                      </NavLink>
                    </li>
                  ))}
                  <li className="w-full">
                    <button
                      onClick={handleSignout}
                      className="text-xs w-full flex items-center gap-2 border border-zinc-400 px-3 py-3 rounded-md"
                    >
                      <FaSignOutAlt /> Signout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="md:flex gap-4 hidden">
                <Link to="/signin">
                  <SecondaryBtn
                    label="Sign In"
                    className="font-bold"
                  />
                </Link>
                <Link to="/signup">
                  <PrimaryBtn
                    label="Sign Up"
                    altLabel="Now!"
                    icon={<ArrowRight className="w-4 h-4" />}
                    className="font-bold"
                  />
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
