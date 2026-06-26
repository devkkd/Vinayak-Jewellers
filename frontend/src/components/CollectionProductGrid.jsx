import React from "react";
import { useNavigate } from "react-router-dom";

/** Shared product grid — lazy images + loading skeleton */
export default function CollectionProductGrid({
  products,
  loading,
  onEnquiry,
  imageClassName = "w-full h-full object-cover hover:scale-105 transition-transform duration-500",
  imageBoxClassName = "w-full bg-[#FFF4DC] h-[360px] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex justify-center items-center",
}) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center py-16 mb-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#681F00] mx-auto mb-3" />
          <p className="text-[#0E0100] text-sm">Loading products...</p>
        </div>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center text-[#0E0100] py-10 font-medium mb-20">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto mb-20">
      {products.map((product) => {
        const primaryImage =
          product.images?.length > 0 ? product.images[0] : product.image || "";

        return (
          <div key={product._id} className="flex flex-col h-full">
            <div
              onClick={() => navigate(`/backend-product/${product._id}`)}
              className={imageBoxClassName}
            >
              {primaryImage ? (
                <img
                  src={primaryImage}
                  alt={product.productName}
                  loading="lazy"
                  decoding="async"
                  className={imageClassName}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No image
                </div>
              )}
            </div>
            <div className="flex flex-col flex-grow mt-4">
              <h4 className="text-sm text-[#0E0100] mb-3 font-medium tracking-wide flex-grow">
                {product.productName}
              </h4>
              <button
                type="button"
                onClick={() => onEnquiry(product)}
                className="bg-[#681F00] text-white text-xs md:text-sm px-5 py-2 rounded-full hover:bg-[#5a2b1a] transition-colors duration-300 cursor-pointer w-full sm:w-auto"
              >
                Enquiry Now →
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
