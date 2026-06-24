import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { listBackendProducts } from "../api/backendProductsAPI";
import { listCategories } from "../api/categoryAPI";
import { mensCategories } from "../data/admincategories";
import { categoryPillClass, subcategoryPillClass, matchesUrlSegment } from "../utils/categoryNavStyles";
import { dedupeProducts } from "../utils/collectionMembership";
import {
  isMensJewelleryProduct,
  mergeCategoryRows,
  productMatchesMensSubcategory,
  resolveMensUrlSubcategory,
  segmentsMatch,
  slugify,
} from "../utils/productFilter";
import ContactSection from "../components/ContactSection";
import EnquiryModal from "../components/EnquiryModal";

const MENS_SUB_FETCH_LABELS = [
  ...new Set(mensCategories.flatMap((c) => c.subcategories || [])),
];

export default function Mens() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const pathParts = location.pathname.split("/").filter(Boolean);
  const urlSubcategory = pathParts.length > 1 && pathParts[0] === "mens" ? pathParts[1] : null;

  const displayCategories = useMemo(
    () => mergeCategoryRows(categories, mensCategories),
    [categories]
  );

  const resolvedUrlSub = useMemo(
    () => resolveMensUrlSubcategory(urlSubcategory, displayCategories),
    [urlSubcategory, displayCategories]
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const fetches = [
          listBackendProducts({ collection: "Mens" }),
          listBackendProducts({ collection: "Gold", subcategory: "Ring" }),
          listBackendProducts({ collection: "Silver", subcategory: "Watches" }),
          ...MENS_SUB_FETCH_LABELS.map((sub) => listBackendProducts({ subcategory: sub })),
        ];

        const batches = await Promise.all(fetches);
        const merged = batches.flat();
        const mensOnly = merged.filter(isMensJewelleryProduct);
        setProducts(dedupeProducts(mensOnly));

        const cats = await listCategories("Mens");
        setCategories(cats);
      } catch (error) {
        console.error("Error loading mens data:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!urlSubcategory) {
      setSelectedCategory(null);
      setSelectedSubcategory(null);
      return;
    }

    if (resolvedUrlSub) {
      const parent = displayCategories.find((c) =>
        segmentsMatch(c.category, resolvedUrlSub.parent)
      );
      setSelectedCategory(parent || { category: resolvedUrlSub.parent, subcategories: [] });
      setSelectedSubcategory(resolvedUrlSub.label);
      return;
    }

    setSelectedCategory(null);
    setSelectedSubcategory(urlSubcategory.replace(/-/g, " "));
  }, [urlSubcategory, resolvedUrlSub, displayCategories]);

  const filteredProducts = useMemo(() => {
    const activeSub = resolvedUrlSub?.label || selectedSubcategory;
    const activeParent = resolvedUrlSub?.parent || selectedCategory?.category || "";

    return products.filter((product) => {
      if (!urlSubcategory && !activeSub) {
        return isMensJewelleryProduct(product);
      }
      return productMatchesMensSubcategory(product, activeSub, activeParent);
    });
  }, [products, urlSubcategory, resolvedUrlSub, selectedSubcategory, selectedCategory]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  const handleCategoryClick = (category) => {
    if (selectedCategory?.category === category.category) {
      setSelectedCategory(null);
      setSelectedSubcategory(null);
      navigate("/mens", { replace: true });
    } else {
      setSelectedCategory(category);
      setSelectedSubcategory(null);
      navigate("/mens", { replace: true });
    }
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
    const parent = selectedCategory?.category || "";
    const slug = parent
      ? `${slugify(parent)}-${slugify(subcategory)}`
      : slugify(subcategory);
    navigate(`/mens/${slug}`, { replace: true });
  };

  const handleShowAll = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    navigate("/mens", { replace: true });
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    navigate("/mens", { replace: true });
  };

  if (loading) {
    return (
      <section className="bg-[#FFF6DE] py-16 px-4 sm:px-6 md:px-12 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#681F00] mx-auto mb-4"></div>
          <p className="text-[#0E0100] text-lg">Loading Mens Jewellery details...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#FFF6DE] py-16 px-4 sm:px-6 md:px-12 min-h-screen">
      <div className="max-w-7xl mx-auto text-center mb-8">
        <h2 className="text-3xl md:text-4xl cinzelfont uppercase font-bold text-[#0E0100] mb-10 tracking-wide">
          Mens Jewellery
        </h2>
      </div>

      {displayCategories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            type="button"
            onClick={handleShowAll}
            className={categoryPillClass(!urlSubcategory && !selectedSubcategory)}
          >
            All
          </button>
          {displayCategories.map((cat) => (
            <button
              key={cat._id || cat.category}
              onClick={() => handleCategoryClick(cat)}
              className={categoryPillClass(
                selectedCategory?.category === cat.category ||
                  matchesUrlSegment(cat.category, urlSubcategory)
              )}
            >
              {cat.category}
            </button>
          ))}
        </div>
      )}

      {selectedCategory?.subcategories?.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {selectedCategory.subcategories.map((sub, index) => (
            <button
              key={sub || index}
              onClick={() => handleSubcategoryClick(sub)}
              className={subcategoryPillClass(
                selectedSubcategory === sub ||
                  matchesUrlSegment(sub, urlSubcategory) ||
                  resolvedUrlSub?.label === sub
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

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto mb-20">
          {filteredProducts.map((product) => {
            const primaryImage =
              product.images?.length > 0 ? product.images[0] : product.image || "";

            return (
              <div key={product._id} className="flex flex-col h-full">
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
          productName={selectedProduct.productName}
          productId={selectedProduct._id}
          productImage={
            selectedProduct.images?.length > 0
              ? selectedProduct.images[0]
              : selectedProduct.image || ""
          }
        />
      )}
    </section>
  );
}
