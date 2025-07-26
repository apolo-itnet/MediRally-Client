import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  UserPlus,
  Image as ImageIcon,
  ClipboardSignature,
  UserCheck,
  Clock4,
  Users,
  AlignLeft,
  Plus,
} from "lucide-react";
import { TbCoinTaka } from "react-icons/tb";
import { fadeIn } from "../../../Utility/animation";
import SecondaryBtn from "../../../Shared/Button/SecondaryBtn";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
import { toastError, toastSuccess } from "../../../Utility/toastmsg";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const AddCamp = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setValue("eventDateTime", date);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      category: "Banner",
    }));
    setImagePreviews(previews);
  };

  const handleAddCamp = async (e) => {
    setLoading(true);

    const {
      campName,
      fees,
      eventDateTime,
      venue,
      doctorName,
      doctorSpeciality,
      maxParticipants,
      duration,
      description,
      participantCount,
    } = e;

    if (imagePreviews.length === 0 || imagePreviews.length > 4) {
      toastError("Please upload 1 to 4 images");
      setLoading(false);
      return;
    }

    try {
      const uploadedImageData = await Promise.all(
        imagePreviews.map(async (img) => {
          const formData = new FormData();
          formData.append("image", img.file);

          const res = await axios.post(
            `https://api.imgbb.com/1/upload?key=${
              import.meta.env.VITE_img_key
            }`,
            formData
          );

          if (res.data.success) {
            return {
              url: res.data.data.url,
              category: img.category,
            };
          } else {
            throw new Error("Upload failed");
          }
        })
      );

      const newCamp = {
        campName,
        images: uploadedImageData,
        fees: Number(fees),
        eventDateTime,
        venue,
        doctorName,
        doctorSpeciality,
        maxParticipants: Number(maxParticipants),
        duration: Number(duration),
        description,
        participantCount: Number(participantCount),
        organizer: {
          name: user?.displayName,
          email: user?.email,
          photo: user?.photoURL,
        },
        createdAt: new Date().toISOString(),
      };

      const saveRes = await axiosPublic.post("/add-camp", newCamp);

      if (saveRes.data.insertedId) {
        toastSuccess("Camp added successfully!");
        setImagePreviews([]);
        reset();
        // navigate("/dashboard/organizer/manage-camps");
      }
    } catch (err) {
      console.error(err);
      toastError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      {...fadeIn(0.1)}
      className="w-full mx-auto px-4 py-6 bg-white rounded-2xl lexend"
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-rose-500">
        <ClipboardSignature className="inline mr-2" /> Add a New Medical Camp
        Post
      </h2>

      <form
        onSubmit={handleSubmit(handleAddCamp)}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs md:text-sm"
      >
        {/* Camp Name */}
        <div>
          <label className="label">
            Camp Name <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <UserPlus size={18} className="text-gray-500" />
            <input
              type="text"
              {...register("campName", { required: true })}
              className="input input-bordered w-full focus:outline-none focus:border-rose-500 focus:ring-rose-500 transition-all duration-300  rounded-full"
              placeholder="Enter camp name"
            />
          </div>
          {errors.campName && (
            <p className="text-red-500 text-sm">Camp name is required</p>
          )}
        </div>

        {/* Healthcare Professional */}
        <div>
          <label className="label">
            Healthcare Professional <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <UserCheck size={18} className="text-gray-500" />
            <input
              type="text"
              {...register("doctorName", { required: true })}
              className="input input-bordered w-full focus:outline-none focus:border-rose-500 focus:ring-rose-500 transition-all duration-300  rounded-full"
              placeholder="Doctor Name"
            />
          </div>
          {errors.doctorName && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </div>

        {/* Healthcare Speciality */}
        <div>
          <label className="label">
            Healthcare Speciality <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <UserCheck size={18} className="text-gray-500" />
            <input
              type="text"
              {...register("doctorSpeciality", { required: true })}
              className="input input-bordered w-full focus:outline-none focus:border-rose-500 focus:ring-rose-500 transition-all duration-300  rounded-full"
              placeholder="Speciality"
            />
          </div>
          {errors.doctorName && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </div>

        {/* Camp Fees */}
        <div>
          <label className="label">
            Camp Fees <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <TbCoinTaka size={26} className="text-gray-500" />
            <input
              type="number"
              step="any"
              {...register("fees", { required: true })}
              className="input input-bordered w-full focus:outline-none focus:border-rose-500 focus:ring-rose-500 transition-all duration-300  rounded-full"
              placeholder="1234"
            />
          </div>
          {errors.fees && (
            <p className="text-red-500 text-sm">Camp fee is required</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="label">
            Venue Location <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-gray-500" />
            <input
              type="text"
              {...register("venue", { required: true })}
              className="input input-bordered w-full focus:outline-none focus:border-rose-500 focus:ring-rose-500 transition-all duration-300  rounded-full"
              placeholder="Enter location"
            />
          </div>
          {errors.location && (
            <p className="text-red-500 text-sm">Location is required</p>
          )}
        </div>

        {/* Date & Time */}
        <div>
          <label className="label">
            Date & Time <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-gray-500" />
            <div className="w-full">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                showTimeSelect
                timeIntervals={15}
                dateFormat="dd/MM/yyyy HH:mm"
                className="input input-bordered w-full focus:outline-none focus:border-rose-500 focus:ring-rose-500 transition-all duration-300 rounded-full"
                placeholderText="Select date and time"
              />
            </div>
          </div>
          {errors.eventDateTime && (
            <p className="text-red-500 text-sm">Date & Time is required</p>
          )}
        </div>

        {/* Max Participant Limit (extra) */}
        <div>
          <label className="label">Total Participants </label>
          <div className="flex items-center gap-2">
            <Users size={18} className="text-gray-500" />
            <input
              type="number"
              {...register("maxParticipants")}
              className="input input-bordered w-full focus:outline-none focus:border-rose-500 focus:ring-rose-500 transition-all duration-300  rounded-full"
              placeholder="Optional limit"
            />
          </div>
        </div>

        {/* Duration (extra field) */}
        <div>
          <label className="label">Camp Duration</label>
          <div className="flex items-center gap-2">
            <Clock4 size={18} className="text-gray-500" />
            <input
              type="text"
              {...register("duration")}
              className="input input-bordered w-full focus:outline-none focus:border-rose-500 focus:ring-rose-500 transition-all duration-300  rounded-full"
              placeholder="e.g., 3 hours, full day"
            />
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <label className="label">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full rounded-full"
          />

          {/* Preview */}
          {imagePreviews.length > 0 && (
            <div className="lg:absolute w-fit flex flex-wrap gap-3 mt-4">
              {imagePreviews.map((img, index) => (
                <div
                  key={index}
                  className="border border-zinc-300 rounded-lg p-2 flex flex-col items-center"
                >
                  <img
                    src={img.preview}
                    alt={`Preview ${index}`}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <select
                    className="mt-2 select select-xs select-bordered w-full border-rose-500  focus:outline-none focus:border-rose-500 focus:ring-rose-500 transition-all duration-300"
                    value={img.category}
                    onChange={(e) => {
                      const updated = [...imagePreviews];
                      updated[index].category = e.target.value;
                      setImagePreviews(updated);
                    }}
                  >
                    <option>Banner</option>
                    <option>Doctor</option>
                    <option>Other</option>
                  </select>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="label">
            Camp Description <span className="text-red-500">*</span>
          </label>
          <div className="flex items-start gap-2">
            <AlignLeft size={18} className="text-gray-500 mt-2" />
            <textarea
              {...register("description", { required: true })}
              className="textarea textarea-bordered w-full h-32 focus:outline-none focus:border-rose-500 focus:ring-rose-500 transition-all duration-300  rounded-lg"
              placeholder="Write a short description about the camp"
            />
          </div>
          {errors.description && (
            <p className="text-red-500 text-sm">Description is required</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="col-span-3 flex justify-center items-center py-2 ">
          <SecondaryBtn
            type="submit"
            label={loading ? "Creating..." : "Add Camp"}
            icon={Plus}
            loading={loading}
            iconClassName="group-hover:rotate-0"
            className="flex justify-center items-center py-2"
          />
        </div>
      </form>
    </motion.div>
  );
};

export default AddCamp;
