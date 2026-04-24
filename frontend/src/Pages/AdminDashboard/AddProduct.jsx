import React, { useState, useEffect } from "react";
import { uploadBackendProduct } from "../../api/backendProductsAPI";
import {
  goldCategories,
  silverCategories,
  diamondCategories,
  giftingCategories,
  weddingCategories,
  birthStoneCategories,
  mensCategories,
} from "../../data/admincategories";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    images: [],
    title: "",
    sku: "",
    description: "",
    collection: "",
    category: "",
    subcategory: "",
  });

  const [availableCategories, setAvailableCategories] = useState([]); // Categories for selected collection
  const [availableSubcategories, setAvailableSubcategories] = useState([]); // Subcategories for selected category
  const [allCategories, setAllCategories] = useState({}); // All categories grouped by collection

  const getFlatSubcategories = (categories = []) => {
    const seen = new Set();
    const list = [];
    categories.forEach((cat) => {
      const categoryName = (cat.category || "").trim();
      if (categoryName) {
        const key = categoryName.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          list.push(categoryName);
        }
      }
      (cat.subcategories || []).forEach((sub) => {
        const subName = String(sub || "").trim();
        if (!subName) return;
        const key = subName.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          list.push(subName);
        }
      });
    });
    return list;
  };

  // Load categories from frontend data folder
  useEffect(() => {
    // Organize categories by collection
    const grouped = {
      "Gold": goldCategories,
      "Silver": silverCategories,
      "Diamond": diamondCategories,
      "Gifting": giftingCategories,
      "Wedding Collection": weddingCategories,
      "Birth Stones": birthStoneCategories,
      "Coins": [
        { category: "Gold", subcategories: [] },
        { category: "Silver", subcategories: [] }
      ],
      "Mens": mensCategories,
    };
    
    setAllCategories(grouped);
  }, []);

  // Handle collection change
  const handleCollectionChange = (e) => {
    const selectedCollection = e.target.value;
    setFormData({ 
      ...formData, 
      collection: selectedCollection, 
      category: "", 
      subcategory: "" 
    });

    // Get categories for selected collection
    const categories = allCategories[selectedCollection] || [];
    setAvailableCategories(categories);
    // Show subcategory options immediately after collection select
    setAvailableSubcategories(getFlatSubcategories(categories));
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    const selectedCategoryName = e.target.value;
    setFormData({ ...formData, category: selectedCategoryName, subcategory: "" });

    // Find the selected category object and get its subcategories
    const selectedCategory = availableCategories.find(
      (cat) => cat.category === selectedCategoryName
    );
    
    if (selectedCategory && selectedCategory.subcategories && selectedCategory.subcategories.length > 0) {
      setAvailableSubcategories(selectedCategory.subcategories);
      return;
    }

    // If no nested subcategories, still allow selecting this category as subcategory
    setAvailableSubcategories(selectedCategoryName ? [selectedCategoryName] : []);
  };


  // 🧠 Handle text/textarea inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🖼 Multiple image uploads (with previews)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

  // 🚀 Submit handler → backend upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.images.length) {
        alert("⚠️ Please select at least one image.");
        return;
      }

      const token = localStorage.getItem("adminToken") || localStorage.getItem("backendToken");
      if (!token) {
        alert("❌ No token found. Please log in first.");
        return;
      }

      await uploadBackendProduct({
        productName: formData.title,
        details: formData.description || formData.title,
        sku: formData.sku,
        collection: formData.collection,
        category: formData.category,
        subcategory: formData.subcategory,
        files: formData.images, // Send all images
        token,
      });

      alert("✅ Product uploaded successfully!");
      setFormData({
        images: [],
        title: "",
        sku: "",
        description: "",
        collection: "",
        category: "",
        subcategory: "",
      });
      setAvailableCategories([]);
      setAvailableSubcategories([]);
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Upload failed";
      alert(`❌ ${msg}`);
    }
  };

  return (
    <div className="bg-[#FFF9E6] p-8 rounded-2xl shadow-md border border-[#E2C887]/40 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-[#5C1D02] mb-6 text-center cinzelfont">
        Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Images */}
        <div>
          <label className="block text-[#3B1C0A] font-semibold mb-2">
            Product Images (Select multiple)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="block w-full border border-[#E2C887]/60 rounded-lg bg-[#FFF9E6] p-2 focus:outline-none focus:ring-2 focus:ring-[#E2C887]"
          />
          {formData.images.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-3">
              {formData.images.map((img, i) => (
                <div
                  key={i}
                  className="w-full aspect-square border border-[#E2C887]/60 rounded-lg overflow-hidden shadow-sm"
                >
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`preview-${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Title */}
        <div>
          <label className="block text-[#3B1C0A] font-semibold mb-2">
            Product Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full border border-[#E2C887]/60 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E2C887]"
            required
          />
        </div>

        {/* Product SKU */}
        <div>
          <label className="block text-[#3B1C0A] font-semibold mb-2">
            Product SKU
          </label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            placeholder="Unique SKU (e.g. GJ-1023)"
            className="w-full border border-[#E2C887]/60 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E2C887]"
            required
          />
        </div>

        {/* Product Description */}
        <div>
          <label className="block text-[#3B1C0A] font-semibold mb-2">
            Product Description <span className="text-xs text-gray-500">(HTML tags supported)</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="6"
            placeholder="Enter product description. You can use HTML tags for styling:&#10;&lt;p&gt;Paragraph text&lt;/p&gt;&#10;&lt;strong&gt;Bold text&lt;/strong&gt;&#10;&lt;em&gt;Italic text&lt;/em&gt;&#10;&lt;ul&gt;&lt;li&gt;List items&lt;/li&gt;&lt;/ul&gt;&#10;&lt;br/&gt; for line breaks"
            className="w-full border border-[#E2C887]/60 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E2C887] font-mono text-sm"
          ></textarea>
          <p className="text-xs text-gray-500 mt-1">
            Supported HTML tags: &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;u&gt;, &lt;br/&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;, &lt;h1&gt;-&lt;h6&gt;
          </p>
        </div>

        {/* Product Collection */}
        <div>
          <label className="block text-[#3B1C0A] font-semibold mb-2">
            Product Collection
          </label>
          <select
            name="collection"
            value={formData.collection}
            onChange={handleCollectionChange}
            className="w-full border border-[#E2C887]/60 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E2C887]"
            required
          >
            <option value="">Select Collection</option>
            {Object.keys(allCategories).map((collection) => (
              <option key={collection} value={collection}>
                {collection}
              </option>
            ))}
          </select>
        </div>

        {/* Product Category */}
        <div>
          <label className="block text-[#3B1C0A] font-semibold mb-2">
            Product Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleCategoryChange}
            disabled={!formData.collection || availableCategories.length === 0}
            className="w-full border border-[#E2C887]/60 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E2C887] disabled:bg-gray-100"
            required
          >
            <option value="">
              {!formData.collection 
                ? "Select Collection first" 
                : availableCategories.length === 0 
                ? "No categories available" 
                : "Select Category"}
            </option>
            {availableCategories.map((cat, i) => (
              <option key={i} value={cat.category}>
                {cat.category}
              </option>
            ))}
          </select>
        </div>

        {/* Product Sub-category */}
        <div>
          <label className="block text-[#3B1C0A] font-semibold mb-2">
            Product Sub-category
          </label>
          <select
            name="subcategory"
            value={formData.subcategory}
            onChange={handleChange}
            disabled={!formData.category}
            className="w-full border border-[#E2C887]/60 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E2C887] disabled:bg-gray-100"
          >
            <option value="">
              {!formData.category 
                ? "Select Category first" 
                : availableSubcategories.length === 0 
                ? "No subcategories (optional)" 
                : "Select Sub-category"}
            </option>
            {availableSubcategories.map((sub, i) => (
              <option key={i} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-[#5C1D02] text-[#FFF9E6] px-6 py-2 rounded-lg font-semibold hover:bg-[#3B1C0A] transition-all duration-300"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
