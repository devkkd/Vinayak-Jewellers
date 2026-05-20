import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp, FaPlus, FaTrashAlt } from "react-icons/fa";
import {
  getCategoriesByCollection,
  createCategory,
  addSubcategory,
  deleteCategory,
  deleteSubcategory,
} from "../../api/categoryAPI";

const COLLECTIONS = [
  "Gold",
  "Silver",
  "Diamond",
  "Wedding Collection",
  "Gifting",
  "Birth Stones",
  "Coins",
  "Mens",
];

const ManageCategories = () => {
  const [categoryData, setCategoryData] = useState({});
  const [loading, setLoading] = useState(true);
  const [openCollection, setOpenCollection] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("category");
  const [selectedCollection, setSelectedCollection] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const grouped = await getCategoriesByCollection();
      setCategoryData(grouped || {});
    } catch {
      alert("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const getToken = () =>
    localStorage.getItem("adminToken") || localStorage.getItem("backendToken");

  const openAddCategory = (collection) => {
    setModalType("category");
    setSelectedCollection(collection);
    setSelectedCategoryId(null);
    setNewName("");
    setShowModal(true);
  };

  const openAddSubcategory = (collection, categoryId) => {
    setModalType("subcategory");
    setSelectedCollection(collection);
    setSelectedCategoryId(categoryId);
    setNewName("");
    setShowModal(true);
  };

  const openAddCollectionCategory = () => {
    setModalType("pick-collection");
    setSelectedCollection("");
    setSelectedCategoryId(null);
    setNewName("");
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!newName.trim()) {
      alert("Please enter a name");
      return;
    }
    const token = getToken();
    if (!token) {
      alert("Please log in first");
      return;
    }

    try {
      if (modalType === "pick-collection") {
        if (!selectedCollection) {
          alert("Select a collection");
          return;
        }
        await createCategory(
          { collection: selectedCollection, category: newName.trim(), subcategories: [] },
          token
        );
      } else if (modalType === "category") {
        await createCategory(
          { collection: selectedCollection, category: newName.trim(), subcategories: [] },
          token
        );
      } else {
        await addSubcategory(selectedCategoryId, newName.trim(), token);
      }
      await loadCategories();
      setShowModal(false);
    } catch (err) {
      alert(err?.response?.data?.message || err.message || "Failed to save");
    }
  };

  const handleDeleteCategory = async (item, collection) => {
    if (!window.confirm(`Delete category "${item.category}"?`)) return;
    const token = getToken();
    try {
      await deleteCategory(item._id, token);
      await loadCategories();
    } catch (err) {
      alert(err?.response?.data?.message || "Delete failed");
    }
  };

  const handleDeleteSub = async (item, sub) => {
    if (!window.confirm(`Delete sub-category "${sub}"?`)) return;
    const token = getToken();
    try {
      await deleteSubcategory(item._id, sub, token);
      await loadCategories();
    } catch (err) {
      alert(err?.response?.data?.message || "Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="bg-[#FFF9E6] border border-[#E2C887]/60 rounded-xl p-6">
        <p>Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF9E6] border border-[#E2C887]/60 rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#5C1D02] cinzelfont">Categories</h2>
          <p className="text-sm text-[#7A2D0E] mt-1">
            Create categories and sub-categories. Products use these on the website.
          </p>
        </div>
        <button
          type="button"
          onClick={openAddCollectionCategory}
          className="flex items-center gap-2 bg-[#5C1D02] text-[#FFF9E6] px-4 py-2 rounded-lg hover:bg-[#3B1C0A]"
        >
          <FaPlus /> Add Category
        </button>
      </div>

      <div className="space-y-3">
        {COLLECTIONS.map((collection) => {
          const list = categoryData[collection] || [];
          const isOpen = openCollection === collection;
          return (
            <div key={collection} className="border border-[#E2C887]/50 rounded-lg overflow-hidden">
              <div
                className="flex justify-between items-center px-4 py-3 bg-[#FFF4DC] cursor-pointer hover:bg-[#F8E8B8]"
                onClick={() => setOpenCollection(isOpen ? null : collection)}
              >
                <span className="font-semibold text-[#5C1D02]">
                  {collection} ({list.length})
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openAddCategory(collection);
                    }}
                    className="text-xs flex items-center gap-1 bg-[#5C1D02] text-[#FFF9E6] px-2 py-1 rounded"
                  >
                    <FaPlus /> Category
                  </button>
                  {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>

              {isOpen && (
                <div className="p-4 space-y-3 bg-white">
                  {list.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No categories yet</p>
                  ) : (
                    list.map((item) => (
                      <div
                        key={item._id}
                        className="border border-[#E2C887]/40 rounded-lg p-3"
                      >
                        <div className="flex justify-between items-center gap-2">
                          <span className="font-medium text-[#3B1C0A]">{item.category}</span>
                          <div className="flex gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => openAddSubcategory(collection, item._id)}
                              className="text-xs bg-[#FFF4DC] border border-[#E2C887]/60 px-2 py-1 rounded"
                            >
                              <FaPlus /> Sub
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteCategory(item, collection)}
                              className="text-xs bg-[#5C1D02] text-white px-2 py-1 rounded"
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                        </div>
                        {item.subcategories?.length > 0 && (
                          <ul className="mt-2 ml-3 space-y-1">
                            {item.subcategories.map((sub) => (
                              <li
                                key={sub}
                                className="flex justify-between items-center text-sm text-[#5C1D02]"
                              >
                                <span>• {sub}</span>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteSub(item, sub)}
                                  className="text-xs text-red-700 hover:underline"
                                >
                                  Delete
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
          <div className="bg-[#FFF9E6] rounded-xl p-6 w-full max-w-md border border-[#E2C887]/60">
            <h3 className="text-lg font-bold text-[#5C1D02] mb-4">
              {modalType === "pick-collection" && "Add Category"}
              {modalType === "category" && `Add Category — ${selectedCollection}`}
              {modalType === "subcategory" && "Add Sub-category"}
            </h3>

            {modalType === "pick-collection" && (
              <select
                value={selectedCollection}
                onChange={(e) => setSelectedCollection(e.target.value)}
                className="w-full border rounded-lg p-3 mb-3 bg-white"
              >
                <option value="">Select Collection</option>
                {COLLECTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            )}

            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder={
                modalType === "subcategory"
                  ? "e.g. Gold Chains, Necklaces"
                  : "e.g. Necklace, Bangles, Rings"
              }
              className="w-full border rounded-lg p-3 mb-4 bg-white"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 bg-[#5C1D02] text-[#FFF9E6] rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategories;
