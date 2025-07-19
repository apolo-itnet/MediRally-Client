import {} from "react";

const StatCard = ({ icon, title, value, change }) => (
  <div 
    className="bg-white py-8 px-4 rounded-xl shadow-sm border border-gray-100"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
      </div>
      <div className="p-4 rounded-full bg-zinc-50 text-green-500 ">
        {icon}
      </div>
    </div>
    {change && (
      <p className={`text-sm mt-2 ${change.startsWith('+') ? 'text-rose-500' : 'text-red-600'}`}>
        {change} from last week
      </p>
    )}
  </div>
);

export default StatCard;