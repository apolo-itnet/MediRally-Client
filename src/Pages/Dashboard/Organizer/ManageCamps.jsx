import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, EyeIcon, ListPlus, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SecondaryBtn from "../../../Shared/Button/SecondaryBtn";
import { slideUp } from "../../../Utility/animation";
import { motion } from "framer-motion";

const ManageCamps = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  // Fetch camps organized by the current user
  const { data: camps = [], refetch } = useQuery({
    queryKey: ["camps", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/organizer-camps/${user?.email}`);
      return res.data;
    },
  });

  // Handle delete camp
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/delete-camps/${id}`);
        queryClient.invalidateQueries(["camps", user?.email]);
        Swal.fire("Deleted!", "Camp has been deleted.", "success");
      } catch (err) {
        Swal.fire("Error!", "Failed to delete the camp.", "error");
        console.error(err);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 lexend text-xs">
      <h2 className="text-3xl font-bold text-center mb-8 text-rose-500">
        Manage Your Camps
      </h2>

      {camps.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg">You haven't created any camps yet.</p>
          <Link to="/add-camp">
            <SecondaryBtn label="Add Camp" icon={ListPlus} />
          </Link>
        </div>
      ) : (
        <motion.div {...slideUp(0.1)}className="overflow-x-auto bg-white rounded-lg shadow">
          <table  className="table w-full">
            {/* Table Head */}
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">Sl</th>
                <th className="py-3 px-4 text-left">Camp Name</th>
                <th className="py-3 px-4 text-left">Date & Time</th>
                <th className="py-3 px-4 text-left">Location</th>
                <th className="py-3 px-4 text-left">Healthcare Professional</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200 relative">
              {camps.map((camp) => (
                <tr key={camp._id} className="hover:bg-gray-50 overflow-auto">
                  <td className="py-4 px-4">{camps.indexOf(camp) + 1}</td>
                  <td className="py-4 px-4 ">{camp.campName}</td>
                  <td className="py-4 px-4">
                    <div>
                      <p>{new Date(camp.eventDateTime).toLocaleDateString()}</p>
                      <p>{new Date(camp.eventDateTime).toLocaleTimeString()}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">{camp.venue}</td>
                  <td className="py-4 px-4">{camp.doctorName}</td>
                  <td className="py-4 px-4">
                    <div className="flex justify-center items-center gap-2">
                      <Link to={`/dashboard/organizer/update-camp/${camp._id}`}>
                        <button className="bg-pink-700 p-3 rounded-full text-white hover:bg-pink-800 transition-all duration-300 ease-in-out cursor-pointer">
                          {" "}
                          <Edit size={16} />{" "}
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(camp._id)}
                        className="bg-pink-700 p-3 rounded-full text-white hover:bg-pink-800 transition-all duration-300 ease-in-out cursor-pointer"
                      >
                        {" "}
                        <Trash2 size={16} />{" "}
                      </button>
                      <Link to={`/available-camps/${camp._id}`}>
                        <button className="bg-pink-700 p-3 rounded-full text-white hover:bg-pink-800 transition-all duration-300 ease-in-out cursor-pointer">
                          {" "}
                          <EyeIcon size={16} />{" "}
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
};

export default ManageCamps;
