const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

router.get("/profile", protect, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

router.get(
  "/seller-dashboard",
  protect,
  authorize("seller", "admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Seller Dashboard Access Granted",
    });
  }
);

router.get(
  "/admin-dashboard",
  protect,
  authorize("admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Admin Dashboard Access Granted",
    });
  }
);

module.exports = router;