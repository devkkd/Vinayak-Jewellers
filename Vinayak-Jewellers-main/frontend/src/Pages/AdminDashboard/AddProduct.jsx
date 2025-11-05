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

// export default AddProduct;
import React, { useState } from "react";
import {
  goldCategories,
  silverCategories,
  diamondCategories,
  giftingCategories,
  weddingCategories,
  birthStoneCategories,
} from "../../data/admincategories";
import { uploadBackendProduct } from "../../api/backendProductsAPI";

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

  // 🧭 Category → Subcategory logic (dynamic from admincategories.js)
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setFormData({ ...formData, category: selectedCategory, subcategory: "" });

    let subs = [];

    switch (selectedCategory) {
      case "Gold":
        subs = goldCategories;
        break;
      case "Silver":
        subs = silverCategories;
        break;
      case "Diamond":
        subs = diamondCategories;
        break;
      case "Gifting":
        subs = giftingCategories;
        break;
      case "Wedding Collection":
        subs = weddingCategories;
        break;
      case "Birth Stones":
        subs = birthStoneCategories;
        break;
      case "Coins":
        subs = [{ category: "Coins", subcategories: ["Gold Coins", "Silver Coins"] }];
        break;
      default:
        subs = [];
    }

    setSubcategories(subs);
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
          <label className="block text-[#3B1C0A] font-semibold mb-2">
            Product Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleCategoryChange}
            className="w-full border border-[#E2C887]/60 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E2C887]"
            required
          >
            <option value="">Select Category</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Diamond">Diamond</option>
            <option value="Wedding Collection">Wedding Collection</option>
            <option value="Gifting">Gifting</option>
            <option value="Birth Stones">Birth Stones</option>
            <option value="Coins">Coins</option>
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
            disabled={!subcategories.length}
            className="w-full border border-[#E2C887]/60 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E2C887] disabled:bg-gray-100"
            required
          >
            <option value="">Select Sub-category</option>
            {subcategories.map((item, i) =>
              item.subcategories?.length ? (
                <optgroup key={i} label={item.category}>
                  {item.subcategories.map((sub, j) => (
                    <option key={j} value={sub}>
                      {sub}
                    </option>
                  ))}
                </optgroup>
              ) : (
                <option key={i} value={item.category}>
                  {item.category}
                </option>
              )
            )}
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
