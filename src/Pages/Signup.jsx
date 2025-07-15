// Signup.jsx
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useState } from "react";
import { UserRoundPen, Mail, LockKeyhole, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { toastError, toastSuccess } from "../Utility/toastmsg";
import useAuth from "../Hooks/useAuth";

const Signup = () => {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

      if (!auth?.registerUser || !auth?.updateUserProfile) {
        throw new Error("registerUser function not defined in AuthContext");
      }

      const userCredential = await auth.registerUser(email, password);
      await auth.updateUserProfile(fullName, photoURL);

      toastSuccess("Successfully Signed Up!");
    } catch (error) {
      toastError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 px-4 py-12 bg-base-200">
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center md:text-left md:w-1/2 space-y-5"
      >
        <h2 className="text-4xl font-bold text-primary">Create Your Account</h2>
        <p className="text-lg text-base-content">
          Join our community and start your journey with exclusive benefits. It only takes a minute to sign up!
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
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Full Name</span>
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="input input-bordered w-full"
            {...register("fullName", {
              required: "Name is required",
              minLength: {
                value: 5,
                message: "Name must be at least 5 characters",
              },
            })}
          />
          {errors.fullName && <p className="text-error text-sm mt-1">{errors.fullName.message}</p>}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Email</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && <p className="text-error text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Role Select */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Role</span>
          </label>
          <select
            className="select select-bordered w-full"
            {...register("role", {
              required: "Please select a role",
            })}
          >
            <option value="">Select a role</option>
            <option value="Organizer">Organizer</option>
            <option value="Participant">Participant</option>
          </select>
          {errors.role && <p className="text-error text-sm mt-1">{errors.role.message}</p>}
        </div>

        {/* Password */}
        <div className="form-control relative">
          <label className="label">
            <span className="label-text font-medium">Password</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="input input-bordered w-full"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              validate: {
                upper: (v) => /[A-Z]/.test(v) || "Must include an uppercase letter",
                lower: (v) => /[a-z]/.test(v) || "Must include a lowercase letter",
                number: (v) => /[0-9]/.test(v) || "Must include a number",
                special: (v) => /[!@#$%^&*]/.test(v) || "Must include a special character",
              },
            })}
          />
          <div
            className="absolute right-3 top-[30px] cursor-pointer z-10 bg-white p-1"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
          {errors.password && <p className="text-error text-sm mt-1">{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div className="form-control relative">
          <label className="label">
            <span className="label-text font-medium">Confirm Password</span>
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            className="input input-bordered w-full"
            {...register("confirmPassword", {
              required: "Please confirm password",
              validate: (value) => value === watch("password") || "Passwords do not match",
            })}
          />
          <div
            className="absolute right-3 top-[30px] cursor-pointer z-10 bg-white p-1"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
          {errors.confirmPassword && <p className="text-error text-sm mt-1">{errors.confirmPassword.message}</p>}
        </div>

        {/* Image Upload */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Profile Picture</span>
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

        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </motion.form>
    </div>
  );
};

export default Signup;