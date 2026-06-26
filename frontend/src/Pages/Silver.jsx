import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import ContactSection from "../components/ContactSection";

import EnquiryModal from "../components/EnquiryModal";
import CollectionProductGrid from "../components/CollectionProductGrid";

import { categoryPillClass, subcategoryPillClass, matchesUrlSegment } from "../utils/categoryNavStyles";

import { slugify, shouldShowNestedSubcategories } from "../utils/productFilter";

import { useCollectionPage } from "../hooks/useCollectionPage";
import { silverCategories } from "../data/admincategories";



export default function Silver() {

  const navigate = useNavigate();



  const [modalOpen, setModalOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);



  const {

    selectedCategory,

    setSelectedCategory,

    selectedSubcategory,

    setSelectedSubcategory,

    categories,

    loading,

    urlSubcategory,

    filteredProducts,

  } = useCollectionPage("Silver", "silver", silverCategories);

  const handleShowAll = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    navigate("/silver", { replace: true });
  };

  const openModal = (product) => {

    setSelectedProduct(product);

    setModalOpen(true);

  };



  const closeModal = () => {

    setSelectedProduct(null);

    setModalOpen(false);

  };



  const handleCategoryClick = (category) => {

    if (shouldShowNestedSubcategories(category)) {

      setSelectedCategory(

        selectedCategory?.category === category.category ? null : category

      );

      setSelectedSubcategory(null);

      navigate("/silver", { replace: true });

      return;

    }

    setSelectedCategory(category);

    setSelectedSubcategory(category.category);

    navigate(`/silver/${slugify(category.category)}`, { replace: true });

  };



  const handleSubcategoryClick = (subcategory) => {

    setSelectedSubcategory(subcategory);

    navigate(`/silver/${slugify(subcategory)}`, { replace: true });

  };



  const handleBack = () => {

    setSelectedCategory(null);

    setSelectedSubcategory(null);

    navigate("/silver", { replace: true });

  };



  return (

    <section className="bg-[#FFF6DE] py-16 px-4 sm:px-6 md:px-12 min-h-screen">

      <div className="max-w-7xl mx-auto text-center mb-8">

        <h2 className="text-3xl md:text-4xl cinzelfont uppercase font-bold text-[#0E0100] mb-10 tracking-wide">

          Silver Jewellery

        </h2>

      </div>



      {categories.length > 0 && (

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            type="button"
            onClick={handleShowAll}
            className={categoryPillClass(!urlSubcategory && !selectedSubcategory)}
          >
            All
          </button>
          {categories.map((cat) => (

            <button

              key={cat._id || cat.category}

              onClick={() => handleCategoryClick(cat)}

              className={categoryPillClass(

                selectedCategory?.category === cat.category ||

                  matchesUrlSegment(cat.category, selectedSubcategory) ||

                  matchesUrlSegment(cat.category, urlSubcategory)

              )}

            >

              {cat.category}

            </button>

          ))}

        </div>

      )}



      {selectedCategory && shouldShowNestedSubcategories(selectedCategory) && (

        <div className="flex flex-wrap justify-center gap-2 mb-10">

          {selectedCategory.subcategories.map((sub, index) => (

            <button

              key={sub || index}

              onClick={() => handleSubcategoryClick(sub)}

              className={subcategoryPillClass(

                selectedSubcategory === sub || matchesUrlSegment(sub, urlSubcategory)

              )}

            >

              {sub}

            </button>

          ))}

          <button

            onClick={handleBack}

            className="px-3 py-1.5 text-xs sm:text-sm rounded-full bg-gray-300 text-gray-800 hover:bg-gray-400 transition"

          >

            Back

          </button>

        </div>

      )}



      <CollectionProductGrid
        products={filteredProducts}
        loading={loading}
        onEnquiry={openModal}
        imageClassName="w-[300px] h-[400px] object-cover hover:scale-105 transition-transform duration-500"
      />



      <ContactSection />



      {selectedProduct && (

        <EnquiryModal

          isOpen={modalOpen}

          onClose={closeModal}

          productName={selectedProduct.productName || selectedProduct.name}

          productId={selectedProduct._id}

          productImage={

            selectedProduct.images?.length > 0

              ? selectedProduct.images[0]

              : selectedProduct.image || ""

          }

        />

      )}

    </section>

  );

}

