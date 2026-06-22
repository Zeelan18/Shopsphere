const supabase = require("../config/supabase");

// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      category,
      image_url,
    } = req.body;

    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          seller_id: req.user.id,
          name,
          description,
          price,
          stock,
          category,
          image_url,
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: data[0],
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL PRODUCTS
const getProducts = async (req, res) => {
  try {
    const { data, error } =
      await supabase
        .from("products")
        .select("*");

    if (error) throw error;

    res.json({
      success: true,
      products: data,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET MY PRODUCTS
const getMyProducts = async (
  req,
  res
) => {
  try {
    const { data, error } =
      await supabase
        .from("products")
        .select("*")
        .eq(
          "seller_id",
          req.user.id
        );

    if (error) throw error;

    res.json({
      success: true,
      products: data,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE PRODUCT
const updateProduct = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const {
      data,
      error,
    } = await supabase
      .from("products")
      .update(req.body)
      .eq("id", id)
      .eq(
        "seller_id",
        req.user.id
      )
      .select();

    if (error) throw error;

    res.json({
      success: true,
      product: data[0],
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE PRODUCT
const deleteProduct = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const { error } =
      await supabase
        .from("products")
        .delete()
        .eq("id", id)
        .eq(
          "seller_id",
          req.user.id
        );

    if (error) throw error;

    res.json({
      success: true,
      message:
        "Product deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getMyProducts,
  updateProduct,
  deleteProduct,
};