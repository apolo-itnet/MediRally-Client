import React from "react";
import { ArrowRight } from "lucide-react";

const PrimaryBtn = ({
  label = "Your Text",
  altLabel = "Hovered Text",
  icon: IconComponent = ArrowRight,
  iconProps = { size: 16 },
  iconBg = "",
  onClick,
  type = "button",
  className = "",
  btnClassName = "",
  iconClassName = "",
  iconPosition = "right", // left or right
  disabled = false,
  showIcon = true,
  loading = false,
}) => {
  const baseClasses = `cursor-pointer group relative bg-white hover:bg-zinc-100 text-sm px-3 py-1 rounded-full transition-all duration-200 ease-in-out shadow hover:shadow-sm`;

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      aria-label={label}
      className={`${baseClasses} ${btnClassName} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <div className="relative flex items-center justify-center gap-2 nunito font-bold">
        {/* Icon on Left */}
        {showIcon && iconPosition === "left" && IconComponent && !loading && (
          <span
            className={`transition-transform duration-200 group-hover:-rotate-45 p-2 rounded-full ${iconBg} ${iconClassName}`}
          >
            <IconComponent {...iconProps} />
          </span>
        )}

        {/* Label transition */}
        <span className="relative inline-block overflow-hidden w-full">
          <span className="block transition-transform duration-300 group-hover:-translate-y-full">
            {label}
          </span>
          <span className="absolute inset-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0 w-full">
            {altLabel}
          </span>
        </span>

        {/* Icon on Right */}
        {showIcon && iconPosition === "right" && IconComponent && !loading && (
          <span
            className={`transition-transform duration-200 bg-pink-700 text-white group-hover:-rotate-45 p-2 rounded-full ${iconBg} ${iconClassName}`}
          >
            <IconComponent {...iconProps} />
          </span>
        )}

        {/* Spinner if loading */}
        {loading && (
          <span className="w-4 h-4 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin" />
        )}
      </div>
    </button>
  );
};

export default PrimaryBtn;
