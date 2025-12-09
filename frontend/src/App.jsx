import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { SearchProvider } from "./context/SearchContext";
import { EnquiryProvider } from "./context/EnquiryContext"; // ✅ ensure this exists

// 🧱 Layout
import WebsiteLayout from "./Pages/WebsiteLayout";

// 🏠 Website Pages
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import AllJewellery from "./Pages/AllJewellery";
import SearchResults from "./Pages/SearchResults";
import LoginEnquiry from "./Pages/LoginEnquiry";
import Login from "./Pages/Login";
import TermsandConditions from "./Pages/TermsandConditions";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Disclaimer from "./Pages/Disclaimer";

// 💎 Category Pages
import Gold from "./Pages/GoldJewelleryPage";
import Silver from "./Pages/Silver";
import Diamond from "./Pages/DiamondPage";
import Wedding from "./Pages/WeddingPage";
import Gifting from "./Pages/Gifting";
import BirthStones from "./Pages/BirthStones";
import Ring from "./Pages/RingPage";
import Festive from "./Pages/Festive";
import Mangalsutra from "./Pages/MangalsutraPage";

// 🧩 Product Details
import RemProductDetail from "./Pages/RemProductDetail";
import BackendProductDetails from "./Pages/BackendProductDetails";

// 🧱 Local Data Imports
import { goldProducts } from "./data/goldJewelleryProducts";
import { silverProducts } from "./data/silverJewelleryProducts";
import { diamondProducts } from "./data/diamondJewelleryProducts";
import { weddingProducts } from "./data/weddingJewelleryProducts";
import { giftingProducts } from "./data/giftingJewelleryProducts";
import { birthStoneProducts } from "./data/birthStoneProducts";

// ⚙ Admin Dashboard Pages
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import DashboardHome from "./Pages/AdminDashboard/DashboardHome";
import ManageProducts from "./Pages/AdminDashboard/ManageProducts";
import ManageCategories from "./Pages/AdminDashboard/ManageCategories";
import ManageEnquiries from "./Pages/AdminDashboard/ManageEnquiries";
import AddProduct from "./Pages/AdminDashboard/AddProduct";
import BulkUpload from "./Pages/AdminDashboard/BulkUpload";

// 🛒 NEW PAGE: Enquiry Cart
import EnquiryCart from "./Pages/EnquiryCart"; // ✅ create this page (I’ll give you below)


function App() {
  return (
    <SearchProvider>
      <EnquiryProvider> {/* ✅ wrap entire app so all components can use the enquiry cart */}
        <Router>
          <ScrollToTop />

          <Routes>
            {/* 🌐 Main Website Layout */}
            <Route element={<WebsiteLayout />}>
              {/* Public Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/alljewellery" element={<AllJewellery />} />
              <Route path="/login-enquiry" element={<LoginEnquiry />} />
              <Route path="/admin-login" element={<Login />} />
              <Route path="/terms" element={<TermsandConditions />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/disclaimer" element={<Disclaimer />} />

              {/* 🛒 NEW Enquiry Cart Route */}
              <Route path="/enquiry" element={<EnquiryCart />} /> {/* ✅ */}

              {/* Backend Product Details */}
              <Route path="/backend-product/:id" element={<BackendProductDetails />} />

              {/* ⚙ Admin Dashboard Routes */}
              <Route path="/dashboard/*" element={<AdminDashboard />}>
                <Route index element={<DashboardHome />} />
                <Route path="products" element={<ManageProducts />} />
                <Route path="add-product" element={<AddProduct />} />
                <Route path="bulk-upload" element={<BulkUpload />} />
                <Route path="categories" element={<ManageCategories />} />
                <Route path="enquiries" element={<ManageEnquiries />} />
              </Route>

              {/* 💎 Jewellery Pages */}
              <Route path="/gold" element={<Gold />} />
              <Route
                path="/gold/:id"
                element={
                  <RemProductDetail
                    dataSource={goldProducts}
                    categoryName="Gold Jewellery"
                    backPath="/gold"
                  />
                }
              />

              <Route path="/silver" element={<Silver />} />
              <Route
                path="/silver/:id"
                element={
                  <RemProductDetail
                    dataSource={silverProducts}
                    categoryName="Silver Jewellery"
                    backPath="/silver"
                  />
                }
              />

              <Route path="/diamond" element={<Diamond />} />
              <Route
                path="/diamond/:id"
                element={
                  <RemProductDetail
                    dataSource={diamondProducts}
                    categoryName="Diamond Jewellery"
                    backPath="/diamond"
                  />
                }
              />

              <Route path="/wedding" element={<Wedding />} />
              <Route
                path="/wedding/:id"
                element={
                  <RemProductDetail
                    dataSource={weddingProducts}
                    categoryName="Wedding Collection"
                    backPath="/wedding"
                  />
                }
              />

              <Route path="/gifting" element={<Gifting />} />
              <Route
                path="/gifting/:id"
                element={
                  <RemProductDetail
                    dataSource={giftingProducts}
                    categoryName="Gifting"
                    backPath="/gifting"
                  />
                }
              />

              {/* 💎 Birth Stones */}
              <Route path="/birthstones" element={<BirthStones />} />
              <Route
                path="/birthstones/:id"
                element={
                  <RemProductDetail
                    dataSource={birthStoneProducts}
                    categoryName="Birth Stones"
                    backPath="/birthstones"
                  />
                }
              />

              {/* Other Pages */}
              <Route path="/ring" element={<Ring />} />
              <Route path="/festive" element={<Festive />} />
              <Route path="/mangalsutra" element={<Mangalsutra />} />
            </Route>

            {/* 🚫 404 Page */}
            <Route
              path="*"
              element={
                <div className="text-center py-20 text-2xl font-semibold text-[#681F00]">
                  404 – Page Not Found
                </div>
              }
            />
          </Routes>
        </Router>
      </EnquiryProvider>
    </SearchProvider>
  );
}

export default App;
