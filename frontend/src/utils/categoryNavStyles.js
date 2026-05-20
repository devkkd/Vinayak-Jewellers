import { segmentsMatch } from "./productFilter";

/** Shared pill styles for collection category / subcategory filters */

export const matchesUrlSegment = (label, urlSegment) => segmentsMatch(label, urlSegment);
export const categoryPillClass = (isActive) =>
  [
    "px-4 py-2 rounded-full text-sm sm:text-base transition-all duration-200 cursor-pointer",
    isActive
      ? "bg-[#681F00] text-[#FFE9A8] border-2 border-[#E2C887] font-semibold shadow-md scale-[1.02]"
      : "bg-[#FAEED1] text-[#681F00] border border-[#E2C887]/80 font-medium hover:bg-[#F8D89C] hover:border-[#681F00] hover:shadow-sm hover:scale-[1.02] active:scale-95",
  ].join(" ");

export const subcategoryPillClass = (isActive) =>
  [
    "px-3 py-1.5 text-xs sm:text-sm rounded-full transition-all duration-200 cursor-pointer",
    isActive
      ? "bg-[#681F00] text-[#FFE9A8] border-2 border-[#E2C887] font-semibold shadow-md"
      : "bg-[#FAEED1] text-[#681F00] border border-[#E2C887]/80 font-medium hover:bg-[#F8D89C] hover:border-[#681F00] hover:text-[#3B1C0A] hover:shadow-sm hover:scale-[1.03] active:scale-95",
  ].join(" ");
