// import React, { useEffect, useMemo, useState } from "react";
// import { listBackendProducts } from "../../api/backendProductsAPI";

// const DashboardHome = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const list = await listBackendProducts();
//         setProducts(list);
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, []);

//   const numProducts = products.length;
//   const numCategories = useMemo(
//     () => new Set(products.map((p) => p.category).filter(Boolean)).size,
//     [products]
//   );

//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-[#5C1D02] mb-6">
//         Welcome to Vinayak Jewellers Admin Dashboard
//       </h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-[#FFF4DC] shadow-md rounded-lg p-6 text-center">
//           <h3 className="text-lg font-semibold text-[#5C1D02]">Total Products</h3>
//           <p className="text-2xl font-bold text-[#3B1C0A] mt-2">{loading ? "…" : numProducts}</p>
//         </div>
//         <div className="bg-[#FFF4DC] shadow-md rounded-lg p-6 text-center">
//           <h3 className="text-lg font-semibold text-[#5C1D02]">Total Enquiries</h3>
//           <p className="text-2xl font-bold text-[#3B1C0A] mt-2">0</p>
//         </div>
//         <div className="bg-[#FFF4DC] shadow-md rounded-lg p-6 text-center">
//           <h3 className="text-lg font-semibold text-[#5C1D02]">Categories</h3>
//           <p className="text-2xl font-bold text-[#3B1C0A] mt-2">{loading ? "…" : numCategories}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardHome;
import React, { useEffect, useMemo, useState } from "react";
import { listBackendProducts } from "../../api/backendProductsAPI"; // ✅ make sure this file exports a working API call

const DashboardHome = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enquiries, setEnquiries] = useState([]); // optional if you have enquiry API

  // ✅ Fetch products and enquiries on mount
  useEffect(() => {
    const load = async () => {
      try {
        const productList = await listBackendProducts();
        setProducts(productList || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // ✅ Calculate dynamic stats
  const numProducts = products.length;
  const numCategories = useMemo(() => {
    const uniqueCategories = new Set(
      products.map((p) => p.category).filter(Boolean)
    );
    return uniqueCategories.size;
  }, [products]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#5C1D02] mb-6">
        Welcome to Vinayak Jewellers Admin Dashboard!
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Products */}
        <div className="bg-[#FFF4DC] shadow-md rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-[#5C1D02]">Total Products</h3>
          <p className="text-2xl font-bold text-[#3B1C0A] mt-2">
            {loading ? "…" : numProducts}
          </p>
        </div>

        {/* Total Enquiries (static for now unless you fetch from API) */}
        <div className="bg-[#FFF4DC] shadow-md rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-[#5C1D02]">Total Enquiries</h3>
          <p className="text-2xl font-bold text-[#3B1C0A] mt-2">
            {loading ? "…" : enquiries.length || 0}
          </p>
        </div>

        {/* Total Categories */}
        <div className="bg-[#FFF4DC] shadow-md rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-[#5C1D02]">Categories</h3>
          <p className="text-2xl font-bold text-[#3B1C0A] mt-2">
            {loading ? "…" : numCategories}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
