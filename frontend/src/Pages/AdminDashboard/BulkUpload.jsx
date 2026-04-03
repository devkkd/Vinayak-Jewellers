import React, { useState } from "react";
import * as XLSX from "xlsx";
import client from "../../api/client";

const BulkUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const downloadTemplate = () => {
    // Create comprehensive template with examples for all categories
    const template = [
      {
        "Product Name": "Gold Necklace Set",
        "SKU": "GOLD-NECK-001",
        "Description": "Beautiful traditional gold necklace set with matching earrings",
        "Collection": "Gold",
        "Category": "Neckwear",
        "Subcategory": "Necklaces",
        "Image URL": "https://example.com/images/gold-necklace.jpg",
        "Image URL 2": "",
        "Image URL 3": "",
      },
      {
        "Product Name": "Silver Earrings",
        "SKU": "SILVER-EAR-001",
        "Description": "Elegant silver earrings with intricate design",
        "Collection": "Silver",
        "Category": "Earrings",
        "Subcategory": "",
        "Image URL": "https://example.com/images/silver-earrings.jpg",
        "Image URL 2": "",
        "Image URL 3": "",
      },
      {
        "Product Name": "Diamond Ring",
        "SKU": "DIAMOND-RING-001",
        "Description": "Stunning diamond ring with premium quality stones",
        "Collection": "Diamond",
        "Category": "Rings",
        "Subcategory": "",
        "Image URL": "https://example.com/images/diamond-ring.jpg",
        "Image URL 2": "",
        "Image URL 3": "",
      },
      {
        "Product Name": "Wedding Necklace",
        "SKU": "WEDDING-NECK-001",
        "Description": "Traditional wedding necklace in gold",
        "Collection": "Wedding Collection",
        "Category": "Traditional Gold",
        "Subcategory": "",
        "Image URL": "https://example.com/images/wedding-necklace.jpg",
        "Image URL 2": "",
        "Image URL 3": "",
      },
      {
        "Product Name": "Birth Stone Pendant",
        "SKU": "BIRTH-PEND-001",
        "Description": "Rashi Ratan pendant for zodiac signs",
        "Collection": "Birth Stones",
        "Category": "Rashi Ratan",
        "Subcategory": "",
        "Image URL": "https://example.com/images/birth-stone.jpg",
        "Image URL 2": "",
        "Image URL 3": "",
      },
      {
        "Product Name": "Gift Coin Set",
        "SKU": "GIFT-COIN-001",
        "Description": "Premium gold coins for gifting",
        "Collection": "Gifting",
        "Category": "Coins",
        "Subcategory": "Gold Coins",
        "Image URL": "https://example.com/images/gift-coin.jpg",
        "Image URL 2": "",
        "Image URL 3": "",
      },
    ];
    
    // Create worksheet with template data
    const ws = XLSX.utils.json_to_sheet(template);
    
    // Add instructions sheet
    const instructions = [
      { Instruction: "REQUIRED FIELDS:" },
      { Instruction: "• Product Name: Name of the product (Required)" },
      { Instruction: "• SKU: Unique product identifier (Required, must be unique)" },
      { Instruction: "• Description: Product description/details (Required)" },
      { Instruction: "• Collection: One of - Gold, Silver, Diamond, Wedding Collection, Gifting, Birth Stones, Coins (Required)" },
      { Instruction: "" },
      { Instruction: "OPTIONAL FIELDS:" },
      { Instruction: "• Category: Product category based on Collection" },
      { Instruction: "• Subcategory: Product subcategory" },
      { Instruction: "• Image URL: Primary product image URL (Required)" },
      { Instruction: "• Image URL 2: Second product image (Optional)" },
      { Instruction: "• Image URL 3: Third product image (Optional)" },
      { Instruction: "" },
      { Instruction: "CATEGORY GUIDE:" },
      { Instruction: "Gold → Neckwear, Earrings, Rings, Bangles / Bracelets, Anklets & Toe Rings, Pendants & Lockets, Nose Pins / Nose Rings" },
      { Instruction: "Silver → Neckwear, Earrings, Rings, Bangles / Bracelets, Anklets & Toe Rings, Nose Pins, Kamarbandh/ Satka, Watches, Mozonightns" },
      { Instruction: "Diamond → Necklace, Bangles/Bracelets, Rings, Nose Pins, Pendants & Lockets, Earrings" },
      { Instruction: "Wedding Collection → Traditional Gold, Traditional Silver, Hamel" },
      { Instruction: "Gifting → Gold Articles, Silver Articles, Coins" },
      { Instruction: "Birth Stones → Rashi Ratan, Emerald, PukhRaj" },
      { Instruction: "Coins → Gold Coins, Silver Coins" },
      { Instruction: "" },
      { Instruction: "NOTES:" },
      { Instruction: "• Image URLs should be publicly accessible" },
      { Instruction: "• Images will be automatically uploaded to Cloudinary" },
      { Instruction: "• Multiple images can be added using Image URL 2, Image URL 3 columns" },
      { Instruction: "• SKU must be unique - duplicates will be rejected" },
    ];
    const wsInstructions = XLSX.utils.json_to_sheet(instructions);
    
    // Create workbook with both sheets
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsInstructions, "Instructions");
    XLSX.utils.book_append_sheet(wb, ws, "Products");
    
    // Set column widths for better readability
    ws["!cols"] = [
      { wch: 20 }, // Product Name
      { wch: 15 }, // SKU
      { wch: 40 }, // Description
      { wch: 18 }, // Collection
      { wch: 18 }, // Category
      { wch: 18 }, // Subcategory
      { wch: 50 }, // Image URL
      { wch: 50 }, // Image URL 2
      { wch: 50 }, // Image URL 3
    ];
    
    XLSX.writeFile(wb, "Vinayak_Jewellers_Product_Template.xlsx");
  };

  const handleFileChange = (e) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an Excel file");
      return;
    }

    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          
          // Try to read from "Products" sheet first, otherwise use first sheet
          const sheetName = workbook.SheetNames.includes("Products") 
            ? "Products" 
            : workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

          if (json.length === 0) {
            alert("Excel file is empty");
            setUploading(false);
            return;
          }

          const normalizeKey = (key) =>
            String(key || "")
              .trim()
              .toLowerCase()
              .replace(/[\s_-]+/g, "");

          const pick = (row, aliases = []) => {
            const aliasSet = new Set(aliases.map((a) => normalizeKey(a)));
            const entry = Object.entries(row).find(([k]) => aliasSet.has(normalizeKey(k)));
            return entry ? String(entry[1] ?? "").trim() : "";
          };

          const normalizedProducts = json
            .map((row) => ({
              "Product Name": pick(row, ["Product Name", "ProductName", "Name"]),
              SKU: pick(row, ["SKU", "Sku"]),
              Description: pick(row, ["Description", "Details", "Product Description"]),
              Collection: pick(row, ["Collection"]),
              Category: pick(row, ["Category"]),
              Subcategory: pick(row, ["Subcategory", "Sub Category"]),
              "Image URL": pick(row, ["Image URL", "ImageURL", "Image Url 1"]),
              "Image URL 2": pick(row, ["Image URL 2", "ImageURL2", "Image Url 2"]),
              "Image URL 3": pick(row, ["Image URL 3", "ImageURL3", "Image Url 3"]),
            }))
            .filter(
              (row) =>
                row["Product Name"] ||
                row.SKU ||
                row.Description ||
                row["Image URL"] ||
                row["Image URL 2"] ||
                row["Image URL 3"]
            );

          if (normalizedProducts.length === 0) {
            alert("No valid product rows found in file");
            setUploading(false);
            return;
          }

          // Validate required fields
          const invalidRows = normalizedProducts
            .map((row, index) => {
              if (!row["Product Name"] || !row.SKU || !row.Description || !row["Image URL"]) {
                return index + 2; // +2 because row 1 is header
              }
              return null;
            })
            .filter(Boolean);

          if (invalidRows.length > 0) {
            alert(`Please fill all required fields (Product Name, SKU, Description, Image URL) in rows: ${invalidRows.join(", ")}`);
            setUploading(false);
            return;
          }

          const token = localStorage.getItem("adminToken") || localStorage.getItem("backendToken");

          const res = await client.post("/api/products/bulk-upload", { products: normalizedProducts }, {
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          });

          const successCount = res.data?.count || 0;
          const errorCount = res.data?.errors?.length || 0;
          
          if (errorCount > 0) {
            alert(`Upload completed!\n✅ Successfully uploaded: ${successCount} products\n❌ Failed: ${errorCount} products\n\nCheck console for error details with row numbers.`);
            console.error("Upload errors:", res.data.errors);
          } else {
            alert(`✅ Successfully uploaded ${successCount} products!`);
          }
          
          setFile(null);
        } catch (err) {
          alert(err?.response?.data?.message || "Failed to process Excel file");
        } finally {
          setUploading(false);
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (err) {
      alert("Failed to read file");
      setUploading(false);
    }
  };

  return (
    <div className="bg-[#FFF9E6] p-8 rounded-2xl shadow-md border border-[#E2C887]/40 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-[#5C1D02] mb-6 text-center cinzelfont">
        Bulk Product Upload
      </h2>

      <div className="space-y-6">
        <div className="bg-[#FFF4DC] p-4 rounded-lg border border-[#E2C887]/60">
          <h3 className="font-semibold text-[#5C1D02] mb-2">📋 Instructions:</h3>
          <ul className="text-sm text-[#3B1C0A] space-y-1 list-disc list-inside">
            <li>Click "Download Template" to get the Excel template with all required fields</li>
            <li>Fill in product details (Product Name, SKU, Description are required)</li>
            <li>Select Collection: Gold, Silver, Diamond, Wedding Collection, Gifting, Birth Stones, or Coins</li>
            <li>Add Category and Subcategory based on the Collection selected</li>
            <li>Add Image URLs (up to 3 images per product) - images will be automatically uploaded to Cloudinary</li>
            <li>Make sure Image URLs are publicly accessible</li>
            <li>SKU must be unique for each product</li>
            <li>Upload the filled Excel file using the button below</li>
          </ul>
        </div>

        <div className="flex gap-4">
          <button
            onClick={downloadTemplate}
            className="bg-[#5C1D02] text-[#FFF9E6] px-6 py-2 rounded-lg font-semibold hover:bg-[#3B1C0A] transition-all duration-300 flex items-center gap-2"
          >
            📥 Download Excel Template
          </button>
          <div className="text-sm text-[#7A2D0E] flex items-center">
            <span className="font-semibold">Template includes:</span> Product Name, SKU, Description, Collection, Category, Subcategory, Image URLs (up to 3)
          </div>
        </div>

        <div>
          <label className="block text-[#3B1C0A] font-semibold mb-2">
            Upload Excel File
          </label>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
            className="block w-full border border-[#E2C887]/60 rounded-lg bg-[#FFF9E6] p-2 focus:outline-none focus:ring-2 focus:ring-[#E2C887]"
          />
          {file && <p className="text-sm text-[#7A2D0E] mt-2">Selected: {file.name}</p>}
        </div>

        <div className="text-center">
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="bg-[#5C1D02] text-[#FFF9E6] px-6 py-2 rounded-lg font-semibold hover:bg-[#3B1C0A] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? "Uploading..." : "Upload Products"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkUpload;

