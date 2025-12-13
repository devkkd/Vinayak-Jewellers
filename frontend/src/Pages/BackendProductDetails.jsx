import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBackendProductById } from "../api/backendProductsAPI";
import EnquiryModal from "../components/EnquiryModal";
import ContactSection from "../components/ContactSection";

const BackendProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await getBackendProductById(id);
      setProduct(data);
    };
    load();
  }, [id]);

  if (!product) return <div className="text-center py-20">Loading...</div>;

  // Get primary image - support both images array and single image field
  const getPrimaryImage = (p) => {
    if (p.images && p.images.length > 0) return p.images[0];
    if (p.image) return p.image;
    return "";
  };

  const primaryImage = getPrimaryImage(product);

  return (
    <section className="bg-[#FFF6DE] py-4 px-4 sm:px-6 md:px-12 min-h-screen">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 mb-16">
        <div className="bg-[#FFF4DC] p-5 rounded-2xl shadow-sm flex items-center justify-center w-full md:w-1/2">
          {primaryImage ? (
            <img src={primaryImage} alt={product.productName} className="w-[700px] h-[550px] object-cover rounded-xl" />
          ) : (
            <div className="w-[300px] h-[300px] flex items-center justify-center text-gray-400">No image</div>
          )}
        </div>
        <div className="flex flex-col items-start w-full md:w-1/2">
          <h2 className="text-3xl font-bold cinzelfont text-[#0E0100] mb-4">{product.productName}</h2>
          <p className="text-sm text-[#7A2D0E] mb-2">SKU: {product.sku}</p>
          {(product.collection || product.category) && (
            <p className="text-sm text-[#7A2D0E] mb-2">
              Category: {product.collection || product.category}
              {product.subcategory ? ` → ${product.subcategory}` : ""}
            </p>
          )}
          <div 
            className="text-[#2E1A08] mb-6 leading-relaxed [&_p]:mb-2 [&_strong]:font-bold [&_em]:italic [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_li]:mb-1 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-bold [&_h3]:text-lg [&_h3]:font-bold [&_u]:underline"
            dangerouslySetInnerHTML={{ __html: product.details || '' }}
          />
          <button 
            onClick={() => setModalOpen(true)} 
            className="bg-[#681F00] text-white text-sm px-6 py-3 rounded-full hover:bg-[#5a2b1a] transition-colors duration-300"
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
          productImage={primaryImage}
        />
      )}
    </section>
  );
};

export default BackendProductDetails;


