const express = require("express");

const router = express.Router();

const {
  createProduct,
  getProducts,
  getMyProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  authorize,
} = require("../middleware/roleMiddleware");

// Public
router.get("/", getProducts);

// Seller
router.get(
  "/my-products",
  protect,
  authorize(
    "seller",
    "admin"
  ),
  getMyProducts
);

router.post(
  "/",
  protect,
  authorize(
    "seller",
    "admin"
  ),
  createProduct
);

router.put(
  "/:id",
  protect,
  authorize(
    "seller",
    "admin"
  ),
  updateProduct
);

router.delete(
  "/:id",
  protect,
  authorize(
    "seller",
    "admin"
  ),
  deleteProduct
);

module.exports = router;