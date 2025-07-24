// Login.jsx
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Mail, LockKeyhole, Eye, EyeOff, Loader2 } from "lucide-react";
import useAuth from "../Hooks/useAuth";
import { toastError, toastSuccess } from "../Utility/toastmsg";
import SecondaryBtn from "../Shared/Button/SecondaryBtn";
import SocialLogin from "../Shared/SocialLogin";

const SignIn = () => {
  const { signIn, signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    setLoading(true);
    try {
      await signIn(email, password);
      toastSuccess("Login successful");
      reset();
      navigate(from, { replace: true });
    } catch (err) {
      toastError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const gResult = await signInWithGoogle();
      toastSuccess("Successfully signed up in Google!");
      navigate(location.state?.from || "/", { replace: true });
    } catch (error) {
      console.error("Google Sign-In error:", error);
      toastError(`Google Sign-In failed: ${error.message}`);
    }
  };

  const inputStyle =
    "flex items-center gap-3 px-4 py-3 bg-transparent rounded-lg border border-gray-200 transition duration-500 focus-within:border-fuchsia-800/50  outline-none w-full text-gray-700 placeholder:text-gray-500";

  const labelStyle = "label-text font-medium flex items-center gap-2";

  return (
    <div className="h-screen[calc(100vh-80px)] flex flex-col md:flex-row items-center justify-center gap-10 px-4 py-12 bg-base-100">
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center md:text-left md:w-1/2 space-y-5"
      >
        <h2 className="text-4xl font-bold text-primary">Welcome Back</h2>
        <p className="text-lg text-base-content">
          Log in to access your account and continue enjoying our platform.
        </p>
      </motion.div>

      {/* Login Form */}
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="md:w-1/2 bg-white p-6 rounded-xl shadow-lg space-y-4 w-full max-w-md"
      >

        {/* Google Login */}
        <SocialLogin handleGoogleLogin={handleGoogleLogin} />

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
            })}
          />
          {errors.email && (
            <p className="text-error text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="form-control relative">
          <label className="label">
            <span className={labelStyle}>
              <LockKeyhole size={18} /> Password
            </span>
          </label>
          <div className="relative flex items-center gap-3">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={inputStyle}
              {...register("password", {
                required: "Password is required",
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

        {/* Submit */}
        <SecondaryBtn
          label={loading ? "Logging in..." : "Login"}
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2"
        >
          {loading && <Loader2 className="animate-spin" size={18} />}
          {loading ? "Logging in..." : "Login"}
        </SecondaryBtn>
      </motion.form>
    </div>
  );
};

export default SignIn;
