import React, { useEffect, useState } from "react";
import ContactSection from "../components/ContactSection";
import { useNavigate } from "react-router-dom";
import EnquiryModal from "../components/EnquiryModal";
import { listBackendProducts } from "../api/backendProductsAPI";

export default function Mangalsutra() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const list = await listBackendProducts();
        // Filter only gold + Mangalsutra
        const filtered = list.filter(
          (p) => p.category === "Gold" && p.subcategory === "Mangalsutra"
        );
        setProducts(filtered);
      } catch (err) {
        console.error("Error loading products:", err);
      }
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
      {/* Heading */}
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl cinzelfont uppercase font-bold text-[#0E0100] mb-8 tracking-wide">
          Mangalsutra
        </h2>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto mb-20">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="flex flex-col items-start">
              {/* Clickable Image */}
              <div
                onClick={() => navigate(`/product/${product._id}`)}
                className="w-full bg-[#FFF4DC] h-[400px] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.productName}
                  className="w-full h-[400px] object-cover rounded-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Product Details */}
              <div className="w-full mt-4">
                <h4 className="text-sm text-[#0E0100] mb-3 font-medium tracking-wide">
                  {product.productName}
                </h4>
                <button
                  onClick={() => openModal(product)}
                  className="bg-[#681F00] text-white text-xs md:text-sm px-5 py-2 rounded-full hover:bg-[#5a2b1a] transition-colors duration-300 cursor-pointer"
                >
                  Enquiry Now →
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">
            Loading Mangalsutra products...
          </p>
        )}
      </div>

      {/* Contact Section */}
      <ContactSection />

      {/* Enquiry Modal */}
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
