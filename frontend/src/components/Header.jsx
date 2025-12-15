import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import { useEnquiry } from "../context/EnquiryContext";
import { listBackendProducts } from "../api/backendProductsAPI";
import { listMenus } from "../api/menuAPI";
import { 
  ShoppingBag, 
  Search, 
  Info, 
  Phone, 
  MapPin,
  Home,
  Gem,
  Diamond,
  Coins,
  Gift,
  Sparkles,
  Users,
  CircleStar,
  Boxes 

} from "lucide-react";

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

  // ✅ Categories list (Hardcoded - Original) - Defined outside useEffect to avoid dependency issues
  const defaultCategories = React.useMemo(() => [
    { 
      name: "Home", 
      link: "/", 
      iconComponent: <Home className="w-5 h-5" /> 
    },
    {
      name: "Collections", 
      link: "/alljewellery", 
      iconComponent: <Boxes  className="w-5 h-5" />, // Placeholder - update based on actual meaning
      sub: [
        { name: "Gold Wedding", link: "/alljewellery/collections/gold-wedding" },
        { name: "Gold Traditional", link: "/alljewellery/collections/gold-traditional" },
        { name: "Gold rajasthani collection", link: "/alljewellery/collections/gold-rajasthani-collection" },
        { name: "Rose gold collection", link: "/alljewellery/collections/rose-gold-collection" },
        { name: "Diamond Wedding collection", link: "/alljewellery/collections/diamond-wedding-collection" },
        { name: "Diamond Solitaire", link: "/alljewellery/collections/diamond-solitaire" },
        { name: "Silver Utensils", link: "/alljewellery/collections/silver-utensils" },
        { name: "Silver traditional jewellery", link: "/alljewellery/collections/silver-traditional-jewellery" },
        { name: "Silver fancy jewellery", link: "/alljewellery/collections/silver-fancy-jewellery" },
        { name: "Gift Collection", link: "/alljewellery/collections/gift-collection" },
      ],
    },
    {
      name: "Gold", 
      link: "/gold", 
      iconComponent: <CircleStar className="w-5 h-5 text-yellow-500" />, // Placeholder - update based on actual meaning
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
      iconComponent: <Gem className="w-5 h-5" />,
      sub: [
        { name: "Ring", link: "/diamond/rings" },
        { name: "Earrings", link: "/diamond/earrings" },
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
      iconComponent: <CircleStar  className="w-5 h-5 text-gray-400" />, // Placeholder - update based on actual meaning
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
      name: "Mens", 
      link: "/mens", 
      iconComponent: <Users className="w-5 h-5" />,
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
      iconComponent: <Coins className="w-5 h-5" />,
      sub: [
        { name: "Gold", link: "/coins/gold" },
        { name: "Silver", link: "/coins/silver" },
      ],
    },
    {
      name: "Gifting", 
      link: "/gifting", 
      iconComponent: <Gift className="w-5 h-5" />,
      sub: [
        { name: "Starting from 250-500", link: "/gifting/starting-from-250-500" },
        { name: "500-1000", link: "/gifting/500-1000" },
        { name: "1k-2k", link: "/gifting/1k-2k" },
        { name: "2k-5k", link: "/gifting/2k-5k" },
        { name: "5k-10k", link: "/gifting/5k-10k" },
        { name: "10k-15k", link: "/gifting/10k-15k" },
        { name: "15k-20k", link: "/gifting/15k-20k" },
        { name: "20k or Above ysical-20k", link: "/gifting/20k-or-above-20k" },
        { name: "Exclusive", link: "/gifting/exclusive" },
      ],
    },
    { 
      name: "Birth Stones", 
      link: "/birthstones", 
      iconComponent: <Sparkles className="w-5 h-5" /> 
    },
  ], []);

  // State for categories (will use backend menus if available, else default)
  const [categories, setCategories] = useState(defaultCategories);

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
            iconComponent: getIconComponent(menu.name), // Convert icon name to component
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
  }, []); // defaultCategories is stable via useMemo, so safe to omit

  // Helper function to convert icon names to Lucide components
  const getIconComponent = (name) => {
    switch(name.toLowerCase()) {
      case 'home': return <Home className="w-5 h-5" />;
      case 'collections': return <Gem className="w-5 h-5" />;
      case 'gold': return <Gem className="w-5 h-5 text-yellow-500" />;
      case 'diamond': return <Diamond className="w-5 h-5" />;
      case 'silver': return <Gem className="w-5 h-5 text-gray-400" />;
      case 'mens': return <Users className="w-5 h-5" />;
      case 'coins': return <Coins className="w-5 h-5" />;
      case 'gifting': return <Gift className="w-5 h-5" />;
      case 'birth stones': return <Sparkles className="w-5 h-5" />;
      default: return <Gem className="w-5 h-5" />;
    }
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
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-10 py-2">
        {/* Left: Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/images/934a6aba-bdcc-4aef-ac80-b229a136329c-removebg-preview.png"
            className="h-14 sm:h-16 md:h-24 w-auto object-cover"
            alt="Vinayak Logo"
          />
        </div>

        {/* === Desktop Search Bar === */}
        <div className="relative hidden md:flex flex-col w-[30%]">
          <div className="flex items-center rounded-xl border border-[#A7968F] px-3 py-2">
            <span className="mr-2 text-[#A7968F]">
              <Search className="w-4 h-4" />
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
        <div className="hidden md:flex items-center gap-4 text-sm font-light text-[#5A2B1A] mainfont">
          {/* About */}
          <Link
            to="/about"
            className="flex items-center gap-2 transition-colors hover:text-[#b68d52]"
          >
            <Info className="w-4 h-4" />
            <span>About Vinayak</span>
          </Link>

          <span className="h-5 w-[1px] bg-[#b68d52]" />

          {/* Contact */}
          <Link
            to="/contact"
            className="flex items-center gap-2 transition-colors hover:text-[#b68d52]"
          >
            <Phone className="w-4 h-4" />
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
            <MapPin className="w-4 h-4" />
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
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* === Mobile Search Bar === */}
      <div className="relative flex md:hidden flex-col w-[90%] mx-auto mb-3">
        <div className="flex items-center bg-white rounded-full border border-[#c7a46d] px-3 py-2">
          <span className="mr-2 text-[#A7968F]">
            <Search className="w-4 h-4" />
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
              className="relative flex items-center gap-2 text-[#5A2B1A] px-4 py-2 hover:text-[#b68d52] rounded-xl text-sm md:text-base transition-all duration-300 after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-[#5A2B1A] after:transition-all after:duration-300 group-hover:after:w-full"
            >
              {cat.iconComponent}
              {cat.name}
            </Link>

            {/* Only show dropdown if category has sub items */}
            {cat.sub && cat.name !== "Mens" && (
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
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(false);
                        setOpenSub(null);
                        navigate(sub.link);
                      }}
                      className="px-4 py-1 text-sm hover:underline rounded-lg text-left cursor-pointer"
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
                    <h3 className="text-center uppercase font-bold text-16px text-[#0E0100] mb-2">{cat.name}</h3>
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
                        </div>

                        {/* Items List - All items shown directly (no subdropdown) */}
                        <ul className="space-y-1">
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
                                className="block py-1 text-sm text-[#7a563f] rounded-md hover:bg-[#FFF4DC] hover:text-[#5A2B1A] transition-all duration-150 border border-transparent hover:underline cursor-pointer"
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