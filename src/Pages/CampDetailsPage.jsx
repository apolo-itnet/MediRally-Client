import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  User,
  DollarSign,
  Clock10,
} from "lucide-react";
import { motion } from "framer-motion";
import { slideRight } from "../Utility/animation";
import Loader from "../Shared/Loader/Loader";
import useAuth from "../Hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const defaultDoctorImg = "https://i.postimg.cc/7ZR2SwvK/physician-doctor.png";

const CampDetailsPage = () => {
  const { id } = useParams();
  const { user, role } = useAuth();
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const axiosPublic = useAxiosPublic();

  const { data: camp = {}, isLoading } = useQuery({
    queryKey: ["campDetails", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/available-camps/${id}`);
      const data = res.data;
      return data;
    },
  });

  // Check if user already joined this camp
  useEffect(() => {
    if (user?.email && camp?._id) {
      fetch(`/api/joined/${camp._id}?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.joined) {
            setAlreadyJoined(true);
          }
        });
    }
  }, [user?.email, camp?._id]);

  if (isLoading)
    return (
      <div className="text-center py-10">
        <Loader />
      </div>
    );

  const {
    campName,
    images = [],
    fees,
    eventDateTime,
    venue,
    doctorName,
    maxParticipants,
    participantCount,
    duration,
    description,
  } = camp;

  const doctorImage =
    images?.find((img) => img.category === "Doctor")?.url || defaultDoctorImg;

  const sliderImages = images?.filter(
    (img) => img.category === "Banner" || img.category === "Other"
  );

  
  const handleJoin = () => {
    fetch("/api/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        campId: camp._id,
        participant: {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.insertedId) {
          toast.success("Successfully joined the camp!");
          setAlreadyJoined(true);
        }
      });
  };

  const isDisabled = !user || role === "organizer" || alreadyJoined;

  return (
    <div className="w-full mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8 lexend res-pad">
      {/* Left side - Images */}
      <motion.div {...slideRight(0.2)}>
        {images.length > 1 ? (
          <Swiper
            modules={[EffectFade, Autoplay, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            effect="fade"
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop
            pagination={{ clickable: true }}
            className="overflow-hidden rounded-2xl"
          >
            {sliderImages.map((img, i) => (
              <SwiperSlide key={i} className="h-60">
                <img
                  src={img.url}
                  alt={`camp-${i}`}
                  className="w-full aspect-square object-cover md:h-[500px]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <img
            src={images[0]?.url || defaultDoctorImg}
            alt={campName}
            className="w-full aspect-square object-cover rounded-2xl md:h-[500px] "
          />
        )}

        <div>
          {/* Camp details content */}

          <button
            disabled={isDisabled}
            onClick={handleJoin}
            className={`px-6 py-2 rounded-md mt-4 
          ${
            isDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
          >
            {alreadyJoined ? "Already Joined" : "Join Camp"}
          </button>

          {alreadyJoined && (
            <p className="mt-2 text-green-600 text-sm">
              ✅ Go to your dashboard and pay to confirm your participation.
            </p>
          )}
        </div>
      </motion.div>

      {/* Right side - Info */}
      <div className="space-y-5" {...slideRight(0.4)}>
        <h2 className="text-2xl md:text-3xl font-bold">{campName}</h2>

        <div className="space-y-2 text-gray-700 text-base">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-rose-500" />
            <span> {new Date(eventDateTime).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock10 className="w-5 h-5 text-rose-500" />
            <span> {new Date(eventDateTime).toLocaleTimeString()}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-rose-500" />
            <span>{venue}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-rose-500" />
            <span>
              {participantCount || 0} / {maxParticipants} Participants
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-rose-500" />
            <span>{duration} Hour</span>
          </div>

          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-rose-500" />
            <span>
              Fees: <span className="font-semibold">৳ {fees}</span>
            </span>
          </div>
        </div>

        {/* Doctor Image */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <img
            src={doctorImage || defaultDoctorImg}
            alt={doctorName}
            className="w-30 h-30 rounded-4xl object-cover p-1 border border-zinc-300"
          />
          <div>
            <h3 className="font-semibold">{doctorName || "Not Assigned"}</h3>
            <p className="text-sm text-gray-500">Camp Specialist</p>
          </div>
        </div>

        <div className="pt-4 border-t mt-4 text-gray-600">
          <h4 className="text-xl uppercase font-medium mb-2">Description</h4>
          <p className="text-base font-light leading-relaxed whitespace-pre-line text-justify ">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CampDetailsPage;
