import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBackendProductById } from "../api/backendProductsAPI";
import EnquiryModal from "../components/EnquiryModal";
import ContactSection from "../components/ContactSection";

const BackendProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    const load = async () => {
      const data = await getBackendProductById(id);
      setProduct(data);

      // set default image
      if (data?.images?.length > 0) {
        setActiveImage(data.images[0]);
      } else if (data?.image) {
        setActiveImage(data.image);
      }
    };
    load();
  }, [id]);

  if (!product) return <div className="text-center py-20">Loading...</div>;

  // normalize images (array only)
  const images = product.images?.length
    ? product.images
    : product.image
    ? [product.image]
    : [];

  return (
    <section className="bg-[#FFF6DE] py-4 px-4 sm:px-6 md:px-12 min-h-screen">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 mb-16">

        {/* IMAGE GALLERY */}
        <div className="w-full md:w-1/2">
          <div className="bg-[#FFF4DC] p-4 rounded-2xl shadow-sm flex justify-center">
            {activeImage ? (
              <img
                src={activeImage}
                alt={product.productName}
                className="w-[700px] h-[550px] object-cover rounded-xl"
              />
            ) : (
              <div className="w-[300px] h-[300px] flex items-center justify-center text-gray-400">
                No image
              </div>
            )}
          </div>

          {/* THUMBNAILS */}
          {images.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`thumb-${index}`}
                  onClick={() => setActiveImage(img)}
                  className={`w-24 h-24 object-cover rounded-lg cursor-pointer border
                    ${activeImage === img ? "border-[#681F00]" : "border-transparent"}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* PRODUCT INFO */}
        <div className="flex flex-col w-full md:w-1/2">
          <h2 className="text-3xl font-bold cinzelfont text-[#0E0100] mb-4">
            {product.productName}
          </h2>

          <p className="text-sm text-[#7A2D0E] mb-2">SKU: {product.sku}</p>

          {(product.collection || product.category) && (
            <p className="text-sm text-[#7A2D0E] mb-2">
              Category: {product.collection || product.category}
              {product.subcategory ? ` → ${product.subcategory}` : ""}
            </p>
          )}

          <div
            className="text-[#2E1A08] mb-6 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: product.details || "" }}
          />

          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#681F00] w-1/2 text-white text-sm px-6 py-3 rounded-full hover:bg-[#5a2b1a]"
          >
            Enquiry Now →
          </button>
        </div>
      </div>

      <ContactSection />

      {modalOpen && (
        <EnquiryModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          productName={product.productName}
          productId={product._id}
          productImage={activeImage}
        />
      )}
    </section>
  );
};

export default BackendProductDetails;
