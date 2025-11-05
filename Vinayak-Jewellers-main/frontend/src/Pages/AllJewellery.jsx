import React, { useState, useEffect } from "react";
import ContactSection from "../components/ContactSection";
import { useNavigate } from "react-router-dom";
import { listBackendProducts } from "../api/backendProductsAPI";
import EnquiryModal from "../components/EnquiryModal";
import { Link } from "react-router-dom";


export default function AllJewellery() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);  // ✅ fetched data state
  const [selectedCategory, setSelectedCategory] = useState("All Jewellery");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  // 🧠 Fetch data from backend
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await listBackendProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const categories = {
    "All Jewellery": [],
    Gold: ["Necklace", "Pendant Set", "Earrings", "Rings", "Bangles / Bracelets", "Anklets / Toe Rings", "Nose Pins", "Chain", "Mangalsutra"],
    Silver: ["Necklace", "Pendant Set", "Earrings", "Rings", "Bangles / Bracelets", "Anklets / Toe Rings", "Nose Pins", "Kamarbandh / Satka", "Watches", "Mozonight"],
    Diamond: ["Necklace", "Pendant Set", "Earrings", "Rings", "Bracelets", "Nose Pins"],
    Coins: [],
    "Wedding Collection": ["Traditional Gold", "Traditional Silver", "Hamel"],
    Gifting: ["Gold Gifts", "Silver Gifts"],
  };

  const filtered = selectedCategory === "All Jewellery"
    ? products
    : products.filter((p) =>
        selectedSubcategory
          ? p.category === selectedCategory && p.subcategory === selectedSubcategory
          : p.category === selectedCategory
      );

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  return (
    <section className="bg-[#FFF6DE] py-16 px-4 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl cinzelfont uppercase font-bold text-[#0E0100] mb-8 tracking-wide">
          All Jewellery
        </h2>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-wrap gap-3 justify-center">
        {Object.keys(categories).map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setSelectedSubcategory("");
            }}
            className={`px-4 py-2 rounded-full border ${selectedCategory === cat ? "bg-[#5C1D02] text-[#FFF9E6]" : "bg-white text-[#5C1D02]"}`}
          >
            {cat}
          </button>
        ))}
      </div>
      {selectedCategory !== "All Jewellery" && categories[selectedCategory].length > 0 && (
        <div className="max-w-7xl mx-auto mb-10 flex flex-wrap gap-2 justify-center">
          {categories[selectedCategory].map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubcategory(sub)}
              className={`px-3 py-1 rounded-full border text-sm ${selectedSubcategory === sub ? "bg-[#E2C887]" : "bg-white"}`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto mb-20">
        {filtered.map((product) => (
          <div key={product._id} className="flex flex-col items-start">
            {/* Clickable Image */}
            <div
  onClick={() => navigate(`/backend-product/${product._id}`)}
  className="w-full bg-[#FFF4DC] h-[400px] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex items-center justify-center"
>
  <img
    src={product.image}
    alt={product.productName}
    className="w-[200px] h-[200px] object-contain rounded-2xl hover:scale-105 transition-transform duration-500"
  />
</div>

            {/* Content Below Image */}
            <div className="w-full mt-4">
              <h4 className="text-sm text-[#0E0100] mb-5 font-medium tracking-wide h-10">
                {product.productName}
              </h4>
              <button
                onClick={() => openModal(product)}
                className="bg-[#681F00] text-white text-xs md:text-sm px-5 py-2 rounded-full hover:bg-[#5a2b1a] transition-colors duration-300 cursor-pointer"
              >
                Enquiry Now →
              </button>
            </div>
          </div>
        ))}
      </div>

      <ContactSection />

      {/* Enquiry Modal */}
      {selectedProduct && (
        <EnquiryModal
          isOpen={modalOpen}
          onClose={closeModal}
          productName={selectedProduct.productName}
          productId={selectedProduct._id}
          productImage={(selectedProduct.images && selectedProduct.images.length > 0) ? selectedProduct.images[0] : (selectedProduct.image || "")}
        />
      )}
    </section>
  );
}
