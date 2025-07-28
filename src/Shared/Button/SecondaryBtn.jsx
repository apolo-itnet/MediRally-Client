import React from "react";
import { ArrowRight } from "lucide-react";

const SecondaryBtn = ({
  label = "",
  icon: IconComponent = ArrowRight,
  iconProps = { size: 16 },
  iconBg = "bg-pink-700",
  onClick,
  type = "button",
  className = "",
  btnClassName = "",
  iconClassName = "",
  disabled = false,
  showIcon = true,
  iconPosition = "right", // new
  loading = false, // optional future use
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      aria-label={label}
      className={`cursor-pointer group relative bg-pink-700 hover:bg-pink-800 text-white text-sm font-semibold nunito px-4 py-1 rounded-full transition-all duration-200 ease-in-out shadow hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed ${btnClassName} ${className}`}
    >
      <div className="relative flex items-center justify-center gap-2">
        {showIcon && iconPosition === "left" && !loading && IconComponent && (
          <span
            className={`transition-transform duration-200 ${iconBg} group-hover:-rotate-45 p-2 rounded-full ${iconClassName}`}
          >
            <IconComponent {...iconProps} />
          </span>
        )}

        <span className="relative inline-block overflow-hidden">
          <span className="block transition-transform duration-300">
            {label}
          </span>
        </span>

        {showIcon && iconPosition === "right" && !loading && IconComponent && (
          <span
            className={`transition-transform duration-200 ${iconBg} group-hover:-rotate-45 p-2 rounded-full ${iconClassName}`}
          >
            <IconComponent {...iconProps} />
          </span>
        )}

        {loading && (
          <span className="w-4 h-4 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
        )}
      </div>
    </button>
  );
};

export default SecondaryBtn;
