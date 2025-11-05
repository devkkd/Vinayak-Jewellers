import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp, FaPlus, FaTrashAlt, FaEdit } from "react-icons/fa";
import {
  getCategoriesByCollection,
  createCategory,
  addSubcategory,
  updateCategory,
  deleteCategory,
  deleteSubcategory,
} from "../../api/categoryAPI";

const ManageCategories = () => {
  const [categoryData, setCategoryData] = useState({});
  const [loading, setLoading] = useState(true);
  const [openCategory, setOpenCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("category"); // "category" or "subcategory"
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [newName, setNewName] = useState("");

  // Collection names
  const collections = ["Gold", "Silver", "Diamond", "Wedding Collection", "Gifting", "Birth Stones", "Coins"];

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const grouped = await getCategoriesByCollection();
      setCategoryData(grouped);
    } catch (error) {
      console.error("Error loading categories:", error);
      alert("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  // 🧭 Toggle expand/collapse
  const handleToggle = (collectionName) => {
    setOpenCategory(openCategory === collectionName ? null : collectionName);
  };

  // 🧠 Modal handlers
  const openAddModal = (type, groupName = null, categoryId = null) => {
    setModalType(type);
    setSelectedGroup(groupName);
    setSelectedCategoryId(categoryId);
    setNewName("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedGroup(null);
    setSelectedCategoryId(null);
    setNewName("");
  };

  const handleAdd = async () => {
    if (!newName.trim()) {
      alert("Please enter a name");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken") || localStorage.getItem("backendToken");
      if (!token) {
        alert("Please log in first");
        return;
      }

    if (modalType === "category") {
        if (!selectedGroup) {
          alert("Please select a collection first");
          return;
        }
        await createCategory(
          {
            collection: selectedGroup,
            category: newName.trim(),
            subcategories: [],
          },
          token
        );
        alert(`✅ Added new category: ${newName}`);
    } else {
        // Adding subcategory
        if (!selectedCategoryId) {
          alert("Category ID not found");
          return;
        }
        await addSubcategory(selectedCategoryId, newName.trim(), token);
        alert(`✅ Added new subcategory "${newName}" under ${selectedGroup}`);
      }

      await loadCategories();
      closeModal();
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || "Failed to add";
      alert(`❌ ${msg}`);
    }
  };

  const handleEdit = async (categoryItem, collectionName) => {
    const newName = window.prompt(`Edit category name:`, categoryItem.category);
    if (!newName || newName.trim() === categoryItem.category) return;

    try {
      const token = localStorage.getItem("adminToken") || localStorage.getItem("backendToken");
      if (!token) {
        alert("Please log in first");
        return;
      }

      if (!categoryItem._id) {
        alert("Category ID not found");
        return;
      }

      await updateCategory(
        categoryItem._id,
        {
          category: newName.trim(),
          subcategories: categoryItem.subcategories || [],
        },
        token
      );

      alert(`✅ Updated category to: ${newName}`);
      await loadCategories();
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || "Failed to update";
      alert(`❌ ${msg}`);
    }
  };

  const handleDelete = async (categoryItem, collectionName, subcategoryName = null) => {
    const name = subcategoryName ? `${subcategoryName} (under ${categoryItem.category})` : categoryItem.category;
    if (!window.confirm(`Delete "${name}"?`)) return;

    try {
      const token = localStorage.getItem("adminToken") || localStorage.getItem("backendToken");
      if (!token) {
        alert("Please log in first");
        return;
      }

      if (!categoryItem._id) {
        alert("Category ID not found");
        return;
      }

      if (subcategoryName) {
        // Delete subcategory
        await deleteSubcategory(categoryItem._id, subcategoryName, token);
        alert(`✅ Deleted subcategory: ${subcategoryName}`);
      } else {
        // Delete category
        await deleteCategory(categoryItem._id, token);
        alert(`✅ Deleted category: ${categoryItem.category}`);
      }

      await loadCategories();
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || "Failed to delete";
      alert(`❌ ${msg}`);
    }
  };

  const handleEditSubcategory = async (categoryItem, collectionName, subcategoryName) => {
    const newName = window.prompt(`Edit subcategory name:`, subcategoryName);
    if (!newName || newName.trim() === subcategoryName) return;

    try {
      const token = localStorage.getItem("adminToken") || localStorage.getItem("backendToken");
      if (!token) {
        alert("Please log in first");
        return;
      }

      if (!categoryItem._id) {
        alert("Category ID not found");
        return;
      }

      // Update subcategories array
      const updatedSubcategories = (categoryItem.subcategories || []).map((sub) =>
        sub === subcategoryName ? newName.trim() : sub
      );

      await updateCategory(
        categoryItem._id,
        {
          category: categoryItem.category,
          subcategories: updatedSubcategories,
        },
        token
      );

      alert(`✅ Updated subcategory to: ${newName}`);
      await loadCategories();
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || "Failed to update";
      alert(`❌ ${msg}`);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#FFF9E6] border border-[#E2C887]/60 rounded-xl p-6 shadow-sm">
        <p className="text-[#3B1C0A]">Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF9E6] border border-[#E2C887]/60 rounded-xl p-6 shadow-sm relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#5C1D02] cinzelfont">
          Manage Categories
        </h2>
        <button
          onClick={() => openAddModal("collection")}
          className="flex items-center gap-2 bg-[#5C1D02] text-[#FFF9E6] px-4 py-2 rounded-lg hover:bg-[#3B1C0A] transition-all"
        >
          <FaPlus /> Add Category
        </button>
      </div>

      <div className="space-y-4">
        {collections.map((collectionName) => {
          const categories = categoryData[collectionName] || [];
          return (
          <div
              key={collectionName}
            className="border border-[#E2C887]/50 bg-[#FFF4DC] rounded-lg overflow-hidden shadow-sm"
          >
              {/* Collection Header */}
            <div
              className="flex justify-between items-center px-5 py-3 cursor-pointer hover:bg-[#E2C887]/30 transition"
                onClick={() => handleToggle(collectionName)}
            >
              <span className="font-semibold text-[#5C1D02] text-lg">
                  {collectionName}
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                      openAddModal("category", collectionName);
                  }}
                  className="flex items-center gap-1 bg-[#FFF9E6] text-[#5C1D02] border border-[#E2C887]/60 px-2 py-1 rounded-md hover:bg-[#E2C887]/20 transition"
                >
                    <FaPlus /> Category
                </button>
                  {openCategory === collectionName ? <FaChevronUp /> : <FaChevronDown />}
              </div>
            </div>

              {/* Categories */}
              {openCategory === collectionName && (
              <div className="bg-[#FFF9E6] px-5 py-3 space-y-3">
                  {categories.length === 0 ? (
                    <p className="text-[#3B1C0A] text-sm italic">No categories yet</p>
                  ) : (
                    categories.map((item, i) => {
                      const categoryId = item._id;

                      return (
                  <div key={i} className="border border-[#E2C887]/40 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-[#3B1C0A]">
                        {item.category}
                      </span>
                      <div className="flex gap-2">
                        <button
                                onClick={() => handleEdit(item, collectionName)}
                          className="flex items-center gap-1 text-sm bg-[#FFF4DC] text-[#5C1D02] border border-[#E2C887]/60 px-2 py-1 rounded-md hover:bg-[#E2C887]/20 transition"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                                onClick={() => handleDelete(item, collectionName)}
                          className="flex items-center gap-1 text-sm bg-[#5C1D02] text-[#FFF9E6] px-2 py-1 rounded-md hover:bg-[#3B1C0A] transition"
                        >
                          <FaTrashAlt /> Delete
                        </button>
                      </div>
                    </div>

                          {/* Subcategories */}
                    {item.subcategories && item.subcategories.length > 0 && (
                      <ul className="mt-2 ml-4 space-y-1 text-sm text-[#5C1D02]">
                        {item.subcategories.map((sub, j) => (
                          <li
                            key={j}
                            className="flex justify-between items-center border-l border-[#E2C887]/50 pl-3"
                          >
                            <span>{sub}</span>
                            <div className="flex gap-2">
                              <button
                                      onClick={() => handleEditSubcategory(item, collectionName, sub)}
                                className="text-xs bg-[#FFF4DC] text-[#5C1D02] border border-[#E2C887]/60 px-2 py-0.5 rounded-md hover:bg-[#E2C887]/20 transition"
                              >
                                <FaEdit />
                              </button>
                              <button
                                      onClick={() => handleDelete(item, collectionName, sub)}
                                className="text-xs bg-[#5C1D02] text-[#FFF9E6] px-2 py-0.5 rounded-md hover:bg-[#3B1C0A] transition"
                              >
                                <FaTrashAlt />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}

                          {/* Add Subcategory button */}
                          {categoryId && (
                            <button
                              onClick={() => {
                                openAddModal("subcategory", `${collectionName} > ${item.category}`, categoryId);
                              }}
                              className="mt-2 text-xs bg-[#FFF4DC] text-[#5C1D02] border border-[#E2C887]/60 px-2 py-1 rounded-md hover:bg-[#E2C887]/20 transition"
                            >
                              <FaPlus /> Add Subcategory
                            </button>
                    )}
                  </div>
                      );
                    })
                  )}
              </div>
            )}
          </div>
          );
        })}
      </div>

      {/* Modal for Adding Category or Subcategory */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-[#FFF9E6] border border-[#E2C887]/60 rounded-xl shadow-lg p-6 w-[90%] max-w-md">
            <h3 className="text-xl font-bold text-[#5C1D02] mb-4">
              {modalType === "collection"
                ? "Select Collection First"
                : modalType === "category"
                ? `Add New Category to ${selectedGroup}`
                : `Add Subcategory under ${selectedGroup}`}
            </h3>

            {modalType === "collection" ? (
              <select
                value={selectedGroup || ""}
                onChange={(e) => {
                  setSelectedGroup(e.target.value);
                  setModalType("category");
                }}
                className="w-full border border-[#E2C887]/60 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#E2C887]"
              >
                <option value="">Select Collection</option>
                {collections.map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            ) : (
              <>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
                  placeholder={`Enter ${modalType === "category" ? "category" : "subcategory"} name`}
              className="w-full border border-[#E2C887]/60 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#E2C887]"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleAdd();
                  }}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-[#FFF4DC] text-[#5C1D02] border border-[#E2C887]/60 rounded-md hover:bg-[#E2C887]/20 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-[#5C1D02] text-[#FFF9E6] rounded-md hover:bg-[#3B1C0A] transition"
              >
                Add
              </button>
            </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategories;
