import React, { useState, useEffect } from "react";
import { useSearch } from "../context/SearchContext";
import { searchBackendProducts } from "../api/backendProductsAPI";
import ContactSection from "../components/ContactSection";
import EnquiryModal from "../components/EnquiryModal";

export default function SearchResults() {
  const { searchTerm } = useSearch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchTerm || searchTerm.trim() === "") {
        setProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const results = await searchBackendProducts(searchTerm);
        setProducts(results || []);
      } catch (err) {
        console.error("Search error:", err);
        setError("Failed to search products. Please try again.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  // Get primary image from product (support both images array and single image)
  const getProductImage = (product) => {
    if (product.images && product.images.length > 0) {
      return product.images[0];
    }
    return product.image || "";
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

      {loading ? (
        <div className="text-center text-[#0E0100] py-20 font-medium text-lg">
          Searching...
        </div>
      ) : error ? (
        <div className="text-center text-[#0E0100] py-20 font-medium text-lg text-red-600">
          {error}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto mb-20">
          {products.map((product) => {
            const primaryImage = getProductImage(product);
            return (
              <div key={product._id || product.id} className="flex flex-col items-start">
                <div
                  onClick={() => openModal(product)}
                  className="w-full bg-[#FFF4DC] h-[360px] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex justify-center items-center"
                >
                  {primaryImage ? (
                    <img
                      src={primaryImage}
                      alt={product.productName}
                      className="w-[240px] h-[240px] object-contain hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="text-gray-400">No image</div>
                  )}
                </div>

                <div className="w-full mt-4 text-center sm:text-left">
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
            );
          })}
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
          productName={selectedProduct.productName}
          productId={selectedProduct._id || selectedProduct.id}
          productImage={getProductImage(selectedProduct)}
        />
      )}
    </section>
  );
}
