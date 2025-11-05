import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContactSection from "../components/ContactSection";
import EnquiryModal from "../components/EnquiryModal";
import { giftingCategories } from "../data/admincategories";
import { listBackendProducts } from "../api/backendProductsAPI";

export default function Gifting() {
  const navigate = useNavigate();

  // State variables
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await listBackendProducts();
      // Filter for Gifting category
      const giftingProducts = data.filter(
        (p) => p.collection === "Gifting" || p.category === "Gifting"
      );
      setProducts(giftingProducts);
    };
    fetchProducts();
  }, []);

  // Handle Category Selection
  const handleCategoryClick = (category) => {
    if (selectedCategory && selectedCategory.category === category.category) {
      setSelectedCategory(null);
      setSelectedSubcategory(null);
    } else {
      setSelectedCategory(category);
      setSelectedSubcategory(null);
    }
  };

  // Handle Subcategory Selection
  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  // Reset filters
  const handleBack = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
  };

  // Modal Controls
  const openModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  // Product Filtering Logic
  const filteredProducts = products.filter((product) => {
    if (!selectedCategory && !selectedSubcategory) return true;
    if (selectedSubcategory)
      return product.subcategory === selectedSubcategory;
    if (selectedCategory)
      return product.category === selectedCategory.category;
    return true;
  });

  return (
    <section className="bg-[#FFF6DE] py-16 px-4 sm:px-6 md:px-12 min-h-screen">
      {/* Title */}
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl cinzelfont uppercase font-bold text-[#0E0100] mb-8 tracking-wide">
          Gifting
        </h2>
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {giftingCategories.map((cat) => (
          <button
            key={cat.category}
            onClick={() => handleCategoryClick(cat)}
            className={`px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-all ${
              selectedCategory?.category === cat.category
                ? "bg-[#681F00] text-[#FFE9A8]"
                : "bg-[#681F00] text-[#FFF0C2] hover:bg-[#5a2b1a]"
            }`}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* Subcategory Buttons */}
      {selectedCategory && selectedCategory.subcategories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {selectedCategory.subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => handleSubcategoryClick(sub)}
              className={`px-3 py-1.5 text-xs sm:text-sm rounded-full border transition-all ${
                selectedSubcategory === sub
                  ? "bg-[#681F00] text-[#FFE9A8]"
                  : "bg-[#FAEED1] text-[#681F00] hover:bg-[#F8D89C]"
              }`}
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

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto mb-20">
          {filteredProducts.map((product) => {
            // Get primary image - support both images array and single image field
            const primaryImage = (product.images && product.images.length > 0) 
              ? product.images[0] 
              : (product.image || "");
            
            return (
            <div key={product._id} className="flex flex-col items-start">
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
          productName={selectedProduct.productName || selectedProduct.name}
          productId={selectedProduct._id}
          productImage={(selectedProduct.images && selectedProduct.images.length > 0) ? selectedProduct.images[0] : (selectedProduct.image || "")}
        />
      )}
    </section>
  );
}
