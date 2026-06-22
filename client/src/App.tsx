import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Cart from "./pages/customer/Cart";
import Orders from "./pages/customer/Orders";

import Home from "./pages/customer/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import SellerDashboard
from "./pages/seller/SellerDashboard";
import AddProduct from "./pages/seller/AddProduct";
import EditProduct from "./pages/seller/EditProduct";
import Wishlist from "./pages/customer/Wishlist";
import SellerOrders
from "./pages/seller/SellerOrders";
import ProductDetails
from "./pages/customer/ProductDetails";
import AdminDashboard
from "./pages/admin/AdminDashboard";
import AdminUsers
from "./pages/admin/AdminUsers";

import AdminProducts
from "./pages/admin/AdminProducts";
import AdminOrders
from "./pages/admin/AdminOrders";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        <Route
          path="/seller"
          element={
            <SellerDashboard />
          }
        />

        <Route
          path="/seller/edit/:id"
          element={<EditProduct />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/seller/add-product"
          element={<AddProduct />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/seller/orders"
          element={<SellerOrders />}
        />

        <Route
          path="/seller/orders"
          element={<SellerOrders />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/admin"
          element={
            <AdminDashboard />
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminUsers />
          }
        />

        <Route
          path="/admin/products"
          element={
            <AdminProducts />
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminOrders />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
