import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { FaSearch } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Loader from "../../../Shared/Loader/Loader";
import SecondaryBtn from "../../../Shared/Button/SecondaryBtn";
import { TbCoinTaka } from "react-icons/tb";

const RegisteredCamps = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

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

  // Search + Filter Logic
  const filteredCamps = useMemo(() => {
    if (!Array.isArray(camps)) return [];

    let filtered = camps;

    if (searchText) {
      filtered = filtered.filter(
        (camp) =>
          camp?.campName?.toLowerCase().includes(searchText.toLowerCase()) ||
          camp?.healthcareProfessional
            ?.toLowerCase()
            .includes(searchText.toLowerCase())
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

  // Placeholder functions
  const handlePay = (camp) => {
    console.log("Redirect to payment:", camp);
  };

  const handleCancel = (camp) => {
    console.log("Cancel camp:", camp);
  };

  const handleFeedback = (camp) => {
    console.log("Open feedback modal:", camp);
    // Add your logic to open the feedback modal
  };

  if (isLoading)
    return (
      <div className="text-center mt-10">
        <Loader />
      </div>
    );

  return (
    <div className="p-5 w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4">Registered Camps</h2>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
        <div className="flex items-center border border-gray-300 rounded px-3 py-1">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by camp or doctor"
            className="outline-none"
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
          className="border px-3 py-1 rounded"
        >
          <option value="all">All Payment Status</option>
          <option value="Paid">Paid</option>
          <option value="Pay">Unpaid</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded shadow">
        <table className="table-auto w-full text-sm text-left bg-white">
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

                <td className="px-4 py-2 text-sm">
                  {camp.paymentStatus === "Pay" ? (
                    <CustomButton text="Pay" onClick={() => handlePay(camp)} />
                  ) : (
                    <span className="text-green-600 font-semibold">Paid</span>
                  )}
                </td>
                <td className="">
                  <SecondaryBtn
                    label="Cancel"
                    type="button"
                    text="Cancel"
                    showIcon={false}
                    disabled={camp.paymentStatus === "Paid"}
                    onClick={() => handleCancel(camp)}
                  />
                </td>
                <td className="px-4 py-2">
                  {/* {camp.paymentStatus === "Paid" ? (
                    <SecondaryBtn
                      text="Feedback"
                      onClick={() => handleFeedback(camp)}
                    />
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )} */}
                  <SecondaryBtn
                    label="Feedback"
                    type="button"
                    showIcon={false}
                    onClick={() => handleFeedback(camp)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
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
    </div>
  );
};

export default RegisteredCamps;
