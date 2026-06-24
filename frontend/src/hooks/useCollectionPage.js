import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { listBackendProducts } from "../api/backendProductsAPI";
import { listCategories } from "../api/categoryAPI";
import { fetchCollectionPageProducts } from "../utils/collectionMembership";
import {
  filterCollectionProducts,
  mergeCategoryRows,
  resolveCanonicalType,
  segmentsMatch,
} from "../utils/productFilter";

/** Load + filter collection page products by URL slug → exact DB category name */
export function useCollectionPage(
  collectionName,
  routePrefix,
  adminCategoryRows = [],
  options = {}
) {
  const { loadProducts: loadProductsFn, useLinkedCollections = false } = options;
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const pathParts = location.pathname.split("/").filter(Boolean);
  const urlSubcategory =
    pathParts.length > 1 && pathParts[0] === routePrefix ? pathParts[1] : null;

  const displayCategories = useMemo(
    () => mergeCategoryRows(categories, adminCategoryRows),
    [categories, adminCategoryRows]
  );

  const activeSlug = urlSubcategory || null;
  const canonicalType = resolveCanonicalType(
    categories,
    activeSlug,
    adminCategoryRows,
    collectionName
  );

  useEffect(() => {
    listCategories(collectionName)
      .then(setCategories)
      .catch((err) => console.error("Error loading categories:", err));
  }, [collectionName]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = loadProductsFn
          ? await loadProductsFn()
          : await fetchCollectionPageProducts(listBackendProducts, collectionName);
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [collectionName, loadProductsFn]);

  useEffect(() => {
    if (!urlSubcategory) {
      setSelectedCategory(null);
      setSelectedSubcategory(null);
      return;
    }

    const typeLabel = resolveCanonicalType(
      categories,
      urlSubcategory,
      adminCategoryRows,
      collectionName
    );
    if (!typeLabel) {
      setSelectedSubcategory(null);
      setSelectedCategory(null);
      return;
    }

    const parent = displayCategories.find(
      (c) =>
        segmentsMatch(c.category, typeLabel) ||
        (c.subcategories || []).some((s) => segmentsMatch(s, typeLabel))
    );
    setSelectedCategory(parent || { category: typeLabel, subcategories: [] });
    setSelectedSubcategory(typeLabel);
  }, [urlSubcategory, categories, adminCategoryRows, displayCategories]);

  const filteredProducts = filterCollectionProducts(products, {
    collectionName,
    canonicalType: activeSlug ? canonicalType || null : null,
    categoryRows: displayCategories.length ? displayCategories : adminCategoryRows,
    useLinkedCollections,
  });

  return {
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory,
    categories: displayCategories,
    loading,
    urlSubcategory,
    filteredProducts,
  };
}
