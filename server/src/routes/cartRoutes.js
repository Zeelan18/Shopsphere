const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  updateCartQuantity,
  removeCartItem,
} = require("../controllers/cartController");

const {
  protect,
} = require("../middleware/authMiddleware");

router.get("/", protect, getCart);

router.post("/", protect, addToCart);

router.put(
  "/:id",
  protect,
  updateCartQuantity
);

router.delete(
  "/:id",
  protect,
  removeCartItem
);

module.exports = router;