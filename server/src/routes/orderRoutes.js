const express =
  require("express");

const router =
  express.Router();

const {
  placeOrder,
  getOrders,
  updateOrderStatus,
  getAllOrders,
  getSellerAnalytics,
} = require(
  "../controllers/orderController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const {
  authorize,
} = require(
  "../middleware/roleMiddleware"
);

// CUSTOMER ROUTES

router.post(
  "/place-order",
  protect,
  placeOrder
);

router.get(
  "/",
  protect,
  getOrders
);

// SELLER / ADMIN ROUTES

router.get(
  "/all",
  protect,
  authorize(
    "seller",
    "admin"
  ),
  getAllOrders
);

router.put(
  "/:id/status",
  protect,
  authorize(
    "seller",
    "admin"
  ),
  updateOrderStatus
);

router.get(
  "/seller/analytics",
  protect,
  authorize(
    "seller",
    "admin"
  ),
  getSellerAnalytics
);

module.exports =
  router;