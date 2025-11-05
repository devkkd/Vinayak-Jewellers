import React, { useState } from "react";
import ContactSection from "../components/ContactSection";
import { useNavigate } from "react-router-dom";
import { goldProducts } from "../data/goldJewelleryProducts";
import EnquiryModal from "../components/EnquiryModal";

export default function Festive() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  return (
    <section className="bg-[#FFF6DE] py-16 px-4 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl cinzelfont uppercase font-bold text-[#0E0100] mb-8 tracking-wide">
          Dailywear
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto mb-20">
        {goldProducts.map((product) => (
          <div key={product.id} className="flex flex-col items-start">
            {/* Clickable Image */}
            <div
              onClick={() => navigate(`/product/${product.id}`)}
              className="w-full bg-[#FFF4DC] h-[400px] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[400px] object-cover rounded-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content Below Image */}
            <div className="w-full mt-4">
              <h4 className="text-sm text-[#0E0100] mb-3 font-medium tracking-wide">
                {product.name}
              </h4>
              <button
                onClick={() => openModal(product)}
                className="bg-[#681F00] text-white text-xs md:text-sm px-5 py-2 rounded-full hover:bg-[#5a2b1a] transition-colors duration-300 cursor-pointer"
              >
                Enquiry Now →
              </button>
            </div>
          </div>
        ))}
      </div>

      <ContactSection />

      {/* Enquiry Modal */}
      {selectedProduct && (
        <EnquiryModal
          isOpen={modalOpen}
          onClose={closeModal}
          productName={selectedProduct.name}
          productId={selectedProduct.id || selectedProduct._id}
          productImage={selectedProduct.image || ""}
        />
      )}
    </section>
  );
}
