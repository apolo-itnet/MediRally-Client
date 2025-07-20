import React from "react";

const Loader = () => {
  return (
    <div className="absolute inset-0 z-50 bg-gray-900/50 gap-2 w-full h-screen flex items-center justify-center">
      <div className="relative w-12 h-12">
        <div
          className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-r-[#0ff] border-b-[#0ff] animate-spin"
          style={{ animationDuration: "3s" }}
        />
        <div
          className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-t-[#0ff] animate-spin"
          style={{ animationDuration: "2s", animationDirection: "reverse" }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0ff]/10 via-transparent to-[#0ff]/5 animate-pulse rounded-full blur-sm" />
    </div>
  );
};

export default Loader;
