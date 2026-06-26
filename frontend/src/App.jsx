import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./Pages/ScrollToTop";
import { SearchProvider } from "./context/SearchContext";
import { EnquiryProvider } from "./context/EnquiryContext";

import WebsiteLayout from "./Pages/WebsiteLayout";
import PageSpinner from "./components/PageSpinner";

import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import SearchResults from "./Pages/SearchResults";
import LoginEnquiry from "./Pages/LoginEnquiry";
import Login from "./Pages/Login";
import TermsandConditions from "./Pages/TermsandConditions";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Disclaimer from "./Pages/Disclaimer";
import EnquiryCart from "./Pages/EnquiryCart";
import BackendProductDetails from "./Pages/BackendProductDetails";
import RemProductDetail from "./Pages/RemProductDetail";

import { goldProducts } from "./data/goldJewelleryProducts";
import { silverProducts } from "./data/silverJewelleryProducts";
import { diamondProducts } from "./data/diamondJewelleryProducts";
import { weddingProducts } from "./data/weddingJewelleryProducts";
import { giftingProducts } from "./data/giftingJewelleryProducts";
import { birthStoneProducts } from "./data/birthStoneProducts";

const AllJewellery = lazy(() => import("./Pages/AllJewellery"));
const Gold = lazy(() => import("./Pages/GoldJewelleryPage"));
const Silver = lazy(() => import("./Pages/Silver"));
const Diamond = lazy(() => import("./Pages/DiamondPage"));
const Wedding = lazy(() => import("./Pages/WeddingPage"));
const Gifting = lazy(() => import("./Pages/Gifting"));
const BirthStones = lazy(() => import("./Pages/BirthStones"));
const Ring = lazy(() => import("./Pages/RingPage"));
const Festive = lazy(() => import("./Pages/Festive"));
const Mangalsutra = lazy(() => import("./Pages/MangalsutraPage"));
const Mens = lazy(() => import("./Pages/MensPage"));
const Coins = lazy(() => import("./Pages/Coins"));
const AdminDashboard = lazy(() => import("./Pages/AdminDashboard/AdminDashboard"));
const DashboardHome = lazy(() => import("./Pages/AdminDashboard/DashboardHome"));
const ManageProducts = lazy(() => import("./Pages/AdminDashboard/ManageProducts"));
const ManageCategories = lazy(() => import("./Pages/AdminDashboard/ManageCategories"));
const ManageMenus = lazy(() => import("./Pages/AdminDashboard/ManageMenus"));
const ManageEnquiries = lazy(() => import("./Pages/AdminDashboard/ManageEnquiries"));
const ManageInstagramReels = lazy(() => import("./Pages/AdminDashboard/ManageInstagramReels"));
const AddProduct = lazy(() => import("./Pages/AdminDashboard/AddProduct"));
const BulkUpload = lazy(() => import("./Pages/AdminDashboard/BulkUpload"));

const Lazy = ({ children }) => <Suspense fallback={<PageSpinner />}>{children}</Suspense>;
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
              {/* <ScrollToTop/> */}
              <Route path="/alljewellery" element={<Lazy><AllJewellery /></Lazy>} />
              <Route path="/alljewellery/collections/:collectionItem" element={<Lazy><AllJewellery /></Lazy>} />
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
              <Route path="/dashboard/*" element={<Lazy><AdminDashboard /></Lazy>}>
                <Route index element={<Lazy><DashboardHome /></Lazy>} />
                <Route path="products" element={<Lazy><ManageProducts /></Lazy>} />
                <Route path="add-product" element={<Lazy><AddProduct /></Lazy>} />
                <Route path="bulk-upload" element={<Lazy><BulkUpload /></Lazy>} />
                <Route path="categories" element={<Lazy><ManageCategories /></Lazy>} />
                <Route path="menus" element={<Lazy><ManageMenus /></Lazy>} />
                <Route path="enquiries" element={<Lazy><ManageEnquiries /></Lazy>} />
                <Route path="instagram-reels" element={<Lazy><ManageInstagramReels /></Lazy>} />
              </Route>

              <Route path="/gold" element={<Lazy><Gold /></Lazy>} />
              <Route path="/gold/:subcategory" element={<Lazy><Gold /></Lazy>} />
              <Route
                path="/gold/product/:id"
                element={
                  <RemProductDetail
                    dataSource={goldProducts}
                    categoryName="Gold Jewellery"
                    backPath="/gold"
                  />
                }
              />

              <Route path="/silver" element={<Lazy><Silver /></Lazy>} />
              <Route path="/silver/:subcategory" element={<Lazy><Silver /></Lazy>} />
              <Route
                path="/silver/product/:id"
                element={
                  <RemProductDetail
                    dataSource={silverProducts}
                    categoryName="Silver Jewellery"
                    backPath="/silver"
                  />
                }
              />

              <Route path="/diamond" element={<Lazy><Diamond /></Lazy>} />
              <Route path="/diamond/:subcategory" element={<Lazy><Diamond /></Lazy>} />
              <Route
                path="/diamond/product/:id"
                element={
                  <RemProductDetail
                    dataSource={diamondProducts}
                    categoryName="Diamond Jewellery"
                    backPath="/diamond"
                  />
                }
              />

              <Route path="/wedding" element={<Lazy><Wedding /></Lazy>} />
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

              <Route path="/gifting" element={<Lazy><Gifting /></Lazy>} />
              <Route path="/gifting/:subcategory" element={<Lazy><Gifting /></Lazy>} />
              <Route
                path="/gifting/product/:id"
                element={
                  <RemProductDetail
                    dataSource={giftingProducts}
                    categoryName="Gifting"
                    backPath="/gifting"
                  />
                }
              />

              {/* 💎 Birth Stones */}
              <Route path="/birthstones" element={<Lazy><BirthStones /></Lazy>} />
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

              {/* Mens Jewellery */}
              <Route path="/mens" element={<Lazy><Mens /></Lazy>} />
              <Route path="/mens/:subcategory" element={<Lazy><Mens /></Lazy>} />

               <Route path="/coins" element={<Lazy><Coins /></Lazy>} />
              <Route path="/coins/:subcategory" element={<Lazy><Coins /></Lazy>} />

              <Route path="/ring" element={<Lazy><Ring /></Lazy>} />
              <Route path="/festive" element={<Lazy><Festive /></Lazy>} />
              <Route path="/mangalsutra" element={<Lazy><Mangalsutra /></Lazy>} />
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
