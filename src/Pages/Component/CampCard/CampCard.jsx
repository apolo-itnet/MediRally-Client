import {
  MapPin,
  CalendarDays,
  DollarSign,
  Calendar,
  User,
  Users,
  UserCheck,
} from "lucide-react";
import { Link } from "react-router";
import SecondaryBtn from "../../../Shared/Button/SecondaryBtn";

const CampCard = ({ camp }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 group">
    {/* Camp Image */}
    <img
      src={camp?.images?.[1] || "https://i.postimg.cc/QMJ1T5CC/stethoscope-logo-1.png"}
      alt={camp.campName}
      className="w-full h-48 object-cover"
    />

    {/* Camp Details */}
    <div className="p-4">
      <div>
        <h2 className="text-xl font-bold text-gray-800">{camp.campName}</h2>
      </div>

      <div>
        <p className="text-sm text-gray-400 py-2">
          {camp.description?.slice(0, 100)}...
        </p>
      </div>

      <div className="mt-2 space-y-1 text-sm">
        <p className="flex items-center text-gray-600 font-bold">
          <User size={16} className="mr-2 " />
          {camp.doctorName}
        </p>

        <p className="flex items-center text-gray-600">
          <Calendar size={16} className="mr-2" />
          {new Date(camp.eventDateTime).toLocaleDateString()}
        </p>

        <p className="flex items-center text-gray-600">
          <MapPin size={16} className="mr-2" />
          {camp.venue}
        </p>

        {camp.fees !== undefined && (
          <p className="flex items-center text-gray-600">
            <DollarSign size={16} className="mr-2" />
            Fee: {camp.fees === 0 ? "Free" : `৳ ${camp.fees}`}
          </p>
        )}

        <p className="flex items-center text-gray-600">
          <Users size={16} className="mr-2" />
          Participants: {camp.maxParticipants}
        </p>
        <p className="flex items-center text-gray-600">
          <UserCheck size={16} className="mr-2" />
          Attend Participants: {camp.participantCount}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex justify-between">
        <Link to={`/available-camps/${camp._id}`}>
          <SecondaryBtn label="View Details" className="w-full"  />
        </Link>
      </div>
    </div>
  </div>
);

export default CampCard;
