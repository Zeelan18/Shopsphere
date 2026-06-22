import axios from "axios";

const API =
  import.meta.env.VITE_API_URL;

export const addReview =
  async (
    product_id: string,
    rating: number,
    review: string
  ) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.post(
        `${API}/reviews`,
        {
          product_id,
          rating,
          review,
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

export const getReviews =
  async (
    productId: string
  ) => {

    const response =
      await axios.get(
        `${API}/reviews/${productId}`
      );

    return response.data.reviews;
  };