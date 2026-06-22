import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getProducts = async () => {
  try {
    console.log("API URL:", API);

    const response = await axios.get(
      `${API}/products`
    );

    console.log("Full Response:", response.data);

    return response.data.products;
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};