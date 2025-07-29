import React, { use } from "react";
import { useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import { toastError, toastSuccess } from "../Utility/toastmsg";

const SocialLogin = ({ from }) => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Function to handle Google login
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      toastSuccess("Successfully signed up in Google!");
      navigate(from || "/");
    } catch (error) {
      console.error("Google login error:", error);
      toastError(`Google login failed: ${error.message}`);
    }
  };

  return (
    <div>
      {/* Social Login Button */}
      <div className="flex flex-col gap-2 font-light lexend text-xs">
        {/* Google */}
        <button onClick={handleGoogleLogin} className="btn py-5 bg-transparent">
          <img
            src={
              "https://i.postimg.cc/zXtwGs8Y/google-favicon-logo-brandlogos-net-cgzfg-512x524.png"
            }
            alt="g_logo"
            className="w-6 h-6 object-cover"
          />
          Login with Google
        </button>

        {/* Facebook */}
        <button className="btn py-5 bg-transparent disabled ">
          <img
            src={
              "https://i.postimg.cc/YS1tdwC5/facebook-logo-brandlogos-net-xmmz9-512x513.png"
            }
            alt="fb_logo"
            className="w-6 h-6 object-cover"
          />
          Login with Facebook
        </button>
      </div>

      {/* Divider */}
      <div className="flex w-full flex-col">
        <div className="divider">OR</div>
      </div>
    </div>
  );
};

export default SocialLogin;
