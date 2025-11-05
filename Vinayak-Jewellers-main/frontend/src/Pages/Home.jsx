import { Link } from "react-router-dom";
import BannerSlider from "../components/BannerSlider";

export default function Home() {
  return (
    <div className="bg-[#FFF9E6] text-center">
      <BannerSlider />

      {/* Decorative Line + Logo */}
      <div className="relative flex items-center justify-center mb-3 mt-16">
        <div className="w-[250px] h-[1px] bg-gradient-to-r from-[#140100] via-[#5C1D02] to-[#140100]" />
        <img
          src="/images/logoContact.png"
          alt="Vinayak Logo Divider"

          className="mx-4 w-10 h-10 object-contain"
        />
        <div className="w-[250px] h-[1px] bg-gradient-to-r from-[#140100] via-[#5C1D02] to-[#140100]" />
      </div>

    {/* ---------- VINAYAK CATEGORIES ---------- */}
<section className=" pt-8">
  <h2 className="text-2xl sm:text-3xl font-semibold text-[#3B2E1E] tracking-wider cinzelfont">
    VINAYAK CATEGORIES
  </h2>
  <p className="text-black mt-2 mainfont tracking-wider text-lg">
    Discover Your Perfect Fit - Shop By Category
  </p>

  <div className=" flex flex-col sm:flex-row justify-center items-center gap-6 px-4">
    {/* CARD 1 */}
    <div className="relative w-full sm:w-[380px] lg:w-[550px] h-[260px] sm:h-[320px] lg:h-[300px] rounded-2xl overflow-hidden flex items-center justify-center">
      <img
        src="/images/zftj.png"
        alt="Vinayak Gift Range"
        className="max-w-full max-h-full object-contain p-3"
      />
    
    </div>

    {/* CARD 2 */}
    <div className="relative w-full sm:w-[380px] lg:w-[550px] h-[260px] sm:h-[320px] lg:h-[300px] rounded-2xl overflow-hidden flex items-center justify-center">
      <img
        src="/images/vinayak-6.jpg"
        alt="Vinayak Mangalsutra"
        className="max-w-full max-h-full object-contain p-3"
      />
    </div>
  </div>
</section>


      {/* Decorative Line + Logo */}
      <div className="relative flex items-center justify-center mt-16">
        <div className="w-[250px] h-[1px] bg-gradient-to-r from-[#140100] via-[#5C1D02] to-[#140100]" />
        <img
          src="/images/logoContact.png"
          alt="Vinayak Logo Divider"
          className="mx-4 w-10 h-10 object-contain"
        />
        <div className="w-[250px] h-[1px] bg-gradient-to-r from-[#140100] via-[#5C1D02] to-[#140100]" />
      </div>

      {/* ---------- VINAYAK COLLECTIONS ---------- */}
      <section className="pb-16 pt-8">
        <div className="max-w-6xl mx-auto text-center px-4">
          {/* Section Heading */}
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#140100] tracking-[2px] cinzelfont">
            VINAYAK COLLECTIONS
          </h2>
          <p className="text-[#140100]/80 mt-2 mainfont tracking-wide text-[15px]">
            Discover Our Latest Jewellery Launches
          </p>

          {/* Collection Grid */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {[
              { name: "EARRINGS", img: "/images/homeCollection.png" },
              { name: "FINGER RINGS", img: "/images/homeCollection.png" },
              { name: "PENDANTS", img: "/images/homeCollection.png" },
              { name: "BRACELETS", img: "/images/homeCollection.png" },
              { name: "BANGLES", img: "/images/homeCollection.png" },
              { name: "WATCHES", img: "/images/homeCollection.png" },
              { name: "NECKLACES & CHAINS", img: "/images/homeCollection.png" },
              { name: "ANKLETS (PAYAL)", img: "/images/homeCollection.png" },
              { name: "WAIST CHAINS", img: "/images/homeCollection.png" },
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
            <Link
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
            </Link>
          </div>
        </div>
      </section>

      {/* Decorative Line + Logo */}
      <div className="relative flex items-center justify-center mt-16">
        <div className="w-[250px] h-[1px] bg-gradient-to-r from-[#140100] via-[#5C1D02] to-[#140100]" />
        <img
          src="/images/logoContact.png"
          alt="Vinayak Logo Divider"
          className="mx-4 w-10 h-10 object-contain"
        />
        <div className="w-[250px] h-[1px] bg-gradient-to-r from-[#140100] via-[#5C1D02] to-[#140100]" />
      </div>

      {/* ---------- VINAYAK ASSURANCE ---------- */}
      <section className="pb-16 pt-8 bg-[#FFF9E6]">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#3B2E1E] tracking-wide">
            VINAYAK ASSURANCE
          </h2>
          <p className="text-gray-700 mt-2">
            Designed With Precision, Treasured By You.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
            {[
              {
                icon: "🔨",
                title: "Master Craftsmanship",
                desc: "Every Piece Is Made With Expert Attention To Detail.",
              },
              {
                icon: "💎",
                title: "Responsibly Sourced",
                desc: "Ethically Obtained Materials You Can Trust.",
              },
              {
                icon: "⚖️",
                title: "Complete Transparency",
                desc: "100% Clarity In Quality And Value.",
              },
              {
                icon: "🛡️",
                title: "Purity Certified",
                desc: "Guaranteed Authenticity With Hallmark Standards.",
              },
              {
                icon: "🤝",
                title: "Trust & Clarity",
                desc: "20+ Years Of Transparent Processes For Peace Of Mind.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center items-center w-16 h-16 mx-auto bg-[#E2C887]/20 rounded-full text-3xl mb-4">
                  {item.icon}
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
      <div className="relative flex items-center justify-center mt-16">
        <div className="w-[250px] h-[1px] bg-gradient-to-r from-[#140100] via-[#5C1D02] to-[#140100]" />
        <img
          src="/images/logoContact.png"
          alt="Vinayak Logo Divider"
          className="mx-4 w-10 h-10 object-contain"
        />
        <div className="w-[250px] h-[1px] bg-gradient-to-r from-[#140100] via-[#5C1D02] to-[#140100]" />
      </div>

      {/* ---------- SHOP BY OCCASION ---------- */}
      <section className="pb-16 pt-8 bg-[#FFF9E6]">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#140100] tracking-[1.5px] cinzelfont">
            SHOP BY OCCASION
          </h2>
          <p className="text-[#140100] mt-2 mainfont tracking-wider text-[16px]">
            Celebrate Every Moment – Jewellery For Every Occasion
          </p>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
            {[
              { name: "BRIDAL JEWELLERY", img: "/images/homeCollection.png" },
              { name: "FESTIVE JEWELLERY", img: "/images/homeCollection.png" },
              { name: "DAILY WEAR", img: "/images/homeCollection.png" },
              { name: "OFFICE WEAR", img: "/images/homeCollection.png" },
              { name: "PARTY WEAR", img: "/images/homeCollection.png" },
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
    </div>
  );
}
