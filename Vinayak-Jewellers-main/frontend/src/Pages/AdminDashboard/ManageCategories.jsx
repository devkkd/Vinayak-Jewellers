import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaPlus, FaTrashAlt, FaEdit } from "react-icons/fa";
import {
  goldCategories,
  silverCategories,
  diamondCategories,
  giftingCategories,
  weddingCategories,
  birthStoneCategories,
} from "../../data/admincategories";

const ManageCategories = () => {
  const categoryGroups = [
    { name: "Gold", data: goldCategories },
    { name: "Silver", data: silverCategories },
    { name: "Diamond", data: diamondCategories },
    { name: "Wedding Collection", data: weddingCategories },
    { name: "Gifting", data: giftingCategories },
    { name: "Birth Stones", data: birthStoneCategories },
  ];

  const [openCategory, setOpenCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("category"); // "category" or "subcategory"
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [newName, setNewName] = useState("");

  // 🧭 Toggle expand/collapse
  const handleToggle = (catName) => {
    setOpenCategory(openCategory === catName ? null : catName);
  };

  // 🧠 Modal handlers
  const openAddModal = (type, groupName = null) => {
    setModalType(type);
    setSelectedGroup(groupName);
    setNewName("");
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleAdd = () => {
    if (!newName.trim()) return alert("Please enter a name");
    if (modalType === "category") {
      alert(`✅ Added new category: ${newName} (mock)`);
    } else {
      alert(`✅ Added new subcategory "${newName}" under ${selectedGroup} (mock)`);
    }
    setShowModal(false);
  };

  const handleEdit = (category, sub) => {
    alert(`Edit clicked for ${sub ? sub : category}`);
  };

  const handleDelete = (category, sub) => {
    const name = sub ? `${sub} (under ${category})` : category;
    if (window.confirm(`Delete "${name}"?`)) {
      alert(`Deleted ${name} (mock only)`);
    }
  };

  return (
    <div className="bg-[#FFF9E6] border border-[#E2C887]/60 rounded-xl p-6 shadow-sm relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#5C1D02] cinzelfont">
          Manage Categories
        </h2>
        <button
          onClick={() => openAddModal("category")}
          className="flex items-center gap-2 bg-[#5C1D02] text-[#FFF9E6] px-4 py-2 rounded-lg hover:bg-[#3B1C0A] transition-all"
        >
          <FaPlus /> Add Category
        </button>
      </div>

      <div className="space-y-4">
        {categoryGroups.map((group) => (
          <div
            key={group.name}
            className="border border-[#E2C887]/50 bg-[#FFF4DC] rounded-lg overflow-hidden shadow-sm"
          >
            {/* Category Header */}
            <div
              className="flex justify-between items-center px-5 py-3 cursor-pointer hover:bg-[#E2C887]/30 transition"
              onClick={() => handleToggle(group.name)}
            >
              <span className="font-semibold text-[#5C1D02] text-lg">
                {group.name}
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openAddModal("subcategory", group.name);
                  }}
                  className="flex items-center gap-1 bg-[#FFF9E6] text-[#5C1D02] border border-[#E2C887]/60 px-2 py-1 rounded-md hover:bg-[#E2C887]/20 transition"
                >
                  <FaPlus /> Subcategory
                </button>
                {openCategory === group.name ? <FaChevronUp /> : <FaChevronDown />}
              </div>
            </div>

            {/* Subcategories */}
            {openCategory === group.name && (
              <div className="bg-[#FFF9E6] px-5 py-3 space-y-3">
                {group.data.map((item, i) => (
                  <div key={i} className="border border-[#E2C887]/40 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-[#3B1C0A]">
                        {item.category}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(group.name, item.category)}
                          className="flex items-center gap-1 text-sm bg-[#FFF4DC] text-[#5C1D02] border border-[#E2C887]/60 px-2 py-1 rounded-md hover:bg-[#E2C887]/20 transition"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(group.name, item.category)}
                          className="flex items-center gap-1 text-sm bg-[#5C1D02] text-[#FFF9E6] px-2 py-1 rounded-md hover:bg-[#3B1C0A] transition"
                        >
                          <FaTrashAlt /> Delete
                        </button>
                      </div>
                    </div>

                    {/* Sub-subcategories */}
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
                                onClick={() => handleEdit(group.name, sub)}
                                className="text-xs bg-[#FFF4DC] text-[#5C1D02] border border-[#E2C887]/60 px-2 py-0.5 rounded-md hover:bg-[#E2C887]/20 transition"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(group.name, sub)}
                                className="text-xs bg-[#5C1D02] text-[#FFF9E6] px-2 py-0.5 rounded-md hover:bg-[#3B1C0A] transition"
                              >
                                <FaTrashAlt />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ✳ Modal for Adding Category or Subcategory */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-[#FFF9E6] border border-[#E2C887]/60 rounded-xl shadow-lg p-6 w-[90%] max-w-md">
            <h3 className="text-xl font-bold text-[#5C1D02] mb-4">
              Add{" "}
              {modalType === "category"
                ? "New Category"
                : `Subcategory under ${selectedGroup}`}
            </h3>

            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder={`Enter ${modalType} name`}
              className="w-full border border-[#E2C887]/60 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#E2C887]"
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
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategories;
