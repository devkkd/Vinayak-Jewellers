import { Link } from "react-router-dom";
import BannerSlider from "../components/BannerSlider";
import { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home() {
  const [hoveredReel, setHoveredReel] = useState(null);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const updatePerView = () => {
      const w = window.innerWidth;
      if (w < 640) setPerView(1);        // small phones -> 1
      else if (w < 1024) setPerView(2);  // tablets / small desktops -> 2
      else setPerView(3);                // large screens -> 3
    };
    updatePerView();
    window.addEventListener("resize", updatePerView);
    return () => window.removeEventListener("resize", updatePerView);
  }, []);

  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Delhi",
      rating: 5,
      review: "Absolutely stunning jewelry! The craftsmanship is exceptional. Vinayak Jewellers exceeded my expectations. Highly recommended!",
      image: "/images/customer-1.jpg",
      verified: true,
    },
    {
      id: 2,
      name: "Rajesh Patel",
      location: "Mumbai",
      rating: 5,
      review: "Best gold jewelry store in the city. Authentic pieces with great customer service. Worth every penny!",
      image: "/images/customer-2.jpg",
      verified: true,
    },
    {
      id: 3,
      name: "Anjali Verma",
      location: "Bangalore",
      rating: 4,
      review: "Elegant designs and transparent pricing. The team is very helpful and knowledgeable. Perfect for my wedding!",
      image: "/images/customer-3.jpg",
      verified: true,
    },
    {
      id: 4,
      name: "Vikram Singh",
      location: "Pune",
      rating: 5,
      review: "20+ years of trust is well deserved. Their purity certification and hallmark guarantee give me peace of mind.",
      image: "/images/customer-4.jpg",
      verified: true,
    },
    {
      id: 5,
      name: "Neha Gupta",
      location: "Jaipur",
      rating: 4,
      review: "Amazing collection of traditional and modern designs. The after-sales service is commendable!",
      image: "/images/customer-5.jpg",
      verified: true,
    },
    {
      id: 6,
      name: "Arjun Mehta",
      location: "Ahmedabad",
      rating: 5,
      review: "Responsibly sourced materials and ethical practices. Love supporting a jewelry brand with values!",
      image: "/images/customer-6.jpg",
      verified: true,
    },
  ];

  const nextReview = () => {
    setReviewIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="bg-[#FFF9E6] text-center">
      <BannerSlider />

      {/* Decorative Line + Logo */}
      <div className="relative flex items-center justify-center mb-3 mt-8 sm:mt-12">
        <div className="w-[250px] h-[1px] bg-gradient-to-r from-[#140100] via-[#5C1D02] to-[#140100]" />
        <img
          src="/images/logoContact.png"
          alt="Vinayak Logo Divider"

          className="mx-4 w-10 h-10 object-contain"
        />
        <div className="w-[250px] h-[1px] bg-gradient-to-r from-[#140100] via-[#5C1D02] to-[#140100]" />
      </div>

    {/* ---------- VINAYAK CATEGORIES ---------- */}
<section className=" pt-3 sm:pt-6">
  <h2 className="text-2xl sm:text-3xl font-semibold text-[#3B2E1E] tracking-wider cinzelfont">
    VINAYAK CATEGORIES
  </h2>
  <p className="text-black mt-2 mainfont tracking-wider text-lg">
    Discover Your Perfect Fit - Shop By Category
  </p>

  <div className=" flex flex-col sm:flex-row justify-center items-center sm:gap-6 px-4">
    {/* CARD 1 */}
    <div className="relative w-full  sm:w-[380px] lg:w-[550px] h-[200px] sm:h-[320px] lg:h-[300px] rounded-2xl overflow-hidden flex items-center justify-center">
      <img
        src="/images/zftj.png"
        alt="Vinayak Gift Range"
        className="max-w-full max-h-full object-contain  sm:p-3"
      />
    
    </div>

    {/* CARD 2 */}
    <div className="relative w-full  sm:w-[380px] lg:w-[550px] h-[200px] sm:h-[320px] lg:h-[300px] rounded-2xl overflow-hidden flex items-center justify-center">
      <img
        src="/images/vinayak-6.jpg"
        alt="Vinayak Mangalsutra"
        className="max-w-full max-h-full object-contain sm:p-3"
      />
    </div>
  </div>
</section>


      {/* Decorative Line + Logo */}
      <div className="relative flex items-center justify-center mt-8 sm:mt-10">
        <div className="w-[250px] h-[1px] bg-gradient-to-r from-[#140100] via-[#5C1D02] to-[#140100]" />
        <img
          src="/images/logoContact.png"
          alt="Vinayak Logo Divider"
          className="mx-4 w-10 h-10 object-contain"
        />
        <div className="w-[250px] h-[1px] bg-gradient-to-r from-[#140100] via-[#5C1D02] to-[#140100]" />
      </div>

      {/* ---------- VINAYAK COLLECTIONS ---------- */}
      <section className="pb-3 sm:pb-8 py-3 sm:pt-6">
        <div className="max-w-6xl mx-auto text-center px-4">
          {/* Section Heading */}
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#140100] tracking-[2px] cinzelfont">
            VINAYAK COLLECTIONS
          </h2>
          <p className="text-[#140100]/80 mt-2 mainfont tracking-wide text-[15px]">
            Discover Our Latest Jewellery Launches
          </p>

          {/* Collection Grid */}
          <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-8 ">
            {[
              { name: "Collections", img: "/images/homeCollection.png" },
              { name: "Gold", img: "/images/homeCollection.png" },
              { name: "Diamond", img: "/images/homeCollection.png" },
              { name: "Silver", img: "/images/homeCollection.png" },
              { name: "Men’s", img: "/images/homeCollection.png" },
              { name: "Coins", img: "/images/homeCollection.png" },
              { name: "Gifting", img: "/images/homeCollection.png" },
              { name: "Birth Stones ", img: "/images/homeCollection.png" },
              
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center group"
              >
                {/* Image box */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 w-full">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-64 object-cover"
                  />
                </div>

                {/* Title below image */}
                <p className="mt-4 text-[#140100] text-[13px] tracking-[1px] uppercase mainfont font-normal">
                  {item.name}
                </p>
              </div>
            ))}

            {/* View All Card (linked) */}
            {/* <Link
              to="/alljewellery"
              className="flex flex-col justify-center items-center bg-white rounded-2xl shadow-md h-64 border border-[#140100]/20 hover:shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <p className="text-3xl font-semibold text-[#140100]">10+</p>
              <p className="text-[#3B2E1E] text-[13px] mt-1 cinzelfont">
                Categories to Choose From
              </p>
              <button className="mt-3 text-[#3B2E1E] border border-[#E2C887] rounded-full px-6 py-1 text-[13px] hover:bg-[#E2C887]/20 transition">
                View All →
              </button>
            </Link> */}
          </div>
        </div>
      </section>

      {/* Decorative Line + Logo */}
      <div className="relative flex items-center justify-center mt-8 sm:mt-8">
        <div className="w-[250px] h-[1px] bg-gradient-to-r from-[#140100] via-[#5C1D02] to-[#140100]" />
        <img
          src="/images/logoContact.png"
          alt="Vinayak Logo Divider"
          className="mx-4 w-10 h-10 object-contain"
        />
        <div className="w-[250px] h-[1px] bg-gradient-to-r from-[#140100] via-[#5C1D02] to-[#140100]" />
      </div>

      {/* ---------- VINAYAK ASSURANCE ---------- */}
      <section className="pb-3 sm:pb-8 pt-4 sm:pt-6 bg-[#FFF9E6]">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#3B2E1E] tracking-wide">
            VINAYAK ASSURANCE
          </h2>
          <p className="text-gray-700 mt-2">
            Designed With Precision, Treasured By You.
          </p>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-4 sm:gap-8">
            {[
              {
                icon: "public/images/assurance/Group 44.svg",
                title: "Master Craftsmanship",
                desc: "Every Piece Is Made With Expert Attention To Detail.",
              },
              {
                icon: "public/images/assurance/Group 43.svg",
                title: "Responsibly Sourced",
                desc: "Ethically Obtained Materials You Can Trust.",
              },
              {
                icon: "public/images/assurance/Group 42.svg",
                title: "Complete Transparency",
                desc: "100% Clarity In Quality And Value.",
              },
              {
                icon: "public/images/assurance/Group 41.svg",
                title: "Purity Certified",
                desc: "Guaranteed Authenticity With Hallmark Standards.",
              },
              {
                icon: "public/images/assurance/Group 40.svg",
                title: "Trust & Clarity",
                desc: "20+ Years Of Transparent Processes For Peace Of Mind.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center items-center w-16 h-16 mx-auto bg-[#E2C887]/20 rounded-full text-3xl mb-4">
                 <img
                    src={item.icon}
                    alt={item.title}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold text-[#3B2E1E]">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-700 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Decorative Line + Logo */}
      <div className="relative flex items-center justify-center mt-9 sm:mt-8">
        <div className="w-[250px] h-[1px] bg-gradient-to-r from-[#140100] via-[#5C1D02] to-[#140100]" />
        <img
          src="/images/logoContact.png"
          alt="Vinayak Logo Divider"
          className="mx-4 w-10 h-10 object-contain"
        />
        <div className="w-[250px] h-[1px] bg-gradient-to-r from-[#140100] via-[#5C1D02] to-[#140100]" />
      </div>

      {/* ---------- SHOP BY OCCASION ---------- */}
      <section className="pb-3 sm:pb-8 pt-4 sm:pt-8 bg-[#FFF9E6]">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#140100] tracking-[1.5px] cinzelfont">
            SHOP BY OCCASION
          </h2>
          <p className="text-[#1d1413] mt-2 mainfont tracking-wider text-[16px]">
            Celebrate Every Moment – Jewellery For Every Occasion
          </p>

          <div className="mt-6 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-8">
            {[
              { name: "Gold Wedding", img: "/images/homeCollection.png" },
              { name: "Gold Traditional", img: "/images/homeCollection.png" },
              { name: "Gold Rajasthani Collection", img: "/images/homeCollection.png" },
              { name: "Rose Gold Collection", img: "/images/homeCollection.png" },
              { name: "Diamond Wedding Collection", img: "/images/homeCollection.png" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center group"
              >
                {/* Image box */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 w-full">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-64 object-cover"
                  />
                </div>

                {/* Title below image */}
                <p className="mt-4 text-[#140100] text-[13px] tracking-[1px] uppercase mainfont font-normal">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


       <div className="relative flex items-center justify-center mt-8 sm:mt-8">
       <div className="w-[250px] h-[1px] bg-gradient-to-r from-[#140100] via-[#5C1D02] to-[#140100]" />
       <img
         src="/images/logoContact.png"
         alt="Vinayak Logo Divider"
         className="mx-4 w-10 h-10 object-contain"
       />
       <div className="w-[250px] h-[1px] bg-gradient-to-r from-[#140100] via-[#5C1D02] to-[#140100]" />
     </div>

     <section className="pb-3 sm:pb-8 pt-6 sm:pt-8 bg-[#FFF9E6]">
       <div className="max-w-6xl mx-auto text-center px-4">
         <h2 className="text-2xl sm:text-3xl font-semibold text-[#3B2E1E] tracking-wider cinzelfont">
           FOLLOW US ON INSTAGRAM
         </h2>
         <p className="text-[#140100] mt-2 mainfont tracking-wider text-[15px]">
            Discover Our Latest Designs & Beautiful Moments
         </p>

         {/* Instagram Reels Grid - 4 blocks */}
         <div className="mt-10 sm:mt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
           {[
             { id: 1, img: "/images/assurance/553290185_18058312511576450_6924904704858846143_n.svg", video: "/public/images/assurance/IMG_6816.MP4" },
             { id: 2, img: "/images/assurance/554303973_18058113326576450_1916259205564255088_n.svg", video: "/public/images/assurance/IMG_6816.MP4" },
             { id: 3, img: "/images/assurance/552767823_726665507048331_4922057443990608837_n.svg", video: "/public/images/assurance/IMG_6816.MP4" },
             { id: 4, img: "/images/assurance/553346452_18057859808576450_6185915331741404152_n.svg", video: "/public/images/assurance/IMG_6816.MP4" },
           ].map((reel) => (
             <div
               key={reel.id}
               className="relative w-full h-[26rem] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
               onMouseEnter={() => setHoveredReel(reel.id)}
               onMouseLeave={() => setHoveredReel(null)}
             >
               {/* Video or Image */}
               {hoveredReel === reel.id ? (
                 <video
                   autoPlay
                   muted
                   loop
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                 >
                   <source src={reel.video} type="video/mp4" />
                   Your browser does not support the video tag.
                 </video>
               ) : (
                 <img
                   src={reel.img}
                   alt={`Instagram Reel ${reel.id}`}
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                 />
               )}

                {/* Overlay */}
               <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-all duration-300 z-10" />


               {/* View on Instagram Button - Show on Hover */}
               <div className="absolute inset-0 flex items-end justify-center z-20 opacity-100  transition-opacity duration-300 pb-4">
                 <a
                   href="https://www.instagram.com/vinayak_jewellers_jaipur?igsh=Z2dzcWgyZThtY2o="
                   target="_blank"
                   rel="noopener noreferrer"
                   className="bg-[#0E0100] text-white text-[12px] px-4 py-2 rounded-full text-sm font-light shadow-lg hover:scale-105 transition-transform duration-200 flex items-center gap-1"
                 >
                  <img src="/public/images/Icon/video-play.svg" className="w-4 h-4"/>
                   {/* <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
                   </svg> */}
                   SEE REELS
                 </a>
               </div>
             </div>
           ))}
         </div>

   
        </div>
      </section>

      {/* Decorative Line + Logo */}
      <div className="relative flex items-center justify-center mt-10   sm:mt-8">
        <div className="w-[250px] h-[1px] bg-gradient-to-r from-[#140100] via-[#5C1D02] to-[#140100]" />
        <img
          src="/images/logoContact.png"
          alt="Vinayak Logo Divider"
          className="mx-4 w-10 h-10 object-contain"
        />
        <div className="w-[250px] h-[1px] bg-gradient-to-r from-[#140100] via-[#5C1D02] to-[#140100]" />
      </div>

      {/* ---------- CUSTOMER EXPERIENCES & REVIEWS ---------- */}
      <section className="pb-3 sm:pb-16 pt-4 sm:pt-6 bg-[#FFF9E6]">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#3B2E1E] tracking-wider cinzelfont">
            CUSTOMER EXPERIENCES & REVIEWS
          </h2>
          <p className="text-[#140100] mt-2 mainfont tracking-wider text-[15px]">
           Explore what our customers say about Vinayak Jewellers - trust, quality, and service.
          </p>

          {/* Reviews Carousel/Slider */}
          <div className="mt-6 sm:mt-8 relative max-w-4xl mx-auto">
            {/* Responsive grid: perView controlled by JS */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8`}>
              {Array.from({ length: perView }).map((_, offset) => {
                const index = (reviewIndex + offset) % reviews.length;
                const review = reviews[index];
                return (
                  <div
                    key={review.id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-[#E2C887]/30"
                  >
                    <div className="flex justify-center gap-1 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#F4A116] text-[#F4A116]" />
                      ))}
                    </div>

                    <Quote className="w-8 h-8 text-[#5A2B1A] mx-auto mb-3 opacity-30" />
                    <p className="text-[#140100] text-sm leading-relaxed mb-6 font-light">
                      "{review.review}"
                    </p>
                    <hr className="border-[#E2C887] mb-4" />

                    <div className="flex items-center gap-3">
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover border border-[#E2C887]"
                      />
                      <div className="text-left">
                        <h4 className="text-[#3B2E1E] font-semibold text-sm">
                          {review.name}
                        </h4>
                        <p className="text-[#140100]/60 text-xs">
                          {review.location} {review.verified && "✓"}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Prev / Next controls (small & mobile friendly) */}
            <button
              onClick={prevReview}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-gradient-to-b from-[#5A2B1A] to-[#2E0D02] text-white p-2 rounded-full hover:scale-105 transition-transform duration-200 border border-[#b68d52] shadow-lg md:left-0 md:-translate-x-12"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={nextReview}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-b from-[#5A2B1A] to-[#2E0D02] text-white p-2 rounded-full hover:scale-105 transition-transform duration-200 border border-[#b68d52] shadow-lg md:right-0 md:translate-x-12"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setReviewIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === reviewIndex ? "bg-[#5A2B1A] w-8" : "bg-[#E2C887] w-2 hover:bg-[#5A2B1A]"}`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Google Reviews Button */}
          <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="https://share.google/4UPSxxkfV0Cf8Av9l"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-b from-[#5A2B1A] to-[#2E0D02]
                         text-white px-8 py-3 rounded-full font-semibold shadow-lg border border-[#b68d52]
                         hover:scale-105 transition-transform duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Read on Google
            </a>

            <a
              href="https://www.instagram.com/vinayak_jewellers_jaipur?igsh=Z2dzcWgyZThtY2o="
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-b from-[#E4405F] to-[#C13584]
                         text-white px-8 py-3 rounded-full font-semibold shadow-lg
                         hover:scale-105 transition-transform duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
              </svg>
              Follow Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
