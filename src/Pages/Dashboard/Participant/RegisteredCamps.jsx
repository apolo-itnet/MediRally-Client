import { useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaSearch } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Loader from "../../../Shared/Loader/Loader";
import SecondaryBtn from "../../../Shared/Button/SecondaryBtn";
import { TbCoinTaka } from "react-icons/tb";
import FeedbackModal from "./FeedbackModal";
import Swal from "sweetalert2";
import { Link } from "react-router";

const RegisteredCamps = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [submittedFeedbackIds, setSubmittedFeedbackIds] = useState([]);

  const itemsPerPage = 10;

  const { data: camps = [], isLoading } = useQuery({
    queryKey: ["registered-camps", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/register-camp/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: paidCampIds = [] } = useQuery({
    queryKey: ["paidCamps", user?.email],

    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/is-paid/all/${user.email}`);
      return res.data;
    },
  });
  console.log("paidCampIds:", paidCampIds);

  // Search + Filter Logic
  const filteredCamps = useMemo(() => {
    if (!Array.isArray(camps)) return [];

    let filtered = camps;

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
  }, [camps, searchText, filterStatus]);

  // Pagination Logic
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

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/register-camp/${id}`);

        if (res.status === 200 && res.data?.deletedCount > 0) {
          await Swal.fire({
            title: "Cancelled!",
            text: "Your registration has been cancelled.",
            icon: "success",
          });

          queryClient.invalidateQueries(["registered-camps", user?.email]);
        } else {
          throw new Error("Cancel failed");
        }
      } catch (err) {
        console.error("Cancel error", err);
        Swal.fire({
          title: "Error!",
          text: "Failed to cancel registration.",
          icon: "error",
        });
      }
    }
  };

  const handleFeedback = (camp) => {
    setSelectedCamp(camp);

    // Optional fallback if modal doesn't toggle
    const checkbox = document.getElementById("feedback_modal");
    if (checkbox) checkbox.checked = true;
  };

  const handleClose = () => {
    const checkbox = document.getElementById("feedback_modal");
    if (checkbox) checkbox.checked = false;
    setSelectedCamp(null);
    onClose();
  };

  if (isLoading)
    return (
      <div className="text-center mt-10">
        <Loader />
      </div>
    );

  return (
    <div className="p-5 w-full mx-auto lexend text-xs">
      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
        <div className="flex items-center border border-zinc-300 hover:border-rose-500 transition-colors duration-300 ease-in-out rounded px-3 py-1 ">
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
          <option value="Pay">Unpaid</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded shadow">
        <table className="table-auto w-full  text-left bg-white">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2">SL</th>
              <th className="px-4 py-2">Camp Name</th>
              <th className="px-4 py-2">Camp Fees</th>
              <th className="px-4 py-2">Camp Schedule</th>
              <th className="px-4 py-2">Confirmation</th>
              <th className="px-4 py-2">Payment Status</th>
              <th className="px-4 py-2">Cancel</th>
              <th className="px-4 py-2">Feedback</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCamps.map((camp, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{camp.campName}</td>
                <td className="px-4 py-2 flex gap-1 items-center">
                  {" "}
                  <span className="font-semibold text-2xl text-rose-500">
                    <TbCoinTaka />
                  </span>{" "}
                  {camp.campFees}
                </td>
                <td className="px-4 py-2">
                  {" "}
                  {new Date(camp.joinedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{camp.confirmationStatus}</td>

                <td className="px-4 py-2">
                  {paidCampIds.includes(camp.campId) ? (
                    <SecondaryBtn
                      label="Paid"
                      showIcon={false}
                      className="px-8 py-1"
                      disabled={paidCampIds.includes(camp.campId)}
                    />
                  ) : (
                    <Link
                      to="/dashboard/participant/payment"
                      state={{ camp }}
                      className="text-rose-600 font-semibold"
                    >
                      <SecondaryBtn
                        label="Pay"
                        showIcon={false}
                        className="px-8 py-1"
                      />
                    </Link>
                  )}
                </td>

                <td className="">
                  <SecondaryBtn
                    label="Cancel"
                    type="button"
                    showIcon={false}
                    disabled={paidCampIds.includes(camp.campId)}
                    onClick={() => handleCancel(camp._id)}
                    className="px-6 py-1"
                  />
                </td>
                <td className="px-4 py-2">
                  {paidCampIds.includes(camp.campId) ? (
                    <label
                      htmlFor="feedback_modal"
                      onClick={() => handleFeedback(camp)}
                      className="cursor-pointer group relative bg-pink-700 hover:bg-pink-800 text-white font-medium px-4 py-2 rounded-full transition-all duration-200 ease-in-out shadow hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Feedback
                    </label>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <FeedbackModal
        selectedCamp={selectedCamp}
        user={user}
        onClose={handleClose}
        onSuccess={(id) => setSubmittedFeedbackIds((prev) => [...prev, id])}
      />

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <SecondaryBtn
          label="Previous"
          type="button"
          showIcon={false}
          onClick={handlePrev}
          disabled={currentPage === 1}
        />
        <span className="">
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
    </div>
  );
};

export default RegisteredCamps;
