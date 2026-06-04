import React, { useState } from "react";
import { uploadBackendProduct } from "../../api/backendProductsAPI";
import { listCategories } from "../../api/categoryAPI";

const COLLECTIONS = [
  "Gold",
  "Silver",
  "Diamond",
  "Wedding Collection",
  "Gifting",
  "Birth Stones",
  "Coins",
  "Mens",
];

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

  const [dbCategories, setDbCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCollectionChange = async (e) => {
    const collection = e.target.value;
    setFormData((prev) => ({
      ...prev,
      collection,
      category: "",
      subcategory: "",
    }));
    setSubOptions([]);

    if (!collection) {
      setDbCategories([]);
      return;
    }

    setLoadingCategories(true);
    try {
      const cats = await listCategories(collection);
      setDbCategories(cats || []);
    } catch {
      setDbCategories([]);
      alert("Could not load categories. Add them in Categories panel first.");
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleCategoryChange = (e) => {
    const categoryName = e.target.value;
    const row = dbCategories.find((c) => c.category === categoryName);
    const subs = row?.subcategories?.filter(Boolean) || [];

    setSubOptions(subs);
    setFormData((prev) => ({
      ...prev,
      category: categoryName,
      subcategory: "",
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, images: Array.from(e.target.files || []) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.images.length) {
      alert("Please select at least one image.");
      return;
    }
    if (!formData.collection || !formData.category) {
      alert("Please select collection and category.");
      return;
    }
    if (subOptions.length > 0 && !formData.subcategory) {
      alert("Please select a sub-category.");
      return;
    }

    const token =
      localStorage.getItem("adminToken") || localStorage.getItem("backendToken");
    if (!token) {
      alert("Please log in first.");
      return;
    }

    const subcategory = formData.subcategory?.trim() || undefined;

    try {
      await uploadBackendProduct({
        productName: formData.title,
        details: formData.description || formData.title,
        sku: formData.sku,
        collection: formData.collection,
        category: formData.category,
        subcategory: subcategory || undefined,
        files: formData.images,
        token,
      });

      alert("Product uploaded successfully!");
      setFormData({
        images: [],
        title: "",
        sku: "",
        description: "",
        collection: "",
        category: "",
        subcategory: "",
      });
      setDbCategories([]);
      setSubOptions([]);
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Upload failed";
      alert(msg);
    }
  };

  return (
    <div className="bg-[#FFF9E6] p-8 rounded-2xl shadow-md border border-[#E2C887]/40 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-[#5C1D02] mb-2 text-center cinzelfont">
        Add New Product
      </h2>
      <p className="text-sm text-[#7A2D0E] text-center mb-6">
        Fill details → collection → category (required) → sub-category only if that category has sub-types
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-[#3B1C0A] font-semibold mb-2">Product Images *</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="block w-full border border-[#E2C887]/60 rounded-lg bg-white p-2"
            required
          />
        </div>

        <div>
          <label className="block text-[#3B1C0A] font-semibold mb-2">Product Name *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-[#E2C887]/60 rounded-lg p-3 bg-white"
            required
          />
        </div>

        <div>
          <label className="block text-[#3B1C0A] font-semibold mb-2">SKU *</label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            className="w-full border border-[#E2C887]/60 rounded-lg p-3 bg-white"
            required
          />
        </div>

        <div>
          <label className="block text-[#3B1C0A] font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border border-[#E2C887]/60 rounded-lg p-3 bg-white"
          />
        </div>

        <div className="border-t border-[#E2C887]/40 pt-4 space-y-4">
          <p className="text-sm font-semibold text-[#5C1D02]">Category (where product will show)</p>

          <div>
            <label className="block text-[#3B1C0A] font-semibold mb-2">1. Collection *</label>
            <select
              name="collection"
              value={formData.collection}
              onChange={handleCollectionChange}
              className="w-full border border-[#E2C887]/60 rounded-lg p-3 bg-white"
              required
            >
              <option value="">Select Collection</option>
              {COLLECTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[#3B1C0A] font-semibold mb-2">2. Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleCategoryChange}
              disabled={!formData.collection || loadingCategories}
              className="w-full border border-[#E2C887]/60 rounded-lg p-3 bg-white disabled:bg-gray-100"
              required
            >
              <option value="">
                {loadingCategories
                  ? "Loading..."
                  : !formData.collection
                    ? "Select collection first"
                    : dbCategories.length === 0
                      ? "No categories — add in Categories panel"
                      : "Select Category"}
              </option>
              {dbCategories.map((cat) => (
                <option key={cat._id || cat.category} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </select>
          </div>

          {subOptions.length > 0 && (
            <div>
              <label className="block text-[#3B1C0A] font-semibold mb-2">3. Sub-category *</label>
              <select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                className="w-full border border-[#E2C887]/60 rounded-lg p-3 bg-white"
                required
              >
                <option value="">Select Sub-category</option>
                {subOptions.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          )}

          {formData.category && subOptions.length === 0 && (
            <p className="text-xs text-[#7A2D0E] bg-[#FFF4DC] p-2 rounded">
              This product will appear under: <strong>{formData.collection}</strong> →{" "}
              <strong>{formData.category}</strong>
            </p>
          )}
        </div>

        <div className="text-center pt-2">
          <button
            type="submit"
            className="bg-[#5C1D02] text-[#FFF9E6] px-8 py-2 rounded-lg font-semibold hover:bg-[#3B1C0A]"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
