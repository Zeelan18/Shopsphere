const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const productRoutes = require("./src/routes/productRoutes");
const app = express();
const cartRoutes =
require("./src/routes/cartRoutes");
const orderRoutes =
require("./src/routes/orderRoutes");
const wishlistRoutes =
  require(
    "./src/routes/wishlistRoutes"
  );
const testEmailRoutes =
  require("./src/routes/testEmailRoutes");
const reviewRoutes =
  require(
    "./src/routes/reviewRoutes"
  );
const adminRoutes =
  require(
    "./src/routes/adminRoutes"
  );

app.use(cors());
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.use("/api/auth", authRoutes);
app.use(
  "/api/orders",
  orderRoutes
);
app.use(
  "/api/wishlist",
  wishlistRoutes
);
app.use(
  "/api/test-email",
  testEmailRoutes
);
app.use(
  "/api/reviews",
  reviewRoutes
);
app.use(
  "/api/admin",
  adminRoutes
);

app.get("/", (req, res) => {
  res.json({
    message: "ShopSphere API Running"
  });
});
app.get("/test-user", (req, res) => {
  res.json({
    success: true,
    message: "User route test"
  });
});

const PORT = process.env.PORT || 5000;
console.log("SUPABASE_URL:", process.env.SUPABASE_URL);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
