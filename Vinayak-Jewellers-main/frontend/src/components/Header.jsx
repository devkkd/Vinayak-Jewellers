import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import { useEnquiry } from "../context/EnquiryContext"; // ✅ Enquiry Cart context
import { listBackendProducts } from "../api/backendProductsAPI";
import { ShoppingBag } from "lucide-react"; // ✅ cart icon

export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // ✅ fetched products
  const { setSearchTerm } = useSearch();
  const { enquiryItems } = useEnquiry(); // ✅ cart items

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // ✅ Categories list
  const categories = [
    { name: "Home", link: "/" },
    { name: "All Jewellery", link: "/alljewellery" },
    { name: "Gold", link: "/gold" },
    { name: "Silver", link: "/silver" },
    { name: "Diamond", link: "/diamond" },
    { name: "Wedding", link: "/wedding" },
    { name: "Gifting", link: "/gifting" },
    { name: "Birth Stones", link: "/birthstones" },
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
    <header className="bg-[#FFF4DC] border-b border-[#b68d52] text-[#0E0100] font-sans w-full sticky top-0 z-50">
      {/* === Top Header Section === */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-10 py-2">
        {/* Left: Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/images/Vinayak-Hindi.png"
            alt="Vinayak Jewellers Logo"
            className="h-12 sm:h-16 md:h-20 w-auto object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* === Desktop Search Bar === */}
        <div className="relative hidden md:flex flex-col w-[30%]">
          <div className="flex items-center bg-[#FFF4DC] rounded-xl border border-[#A7968F] px-3 py-2">
            <span className="mr-2 text-[#A7968F]">🔍</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search Gold, Diamond, Silver"
              className="w-full outline-none text-sm bg-transparent mainfont"
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
        <div className="hidden md:flex items-center gap-6 text-sm font-light text-[#0E0100] mainfont">
          <Link to="/about" className="hover:text-[#b68d52] transition-colors">
            About Vinayak
          </Link>
          <span className="h-5 w-[1px] bg-[#b68d52]" />
          <Link to="/contact" className="hover:text-[#b68d52] transition-colors">
            Contact Us
          </Link>
          <span className="h-5 w-[1px] bg-[#b68d52]" />
          <a
            href="https://www.google.com/maps?ll=26.959695,75.778472&z=15&t=m&hl=en&gl=IN&mapclient=embed&cid=17692495985853724670"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#b68d52] transition-colors"
          >
            Visit Our Store
          </a>

          {/* 🛒 Enquiry Cart Button */}
          <Link
            to="/enquiry"
            className="flex items-center gap-2 bg-gradient-to-b from-[#5A2B1A] to-[#2E0D02] text-white px-4 py-2 rounded-full font-medium shadow-md hover:scale-105 transition-all duration-300"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Enquiry Cart</span>

            {enquiryItems.length > 0 && (
              <span className="ml-2 bg-white text-[#5C1D02] font-bold text-xs px-2 py-[2px] rounded-full shadow">
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
          <span className="text-[#b68d52] mr-2">🔍</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search Gold, Diamond, Silver"
            className="w-full outline-none text-sm placeholder-[#b68d52] bg-transparent"
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
      <nav
        className={`${
          menuOpen ? "flex" : "hidden"
        } md:flex flex-wrap justify-center gap-3 md:gap-6 py-3 bg-[#FFF4DC]`}
      >
        {categories.map((cat, index) => (
          <Link
            key={index}
            to={cat.link}
            onClick={(e) => {
              e.preventDefault();
              navigate(cat.link);
              setMenuOpen(false);
            }}
            className="bg-gradient-to-b from-[#5A2B1A] to-[#2E0D02] text-white px-4 py-2 rounded-xl text-sm md:text-base shadow-sm transition-all duration-300 hover:opacity-90"
          >
            {cat.name}
          </Link>
        ))}

        {/* 🛒 Mobile Enquiry Cart Button */}
        <Link
          to="/enquiry"
          onClick={() => setMenuOpen(false)}
          className="flex md:hidden items-center justify-center gap-2 bg-[#5C1D02] text-white px-4 py-2 rounded-full text-sm font-medium shadow-md"
        >
          <ShoppingBag className="w-4 h-4" />
          Enquiry ({enquiryItems.length})
        </Link>
      </nav>
    </header>
  );
}
