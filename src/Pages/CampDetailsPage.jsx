import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import {
  Calendar,
  Clock,
  Clock10,
  DollarSign,
  MapPin,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import SecondaryBtn from "../Shared/Button/SecondaryBtn";
import Loader from "../Shared/Loader/Loader";
import { slideRight } from "../Utility/animation";
import JoinCampModal from "./Component/JoinCampModal/JoinCampModal";

const defaultDoctorImg = "https://i.postimg.cc/7ZR2SwvK/physician-doctor.png";

const CampDetailsPage = () => {
  const { id } = useParams();
  const { user, userRole } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [alreadyJoined, setAlreadyJoined] = useState(false);

  // Get camp details by ID
  const { data: camp = {}, isLoading } = useQuery({
    queryKey: ["campDetails", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/available-camps/${id}`);
      return res.data;
    },
  });

  // Get all camps
  const { data: camps = [] } = useQuery({
    // enabled: !loading && !!user,
    queryKey: ["available-camps"],
    queryFn: async () => {
      const res = await axiosPublic.get("/available-camps");
      return res.data;
    },
  });

  //
  const { data: joinedData = {} } = useQuery({
    queryKey: ["isJoined", id, user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/register-camp/is-joined/${id}?email=${user?.email}`
      );
      return res.data;
    },
  });
  // const alreadyJoined = joinedData.joined;
  useEffect(() => {
    if (joinedData?.joined !== undefined) {
      setAlreadyJoined(joinedData.joined);
    }
  }, [joinedData]);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  // Destructure
  const {
    campName,
    images = [],
    fees,
    eventDateTime,
    venue,
    doctorName,
    doctorSpeciality,
    maxParticipants,
    duration,
    description,
  } = camp;

  // Get doctor image
  const doctorImage =
    images.find((img) => img.category === "Doctor")?.url || defaultDoctorImg;

  // Get slider images
  const sliderImages = images.filter(
    (img) => img.category === "Banner" || img.category === "Other"
  );

  // Check if user can join
  const isDisabled = !user || userRole === "Organizer" || alreadyJoined;

  const participantCounts = camp?.participantCount || 0;

  // Handle join
  const handleSuccessJoin = () => {
    queryClient.invalidateQueries(["campDetails", id]);
    // setAlreadyJoined(true);
  };

  return (
    <div className="w-full mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8 lexend res-pad">
      {/* Left - Image and Join */}
      <motion.div {...slideRight(0.2)}>
        {sliderImages.length > 0 ? (
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
          <label
            htmlFor="join-modal"
            className={`btn mt-4 group relative bg-pink-700 hover:bg-pink-800 text-white text-sm font-medium px-6 py-3 rounded-full transition-all duration-200 ease-in-out shadow-none border-none ${
              isDisabled ? "btn-disabled" : "btn-primary"
            }`}
          >
            {alreadyJoined ? "Already Joined" : "Join Camp"}
          </label>

          {/* 🔒 Show message if user not signed in */}
          {!user && (
            <p className="mt-2 text-yellow-600 text-sm">
              Please signup or sign in to join this camp.
            </p>
          )}

          {/* ❌ If Organizer tries to join */}
          {userRole === "Organizer" && (
            <p className="mt-2 text-rose-600 text-sm">Organizer can't join.</p>
          )}

          {/* ✅ Already joined message */}
          {alreadyJoined && (
            <p className="mt-2 text-rose-500 text-sm">
              ✅ Check your dashboard to confirm payment and participation.
            </p>
          )}
        </div>

        {/* Join Camp Modal */}
        <JoinCampModal
          camp={camp}
          user={user}
          onSuccess={() => {
            queryClient.invalidateQueries(["registered-camps", user.email]);
            setAlreadyJoined(true);
          }}
          alreadyJoined={alreadyJoined}
          setAlreadyJoined={setAlreadyJoined}
        />
      </motion.div>

      {/* Right - Details */}
      <div className="space-y-5" {...slideRight(0.4)}>
        <h2 className="text-2xl md:text-3xl font-bold">{campName}</h2>

        <div className="space-y-2 text-gray-700 text-base">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-rose-500" />
            <span>{new Date(eventDateTime).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock10 className="w-5 h-5 text-rose-500" />
            <span>{new Date(eventDateTime).toLocaleTimeString()}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-rose-500" />
            <span>{venue}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-rose-500" />
            <span>
              {participantCounts} / {maxParticipants} Participants
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

        {/* Doctor Info */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <img
            src={doctorImage}
            alt={doctorName}
            className="w-30 h-30 rounded-4xl object-cover p-1 border border-zinc-300"
          />
          <div>
            <h3 className="font-semibold">{doctorName || "Not Assigned"}</h3>
            <p className="text-sm text-gray-500">
              {doctorSpeciality || "Camp Specialist"}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t mt-4 text-gray-600">
          <h4 className="text-xl uppercase font-medium mb-2">Description</h4>
          <p className="text-base font-light leading-relaxed whitespace-pre-line text-justify">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CampDetailsPage;
