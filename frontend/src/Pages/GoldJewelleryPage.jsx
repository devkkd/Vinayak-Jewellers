import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { listBackendProducts } from "../api/backendProductsAPI";
import { listCategories } from "../api/categoryAPI";
import ContactSection from "../components/ContactSection";
import EnquiryModal from "../components/EnquiryModal";

export default function Gold() {
  const navigate = useNavigate();
  const location = useLocation();

  // State variables
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Extract subcategory from URL (e.g., /gold/rings -> "rings")
  const pathParts = location.pathname.split('/').filter(Boolean);
  const urlSubcategory = pathParts.length > 1 && pathParts[0] === 'gold' ? pathParts[1] : null;

  // Load backend products and categories
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load products
        const list = await listBackendProducts();
        const goldItems = list.filter((p) => {
          const collection = (p.collection || "").toLowerCase().trim();
          const category = (p.category || "").toLowerCase().trim();
          return collection === "gold" || category === "gold";
        });
        
        setProducts(goldItems);

        // Load categories
        const cats = await listCategories("Gold");
        setCategories(cats);
        
        setLoading(false);
      } catch (error) {
        console.error("❌ Error loading data:", error);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Auto-select subcategory from URL
  useEffect(() => {
    if (urlSubcategory && categories.length > 0 && products.length > 0) {
      // Normalize URL subcategory (remove hyphens, convert to lowercase)
      const urlNormalized = (urlSubcategory || "").toLowerCase().trim().replace(/-/g, ' ').replace(/\s+/g, ' ');
      
      let foundMatch = false;
      
      // Find matching subcategory in categories
      for (const cat of categories) {
        if (cat.subcategories && cat.subcategories.length > 0) {
          const matchingSub = cat.subcategories.find(sub => {
            const subNormalized = (sub || "").toLowerCase().trim().replace(/\s+/g, ' ');
            
            // Try exact match
            if (subNormalized === urlNormalized) return true;
            
            // Try match without spaces
            if (subNormalized.replace(/\s+/g, '') === urlNormalized.replace(/\s+/g, '')) return true;
            
            // Try partial match (contains)
            if (subNormalized.includes(urlNormalized) || urlNormalized.includes(subNormalized)) return true;
            
            // Try singular/plural match (rings -> ring, ring -> rings)
            const subSingular = subNormalized.replace(/s$/, '');
            const urlSingular = urlNormalized.replace(/s$/, '');
            if (subSingular === urlSingular && subSingular.length > 0) return true;
            
            return false;
          });
          
          if (matchingSub) {
            setSelectedCategory(cat);
            setSelectedSubcategory(matchingSub);
            foundMatch = true;
            break;
          }
        }
      }
      
      // If no match found in categories, still set the URL subcategory directly
      // This allows filtering by URL even if category structure doesn't match
      if (!foundMatch && urlSubcategory) {
        setSelectedSubcategory(urlNormalized);
      }
    } else if (!urlSubcategory) {
      // If no URL subcategory, reset selections
      setSelectedCategory(null);
      setSelectedSubcategory(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlSubcategory, categories, products]);

  // Filter products with improved matching
  const filteredProducts = products.filter((product) => {
    // Normalize collection/category check (case-insensitive)
    const productCollection = (product.collection || "").toLowerCase().trim();
    const productCategory = (product.category || "").toLowerCase().trim();
    const productSub = (product.subcategory || "").toLowerCase().trim();
    const isGold = productCollection === "gold" || productCategory === "gold";
    
    if (!isGold) return false;
    
    // If URL has subcategory, use it directly for filtering
    if (urlSubcategory) {
      const urlNormalized = (urlSubcategory || "").toLowerCase().trim().replace(/-/g, ' ').replace(/\s+/g, ' ');
      
      // Try matching with product subcategory
      if (productSub) {
        const productSubNormalized = productSub.replace(/\s+/g, ' ');
        if (productSubNormalized === urlNormalized) return true;
        if (productSubNormalized.includes(urlNormalized) || urlNormalized.includes(productSubNormalized)) return true;
        // Singular/plural match
        const productSubSingular = productSubNormalized.replace(/s$/, '');
        const urlSingular = urlNormalized.replace(/s$/, '');
        if (productSubSingular === urlSingular && productSubSingular.length > 0) return true;
      }
      
      // Try matching with product category
      if (productCategory) {
        const productCatNormalized = productCategory.replace(/\s+/g, ' ');
        if (productCatNormalized === urlNormalized) return true;
        if (productCatNormalized.includes(urlNormalized) || urlNormalized.includes(productCatNormalized)) return true;
        // Singular/plural match
        const productCatSingular = productCatNormalized.replace(/s$/, '');
        const urlSingular = urlNormalized.replace(/s$/, '');
        if (productCatSingular === urlSingular && productCatSingular.length > 0) return true;
      }
      
      // Try matching with product name
      const productName = (product.productName || "").toLowerCase().trim();
      if (productName.includes(urlNormalized)) return true;
      
      return false;
    }
    
    // If no category/subcategory selected, show all products in collection
    if (!selectedCategory && !selectedSubcategory) return true;
    
    // If subcategory selected, filter by subcategory (case-insensitive, partial match)
    if (selectedSubcategory) {
      const selectedSub = (selectedSubcategory || "").toLowerCase().trim();
      
      // Try exact match first
      if (productSub === selectedSub) return true;
      
      // Try partial match (contains) - handles "Ring" vs "Rings", "Chain" vs "Chains"
      if (productSub.includes(selectedSub) || selectedSub.includes(productSub)) return true;
      
      // Also check if product category matches subcategory (fallback)
      if (productCategory === selectedSub || productCategory.includes(selectedSub) || selectedSub.includes(productCategory)) return true;
      
      return false;
    }
    
    // If category selected, filter by category (case-insensitive, partial match)
    if (selectedCategory) {
      const selectedCategoryName = (selectedCategory.category || "").toLowerCase().trim();
      
      // Try exact match
      if (productCategory === selectedCategoryName) return true;
      
      // Try partial match
      if (productCategory.includes(selectedCategoryName) || selectedCategoryName.includes(productCategory)) return true;
      
      return false;
    }
    
    return true;
  });

  // Modal handlers
  const openModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  // Category/Subcategory handlers
  const handleCategoryClick = (category) => {
    if (selectedCategory && selectedCategory.category === category.category) {
      setSelectedCategory(null);
      setSelectedSubcategory(null);
      navigate('/gold', { replace: true });
    } else {
      setSelectedCategory(category);
      setSelectedSubcategory(null);
      navigate('/gold', { replace: true });
    }
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
    
    // Update URL to reflect selected subcategory
    const subcategorySlug = (subcategory || "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    
    navigate(`/gold/${subcategorySlug}`, { replace: true });
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    navigate('/gold', { replace: true });
  };

  // Show loading state
  if (loading) {
    return (
      <section className="bg-[#FFF6DE] py-16 px-4 sm:px-6 md:px-12 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#681F00] mx-auto mb-4"></div>
          <p className="text-[#0E0100] text-lg">Loading Gold Jewellery details...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#FFF6DE] py-16 px-4 sm:px-6 md:px-12 min-h-screen">
      {/* Title */}
      <div className="max-w-7xl mx-auto text-center mb-8">
        <h2 className="text-3xl md:text-4xl cinzelfont uppercase font-bold text-[#0E0100] mb-10 tracking-wide">
          Gold Jewellery
        </h2>
      </div>

      {/* Category Buttons */}
      {categories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat._id || cat.category}
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
      )}

      {/* Subcategory Buttons */}
      {selectedCategory && selectedCategory.subcategories && selectedCategory.subcategories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {selectedCategory.subcategories.map((sub, index) => (
            <button
              key={sub || index}
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

      {/* Product Grid */}
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
