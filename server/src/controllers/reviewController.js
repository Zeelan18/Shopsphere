const supabase =
  require("../config/supabase");

// ADD REVIEW

const addReview = async (
  req,
  res
) => {
  try {

    const {
      product_id,
      rating,
      review,
    } = req.body;

    const {
      data,
      error,
    } = await supabase
      .from("reviews")
      .insert([
        {
          product_id,
          user_id:
            req.user.id,
          rating,
          review,
        },
      ])
      .select();

    if (error)
      throw error;

    // UPDATE PRODUCT RATING

    const {
      data: reviews,
      error: reviewsError,
    } = await supabase
      .from("reviews")
      .select("rating")
      .eq(
        "product_id",
        product_id
      );

    if (reviewsError)
      throw reviewsError;

    const averageRating =
      reviews.reduce(
        (sum, review) =>
          sum + review.rating,
        0
      ) / reviews.length;

    await supabase
      .from("products")
      .update({
        rating: Number(
          averageRating.toFixed(1)
        ),
      })
      .eq(
        "id",
        product_id
      );

    res.status(201).json({
      success: true,
      review: data[0],
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message,
    });

  }
};

// GET PRODUCT REVIEWS

const getProductReviews =
  async (
    req,
    res
  ) => {
    try {

      const {
        productId,
      } = req.params;

      const {
        data,
        error,
      } = await supabase
        .from("reviews")
        .select(`
          *,
          users (
            name
          )
        `)
        .eq(
          "product_id",
          productId
        )
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

      if (error)
        throw error;

      res.json({
        success: true,
        reviews: data,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
  };

module.exports = {
  addReview,
  getProductReviews,
};