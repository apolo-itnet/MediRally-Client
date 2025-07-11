import React from "react";

const PrimaryBtn = ({
  label = "Your Text",
  altLabel = "Here",
  icon,
  iconBg = "bg-zinc-300",
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) => {
  const baseClasses = `cursor-pointer group relative bg-white hover:bg-zinc-100 text-sm px-3 py-1 rounded-full transition-all duration-200 ease-in-out shadow hover:shadow-sm`;

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${baseClasses} ${className}`}
    >
      <div className="relative flex items-center justify-center gap-2">
        <span className="relative inline-block overflow-hidden">
          <span className="block transition-transform duration-300 group-hover:-translate-y-full">
            {label}
          </span>
          <span className="absolute inset-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0">
            {altLabel}
          </span>
        </span>
        {icon && (
          <span
            className={`transition-transform duration-200 group-hover:-rotate-45 p-2 rounded-full ${iconBg}`}
          >
            {icon}
          </span>
        )}
      </div>
    </button>
  );
};

export default PrimaryBtn;
