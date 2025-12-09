import client from "./client";

export const backendLogin = async ({ email, password }) => {
  const res = await client.post("/api/auth/login", { email, password });
  return res.data; // { success, token, user }
};


