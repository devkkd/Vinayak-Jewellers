import axios from "axios";

// Single place to control API base URL
export const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://vinayak-jewellers.onrender.com";

const client = axios.create({ baseURL: API_BASE });

export default client;


