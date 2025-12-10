import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp, FaPlus, FaTrashAlt, FaEdit, FaSave } from "react-icons/fa";
import {
  listMenus,
  createMenu,
  updateMenu,
  deleteMenu,
  addSubmenuItem,
  updateSubmenuItem,
  deleteSubmenuItem,
  addNestedCategory,
  addNestedCategoryItem,
  deleteNestedCategory,
  deleteNestedCategoryItem,
} from "../../api/menuAPI";

const ManageMenus = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("menu"); // "menu", "submenu", "nested-category", "nested-item"
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [selectedSubmenuIndex, setSelectedSubmenuIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    icon: "",
    order: 0,
    hasNestedStructure: false,
  });

  useEffect(() => {
    loadMenus();
  }, []);

  const loadMenus = async () => {
    try {
      setLoading(true);
      const data = await listMenus();
      setMenus(data);
    } catch (error) {
      console.error("Error loading menus:", error);
      alert("Failed to load menus");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (menuId) => {
    setOpenMenu(openMenu === menuId ? null : menuId);
  };

  const openAddModal = (type, menuId = null, categoryIndex = null, submenuIndex = null) => {
    setModalType(type);
    setSelectedMenuId(menuId);
    setSelectedCategoryIndex(categoryIndex);
    setSelectedSubmenuIndex(submenuIndex);
    setFormData({
      name: "",
      link: "",
      icon: "",
      order: menus.length,
      hasNestedStructure: false,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMenuId(null);
    setSelectedCategoryIndex(null);
    setSelectedSubmenuIndex(null);
    setFormData({
      name: "",
      link: "",
      icon: "",
      order: 0,
      hasNestedStructure: false,
    });
  };

  const handleAdd = async () => {
    try {
      const token = localStorage.getItem("adminToken") || localStorage.getItem("backendToken");
      if (!token) {
        alert("Please log in first");
        return;
      }

      if (modalType === "menu") {
        if (!formData.name || !formData.link || !formData.icon) {
          alert("Name, link, and icon are required");
          return;
        }
        await createMenu(
          {
            name: formData.name,
            link: formData.link,
            icon: formData.icon,
            order: formData.order,
            hasNestedStructure: formData.hasNestedStructure,
            sub: [],
            nestedSub: [],
          },
          token
        );
        alert(`✅ Added new menu: ${formData.name}`);
      } else if (modalType === "submenu") {
        if (!formData.name || !formData.link) {
          alert("Name and link are required");
          return;
        }
        await addSubmenuItem(selectedMenuId, { name: formData.name, link: formData.link }, token);
        alert(`✅ Added submenu item: ${formData.name}`);
      } else if (modalType === "nested-category") {
        if (!formData.name) {
          alert("Category name is required");
          return;
        }
        await addNestedCategory(selectedMenuId, { category: formData.name, items: [] }, token);
        alert(`✅ Added nested category: ${formData.name}`);
      } else if (modalType === "nested-item") {
        if (!formData.name || !formData.link) {
          alert("Name and link are required");
          return;
        }
        await addNestedCategoryItem(
          selectedMenuId,
          { categoryIndex: selectedCategoryIndex, name: formData.name, link: formData.link },
          token
        );
        alert(`✅ Added item to nested category`);
      }

      await loadMenus();
      closeModal();
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || "Failed to add";
      alert(`❌ ${msg}`);
    }
  };

  const handleEdit = async (menu) => {
    setFormData({
      name: menu.name,
      link: menu.link,
      icon: menu.icon,
      order: menu.order,
      hasNestedStructure: menu.hasNestedStructure || false,
    });
    setSelectedMenuId(menu._id);
    setModalType("edit-menu");
    setShowModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem("adminToken") || localStorage.getItem("backendToken");
      if (!token) {
        alert("Please log in first");
        return;
      }

      const menu = menus.find((m) => m._id === selectedMenuId);
      if (!menu) {
        alert("Menu not found");
        return;
      }

      await updateMenu(
        selectedMenuId,
        {
          name: formData.name,
          link: formData.link,
          icon: formData.icon,
          order: formData.order,
          hasNestedStructure: formData.hasNestedStructure,
          sub: menu.sub || [],
          nestedSub: menu.nestedSub || [],
        },
        token
      );

      alert(`✅ Updated menu: ${formData.name}`);
      await loadMenus();
      closeModal();
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || "Failed to update";
      alert(`❌ ${msg}`);
    }
  };

  const handleDelete = async (menuId, type = "menu", categoryIndex = null, itemIndex = null) => {
    if (!window.confirm(`Delete this ${type}?`)) return;

    try {
      const token = localStorage.getItem("adminToken") || localStorage.getItem("backendToken");
      if (!token) {
        alert("Please log in first");
        return;
      }

      if (type === "menu") {
        await deleteMenu(menuId, token);
        alert("✅ Deleted menu item");
      } else if (type === "submenu") {
        await deleteSubmenuItem(menuId, { index: itemIndex }, token);
        alert("✅ Deleted submenu item");
      } else if (type === "nested-category") {
        await deleteNestedCategory(menuId, { categoryIndex }, token);
        alert("✅ Deleted nested category");
      } else if (type === "nested-item") {
        await deleteNestedCategoryItem(menuId, { categoryIndex, itemIndex }, token);
        alert("✅ Deleted nested item");
      }

      await loadMenus();
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || "Failed to delete";
      alert(`❌ ${msg}`);
    }
  };

  const handleEditSubmenu = async (menuId, index, currentName, currentLink) => {
    const newName = window.prompt("Edit submenu name:", currentName);
    if (!newName || newName.trim() === currentName) return;

    const newLink = window.prompt("Edit submenu link:", currentLink);
    if (!newLink) return;

    try {
      const token = localStorage.getItem("adminToken") || localStorage.getItem("backendToken");
      if (!token) {
        alert("Please log in first");
        return;
      }

      await updateSubmenuItem(menuId, { index, name: newName.trim(), link: newLink.trim() }, token);
      alert("✅ Updated submenu item");
      await loadMenus();
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || "Failed to update";
      alert(`❌ ${msg}`);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#FFF9E6] border border-[#E2C887]/60 rounded-xl p-6 shadow-sm">
        <p className="text-[#3B1C0A]">Loading menus...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF9E6] border border-[#E2C887]/60 rounded-xl p-6 shadow-sm relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#5C1D02] cinzelfont">Manage Menus</h2>
        <button
          onClick={() => openAddModal("menu")}
          className="flex items-center gap-2 bg-[#5C1D02] text-[#FFF9E6] px-4 py-2 rounded-lg hover:bg-[#3B1C0A] transition-all"
        >
          <FaPlus /> Add Menu Item
        </button>
      </div>

      <div className="space-y-4">
        {menus.length === 0 ? (
          <p className="text-[#3B1C0A] text-center py-8">No menu items yet. Add your first menu item!</p>
        ) : (
          menus.map((menu) => (
            <div
              key={menu._id}
              className="border border-[#E2C887]/50 bg-[#FFF4DC] rounded-lg overflow-hidden shadow-sm"
            >
              {/* Menu Header */}
              <div
                className="flex justify-between items-center px-5 py-3 cursor-pointer hover:bg-[#E2C887]/30 transition"
                onClick={() => handleToggle(menu._id)}
              >
                <div className="flex items-center gap-3">
                  <img src={menu.icon} alt={menu.name} className="w-6 h-6 object-contain" />
                  <span className="font-semibold text-[#5C1D02] text-lg">{menu.name}</span>
                  <span className="text-sm text-[#7a563f]">({menu.link})</span>
                  {menu.hasNestedStructure && (
                    <span className="text-xs bg-[#5C1D02] text-[#FFF9E6] px-2 py-1 rounded">Nested</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(menu);
                    }}
                    className="flex items-center gap-1 bg-[#FFF9E6] text-[#5C1D02] border border-[#E2C887]/60 px-2 py-1 rounded-md hover:bg-[#E2C887]/20 transition"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(menu._id);
                    }}
                    className="flex items-center gap-1 bg-[#5C1D02] text-[#FFF9E6] px-2 py-1 rounded-md hover:bg-[#3B1C0A] transition"
                  >
                    <FaTrashAlt /> Delete
                  </button>
                  {openMenu === menu._id ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>

              {/* Menu Details */}
              {openMenu === menu._id && (
                <div className="bg-[#FFF9E6] px-5 py-3 space-y-4">
                  {/* Simple Submenu */}
                  {!menu.hasNestedStructure && menu.sub && menu.sub.length > 0 && (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-[#5C1D02]">Submenu Items</h4>
                        <button
                          onClick={() => openAddModal("submenu", menu._id)}
                          className="flex items-center gap-1 text-sm bg-[#FFF4DC] text-[#5C1D02] border border-[#E2C887]/60 px-2 py-1 rounded-md hover:bg-[#E2C887]/20 transition"
                        >
                          <FaPlus /> Add Submenu
                        </button>
                      </div>
                      <ul className="space-y-2">
                        {menu.sub.map((sub, index) => (
                          <li
                            key={index}
                            className="flex justify-between items-center border-l border-[#E2C887]/50 pl-3 py-1"
                          >
                            <span className="text-sm text-[#5C1D02]">
                              {sub.name} - <span className="text-xs text-[#7a563f]">{sub.link}</span>
                            </span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditSubmenu(menu._id, index, sub.name, sub.link)}
                                className="text-xs bg-[#FFF4DC] text-[#5C1D02] border border-[#E2C887]/60 px-2 py-0.5 rounded-md hover:bg-[#E2C887]/20 transition"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(menu._id, "submenu", null, index)}
                                className="text-xs bg-[#5C1D02] text-[#FFF9E6] px-2 py-0.5 rounded-md hover:bg-[#3B1C0A] transition"
                              >
                                <FaTrashAlt />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Nested Structure */}
                  {menu.hasNestedStructure && menu.nestedSub && menu.nestedSub.length > 0 && (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-[#5C1D02]">Nested Categories</h4>
                        <button
                          onClick={() => openAddModal("nested-category", menu._id)}
                          className="flex items-center gap-1 text-sm bg-[#FFF4DC] text-[#5C1D02] border border-[#E2C887]/60 px-2 py-1 rounded-md hover:bg-[#E2C887]/20 transition"
                        >
                          <FaPlus /> Add Category
                        </button>
                      </div>
                      <div className="space-y-3">
                        {menu.nestedSub.map((category, catIndex) => (
                          <div key={catIndex} className="border border-[#E2C887]/40 rounded-lg p-3">
                            <div className="flex justify-between items-center mb-2">
                              <h5 className="font-medium text-[#5C1D02]">{category.category}</h5>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => openAddModal("nested-item", menu._id, catIndex)}
                                  className="text-xs bg-[#FFF4DC] text-[#5C1D02] border border-[#E2C887]/60 px-2 py-0.5 rounded-md hover:bg-[#E2C887]/20 transition"
                                >
                                  <FaPlus /> Add Item
                                </button>
                                <button
                                  onClick={() => handleDelete(menu._id, "nested-category", catIndex)}
                                  className="text-xs bg-[#5C1D02] text-[#FFF9E6] px-2 py-0.5 rounded-md hover:bg-[#3B1C0A] transition"
                                >
                                  <FaTrashAlt />
                                </button>
                              </div>
                            </div>
                            <ul className="space-y-1 ml-4">
                              {category.items.map((item, itemIndex) => (
                                <li
                                  key={itemIndex}
                                  className="flex justify-between items-center text-sm text-[#5C1D02]"
                                >
                                  <span>
                                    {item.name} - <span className="text-xs text-[#7a563f]">{item.link}</span>
                                  </span>
                                  <button
                                    onClick={() => handleDelete(menu._id, "nested-item", catIndex, itemIndex)}
                                    className="text-xs bg-[#5C1D02] text-[#FFF9E6] px-2 py-0.5 rounded-md hover:bg-[#3B1C0A] transition"
                                  >
                                    <FaTrashAlt />
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add buttons for empty menus */}
                  {(!menu.sub || menu.sub.length === 0) && !menu.hasNestedStructure && (
                    <button
                      onClick={() => openAddModal("submenu", menu._id)}
                      className="text-sm bg-[#FFF4DC] text-[#5C1D02] border border-[#E2C887]/60 px-3 py-2 rounded-md hover:bg-[#E2C887]/20 transition"
                    >
                      <FaPlus /> Add Submenu Item
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-[#FFF9E6] border border-[#E2C887]/60 rounded-xl shadow-lg p-6 w-[90%] max-w-md">
            <h3 className="text-xl font-bold text-[#5C1D02] mb-4">
              {modalType === "menu" && "Add New Menu Item"}
              {modalType === "edit-menu" && "Edit Menu Item"}
              {modalType === "submenu" && "Add Submenu Item"}
              {modalType === "nested-category" && "Add Nested Category"}
              {modalType === "nested-item" && "Add Item to Nested Category"}
            </h3>

            <div className="space-y-3">
              {(modalType === "menu" || modalType === "edit-menu") && (
                <>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Menu Name (e.g., Home, Gold, Diamond)"
                    className="w-full border border-[#E2C887]/60 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E2C887]"
                  />
                  <input
                    type="text"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="Link (e.g., /, /gold, /diamond)"
                    className="w-full border border-[#E2C887]/60 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E2C887]"
                  />
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="Icon Path (e.g., /images/Icon/menu-icons/home.png)"
                    className="w-full border border-[#E2C887]/60 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E2C887]"
                  />
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    placeholder="Order (0, 1, 2, ...)"
                    className="w-full border border-[#E2C887]/60 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E2C887]"
                  />
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.hasNestedStructure}
                      onChange={(e) => setFormData({ ...formData, hasNestedStructure: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-[#5C1D02]">Use Nested Structure (like Mens category)</span>
                  </label>
                </>
              )}

              {(modalType === "submenu" || modalType === "nested-item") && (
                <>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Item Name"
                    className="w-full border border-[#E2C887]/60 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E2C887]"
                  />
                  <input
                    type="text"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="Link"
                    className="w-full border border-[#E2C887]/60 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E2C887]"
                  />
                </>
              )}

              {modalType === "nested-category" && (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Category Name (e.g., Gold, Silver, Diamond)"
                  className="w-full border border-[#E2C887]/60 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E2C887]"
                />
              )}

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-[#FFF4DC] text-[#5C1D02] border border-[#E2C887]/60 rounded-md hover:bg-[#E2C887]/20 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={modalType === "edit-menu" ? handleSaveEdit : handleAdd}
                  className="px-4 py-2 bg-[#5C1D02] text-[#FFF9E6] rounded-md hover:bg-[#3B1C0A] transition flex items-center gap-2"
                >
                  {modalType === "edit-menu" ? <FaSave /> : <FaPlus />}
                  {modalType === "edit-menu" ? "Save" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMenus;


