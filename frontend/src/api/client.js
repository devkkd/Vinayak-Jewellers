import axios from "axios";

// Single place to control API base URL
// Check if we're in production (deployed) or development
const isProduction = window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1";
const defaultURL = isProduction 
  ? "https://vinayak-jewellers-1.onrender.com"  // Your live backend URL
  : "http://localhost:5000";  // Local development

export const API_BASE = import.meta.env.VITE_API_BASE_URL || defaultURL;

const client = axios.create({ baseURL: API_BASE });

export default client;


