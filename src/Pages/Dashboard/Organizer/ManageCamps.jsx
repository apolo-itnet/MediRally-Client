import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, ListPlus, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SecondaryBtn from "../../../Shared/Button/SecondaryBtn";

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
    <div className="container mx-auto px-4 py-8 lexend">
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
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="table w-full">
            {/* Table Head */}
            <thead className="bg-gray-50">
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
            <tbody className="divide-y divide-gray-200">
              {camps.map((camp) => (
                <tr key={camp._id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">{camps.indexOf(camp) + 1}</td>
                  <td className="py-4 px-4 ">{camp.campName}</td>
                  <td className="py-4 px-4">
                    {new Date(camp.eventDateTime).toLocaleString()}
                  </td>
                  <td className="py-4 px-4">{camp.venue}</td>
                  <td className="py-4 px-4">{camp.doctorName}</td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <Link to={`/dashboard/organizer/update-camp/${camp._id}`}>
                        <SecondaryBtn
                          label="Edit"
                          icon={Edit}
                          iconPosition="left"
                          iconProps={{ size: 15 }}
                          className="Px-4 py-1 text-xs font-light"
                          iconClassName="group-hover:rotate-0"
                        />
                      </Link>
                      <SecondaryBtn
                        label="Delete"
                        icon={Trash2}
                        iconPosition="left"
                        iconProps={{ size: 15 }}
                        onClick={() => handleDelete(camp._id)}
                        className="Px-4 py-1 text-xs font-light"
                        iconClassName="group-hover:rotate-0"
                      />
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
