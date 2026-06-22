const express =
  require("express");

const router =
  express.Router();

const {
  addReview,
  getProductReviews,
} = require(
  "../controllers/reviewController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

// DEBUG

console.log(
  "addReview:",
  typeof addReview
);

console.log(
  "getProductReviews:",
  typeof getProductReviews
);

console.log(
  "protect:",
  typeof protect
);

router.post(
  "/",
  protect,
  addReview
);

router.get(
  "/:productId",
  getProductReviews
);

module.exports =
  router;