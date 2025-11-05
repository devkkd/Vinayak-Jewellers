import React, { useState } from "react";
import { uploadBackendProduct } from "../api/backendProductsAPI";

const BackendAddProduct = () => {
  const [productName, setProductName] = useState("");
  const [details, setDetails] = useState("");
  const [sku, setSku] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!file) return alert("Select image");
      const token = localStorage.getItem("backendToken");
      await uploadBackendProduct({ productName, details, sku, file, token });
      alert("Product uploaded to backend");
      setProductName("");
      setDetails("");
      setSku("");
      setFile(null);
    } catch (err) {
      const msg = err?.response?.data?.message || "Upload failed";
      alert(msg);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Backend: Upload Product</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="border p-2 w-full" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
        <textarea className="border p-2 w-full" placeholder="Details" value={details} onChange={(e) => setDetails(e.target.value)} />
        <input className="border p-2 w-full" placeholder="SKU" value={sku} onChange={(e) => setSku(e.target.value)} />
        <input className="border p-2 w-full" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <button className="bg-black text-white px-4 py-2 rounded" type="submit">Upload</button>
      </form>
    </div>
  );
};

export default BackendAddProduct;


