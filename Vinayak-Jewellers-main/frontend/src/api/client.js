import axios from "axios";

// Single place to control API base URL
export const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const client = axios.create({ baseURL: API_BASE });

export default client;


