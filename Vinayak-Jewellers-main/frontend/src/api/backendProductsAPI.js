import client from "./client";

export const listBackendProducts = async () => {
  const res = await client.get("/api/products");
  return res.data?.data || [];
};

export const getBackendProductById = async (id) => {
  const res = await client.get(`/api/products/${id}`);
  return res.data?.data;
};

export const uploadBackendProduct = async ({ productName, details, sku, collection, category, subcategory, file, files, token }) => {
  const form = new FormData();
  form.append("productName", productName);
  form.append("details", details);
  form.append("sku", sku);
  if (collection) form.append("collection", collection);
  if (category) form.append("category", category);
  if (subcategory) form.append("subcategory", subcategory);
  
  // Support both single file and multiple files
  if (files && files.length > 0) {
    // Multiple files
    files.forEach((f) => {
      form.append("image", f);
    });
  } else if (file) {
    // Single file (backward compatibility)
    form.append("image", file);
  }
  
  const res = await client.post("/api/products/upload", form, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  return res.data?.data;
};

export const deleteBackendProduct = async (id, token) => {
  const res = await client.delete(`/api/products/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
};

export const updateBackendProduct = async (id, { productName, details, sku, collection, category, subcategory, file, files }, token) => {
  const form = new FormData();
  if (productName !== undefined) form.append("productName", productName);
  if (details !== undefined) form.append("details", details);
  if (sku !== undefined) form.append("sku", sku);
  if (collection !== undefined) form.append("collection", collection);
  if (category !== undefined) form.append("category", category);
  if (subcategory !== undefined) form.append("subcategory", subcategory);
  
  // Support both single file and multiple files
  if (files && files.length > 0) {
    files.forEach((f) => {
      form.append("image", f);
    });
  } else if (file) {
    form.append("image", file);
  }
  
  const res = await client.put(`/api/products/${id}`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  return res.data?.data;
};


