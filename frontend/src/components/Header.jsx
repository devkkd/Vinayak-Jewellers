import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import { useEnquiry } from "../context/EnquiryContext";
import { listBackendProducts } from "../api/backendProductsAPI";
import { listMenus } from "../api/menuAPI";
import { ShoppingBag } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  const [openSub, setOpenSub] = useState(null);
  const [mobileSub, setMobileSub] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const { setSearchTerm } = useSearch();
  const { enquiryItems } = useEnquiry();
  
  // Create refs for search components
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // ✅ Categories list (Hardcoded - Original) - Defined outside useEffect to avoid dependency issues
  const defaultCategories = React.useMemo(() => [
    { 
      name: "Home", 
      link: "/", 
      iconComponent: <img src="/images/Icon/menu-icons/home.svg" alt="Home" className="w-5 h-5" /> 
    },
    // Header component में Collections subcategory items को update करें:

// Collections के subitems को इस प्रकार update करें:
{

  name: "Collections", 
  link: "/alljewellery", 
  iconComponent: <img src="/images/Icon/menu-icons/Collections.svg" alt="Collections" className="w-5 h-5" />,
  sub: [
    { 
      name: "Gold Wedding", 
      link: "/alljewellery?category=Gold&subcategory=gold-wedding" 
    },
    { 
      name: "Gold Traditional", 
      link: "/alljewellery?category=Gold&subcategory=gold-traditional" 
    },
    { 
      name: "Gold rajasthani collection", 
      link: "/alljewellery?category=Gold&subcategory=gold-rajasthani-collection" 
    },
    { 
      name: "Rose gold collection", 
      link: "/alljewellery?category=Gold&subcategory=rose-gold-collection" 
    },
    { 
      name: "Diamond Wedding collection", 
      link: "/alljewellery?category=Diamond&subcategory=diamond-wedding-collection" 
    },
    { 
      name: "Diamond Solitaire", 
      link: "/alljewellery?category=Diamond&subcategory=diamond-solitaire" 
    },
    { 
      name: "Silver Utensils", 
      link: "/alljewellery?category=Silver&subcategory=silver-utensils" 
    },
    { 
      name: "Silver traditional jewellery", 
      link: "/alljewellery?category=Silver&subcategory=silver-traditional-jewellery" 
    },
    { 
      name: "Silver fancy jewellery", 
      link: "/alljewellery?category=Silver&subcategory=silver-fancy-jewellery" 
    },
    { 
      name: "Gift Collection", 
      link: "/alljewellery?category=Gifting&subcategory=gift-collection" 
    },
  ],
},

    {
      name: "Gold", 
      link: "/gold", 
      iconComponent: <img src="/images/Icon/menu-icons/Gold.svg" alt="Gold" className="w-5 h-5" />,
      sub: [
        { name: "Ring", link: "/gold/rings" },
        { name: "Earrings", link: "/gold/earrings" },
        { name: "Necklace - 22 karat - 18 karat", link: "/gold/necklace" },
        { name: "Bangles", link: "/gold/bangles" },
        { name: "Mangalsutra", link: "/gold/mangalsutra" },
        { name: "Chains", link: "/gold/chains" },
        { name: "Bracelet", link: "/gold/bracelet" },
        { name: "Pendal set", link: "/gold/pendal-set" },
        { name: "Pendant", link: "/gold/pendant" },
      ],
    },
    {
      name: "Diamond", 
      link: "/diamond", 
      iconComponent: <img src="/images/Icon/menu-icons/Diamond.svg" alt="Diamond" className="w-5 h-5" />,
      sub: [
        { name: "Ring", link: "/diamond/ring" },
        { name: "Earrings", link: "/diamond/earring" },
        { name: "Necklace", link: "/diamond/necklaces" },
        { name: "Bangles", link: "/diamond/bangles" },
        { name: "Mangalsutra", link: "/diamond/mangalsutra" },
        { name: "Pendal set", link: "/diamond/pendal-set" },
        { name: "Pendant", link: "/diamond/pendants" },
        { name: "Men's ", link: "/diamond/mens" },
      ],
    },
    {
      name: "Silver", 
      link: "/silver", 
      iconComponent: <img src="/images/Icon/menu-icons/Silver.svg" alt="Silver" className="w-5 h-5" />,
      sub: [
        { name: "Utensils", link: "/silver/utensils" },
        { name: "Anklets / payals", link: "/silver/anklets" },
        { name: "Kamar belt or satka", link: "/silver/kamar-belt" },
        { name: "Pooja articles", link: "/silver/pooja-articles" },
        { name: "Ring", link: "/silver/ring" },
        { name: "Earrings", link: "/silver/earring" },
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
      name: "Mens", 
      link: "/mens", 
      iconComponent: <img src="/images/Icon/menu-icons/Men's.svg" alt="Mens" className="w-5 h-5" />,
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
            { name: "Others", link: "/mens/silver-others" },
          ]
        },
        {
          category: "Diamond",
          items: [
            { name: "Diamond Rings", link: "/mens/diamond-rings" },
            { name: "Diamond Bracelet", link: "/mens/diamond-bracelet" },
            { name: "Others", link: "/mens/diamond-others" },
          ]
        }
      ]
    },
    {
      name: "Coins", 
      link: "/coins", 
      iconComponent: <img src="/images/Icon/menu-icons/Coins.svg" alt="Coins" className="w-5 h-5" />,
      sub: [
        { name: "Gold", link: "/coins/gold" },
        { name: "Silver", link: "/coins/silver" },
      ],
    },
    {
      name: "Gifting", 
      link: "/gifting", 
      iconComponent: <img src="/images/Icon/menu-icons/Gifting.svg" alt="Gifting" className="w-5 h-5" />,
      // sub: [
      //   { name: "Starting from 250-500", link: "/gifting" },
      //   { name: "500-1000", link: "/gifting" },
      //   { name: "1k-2k", link: "/gifting" },
      //   { name: "2k-5k", link: "/gifting" },
      //   { name: "5k-10k", link: "/gifting" },
      //   { name: "10k-15k", link: "/gifting" },
      //   { name: "15k-20k", link: "/gifting" },
      //   { name: "20k or Above ysical-20k", link: "/gifting" },
      //   { name: "Exclusive", link: "/gifting" },
      // ],
    },
    { 
      name: "Birth Stones", 
      link: "/birthstones", 
      iconComponent: <img src="/images/Icon/menu-icons/Birth Stones.svg" alt="Birth Stones" className="w-5 h-5" /> 
    },
  ], []);

  // State for categories (will use backend menus if available, else default)
  const [categories, setCategories] = useState(defaultCategories);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside both desktop and mobile search components
      if (
        searchRef.current && 
        !searchRef.current.contains(event.target) &&
        mobileSearchRef.current && 
        !mobileSearchRef.current.contains(event.target)
      ) {
        setSuggestions([]);
      }
    };

    // Add event listener when suggestions are shown
    if (suggestions.length > 0) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [suggestions.length]);

  // 🧠 Fetch menus from backend and merge with defaults
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const menus = await listMenus();
        if (menus && menus.length > 0) {
          // Transform backend menu structure to match frontend format
          const transformedMenus = menus.map(menu => ({
            name: menu.name,
            link: menu.link,
            iconComponent: getIconComponent(menu.name), // Convert icon name to image component
            sub: menu.hasNestedStructure ? menu.nestedSub : menu.sub,
            hasNestedStructure: menu.hasNestedStructure,
          }));
          setCategories(transformedMenus);
        } else {
          // If no menus in backend, use default
          setCategories(defaultCategories);
        }
      } catch (error) {
        console.error("Error fetching menus:", error);
        // Fallback to default categories if API fails
        setCategories(defaultCategories);
      }
    };
    fetchMenus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helper function to convert icon names to image components
  const getIconComponent = (name) => {
    // Map backend menu names to image paths
    const iconMap = {
      'home': '/icons/home-icon.png',
      'collections': '/icons/collections-icon.png',
      'gold': '/icons/gold-icon.png',
      'diamond': '/icons/diamond-icon.png',
      'silver': '/icons/silver-icon.png',
      'mens': '/icons/mens-icon.png',
      'coins': '/icons/coins-icon.png',
      'gifting': '/icons/gifting-icon.png',
      'birth stones': '/icons/birthstones-icon.png',
    };

    const iconPath = iconMap[name.toLowerCase()] || '/icons/default-icon.png';
    return <img src={iconPath} alt={name} className="w-5 h-5" />;
  };

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
    <header className="bg-[#FFF4DC] border-b border-[#b68d52] text-[#5A2B1A] font-sans w-full sticky top-0 z-50">
      {/* === Top Header Section === */}
      <div className="max-w-8xl mx-auto flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-10">
        {/* Left: Logo */}
        <div
          className="flex items-center cursor-pointer flex-shrink-0"
          onClick={() => navigate("/")}
        >
          <img
            src="/images/934a6aba-bdcc-4aef-ac80-b229a136329c-removebg-preview.png"
            className="h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 w-auto object-cover"
            alt="Vinayak Logo"
          />
        </div>

        {/* === Desktop Search Bar === */}
        <div className="relative hidden lg:flex flex-col w-[40%] xl:w-[38%] 2xl:w-[35%]" ref={searchRef}>
          <div className="flex items-center rounded-xl border border-[#A7968F] px-3 py-2">
            <span className="mr-2 text-[#A7968F] flex-shrink-0">
              <img src="/images/Icon/menu-icons/search.svg" alt="Search" className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search Gold, Diamond, Silver"
              className="w-full text-[#A7968F] outline-none text-xs lg:text-sm bg-transparent mainfont"
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
        <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 text-xs xl:text-sm font-medium text-[#5A2B1A] mainfont flex-shrink-0">
          {/* About */}
          <Link
            to="/about"
            className="flex items-center gap-1 xl:gap-2 transition-colors hover:text-[#b68d52] whitespace-nowrap"
          >
            <img src="/images/Icon/menu-icons/about.svg" alt="About" className="w-3.5 xl:w-4 h-3.5 xl:h-4 flex-shrink-0" />
            <span className="hidden xl:inline">About Vinayak</span>
          </Link>

          <span className="h-4 xl:h-5 w-[1px] bg-[#b68d52]" />

          {/* Contact */}
          <Link
            to="/contact"
            className="flex items-center gap-1 xl:gap-2 transition-colors hover:text-[#b68d52] whitespace-nowrap"
          >
            <img src="/images/Icon/menu-icons/call.svg" alt="Contact" className="w-3.5 xl:w-4 h-3.5 xl:h-4 flex-shrink-0" />
            <span className="hidden xl:inline">Contact Us</span>
          </Link>

          <span className="h-4 xl:h-5 w-[1px] bg-[#b68d52]" />

          {/* Store Location */}
          <a
            href="https://www.google.com/maps?ll=26.959695,75.778472&z=15&t=m&hl=en&gl=IN&mapclient=embed&cid=17692495985853724670"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 xl:gap-2 transition-colors hover:text-[#b68d52] whitespace-nowrap"
          >
            <img src="/images/Icon/menu-icons/location.svg" alt="Store Location" className="w-3.5 xl:w-4 h-3.5 xl:h-4 flex-shrink-0" />
            <span className="hidden xl:inline">Visit Our Store</span>
          </a>

          <span className="h-4 xl:h-5 w-[1px] bg-[#b68d52]" />

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/+919414156451"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-[#25D366] text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-md hover:scale-105 transition-transform duration-200 whitespace-nowrap"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span>WhatsApp</span>
          </a>

          {/* Instagram Button */}
          <a
            href="https://www.instagram.com/vinayak_jewellers_jaipur/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-md hover:scale-105 transition-transform duration-200 whitespace-nowrap"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            <span>Instagram</span>
          </a>

          {/* Enquiry Cart */}
          <Link
            to="/enquiry"
            aria-label="Open Enquiry Cart"
            className="flex items-center gap-1.5 bg-gradient-to-b from-[#5A2B1A] via-[#7B4A2A] to-[#2E0D02] text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-md border border-[#b68d52] hover:scale-105 transition-transform duration-200 whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4 flex-shrink-0" />
            <span>Enquiry Cart</span>
            {enquiryItems.length > 0 && (
              <span className="ml-1 bg-[#FFF7E0] text-[#5A2B1A] font-bold text-xs px-1.5 py-[2px] rounded-full border border-[#d1b890] shadow-sm">
                {enquiryItems.length}
              </span>
            )}
          </Link>
        </div>

        {/* === Mobile: Search Icon + Menu Toggle === */}
        <div className="lg:hidden flex items-center gap-2 flex-shrink-0">
          {/* Search Icon */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-[#5A2B1A]"
            aria-label="Toggle Search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          {/* Hamburger */}
          <button
            className="p-2 text-[#0E0100]"
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* === Mobile Search Bar (expandable) === */}
      {searchOpen && (
        <div className="lg:hidden px-4 pb-3" ref={mobileSearchRef}>
          <div className="flex items-center bg-white rounded-full border border-[#c7a46d] px-3 py-2">
            <svg className="w-4 h-4 mr-2 text-[#A7968F] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search Gold, Diamond, Silver..."
              className="w-full text-[#5A2B1A] outline-none text-sm bg-transparent mainfont placeholder:text-[#A7968F]"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-[#A7968F] ml-1">✕</button>
            )}
          </div>
          {suggestions.length > 0 && (
            <ul className="mt-1 bg-white border border-[#d1b890] rounded-xl shadow-md z-50">
              {suggestions.map((s, i) => (
                <li key={i} onClick={() => { handleSuggestionClick(s); setSearchOpen(false); }}
                  className="px-4 py-2 text-sm text-[#5A2B1A] hover:bg-[#FFF4DC] cursor-pointer">
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* === Mobile Sidebar Overlay === */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* === Mobile Sidebar Drawer (right side) === */}
      <div className={`fixed top-0 right-0 h-full w-[280px] bg-[#FFF9E6] z-50 shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-[#b68d52] bg-[#FFF4DC]">
          <img src="/images/934a6aba-bdcc-4aef-ac80-b229a136329c-removebg-preview.png" className="h-10 w-auto" alt="Logo" />
          <button onClick={() => setMenuOpen(false)} className="text-[#5A2B1A] p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav Items */}
        <div className="px-3 py-4 space-y-1">
          {categories.map((cat, index) => (
            <div key={index}>
              <div
                className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[#FFF4DC] cursor-pointer"
                onClick={() => {
                  if (cat.sub) {
                    setMobileSub(mobileSub === index ? null : index);
                  } else {
                    navigate(cat.link);
                    setMenuOpen(false);
                  }
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0">{cat.iconComponent}</span>
                  <span className="text-sm font-semibold text-[#5A2B1A]">{cat.name}</span>
                </div>
                {cat.sub && (
                  <svg className={`w-4 h-4 text-[#b68d52] transition-transform duration-200 ${mobileSub === index ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </div>

              {/* Submenu */}
              {cat.sub && mobileSub === index && (
                <div className="ml-8 mt-1 mb-2 space-y-1">
                  {cat.name === "Mens"
                    ? cat.sub.map((group, gi) => (
                        <div key={gi} className="mb-2">
                          <p className="text-xs font-bold text-[#b68d52] uppercase px-2 mb-1">{group.category}</p>
                          {group.items?.map((item, ii) => (
                            <button key={ii} onClick={() => { navigate(item.link); setMenuOpen(false); }}
                              className="block w-full text-left px-3 py-1.5 text-xs text-[#7a563f] hover:text-[#5A2B1A] hover:bg-[#FFF4DC] rounded-lg">
                              {item.name}
                            </button>
                          ))}
                        </div>
                      ))
                    : cat.sub.map((sub, si) => (
                        <button key={si} onClick={() => { navigate(sub.link); setMenuOpen(false); }}
                          className="block w-full text-left px-3 py-1.5 text-xs text-[#7a563f] hover:text-[#5A2B1A] hover:bg-[#FFF4DC] rounded-lg">
                          {sub.name}
                        </button>
                      ))
                  }
                </div>
              )}
            </div>
          ))}
          {/* About Us */}
          <div
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#FFF4DC] cursor-pointer"
            onClick={() => { navigate("/about"); setMenuOpen(false); }}
          >
            <img src="/images/Icon/menu-icons/about.svg" alt="About" className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-semibold text-[#5A2B1A]">About Us</span>
          </div>

          {/* Contact Us */}
          <div
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#FFF4DC] cursor-pointer"
            onClick={() => { navigate("/contact"); setMenuOpen(false); }}
          >
            <img src="/images/Icon/menu-icons/call.svg" alt="Contact" className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-semibold text-[#5A2B1A]">Contact Us</span>
          </div>
        </div>

        {/* Sidebar Footer Buttons */}
        <div className="px-4">
          <a href="https://wa.me/919414156451" target="_blank" rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-full text-sm font-medium w-full justify-center">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            WhatsApp
          </a>
          <a href="https://www.instagram.com/vinayak_jewellers_jaipur/" target="_blank" rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-medium w-full justify-center">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            Instagram
          </a>
          <Link to="/enquiry" onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 bg-gradient-to-b from-[#5A2B1A] via-[#7B4A2A] to-[#2E0D02] text-white px-4 py-2 rounded-full text-sm font-medium w-full justify-center border border-[#b68d52]">
            <ShoppingBag className="w-4 h-4" />
            Enquiry Cart
            {enquiryItems.length > 0 && (
              <span className="bg-[#FFF7E0] text-[#5A2B1A] font-bold text-xs px-1.5 py-[2px] rounded-full border border-[#d1b890]">
                {enquiryItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* === Desktop Bottom Navigation === */}
      <nav className="hidden lg:flex flex-wrap justify-center gap-4 xl:gap-6 pb-2 px-2">
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
              className="relative flex items-center gap-1.5 lg:gap-2 text-[#5A2B1A] px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm lg:text-[15px] font-semibold transition-all duration-300 after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-[#5A2B1A] after:transition-all after:duration-300 group-hover:after:w-full whitespace-nowrap"
            >
              <span className="flex-shrink-0">{cat.iconComponent}</span>
              <span>{cat.name}</span>
            </Link>

            {/* Only show dropdown if category has sub items */}
            {cat.sub && cat.name !== "Mens" && (
              <div
                className={`absolute ${openSub === index ? "flex" : "hidden"} group-hover:flex flex-col
       top-[110%] left-1/2 -translate-x-1/2
       bg-[#FFF7E0] text-[#5A2B1A]
       shadow-xl rounded-xl
       px-3 sm:px-4 py-2 sm:py-3 z-50 min-w-max max-w-[90vw]`}
              >
                {/* Heading */}
                <h3 className="text-center uppercase font-bold text-sm sm:text-base text-[#0E0100] mb-2">
                  {cat.name}
                </h3>

                {/* Horizontal line */}
                <hr className="border-[#d1b890] mb-2" />

                {/* Sub-items in 2 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
                  {cat.sub.map((sub, i) => (
                    <Link
                      key={i}
                      to={sub.link}
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(false);
                        setOpenSub(null);
                        navigate(sub.link);
                      }}
                      className="px-3 sm:px-4 py-1 text-xs sm:text-sm hover:underline rounded-lg text-left cursor-pointer whitespace-nowrap"
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
                <div className="w-[min(600px,90vw)] bg-[#FFF4DC] text-[#5A2B1A] shadow-2xl rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-200 ease-out">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-[#FFF7E0] to-[#FFF4DC] px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4">
                    <h3 className="text-center uppercase font-bold text-sm sm:text-base text-[#0E0100] mb-1 sm:mb-2">{cat.name}</h3>
                    <hr className="border-[#d1b890]" />
                  </div>

                  {/* Content Grid */}
                  <div className="p-2 sm:p-3 lg:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                    {cat.sub.map((category, catIndex) => (
                      <div
                        key={catIndex}
                        className="group/metal px-2 sm:px-3 lg:px-5"
                      >
                        {/* Metal Category Header with Icon */}
                        <div className="flex items-center gap-2 sm:gap-3 pb-2 sm:pb-3">
                          <h3 className="font-bold text-xs sm:text-sm text-[#0E0100]">
                            {category.category}
                          </h3>
                        </div>

                        {/* Items List - All items shown directly (no subdropdown) */}
                        <ul className="space-y-0.5 sm:space-y-1">
                          {category.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <Link
                                to={item.link}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setMenuOpen(false);
                                  setOpenSub(null);
                                  navigate(item.link);
                                }}
                                className="block py-0.5 sm:py-1 text-xs sm:text-sm text-[#7a563f] rounded-md hover:bg-[#FFF4DC] hover:text-[#5A2B1A] transition-all duration-150 border border-transparent hover:underline cursor-pointer"
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
      </nav>
    </header>
  );
}