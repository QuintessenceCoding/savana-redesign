import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const API = axios.create({
  baseURL: baseURL,
});

// Fetch all products
export const fetchProducts = async () => {
  const response = await API.get("/products");
  return response.data;
};

// You can add all your other API functions here too
export const fetchProductById = async (id: string) => {
    const response = await API.get(`/products/${id}`);
    return response.data;
};

export const fetchRelatedProducts = async (id: string) => {
    const response = await API.get(`/products/${id}/related`);
    return response.data;
}