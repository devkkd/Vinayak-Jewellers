import React, { useEffect, useState } from "react";
import { listEnquiries } from "../../api/enquiryAPI";

const ManageEnquiries = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem("adminToken") || localStorage.getItem("backendToken");
      const data = await listEnquiries(token);
      setRows(data);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#5C1D02] mb-4">
        Manage Enquiries
      </h2>
      {loading ? (
        <p className="text-[#3B1C0A]">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="text-[#3B1C0A]">No enquiries yet.</p>
      ) : (
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-[#FFF4DC]">
              <tr>
                <th className="px-3 py-2 text-left">When</th>
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-left">Phone</th>
                <th className="px-3 py-2 text-left">Product</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r._id} className="border-t">
                  <td className="px-3 py-2">{new Date(r.createdAt).toLocaleString()}</td>
                  <td className="px-3 py-2">{r.name}</td>
                  <td className="px-3 py-2">{r.phone}</td>
                  <td className="px-3 py-2">{r.productName || r.productId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageEnquiries;
