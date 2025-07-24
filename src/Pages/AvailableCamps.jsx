import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, Rows3, Rows2 } from "lucide-react";
import axios from "axios";
import CampCard from "./Component/CampCard/CampCard";
import Loader from "../Shared/Loader/Loader";
// import useAxiosSecure from "../Hooks/useAxiosSecure";
// import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const AvailableCamps = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [gridCols, setGridCols] = useState(3);
  // const {user, loading} = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: camps = [], isLoading } = useQuery({
  // enabled: !loading && !!user,
  queryKey: ["available-camps"],
  queryFn: async () => {
    const res = await axiosPublic.get("/available-camps");
    return res.data;
  },
});

  // 🔎 Search Filter
  const filteredCamps = camps
    ?.filter((camp) =>
      camp?.campName?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "registered") return b.registeredUsers - a.registeredUsers;
      if (sortBy === "fees") return a.fees - b.fees;
      if (sortBy === "name") return a.campName.localeCompare(b.campName);
      return 0;
    });

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        {/* 🔍 Search Input */}
        <div className="flex items-center px-3 py-2 w-full md:w-1/2 shadow-sm  transition-all duration-300 rounded-full">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by camp name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ml-2 w-full outline-none bg-transparent"
          />
        </div>

        {/* 🔽 Sorting Dropdown */}
        <div className="flex items-center gap-4 ">
          <select
            onChange={(e) => setSortBy(e.target.value)}
            className="border-transparent px-3 py-2 rounded-md shadow-sm cursor-pointer"
          >
            <option value="">Sort By</option>
            <option value="registered">Most Registered</option>
            <option value="fees">Camp Fees</option>
            <option value="name">A-Z Name</option>
          </select>

          {/* 🧱 Grid Toggle */}
          <button
            onClick={() => setGridCols(gridCols === 3 ? 2 : 3)}
            className="border-transparent px-3 py-2 rounded-md shadow-sm"
          >
            {gridCols === 3 ? <Rows2 size={20} /> : <Rows3 size={20} />}
          </button>
        </div>
      </div>

      {/* 🟩 Card Grid */}
      {isLoading ? (
        <div className="text-center text-lg">
          <Loader />{" "}
        </div>
      ) : (
        <div
          className={`grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-${gridCols}`}
        >
          {filteredCamps?.map((camp) => (
            <CampCard key={camp._id} camp={camp} />
          ))}
        </div>
      )}
    </section>
  );
};

export default AvailableCamps;
