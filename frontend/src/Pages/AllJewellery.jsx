

import React, { useState, useEffect, useRef } from "react";
import ContactSection from "../components/ContactSection";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { listBackendProducts } from "../api/backendProductsAPI";
import { listMenus } from "../api/menuAPI";
import EnquiryModal from "../components/EnquiryModal";
import {
  goldCategories,
  silverCategories,
  diamondCategories,
  giftingCategories,
  weddingCategories,
  birthStoneCategories,
  mensCategories,
  coinsCategories
} from "../data/admincategories";
import { motion, AnimatePresence } from "framer-motion";

/**
 * AllJewellery (Light theme with dark accents)
 * - Light background
 * - Accent colors: #140100 (dark) and #5C1D02 (warm)
 * - Reduced padding & spacing
 * - Tighter text sizes
 * - Fully responsive
 */

/* ---------- Small helper hook for mobile detection ---------- */
const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

export default function AllJewellery() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Jewellery");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedCollectionItem, setSelectedCollectionItem] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [collectionsMenu, setCollectionsMenu] = useState(null);
  const [selectedMainSubcategory, setSelectedMainSubcategory] = useState("");
  const [selectedNestedSubcategory, setSelectedNestedSubcategory] = useState("");
  
  const searchParams = new URLSearchParams(location.search);
  const urlCollectionItem = params.collectionItem;
  const isMobile = useMobile();
  const categoryScrollRef = useRef(null);
  const subcategoryScrollRef = useRef(null);

  // Read category from URL query parameter
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl && categories[categoryFromUrl]) {
      setSelectedCategory(categoryFromUrl);
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [location.search]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (location.state?.scrollToTop) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  // Update when category changes
  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setSelectedSubcategory("");
    setSelectedMainSubcategory("");
    setSelectedNestedSubcategory("");
    setSelectedCollectionItem(null);
    if (subcategoryScrollRef.current) subcategoryScrollRef.current.scrollLeft = 0;
    navigate('/alljewellery', { replace: true });
  };

  // Update when main subcategory is selected
  const handleMainSubcategorySelect = (sub) => {
    setSelectedMainSubcategory(sub);
    setSelectedNestedSubcategory("");
    setSelectedSubcategory(sub);
  };

  // Update when nested subcategory is selected
  const handleNestedSubcategorySelect = (nestedSub) => {
    setSelectedNestedSubcategory(nestedSub);
    setSelectedSubcategory(nestedSub);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await listBackendProducts();
        setProducts(data || []);
      } catch (err) {
        console.error("Failed to fetch products", err);
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  console.log("Filtering product:", products[1]);

  // Get appropriate icon component for each category - Updated to support active state
  const getCategoryIcon = (categoryName, isActive = false) => {
    const iconProps = { className: "w-6 h-6 md:w-7 md:h-7" };

    // Helper function to get icon path
    const getIconPath = (baseName) => {
      if (isActive) {
        // Use white version for active state
      return `/images/Icon/menu-icons/${baseName}-white.svg`;
      }
      return `/images/Icon/menu-icons/${baseName}.svg`;
    };

    switch (categoryName) {
      case "All Jewellery":
        return <img src={getIconPath("Collections")} alt="All Jewellery" {...iconProps} />;
      case "Gold":
        return <img src={getIconPath("Gold")} alt="Gold" {...iconProps} />;
      case "Silver":
        return <img src={getIconPath("Silver")} alt="Silver" {...iconProps} />;
      case "Diamond":
        return <img src={getIconPath("Diamond")} alt="Diamond" {...iconProps} />;
      case "Wedding Collection":
        return <img src={getIconPath("Diamond")} alt="Wedding Collection" {...iconProps} />;
      case "Gifting":
        return <img src={getIconPath("Gifting")} alt="Gifting" {...iconProps} />;
      case "Birth Stones":
        return <img src={getIconPath("Birth Stones")} alt="Birth Stones" {...iconProps} />;
      case "Mens":
        return <img src={getIconPath("Men's")} alt="Mens" {...iconProps} />;
      case "Coins":
        return <img src={getIconPath("Coins")} alt="Coins" {...iconProps} />;
      default:
        return <img src={getIconPath("Collections")} alt="Collection" {...iconProps} />;
    }
  };

  // Categories object with icon as function
  const categories = {
    "All Jewellery": {
      icon: (isActive) => getCategoryIcon("All Jewellery", isActive),
      subcategories: [],
    },
    "Gold": {
      icon: (isActive) => getCategoryIcon("Gold", isActive),
      subcategories: goldCategories.map((c) => c.category),
    },
    "Silver": {
      icon: (isActive) => getCategoryIcon("Silver", isActive),
      subcategories: silverCategories.map((c) => c.category),
    },
    "Diamond": {
      icon: (isActive) => getCategoryIcon("Diamond", isActive),
      subcategories: diamondCategories.map((c) => c.category),
    },
    "Wedding Collection": {
      icon: (isActive) => getCategoryIcon("Wedding Collection", isActive),
      subcategories: weddingCategories.map((c) => c.category),
    },
    "Gifting": {
      icon: (isActive) => getCategoryIcon("Gifting", isActive),
      subcategories: giftingCategories.map((c) => c.category),
    },
    "Birth Stones": {
      icon: (isActive) => getCategoryIcon("Birth Stones", isActive),
      subcategories: birthStoneCategories.map((c) => c.category),
    },
    "Mens": {
      icon: (isActive) => getCategoryIcon("Mens", isActive),
      subcategories: mensCategories.map((c) => c.category),
      detailedSubcategories: mensCategories,
    },
    "Coins": {
      icon: (isActive) => getCategoryIcon("Coins", isActive),
      subcategories: coinsCategories.map((c) => c.category),
      detailedSubcategories: coinsCategories,
    },
  };

  const filtered = products.filter((p) => {
    // Convert to lowercase for case-insensitive comparison
    const productCategory = (p.collection || p.category || "").toLowerCase().trim();
    const productSubcategory = (p.subcategory || "").toLowerCase().trim();
    const selectedCat = selectedCategory.toLowerCase().trim();
    
    // 1️⃣ Category filter
    if (selectedCategory !== "All Jewellery") {
      if (productCategory !== selectedCat) return false;
    }

    // 2️⃣ Handle Mens category filtering differently
    if (selectedCategory === "Mens" || selectedCategory === "Coins") {
      // For Mens and Coins, we need to check both levels
      if (selectedMainSubcategory) {
        // Check if product's subcategory matches selected main subcategory
        const mainSubMatch = productSubcategory.includes(selectedMainSubcategory.toLowerCase()) ||
                            productCategory.includes(selectedMainSubcategory.toLowerCase());
        
        if (!mainSubMatch) return false;
        
        // If nested subcategory is selected, check further
        if (selectedNestedSubcategory) {
          const nestedMatch = productSubcategory.includes(selectedNestedSubcategory.toLowerCase()) ||
                            (p.material || "").toLowerCase().includes(selectedNestedSubcategory.toLowerCase()) ||
                            (p.description || "").toLowerCase().includes(selectedNestedSubcategory.toLowerCase());
          
          return nestedMatch;
        }
      }
    } else {
      // Original logic for other categories
      if (selectedSubcategory) {
        if (productSubcategory !== selectedSubcategory.toLowerCase().trim() && 
            productCategory !== selectedSubcategory.toLowerCase().trim()) {
          return false;
        }
      }
    }

    return true;
  });

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  /* scrolling helpers */
  const scrollCategories = (dir) => {
    if (!categoryScrollRef.current) return;
    categoryScrollRef.current.scrollLeft += dir * 220;
  };

  const scrollSubcategories = (dir) => {
    if (!subcategoryScrollRef.current) return;
    subcategoryScrollRef.current.scrollLeft += dir * 160;
  };

  /* minimal injected CSS for custom vars & scrollbar hide */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (document.getElementById("aj-styles")) return;
    const style = document.createElement("style");
    style.id = "aj-styles";
    style.innerHTML = `
      :root{
        --accent-dark: #140100;
        --accent-warm: #5C1D02;
        --muted: rgba(20,1,0,0.06);
      }
      .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      .scrollbar-hide::-webkit-scrollbar { display: none; }
      .text-accent { color: var(--accent-dark); }
      .bg-accent-gradient { background: linear-gradient(90deg,var(--accent-dark),var(--accent-warm)); }
      .btn-accent {
        background: linear-gradient(90deg, var(--accent-dark), var(--accent-warm));
        color: #fff;
      }
      @media (min-width: 768px){
        .card-hover-up:hover { transform: translateY(-6px); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header - compact */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {/* <img src="/images/Icon/menu-icons/Collections.svg" alt="Filter" className="w-5 h-5 text-accent" /> */}
            <h1 className="text-lg md:text-xl font-serif font-semibold text-accent">
              Collections
            </h1>
            <span className="ml-2 text-xs text-gray-500 hidden md:inline">— curated pieces</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-700 bg-gray-200 px-3 py-1 rounded-full">
              {filtered.length} Products
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="relative mb-6">
          <div className="md:flex md:items-start md:gap-6">
            {/* Left sidebar - Category buttons */}
            <div
              ref={categoryScrollRef}
              className={`flex ${isMobile ? "overflow-x-auto scrollbar-hide space-x-3 pb-2" : "flex-col gap-1 md:w-64"} scroll-smooth`}
            >
              {Object.keys(categories).map((cat) => {
                const active = selectedCategory === cat;
                const CategoryIcon = categories[cat].icon; // This is now a function
                
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`flex-shrink-0 ${isMobile ? "px-4 py-2" : "px-3 py-2"} rounded-lg transition-colors duration-150 text-left flex items-center gap-3 ${
                      active
                        ? "bg-gradient-to-r from-[#5C1D02] to-[#140100] shadow-sm text-white"
                        : "bg-[#fff4dc] border border-gray-100 text-accent hover:bg-gray-50"
                    }`}
                    style={{ fontSize: isMobile ? 13 : 14 }}
                  >
                    <div className="flex items-center justify-center w-6 h-6 md:w-7 md:h-7">
                      {/* Pass active state to get correct icon (white for active, colored for inactive) */}
                      {CategoryIcon(active)}
                    </div>
                    <span className="whitespace-nowrap font-medium">{cat}</span>
                  </button>
                );
              })}
            </div>

            {/* Right content area */}
            <div className="flex-1">
              {/* Subcategory area */}
              <div className="md:pl-4 mt-3 md:mt-0">
                <AnimatePresence>
                  {selectedCategory !== "All Jewellery" &&
                    categories[selectedCategory].subcategories?.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-white rounded-xl p-3 md:p-4 shadow-sm border border-gray-100">
                          {/* Level 1 Subcategories */}
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm md:text-base font-semibold text-accent">
                              {selectedCategory === "Mens" || selectedCategory === "Coins" 
                                ? "Select Category" 
                                : "Select Subcategory"}
                            </h3>
                            {isMobile && categories[selectedCategory].subcategories.length > 3 && (
                              <div className="flex gap-1">
                                <button 
                                  onClick={() => scrollSubcategories(-1)} 
                                  className="p-1 rounded-md bg-gray-50 border"
                                >
                                  <img 
                                    src="/images/Icon/arrow-left.svg" 
                                    alt="Previous" 
                                    className="w-3 h-3" 
                                  />
                                </button>
                                <button 
                                  onClick={() => scrollSubcategories(1)} 
                                  className="p-1 rounded-md bg-gray-50 border"
                                >
                                  <img 
                                    src="/images/Icon/arrow-right.svg" 
                                    alt="Next" 
                                    className="w-3 h-3" 
                                  />
                                </button>
                              </div>
                            )}
                          </div>

                          <div
                            ref={subcategoryScrollRef}
                            className={`flex ${isMobile ? "overflow-x-auto scrollbar-hide space-x-2 pb-2" : "flex-wrap gap-2"} scroll-smooth mb-4`}
                          >
                            <button
                              onClick={() => {
                                setSelectedMainSubcategory("");
                                setSelectedNestedSubcategory("");
                                setSelectedSubcategory("");
                              }}
                              className={`flex-shrink-0 px-3 py-1 rounded-md text-sm ${
                                !selectedMainSubcategory
                                  ? "bg-gradient-to-r from-[#5C1D02] to-[#140100] text-white"
                                  : "bg-gray-50 text-accent border border-gray-100"
                              }`}
                            >
                              All {selectedCategory}
                            </button>

                            {categories[selectedCategory].subcategories.map((sub) => (
                              <button
                                key={sub}
                                onClick={() => handleMainSubcategorySelect(sub)}
                                className={`flex-shrink-0 px-3 py-1 rounded-md text-sm whitespace-nowrap ${
                                  selectedMainSubcategory === sub
                                    ? "bg-gradient-to-r from-[#5C1D02] to-[#140100] text-white"
                                    : "bg-white text-accent border border-gray-100 hover:bg-gray-50"
                                }`}
                              >
                                {sub}
                              </button>
                            ))}
                          </div>

                          {/* Level 2 (Nested) Subcategories for Mens */}
                          {selectedCategory === "Mens" && selectedMainSubcategory && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-4 pt-4 border-t border-gray-100"
                            >
                              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                                Select {selectedMainSubcategory} Type
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                <button
                                  onClick={() => setSelectedNestedSubcategory("")}
                                  className={`px-3 py-1 rounded-md text-sm ${
                                    !selectedNestedSubcategory
                                      ? "bg-[#fff4dc] text-[#5C1D02] border border-[#5C1D02]"
                                      : "bg-gray-50 text-gray-700 border border-gray-200"
                                  }`}
                                >
                                  All {selectedMainSubcategory}
                                </button>
                                
                                {mensCategories
                                  .find(cat => cat.category === selectedMainSubcategory)
                                  ?.subcategories.map((nestedSub) => (
                                    <button
                                      key={nestedSub}
                                      onClick={() => handleNestedSubcategorySelect(nestedSub)}
                                      className={`px-3 py-1 rounded-md text-sm whitespace-nowrap ${
                                        selectedNestedSubcategory === nestedSub
                                          ? "bg-[#fff4dc] text-[#5C1D02] border border-[#5C1D02]"
                                          : "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
                                      }`}
                                    >
                                      {nestedSub}
                                    </button>
                                  ))}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    )}
                </AnimatePresence>
              </div>

              {/* Product Grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory + selectedSubcategory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mb-12 overflow-y-auto h-screen scrollbar-hide"
                >
                  {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto mb-20">
                      {filtered.map((product) => {
                        // Get primary image
                        const primaryImage =
                          (product.images && product.images.length > 0)
                            ? product.images[0]
                            : (product.image || "");

                        return (
                          <div key={product._id} className="flex flex-col items-start">
                            {/* Product Image */}
                            <div
                              onClick={() => navigate(`/backend-product/${product._id}`)}
                              className="w-full bg-[#FFF4DC] h-[360px] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex justify-center items-center"
                            >
                              {primaryImage ? (
                                <img
                                  src={primaryImage}
                                  alt={product.productName}
                                  className="w-[300px] h-[400px] object-cover hover:scale-105 transition-transform duration-500"
                                />
                              ) : (
                                <div className="w-full h-[360px] flex items-center justify-center text-gray-400">
                                  No image
                                </div>
                              )}
                            </div>

                            {/* Product Info */}
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
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white border-t border-gray-100">
        <ContactSection />
      </div>

      {/* Enquiry Modal */}
      {selectedProduct && (
        <EnquiryModal
          isOpen={modalOpen}
          onClose={closeModal}
          productName={selectedProduct.productName}
          productId={selectedProduct._id}
          productImage={selectedProduct.images?.[0] || selectedProduct.image || ""}
        />
      )}
    </div>
  );
}