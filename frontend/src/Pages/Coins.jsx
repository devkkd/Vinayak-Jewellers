import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContactSection from "../components/ContactSection";
import EnquiryModal from "../components/EnquiryModal";
import { listBackendProducts } from "../api/backendProductsAPI";

export default function Coins() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // Gold / Silver
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  /* ---------------- FETCH COINS PRODUCTS ---------------- */
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await listBackendProducts();

        // ONLY COINS PRODUCTS
        const coinsProducts = data.filter(
          (p) =>
            (p.collection || "").toLowerCase() === "coins" ||
            (p.category || "").toLowerCase() === "coins"
        );

        setProducts(coinsProducts);
      } catch (err) {
        console.error("Failed to load coins products", err);
      }
    };
    loadProducts();
  }, []);

  /* ---------------- STATIC FRONTEND CATEGORIES ---------------- */
  const categories = ["Gold", "Silver"];



  /* ---------------- FILTER LOGIC (FIXED) ---------------- */
  const filteredProducts = products.filter((p) => {
    const productSub = (p.category || "").toLowerCase().trim();
    const selectedSub = selectedSubcategory.toLowerCase().trim();
    const selectedCat = selectedCategory.toLowerCase().trim();

    // If category selected (Gold / Silver)
    if (selectedCategory) {
      if (!productSub.includes(selectedCat)) return false;
    }

    // If subcategory selected (price range)
    if (selectedSubcategory) {
      if (productSub !== selectedSub) return false;
    }

    return true;
  });

  /* ---------------- MODAL ---------------- */
  const openModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  /* ---------------- UI ---------------- */
  return (
    <section className="bg-[#FFF6DE] py-16 px-4 min-h-screen">
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0E0100] uppercase">
          Coins Collection
        </h2>
      </div>

      {/* Category Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setSelectedSubcategory("");
            }}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              selectedCategory === cat
                ? "bg-[#681F00] text-white"
                : "bg-[#FAEED1] text-[#681F00]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>


      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {filteredProducts.map((product) => {
            const image =
              product.images?.[0] || product.image || "";

            return (
              <div key={product._id}>
                <div
                  onClick={() => navigate(`/backend-product/${product._id}`)}
                  className="h-[380px] bg-[#FFF4DC] rounded-2xl flex items-center justify-center cursor-pointer"
                >
                  <img
                    src={image}
                    alt={product.productName}
                    className="h-full object-cover rounded-2xl hover:scale-105 transition"
                  />
                </div>

                <div className="mt-4 text-center">
                  <h4 className="text-sm font-medium text-[#0E0100] mb-2">
                    {product.productName}
                  </h4>

                  <button
                    onClick={() => openModal(product)}
                    className="bg-[#681F00] text-white text-xs px-5 py-2 rounded-full"
                  >
                    Enquiry Now →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-[#0E0100] font-medium mt-10">
          No coins found
        </div>
      )}

      {/* Contact */}
      <ContactSection />

      {/* Modal */}
      {selectedProduct && (
        <EnquiryModal
          isOpen={modalOpen}
          onClose={closeModal}
          productName={selectedProduct.productName}
          productId={selectedProduct._id}
          productImage={
            selectedProduct.images?.[0] || selectedProduct.image || ""
          }
        />
      )}
    </section>
  );
}
