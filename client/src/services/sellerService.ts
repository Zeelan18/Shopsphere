import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getMyProducts = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API}/products/my-products`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.products;
};

export const createProduct = async (
  product: any
) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API}/products`,
    product,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteProduct = async (
  id: string
) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `${API}/products/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const updateProduct = async (
  id: string,
  product: any
) => {
  const token =
    localStorage.getItem("token");

  const response =
    await axios.put(
      `${API}/products/${id}`,
      product,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  return response.data;
};
export const getSellerAnalytics =
  async () => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.get(
        `${API}/orders/seller/analytics`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };