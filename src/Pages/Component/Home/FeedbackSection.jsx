import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { slideRight } from "../../../Utility/animation";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";


const FeedbackSection = () => {

  const axiosPublic = useAxiosPublic();

  const {
    data: feedbacks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["recentFeedbacks"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-feedbacks");
      return res.data;
    }});

  if (isLoading) return <div className="text-center py-10">Loading feedback...</div>;
  if (isError) return <div className="text-center py-10 text-red-500">Failed to load feedback</div>;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          {...slideRight(0.1)}
          className="text-3xl font-bold text-center mb-8"
        >
          What Our Patients Say
        </motion.h2>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          spaceBetween={30}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {feedbacks.map((fb) => (
            <SwiperSlide key={fb._id}>
              <motion.div
                {...slideRight(0.1)}
                className="rounded-2xl bg-gray-50 shadow-md p-6 h-full flex flex-col gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={fb.userPhoto || "/default-user.png"}
                    alt={fb.userName}
                    className="w-14 h-14 rounded-full object-cover border"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{fb.userName}</h3>
                    <div className="flex items-center gap-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < fb.rating ? "fill-yellow-500" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 line-clamp-5">"{fb.feedbackText}"</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FeedbackSection;
