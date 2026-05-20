import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listBackendProducts } from "../../api/backendProductsAPI";
import { listEnquiries } from "../../api/enquiryAPI";
import { listCategories } from "../../api/categoryAPI";

const DashboardHome = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [numProducts, setNumProducts] = useState(0);
  const [numEnquiries, setNumEnquiries] = useState(0);
  const [numCategories, setNumCategories] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem("adminToken") || localStorage.getItem("backendToken");
        const [productList, enquiryList, categoryList] = await Promise.all([
          listBackendProducts(),
          listEnquiries(token),
          listCategories(),
        ]);
        setNumProducts(productList?.length || 0);
        setNumEnquiries(enquiryList?.length || 0);
        setNumCategories(categoryList?.length || 0);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const cards = [
    {
      title: "Total Products",
      value: numProducts,
      path: "/dashboard/products",
      hint: "View & manage products",
    },
    {
      title: "Total Enquiries",
      value: numEnquiries,
      path: "/dashboard/enquiries",
      hint: "View customer enquiries",
    },
    {
      title: "Categories",
      value: numCategories,
      path: "/dashboard/categories",
      hint: "Manage categories",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#5C1D02] mb-6">
        Welcome to Vinayak Jewellers Admin Dashboard!
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <button
            key={card.path}
            type="button"
            onClick={() => navigate(card.path)}
            className="bg-[#FFF4DC] shadow-md rounded-lg p-6 text-center border border-[#E2C887]/40 hover:bg-[#F8E8B8] hover:shadow-lg hover:border-[#E2C887] transition-all cursor-pointer w-full group"
          >
            <h3 className="text-lg font-semibold text-[#5C1D02]">{card.title}</h3>
            <p className="text-2xl font-bold text-[#3B1C0A] mt-2">
              {loading ? "…" : card.value}
            </p>
            <p className="text-xs text-[#7A2D0E] mt-3 opacity-80 group-hover:opacity-100">
              {card.hint} →
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
