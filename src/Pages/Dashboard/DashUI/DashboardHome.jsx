import { slideUp } from "../../../Utility/animation";
import StatCard from "./StatCard";
import { Users, Calendar, DollarSign } from "lucide-react";

const DashboardHome = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          {...slideUp(0.1)}
          icon={<Users size={20} />}
          title="Total Participants"
          value="1,234"
          change="+12%"
        />
        <StatCard
          {...slideUp(0.2)}
          icon={<Calendar size={20} />}
          title="Your Camps"
          value="24"
          change="+3%"
        />
        <StatCard
          {...slideUp(0.3)}
          icon={<DollarSign size={20} />}
          title="Total Earnings"
          value="$5,678"
          change="+8%"
        />
      </div>
    </div>
  );
};

export default DashboardHome;
