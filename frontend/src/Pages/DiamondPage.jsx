import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactSection from "../components/ContactSection";
import EnquiryModal from "../components/EnquiryModal";
import CollectionProductGrid from "../components/CollectionProductGrid";
import { categoryPillClass, subcategoryPillClass, matchesUrlSegment } from "../utils/categoryNavStyles";
import { slugify, shouldShowNestedSubcategories } from "../utils/productFilter";
import { useCollectionPage } from "../hooks/useCollectionPage";
import { diamondCategories } from "../data/admincategories";

export default function Diamond() {
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory,
    categories,
    loading,
    urlSubcategory,
    filteredProducts,
  } = useCollectionPage("Diamond", "diamond", diamondCategories);

  const handleShowAll = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    navigate("/diamond", { replace: true });
  };

  // Handle Category selection
  const handleCategoryClick = (category) => {
    if (shouldShowNestedSubcategories(category)) {
      setSelectedCategory(
        selectedCategory?.category === category.category ? null : category
      );
      setSelectedSubcategory(null);
      navigate("/diamond", { replace: true });
      return;
    }
    setSelectedCategory(category);
    setSelectedSubcategory(category.category);
    navigate(`/diamond/${slugify(category.category)}`, { replace: true });
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
    navigate(`/diamond/${slugify(subcategory)}`, { replace: true });
  };

  // Reset filters
  const handleBack = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    navigate('/diamond', { replace: true });
  };

  // Enquiry modal controls
  const openModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  // Show loading state — grid only; pills show immediately
  return (
    <section className="bg-[#FFF6DE] py-16 px-4 sm:px-6 md:px-12 min-h-screen">
      {/* Page Title */}
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl cinzelfont uppercase font-bold text-[#0E0100] mb-4 tracking-wide">
          Diamond Jewellery
        </h2>
        <p className="text-sm text-[#681F00]/90 max-w-2xl mx-auto">
          Ladies collections below. Men&apos;s diamond jewellery is under{" "}
          <button
            type="button"
            onClick={() => navigate("/diamond/mens")}
            className="underline font-medium hover:text-[#5C1D02]"
          >
            Men&apos;s
          </button>{" "}
          or the Mens section.
        </p>
      </div>

      {/* Category Buttons */}
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
                selectedCategory?.category === cat.category ||
                  matchesUrlSegment(cat.category, selectedSubcategory) ||
                  matchesUrlSegment(cat.category, urlSubcategory)
              )}
            >
              {cat.category}
            </button>
          ))}
        </div>
      )}

      {/* Subcategory Buttons */}
      {selectedCategory && shouldShowNestedSubcategories(selectedCategory) && (
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {selectedCategory.subcategories.map((sub, index) => (
            <button
              key={sub || index}
              onClick={() => handleSubcategoryClick(sub)}
              className={subcategoryPillClass(
                selectedSubcategory === sub || matchesUrlSegment(sub, urlSubcategory)
              )}
            >
              {sub}
            </button>
          ))}
          <button
            onClick={handleBack}
            className="px-3 py-1.5 text-xs sm:text-sm rounded-full bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
          >
            Back
          </button>
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

      {/* Enquiry Modal */}
      {selectedProduct && (
        <EnquiryModal
          isOpen={modalOpen}
          onClose={closeModal}
          productName={selectedProduct.productName}
          productImage={
            selectedProduct.images?.[0] || selectedProduct.image || ""
          }
          productId={selectedProduct._id}
        />
      )}
    </section>
  );
}
