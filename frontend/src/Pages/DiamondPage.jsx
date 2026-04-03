import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ContactSection from "../components/ContactSection";
import EnquiryModal from "../components/EnquiryModal";
import { listBackendProducts } from "../api/backendProductsAPI";
import { listCategories } from "../api/categoryAPI";

export default function Diamond() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Extract subcategory from URL (e.g., /diamond/rings -> "rings")
  const pathParts = location.pathname.split('/').filter(Boolean);
  const urlSubcategory = pathParts.length > 1 && pathParts[0] === 'diamond' ? pathParts[1] : null;

  // Load backend products and categories
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load products
        const list = await listBackendProducts({ collection: "Diamond" });
        setProducts(list);

        // Load categories
        const cats = await listCategories("Diamond");
        setCategories(cats);
        
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Handle Category selection
  const handleCategoryClick = (category) => {
    if (selectedCategory?.category === category.category) {
      setSelectedCategory(null);
      setSelectedSubcategory(null);
      navigate('/diamond', { replace: true });
    } else {
      setSelectedCategory(category);
      setSelectedSubcategory(null);
      navigate('/diamond', { replace: true });
    }
  };

  // Handle Subcategory selection
  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
    
    // Update URL to reflect selected subcategory
    const subcategorySlug = (subcategory || "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    
    navigate(`/diamond/${subcategorySlug}`, { replace: true });
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

  // Filter products with improved matching
  // const filteredProducts = products.filter((product) => {
  //   // Normalize collection/category check (case-insensitive)
  //   const productCollection = (product.collection || "").toLowerCase().trim();
  //   const productCategory = (product.category || "").toLowerCase().trim();
  //   const productSubcategory = (product.subcategory || "").toLowerCase().trim();
  //   const isDiamond = productCollection === "diamond" || productCategory === "diamond";
    
  //   if (!isDiamond) return false;
    
  //   // If URL has subcategory, use it directly for filtering
  //   if (urlSubcategory) {
  //     const urlNormalized = (urlSubcategory || "").toLowerCase().trim().replace(/-/g, ' ').replace(/\s+/g, ' ');
      
  //     // Try matching with product subcategory
  //     if (productSubcategory) {
  //       const productSubNormalized = productSubcategory.replace(/\s+/g, ' ');
  //       if (productSubNormalized === urlNormalized) return true;
  //       if (productSubNormalized.includes(urlNormalized) || urlNormalized.includes(productSubNormalized)) return true;
  //       // Singular/plural match
  //       const productSubSingular = productSubNormalized.replace(/s$/, '');
  //       const urlSingular = urlNormalized.replace(/s$/, '');
  //       if (productSubSingular === urlSingular && productSubSingular.length > 0) return true;
  //     }
      
  //     // Try matching with product category
  //     if (productCategory) {
  //       const productCatNormalized = productCategory.replace(/\s+/g, ' ');
  //       if (productCatNormalized === urlNormalized) return true;
  //       if (productCatNormalized.includes(urlNormalized) || urlNormalized.includes(productCatNormalized)) return true;
  //       // Singular/plural match
  //       const productCatSingular = productCatNormalized.replace(/s$/, '');
  //       const urlSingular = urlNormalized.replace(/s$/, '');
  //       if (productCatSingular === urlSingular && productCatSingular.length > 0) return true;
  //     }
      
  //     // Try matching with product name
  //     const productName = (product.productName || "").toLowerCase().trim();
  //     if (productName.includes(urlNormalized)) return true;
      
  //     return false;
  //   }
    
  //   // If no category/subcategory selected, show all products in collection
  //   if (!selectedCategory && !selectedSubcategory) return true;
    
  //   // If subcategory selected, prioritize subcategory matching
  //   if (selectedSubcategory) {
  //     const selectedSub = (selectedSubcategory || "").toLowerCase().trim();
      
  //     // Try exact match first
  //     if (productSubcategory === selectedSub) return true;
      
  //     // Try partial match (contains) - handles "Ring" vs "Rings", "Chain" vs "Chains"
  //     if (productSubcategory.includes(selectedSub) || selectedSub.includes(productSubcategory)) return true;
      
  //     // Also check if product category matches subcategory (fallback)
  //     if (productCategory === selectedSub || productCategory.includes(selectedSub) || selectedSub.includes(productCategory)) return true;
      
  //     return false;
  //   }
    
  //   // If only category selected (no subcategory), filter by category
  //   if (selectedCategory) {
  //     const selectedCategoryName = (selectedCategory.category || "").toLowerCase().trim();
      
  //     // Try exact match
  //     if (productCategory === selectedCategoryName) return true;
      
  //     // Try partial match
  //     if (productCategory.includes(selectedCategoryName) || selectedCategoryName.includes(productCategory)) return true;
      
  //     return false;
  //   }
    
  //   return true;
  // });
const normalizeText = (value) =>
  (value || "")
    .toLowerCase()
    .trim()
    .replace(/-/g, " ")
    .replace(/\s+/g, " ");

const toSingular = (value) => value.replace(/s$/, "");

const filteredProducts = products.filter((product) => {
  const productCollection = normalizeText(product.collection);
  const productCategory = normalizeText(product.category);
  const productSubcategory = normalizeText(product.subcategory);
  
  const isDiamond = productCollection === "diamond";
  if (!isDiamond) return false;
  
  if (urlSubcategory) {
    const urlNormalized = normalizeText(urlSubcategory);
    if (!productSubcategory) return false;
    return (
      productSubcategory === urlNormalized ||
      toSingular(productSubcategory) === toSingular(urlNormalized)
    );
  }

  if (!selectedCategory && !selectedSubcategory) return true;

  if (selectedSubcategory) {
    const selectedSub = normalizeText(selectedSubcategory);
    if (!productSubcategory) return false;
    return (
      productSubcategory === selectedSub ||
      toSingular(productSubcategory) === toSingular(selectedSub)
    );
  }

  if (selectedCategory) {
    const selectedCategoryName = normalizeText(selectedCategory.category);
    return (
      productCategory === selectedCategoryName ||
      toSingular(productCategory) === toSingular(selectedCategoryName) ||
      productSubcategory === selectedCategoryName ||
      toSingular(productSubcategory) === toSingular(selectedCategoryName)
    );
  }

  return true;
});
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
        <h2 className="text-3xl md:text-4xl cinzelfont uppercase font-bold text-[#0E0100] mb-8 tracking-wide">
          Diamond Jewellery
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
