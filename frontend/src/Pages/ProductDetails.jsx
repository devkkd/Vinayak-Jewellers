import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/productAPI";
import EnquiryModal from "../components/EnquiryModal";
import ContactSection from "../components/ContactSection";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(id);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        Loading product details...
      </div>
    );
  }

  return (
    <section className="bg-[#FFF6DE] py-16 px-4 sm:px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Left: Image */}
        <div className="bg-[#FFF4DC] p-2 rounded-2xl shadow-sm flex items-center justify-center w-full md:w-1/2">
          <img
            src={product.image}
            alt={product.title}
            className="w-[600px] h-[500px] object-cover rounded-xl"
          />
        </div>

        {/* Right: Details */}
        <div className="flex flex-col items-start w-full md:w-1/2">
          <h2 className="text-3xl font-bold cinzelfont text-[#0E0100] mb-4">
            {product.title}
          </h2>
          <p className="text-lg text-[#5A3B02] mb-4">${product.price}</p>
          <p className="text-[#2E1A08] mb-6 leading-relaxed">{product.description}</p>

          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#681F00] text-white text-sm px-6 py-3 rounded-full hover:bg-[#5a2b1a] transition-colors duration-300"
          >
            Enquiry Now →
          </button>
        </div>
      </div>

      <ContactSection />

      {/* Enquiry Modal */}
      {modalOpen && (
        <EnquiryModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          productName={product.title}
        />
      )}
    </section>
  );
}
