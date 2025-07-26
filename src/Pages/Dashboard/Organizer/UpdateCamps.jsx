import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  AlignLeft,
  Calendar,
  ClipboardSignature,
  Clock4,
  MapPin,
  Plus,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { fadeIn } from "../../../Utility/animation";
import SecondaryBtn from "../../../Shared/Button/SecondaryBtn";
import { TbCoinTaka } from "react-icons/tb";
import { RxUpdate } from "react-icons/rx";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const UpdateCamps = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [selectedDate, setSelectedDate] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch data
  useEffect(() => {
    axiosSecure.get(`/update-camp/${id}`).then((res) => {
      const camp = res.data.data;
      if (camp) {
        setValue("campName", camp.campName);
        setValue("doctorName", camp.doctorName);
        setValue("doctorSpeciality", camp.doctorSpeciality);
        setValue("fees", camp.fees);
        setValue("venue", camp.venue);
        setValue("duration", camp.duration);
        setValue("maxParticipants", camp.maxParticipants);
        setValue("description", camp.description);
        setSelectedDate(new Date(camp.eventDateTime));
        setImagePreviews(
          (camp.images || []).map((img) => ({
            preview: img.url,
            category: img.category,
            deleteUrl: img.deleteUrl || "",
          }))
        );
      }
    });
  }, [axiosSecure, id, setValue]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      preview: URL.createObjectURL(file),
      file,
      category: "Banner",
    }));
    setImagePreviews(previews);
  };

  const handleUpdate = async (data) => {
    setLoading(true);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to update this camp!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    });

    if (!result.isConfirmed) return;

    try {
      const uploadedImages = [];

      for (const item of imagePreviews) {
        if (!item.file || item.preview.startsWith("http")) {
          uploadedImages.push({
            url: item.preview,
            category: item.category,
            ...(item.deleteUrl && { deleteUrl: item.deleteUrl }),
          });
          continue;
        }

        const formData = new FormData();
        formData.append("image", item.file);

        const res = await axiosPublic.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_key}`,
          formData
        );

        if (res.data.success) {
          uploadedImages.push({
            url: res.data.data.url,
            deleteUrl: res.data.data.delete_url,
            category: item.category,
          });
        }
      }

      const updatedCamp = {
        ...data,
        eventDateTime: selectedDate,
        images: uploadedImages,
      };

      const response = await axiosSecure.put(`/update-camp/${id}`, updatedCamp);

      if (response.data.message === "No changes detected.") {
        Swal.fire({
          icon: "info",
          title: "No Changes Detected!",
          text: "Everything is already up to date.",
        });
      } else if (response.data.message === "Camp updated successfully.") {
        Swal.fire({
          icon: "success",
          title: "Camp Updated Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed!",
          text: "Something went wrong.",
        });
      }
    } catch (error) {
      console.error("Update Error:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed!",
        text: "Something went wrong while updating.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      {...fadeIn(0.1)}
      className="w-full mx-auto p-8 bg-white rounded-2xl lexend overflow-x-auto"
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-rose-500">
        <ClipboardSignature className="inline mr-2" /> Update Medical Camp
      </h2>

      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs md:text-sm"
      >
        {/* Camp Name */}
        <div>
          <label className="label">
            Camp Name <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <UserPlus size={18} className="text-gray-500" />
            <input
              {...register("campName", { required: true })}
              placeholder="Enter camp name"
              className="input input-bordered w-full focus:outline-none focus:border-rose-500 focus:ring-rose-500 transition-all duration-300  rounded-full"
            />
          </div>
        </div>

        {/* Doctor Name */}
        <div>
          <label className="label">
            Healthcare Professional <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <UserCheck size={18} className="text-gray-500" />
            <input
              {...register("doctorName", { required: true })}
              placeholder="Doctor Name"
              className="input input-bordered w-full focus:outline-none focus:border-rose-500 focus:ring-rose-500 transition-all duration-300  rounded-full"
            />
          </div>
        </div>

        {/* Doctor Speciality */}
        <div>
          <label className="label">
            Specialized <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <UserCheck size={18} className="text-gray-500" />
            <input
              {...register("doctorSpeciality", { required: true })}
              placeholder="Doctor Speciality"
              className="input input-bordered w-full focus:outline-none focus:border-rose-500 focus:ring-rose-500 transition-all duration-300  rounded-full"
            />
          </div>
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
              placeholder="1234"
              className="input input-bordered w-full focus:outline-none focus:border-rose-500 focus:ring-rose-500 transition-all duration-300  rounded-full"
            />
          </div>
        </div>

        {/* Venue */}
        <div>
          <label className="label">
            Venue Location <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-gray-500" />
            <input
              {...register("venue", { required: true })}
              placeholder="Enter location"
              className="input input-bordered w-full focus:outline-none focus:border-rose-500 focus:ring-rose-500 transition-all duration-300  rounded-full"
            />
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="label">
            Date & Time <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-gray-500" />
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

        {/* Max Participants */}
        <div>
          <label className="label">Total Participants</label>
          <div className="flex items-center gap-2">
            <Users size={18} className="text-gray-500" />
            <input
              type="number"
              {...register("maxParticipants")}
              placeholder="Optional limit"
              className="input input-bordered w-full focus:outline-none focus:border-rose-500 focus:ring-rose-500 transition-all duration-300  rounded-full"
            />
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="label">Camp Duration</label>
          <div className="flex items-center gap-2">
            <Clock4 size={18} className="text-gray-500" />
            <input
              {...register("duration")}
              placeholder="e.g. 3 hours"
              className="input input-bordered w-full focus:outline-none focus:border-rose-500 focus:ring-rose-500 transition-all duration-300  rounded-full"
            />
          </div>
        </div>

        {/* Images */}
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

          {imagePreviews.length > 0 && (
            <div className=" mt-4 flex flex-wrap gap-2 h-fit md:h-fit overflow-y-auto relative lg:absolute lg:left-0  lg:w-fit">
              {imagePreviews.map((img, index) => (
                <div
                  key={index}
                  className="border border-transparent rounded-lg p-1 flex flex-col items-center hover:border-rose-500 transition-all duration-300 group bg-white shadow-sm"
                >
                  <img
                    src={img.preview}
                    alt={`Preview ${index}`}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <select
                    className="mt-2 select select-xs w-full border border-transparent rounded-full group-hover:border-rose-500 transition-all duration-300 focus:outline-none"
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
        <div className="md:col-span-2 ">
          <label className="label">
            Camp Description <span className="text-red-500">*</span>
          </label>
          <div className="flex items-start gap-2">
            <AlignLeft size={18} className="text-gray-500 mt-2" />
            <textarea
              {...register("description", { required: true })}
              className="textarea textarea-bordered w-full h-32 focus:outline-none focus:border-rose-500 focus:ring-rose-500 transition-all duration-300 rounded-lg"
              placeholder="Write a short description about the camp"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center py-2">
          <SecondaryBtn
            type="submit"
            label={loading ? "Updating..." : "Update Camp"}
            icon={RxUpdate}
            loading={loading}
            iconClassName="group-hover:rotate-0"
            className="flex justify-center items-center py-2"
          />
        </div>
      </form>
    </motion.div>
  );
};

export default UpdateCamps;
