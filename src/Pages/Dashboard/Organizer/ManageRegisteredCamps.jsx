import { useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Loader from "../../../Shared/Loader/Loader";
import SecondaryBtn from "../../../Shared/Button/SecondaryBtn";
import Swal from "sweetalert2";
import { TbCoinTaka } from "react-icons/tb";
import {motion} from "framer-motion"
import { slideUp } from "../../../Utility/animation";

const ManageRegisteredCamps = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ✅ Get registrations for camps created by this organizer
  const { data: registeredUsers = [], isLoading } = useQuery({
    queryKey: ["registered-users", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/registered-users/${user.email}`);
      return res.data;
    },
  });

  // Instead of paymentRecords, it's actually paymentRecords
  const { data: paymentRecords = [] } = useQuery({
    queryKey: ["organizerPaidCamps", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/organizer/paid-camps/${user.email}`);
      return res.data;
    },
  });

  const isPaid = (registrationId) => {
    return paymentRecords.some(
      (p) => p.camp === registrationId && p.paymentStatus === "Paid"
    );
  };

  const isConfirmed = (registrationId) => {
    const reg = registeredUsers.find((r) => r._id === registrationId);
    return reg?.confirmationStatus === "Confirmed";
  };

  // ✅ Search + Filter
  const filteredCamps = useMemo(() => {
    let filtered = registeredUsers;

    if (searchText) {
      filtered = filtered.filter(
        (camp) =>
          camp?.campName?.toLowerCase().includes(searchText.toLowerCase()) ||
          camp?.doctorName?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((camp) => camp.paymentStatus === filterStatus);
    }

    return filtered;
  }, [registeredUsers, searchText, filterStatus]);

  // ✅ Pagination
  const totalPages = Math.ceil(filteredCamps.length / itemsPerPage);
  const paginatedCamps = filteredCamps.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleConfirm = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to confirm this participant?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a", // green
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/register-camp/confirm/${id}`);
          if (res.data.modifiedCount > 0) {
            Swal.fire(
              "Confirmed!",
              "The participant has been confirmed.",
              "success"
            );
            queryClient.invalidateQueries(["registered-users", user?.email]);
          }
        } catch (err) {
          Swal.fire("Failed!", "Failed to confirm participant.", "error");
        }
      }
    });
  };

  const handleCancel = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this registration?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33", // red
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/register-camp/${id}`);
          if (res.data?.deletedCount > 0) {
            Swal.fire(
              "Cancelled!",
              "The registration has been cancelled.",
              "success"
            );
            queryClient.invalidateQueries(["registered-users", user?.email]);
          }
        } catch (err) {
          Swal.fire("Failed!", "Failed to cancel registration.", "error");
        }
      }
    });
  };

  if (isLoading)
    return (
      <div className="text-center mt-10">
        <Loader />
      </div>
    );

  return (
    <motion.div {...slideUp(0.1)} className="p-5 w-full mx-auto lexend text-xs">
      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
        <div className="flex items-center border border-zinc-300 hover:border-rose-500 transition-colors duration-300 ease-in-out rounded px-3 py-1">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by camp or doctor"
            className="w-full focus:outline-none p-2"
            onChange={(e) => {
              setSearchText(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <select
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-zinc-300 hover:border-rose-500 transition-colors duration-300 ease-in-out px-3 py-1 rounded"
        >
          <option value="all">All Payment Status</option>
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded shadow">
        <table className="table-auto w-full text-left bg-white">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2">SL</th>
              <th className="px-4 py-2">Camp Name</th>
              <th className="px-4 py-2">Camp Fees</th>
              <th className="px-4 py-2">Participant Name</th>
              <th className="px-4 py-2">Participant Email</th>
              <th className="px-4 py-2">Payment Status</th>
              <th className="px-4 py-2">Confirm</th>
              <th className="px-4 py-2">Joined</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCamps.map((reg, idx) => (
              <tr key={reg._id} className="border-t">
                <td className="px-4 py-2">
                  {(currentPage - 1) * itemsPerPage + idx + 1}
                </td>
                <td className="px-4 py-2">{reg.campName}</td>
                <td className="px-4 py-2 flex gap-1 items-center">
                  <span className="font-semibold text-2xl text-rose-500">
                    <TbCoinTaka />
                  </span>{" "}
                  {reg.campFees}৳
                </td>
                <td className="px-4 py-2">{reg.participant?.name}</td>
                <td className="px-4 py-2">{reg.participant?.email}</td>
                <td className="px-4 py-2">
                  {isPaid(reg._id) ? (
                    <span className="text-green-600 font-semibold">Paid</span>
                  ) : (
                    <span className="text-red-500 font-semibold">Unpaid</span>
                  )}
                </td>

                <td className="px-4 py-2">
                  {isPaid(reg._id) ? (
                    isConfirmed(reg._id) ? (
                      <span className="text-green-600 font-semibold">
                        Confirmed
                      </span>
                    ) : (
                      <SecondaryBtn
                        label="Pending"
                        type="button"
                        showIcon={false}
                        onClick={() => handleConfirm(reg._id)}
                      />
                    )
                  ) : (
                    <span className="text-gray-500 italic">
                      Awaiting Payment
                    </span>
                  )}
                </td>

                <td className="px-4 py-2">
                  <SecondaryBtn
                    label="Cancel"
                    type="button"
                    showIcon={false}
                    onClick={() => handleCancel(reg._id)}
                    disabled={isPaid(reg._id) && isConfirmed(reg._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredCamps.length === 0 && (
          <p className="text-lg text-center py-4 text-gray-500">
            No registrations found.
          </p>
        )}
      </div>

      {/* Pagination */}
      {filteredCamps.length > 0 && (
        <div className="flex justify-between items-center mt-4">
          <SecondaryBtn
            label="Previous"
            type="button"
            showIcon={false}
            onClick={handlePrev}
            disabled={currentPage === 1}
          />
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <SecondaryBtn
            label="Next"
            type="button"
            showIcon={false}
            onClick={handleNext}
            disabled={currentPage === totalPages}
          />
        </div>
      )}
    </motion.div>
  );
};

export default ManageRegisteredCamps;
