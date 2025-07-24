import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import CampCard from "../CampCard/CampCard";
import SecondaryBtn from "../../../Shared/Button/SecondaryBtn";
import PrimaryBtn from "../../../Shared/Button/PrimaryBtn";

const CampSection = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: camps = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["popularCamps"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        "/available-camps?limit=6&sort=participantCount_desc"
      );
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load camps.</p>;

  return (
    <section className="my-10 px-4 md:px-8 lg:px-16">
      <h2 className="text-4xl font-bold text-center mb-6">
        Popular Medical Camps
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {camps.map((camp) => (
          <CampCard key={camp._id} camp={camp} />
        ))}
      </div>

      <div className="text-center mt-8">
        <Link to="/all-camps">
          <PrimaryBtn
            label="See All Medical"
            altLabel="Camps"
            className=""
            iconBg="bg-pink-700 text-white"
          ></PrimaryBtn>
        </Link>
      </div>
    </section>
  );
};

export default CampSection;
