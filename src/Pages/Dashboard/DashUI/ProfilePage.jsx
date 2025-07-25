import { useState } from "react";
import { motion } from "framer-motion";
import {
  Pencil,
  CalendarDays,
  Mail,
  User,
  Phone,
  Landmark,
  MapPin,
  Globe,
  Calendar,
  BadgePlus,
} from "lucide-react";
import { RxUpdate } from "react-icons/rx";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { slideDown, slideLeft } from "../../../Utility/animation";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import SecondaryBtn from "../../../Shared/Button/SecondaryBtn";

const ProfilePage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [showEdit, setShowEdit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data: userInfo = {}, refetch } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const onSubmit = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to update your profile!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.put(`/users/${user?.email}`, data);
          if (res.data.modifiedCount > 0) {
            Swal.fire("Updated!", "Profile updated successfully.", "success");
            refetch();
            setShowEdit(false);
          }
        } catch (err) {
          console.error(err);
        }
      }
    });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3 overflow-hidden lexend text-sm w-full">
      {/* Read-only Left Card - Mobile Version */}
      <motion.div {...slideLeft(0)} className="flex flex-col items-center justify-center bg-white rounded-2xl shadow p-4 text-center space-y-6 lg:hidden w-full">
        <img
          src={userInfo?.photo || "/avatar.png"}
          alt="profile"
          className="w-32 h-32 object-cover rounded-md mx-auto"
        />
        <div className="space-y-6 flex flex-col items-start w-full">
          <div className="flex flex-col items-start">
            <h2 className="text-xl font-semibold flex justify-center items-center gap-2 text-center">
              <User className="w-5 text-rose-500" />
              {userInfo?.name}
            </h2>
          </div>
          <div>
            <h2 className="text-left font-semibold">Email</h2>
            <p className="text-sm text-gray-500 flex justify-center items-center gap-2">
              <Mail className="w-4 text-rose-500" />
              {userInfo?.email}
            </p>
          </div>
          <div>
            <h1 className="text-left font-semibold">Sign Up Time</h1>
            <p className="text-sm text-gray-500 flex justify-center items-center gap-2">
              <CalendarDays className="w-4 text-rose-500" />
              {new Date(userInfo?.createdAt).toLocaleString()}
            </p>
          </div>
          <div>
            <h1 className="text-left font-semibold">Role</h1>
            <p className="text-sm font-medium capitalize">{userInfo?.role}</p>
          </div>
        </div>
        <SecondaryBtn
          label={showEdit ? "Cancel Edit" : "Edit Profile"}
          icon={Pencil}
          onClick={() => setShowEdit((prev) => !prev)}
        />
      </motion.div>
      {/* Read-only Left Card - desktop version */}
      <motion.div {...slideDown(0)} className="lg:flex justify-between items-center bg-white rounded-2xl shadow p-4 w-full hidden">
        <div>
          <img
            src={userInfo?.photo || "/avatar.png"}
            alt="profile"
            className="w-20 h-20 object-cover rounded-md mx-auto"
          />
        </div>
        <div className="space-y-6 flex justify-around items-start flex-1">
          <SecondaryBtn
            label={showEdit ? "Cancel Edit" : "Edit Profile"}
            icon={Pencil}
            onClick={() => setShowEdit((prev) => !prev)}
          />
          <div className="border shadow-xs border-zinc-100 px-4 py-1 rounded-lg">
            <h1 className="text-center text-xl font-semibold">Hello</h1>
            <h2 className="text-xl font-semibold">{userInfo?.name}</h2>
          </div>
          <div>
            <h2 className="text-left font-semibold">Email</h2>
            <p className="text-sm text-gray-500 flex justify-center items-center gap-2">
              <Mail className="w-4 text-rose-500" />
              {userInfo?.email}
            </p>
          </div>
          <div>
            <h1 className="text-left font-semibold">Sign Up Time</h1>
            <p className="text-sm text-gray-500 flex justify-center items-center gap-2">
              <CalendarDays className="w-4 text-rose-500" />
              {new Date(userInfo?.createdAt).toLocaleString()}
            </p>
          </div>
          <div>
            <h1 className="text-left font-semibold">Role</h1>
            <p className="text-sm font-medium capitalize flex justify-center items-center gap-2">
              <User className="w-5 text-rose-500" />
              {userInfo?.role}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Editable Right Card */}
      {showEdit && (
        <motion.div {...slideLeft(0.1)} className="space-y-4 w-full relative">
          <motion.div
            {...slideLeft(0.2)}
            className="bg-white p-4 rounded-xl shadow"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="relative grid grid-cols-1 lg:grid-cols-3 gap-10 p-4"
            >
              <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* User Info Section */}
                <motion.div {...slideLeft(0.3)}>
                  <h3 className="font-semibold text-lg mb-4">User Info</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="label">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <User size={18} className="text-gray-500" />
                        <input
                          type="text"
                          {...register("name", { required: true })}
                          defaultValue={userInfo?.name}
                          className="input input-bordered w-full focus:outline-none focus:border-rose-500 focus:ring-rose-500 transition-all duration-300  rounded-full"
                          placeholder="Your Name"
                        />
                      </div>
                      {errors.name && (
                        <p className="text-red-500 text-sm">
                          This field is required
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="label">Gender</label>
                      <div className="flex items-center gap-2">
                        <User size={18} className="text-gray-500" />
                        <select
                          {...register("gender")}
                          defaultValue={userInfo?.gender}
                          className="input input-bordered w-full focus:outline-none focus:border-rose-500 focus:ring-rose-500 transition-all duration-300  rounded-full"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="label">Birthdate</label>
                      <div className="flex items-center gap-2">
                        <Calendar size={18} className="text-gray-500" />
                        <input
                          type="date"
                          {...register("birthdate")}
                          defaultValue={userInfo?.birthdate}
                          className="input input-bordered w-full focus:outline-none focus:border-rose-500 focus:ring-rose-500 transition-all duration-300  rounded-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="label">Mobile Number</label>
                      <div className="flex items-center gap-2">
                        <Phone size={18} className="text-gray-500" />
                        <input
                          type="text"
                          {...register("phone")}
                          defaultValue={userInfo?.phone}
                          className="input input-bordered w-full focus:outline-none focus:border-rose-500 focus:ring-rose-500 transition-all duration-300  rounded-full"
                          placeholder="01812345678"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Address Info */}
                <motion.div {...slideLeft(0.4)}>
                  <h3 className="font-semibold text-lg mb-4">Address Info</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="label">City</label>
                      <div className="flex items-center gap-2">
                        <MapPin size={18} className="text-gray-500" />
                        <input
                          type="text"
                          {...register("city")}
                          defaultValue={userInfo?.city}
                          className="input input-bordered w-full focus:outline-none focus:border-rose-500 focus:ring-rose-500 transition-all duration-300  rounded-full"
                          placeholder="City"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="label">State</label>
                      <div className="flex items-center gap-2">
                        <Landmark size={18} className="text-gray-500" />
                        <input
                          type="text"
                          {...register("state")}
                          defaultValue={userInfo?.state}
                          className="input input-bordered w-full focus:outline-none focus:border-rose-500 focus:ring-rose-500 transition-all duration-300  rounded-full"
                          placeholder="State"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="label">Zip Code</label>
                      <div className="flex items-center gap-2">
                        <Mail size={18} className="text-gray-500" />
                        <input
                          type="text"
                          {...register("zip")}
                          defaultValue={userInfo?.zip}
                          className="input input-bordered w-full focus:outline-none focus:border-rose-500 focus:ring-rose-500 transition-all duration-300  rounded-full"
                          placeholder="Zip Code"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="label">Country</label>
                      <div className="flex items-center gap-2">
                        <Globe size={18} className="text-gray-500" />
                        <input
                          type="text"
                          {...register("country")}
                          defaultValue={userInfo?.country}
                          className="input input-bordered w-full focus:outline-none focus:border-rose-500 focus:ring-rose-500 transition-all duration-300  rounded-full"
                          placeholder="Country"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div {...slideLeft(0.1)} className="space-y-4 w-full place-content-center mx-auto">
                {/* Upload Section */}
                <div className="bg-white p-4 rounded-xl shadow">
                  <h3 className="font-semibold text-lg mb-2 text-center">
                    Upload Profile Picture
                  </h3>

                  <div
                    className="border-2 border-dashed border-gray-300 rounded-full w-20 h-20 mx-auto flex items-center justify-center cursor-pointer hover:bg-gray-50"
                    onClick={() =>
                      document.getElementById("profileUpload").click()
                    }
                  >
                    <input
                      id="profileUpload"
                      type="file"
                      accept="image/png, image/jpeg"
                      className="hidden"
                    />
                    <BadgePlus className="text-gray-500" size={28} />
                  </div>
                  <div className="text-center text-xs text-gray-500 my-2">
                    <p>Drag & drop or click to browse </p>
                    <p>— only JPG/JPEG/PNG/WEBP </p>
                    <p>allowed (max. 500kb)</p>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center items-center">
                  <SecondaryBtn
                    type="submit"
                    label="Update Profile"
                    icon={RxUpdate}
                  ></SecondaryBtn>
                </div>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
export default ProfilePage;
