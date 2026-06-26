import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { prefetchPopularCollections } from "../utils/prefetchProducts";

const WebsiteLayout = () => {
  useEffect(() => {
    prefetchPopularCollections();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF9E6]">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default WebsiteLayout;
