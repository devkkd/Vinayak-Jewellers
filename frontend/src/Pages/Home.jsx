import { Link } from "react-router-dom";
import BannerSlider from "../components/BannerSlider";
import { useState, useEffect, useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { getReels } from "../api/instagramReelAPI";

export default function Home() {
  const [reviewIndex, setReviewIndex] = useState(0);
  const [perView, setPerView] = useState(3);
  const [reels, setReels] = useState([]);
  const [reelIndex, setReelIndex] = useState(0);
  const [desktopPage, setDesktopPage] = useState(0);
  const touchStartX = useRef(0);
  const mobileVideoRefs = useRef([]);
  const desktopVideoRefs = useRef([]);

  // Play active mobile video, pause others
  useEffect(() => {
    const timer = setTimeout(() => {
      mobileVideoRefs.current.forEach((vid, i) => {
        if (!vid) return;
        if (i === reelIndex) {
          vid.currentTime = 0;
          vid.play().catch(() => {});
        } else {
          vid.pause();
          vid.currentTime = 0;
        }
      });
    }, 520);
    return () => clearTimeout(timer);
  }, [reelIndex, reels]);

  // Play visible desktop videos (4 visible from desktopPage), pause others
  useEffect(() => {
    // wait for slide animation to finish before playing
    const timer = setTimeout(() => {
      desktopVideoRefs.current.forEach((vid, i) => {
        if (!vid) return;
        if (i >= desktopPage && i < desktopPage + 4) {
          vid.play().catch(() => {});
        } else {
          vid.pause();
          vid.currentTime = 0;
        }
      });
    }, 520);
    return () => clearTimeout(timer);
  }, [desktopPage, reels]);

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

  // Fetch reels from backend
  useEffect(() => {
    getReels().then((data) => setReels(data || [])).catch(() => {});
  }, []);


  const reviews = [
    {
      id: 1,
      name: "Arvind Mishra",
      location: "Jaipur, Rajasthan",
      rating: 5,
      review: "All your search for silver jewellery ends here. Great collection, excellent staff, decent rates and exceptional designs. My diwali shopping was done within 30 min, it was too easy to pick one as every thing was amazing.",
      image: "/images/reviews/unnamed (1).png",
      verified: true,
    },
    {
      id: 2,
      name: "Chandramukhi Datta",
      location: "Jaipur, Rajasthan",
      rating: 5,
      review: "Attractive design at affordable price... great customer service..",
      image: "data:image/jpeg;base64,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",

      verified: true,
    },
    {
      id: 3,
      name: "Raj Sharma",
      location: "Bangalore",
      rating: 4,
      review: "Beautiful interior ! clean and hygienic washroom. very close to Premanandji maharaj�s ashram.. isckon. within the radius of 1 kms you will find all the major temples. highly recommended",
      image: "/images/reviews/unnamed.png",      
      verified: true,
    },
    {
      id: 4,
      name: "Ajay Gupta",
      location: "Pune",
      rating: 5,
      review: "Excellent customer service, wide range of products, purity assured, transparent pricing and more than two decades of confidence. You will be pampered to visit the showroom again and again.",
      image: "/images/reviews/unnamed (2).png",
      verified: true,
    },
    {
      id: 5,
      name: "SUNITA LAMBA",
      location: "Jaipur",
      rating: 4,
      review: "I truly had a very pleasant experience here since past 10 years. The collection here is both unique and elegant. Owner's nature is also very humble and trustworthy.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxdwuxfY9EFHfuMARfX0ocsIjcqELP1Ecv0A&s",
      verified: true,
    },
    {
      id: 6,
      name: "Arjun Mehta",
      location: "Ahmedabad",
      rating: 5,
      review: "A plethora of designs and variety in both silver and gold jewelery. Collection includes diamond jewelry as well.Custom jewelry made on order and at reasonable rates.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCDE9QxqmuVgRmEsRKuz8XaEK05wrvoCmJcA&s",
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

    {/* ---------- VINAYAK COLLECTIONS ---------- */}
<section className="pt-3 sm:pt-6 pb-6 sm:pb-8 bg-[#FFF9E6]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    
    {/* Compact Header */}
    <div className="text-center mb-6 sm:mb-8">
      <h2 className="text-2xl sm:text-3xl font-semibold text-[#3B2E1E] tracking-wider cinzelfont">
        VINAYAK COLLECTIONS
      </h2>
      <p className="text-[#140100]/80 mt-2 mainfont tracking-wide text-[15px]">
        Discover Our Latest Jewellery Launches
      </p>
    </div>

    {/* Compact 2-Column Grid */}
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
      
      {/* CARD 1 - GIFT COLLECTION */}
      <Link 
        to="/alljewellery?category=Gifting" 
        state={{ scrollToTop: true }}
        className="group relative w-full sm:w-[48%] lg:w-[45%] bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
      >
        {/* Compact Image */}
        <div className="relative h-[220px] sm:h-[280px] overflow-hidden">
          <img
            src="/images/collections/gift.jpg"
            alt="Vinayak Gift Range"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        {/* Compact Content */}
        <div className="p-4 sm:p-5">
          <h3 className="text-lg sm:text-xl font-bold text-[#5A2B1A] cinzelfont mb-1">
            Gift Collection
          </h3>
          <p className="text-[#7a563f] text-sm mb-3">
            Perfect gifts for every occasion
          </p>
          <div className="flex items-center text-[#b68d52] font-semibold text-sm">
            <span>Explore</span>
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>

      {/* CARD 2 - MANGALSUTRA COLLECTION */}
      <Link 
        to="/alljewellery?category=Gold&subcategory=Mangalsutra" 
        state={{ scrollToTop: true }}
        className="group relative w-full sm:w-[48%] lg:w-[45%] bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
      >
        {/* Compact Image */}
        <div className="relative h-[220px] sm:h-[280px] overflow-hidden">
          <img
            src="/images/collections/mangal.jpg"
            alt="Vinayak Wedding Collection"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        {/* Compact Content */}
        <div className="p-4 sm:p-5">
          <h3 className="text-lg sm:text-xl font-bold text-[#5A2B1A] cinzelfont mb-1">
            Mangalsutra Collection
          </h3>
          <p className="text-[#7a563f] text-sm mb-3">
            Exquisite designs for your special day
          </p>
          <div className="flex items-center text-[#b68d52] font-semibold text-sm">
            <span>Explore</span>
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>

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

    

{/* ---------- VINAYAK CATEGORIES ---------- */}
<section className="py-6 sm:py-8 bg-[#FFF9E6]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    <div className="text-center mb-6 sm:mb-8">
      <h2 className="text-2xl sm:text-3xl font-semibold text-[#140100] tracking-[2px] cinzelfont">
        VINAYAK CATEGORIES
      </h2>
      <p className="text-[#140100]/80 mt-2 mainfont tracking-wide text-[15px]">
        Discover Your Perfect Fit - Shop By Category
      </p>
    </div>
  </div>

  {/* Full-bleed image grid, no gap */}                                      
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 sm:gap-9  max-w-5xl justify-center items-center mx-5 sm:mx-auto">
    {[
      { name: "Collections", category: "All Jewellery", img: "/images/categories/1.jpg.jpeg" },
      { name: "Gold", category: "Gold", img: "/images/categories/2.jpg.jpeg" },
      { name: "Diamond", category: "Diamond", img: "/images/categories/3.jpg.jpeg" },
      { name: "Silver", category: "Silver", img: "/images/categories/4.jpg.jpeg" },
      { name: "Men's", category: "Mens", img: "/images/categories/5.jpg.jpeg" },
      { name: "Coins", category: "Coins", img: "/images/categories/6.jpg.jpeg" },
      { name: "Gifting", category: "Gifting", img: "/images/categories/7.jpg.jpeg" },
      { name: "Birth Stones", category: "Birth Stones", img: "/images/categories/8.jpg.jpeg" },
    ].map((item, index) => (
      <Link
        key={index}
        to={`/alljewellery?category=${encodeURIComponent(item.category)}`}
        state={{ scrollToTop: true }}
        className="group block aspect-[3/4] overflow-hidden"
      >
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>
    ))}
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

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-8">
            {[
              {
                icon: "/images/assurance/Group 44.svg",
                title: "Master Craftsmanship",
                desc: "Every Piece Is Made With Expert Attention To Detail.",
              },
              {
                icon: "/images/assurance/Group 41.svg",
                title: "Purity Certified",
                desc: "Guaranteed Authenticity With Hallmark Standards.",
              },
              {
                icon: "/images/assurance/Group 42.svg",
                title: "Complete Transparency",
                desc: "100% Clarity In Quality And Value.",
              },
              {
                icon: "/images/assurance/Group 43.svg",
                title: "Responsibly Sourced",
                desc: "Ethically Obtained Materials You Can Trust.",
              },
              {
                icon: "/images/assurance/Group 40.svg",
                title: "Trust & Clarity",
                desc: "20+ Years Of Transparent Processes For Peace Of Mind.",
              },
              {
                icon: "/images/assurance/Group 44.svg",
                title: "Easy Exchange",
                desc: "Hassle-Free Exchange Policy On All Jewellery.",
                mobileOnly: true,
              },
            ].map((item, index) => (
              <div key={index} className={`text-center ${item.mobileOnly ? "md:hidden" : ""}`}>
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
            Celebrate Every Moment � Jewellery For Every Occasion
          </p>

          <div className="mt-6 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-8">
            {[
              { name: "Gold Wedding", img: "/images/ocassion/9.jpg" },
              { name: "Gold Traditional", img: "/images/ocassion/10.jpg" },
              { name: "Gold Rajasthani Collection", img: "/images/ocassion/11.jpg" },
              { name: "Rose Gold Collection", img: "/images/ocassion/12.jpg" },
              { name: "Diamond Wedding Collection", img: "/images/ocassion/13.jpg" },
              { name: "Mangalsutra Collection", img: "/images/ocassion/14.jpg", mobileOnly: true },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex flex-col items-center text-center group ${item.mobileOnly ? "md:hidden" : ""}`}
              >
                {/* Image box */}
                <div className=" rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 w-full">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-64 object-contain"
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

         {reels.length === 0 ? (
           <div className="mt-10 flex flex-col items-center justify-center gap-3 py-16 text-[#7a563f]">
             <p className="text-sm">No reels uploaded yet. Check back soon!</p>
           </div>
         ) : (
           <>
             {/* MOBILE: sliding carousel with dots + swipe */}
             <div className="mt-8 md:hidden">
               <div
                 className="overflow-hidden w-full max-w-[260px] mx-auto rounded-2xl shadow-xl"
                 onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
                 onTouchEnd={(e) => {
                   const diff = touchStartX.current - e.changedTouches[0].clientX;
                   if (diff > 40) setReelIndex((p) => Math.min(p + 1, reels.length - 1));
                   else if (diff < -40) setReelIndex((p) => Math.max(p - 1, 0));
                 }}
               >
                 <div
                   className="flex transition-transform duration-500 ease-in-out"
                   style={{ transform: `translateX(-${reelIndex * 260}px)` }}
                 >
                   {reels.map((reel, i) => (
                     <div key={reel._id} className="relative flex-shrink-0 w-[260px] aspect-[9/16] bg-black">
                       <video
                         ref={(el) => (mobileVideoRefs.current[i] = el)}
                         src={reel.videoUrl}
                         className="absolute inset-0 w-full h-full object-cover"
                         muted playsInline
                         onEnded={() => setReelIndex((prev) => (prev === reels.length - 1 ? 0 : prev + 1))}
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                     </div>
                   ))}
                 </div>
               </div>

               {/* Dots */}
               <div className="flex justify-center gap-2 mt-4">
                 {reels.map((_, i) => (
                   <button
                     key={i}
                     onClick={() => setReelIndex(i)}
                     className={`rounded-full transition-all duration-300 ${i === reelIndex ? "w-6 h-2 bg-[#b68d52]" : "w-2 h-2 bg-[#d1b890]"}`}
                   />
                 ))}
               </div>
             </div>

             {/* DESKTOP: scroll 1 at a time, show 4 visible, arrows outside, dots below */}
             <div className="mt-10 hidden md:block">
               {(() => {
                 const total = reels.length;
                 const maxPage = total > 4 ? total - 4 : 0;
                 const prevPage = () => setDesktopPage((p) => Math.max(0, p - 1));
                 const nextPage = () => setDesktopPage((p) => Math.min(maxPage, p + 1));
                 // each reel card = 25% of container width, gap = 16px
                 const cardWidthPct = 25;
                 return (
                   <>
                     {/* Arrows + track row */}
                     <div className="flex items-center gap-3">
                       {/* Prev arrow */}
                       <button onClick={prevPage} disabled={desktopPage === 0}
                         className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FFF4DC] border border-[#b68d52] shadow-md flex items-center justify-center text-[#5A2B1A] hover:bg-[#FFEAC5] transition disabled:opacity-30">
                         <ChevronLeft className="w-5 h-5" />
                       </button>

                       {/* Sliding window */}
                       <div className="flex-1 overflow-hidden">
                         <div
                           className="flex gap-4 transition-transform duration-500 ease-in-out"
                           style={{ transform: `translateX(calc(-${desktopPage} * (25% + 4px)))` }}
                         >
                           {reels.map((reel, i) => (
                             <div key={reel._id} className="relative flex-shrink-0 w-[calc(25%-12px)] aspect-[9/16] rounded-2xl overflow-hidden shadow-lg bg-black">
                               <video
                                 ref={(el) => (desktopVideoRefs.current[i] = el)}
                                 src={reel.videoUrl}
                                 className="absolute inset-0 w-full h-full object-cover"
                                 muted loop playsInline
                               />
                               <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                             </div>
                           ))}
                         </div>
                       </div>

                       {/* Next arrow */}
                       <button onClick={nextPage} disabled={desktopPage >= maxPage}
                         className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FFF4DC] border border-[#b68d52] shadow-md flex items-center justify-center text-[#5A2B1A] hover:bg-[#FFEAC5] transition disabled:opacity-30">
                         <ChevronRight className="w-5 h-5" />
                       </button>
                     </div>

                     {/* Dots — one per reel */}
                     {total > 4 && (
                       <div className="flex justify-center gap-2 mt-5">
                         {reels.map((_, i) => (
                           <button key={i}
                             onClick={() => setDesktopPage(Math.min(i, maxPage))}
                             className={`rounded-full transition-all duration-300 ${i === desktopPage ? "w-6 h-2 bg-[#b68d52]" : "w-2 h-2 bg-[#d1b890]"}`}
                           />
                         ))}
                       </div>
                     )}
                   </>
                 );
               })()}
             </div>
           </>
         )}

         {/* Follow button */}
         <div className="mt-8">
           <a
             href="https://www.instagram.com/vinayak_jewellers_jaipur/"
             target="_blank"
             rel="noopener noreferrer"
             className="inline-flex items-center gap-2 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white px-6 py-2.5 rounded-full text-sm font-medium shadow-md hover:scale-105 transition-transform duration-200"
           >
             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
               <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
             </svg>
             Follow @vinayak_jewellers_jaipur
           </a>
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
                          {review.location} {review.verified && "?"}
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
