const express = require("express");
const router = express.Router();

const sendEmail =
  require("../utils/sendEmail");

router.get("/", async (req, res) => {
  try {

    await sendEmail(
      process.env.EMAIL_USER,
      "ShopSphere Test Email",
      "<h1>Email Working Successfully 🚀</h1>"
    );

    res.json({
      success: true,
      message: "Email Sent",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});

module.exports = router;