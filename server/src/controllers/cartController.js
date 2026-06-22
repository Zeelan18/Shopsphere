const supabase = require("../config/supabase");

const addToCart = async (req, res) => {
  try {
    console.log("ADD CART USER:", req.user.id);

    const { product_id, quantity } = req.body;

    const { data, error } = await supabase
      .from("cart_items")
      .insert([
        {
          user_id: req.user.id,
          product_id,
          quantity,
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json({
      success: true,
      cartItem: data[0],
    });
  } catch (error) {
    console.error("ADD CART ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCart = async (req, res) => {
  try {
    const { data: cartItems, error } =
      await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", req.user.id);

    if (error) throw error;

    const cart = [];

    for (const item of cartItems) {
      const {
        data: product,
      } = await supabase
        .from("products")
        .select(
          "id,name,price,image_url,category"
        )
        .eq(
          "id",
          item.product_id
        )
        .single();

      cart.push({
        ...item,
        products: product,
      });
    }

    res.json({
      success: true,
      cart,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCartQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const { data, error } = await supabase
      .from("cart_items")
      .update({ quantity })
      .eq("id", id)
      .select();

    if (error) throw error;

    res.json({
      success: true,
      cartItem: data[0],
    });
  } catch (error) {
    console.error("UPDATE CART ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.json({
      success: true,
      message: "Item Removed",
    });
  } catch (error) {
    console.error("DELETE CART ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartQuantity,
  removeCartItem,
};