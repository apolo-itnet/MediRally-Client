import { useQuery } from "@tanstack/react-query";
import { Edit, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const ManageCamps = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  // Fetch camps organized by the current user
  const { data: camps = [], refetch } = useQuery({
    queryKey: ["camps", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/organizer-camps/${user?.email}`);
      return res.data;
    },
  });

  // Handle delete camp
  const handleDeleteCamp = (campId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/delete-camp/${campId}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Camp has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Manage Your Camps</h2>

      {camps.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg">You haven't created any camps yet.</p>
          <Link to="/create-camp" className="btn btn-primary mt-4">
            Create Your First Camp
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="table w-full">
            {/* Table Head */}
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left">Camp Name</th>
                <th className="py-3 px-4 text-left">Date & Time</th>
                <th className="py-3 px-4 text-left">Location</th>
                <th className="py-3 px-4 text-left">Healthcare Professional</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200">
              {camps.map((camp) => (
                <tr key={camp._id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">{camp.campName}</td>
                  <td className="py-4 px-4">
                    {new Date(camp.scheduledDateTime).toLocaleString()}
                  </td>
                  <td className="py-4 px-4">{camp.venueLocation}</td>
                  <td className="py-4 px-4">{camp.healthcareProfessional}</td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <Link
                        to={`/update-camp/${camp._id}`}
                        className="btn btn-sm btn-outline btn-primary"
                      >
                        <Edit size={16} className="mr-1" />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteCamp(camp._id)}
                        className="btn btn-sm btn-outline btn-error"
                      >
                        <Trash2 size={16} className="mr-1" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageCamps;
