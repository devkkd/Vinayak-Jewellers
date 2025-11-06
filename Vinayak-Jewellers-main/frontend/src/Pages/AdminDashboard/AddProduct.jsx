// import React, { useState } from "react";
// import { uploadBackendProduct } from "../../api/backendProductsAPI";

// const AddProduct = () => {
//   const [formData, setFormData] = useState({
//     images: [],
//     title: "",
//     sku: "",
//     description: "",
//     category: "",
//     subcategory: "",
//   });

//   const [subcategories, setSubcategories] = useState([]);

//   // 🧭 Category → Subcategory logic
//   const handleCategoryChange = (e) => {
//     const selectedCategory = e.target.value;
//     setFormData({ ...formData, category: selectedCategory, subcategory: "" });

//     let subs = [];

//     switch (selectedCategory) {
//       case "All Jewellery":
//         subs = [
//           "Gold Jewellery",
//           "Silver Jewellery",
//           "Diamond Jewellery",
//           "Wedding Collection",
//           "Gifting",
//           "Coins",
//         ];
//         break;
//       case "Gold":
//         subs = [
//           "Necklace",
//           "Pendant Set",
//           "Earrings",
//           "Rings",
//           "Bangles / Bracelets",
//           "Anklets / Toe Rings",
//           "Nose Pins",
//           "Chain",
//           "Mangalsutra",
//         ];
//         break;
//       case "Silver":
//         subs = [
//           "Necklace",
//           "Pendant Set",
//           "Earrings",
//           "Rings",
//           "Bangles / Bracelets",
//           "Anklets / Toe Rings",
//           "Nose Pins",
//           "Kamarbandh / Satka",
//           "Watches",
//           "Mozonight",
//         ];
//         break;
//       case "Diamond":
//         subs = [
//           "Necklace",
//           "Pendant Set",
//           "Earrings",
//           "Rings",
//           "Bangles / Bracelets",
//           "Nose Pins",
//         ];
//         break;
//       case "Coins":
//         subs = ["Gold Coins", "Silver Coins"];
//         break;
//       case "Wedding Collection":
//         subs = ["Traditional Gold", "Traditional Silver", "Hamel"];
//         break;
//       case "Gifting":
//         subs = ["Gold Gifts", "Silver Gifts"];
//         break;
//       default:
//         subs = [];
//     }

//     setSubcategories(subs);
//   };

//   // 🧠 Handle text/textarea inputs
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // 🖼 Multiple image uploads (with previews)
//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setFormData({ ...formData, images: files });
//   };

//   // 🚀 Submit handler -> backend upload
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (!formData.images.length) {
//         alert("Please select at least one image");
//         return;
//       }
//       const token = localStorage.getItem("adminToken") || localStorage.getItem("backendToken");
//       await uploadBackendProduct({
//         productName: formData.title,
//         details: formData.description || formData.title,
//         sku: formData.sku,
//         collection: formData.category,
//         category: formData.category,
//         subcategory: formData.subcategory,
//         file: formData.images[0],
//         token,
//       });
//       alert("✅ Product uploaded successfully!");
//       setFormData({ images: [], title: "", sku: "", description: "", category: "", subcategory: "" });
//       setSubcategories([]);
//     } catch (err) {
//       const msg = err?.response?.data?.message || err.message || "Upload failed";
//       alert(`❌ ${msg}`);
//     }
//   };

//   return (
//     <div className="bg-[#FFF9E6] p-8 rounded-2xl shadow-md border border-[#E2C887]/40 max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold text-[#5C1D02] mb-6 text-center cinzelfont">
//         Add New Product
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Product Images */}
//         <div>
//           <label className="block text-[#3B1C0A] font-semibold mb-2">
//             Product Images (Select multiple)
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             multiple
//             onChange={handleImageChange}
//             className="block w-full border border-[#E2C887]/60 rounded-lg bg-[#FFF9E6] p-2 focus:outline-none focus:ring-2 focus:ring-[#E2C887]"
//           />
//           {formData.images.length > 0 && (
//             <div className="mt-4 grid grid-cols-3 gap-3">
//               {formData.images.map((img, i) => (
//                 <div
//                   key={i}
//                   className="w-full aspect-square border border-[#E2C887]/60 rounded-lg overflow-hidden shadow-sm"
//                 >
//                   <img
//                     src={URL.createObjectURL(img)}
//                     alt={`preview-${i}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Product Title */}
//         <div>
//           <label className="block text-[#3B1C0A] font-semibold mb-2">
//             Product Title
//           </label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             placeholder="Enter product name"
//             className="w-full border border-[#E2C887]/60 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E2C887]"
//             required
//           />
//         </div>

//         {/* Product SKU */}
//         <div>
//           <label className="block text-[#3B1C0A] font-semibold mb-2">
//             Product SKU
//           </label>
//           <input
//             type="text"
//             name="sku"
//             value={formData.sku}
//             onChange={handleChange}
//             placeholder="Unique SKU (e.g. GJ-1023)"
//             className="w-full border border-[#E2C887]/60 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E2C887]"
//             required
//           />
//         </div>

//         {/* Product Description */}
//         <div>
//           <label className="block text-[#3B1C0A] font-semibold mb-2">
//             Product Description
//           </label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             rows="4"
//             placeholder="Enter product description"
//             className="w-full border border-[#E2C887]/60 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E2C887]"
//           ></textarea>
//         </div>

//         {/* Category */}
//         <div>
//           <label className="block text-[#3B1C0A] font-semibold mb-2">
//             Product Category
//           </label>
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleCategoryChange}
//             className="w-full border border-[#E2C887]/60 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E2C887]"
//             required
//           >
//             <option value="">Select Category</option>
//             <option value="All Jewellery">All Jewellery</option>
//             <option value="Gold">Gold</option>
//             <option value="Silver">Silver</option>
//             <option value="Coins">Coins</option>
//             <option value="Wedding Collection">Wedding Collection</option>
//             <option value="Gifting">Gifting</option>
//             <option value="Diamond">Diamond</option>
//           </select>
//         </div>

//         {/* Sub-category */}
//         <div>
//           <label className="block text-[#3B1C0A] font-semibold mb-2">
//             Product Sub-category
//           </label>
//           <select
//             name="subcategory"
//             value={formData.subcategory}
//             onChange={handleChange}
//             disabled={!subcategories.length}
//             className="w-full border border-[#E2C887]/60 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E2C887] disabled:bg-gray-100"
//             required
//           >
//             <option value="">Select Sub-category</option>
//             {subcategories.map((sub, i) => (
//               <option key={i} value={sub}>
//                 {sub}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Submit */}
//         <div className="text-center">
//           <button
//             type="submit"
//             className="bg-[#5C1D02] text-[#FFF9E6] px-6 py-2 rounded-lg font-semibold hover:bg-[#3B1C0A] transition-all duration-300"
//           >
//             Add Product
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";
import { uploadBackendProduct } from "../../api/backendProductsAPI";
import { listCategories } from "../../api/categoryAPI";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    images: [],
    title: "",
    sku: "",
    description: "",
    category: "",
    subcategory: "",
  });

  const [subcategories, setSubcategories] = useState([]);
  const [allCategories, setAllCategories] = useState({});
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoryError, setCategoryError] = useState(null);

  // Load categories from backend
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoadingCategories(true);
        setCategoryError(null);
        const categories = await listCategories();
        console.log("Loaded categories:", categories);
        
        // Group by collection
        const grouped = {};
        categories.forEach((cat) => {
          if (!grouped[cat.collection]) {
            grouped[cat.collection] = [];
          }
          grouped[cat.collection].push({
            category: cat.category,
            subcategories: cat.subcategories || [],
          });
        });
        
        console.log("Grouped categories:", grouped);
        
        // If no categories from backend, use default collections as fallback
        if (Object.keys(grouped).length === 0) {
          setCategoryError("No categories found in backend. Using default collections. Please add categories from Manage Categories page.");
          // Set default collections so user can still add products
          const defaultCollections = {
            "Gold": [],
            "Silver": [],
            "Diamond": [],
            "Wedding Collection": [],
            "Gifting": [],
            "Birth Stones": [],
            "Coins": []
          };
          setAllCategories(defaultCollections);
        } else {
          setAllCategories(grouped);
        }
      } catch (error) {
        console.error("Error loading categories:", error);
        setCategoryError(`Failed to load categories: ${error.message || "Please check your connection"}. Using default collections.`);
        // Fallback to default collections on error
        const defaultCollections = {
          "Gold": [],
          "Silver": [],
          "Diamond": [],
          "Wedding Collection": [],
          "Gifting": [],
          "Birth Stones": [],
          "Coins": []
        };
        setAllCategories(defaultCollections);
      } finally {
        setLoadingCategories(false);
      }
    };
    loadCategories();
  }, []);

  // Reload categories function
  const reloadCategories = async () => {
    try {
      setLoadingCategories(true);
      const categories = await listCategories();
      const grouped = {};
      categories.forEach((cat) => {
        if (!grouped[cat.collection]) {
          grouped[cat.collection] = [];
        }
        grouped[cat.collection].push({
          category: cat.category,
          subcategories: cat.subcategories || [],
        });
      });
      setAllCategories(grouped);
      
      // Update subcategories if category is selected
      if (formData.category) {
        const subs = grouped[formData.category] || [];
        setSubcategories(subs);
      }
    } catch (error) {
      console.error("Error reloading categories:", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  // 🧭 Category → Subcategory logic (dynamic from backend)
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setFormData({ ...formData, category: selectedCategory, subcategory: "" });

    // Get subcategories from backend data
    const subs = allCategories[selectedCategory] || [];
    setSubcategories(subs);
    setSelectedCategoryForSub(null);
  };

  // Add new category
  const handleAddCategory = async () => {
    if (!newCategoryName.trim() || !newCategoryCollection.trim()) {
      alert("Please enter both collection and category name");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken") || localStorage.getItem("backendToken");
      if (!token) {
        alert("Please log in first");
        return;
      }

      await createCategory({
        collection: newCategoryCollection.trim(),
        category: newCategoryName.trim(),
        subcategories: [],
      }, token);

      alert(`✅ Category "${newCategoryName}" added successfully!`);
      setNewCategoryName("");
      setNewCategoryCollection("");
      setShowAddCategory(false);
      await reloadCategories();
      
      // Auto-select the newly added category
      setFormData({ ...formData, category: newCategoryCollection.trim() });
      handleCategoryChange({ target: { value: newCategoryCollection.trim() } });
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || "Failed to add category";
      alert(`❌ ${msg}`);
    }
  };

  // Add subcategory to selected category
  const handleAddSubcategory = async () => {
    if (!newSubcategoryName.trim()) {
      alert("Please enter subcategory name");
      return;
    }

    if (!formData.category) {
      alert("Please select a category (collection) first");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken") || localStorage.getItem("backendToken");
      if (!token) {
        alert("Please log in first");
        return;
      }

      // Find the category ID - formData.category is the collection, selectedCategoryForSub is the category name
      const categories = await listCategories();
      const categoryName = selectedCategoryForSub || (subcategories.length > 0 ? subcategories[0].category : "General");
      
      const found = categories.find(
        (cat) => cat.collection === formData.category && cat.category === categoryName
      );

      if (!found || !found._id) {
        // If category doesn't exist, create it first with the subcategory
        await createCategory({
          collection: formData.category,
          category: categoryName,
          subcategories: [newSubcategoryName.trim()],
        }, token);
      } else {
        // Add subcategory to existing category
        await addSubcategory(found._id, newSubcategoryName.trim(), token);
      }

      alert(`✅ Subcategory "${newSubcategoryName}" added successfully!`);
      setNewSubcategoryName("");
      setShowAddSubcategory(false);
      setSelectedCategoryForSub(null);
      await reloadCategories();
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || "Failed to add subcategory";
      alert(`❌ ${msg}`);
    }
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
        collection: formData.category,
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
        category: "",
        subcategory: "",
      });
      setSubcategories([]);
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
            Product Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Enter product description"
            className="w-full border border-[#E2C887]/60 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E2C887]"
          ></textarea>
        </div>

        {/* Product Category */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-[#3B1C0A] font-semibold">
              Product Category (Collection)
            </label>
            <button
              type="button"
              onClick={() => setShowAddCategory(!showAddCategory)}
              className="text-xs bg-[#5C1D02] text-white px-3 py-1 rounded-md hover:bg-[#3B1C0A] transition"
            >
              {showAddCategory ? "✕ Cancel" : "+ Add Category"}
            </button>
          </div>
          
          {showAddCategory && (
            <div className="mb-3 p-3 bg-[#FFF4DC] border border-[#E2C887]/60 rounded-lg">
              <div className="space-y-2">
                <select
                  value={newCategoryCollection}
                  onChange={(e) => setNewCategoryCollection(e.target.value)}
                  className="w-full border border-[#E2C887]/60 rounded-lg p-2 text-sm"
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
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Enter category name (e.g., Neckwear, Earrings)"
                  className="w-full border border-[#E2C887]/60 rounded-lg p-2 text-sm"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleAddCategory();
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="w-full bg-[#5C1D02] text-white px-3 py-2 rounded-md hover:bg-[#3B1C0A] transition text-sm"
                >
                  Add Category
                </button>
              </div>
            </div>
          )}

          {loadingCategories ? (
            <div className="w-full border border-[#E2C887]/60 rounded-lg p-3 bg-gray-100 text-gray-500">
              Loading categories...
            </div>
          ) : (
            <>
              {categoryError && (
                <div className="w-full border border-yellow-300 rounded-lg p-2 bg-yellow-50 text-yellow-700 text-xs mb-2">
                  {categoryError}
                </div>
              )}
              <select
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
                className="w-full border border-[#E2C887]/60 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E2C887]"
                required
              >
                <option value="">Select Category (Collection)</option>
                {Object.keys(allCategories).map((collection) => (
                  <option key={collection} value={collection}>
                    {collection}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>

        {/* Product Sub-category */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-[#3B1C0A] font-semibold">
              Product Sub-category
            </label>
            {formData.category && (
              <button
                type="button"
                onClick={() => {
                  if (subcategories.length > 0) {
                    setSelectedCategoryForSub(subcategories[0].category);
                  }
                  setShowAddSubcategory(!showAddSubcategory);
                }}
                className="text-xs bg-[#5C1D02] text-white px-3 py-1 rounded-md hover:bg-[#3B1C0A] transition"
              >
                {showAddSubcategory ? "✕ Cancel" : "+ Add Subcategory"}
              </button>
            )}
          </div>

          {showAddSubcategory && formData.category && (
            <div className="mb-3 p-3 bg-[#FFF4DC] border border-[#E2C887]/60 rounded-lg">
              <div className="space-y-2">
                {subcategories.length > 0 ? (
                  <select
                    value={selectedCategoryForSub || subcategories[0].category}
                    onChange={(e) => setSelectedCategoryForSub(e.target.value)}
                    className="w-full border border-[#E2C887]/60 rounded-lg p-2 text-sm"
                  >
                    {subcategories.map((item, i) => (
                      <option key={i} value={item.category}>
                        {item.category}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={selectedCategoryForSub || ""}
                    onChange={(e) => setSelectedCategoryForSub(e.target.value)}
                    placeholder="Enter category name (e.g., Neckwear)"
                    className="w-full border border-[#E2C887]/60 rounded-lg p-2 text-sm"
                  />
                )}
                <input
                  type="text"
                  value={newSubcategoryName}
                  onChange={(e) => setNewSubcategoryName(e.target.value)}
                  placeholder="Enter subcategory name (e.g., Gold Chains, Necklaces)"
                  className="w-full border border-[#E2C887]/60 rounded-lg p-2 text-sm"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleAddSubcategory();
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddSubcategory}
                  className="w-full bg-[#5C1D02] text-white px-3 py-2 rounded-md hover:bg-[#3B1C0A] transition text-sm"
                >
                  Add Subcategory
                </button>
              </div>
            </div>
          )}

          <select
            name="subcategory"
            value={formData.subcategory}
            onChange={handleChange}
            disabled={!subcategories.length || !formData.category}
            className="w-full border border-[#E2C887]/60 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E2C887] disabled:bg-gray-100"
            required
          >
            <option value="">
              {!formData.category 
                ? "Select Category first" 
                : subcategories.length === 0 
                ? "No subcategories available" 
                : "Select Sub-category"}
            </option>
            {subcategories.map((item, i) => {
              // If category has subcategories, show them
              if (item.subcategories && item.subcategories.length > 0) {
                return (
                  <optgroup key={i} label={item.category}>
                    {item.subcategories.map((sub, j) => (
                      <option key={j} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </optgroup>
                );
              }
              // If no subcategories, show category itself as option
              return (
                <option key={i} value={item.category}>
                  {item.category}
                </option>
              );
            })}
          </select>
          {formData.category && subcategories.length === 0 && !showAddSubcategory && (
            <p className="text-sm text-gray-500 mt-1">
              No subcategories found. Click "+ Add Subcategory" to add one.
            </p>
          )}
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
