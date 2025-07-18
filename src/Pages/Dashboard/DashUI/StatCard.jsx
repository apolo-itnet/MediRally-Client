import { motion } from "framer-motion";
import { fadeUp } from "../../../Utility/animation";

const StatCard = ({ icon, title, value, change }) => (
  <motion.div 
    {...fadeUp(0.2)}
    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
      </div>
      <div className="p-3 rounded-lg bg-primary-50 text-primary-500">
        {icon}
      </div>
    </div>
    {change && (
      <p className={`text-sm mt-2 ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
        {change} from last week
      </p>
    )}
  </motion.div>
);

export default StatCard;