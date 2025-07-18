import { motion } from "framer-motion";
import useAuth from "../../../Hooks/useAuth";
import { slideDown, slideUp } from "../../../Utility/animation";
import { ArrowRight, ChevronRight, HomeIcon } from "lucide-react";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <motion.div
      {...slideDown(0)}
      className="fixed top-0 left-70 right-0 h-fit py-5 flex items-center justify-between px-6 z-20 bg-zinc-100 border-b border-gray-200"
    >
      {/* Breadcrumb (left) */}
      <div>
        <ol className="flex items-center whitespace-nowrap">
          <li className="inline-flex items-center">
            <a className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-hidden focus:text-blue-600">
              <HomeIcon size={16} className="mr-2" /> Pages
            </a>
            <ChevronRight size={16} className="mx-2" />
          </li>

          <li
            className="inline-flex items-center text-sm font-semibold text-gray-800 truncate"
            aria-current="page"
          >
            Register
          </li>
        </ol>
        <h1 className="text-3xl font-semibold lexend tracking-wide ">
          Register
        </h1>
      </div>

      {/* Right: Search + Avatar */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered w-40 md:w-64 py-2 text-sm focus:outline-none focus:border-rose-500 focus:ring-rose-500 transition-all duration-300  rounded-full"
        />
        <div className="avatar">
          <div className="w-9 rounded-full ring ring-sky-400 ring-offset-base-100 ring-offset-2">
            <img
              src={user?.photoURL || "https://i.postimg.cc/C5kPH183/user-2.png"}
              alt="User"
              className="w-full h-full rounded-full"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
