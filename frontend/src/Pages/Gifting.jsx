import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ContactSection from "../components/ContactSection";
import EnquiryModal from "../components/EnquiryModal";
import CollectionProductGrid from "../components/CollectionProductGrid";
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

  const loadGiftingProducts = useCallback(
    () => fetchCollectionProducts(listBackendProducts, "Gifting"),
    []
  );

  const {
    selectedSubcategory,
    setSelectedSubcategory,
    categories,
    loading,
    urlSubcategory,
    filteredProducts,
  } = useCollectionPage("Gifting", "gifting", giftingCategories, {
    loadProducts: loadGiftingProducts,
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

      <CollectionProductGrid
        products={filteredProducts}
        loading={loading}
        onEnquiry={openModal}
        imageBoxClassName="w-full bg-[#FFF4DC] h-[400px] rounded-2xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 flex justify-center items-center"
        imageClassName="w-full h-[400px] object-cover rounded-2xl hover:scale-105 transition-transform duration-500"
      />

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
