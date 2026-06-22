import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const addToCart = async (
  productId: string
) => {
  const token =
    localStorage.getItem("token");

  const response = await axios.post(
    `${API}/cart`,
    {
      product_id: productId,
      quantity: 1,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const getCartCount = async () => {
  const token =
    localStorage.getItem("token");

  const response = await axios.get(
    `${API}/cart`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.cart.length;
};

export const getCart = async () => {
  const token =
    localStorage.getItem("token");

  const response = await axios.get(
    `${API}/cart`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.cart;
};
export const updateCartItem = async (
  id: string,
  quantity: number
) => {
  const token =
    localStorage.getItem("token");

  const response = await axios.put(
    `${API}/cart/${id}`,
    { quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const removeCartItem =
  async (id: string) => {
    const token =
      localStorage.getItem("token");

    const response =
      await axios.delete(
        `${API}/cart/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};