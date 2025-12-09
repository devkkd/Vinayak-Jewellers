import React, { useState } from "react";
import { useEnquiry } from "../context/EnquiryContext";
import emailjs from "@emailjs/browser";
import { submitEnquiry } from "../api/enquiryAPI";

export default function EnquiryCart() {
  const { enquiryItems, removeFromEnquiry, clearEnquiry } = useEnquiry();
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (enquiryItems.length === 0) {
      alert("Please add at least one product to your enquiry.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Send to backend - create one enquiry per product
      for (const item of enquiryItems) {
        await submitEnquiry({
          name: formData.name,
          phone: formData.phone,
          productId: item.id,
          productName: item.name,
          productImage: item.image,
        });
      }

      // Send via EmailJS
      const templateParams = {
        name: formData.name,
        phone: formData.phone,
        product_list: enquiryItems
          .map((p) => `${p.name} (Model: ${p.id})`)
          .join(", "),
      };

      await emailjs.send(
        "service_fmzp73s",
        "template_0nhj3sp",
        templateParams,
        "HW_6DYxtpYO4wBKfm"
      );

      alert("✅ Enquiry sent successfully!");
      clearEnquiry();
      setFormData({ name: "", phone: "" });
    } catch (error) {
      console.error(error);
      alert("❌ Failed to send enquiry. Please try again later.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#5C1D02] mb-6 text-center">
        Your Enquiry Cart
      </h1>

      {enquiryItems.length === 0 ? (
        <p className="text-center text-gray-600">
          No products added yet. Browse and add items to your enquiry.
        </p>
      ) : (
        <>
          <ul className="space-y-4 mb-8">
            {enquiryItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between bg-[#FFF9E6] border border-[#E2C887]/60 p-4 rounded-xl"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg border border-[#E2C887]/60"
                  />
                  <div>
                    <p className="font-semibold text-[#5C1D02]">{item.name}</p>
                    <p className="text-sm text-[#3B1C0A]">Model #{item.id}</p>
                  </div>
                </div>

                <button
                  onClick={() => removeFromEnquiry(item.id)}
                  className="text-red-600 text-lg font-bold hover:scale-110 transition"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>

          <form
            onSubmit={handleSubmit}
            className="bg-[#FFF4DC] border border-[#E2C887]/60 p-6 rounded-2xl shadow-md"
          >
            <h2 className="text-xl font-semibold text-[#5C1D02] mb-4 text-center">
              Contact Information
            </h2>

            <div className="flex flex-col gap-4 mb-4">
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border border-[#E2C887]/60 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E2C887]"
              />
              <input
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="border border-[#E2C887]/60 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E2C887]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-[#E2C887] to-[#5C1D02] text-[#FFF9E6] font-semibold py-3 rounded-full shadow-md transition-all duration-300 ${
                isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:scale-[1.02]"
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Enquiry →"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
