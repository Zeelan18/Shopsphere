import axios from "axios";

const API =
  import.meta.env.VITE_API_URL;

const getToken = () =>
  localStorage.getItem("token");

export const getAnalytics =
  async () => {

    const response =
      await axios.get(
        `${API}/admin/analytics`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };

export const getUsers =
  async () => {

    const response =
      await axios.get(
        `${API}/admin/users`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };

export const deleteUser =
  async (
    id: string
  ) => {

    const response =
      await axios.delete(
        `${API}/admin/users/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };

export const getProducts =
  async () => {

    const response =
      await axios.get(
        `${API}/admin/products`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };

export const deleteProduct =
  async (
    id: string
  ) => {

    const response =
      await axios.delete(
        `${API}/admin/products/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };
export const getOrders =
  async () => {

    const response =
      await axios.get(
        `${API}/admin/orders`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };

export const updateOrderStatus =
  async (
    id: string,
    status: string
  ) => {

    const response =
      await axios.put(
        `${API}/admin/orders/${id}/status`,
        { status },
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };