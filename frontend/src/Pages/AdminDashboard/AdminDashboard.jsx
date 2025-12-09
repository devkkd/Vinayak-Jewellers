// import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaBox,
  FaPlus,
  FaThList,
  FaEnvelope,
  FaSignOutAlt,
  FaUpload,
} from "react-icons/fa";
import axios from "axios";
import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({});
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen((s) => !s);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin-login");
  };

  const menu = [
    { to: "/dashboard", label: "Dashboard", icon: <FaHome />, end: true },
    { to: "/dashboard/products", label: "Manage Products", icon: <FaBox /> },
    { to: "/dashboard/add-product", label: "Add Product", icon: <FaPlus /> },
    { to: "/dashboard/bulk-upload", label: "Bulk Upload", icon: <FaUpload /> },
    { to: "/dashboard/categories", label: "Categories", icon: <FaThList /> },
    { to: "/dashboard/enquiries", label: "Enquiries", icon: <FaEnvelope /> },
  ];

  // 🧠 Fetch Dashboard Data from API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token =
          localStorage.getItem("adminToken") ||
          localStorage.getItem("backendToken");
        if (!token) {
          navigate("/admin-login");
          return;
        }

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDashboardData(res.data || {});
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  return (
    <div className="flex h-screen bg-[#FFF9E6] text-[#3B1C0A]">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-[#5C1D02] text-[#FFF9E6] transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-[#E2C887]/30">
          <img
            src="/images/logo.png"
            alt="Vinayak Logo"
            className="h-10 w-auto object-contain mx-auto"
          />
          <button
            onClick={toggleSidebar}
            className="text-[#E2C887] hover:text-white transition"
            title="Toggle sidebar"
          >
            <FaBars />
          </button>
        </div>

        <nav className="flex-1 mt-3">
          {menu.map((m) => (
            <NavLink
              key={m.to}
              to={m.to}
              end={m.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 transition ${
                  isActive ? "bg-[#7A2D0E]" : "hover:bg-[#7A2D0E]/80"
                }`
              }
            >
              <span className="text-lg">{m.icon}</span>
              {sidebarOpen && (
                <span className="text-sm font-medium">{m.label}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-5 py-4 hover:bg-[#7A2D0E] transition text-left"
        >
          <FaSignOutAlt />
          {sidebarOpen && <span>Logout</span>}
        </button>

        <Link
          to="/"
          className="text-center text-xs py-3 border-t border-[#E2C887]/30 hover:bg-[#7A2D0E]/60"
        >
          ← Back to Website
        </Link>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-[#FFF4DC] border-b border-[#E2C887]/60 shadow-sm py-4 px-6 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-semibold text-[#5C1D02] cinzelfont">
            Admin Dashboard
          </h1>
          <div className="text-sm">
            Logged in as:{" "}
            <span className="font-semibold text-[#5C1D02]">Admin</span>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-full text-[#5C1D02]">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-[#5C1D02] mr-3"></div>
              Loading Dashboard...
            </div>
          ) : (
            <Outlet context={{ dashboardData }} />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
