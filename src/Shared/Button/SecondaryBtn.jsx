import { ArrowRight } from "lucide-react";
import React from "react";

const SecondaryBtn = ({
  label = "Your Text",
  icon,
  iconBg = "",
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`cursor-pointer group relative bg-pink-700 hover:bg-pink-800 text-white text-sm font-semibold px-4 py-1 rounded-full transition-all duration-200 ease-in-out shadow hover:shadow-sm ${className}`}
    >
      <div className="relative flex items-center justify-center gap-2">
        <span className="relative inline-block overflow-hidden">
          <span className="block transition-transform duration-300 ">
            {label}
          </span>
        </span>
        {icon && (
          <span
            className={`transition-transform duration-200 bg-pink-700 group-hover:-rotate-45 p-2 rounded-full ${iconBg} ${className}`}
          >
           <ArrowRight size={16} />
          </span>
        )}
      </div>
    </button>
  );
};

export default SecondaryBtn;
