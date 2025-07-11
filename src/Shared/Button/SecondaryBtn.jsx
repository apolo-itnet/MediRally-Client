import React from "react";

const SecondaryBtn = ({
  label = "Your Text",
  altLabel = "Here",
  icon,
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
      className={`cursor-pointer group relative bg-white hover:bg-zinc-100   text-sm px-3 py-1 rounded-full transition-all duration-200 ease-in-out shadow hover:shadow-sm ${className}`}
    >
      <div className="relative flex items-center justify-center gap-2">
        <span className="relative inline-block overflow-hidden">
          <span className="block transition-transform duration-300 ">
            {label}
          </span>
        </span>
        {icon && (
          <span className="transition-transform duration-200 group-hover:-rotate-45 bg-zinc-300 p-2 rounded-full">
            {icon}
          </span>
        )}
      </div>
    </button>
  );
};

export default SecondaryBtn;
