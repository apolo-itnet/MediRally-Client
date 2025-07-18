import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Search, Filter } from "lucide-react";
import axios from "axios";
import { Link } from "react-router";

import SecondaryBtn from "../Shared/Button/SecondaryBtn";
import Loader from "../Shared/Loader/Loader";

const AvailableCamps = () => {
  const [search, setSearch] = useState("");

  const { data: camps = [], isLoading, isError } = useQuery({
    queryKey: ["availableCamps"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/available-camps`
      );
      return res.data;
    },
  });

  const filteredCamps = camps?.filter((camp) =>
    camp?.campName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8 text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Browse Available Camps
        </h1>
        <p className="text-gray-500">Find and join a health camp near you</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Search by camp name..."
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
            <Filter size={18} /> Filter
          </button>
        </div>
      </div>

      {/* Data Section */}
      {isLoading ? (
        <div className="text-center py-20 font-semibold text-lg text-blue-500">
          <Loader/>
        </div>
      ) : isError ? (
        <div className="text-center text-red-500 py-20">
          Failed to load camps. Please try again later.
        </div>
      ) : filteredCamps.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          No camps found with that name.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCamps.map((camp) => (
            <div
              key={camp._id}
              className="bg-white shadow-md rounded-xl overflow-hidden"
            >
              <img
                src={camp.image}
                alt={camp.campName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2">
                <h2 className="text-xl font-bold text-gray-800">
                  {camp.campName}
                </h2>
                <p className="text-sm text-gray-600">
                  {camp.description?.slice(0, 120)}...
                </p>
                <div className="pt-2">
                  <Link to={`/camp-details/${camp._id}`}>
                    <SecondaryBtn label="View Details" text="View Details" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AvailableCamps;
