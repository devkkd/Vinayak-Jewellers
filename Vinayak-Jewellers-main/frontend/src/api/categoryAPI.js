import axios from 'axios';

const BASE_URL = "https://dummyjson.com";

// Fetch all categories
export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products/categories`);
    return response.data; // returns array of category strings
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// Fetch products by category
export const getProductsByCategory = async (category) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/category/${category}`);
    return response.data.products; // returns array of products
  } catch (error) {
    console.error("Error fetching products for category:", category, error);
    return [];
  }
};
