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
import { ArrowRight, Contact, Users } from "lucide-react";
import Loader from "./Loader/Loader";
import { AuthContext } from "../Contexts/AuthContexts";
import SecondaryBtn from "./Button/SecondaryBtn";
import PrimaryBtn from "./Button/PrimaryBtn";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignout = async () => {
    setIsDropdownOpen(false);
    setIsLoading(true);

    try {
      await logOut();
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
    { label: "Browse Posts", href: "/all-posts", icon: <FaSearch /> },
    { label: "About Us", href: "/about", icon: <HiOutlineUsers /> },
    { label: "Contact", href: "/contact", icon: <RiContactsBook3Line /> },
  ];

  const privateLinks = [
    { label: "Add Post", href: "/add-post", icon: <FaPlus /> },
    { label: "My Post", href: "/my-posted-list", icon: <FaList /> },
    { label: "Feedback", href: "/feedback", icon: <FaCheckCircle /> },
  ];

  return (
    <div>
      {isLoading && <Loader />}
      <Toaster reverseOrder={false} />
      <div className="flex justify-between items-center py-2 border-b border-gray-100 res-pad nunito">
        <motion.div
          variants={slideDown(0.2)}
          initial="initial"
          animate="animate"
          className="navbar flex justify-between items-center w-full"
        >
          {/* Mobile Menu */}
          <div className="md:navbar-start lg:flex-1 ">
            <div className="dropdown">
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
              {/* Logo */}

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-base-100 rounded-box size-82 flex flex-col items-start justify-between "
              >
                <Link to="/">
                  {/* <img
                    src={"https://i.postimg.cc/0jyV0sJ7/Lost-Trace-Logo.png"}
                    alt="Lost Trace Logo"
                    className="w-22 flex justify-center items-center lg:hidden pb-4  "
                  /> */}
                  <h1 className="text-2xl font-bold zain">Medi Rally</h1>
                </Link>

                <ul className="text-sm font-medium flex flex-col items-start gap-3">
                  {navLinks.map((link, index) => (
                    <li key={index}>
                      <NavLink
                        to={link.href}
                        className={({ isActive }) =>
                          `flex items-center gap-2 px-2 py-2 rounded-md transition-all ease-in-out duration-300 
                      ${
                        isActive
                          ? "bg-teal-700 text-base-100"
                          : "hover:bg-teal-800 hover:text-base-100"
                      } `
                        }
                      >
                        {link.icon} {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>

                {user ? (
                  <div className="w-full bg-teal-700 text-base-100 p-2 rounded-md flex hover:bg-teal-800 transition-colors ease-in-out duration-300">
                    <button
                      onClick={handleSignout}
                      className="flex items-center gap-2"
                    >
                      <FaSignOutAlt /> Signout
                    </button>
                  </div>
                ) : (
                  <div className="md:hidden gap-4 flex">
                    <Link to="/signin">
                      <SecondaryBtn label={"Sign In"}></SecondaryBtn>
                    </Link>
                    <Link to="/signup">
                      <PrimaryBtn label={"Sign Up"}></PrimaryBtn>
                    </Link>
                  </div>
                )}
              </ul>
            </div>
            {/* Logo */}
            <Link to="/">
              {/* <img
                src={"https://i.postimg.cc/0jyV0sJ7/Lost-Trace-Logo.png"}
                alt="Lost Trace Logo"
                className="w-22 lg:flex hidden "
              /> */}
              <h1 className="text-2xl font-bold zain">Medi Rally</h1>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-center hidden lg:flex justify-center items-center">
            <ul className="text-sm font-medium flex items-center gap-2">
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
                  data-tip={user.displayName || "User"}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="w-10 rounded-full">
                    {user.photoURL ? (
                      <img
                        src={
                          user?.photoURL ||
                          "https://i.postimg.cc/C5kPH183/user-2.png"
                        }
                        alt="User"
                      />
                    ) : (
                      <FaUserCircle className="w-10 h-10" />
                    )}
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box size-60 flex flex-col items-start justify-center gap-2"
                >
                  {privateLinks.map((link, index) => (
                    <li key={index} className="">
                      <NavLink
                        to={link.href}
                        className={({ isActive }) =>
                          `flex items-center px-3 py-3 rounded-md transition-all ease-in-out duration-300 
                      ${
                        isActive
                          ? "bg-teal-700 text-base-100"
                          : "hover:bg-teal-800 hover:text-base-100"
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
                      className="w-full flex items-center gap-2 border border-teal-700 px-3 py-3 rounded-md"
                    >
                      <FaSignOutAlt /> Signout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="md:flex gap-4 hidden">
                <Link to="/signin">
                  <PrimaryBtn
                    label="Sign In"
                    altLabel="Now!"
                    icon={<ArrowRight className="w-4 h-4 text-white" />}
                    iconBg="bg-fuchsia-800"
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
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Navbar;
