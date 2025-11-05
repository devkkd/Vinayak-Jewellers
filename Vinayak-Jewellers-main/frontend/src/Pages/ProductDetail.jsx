import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { goldProducts } from "../data/goldJewelleryProducts";
import ContactSection from "../components/ContactSection";
import EnquiryModal from "../components/EnquiryModal";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // 🔹 Fetch product from local data
  useEffect(() => {
    const foundProduct = goldProducts.find((p) => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-[#681F00]">
          Loading jewellery details...
        </h2>
      </div>
    );
  }

  return (
    <section className="bg-[#FFF6DE] py-16 px-4 sm:px-6 md:px-12 min-h-screen">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-16">
        {/* LEFT - IMAGE */}
        <div className="flex justify-center items-center">
          <div className="overflow-hidden rounded-2xl shadow-lg w-full max-w-md bg-[#FFF4DC] flex justify-center items-center ">
            <img
              src={product.image}
              alt={product.name}
              className="w-[440px] h-[500px] object-cover transform transition-transform duration-500 hover:scale-110"
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
            This exquisite piece from our gold collection is crafted to add a
            touch of elegance and luxury to your style. Perfect for any
            occasion, it’s designed with attention to every detail.
          </p>

          <div className="pt-2">
            <button
              onClick={openModal}
              className="bg-[#681F00] text-white px-6 py-2 rounded-full hover:bg-[#5a2b1a] transition"
            >
              Enquiry Now →
            </button>

            <button
              onClick={() => navigate("/gold")}
              className="ml-3 bg-gray-300 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-400 transition"
            >
              Back to Gold
            </button>
          </div>
        </div>
      </div>

      <ContactSection />

      {modalOpen && (
        <EnquiryModal
          isOpen={modalOpen}
          onClose={closeModal}
          productName={product.name}
        />
      )}
    </section>
  );
}
