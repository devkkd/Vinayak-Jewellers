import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { listBackendProducts } from "../api/backendProductsAPI";
import { listCategories } from "../api/categoryAPI";
import {
  filterCollectionProducts,
  resolveCanonicalType,
  segmentsMatch,
  slugify,
} from "../utils/productFilter";

/** Load + filter collection page products by URL slug → exact DB category name */
export function useCollectionPage(collectionName, routePrefix) {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const pathParts = location.pathname.split("/").filter(Boolean);
  const urlSubcategory =
    pathParts.length > 1 && pathParts[0] === routePrefix ? pathParts[1] : null;

  const activeSlug =
    urlSubcategory ||
    (selectedSubcategory ? slugify(selectedSubcategory) : null);
  const canonicalType = resolveCanonicalType(categories, activeSlug);

  useEffect(() => {
    listCategories(collectionName)
      .then(setCategories)
      .catch((err) => console.error("Error loading categories:", err));
  }, [collectionName]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await listBackendProducts({ collection: collectionName });
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [collectionName]);

  useEffect(() => {
    if (!urlSubcategory || categories.length === 0) {
      if (!urlSubcategory) {
        setSelectedCategory(null);
        setSelectedSubcategory(null);
      }
      return;
    }

    const typeLabel = resolveCanonicalType(categories, urlSubcategory);
    if (!typeLabel) {
      setSelectedSubcategory(null);
      setSelectedCategory(null);
      return;
    }

    const parent = categories.find(
      (c) =>
        segmentsMatch(c.category, typeLabel) ||
        (c.subcategories || []).some((s) => segmentsMatch(s, typeLabel))
    );
    setSelectedCategory(parent || { category: typeLabel, subcategories: [] });
    setSelectedSubcategory(typeLabel);
  }, [urlSubcategory, categories]);

  const filteredProducts = filterCollectionProducts(products, {
    collectionName,
    canonicalType: canonicalType || null,
    categoryRows: categories,
  });

  return {
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory,
    categories,
    loading,
    urlSubcategory,
    filteredProducts,
  };
}
