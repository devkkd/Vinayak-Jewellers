import axios from 'axios';

const BASE_URL = "https://fakestoreapi.com";    // or your own backend

// Get all products
export const getAllProducts = async () => {
  const response = await axios.get(`${BASE_URL}/products/category/jewelery`);
    return response.data; // ✅ Directly returns an array
    
};

// Get single product by ID
export const getProductById = async (id) => {
  const response = await axios.get(`${BASE_URL}/products/${id}`);
  return response.data; // ✅ Works correctly
};
