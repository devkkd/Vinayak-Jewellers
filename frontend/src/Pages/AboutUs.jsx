import React from "react";
import ContactSection from "../components/ContactSection";

export default function AboutUs() {
  return (
    <div className="bg-[#fff4DC] text-[#0E0100]">
      {/* ABOUT US SECTION */}
      <section className="bg-[#FFF7E0] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Title- About Page */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-[50px] leading-snug md:leading-[160%] font-[600] font-cinzel cinzelfont text-[#0E0100] mb-3 tracking-wide">
              about vinayak jewellers
            </h1>
          </div>
          <div className="flex flex-col gap-20">
            {/* Our Heritage of Trust and Excellence  */}
            <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
              {/* Left Section */}
              <div className="w-full md:w-[45%] flex flex-col mt-4">
                <h2 className="text-3xl md:text-4xl font-[520] text-[#0E0100] mb-5 font-cinzel cinzelfont leading-snug">
                  Our Heritage of Trust and Excellence
                </h2>
                <p className="text-[#0E0100] mx-auto capitalize font-sans font-light flex justify-center text-base md:text-[18px] leading-relaxed tracking-wide">
                  Located in the heart of Vidhyadhar Nagar, Jaipur, Vinayak
                  Jewellers has been a beacon of trust and craftsmanship in the
                  world of fine jewelry. Our journey began with a simple yet
                  profound vision: to create exquisite jewelry pieces that
                  celebrate life's most precious moments while upholding the
                  highest standards of quality and authenticity.
                </p>
              </div>

              {/* Right Section */}
              <div className="w-full md:w-[55%] flex justify-center items-center">
                <div className="w-full ">
                  <img
                    src="/images/jaipur.png"
                    alt=""
                    className="rounded-4xl h-[320px] w-full"
                  />
                </div>
              </div>
            </div>

            {/* The Vinayak Promise */}
            <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
              {/* Left Section - Image */}
              <div className="w-full md:w-[55%] flex justify-center items-center">
                <div className="w-full">
                  <img
                    src="/images/shop.jpeg"
                    alt="Heritage"
                    className="rounded-4xl h-[320px] w-full"
                  />
                </div>
              </div>

              {/* Right Section - Content */}
              <div className="w-full md:w-[45%] flex flex-col mt-4">
                <h2 className="text-3xl md:text-4xl font-[520] text-[#0E0100] mb-5 font-cinzel cinzelfont leading-snug">
                  The Vinayak Promise
                </h2>
                <p className="text-[#0E0100] capitalize font-sans font-light text-base md:text-[18px] leading-relaxed tracking-wide">
                  At Vinayak Jewellers, we understand that jewelry is more than
                  mere adornment—it's a symbol of love, tradition, and personal
                  expression. Each piece in our collection tells a story,
                  whether it's a delicate gold chain passed down through
                  generations, a sparkling diamond engagement ring marking a new
                  beginning, or a stunning silver bracelet celebrating personal
                  achievement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment to Quality & What Sets Us Apart */}
      <div className="bg-[#FFEAC5] py-12 md:py-16 px-4 sm:px-6 md:px-12">
        {/* Section Title */}
        <h2 className="text-2xl md:text-3xl font-[500] text-[#0E0100] mb-10 font-cinzel cinzelfont tracking-wider text-center">
          Our Commitment to Quality
        </h2>

        {/* Two Column Section */}
        <div className="flex flex-col md:flex-row items-stretch gap-6 max-w-7xl mx-auto">
          {/* Left */}
          <div className="flex-1 flex flex-col md:pr-6">
            <h3 className="text-2xl md:text-xl font-[600] text-[#0E0100] mainfont capitalize mb-5 tracking-wider">
              Hallmark & Certified Excellence
            </h3>
            <p className="text-[#0E0100] capitalize font-sans font-light text-base md:text-[18px] leading-relaxed tracking-wide">
              Every piece of jewelry at Vinayak Jewellers comes with proper
              hallmarking and certification, ensuring you receive only
              authentic, high-quality products.
            </p>
          </div>

          {/* Vertical line */}
          <div className="hidden md:block w-px bg-[#0E0100]"></div>

          {/* Right */}
          <div className="flex-1 flex flex-col md:pl-6 mt-6 md:mt-0">
            <h3 className="text-2xl md:text-xl font-[600] text-[#0E0100] mainfont capitalize mb-5 tracking-wider">
              Curated Collections
            </h3>
            <p className="text-[#0E0100] capitalize font-sans font-light text-base md:text-[18px] leading-relaxed tracking-wide">
              Our exclusive collections are carefully selected and crafted to
              meet the diverse tastes of modern jewelry enthusiasts while
              honoring traditional craftsmanship techniques.
            </p>
          </div>
        </div>

        {/* What Sets Us Apart - Four Feature Sections */}
        <div className="mt-12">
          <h2 className="text-2xl md:text-3xl font-[500] text-[#0E0100] mb-8 md:mb-12 font-cinzel cinzelfont tracking-wide text-center">
            what sets us apart
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Section 1 */}
            <div className="flex flex-col items-start justify-start md:pr-4">
              <h3 className="text-2xl md:text-xl font-[600] text-[#0E0100] mainfont capitalize mb-5 tracking-wider">
                Expert Craftsmanship
              </h3>
              <p className="text-[#0E0100] capitalize font-sans font-light text-base md:text-[18px] leading-relaxed tracking-wide">
                Skilled artisans combine time-honored techniques with
                contemporary design for pieces that are timeless and trendy.
              </p>
            </div>

            {/* Section 2 */}
            <div className="flex flex-col items-start justify-start md:px-4 border-t sm:border-t-0 sm:border-l md:border-l border-[#0E0100]">
              <h3 className="text-2xl md:text-xl font-[600] text-[#0E0100] mainfont capitalize mb-5 tracking-wider">
                Diverse Range
              </h3>
              <p className="text-[#0E0100] capitalize font-sans font-light text-base md:text-[18px] leading-relaxed tracking-wide">
                From traditional gold to contemporary diamond and silver
                collections, we cater to every occasion and budget.
              </p>
            </div>

            {/* Section 3 */}
            <div className="flex flex-col items-start justify-start md:px-4 border-t sm:border-t-0 sm:border-l md:border-l border-[#0E0100]">
              <h3 className="text-2xl md:text-xl font-[600] text-[#0E0100] mainfont capitalize mb-5 tracking-wider">
                Personal Service
              </h3>
              <p className="text-[#0E0100] capitalize font-sans font-light text-base md:text-[18px] leading-relaxed tracking-wide">
                Every customer is family. We take time to understand your
                preferences to find the perfect piece.
              </p>
            </div>

            {/* Section 4 */}
            <div className="flex flex-col items-start justify-start md:pl-4 border-t sm:border-t-0 sm:border-l md:border-l border-[#0E0100]">
              <h3 className="text-2xl md:text-xl font-[600] text-[#0E0100] mainfont capitalize mb-5 tracking-wider">
                Trust & Transparency
              </h3>
              <p className="text-[#0E0100] capitalize font-sans font-light text-base md:text-[18px] leading-relaxed tracking-wide">
                With certifications, clear pricing, and honest advice, we
                maintain integrity and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Vision Forward */}
      <section className="bg-[#FFF7E0] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex flex-col gap-20">
            {/* Located in the Pink City  */}
            <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
              {/* Left Section */}
              <div className="w-full md:w-[45%] flex flex-col  mt-12">
                <h2 className="text-2xl md:text-3xl font-[520] text-[#0E0100] mb-5 font-cinzel cinzelfont leading-snug">
                  Located in the Pink City
                </h2>
                <p className="text-[#0E0100] capitalize font-sans font-light text-base tracking-wide md:text-[15px]">
                  Situated in Vidhyadhar Nagar, one of Jaipur's well-planned
                  residential areas, our showroom offers a comfortable and
                  welcoming environment where you can explore our collections at
                  your own pace. The location reflects our commitment to being
                  accessible to the community we serve.
                </p>
              </div>

              {/* Right Section */}
              <div className="w-full md:w-[55%] flex justify-center items-center">
                <div className="w-full ">
                  <img
                    src="/images/hawamahal.png"
                    alt=""
                    className="rounded-4xl h-[280px] w-[600px]"
                  />
                </div>
              </div>
            </div>

            {/* Our Vision Forward */}
            <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
              {/* Left Section - Image */}
              <div className="w-full md:w-[55%] flex justify-center items-center">
                <div className="w-full">
                  <img
                    src="/images/v.jpg.jpeg"
                    alt="Heritage"
                    className="rounded-4xl h-[280px] w-[600px]"
                  />
                </div>
              </div>

              {/* Right Section - Content */}
              <div className="w-full md:w-[45%] flex flex-col mt-4">
                <h2 className="text-2xl md:text-3xl font-[520] text-[#0E0100] mb-5 font-cinzel cinzelfont leading-snug">
                  Our Vision Forward
                </h2>
                <p className="text-[#0E0100] capitalize font-sans font-light text-base md:text-[15px]">
                  As we continue to grow, Vinayak Jewellers remains committed to
                  evolving with our customers' changing needs while preserving
                  the values that have defined us from the beginning: quality,
                  authenticity, and exceptional service.
                  <br />
                  <br />
                  At Vinayak Jewellers, we don't just sell jewelry - we help you
                  celebrate life's beautiful moments with pieces as unique and
                  precious as the memories they represent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vinayak Assurance */}
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

      {/* Mention Section */}
      <section className="bg-[#FFEAC5] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="bg-[#FFF7E0] border border-[#0E0100]/20 rounded-3xl p-8 md:p-12 shadow-lg">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#FFF7E0] border-2 border-[#0E0100] mb-6">
                <span className="text-3xl md:text-4xl font-bold text-[#0E0100]">!</span>
              </div>
              <h3 className="text-xl md:text-2xl font-[600] text-[#0E0100] font-cinzel tracking-wide mb-4">
                Important Note
              </h3>
              <p className="text-[#0E0100] font-sans font-light text-base md:text-[18px] leading-relaxed tracking-wide max-w-3xl mx-auto">
                We want to inform our valued customers that Vinayak Jewellers currently operates from 
                <span className="font-semibold text-[#0E0100]"> a single, authorized showroom located in Vidhyadhar Nagar, Jaipur</span>. 
                We do not have any other branches or outlets. To ensure you receive genuine products and authentic 
                Vinayak Jewellers service, please visit us only at our official address.
              </p>
              <div className="mt-8 pt-6 border-t border-[#0E0100]/20">
                <p className="text-[#0E0100] font-sans font-medium text-base md:text-lg">
                  <span className="font-bold">📍 Our Only Address:</span> G-46, Unnati Tower, Sector 2, Central Spine, Vidhyadhar Nagar, Jaipur, Rajasthan
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}