import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { listBackendProducts } from "../api/backendProductsAPI";
import { listCategories } from "../api/categoryAPI";
import { cacheKey, peekCache } from "../api/apiCache";
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
  const [products, setProducts] = useState(() => {
    const pageKey = cacheKey("collection-page", { collection: collectionName });
    return peekCache(pageKey) || peekCache(cacheKey("products", { collection: collectionName })) || [];
  });
  const [categories, setCategories] = useState([]);
  const [productsLoading, setProductsLoading] = useState(
    () =>
      !(
        peekCache(cacheKey("collection-page", { collection: collectionName })) ||
        peekCache(cacheKey("products", { collection: collectionName }))
      )
  );

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
    let cancelled = false;

    const pageKey = cacheKey("collection-page", { collection: collectionName });
    const cached =
      peekCache(pageKey) || peekCache(cacheKey("products", { collection: collectionName }));
    if (cached?.length) {
      setProducts(cached);
      setProductsLoading(false);
    } else {
      setProductsLoading(true);
    }

    const load = async () => {
      try {
        const [cats, data] = await Promise.all([
          listCategories(collectionName).catch(() => []),
          loadProductsFn
            ? loadProductsFn()
            : fetchCollectionPageProducts(listBackendProducts, collectionName),
        ]);
        if (!cancelled) {
          setCategories(cats);
          setProducts(data);
        }
      } catch (error) {
        console.error("Error loading collection page:", error);
        if (!cancelled && !cached?.length) setProducts([]);
      } finally {
        if (!cancelled) setProductsLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
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

  const filteredProducts = useMemo(
    () =>
      filterCollectionProducts(products, {
        collectionName,
        canonicalType: activeSlug ? canonicalType || null : null,
        categoryRows: displayCategories.length ? displayCategories : adminCategoryRows,
        useLinkedCollections,
      }),
    [
      products,
      collectionName,
      activeSlug,
      canonicalType,
      displayCategories,
      adminCategoryRows,
      useLinkedCollections,
    ]
  );

  return {
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory,
    categories: displayCategories,
    loading: productsLoading,
    productsLoading,
    urlSubcategory,
    filteredProducts,
  };
}
