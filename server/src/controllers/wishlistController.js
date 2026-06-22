const supabase = require("../config/supabase");

// ADD TO WISHLIST
const addToWishlist = async (
  req,
  res
) => {
  try {
    const { product_id } =
      req.body;

    const { data, error } =
      await supabase
        .from("wishlist_items")
        .insert([
          {
            user_id:
              req.user.id,
            product_id,
          },
        ])
        .select();

    if (error) throw error;

    res.status(201).json({
      success: true,
      wishlistItem: data[0],
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET WISHLIST
const getWishlist = async (
  req,
  res
) => {
  try {
    const { data, error } =
      await supabase
        .from("wishlist_items")
        .select(`
          *,
          products (
            id,
            name,
            price,
            image_url,
            category
          )
        `)
        .eq(
          "user_id",
          req.user.id
        );

    if (error) throw error;

    res.json({
      success: true,
      wishlist: data,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// REMOVE WISHLIST ITEM
const removeWishlistItem =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      const { error } =
        await supabase
          .from(
            "wishlist_items"
          )
          .delete()
          .eq("id", id);

      if (error) throw error;

      res.json({
        success: true,
        message:
          "Removed From Wishlist",
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
  addToWishlist,
  getWishlist,
  removeWishlistItem,
};