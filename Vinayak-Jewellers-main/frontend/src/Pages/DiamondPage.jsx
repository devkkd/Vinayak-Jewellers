import React, { useEffect, useState } from "react";
import ContactSection from "../components/ContactSection";
import { useNavigate } from "react-router-dom";
import EnquiryModal from "../components/EnquiryModal";
import { listBackendProducts } from "../api/backendProductsAPI";

export default function Diamond() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const list = await listBackendProducts();
      setProducts(list);
    };
    load();
  }, []);

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
          Diamond Jewellery
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto mb-20">
        {products.filter(p => p.collection === "Diamond" || p.category === "Diamond").map((product) => {
          // Get primary image - support both images array and single image field
          const primaryImage = (product.images && product.images.length > 0) 
            ? product.images[0] 
            : (product.image || "");
          
          return (
          <div key={product._id} className="flex flex-col items-start">
            <div
              onClick={() => navigate(`/backend-product/${product._id}`)}
              className="w-full bg-[#FFF4DC] h-[400px] rounded-2xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer transition-all duration-300"
            >
              {primaryImage ? (
                <img
                  src={primaryImage}
                  alt={product.productName}
                  className="w-full h-[400px] object-cover rounded-2xl hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-[400px] flex items-center justify-center text-gray-400">
                  No image
                </div>
              )}
            </div>
            <div className="w-full mt-4">
              <h4 className="text-sm text-[#0E0100] mb-3 font-medium tracking-wide">
                {product.productName}
              </h4>
              <button
                onClick={() => openModal(product)}
                className="bg-[#681F00] text-white text-xs md:text-sm px-5 py-2 rounded-full hover:bg-[#5a2b1a] transition-colors duration-300"
              >
                Enquiry Now →
              </button>
            </div>
          </div>
          );
        })}
      </div>

      <ContactSection />

      {selectedProduct && (
        <EnquiryModal
          isOpen={modalOpen}
          onClose={closeModal}
          productName={selectedProduct.productName}
          productId={selectedProduct._id}
          productImage={(selectedProduct.images && selectedProduct.images.length > 0) ? selectedProduct.images[0] : (selectedProduct.image || "")}
        />
      )}
    </section>
  );
}
