import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router";
import { Eye, School, Stethoscope, User } from "lucide-react";
import { motion } from "framer-motion";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { slideUp } from "../../../Utility/animation";

const RecentCampSpecialists = () => {
  const axiosPublic = useAxiosPublic();

  const { data: camps = [] } = useQuery({
    queryKey: ["recentCamps"],
    queryFn: async () => {
      const res = await axiosPublic.get("/available-camps");
      return res.data;
    },
  });

  return (
    <section className="py-16 px-4 md:px-10 bg-gray-50 lexend text-xs">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Our Recent Camp Specialists
        </h2>

        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
        >
          {camps?.slice(0, 6).map((camp, i) => {
            const doctorImage = camp.images?.find(
              (img) => img.category === "Doctor"
            );

            return (
              <SwiperSlide key={camp._id} className="py-14">
                <motion.div
                  {...slideUp(0.1)}
                  className="relative group rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300"
                >
                  <img
                    src={
                      doctorImage?.url ||
                      "https://via.placeholder.com/400x300?text=No+Image"
                    }
                    alt={camp.doctorName}
                    className="w-full h-92 object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent px-5 py-6 flex flex-col justify-end items-center text-white">
                    <div className="flex flex-col items-center justify-between ">
                      <div className="space-y-2">
                        <h3 className="flex items-center gap-2 text-base font-semibold line-clamp-1">
                          <span className="text-zinc-400"><User className="w-5 h-5" /></span> {camp.doctorName}
                        </h3>
                        <p className="flex items-center gap-2 text-sm text-gray-300">
                          <span className="text-zinc-400"><Stethoscope className="w-5 h-5" /></span> {camp.doctorSpeciality}
                        </p>
                        <p className="flex items-center gap-2 mt-1 text-sm font-medium line-clamp-1">
                          <span className="text-zinc-400"><School className="w-5 h-5" /></span> <span className="line-clamp-1">{camp.campName}</span>
                        </p>
                      </div>

                      <div className="pt-2">
                        <Link
                          to={`/available-camps/${camp._id}`}
                          className=" text-rose-500 border border-zinc-400 hover:border-rose-500 hover:bg-rose-500 hover:text-white p-2 rounded-full transition-colors duration-300 ease-in-out flex items-center justify-center"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default RecentCampSpecialists;
