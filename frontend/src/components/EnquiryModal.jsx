import React, { useState } from "react";
import { useEnquiry } from "../context/EnquiryContext"; // ✅ import our new context

export default function EnquiryModal({
  isOpen,
  onClose,
  productName,
  productImage,
  productId,
}) {
  const [isAdded, setIsAdded] = useState(false);
  const { addToEnquiry } = useEnquiry(); // ✅ context hook

  if (!isOpen) return null;

  const handleAddToEnquiry = () => {
    addToEnquiry({
      id: productId,
      name: productName,
      image: productImage,
    });
    setIsAdded(true);
    setTimeout(() => {
      onClose();
      setIsAdded(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-[#FFF9E6] border border-[#E2C887]/60 rounded-3xl shadow-lg w-11/12 max-w-md p-8 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-[#5C1D02] hover:text-[#3B1C0A] text-2xl font-bold"
        >
          ×
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center cinzelfont text-[#5C1D02] mb-2">
          Add Product to Enquiry
        </h2>
        <p className="text-center text-sm text-[#3B1C0A] mb-6">
          You can add multiple products and send a combined enquiry later.
        </p>

        {/* Product Info */}
        {productName && (
          <div className="flex items-center gap-4 bg-[#FFF4DC] border border-[#E2C887]/60 p-4 rounded-2xl mb-6">
            {productImage && (
              <img
                src={productImage}
                alt={productName}
                className="w-16 h-20 object-cover rounded-xl border border-[#E2C887]/50"
              />
            )}
            <div>
              <p className="font-semibold text-[#5C1D02]">{productName}</p>
              {productId && (
                <p className="text-sm text-[#3B1C0A]">Model #{productId}</p>
              )}
            </div>
          </div>
        )}

        {/* Add to Enquiry Button */}
        <button
          onClick={handleAddToEnquiry}
          disabled={isAdded}
          className={`w-full bg-gradient-to-r from-[#E2C887] to-[#5C1D02] text-[#FFF9E6] font-semibold py-3 rounded-full shadow-md transition-all duration-300 cursor-pointer ${
            isAdded
              ? "opacity-70 cursor-not-allowed"
              : "hover:scale-[1.02]"
          }`}
        >
          {isAdded ? "Added to Enquiry ✅" : "Add to Enquiry →"}
        </button>

        {/* Go to Enquiry Cart link */}
        <div className="text-center mt-4">
          <a
            href="/enquiry"
            className="text-[#5C1D02] font-medium hover:underline"
          >
            View Enquiry Cart
          </a>
        </div>
      </div>
    </div>
  );
}
