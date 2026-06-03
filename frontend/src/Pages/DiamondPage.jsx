import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactSection from "../components/ContactSection";
import EnquiryModal from "../components/EnquiryModal";
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

  // Get primary image helper
  const getPrimaryImage = (product) => {
    if (product.images && product.images.length > 0) return product.images[0];
    if (product.image) return product.image;
    return "";
  };

  // Show loading state
  if (loading) {
    return (
      <section className="bg-[#FFF6DE] py-16 px-4 sm:px-6 md:px-12 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#681F00] mx-auto mb-4"></div>
          <p className="text-[#0E0100] text-lg">Loading Diamond Jewellery details...</p>
        </div>
      </section>
    );
  }

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

 {/* Product Grid */}
{filteredProducts.length > 0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto mb-20">
    {filteredProducts.map((product) => {
      const primaryImage = getPrimaryImage(product);
      return (
        <div key={product._id} className="flex flex-col h-full"> {/* Changed to h-full */}
          {/* Product Image */}
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

          {/* Product Details */}
          <div className="flex flex-col flex-grow mt-4"> {/* Changed to flex-col flex-grow */}
            <h4 className="text-sm text-[#0E0100] mb-3 font-medium tracking-wide flex-grow"> {/* Added flex-grow */}
              {product.productName}
            </h4>
            <button
              onClick={() => openModal(product)}
              className="bg-[#681F00] text-white text-xs md:text-sm px-5 py-2 rounded-full hover:bg-[#5a2b1a] transition-colors duration-300 cursor-pointer w-full sm:w-auto" /* Added w-full sm:w-auto */
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

      {/* Contact Section */}
      <ContactSection />

      {/* Enquiry Modal */}
      {selectedProduct && (
        <EnquiryModal
          isOpen={modalOpen}
          onClose={closeModal}
          productName={selectedProduct.productName}
          productImage={getPrimaryImage(selectedProduct)}
          productId={selectedProduct._id}
        />
      )}
    </section>
  );
}
