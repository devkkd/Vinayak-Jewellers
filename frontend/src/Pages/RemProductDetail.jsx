import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ContactSection from "../components/ContactSection";
import EnquiryModal from "../components/EnquiryModal";

/**
 * 🧩 Reusable local product detail component
 * Works for: Gold, Silver, Diamond, Wedding, Gifting, Collections, etc.
 * Props:
 * - dataSource → array of products (local data file)
 * - categoryName → display name (e.g., "Gold Jewellery")
 * - backPath → page route to go back (e.g., "/gold")
 */
export default function RemProductDetail({ dataSource, categoryName, backPath }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const foundProduct = dataSource.find((p) => p.id === parseInt(id));
    setProduct(foundProduct || null);
  }, [id, dataSource]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold text-[#681F00]">
        Loading {categoryName} details...
      </div>
    );
  }

  return (
    <section className="bg-[#FFF6DE] py-16 px-4 sm:px-6 md:px-12 min-h-screen">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-16">
        {/* LEFT - IMAGE */}
        <div className="flex justify-center items-center">
          <div className="overflow-hidden rounded-2xl shadow-lg w-full max-w-md flex justify-center items-center ">
            <img
              src={product.image}
              alt={product.name}
              className="w-[440px] h-[480px] object-cover transform transition-transform duration-500 hover:scale-110 rounded-2xl"
            />
          </div>
        </div>

        {/* RIGHT - DETAILS */}
        <div className="bg-[#FAEED1] rounded-2xl shadow-md p-8 space-y-6">
          <h2 className="text-3xl font-bold text-[#0E0100]">{product.name}</h2>

          <p className="text-[#681F00] font-medium">
            Category:{" "}
            <span className="text-[#0E0100]">
              {product.category}
              {product.subcategory ? ` → ${product.subcategory}` : ""}
            </span>
          </p>

          <p className="text-[#0E0100] text-sm leading-relaxed">
            This exquisite piece from our {categoryName.toLowerCase()} collection
            is crafted with precision and elegance to suit every occasion.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-[#681F00] text-white px-6 py-2 rounded-full hover:bg-[#5a2b1a] transition"
            >
              Enquiry Now →
            </button>

            <button
              onClick={() => navigate(backPath)}
              className="ml-3 bg-gray-300 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-400 transition"
            >
              Back to {categoryName}
            </button>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <ContactSection />

      {/* Enquiry Modal */}
      {modalOpen && (
        <EnquiryModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          productName={product.name}
        />
      )}
    </section>
  );
}
