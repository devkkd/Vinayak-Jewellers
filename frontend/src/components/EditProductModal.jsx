import React, { useState, useEffect } from "react";
import {
  goldCategories,
  silverCategories,
  diamondCategories,
  giftingCategories,
  weddingCategories,
  birthStoneCategories,
  coinsCategories,
} from "../data/admincategories";

const EditProductModal = ({ isOpen, onClose, product, onSave }) => {
  const [formData, setFormData] = useState({
    productName: "",
    details: "",
    sku: "",
    collection: "",
    category: "",
    subcategory: "",
    image: null,
  });

  const [availableCategories, setAvailableCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const getCategoriesByCollection = (collection) => {
    switch (collection) {
      case "Gold":
        return goldCategories;
      case "Silver":
        return silverCategories;
      case "Diamond":
        return diamondCategories;
      case "Gifting":
        return giftingCategories;
      case "Wedding Collection":
        return weddingCategories;
      case "Birth Stones":
        return birthStoneCategories;
      case "Coins":
        return coinsCategories;
      default:
        return [];
    }
  };

  useEffect(() => {
    if (product) {
      const initialCollection = product.collection || "";
      const initialCategory = product.category || "";
      const initialSubcategory = product.subcategory || "";
      const categoriesForCollection = getCategoriesByCollection(initialCollection);

      setFormData({
        productName: product.productName || "",
        details: product.details || "",
        sku: product.sku || "",
        collection: initialCollection,
        category: initialCategory,
        subcategory: initialSubcategory,
        image: null,
      });

      setAvailableCategories(categoriesForCollection);
      loadSubcategories(initialCollection, initialCategory, initialSubcategory);
    }
  }, [product]);

  const loadSubcategories = (selectedCollection, selectedCategory = "", existingSubcategory = "") => {
    const categories = getCategoriesByCollection(selectedCollection);
    const chosen = categories.find((item) => item.category === selectedCategory);
    const options = chosen?.subcategories?.length
      ? chosen.subcategories
      : selectedCategory
        ? [selectedCategory]
        : [];

    // Keep already saved subcategory visible if it does not exist in current options
    if (
      existingSubcategory &&
      !options.some((item) => item.toLowerCase() === existingSubcategory.toLowerCase())
    ) {
      setSubcategories([existingSubcategory, ...options]);
      return;
    }
    setSubcategories(options);
  };

  const handleCollectionChange = (e) => {
    const selectedCollection = e.target.value;
    const categories = getCategoriesByCollection(selectedCollection);
    setAvailableCategories(categories);
    setFormData({ ...formData, collection: selectedCollection, category: "", subcategory: "" });
    setSubcategories([]);
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setFormData({ ...formData, category: selectedCategory, subcategory: "" });
    loadSubcategories(formData.collection, selectedCategory);
  };

  if (!isOpen || !product) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files?.[0] || null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(product._id, formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl w-11/12 max-w-2xl p-8 relative shadow-xl max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-5 text-gray-600 hover:text-[#681F00] text-2xl font-bold">
          ×
        </button>
        <h2 className="text-2xl font-bold text-[#5C1D02] mb-6 cinzelfont">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#3B1C0A] font-semibold mb-2">Product Name</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="w-full border border-[#E2C887]/60 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E2C887]"
              required
            />
          </div>
          <div>
            <label className="block text-[#3B1C0A] font-semibold mb-2">SKU</label>
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              className="w-full border border-[#E2C887]/60 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E2C887]"
              required
            />
          </div>
          <div>
            <label className="block text-[#3B1C0A] font-semibold mb-2">
              Description <span className="text-xs text-gray-500">(HTML tags supported)</span>
            </label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              rows="6"
              placeholder="Enter product description. You can use HTML tags for styling:&#10;&lt;p&gt;Paragraph text&lt;/p&gt;&#10;&lt;strong&gt;Bold text&lt;/strong&gt;&#10;&lt;em&gt;Italic text&lt;/em&gt;&#10;&lt;ul&gt;&lt;li&gt;List items&lt;/li&gt;&lt;/ul&gt;&#10;&lt;br/&gt; for line breaks"
              className="w-full border border-[#E2C887]/60 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E2C887] font-mono text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              Supported HTML tags: &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;u&gt;, &lt;br/&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;, &lt;h1&gt;-&lt;h6&gt;
            </p>
          </div>
          <div>
            <label className="block text-[#3B1C0A] font-semibold mb-2">Collection</label>
            <select
              name="collection"
              value={formData.collection}
              onChange={handleCollectionChange}
              className="w-full border border-[#E2C887]/60 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E2C887]"
            >
              <option value="">Select Collection</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Diamond">Diamond</option>
              <option value="Wedding Collection">Wedding Collection</option>
              <option value="Gifting">Gifting</option>
              <option value="Birth Stones">Birth Stones</option>
              <option value="Coins">Coins</option>
            </select>
          </div>
          <div>
            <label className="block text-[#3B1C0A] font-semibold mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleCategoryChange}
              disabled={!formData.collection || availableCategories.length === 0}
              className="w-full border border-[#E2C887]/60 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E2C887]"
            >
              <option value="">Select Category</option>
              {availableCategories.map((item) => (
                <option key={item.category} value={item.category}>
                  {item.category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[#3B1C0A] font-semibold mb-2">Subcategory</label>
            <select
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              disabled={!formData.category || !subcategories.length}
              className="w-full border border-[#E2C887]/60 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E2C887] disabled:bg-gray-100"
            >
              <option value="">Select Sub-category</option>
              {subcategories.map((sub, i) => (
                <option key={i} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[#3B1C0A] font-semibold mb-2">New Image (Optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-[#E2C887]/60 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E2C887]"
            />
            {!formData.image && (() => {
              const currentImage = (product.images && product.images.length > 0) ? product.images[0] : (product.image || "");
              return currentImage ? (
                <p className="text-xs text-gray-500 mt-1">Current: <img src={currentImage} alt="current" className="inline w-16 h-16 object-cover rounded" /></p>
              ) : null;
            })()}
          </div>
          <div className="flex gap-3 justify-end mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-[#E2C887]/60 rounded-lg text-[#5C1D02] hover:bg-[#E2C887]/20">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-[#5C1D02] text-[#FFF9E6] rounded-lg hover:bg-[#3B1C0A]">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;

