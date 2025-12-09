import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import { useEnquiry } from "../context/EnquiryContext";
import { listBackendProducts } from "../api/backendProductsAPI";
import { ShoppingBag } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  const [openSub, setOpenSub] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const { setSearchTerm } = useSearch();
  const { enquiryItems } = useEnquiry();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // ✅ Categories list
  const categories = [
    { name: "Home", link: "/", icon: "/images/Icon/menu-icons/Essential/home.png" },
    {
      name: "Collections", link: "/alljewellery", icon: "/images/Icon/menu-icons/Group 16.png",
      sub: [
        { name: "Gold Wedding", link: "/silver/coins" },
        { name: "Gold Traditional ", link: "/silver/chains" },
        { name: "Gold rajasthani collection  ", link: "/silver/chains" },
        { name: "Rose gold collection", link: "/silver/chains" },
        { name: "Diamond Wedding collection ", link: "/silver/chains" },
        { name: "Diamond Solitaire ", link: "/silver/chains" },
        { name: "Silver Utensils ", link: "/silver/chains" },
        { name: "Silver traditional jewellery ", link: "/silver/chains" },
        { name: "Silver fancy jewellery ", link: "/silver/chains" },
        { name: "Gift Collection", link: "/silver/chains" },
      ],
    },
    {
      name: "Gold", link: "/gold", icon: "/images/Icon/menu-icons/Group 56251.png",
      sub: [
        { name: "Ring", link: "/gold/rings" },
        { name: "Earrings", link: "/gold/bangles" },
        { name: "Necklace - 22 karat - 18 karat", link: "/gold/necklace" },
        { name: "Bangles", link: "/gold/necklace" },
        { name: "Mangalsutra", link: "/gold/necklace" },
        { name: "Chains", link: "/gold/necklace" },
        { name: "Bracelet", link: "/gold/necklace" },
        { name: "Pendal set", link: "/gold/necklace" },
        { name: "Pendant", link: "/gold/necklace" },
      ],
    },
    {
      name: "Diamond", link: "/diamond", icon: "/images/Icon/menu-icons/Vector.png",
      sub: [
        { name: "Ring", link: "/diamond/earrings" },
        { name: "Earrings", link: "/diamond/pendants" },
        { name: "Necklace", link: "/diamond/rings" },
        { name: "Bangles", link: "/diamond/rings" },
        { name: "Mangalsutra", link: "/diamond/rings" },
        { name: "Pendal set", link: "/diamond/rings" },
        { name: "Pendant", link: "/diamond/rings" },
        { name: "Men's ", link: "/diamond/rings" },
      ],
    },
    {
      name: "Silver", link: "/silver", icon: "/images/Icon/menu-icons/Group.png",
      sub: [
        { name: "Utensils", link: "/silver/utensils" },
        { name: "Anklets / payals", link: "/silver/anklets" },
        { name: "Kamar belt or satka", link: "/silver/kamar-belt" },
        { name: "Pooja articles", link: "/silver/pooja-articles" },
        { name: "Ring", link: "/silver/rings" },
        { name: "Earrings", link: "/silver/earrings" },
        { name: "Pendant", link: "/silver/pendants" },
        { name: "Chains", link: "/silver/chains" },
        { name: "Pendal set", link: "/silver/pendal-set" },
        { name: "Necklace", link: "/silver/necklaces" },
        { name: "Bangles", link: "/silver/bangles" },
        { name: "Bracelet", link: "/silver/bracelets" },
        { name: "Mangalsutra", link: "/silver/mangalsutra" },
        { name: "Watches", link: "/silver/watches" },
      ],
    },
    {
      name: "Mens", link: "/mens", icon: "/public/images/Icon/menu-icons/Users/profile.png",
      // Updated structure with nested subcategories
      sub: [
        {
          category: "Gold",
          items: [
            { name: "Gold Rings", link: "/mens/gold-rings" },
            { name: "Gold Chains", link: "/mens/gold-chains" },
            { name: "Gold Kadas/Bracelet", link: "/mens/gold-bracelet" },
          ]
        },
        {
          category: "Silver",
          items: [
            { name: "Silver Rings", link: "/mens/silver-rings" },
            { name: "Silver Chains", link: "/mens/silver-chains" },
            { name: "Silver Kadas/Bracelet", link: "/mens/silver-bracelet" },
            { name: "Others", link: "/mens/silver-watches" },
          
          ]
        },
        {
          category: "Diamond",
          items: [
            { name: "Diamond Rings", link: "/mens/diamond-rings" },
            { name: "Diamond Bracelet", link: "/mens/diamond-bracelet" },
            { name: "Others", link: "/mens/silver-watches" },
          ]
        }
      ]
    },
    {
      name: "Coins", link: "/coins", icon: "/images/Icon/menu-icons/Group 56253.png",
      sub: [
        { name: "Gold", link: "/silver/coins" },
        { name: "Silver", link: "/silver/chains" },
      ],
    },
    {
      name: "Gifting", link: "/gifting", icon: "/images/Icon/menu-icons/Group 15.png",
      sub: [
        { name: "Starting from 250-500", link: "/silver/coins" },
        { name: "500-1000", link: "/silver/chains" },
        { name: "1k-2k", link: "/silver/chains" },
        { name: "2k-5k", link: "/silver/chains" },
        { name: "5k-10k", link: "/silver/chains" },
        { name: "10k-15k", link: "/silver/chains" },
        { name: "15k-20k", link: "/silver/chains" },
        { name: "20k or Above 20k", link: "/silver/chains" },
        { name: "Exclusive", link: "/silver/chains" },
      ],
    },
    { name: "Birth Stones", link: "/birthstones", icon: "/images/Icon/menu-icons/Group 56254.png" },
  ];

  // 🧠 Fetch all products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await listBackendProducts();
        setAllProducts(products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // 🔍 Handle Enter Key (Search)
  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      setSearchTerm(query.toLowerCase());
      setSuggestions([]);
      navigate("/search");
    }
  };

  // 🧠 Live Suggestions
  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }

    const lower = query.toLowerCase();
    const filtered = allProducts.filter(
      (p) =>
        p.productName?.toLowerCase().includes(lower) ||
        p.category?.toLowerCase().includes(lower) ||
        p.subcategory?.toLowerCase().includes(lower) ||
        p.collection?.toLowerCase().includes(lower)
    );

    const uniqueNames = [
      ...new Set(filtered.map((p) => p.subcategory || p.category || p.productName)),
    ].slice(0, 6);

    setSuggestions(uniqueNames);
  }, [query, allProducts]);

  const handleSuggestionClick = (text) => {
    setQuery(text);
    setSearchTerm(text.toLowerCase());
    setSuggestions([]);
    navigate("/search");
  };

  return (
    <header className="bg-gradient-to-b from-[#5C1D02] to-[#140100] border-b border-[#b68d52] text-white font-sans w-full sticky top-0 z-50">

      {/* === Top Header Section === */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-10 py-2">
        {/* Left: Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/images/white-logo.svg"
            alt="Vinayak Jewellers Logo"
            className="h-12 sm:h-16 md:h-16 w-auto object-contain"
          />
        </div>

        {/* === Desktop Search Bar === */}
        <div className="relative hidden md:flex flex-col w-[30%]">
          <div className="flex items-center rounded-xl border border-[#A7968F] px-3 py-2">
            <span className="mr-2 text-[#A7968F]">
              <img src="/public/images/Icon/Search/search-normal.png" alt="Search" />
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search Gold, Diamond, Silver"
              className="w-full text-[#A7968F] outline-none text-sm bg-transparent mainfont"
            />
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <ul className="absolute top-[110%] left-0 right-0 bg-white border border-[#d1b890] rounded-xl shadow-md z-50">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  onClick={() => handleSuggestionClick(s)}
                  className="px-4 py-2 text-sm text-[#5A2B1A] hover:bg-[#FFF4DC] cursor-pointer"
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* === Desktop Links + Cart === */}
        <div className="hidden md:flex items-center gap-4 text-sm font-light text-white mainfont">
          {/* About */}
          <Link
            to="/about"
            className="flex items-center gap-2 transition-colors hover:text-[#b68d52]"
          >
            <img
              src="/public/images/Icon/Union.png"
              alt="About"
              className="w-4 h-4 object-contain"
            />
            <span>About Vinayak</span>
          </Link>

          <span className="h-5 w-[1px] bg-[#b68d52]" />

          {/* Contact */}
          <Link
            to="/contact"
            className="flex items-center gap-2 transition-colors hover:text-[#b68d52]"
          >
            <img
              src="/public/images/Icon/Call/call-calling.png"
              alt="Contact"
              className="w-4 h-4 object-contain"
            />
            <span>Contact Us</span>
          </Link>

          <span className="h-5 w-[1px] bg-[#b68d52]" />

          {/* Store Location */}
          <a
            href="https://www.google.com/maps?ll=26.959695,75.778472&z=15&t=m&hl=en&gl=IN&mapclient=embed&cid=17692495985853724670"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-[#b68d52]"
          >
            <img
              src="/public/images/Icon/Location/location.png"
              alt="Location"
              className="w-4 h-4 object-contain"
            />
            <span>Visit Our Store</span>
          </a>

          {/* Enquiry Cart */}
          <Link
            to="/enquiry"
            aria-label="Open Enquiry Cart"
            className="flex items-center gap-2 bg-gradient-to-b from-[#5A2B1A] via-[#7B4A2A] to-[#2E0D02]
                       text-white px-4 py-2 rounded-full font-medium shadow-lg border border-[#b68d52]
                       hover:scale-[1.03] hover:shadow-xl transition-transform duration-200"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Enquiry Cart</span>

            {enquiryItems.length > 0 && (
              <span className="ml-2 bg-[#FFF7E0] text-[#5A2B1A] font-bold text-xs px-2 py-[3px] rounded-full
                               border border-[#d1b890] shadow-sm">
                {enquiryItems.length}
              </span>
            )}
          </Link>
        </div>

        {/* === Mobile Menu Toggle === */}
        <button
          className="md:hidden text-[#0E0100] text-2xl"
          onClick={toggleMenu}
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* === Mobile Search Bar === */}
      <div className="relative flex md:hidden flex-col w-[90%] mx-auto mb-3">
        <div className="flex items-center bg-white rounded-full border border-[#c7a46d] px-3 py-2">
          <span className="mr-2 text-[#A7968F]">
            <img src="/public/images/Icon/Search/search-normal.png" alt="Search" />
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search Gold, Diamond, Silver"
            className="w-full text-[#A7968F] outline-none text-sm bg-transparent mainfont"
          />
        </div>

        {suggestions.length > 0 && (
          <ul className="absolute top-[105%] left-0 right-0 bg-white border border-[#d1b890] rounded-xl shadow-md z-50">
            {suggestions.map((s, i) => (
              <li
                key={i}
                onClick={() => handleSuggestionClick(s)}
                className="px-4 py-2 text-sm text-[#5A2B1A] hover:bg-[#FFF4DC] cursor-pointer"
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* === Bottom Navigation (Mobile & Desktop) === */}
      <nav className={`${menuOpen ? "flex" : "hidden"} md:flex flex-wrap justify-center gap-3 md:gap-6 py-3`}>
        {categories.map((cat, index) => (
          <div
            key={index}
            className="relative group"
            onMouseEnter={() => setOpenSub(index)}
            onMouseLeave={() => setOpenSub(null)}
          >
            <Link
              to={cat.link}
              onClick={(e) => { e.preventDefault(); navigate(cat.link); setMenuOpen(false); }}
              className="relative flex items-center gap-2 text-white px-4 py-2 rounded-xl text-sm md:text-base transition-all duration-300 after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 group-hover:after:w-full"
            >
              <img src={cat.icon} className="w-5 h-5 object-contain" alt={cat.name} />
              {cat.name}
            </Link>

            {/* Only show dropdown if category has sub items */}
            {cat.sub && (

              <div
                className={`absolute ${openSub === index ? "flex" : "hidden"} group-hover:flex flex-col
       top-[110%] left-1/2 -translate-x-1/2
       bg-[#FFF7E0] text-[#5A2B1A]
       shadow-xl rounded-xl
       px-4 py-3 z-50 min-w-max`}
              >
                {/* Heading */}
                <h3 className="text-center uppercase font-bold text-16px text-[#0E0100] mb-2">
                  {cat.name}
                </h3>

                {/* Horizontal line */}
                <hr className="border-[#d1b890] mb-2" />

                {/* Sub-items in 2 columns */}
                <div className="grid grid-cols-2 gap-2">
                  {cat.sub.map((sub, i) => (
                    <Link
                      key={i}
                      to={sub.link}
                      onClick={() => setMenuOpen(false)}
                      className="px-4 py-1 text-sm hover:underline rounded-lg text-left"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Special dropdown for Mens category (nested) - CENTERED */}
            {cat.name === "Mens" && cat.sub && Array.isArray(cat.sub[0]?.items) && (
              <div
                className={`absolute ${openSub === index ? "block" : "hidden"} group-hover:block top-[110%] left-1/2 -translate-x-1/2 z-50`}
              >
                <div className="w-[min(600px,85vw)] bg-[#FFF4DC] text-[#5A2B1A] shadow-2xl rounded-2xl overflow-hidden transition-all duration-200 ease-out">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-[#FFF7E0] to-[#FFF4DC] px-6 py-4 ">
                    <h3 className="text-center uppercase font-bold text-16px text-[#0E0100] mb-2">Mens</h3>
                    <hr className="border-[#d1b890] " />
                  </div>

                  {/* Content Grid */}
                  <div className="p-2 grid grid-cols-1 md:grid-cols-3 gap-6  ">
                    {cat.sub.map((category, catIndex) => (
                      <div
                        key={catIndex}
                        className="group/metal px-5"
                      >
                        {/* Metal Category Header with Icon */}
                        <div className="flex items-center gap-3  pb-3">
                       
                          <h3 className="font-bold text-12px  text-[#0E0100]">
                            {category.category}
                          </h3>
                          {/* <div className={`ml-auto w-4 h-4 rounded-full ${
                            category.category === "Gold" ? "bg-yellow-500 shadow-lg shadow-yellow-300" :
                            category.category === "Silver" ? "bg-gray-400 shadow-lg shadow-gray-300" :
                            "bg-blue-400 shadow-lg shadow-blue-300"
                          }`}></div> */}
                        </div>

                        {/* Items List - All items shown directly (no subdropdown) */}
                        <ul className="space-y-1">
                          {category.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <Link
                                to={item.link}
                                onClick={() => setMenuOpen(false)}
                                className="block py-1 text-sm text-[#7a563f] rounded-md hover:bg-[#FFF4DC] hover:text-[#5A2B1A] transition-all duration-150 border border-transparent hover:underline"
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>

                      
                      </div>
                    ))}
                  </div>


                </div>
              </div>
            )}
          </div>
        ))}

        {/* Mobile Cart */}
        <Link
          to="/enquiry"
          onClick={() => setMenuOpen(false)}
          aria-label="Open Enquiry Cart"
          className="flex md:hidden items-center justify-center gap-2 bg-gradient-to-b from-[#5A2B1A] via-[#7B4A2A] to-[#2E0D02] text-white px-4 py-2 rounded-full text-sm font-medium shadow-md border border-[#b68d52] hover:scale-105 transition-transform duration-200"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Enquiry</span>
          {enquiryItems.length > 0 && (
            <span className="ml-2 bg-[#FFF7E0] text-[#5A2B1A] font-bold text-xs px-2 py-[3px] rounded-full border border-[#d1b890] shadow-sm">
              {enquiryItems.length}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}