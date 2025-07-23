import { Star } from "lucide-react";
import React from "react";

const RatingStar = ({ filled, onClick, onMouseEnter, onMouseLeave }) => {
  return (
    <div>
      <p className="cursor-pointer bg-teal-800 !p-3 rounded-full group">
        {" "}
        <span className="text-amber-400 group-hover:text-white ease-out duration-300 transition-colors ">
          <Star
            size={20}
            className={`cursor-pointer transition-colors ${
              filled ? "text-amber-400" : "text-base-300"
            }`}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        </span>{" "}
      </p>
    </div>
  );
};

export default RatingStar;