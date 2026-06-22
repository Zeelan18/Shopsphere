const express =
  require("express");

const router =
  express.Router();

const {
  getAnalytics,
  getUsers,
  deleteUser,
  getProducts,
  deleteProduct,
  getOrders,
  updateOrderStatus,
} = require(
  "../controllers/adminController"
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

router.use(
  protect,
  authorize("admin")
);

router.get(
  "/analytics",
  getAnalytics
);

router.get(
  "/users",
  getUsers
);

router.delete(
  "/users/:id",
  deleteUser
);

router.get(
  "/products",
  getProducts
);

router.delete(
  "/products/:id",
  deleteProduct
);
router.get(
  "/orders",
  getOrders
);

router.put(
  "/orders/:id/status",
  updateOrderStatus
);

module.exports =
  router;