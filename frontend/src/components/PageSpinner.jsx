import React from "react";

export default function PageSpinner({ label = "Loading..." }) {
  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-[#FFF6DE]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#681F00] mx-auto mb-3" />
        <p className="text-[#0E0100] text-sm">{label}</p>
      </div>
    </div>
  );
}
