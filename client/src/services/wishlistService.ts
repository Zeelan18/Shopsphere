import axios from "axios";

const API =
  import.meta.env.VITE_API_URL;

export const addToWishlist =
  async (
    productId: string
  ) => {
    const token =
      localStorage.getItem("token");

    const response =
      await axios.post(
        `${API}/wishlist`,
        {
          product_id:
            productId,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const getWishlist =
  async () => {
    const token =
      localStorage.getItem("token");

    const response =
      await axios.get(
        `${API}/wishlist`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data.wishlist;
  };

export const removeWishlistItem =
  async (
    id: string
  ) => {
    const token =
      localStorage.getItem("token");

    const response =
      await axios.delete(
        `${API}/wishlist/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };
export const getWishlistCount =
  async () => {
    const token =
      localStorage.getItem("token");

    const response =
      await axios.get(
        `${API}/wishlist`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data.wishlist.length;
  };