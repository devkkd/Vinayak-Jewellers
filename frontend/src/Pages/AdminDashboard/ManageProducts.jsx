import React, { useEffect, useMemo, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { listBackendProducts, deleteBackendProduct, updateBackendProduct } from "../../api/backendProductsAPI";
import EditProductModal from "../../components/EditProductModal";
import {
  goldCategories,
  silverCategories,
  diamondCategories,
  giftingCategories,
  weddingCategories,
  birthStoneCategories,
  coinsCategories,
} from "../../data/admincategories";

const PRODUCT_CATEGORIES = [
  "Gold",
  "Silver",
  "Diamond",
  "Wedding Collection",
  "Gifting",
  "Birth Stones",
  "Coins",
];

const COLLECTION_TO_GROUPS = {
  Gold: goldCategories,
  Silver: silverCategories,
  Diamond: diamondCategories,
  "Wedding Collection": weddingCategories,
  Gifting: giftingCategories,
  "Birth Stones": birthStoneCategories,
  Coins: coinsCategories,
};

function flattenSubcategoryLabels(groups) {
  const seen = new Set();
  const out = [];
  for (const item of groups || []) {
    const main = (item.category || "").trim();
    if (main) {
      const key = main.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        out.push(main);
      }
    }
    for (const sub of item.subcategories || []) {
      const s = String(sub).trim();
      if (!s) continue;
      const key = s.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        out.push(s);
      }
    }
  }
  return out.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
}

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const subcategoryOptions = useMemo(() => {
    if (!selectedCategory) return [];
    const groups = COLLECTION_TO_GROUPS[selectedCategory];
    return flattenSubcategoryLabels(groups);
  }, [selectedCategory]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const filters = {};
        if (selectedCategory) filters.collection = selectedCategory;
        if (selectedSubcategory) filters.subcategory = selectedSubcategory;
        const list = await listBackendProducts(filters);
        setProducts(list);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [selectedCategory, selectedSubcategory]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    const token = localStorage.getItem("adminToken") || localStorage.getItem("backendToken");
    try {
      await deleteBackendProduct(id, token);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (e) {
      alert("Failed to delete");
    }
  };

  const handleEdit = (id) => {
    const current = products.find((p) => p._id === id);
    if (current) setEditingProduct(current);
  };

  const handleSaveEdit = async (id, formData) => {
    const token = localStorage.getItem("adminToken") || localStorage.getItem("backendToken");
    try {
      const updated = await updateBackendProduct(id, formData, token);
      setProducts((prev) => prev.map((p) => (p._id === id ? { ...p, ...updated } : p)));
      setEditingProduct(null);
      alert("Product updated successfully!");
    } catch (e) {
      alert("Failed to update");
    }
  };

  return (
    <div className="flex gap-6">
      <main className="flex-1 bg-[#FFF9E6] border border-[#E2C887]/40 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between mb-4">
          <h2 className="text-2xl font-bold text-[#5C1D02] cinzelfont">All Products</h2>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:items-center">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedSubcategory("");
              }}
              className="w-full sm:w-56 border border-[#E2C887]/60 rounded-lg p-2 bg-white text-[#3B1C0A] focus:outline-none focus:ring-2 focus:ring-[#E2C887]"
            >
              <option value="">All Categories</option>
              {PRODUCT_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
              disabled={!selectedCategory || subcategoryOptions.length === 0}
              className="w-full sm:w-56 border border-[#E2C887]/60 rounded-lg p-2 bg-white text-[#3B1C0A] focus:outline-none focus:ring-2 focus:ring-[#E2C887] disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              <option value="">All subcategories</option>
              {subcategoryOptions.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        </div>
        {loading ? (
          <p className="text-[#3B1C0A]">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-[#3B1C0A] italic">
            {selectedSubcategory && selectedCategory
              ? `No products found in ${selectedCategory} → ${selectedSubcategory}.`
              : selectedCategory
                ? `No products found in ${selectedCategory}.`
                : "No products found."}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p) => {
              // Get primary image - support both images array and single image field
              const primaryImage = (p.images && p.images.length > 0) ? p.images[0] : (p.image || "");
              
              return (
              <div
                key={p._id}
                className="bg-white border border-[#E2C887]/60 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                {primaryImage ? (
                  <div className="w-full h-52 sm:h-56 bg-[#FAF6EF] border-b border-[#E2C887]/40 flex items-center justify-center p-3">
                    <img
                      src={primaryImage}
                      alt={p.productName}
                      className="max-h-full max-w-full w-auto h-auto object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-full h-52 sm:h-56 bg-gray-100 border-b border-[#E2C887]/40 flex items-center justify-center text-gray-400 text-xs">
                    No image
                  </div>
                )}
                <div className="p-4">
                  <h5
                    className="text-[#3B1C0A] font-semibold text-sm sm:text-base leading-snug line-clamp-3 break-words"
                    title={p.productName}
                  >
                    {p.productName}
                  </h5>
                  <p className="text-xs text-[#7A2D0E] mt-1 truncate" title={p.sku}>
                    SKU: {p.sku}
                  </p>
                  <div className="flex justify-between mt-3">
                    <button
                      onClick={() => handleEdit(p._id)}
                      className="flex items-center gap-1 bg-[#FFF4DC] text-[#5C1D02] border border-[#E2C887]/60 px-3 py-1 rounded-md hover:bg-[#E2C887]/20 transition"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="flex items-center gap-1 bg-[#5C1D02] text-[#FFF9E6] px-3 py-1 rounded-md hover:bg-[#3B1C0A] transition"
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </div>
                </div>
              </div>
            );
            })}
          </div>
        )}
      </main>
      {editingProduct && (
        <EditProductModal
          isOpen={!!editingProduct}
          onClose={() => setEditingProduct(null)}
          product={editingProduct}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default ManageProducts;
