import { ArrowRight } from "lucide-react";
import React from "react";

const SecondaryBtn = ({
  label = "Your Text",
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
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`cursor-pointer group relative bg-pink-700 hover:bg-pink-800 text-white text-sm font-semibold px-4 py-1 rounded-full transition-all duration-200 ease-in-out shadow hover:shadow-sm ${btnClassName} ${className}`}
    >
      <div className="relative flex items-center justify-center gap-2">
        <span className="relative inline-block overflow-hidden">
          <span className="block transition-transform duration-300">
            {label}
          </span>
        </span>
        {showIcon && IconComponent && (
          <span
            className={`transition-transform duration-200 ${iconBg} group-hover:-rotate-45 p-2 rounded-full ${iconClassName}`}
          >
            <IconComponent {...iconProps} />
          </span>
        )}
      </div>
    </button>
  );
};

export default SecondaryBtn;