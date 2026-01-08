import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ContactSection from "../components/ContactSection";
import EnquiryModal from "../components/EnquiryModal";
import { listBackendProducts } from "../api/backendProductsAPI";
import { listCategories } from "../api/categoryAPI";

export default function Silver() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Extract subcategory from URL (e.g., /silver/rings -> "rings")
  const pathParts = location.pathname.split('/').filter(Boolean);
  const urlSubcategory = pathParts.length > 1 && pathParts[0] === 'silver' ? pathParts[1] : null;

  // Fetch products and categories from backend
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load products
        const data = await listBackendProducts();
        
        const silverProducts = data.filter((p) => {
          const collection = (p.collection || "").toLowerCase().trim();
          const category = (p.category || "").toLowerCase().trim();
          return collection === "silver" || category === "silver";
        });
        
        setProducts(silverProducts);

        // Load categories
        const cats = await listCategories("Silver");
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



  // Helper function for strict word matching
const strictWordMatch = (productValue, searchValue) => {
  if (!productValue || !searchValue) return false;
  
  const normalizedProduct = productValue.toLowerCase().trim();
  const normalizedSearch = searchValue.toLowerCase().trim();
  
  // Exact match
  if (normalizedProduct === normalizedSearch) return true;
  
  // Singular/plural exact match
  if (normalizedProduct === normalizedSearch + 's') return true;
  if (normalizedProduct + 's' === normalizedSearch) return true;
  
  // Split into words and check for whole word matches
  const productWords = normalizedProduct.split(/[\s-]+/);
  const searchWords = normalizedSearch.split(/[\s-]+/);
  
  for (const searchWord of searchWords) {
    for (const productWord of productWords) {
      // Exact word match
      if (productWord === searchWord) return true;
      
      // Singular/plural word match
      if (productWord === searchWord + 's') return true;
      if (productWord + 's' === searchWord) return true;
    }
  }
  
  return false;
};

// Filter products by category/subcategory with strict word matching
// Filter products by category/subcategory
const filteredProducts = products.filter((product) => {
  // Check if it's a silver product
  const productCollection = (product.collection || "").toLowerCase().trim();
  const productCategory = (product.category || "").toLowerCase().trim();
  const isSilver = productCollection === "silver" || productCategory === "silver";
  
  if (!isSilver) return false;
  
  // If no URL subcategory, show all silver products
  if (!urlSubcategory) return true;
  
  const urlNormalized = (urlSubcategory || "").toLowerCase().trim();
  
  // Get product subcategory
  const productSub = (product.subcategory || "").toLowerCase().trim();
  
  // If product has no subcategory, don't show it when filtering by subcategory
  if (!productSub) return false;
  
  // Special handling for "ring" - check whole word only
  if (urlNormalized === 'ring' || urlNormalized === 'rings') {
    // Check if subcategory is exactly "ring" or "rings" (case insensitive)
    if (productSub === 'ring' || productSub === 'rings') {
      return true;
    }
    
    // Also check if subcategory ends with "ring" as a whole word
    // This handles cases like "silver ring" or "gold ring"
    const words = productSub.split(/\s+/);
    for (const word of words) {
      if (word === 'ring' || word === 'rings') {
        return true;
      }
    }
    
    return false;
  }
  
  // Special handling for "earring" - check whole word only
  if (urlNormalized === 'earring' || urlNormalized === 'earrings') {
    if (productSub === 'earring' || productSub === 'earrings') {
      return true;
    }
    
    const words = productSub.split(/\s+/);
    for (const word of words) {
      if (word === 'earring' || word === 'earrings') {
        return true;
      }
    }
    
    return false;
  }
  
  // For other subcategories, use more flexible matching
  // Direct match
  if (productSub === urlNormalized) return true;
  
  // Singular/plural match
  if (productSub === urlNormalized + 's') return true;
  if (productSub + 's' === urlNormalized) return true;
  
  // Contains match (for multi-word subcategories)
  if (productSub.includes(urlNormalized)) return true;
  if (urlNormalized.includes(productSub)) return true;
  
  return false;
});
  const openModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  const handleCategoryClick = (category) => {
    if (selectedCategory && selectedCategory.category === category.category) {
      setSelectedCategory(null);
      setSelectedSubcategory(null);
      navigate('/silver', { replace: true });
    } else {
      setSelectedCategory(category);
      setSelectedSubcategory(null);
      navigate('/silver', { replace: true });
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
    
    navigate(`/silver/${subcategorySlug}`, { replace: true });
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    navigate('/silver', { replace: true });
  };

  // Show loading state
  if (loading) {
    return (
      <section className="bg-[#FFF6DE] py-16 px-4 sm:px-6 md:px-12 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#681F00] mx-auto mb-4"></div>
          <p className="text-[#0E0100] text-lg">Loading Silver Jewellery details...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#FFF6DE] py-16 px-4 sm:px-6 md:px-12 min-h-screen">
      {/* Title */}
      <div className="max-w-7xl mx-auto text-center mb-8">
        <h2 className="text-3xl md:text-4xl cinzelfont uppercase font-bold text-[#0E0100] mb-10 tracking-wide">
          Silver Jewellery
        </h2>
      </div>

      {/* Categories */}
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

      {/* Subcategories */}
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

{/* Products Grid */}
{filteredProducts.length > 0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto mb-20">
    {filteredProducts.map((product) => {
      // Get primary image - support both images array and single image field
      const primaryImage = (product.images && product.images.length > 0) 
        ? product.images[0] 
        : (product.image || "");
      
      return (
        <div key={product._id} className="flex flex-col h-full"> {/* Changed to h-full */}
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
          productName={selectedProduct.productName || selectedProduct.name}
          productId={selectedProduct._id}
          productImage={(selectedProduct.images && selectedProduct.images.length > 0) ? selectedProduct.images[0] : (selectedProduct.image || "")}
        />
      )}
    </section>
  );
}
