import {
  MapPin,
  CalendarDays,
  DollarSign,
  Calendar,
  User,
  Users,
  UserCheck,
  Clock10,
} from "lucide-react";
import { Link } from "react-router";
import SecondaryBtn from "../../../Shared/Button/SecondaryBtn";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import useAuth from "../../../Hooks/useAuth";

const CampCard = ({ camp }) => {
  const {user} = useAuth();
  const { campName, images, _id } = camp;

  const sliderImages = images?.filter(
    (img) => img.category === "Banner" || img.category === "Other"
  );

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 group">
      {/* Camp Image */}
      {images.length > 1 ? (
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop
          effect="fade"
          speed={1000}
          modules={[Autoplay, EffectFade]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          className="rounded-md overflow-hidden"
        >
          {sliderImages.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={img.url}
                alt={campName}
                className="w-full h-60 object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <img
          src={images[0]?.url}
          alt={campName}
          className="w-full h-60 object-cover rounded-md"
        />
      )}

      {/* Camp Details */}
      <div className="p-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{campName}</h2>
        </div>

        <div>
          <p className="text-sm text-gray-400 py-2">
            {camp.description?.slice(0, 100)}...
          </p>
        </div>

        <div className="mt-2 space-y-2 text-sm">
          <p className="flex items-center text-gray-600 font-bold text-base">
            <User size={16} className="mr-2 text-rose-500 " />
            {camp.doctorName}
          </p>

          <p className="flex items-center text-gray-600 font-medium">
            <Users size={16} className="mr-2 text-rose-500" />
            {/* Participants Limit : {camp.maxParticipants} */}
            Organizer : {camp?.organizer?.name}
          </p>

          <p className="flex items-center text-gray-600">
            <MapPin size={16} className="mr-2 text-rose-500" />
            {camp.venue}
          </p>

          <div className="flex justify-between items-center ">
            <p className="flex items-center text-gray-600">
              <Calendar size={16} className="mr-2 text-rose-500" />
              {new Date(camp.eventDateTime).toLocaleDateString()}
            </p>

            <p className="flex items-center text-gray-600">
              <Clock10 size={16} className="mr-2 text-rose-500" />
              <span> {new Date(camp.eventDateTime).toLocaleTimeString()}</span>
            </p>

            {camp.fees !== undefined && (
              <p className="flex items-center text-gray-600">
                <DollarSign size={16} className="mr-2 text-rose-500" />
                {/* Fee: {camp.fees === 0 ? "Free" : `৳ ${camp.fees}`} */}
                <span>
                  Fees: <span className="font-semibold">৳ {camp.fees}</span>
                </span>
              </p>
            )}
          </div>
          
          {/* <p className="flex items-center text-gray-600">
            <UserCheck size={16} className="mr-2 text-rose-500" />
            Attend Participants: {camp.participantCount}
          </p> */}

          
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex justify-between">
          <Link to={`/available-camps/${_id}`}>
            <SecondaryBtn label="View Details" className="w-full" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CampCard;
