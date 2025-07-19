import useAuth from "../../../Hooks/useAuth";
import { slideRight, slideUp } from "../../../Utility/animation";
import StatCard from "./StatCard";
import { Users, Calendar, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

const DashboardHome = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 w-full">
      <div className="space-y-4 text-center">
        <motion.p {...slideRight(0.5)} className="text-6xl font-bold lexend">
          Hello {user?.displayName}
        </motion.p>
        <motion.h1 {...slideRight(0.6)} className="text-4xl font-bold text-zinc-500 lexend">
          Welcome to your dashboard
        </motion.h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
        <motion.div {...slideUp(0.8)} className="hover:-translate-y-2 transition-all duration-300 ease-in-out cursor-pointer">
          <StatCard
            icon={<Users size={28} />}
            title="Total Participants"
            value="1,234"
            change="+12%"
          />
        </motion.div>

        <motion.div {...slideUp(0.9)} className="hover:-translate-y-2 transition-all duration-300 ease-in-out cursor-pointer">
          <StatCard
            icon={<Calendar size={28} />}
            title="Your Camps"
            value="24"
            change="+3%"
          />
        </motion.div>

        <motion.div {...slideUp(1)} className="hover:-translate-y-2 transition-all duration-300 ease-in-out cursor-pointer">
          <StatCard
            icon={<DollarSign size={28} className="text-green-500"/>}
            title="Total Earnings"
            value="$5,678"
            change="+8%"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardHome;
