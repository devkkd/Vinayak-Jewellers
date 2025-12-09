import client from "./client";

export const submitEnquiry = async ({ name, phone, productId, productName, productImage }) => {
  const res = await client.post("/api/enquiries", { name, phone, productId, productName, productImage });
  return res.data;
};

export const listEnquiries = async (token) => {
  const res = await client.get("/api/enquiries", { headers: token ? { Authorization: `Bearer ${token}` } : {} });
  return res.data?.data || [];
};


