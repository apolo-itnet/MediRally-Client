import { motion } from "framer-motion";
import useAuth from "../../../Hooks/useAuth";
import { slideDown, slideUp } from "../../../Utility/animation";
import { ArrowRight, ChevronRight, HomeIcon } from "lucide-react";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <motion.div
      {...slideDown(0)}
      className="fixed top-0 left-64 right-0 h-fit py-3 bg-zinc-50 border-b border-sky-600/20 flex items-center justify-between px-6 z-20"
    >
      {/* Breadcrumb (left) */}
      <div >
        <ol className="flex items-center whitespace-nowrap py-2">
          <li className="inline-flex items-center">
            <a
              className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-hidden focus:text-blue-600"
              href="#"
            >
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
          <h1 className="text-3xl font-semibold lexend tracking-wide ">Register</h1>
      </div>

      {/* Right: Search + Avatar */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered w-40 md:w-64 h-9 text-sm"
        />
        <div className="avatar">
          <div className="w-9 rounded-full ring ring-pink-700 ring-offset-base-100 ring-offset-2">
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
