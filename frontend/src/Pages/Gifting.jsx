import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactSection from "../components/ContactSection";
import EnquiryModal from "../components/EnquiryModal";
import { listBackendProducts } from "../api/backendProductsAPI";
import { fetchCollectionProducts } from "../utils/collectionMembership";
import { categoryPillClass, matchesUrlSegment } from "../utils/categoryNavStyles";
import { slugify } from "../utils/productFilter";
import { useCollectionPage } from "../hooks/useCollectionPage";
import { giftingCategories } from "../data/admincategories";

export default function Gifting() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    selectedSubcategory,
    setSelectedSubcategory,
    categories,
    loading,
    urlSubcategory,
    filteredProducts,
  } = useCollectionPage("Gifting", "gifting", giftingCategories, {
    loadProducts: () =>
      fetchCollectionProducts(listBackendProducts, "Gifting"),
    useLinkedCollections: true,
  });

  const handleShowAll = () => {
    setSelectedSubcategory(null);
    navigate("/gifting", { replace: true });
  };

  const handleCategoryClick = (category) => {
    setSelectedSubcategory(category.category);
    navigate(`/gifting/${slugify(category.category)}`, { replace: true });
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  const getPrimaryImage = (product) => {
    if (product.images?.length > 0) return product.images[0];
    return product.image || "";
  };

  if (loading) {
    return (
      <section className="bg-[#FFF6DE] py-16 px-4 sm:px-6 md:px-12 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#681F00] mx-auto mb-4" />
          <p className="text-[#0E0100] text-lg">Loading Gifting collection...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#FFF6DE] py-16 px-4 sm:px-6 md:px-12 min-h-screen">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl cinzelfont uppercase font-bold text-[#0E0100] mb-4 tracking-wide">
          Gifting
        </h2>
        {(urlSubcategory || selectedSubcategory) && (
          <p className="text-sm text-[#681F00] font-medium">
            Showing: {selectedSubcategory || urlSubcategory?.replace(/-/g, " ")}
          </p>
        )}
      </div>

      {categories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            type="button"
            onClick={handleShowAll}
            className={categoryPillClass(!urlSubcategory && !selectedSubcategory)}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id || cat.category}
              onClick={() => handleCategoryClick(cat)}
              className={categoryPillClass(
                selectedSubcategory === cat.category ||
                  matchesUrlSegment(cat.category, urlSubcategory)
              )}
            >
              {cat.category}
            </button>
          ))}
        </div>
      )}

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto mb-20">
          {filteredProducts.map((product) => {
            const primaryImage = getPrimaryImage(product);
            return (
              <div key={product._id} className="flex flex-col h-full">
                <div
                  onClick={() => navigate(`/backend-product/${product._id}`)}
                  className="w-full bg-[#FFF4DC] h-[400px] rounded-2xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 flex justify-center items-center"
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
                <div className="flex flex-col flex-grow mt-4">
                  <h4 className="text-sm text-[#0E0100] mb-3 font-medium tracking-wide flex-grow">
                    {product.productName}
                  </h4>
                  <button
                    onClick={() => openModal(product)}
                    className="bg-[#681F00] text-white text-xs md:text-sm px-5 py-2 rounded-full hover:bg-[#5a2b1a] transition-colors duration-300 cursor-pointer w-full sm:w-auto"
                  >
                    Enquiry Now →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-[#0E0100] py-10 font-medium">
          No products found.
        </div>
      )}

      <ContactSection />

      {selectedProduct && (
        <EnquiryModal
          isOpen={modalOpen}
          onClose={closeModal}
          productName={selectedProduct.productName || selectedProduct.name}
          productId={selectedProduct._id}
          productImage={getPrimaryImage(selectedProduct)}
        />
      )}
    </section>
  );
}
