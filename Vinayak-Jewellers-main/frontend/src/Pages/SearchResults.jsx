import React from "react";
import { useSearch } from "../context/SearchContext";
import { goldProducts } from "../data/goldJewelleryProducts";
import ContactSection from "../components/ContactSection";
import EnquiryModal from "../components/EnquiryModal";

export default function SearchResults() {
  const { searchTerm } = useSearch();
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  const filteredProducts = goldProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm) ||
      (p.subcategory && p.subcategory.toLowerCase().includes(searchTerm))
  );

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  return (
    <section className="bg-[#FFF6DE] py-16 px-4 sm:px-6 md:px-12 min-h-screen">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl cinzelfont uppercase font-bold text-[#0E0100] mb-8 tracking-wide">
          Search Results
        </h2>
        <p className="text-[#0E0100] text-sm">
          Showing results for: <span className="font-semibold">{searchTerm}</span>
        </p>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto mb-20">
          {filteredProducts.map((product) => (
            <div key={product.id} className="flex flex-col items-start">
              <div
                onClick={() => openModal(product)}
                className="w-full bg-[#FFF4DC] h-[360px] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex justify-center items-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-[240px] h-[240px] object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="w-full mt-4 text-center sm:text-left">
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
      ) : (
        <div className="text-center text-[#0E0100] py-20 font-medium text-lg">
          No products found for "{searchTerm}"
        </div>
      )}

      <ContactSection />

      {selectedProduct && (
        <EnquiryModal
          isOpen={modalOpen}
          onClose={closeModal}
          productName={selectedProduct.name}
        />
      )}
    </section>
  );
}
