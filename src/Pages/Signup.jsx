import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useState } from "react";
import { UserRoundPen, Mail, LockKeyhole, Eye, EyeOff, Loader2 } from "lucide-react";
import axios from "axios";
import { toastError, toastSuccess } from "../Utility/toastmsg";
import useAuth from "../Hooks/useAuth";
import SecondaryBtn from "../Shared/Button/SecondaryBtn";
import { useLocation, useNavigate } from "react-router";

const SignUp = () => {
  const { registerUser, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const form = location.state?.form?.pathname || "/";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { fullName, email, password, image, role } = data;
    setLoading(true);

    const formData = new FormData();
    formData.append("image", image[0]);

    try {
      const imgbbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_key}`,
        formData
      );
      const photoURL = imgbbRes.data.data.url;

      if (!registerUser || !updateUserProfile) {
        throw new Error("registerUser function not defined in AuthContext");
      }

      const userCredential = await registerUser(email, password);
      await updateUserProfile(fullName, photoURL);

      toastSuccess("Successfully Signed Up!");
      reset();
      navigate(form, { replace: true });
    } catch (error) {
      toastError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "flex items-center gap-3 px-4 py-3 bg-transparent rounded-lg border border-gray-200 transition duration-500 focus-within:border-fuchsia-800/50  outline-none w-full text-gray-700 placeholder:text-gray-500";

  const labelStyle = "label-text font-medium flex items-center gap-2";

  return (
    <div className="h-screen[calc(100vh-80px)] flex flex-col md:flex-row items-center justify-center gap-10 px-4 py-12 bg-base-100 nunito">
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center md:text-left md:w-1/2 space-y-5"
      >
        <h2 className="text-4xl font-bold text-primary">Create Your Account</h2>
        <p className="text-lg text-base-content">
          Join our community and start your journey with exclusive benefits. It
          only takes a minute to sign up!
        </p>
      </motion.div>

      {/* Signup Form */}
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="md:w-1/2 bg-white p-6 rounded-xl shadow-lg space-y-4 w-full max-w-md"
      >
        {/* Full Name */}
        <div className="form-control">
          <label className="label">
            <span className={labelStyle}>
              <UserRoundPen size={18} /> Full Name
            </span>
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            className={inputStyle}
            {...register("fullName", {
              required: "Name is required",
              minLength: {
                value: 5,
                message: "Name must be at least 5 characters",
              },
            })}
          />
          {errors.fullName && (
            <p className="text-error text-sm mt-1">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="form-control">
          <label className="label">
            <span className={labelStyle}>
              <Mail size={18} /> Email
            </span>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className={inputStyle}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <p className="text-error text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Role Radio Buttons */}
        <div className="form-control">
          <label className="label">
            <span className={labelStyle}>👤 Select Role</span>
          </label>
          <div className="flex gap-4 py-3">
            <label className="flex items-center gap-2 cursor-pointer border border-gray-200 p-2 rounded-lg">
              <input
                type="radio"
                value="Organizer"
                {...register("role", { required: "Role is required" })}
                className="radio radio-primary"
              />
              <span>Organizer</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer border border-gray-200 p-2 rounded-lg">
              <input
                type="radio"
                value="Participant"
                {...register("role", { required: "Role is required" })}
                className="radio radio-primary"
              />
              <span>Participant</span>
            </label>
          </div>
          {errors.role && (
            <p className="text-error text-sm mt-1">{errors.role.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="form-control relative">
          <label className="label">
            <span className={labelStyle}>
              <LockKeyhole size={18} /> Password
            </span>
          </label>
          <div className="flex items-center gap-3">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={inputStyle}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                validate: {
                  upper: (v) =>
                    /[A-Z]/.test(v) || "Must include an uppercase letter",
                  lower: (v) =>
                    /[a-z]/.test(v) || "Must include a lowercase letter",
                  number: (v) => /[0-9]/.test(v) || "Must include a number",
                  special: (v) =>
                    /[!@#$%^&*]/.test(v) || "Must include a special character",
                },
              })}
            />
            <div
              className="border border-gray-200 rounded-lg p-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </div>
          </div>
          {errors.password && (
            <p className="text-error text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="form-control relative">
          <label className="label">
            <span className={labelStyle}>
              <LockKeyhole size={18} /> Confirm Password
            </span>
          </label>
          <div className="flex items-center gap-3">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className={inputStyle}
              {...register("confirmPassword", {
                required: "Please confirm password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            <div
              className="border border-gray-200 rounded-lg p-2 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </div>
          </div>
          {errors.confirmPassword && (
            <p className="text-error text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div className="form-control">
          <label className="label">
            <span className={labelStyle}>🖼️ Profile Picture</span>
          </label>
          <input
            type="file"
            {...register("image", { required: "Profile picture required" })}
            className="file-input file-input-bordered w-full"
            accept="image/*"
          />
          {errors.image && (
            <p className="text-sm text-error mt-1">{errors.image.message}</p>
          )}
        </div>

        <SecondaryBtn
          label={loading ? "Creating..." : "Sign Up"}
          type="submit"
          disabled={loading}
          className="w-full py-3 font-medium flex justify-center items-center gap-2"
        >
          {loading && <Loader2 className="animate-spin" size={18} />}
          {loading ? "Creating..." : "Sign Up"}
        </SecondaryBtn>
      </motion.form>
    </div>
  );
};

export default SignUp;
