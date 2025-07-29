// Analytics.jsx
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { BadgeDollarSign } from "lucide-react";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { slideUp } from "../../../Utility/animation";
import useAuth from "../../../Hooks/useAuth";

const Analytics = () => {
  const {user}= useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: registeredCamps = [], isLoading } = useQuery({
    queryKey: ["registeredCampsAnalytics"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/register-camp/${user.email}`);
      return res.data;
    },
  });

  const chartData = registeredCamps.map((camp) => ({
    name: camp.campName,
    fee: parseFloat(camp.campFees),
  }));

  return (
    <motion.section
      {...slideUp(0.1)}
      className="p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-rose-100 overflow-hidden"
    >
      <div className="flex items-center gap-3 mb-6">
        <BadgeDollarSign className="text-rose-500 w-6 h-6" />
        <h2 className="text-2xl font-bold text-rose-500">Camp Analytics</h2>
      </div>

      {isLoading ? (
        <p className="text-center text-rose-500">Loading analytics...</p>
      ) : registeredCamps.length === 0 ? (
        <p className="text-center text-gray-500">No registered camps found.</p>
      ) : (
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 50 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-15} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="fee" fill="#f43f5e" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.section>
  );
};

export default Analytics;
