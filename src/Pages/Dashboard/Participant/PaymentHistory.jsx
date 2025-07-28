import React, { useEffect, useMemo, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Shared/Loader/Loader";
import { FaSearch } from "react-icons/fa";
import SecondaryBtn from "../../../Shared/Button/SecondaryBtn";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { motion } from "framer-motion";
import { slideUp } from "../../../Utility/animation";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmationMap, setConfirmationMap] = useState({});

  const itemsPerPage = 10;

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payment-history", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/history/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    const fetchStatuses = async () => {
      const newMap = {};
      for (const p of payments) {
        try {
          const res = await axiosSecure.get(
            `/register/confirmation-status/${user.email}/${p.campId}`
          );

          newMap[p.campId] = res.data.confirmationStatus;
        } catch {
          newMap[p.campId] = "Pending";
        }
      }
      setConfirmationMap(newMap);
    };

    if (payments.length > 0) fetchStatuses();
  }, [payments, user.email, axiosSecure]);

  const statusMap = {
    Pay: "Paid",
    Unpaid: "Unpaid",
    Pending: "Pending",
  };

  // Filter & Search Logic
  const filteredPayments = useMemo(() => {
    if (!Array.isArray(payments)) return [];

    let filtered = payments;

    if (searchText) {
      filtered = filtered.filter((p) =>
        p.campName?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return filtered;
  }, [payments, searchText]);

  // Pagination
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (isLoading)
    return (
      <div className="text-center mt-10">
        <Loader />
      </div>
    );

  return (
    <motion.div  {...slideUp(0.1)} className="p-5 w-full mx-auto lexend text-xs">
      {/* Search */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
        <div className="flex items-center border border-zinc-300 hover:border-rose-500 transition-colors duration-300 ease-in-out rounded px-3 py-1">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by camp name"
            className="w-full focus:outline-none p-2"
            onChange={(e) => {
              setSearchText(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded shadow">
        <table className="table-auto w-full text-left bg-white">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2">SL</th>
              <th className="px-4 py-2">Camp Name</th>
              <th className="px-4 py-2">Transaction ID</th>
              <th className="px-4 py-2">Payment Status</th>
              <th className="px-4 py-2">Confirmation</th>
              <th className="px-4 py-2">Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPayments.map((payment, idx) => (
              <tr key={payment._id} className="border-t">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{payment.campName}</td>
                <td className="px-4 py-2">{payment.transactionId}</td>
                <td className="px-4 py-2">
                  {statusMap[payment.paymentStatus] || payment.paymentStatus}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={
                      confirmationMap[payment.campId] === "Confirmed"
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }
                  >
                    {confirmationMap[payment.campId] || "Pending"}
                  </span>
                </td>

                <td className="px-4 py-2">
                  {new Date(payment.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <SecondaryBtn
          label="Previous"
          type="button"
          showIcon={false}
          onClick={handlePrev}
          disabled={currentPage === 1}
        />
        <span>
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
    </motion.div>
  );
};

export default PaymentHistory;
