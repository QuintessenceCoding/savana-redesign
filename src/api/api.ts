import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // backend base URL
});

// Fetch all products
export const fetchProducts = async () => {
  const response = await API.get("/products");
  return response.data;
};
