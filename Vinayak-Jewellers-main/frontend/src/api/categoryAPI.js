import client from "./client";

// Get all categories (optionally filtered by collection)
export const listCategories = async (collection = null) => {
  const url = collection ? `/api/categories?collection=${collection}` : "/api/categories";
  const res = await client.get(url);
  return res.data?.data || [];
};

// Get categories grouped by collection
export const getCategoriesByCollection = async () => {
  const res = await client.get("/api/categories/grouped");
  return res.data?.data || {};
};

// Create a new category (admin only)
export const createCategory = async ({ collection, category, subcategories }, token) => {
  const res = await client.post(
    "/api/categories",
    { collection, category, subcategories: subcategories || [] },
    { headers: token ? { Authorization: `Bearer ${token}` } : {} }
  );
  return res.data;
};

// Add subcategory to existing category (admin only)
export const addSubcategory = async (categoryId, subcategory, token) => {
  const res = await client.post(
    `/api/categories/${categoryId}/subcategory`,
    { subcategory },
    { headers: token ? { Authorization: `Bearer ${token}` } : {} }
  );
  return res.data;
};

// Update category (admin only)
export const updateCategory = async (categoryId, { category, subcategories }, token) => {
  const res = await client.put(
    `/api/categories/${categoryId}`,
    { category, subcategories },
    { headers: token ? { Authorization: `Bearer ${token}` } : {} }
  );
  return res.data;
};

// Delete category (admin only)
export const deleteCategory = async (categoryId, token) => {
  const res = await client.delete(`/api/categories/${categoryId}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
};

// Delete subcategory (admin only)
export const deleteSubcategory = async (categoryId, subcategory, token) => {
  const res = await client.delete(
    `/api/categories/${categoryId}/subcategory`,
    {
      data: { subcategory },
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }
  );
  return res.data;
};
