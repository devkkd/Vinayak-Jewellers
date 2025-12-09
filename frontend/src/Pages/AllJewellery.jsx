import React, { useState, useEffect, useRef } from "react";
import ContactSection from "../components/ContactSection";
import { useNavigate } from "react-router-dom";
import { listBackendProducts } from "../api/backendProductsAPI";
import EnquiryModal from "../components/EnquiryModal";
import {
  goldCategories,
  silverCategories,
  diamondCategories,
  giftingCategories,
  weddingCategories,
  birthStoneCategories,
} from "../data/admincategories";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiFilter,
  FiChevronRight,
  FiSearch,
  FiHeart,
  FiEye,
  FiChevronLeft,
  FiChevronRight as FiRight,
} from "react-icons/fi";
import { TbDiamond, TbCrown } from "react-icons/tb";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Jewellery");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const isMobile = useMobile();
  const categoryScrollRef = useRef(null);
  const subcategoryScrollRef = useRef(null);

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

  const categories = {
    "All Jewellery": {
      image: "/public/images/Icon/menu-icons/icon 2.png",
      subcategories: [],
    },
    Gold: {
      image: "https://via.placeholder.com/40?text=Gold",
      subcategories: goldCategories.map((c) => c.category),
    },
    Silver: {
      image: "https://via.placeholder.com/40?text=Silver",
      subcategories: silverCategories.map((c) => c.category),
    },
    Diamond: {
      image: "https://via.placeholder.com/40?text=Diamond",
      subcategories: diamondCategories.map((c) => c.category),
    },
    "Wedding Collection": {
      image: "https://via.placeholder.com/40?text=Wedding",
      subcategories: weddingCategories.map((c) => c.category),
    },
    Gifting: {
      image: "/public/images/Icon/menu-icons/Group 15.png",
      subcategories: giftingCategories.map((c) => c.category),
    },
    "Birth Stones": {
      image: "https://via.placeholder.com/40?text=Stone",
      subcategories: birthStoneCategories.map((c) => c.category),
    },
  };

  const filtered =
    selectedCategory === "All Jewellery"
      ? products
      : products.filter((p) => {
          const productCollection = (p.collection || "").toLowerCase().trim();
          const selectedCollection = (selectedCategory || "").toLowerCase().trim();
          const matchesCollection = productCollection === selectedCollection;
          if (!matchesCollection) return false;
          if (selectedSubcategory) {
            const productCategory = (p.category || "").toLowerCase().trim();
            const selectedCategoryName = (selectedSubcategory || "").toLowerCase().trim();
            return (
              productCategory === selectedCategoryName ||
              productCategory.includes(selectedCategoryName) ||
              selectedCategoryName.includes(productCategory)
            );
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
            <FiFilter className="text-accent text-lg" />
            <h1 className="text-lg md:text-xl font-serif font-semibold text-accent">
              Collections
            </h1>
            <span className="ml-2 text-xs text-gray-500 hidden md:inline">— curated pieces</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
              {filtered.length} Products
            </div>
            <div className="hidden md:flex items-center border border-gray-100 rounded-full px-2">
              <FiSearch className="text-gray-400 ml-1" />
              <input
                type="text"
                placeholder="Search..."
                className="w-40 md:w-64 text-sm px-2 py-1 bg-transparent focus:outline-none"
                onChange={() => {}}
              />
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="relative mb-6">
          <div className="md:flex md:items-start md:gap-6">
            <div
              ref={categoryScrollRef}
              className={`flex ${isMobile ? "overflow-x-auto scrollbar-hide space-x-3 pb-2" : "flex-col gap-2 md:w-64"} scroll-smooth`}
            >
              {Object.keys(categories).map((cat) => {
                const active = selectedCategory === cat;
                const catImage = categories[cat].image;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setSelectedSubcategory("");
                      if (subcategoryScrollRef.current) subcategoryScrollRef.current.scrollLeft = 0;
                    }}
                    className={`flex-shrink-0 ${isMobile ? "px-4 py-2" : "px-3 py-2"} rounded-lg transition-colors duration-150 text-left flex items-center gap-3 ${
                      active
                        ? "btn-accent shadow-sm"
                        : "bg-white border border-gray-100 text-accent hover:bg-gray-50"
                    }`}
                    style={{ fontSize: isMobile ? 13 : 14 }}
                  >
                    <img src={catImage} alt={cat} className="w-6 h-6 md:w-7 md:h-7 object-contain rounded" />
                    <span className="whitespace-nowrap font-medium">{cat}</span>
                  </button>
                );
              })}
            </div>

            {/* Subcategory area */}
            <div className="flex-1 md:pl-4 mt-3 md:mt-0">
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
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm md:text-base font-semibold text-accent">Select Subcategory</h3>
                          {isMobile && categories[selectedCategory].subcategories.length > 3 && (
                            <div className="flex gap-1">
                              <button onClick={() => scrollSubcategories(-1)} className="p-1 rounded-md bg-gray-50 border">
                                <FiChevronLeft className="text-sm text-gray-600" />
                              </button>
                              <button onClick={() => scrollSubcategories(1)} className="p-1 rounded-md bg-gray-50 border">
                                <FiChevronRight className="text-sm text-gray-600" />
                              </button>
                            </div>
                          )}
                        </div>

                        <div
                          ref={subcategoryScrollRef}
                          className={`flex ${isMobile ? "overflow-x-auto scrollbar-hide space-x-2 pb-2" : "flex-wrap gap-2"} scroll-smooth`}
                        >
                          <button
                            onClick={() => setSelectedSubcategory("")}
                            className={`flex-shrink-0 px-3 py-1 rounded-md text-sm ${
                              selectedSubcategory === ""
                                ? "bg-accent-gradient text-white"
                                : "bg-gray-50 text-accent border border-gray-100"
                            }`}
                          >
                            All {selectedCategory}
                          </button>

                          {categories[selectedCategory].subcategories.map((sub) => (
                            <button
                              key={sub}
                              onClick={() => setSelectedSubcategory(sub)}
                              className={`flex-shrink-0 px-3 py-1 rounded-md text-sm whitespace-nowrap ${
                                selectedSubcategory === sub
                                  ? "bg-accent-gradient text-white"
                                  : "bg-white text-accent border border-gray-100 hover:bg-gray-50"
                              }`}
                            >
                              {sub}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory + selectedSubcategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-12"
          >
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filtered.map((product) => {
                  const primaryImage = product.images && product.images.length > 0 ? product.images[0] : product.image || "";
                  return (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.28 }}
                      whileHover={{ y: isMobile ? 0 : -6 }}
                      onMouseEnter={() => !isMobile && setHoveredProduct(product._id)}
                      onMouseLeave={() => !isMobile && setHoveredProduct(null)}
                      className="group relative"
                    >
                      <div className="bg-white rounded-xl overflow-hidden shadow-sm transition-transform duration-300 border border-gray-100 card-hover-up">
                        <div
                          onClick={() => navigate(`/backend-product/${product._id}`)}
                          className="cursor-pointer h-56 md:h-60 flex items-center justify-center p-3"
                          style={{ backgroundColor: "var(--muted)" }}
                        >
                          {primaryImage ? (
                            <motion.img
                              whileHover={{ scale: isMobile ? 1 : 1.06 }}
                              transition={{ duration: 0.4 }}
                              src={primaryImage}
                              alt={product.productName}
                              className="max-h-44 md:max-h-52 max-w-full object-contain transition-transform"
                            />
                          ) : (
                            <div className="text-gray-300">
                              <TbDiamond className="text-4xl md:text-5xl opacity-30" />
                            </div>
                          )}
                        </div>

                        {/* Hover overlay on desktop */}
                        {!isMobile && hoveredProduct === product._id && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 flex items-end justify-center p-3 pointer-events-none"
                          >
                            <div className="flex gap-2 pointer-events-auto">
                              <button className="p-2 bg-white rounded-full shadow border">
                                <FiHeart className="text-accent" />
                              </button>
                              <button onClick={() => navigate(`/backend-product/${product._id}`)} className="p-2 bg-white rounded-full shadow border">
                                <FiEye className="text-accent" />
                              </button>
                            </div>
                          </motion.div>
                        )}

                        <div className="p-3 md:p-4">
                          <h3 className="font-serif text-sm md:text-base font-semibold text-accent leading-tight line-clamp-2">
                            {product.productName}
                          </h3>

                          <div className="flex items-center justify-between mt-3">
                            <span className="text-xs text-gray-500">{product.category || selectedCategory}</span>

                            <button
                              onClick={() => openModal(product)}
                              className="text-sm btn-accent rounded-full px-3 py-1 md:px-4 md:py-2 flex items-center gap-2"
                            >
                              <span className="text-sm">Enquire</span>
                              <FiChevronRight className="text-sm" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
                <TbDiamond className="text-gray-300 text-4xl mx-auto mb-3" />
                <h3 className="text-lg font-serif text-accent mb-1">No Products Found</h3>
                <p className="text-sm text-gray-500">Try selecting a different category or subcategory.</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
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
