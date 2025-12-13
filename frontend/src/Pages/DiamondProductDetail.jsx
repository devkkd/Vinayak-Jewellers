import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBackendProductById } from "../api/backendProductsAPI";
import EnquiryModal from "../components/EnquiryModal";
import ContactSection from "../components/ContactSection";

export default function DiamondProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getBackendProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Error loading product:", error);
      }
    };
    load();
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold text-[#681F00]">
        Loading Diamond Jewellery details...
      </div>
    );
  }

  // Get primary image - support both images array and single image field
  const getPrimaryImage = (p) => {
    if (p.images && p.images.length > 0) return p.images[0];
    if (p.image) return p.image;
    return "";
  };

  const primaryImage = getPrimaryImage(product);

  return (
    <section className="bg-[#FFF6DE] py-16 px-4 sm:px-6 md:px-12 min-h-screen">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-16">
        {/* LEFT - IMAGE */}
        <div className="flex justify-center items-center">
          <div className="overflow-hidden rounded-2xl shadow-lg w-full max-w-md flex justify-center items-center">
            {primaryImage ? (
              <img
                src={primaryImage}
                alt={product.productName}
                className="w-[440px] h-[480px] object-cover transform transition-transform duration-500 hover:scale-110 rounded-2xl"
              />
            ) : (
              <div className="w-[440px] h-[480px] flex items-center justify-center text-gray-400 bg-gray-100 rounded-2xl">
                No image
              </div>
            )}
          </div>
        </div>

        {/* RIGHT - DETAILS */}
        <div className="bg-[#FAEED1] rounded-2xl shadow-md p-8 space-y-6">
          <h2 className="text-3xl font-bold text-[#0E0100]">{product.productName}</h2>

          {product.sku && (
            <p className="text-[#681F00] font-medium">
              SKU: <span className="text-[#0E0100]">{product.sku}</span>
            </p>
          )}

          <p className="text-[#681F00] font-medium">
            Category:{" "}
            <span className="text-[#0E0100]">
              {product.collection || product.category}
              {product.subcategory ? ` → ${product.subcategory}` : ""}
            </span>
          </p>

          <div 
            className="text-[#0E0100] text-sm leading-relaxed [&_p]:mb-2 [&_strong]:font-bold [&_em]:italic [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_li]:mb-1 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-bold [&_h3]:text-lg [&_h3]:font-bold [&_u]:underline"
            dangerouslySetInnerHTML={{ __html: product.details || `This exquisite piece from our Diamond Jewellery collection is crafted with precision and elegance to suit every occasion.` }}
          />

          <div className="pt-2">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-[#681F00] text-white px-6 py-2 rounded-full hover:bg-[#5a2b1a] transition"
            >
              Enquiry Now →
            </button>

            <button
              onClick={() => navigate("/diamond")}
              className="ml-3 bg-gray-300 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-400 transition"
            >
              Back to Diamond Jewellery
            </button>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <ContactSection />

      {/* Enquiry Modal */}
      {modalOpen && (
        <EnquiryModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          productName={product.productName}
          productImage={primaryImage}
          productId={product._id}
        />
      )}
    </section>
  );
}
