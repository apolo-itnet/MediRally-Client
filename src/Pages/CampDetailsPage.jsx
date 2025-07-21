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
import Input from "./Component/Shared/Input";
import Select from "./Component/Shared/Select";
import SecondaryBtn from "../Shared/Button/SecondaryBtn";
import { toastError, toastSuccess } from "../Utility/toastmsg";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";

const defaultDoctorImg = "https://i.postimg.cc/7ZR2SwvK/physician-doctor.png";

const CampDetailsPage = () => {
  const { id } = useParams();
  const { user, role } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [participantCounts, setParticipantCount] = useState(0);
  const [joinClicked, setJoinClicked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

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
    if (camp && camp.participants) {
      setParticipantCount(camp.participants.length);
    }
  }, [camp]);

  if (isLoading)
    return (
      <div>
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

  

  const onSubmit = async (data) => {
    const registrationData = {
      // userId: user.uid,
      campId: camp._id,
      campName,
      campFees: fees,
      location: venue,
      doctorName,
      participant: {
        name: user.displayName,
        email: user.email,
        age: data.age,
        phone: data.phone,
        gender: data.gender,
        emergencyContact: data.emergency,
      },
    };

    try {
      const res = await axiosSecure.post("/register-camp", registrationData);
      if (res.data.insertedId) {
        // await axiosSecure.patch(`/update-participant-count/${camp._id}`);
        toastSuccess("Successfully registered!");
        if (joinClicked) {
          setParticipantCount((prev) => prev + 1);
          setJoinClicked(false);
        }
        setAlreadyJoined(true);
        reset(); // Reset form
      }
    } catch (err) {
      toastError("Registration failed!");
    }
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

        {/* <div >
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
        </div> */}

        
        <div>
          <label
            htmlFor="join-modal"
            className={`btn mt-4 ${
              isDisabled ? "btn-disabled" : "btn-primary"
            }`}
          >
            {alreadyJoined ? "Already Joined" : "Join Camp"}
          </label>
        </div>

        {/* Join Modal */}
        <div>
          <input type="checkbox" id="join-modal" className="modal-toggle " />
          <div className="modal">
            <div className="max-w-5xl bg-zinc-50 p-8 rounded-2xl modal-box">
              <h3 className="font-bold text-lg mb-4">Join Camp</h3>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-1 grid grid-cols-1 md:grid-cols-2 space-x-6 gap-2"
              >
                <Input value={campName} readOnly label="Camp Name" />
                <Input value={fees} readOnly label="Camp Fees" />
                <Input value={venue} readOnly label="Location" />
                <Input
                  value={doctorName}
                  readOnly
                  label="Healthcare Professional"
                />
                <Input
                  value={user?.displayName}
                  readOnly
                  label="Participant Name"
                />
                <Input value={user?.email} readOnly label="Participant Email" />

                <Input
                  label="Age"
                  name="age"
                  register={register}
                  errors={errors}
                  validation={{ required: "Age is required" }}
                />

                <Input
                  label="Phone Number"
                  name="phone"
                  register={register}
                  errors={errors}
                  validation={{ required: "Phone number is required" }}
                />

                <Select
                  label="Gender"
                  name="gender"
                  register={register}
                  errors={errors}
                  options={["Male", "Female", "Other"]}
                  validation={{ required: "Gender is required" }}
                />

                <Input
                  label="Emergency Contact (Optional)"
                  name="emergency"
                  register={register}
                  errors={errors}
                  // Optional field, so no validation
                />

                <div className="modal-action col-span-2 justify-between">
                  <label htmlFor="join-modal" className="btn">
                    Close
                  </label>
                  <SecondaryBtn label="Submit" type="submit" />
                </div>
              </form>
            </div>
          </div>
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
