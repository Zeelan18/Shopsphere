const express =
  require("express");

const router =
  express.Router();

const {
  addToWishlist,
  getWishlist,
  removeWishlistItem,
} = require(
  "../controllers/wishlistController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

router.post(
  "/",
  protect,
  addToWishlist
);

router.get(
  "/",
  protect,
  getWishlist
);

router.delete(
  "/:id",
  protect,
  removeWishlistItem
);

module.exports = router;