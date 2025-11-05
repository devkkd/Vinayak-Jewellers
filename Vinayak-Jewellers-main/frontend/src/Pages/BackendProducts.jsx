import React, { useEffect, useState } from "react";
import { listBackendProducts } from "../api/backendProductsAPI";

const BackendProducts = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await listBackendProducts();
        setItems(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Backend Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p>No products.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((p) => (
            <div key={p._id} className="border rounded p-3">
              <img src={p.image} alt={p.productName} className="w-full h-40 object-cover" />
              <div className="mt-2 font-medium">{p.productName}</div>
              <div className="text-xs text-gray-600">SKU: {p.sku}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BackendProducts;


