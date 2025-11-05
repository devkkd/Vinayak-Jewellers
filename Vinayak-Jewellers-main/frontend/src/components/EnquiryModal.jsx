import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { submitEnquiry } from "../api/enquiryAPI";

export default function EnquiryModal({
  isOpen,
  onClose,
  productName,
  productImage,
  productId,
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to backend API first
      if (productId) {
        try {
          await submitEnquiry({
            name: formData.name,
            phone: formData.phone,
            productId,
            productName: productName || "",
            productImage: productImage || "",
          });
        } catch (apiError) {
          console.error("Backend API error:", apiError);
          // Continue with email even if API fails
        }
      }

      // Also send email via EmailJS
      const templateParams = {
        name: formData.name,
        phone: formData.phone,
        product_name: productName || "",
        product_id: productId || "",
        product_image: productImage || "",
        product_link: window.location.href,
      };

      await emailjs.send(
        "service_fmzp73s",
        "template_0nhj3sp",
        templateParams,
        "HW_6DYxtpYO4wBKfm"
      );

      alert("✅ Enquiry sent successfully!");
      setFormData({ name: "", phone: "" });
      setIsSubmitting(false);
      onClose();
    } catch (error) {
      console.error(error);
      alert("❌ Failed to send enquiry. Please try again later.");
      setIsSubmitting(false);
    }
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
          Enquiry for Product
        </h2>
        <p className="text-center text-sm text-[#3B1C0A] mb-6">
          Our specialists will contact you shortly to assist with your enquiry.
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
              {productId && <p className="text-sm text-[#3B1C0A]">Model #{productId}</p>}
            </div>
          </div>
        )}

        {/* Enquiry Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="text-[#3B1C0A] mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border border-[#E2C887]/60 px-4 py-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#E2C887]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[#3B1C0A] mb-1 font-medium">
              Mobile / WhatsApp Number
            </label>
            <input
              type="text"
              name="phone"
              placeholder="Enter Your Mobile Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="border border-[#E2C887]/60 px-4 py-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#E2C887]"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-gradient-to-r from-[#E2C887] to-[#5C1D02] text-[#FFF9E6] font-semibold py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer ${
              isSubmitting
                ? "opacity-70 cursor-not-allowed"
                : "hover:scale-[1.02]"
            }`}
          >
            {isSubmitting ? "Sending..." : "Enquiry Now →"}
          </button>
        </form>
      </div>
    </div>
  );
}
