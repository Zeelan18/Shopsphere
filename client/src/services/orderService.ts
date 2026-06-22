import axios from "axios";

const API =
  import.meta.env.VITE_API_URL;

// CUSTOMER

export const getOrders =
  async () => {
    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.get(
        `${API}/orders`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data.orders;
  };

export const placeOrder =
  async () => {
    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.post(
        `${API}/orders/place-order`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

// SELLER

export const getAllOrders =
  async () => {
    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.get(
        `${API}/orders/all`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data.orders;
  };

export const updateOrderStatus =
  async (
    id: string,
    status: string
  ) => {
    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.put(
        `${API}/orders/${id}/status`,
        { status },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };