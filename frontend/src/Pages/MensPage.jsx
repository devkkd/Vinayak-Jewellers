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
import CollectionProductGrid from "../components/CollectionProductGrid";
import ContactSection from "../components/ContactSection";
import EnquiryModal from "../components/EnquiryModal";

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

        const [mensCol, goldCol, silverCol, diamondCol, cats] = await Promise.all([
          listBackendProducts({ collection: "Mens" }),
          listBackendProducts({ collection: "Gold" }),
          listBackendProducts({ collection: "Silver" }),
          listBackendProducts({ collection: "Diamond" }),
          listCategories("Mens"),
        ]);
        const merged = [...mensCol, ...goldCol, ...silverCol, ...diamondCol];
        const mensOnly = merged.filter(isMensJewelleryProduct);
        setProducts(dedupeProducts(mensOnly));
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

      <CollectionProductGrid
        products={filteredProducts}
        loading={loading}
        onEnquiry={openModal}
        imageClassName="w-[300px] h-[400px] object-cover hover:scale-105 transition-transform duration-500"
      />

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
