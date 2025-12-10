import client from "./client";

// Get all menus (ordered)
export const listMenus = async () => {
  const res = await client.get("/api/menus");
  return res.data?.data || [];
};

// Get single menu by ID
export const getMenuById = async (id) => {
  const res = await client.get(`/api/menus/${id}`);
  return res.data?.data;
};

// Create a new menu item (admin only)
export const createMenu = async ({ name, link, icon, order, sub, nestedSub, hasNestedStructure }, token) => {
  const res = await client.post(
    "/api/menus",
    { name, link, icon, order: order || 0, sub: sub || [], nestedSub: nestedSub || [], hasNestedStructure: hasNestedStructure || false },
    { headers: token ? { Authorization: `Bearer ${token}` } : {} }
  );
  return res.data;
};

// Update menu item (admin only)
export const updateMenu = async (menuId, { name, link, icon, order, sub, nestedSub, hasNestedStructure }, token) => {
  const res = await client.put(
    `/api/menus/${menuId}`,
    { name, link, icon, order, sub, nestedSub, hasNestedStructure },
    { headers: token ? { Authorization: `Bearer ${token}` } : {} }
  );
  return res.data;
};

// Delete menu item (admin only)
export const deleteMenu = async (menuId, token) => {
  const res = await client.delete(`/api/menus/${menuId}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
};

// Add submenu item (admin only)
export const addSubmenuItem = async (menuId, { name, link }, token) => {
  const res = await client.post(
    `/api/menus/${menuId}/submenu`,
    { name, link },
    { headers: token ? { Authorization: `Bearer ${token}` } : {} }
  );
  return res.data;
};

// Update submenu item (admin only)
export const updateSubmenuItem = async (menuId, { index, name, link }, token) => {
  const res = await client.put(
    `/api/menus/${menuId}/submenu`,
    { index, name, link },
    { headers: token ? { Authorization: `Bearer ${token}` } : {} }
  );
  return res.data;
};

// Delete submenu item (admin only)
export const deleteSubmenuItem = async (menuId, { index }, token) => {
  const res = await client.delete(`/api/menus/${menuId}/submenu`, {
    data: { index },
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
};

// Add nested category (admin only)
export const addNestedCategory = async (menuId, { category, items }, token) => {
  const res = await client.post(
    `/api/menus/${menuId}/nested-category`,
    { category, items: items || [] },
    { headers: token ? { Authorization: `Bearer ${token}` } : {} }
  );
  return res.data;
};

// Add item to nested category (admin only)
export const addNestedCategoryItem = async (menuId, { categoryIndex, name, link }, token) => {
  const res = await client.post(
    `/api/menus/${menuId}/nested-category/item`,
    { categoryIndex, name, link },
    { headers: token ? { Authorization: `Bearer ${token}` } : {} }
  );
  return res.data;
};

// Delete nested category (admin only)
export const deleteNestedCategory = async (menuId, { categoryIndex }, token) => {
  const res = await client.delete(`/api/menus/${menuId}/nested-category`, {
    data: { categoryIndex },
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
};

// Delete item from nested category (admin only)
export const deleteNestedCategoryItem = async (menuId, { categoryIndex, itemIndex }, token) => {
  const res = await client.delete(`/api/menus/${menuId}/nested-category/item`, {
    data: { categoryIndex, itemIndex },
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
};


