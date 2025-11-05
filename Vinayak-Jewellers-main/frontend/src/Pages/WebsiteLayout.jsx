import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const WebsiteLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFF9E6]">
      {/* ✅ Shared Header */}
      <Header />

      {/* ✅ Page content from child routes */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ✅ Shared Footer */}
      <Footer />
    </div>
  );
};

export default WebsiteLayout;
