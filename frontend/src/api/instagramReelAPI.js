import client from "./client.js";

const getAuthHeader = () => {
  const token = localStorage.getItem("adminToken") || localStorage.getItem("backendToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Public
export const getReels = () =>
  client.get("/api/instagram-reels").then((r) => r.data.data);

// Admin
export const getAllReels = () =>
  client.get("/api/instagram-reels/all", { headers: getAuthHeader() }).then((r) => r.data.data);

// data: { videoFile (File), thumbnailFile? (File) }
export const addReel = (data) => {
  const fd = new FormData();
  fd.append("video", data.videoFile);
  if (data.thumbnailFile) fd.append("thumbnail", data.thumbnailFile);
  return client.post("/api/instagram-reels", fd, {
    headers: { ...getAuthHeader(), "Content-Type": "multipart/form-data" },
  }).then((r) => r.data);
};

// data: { isActive?, videoFile?, thumbnailFile? }
export const updateReel = (id, data) => {
  const fd = new FormData();
  if (data.isActive !== undefined) fd.append("isActive", data.isActive);
  if (data.videoFile) fd.append("video", data.videoFile);
  if (data.thumbnailFile) fd.append("thumbnail", data.thumbnailFile);
  return client.put(`/api/instagram-reels/${id}`, fd, {
    headers: { ...getAuthHeader(), "Content-Type": "multipart/form-data" },
  }).then((r) => r.data);
};

export const deleteReel = (id) =>
  client.delete(`/api/instagram-reels/${id}`, { headers: getAuthHeader() }).then((r) => r.data);
