import {
  ShoppingCart,
  User,
  Heart,
  Search,
  Store,
  LogOut,
  Package,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  getWishlistCount,
} from "../../services/wishlistService";

import {
  getCartCount,
} from "../../services/cartService";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const [wishlistCount,
    setWishlistCount] =
    useState(0);

  const [cartCount,
    setCartCount] =
    useState(0);

  useEffect(() => {
    const loadCounts =
      async () => {
        try {
          const wishlist =
            await getWishlistCount();

          const cart =
            await getCartCount();

          setWishlistCount(
            wishlist
          );

          setCartCount(cart);

        } catch (error) {
          console.error(error);
        }
      };

    if (
      localStorage.getItem(
        "token"
      )
    ) {
      loadCounts();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-6">

        {/* Logo */}

        <div>
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-blue-600 cursor-pointer"
          >
            ShopSphere
          </h1>
        </div>

        {/* Search */}

        <div className="flex-1 relative">

          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search products, brands and categories..."
            className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Menu */}

        <div className="flex items-center gap-6">

          {/* Seller */}

          <button
            onClick={() =>
              navigate("/seller")
            }
            className="hidden md:flex items-center gap-2 font-medium hover:text-blue-600"
          >
            <Store size={18} />
            Seller
          </button>

          {/* Orders */}

          {user && (
            <button
              onClick={() =>
                navigate("/orders")
              }
              className="hidden md:flex items-center gap-2 font-medium hover:text-blue-600"
            >
              <Package size={18} />
              Orders
            </button>
          )}

          {/* Wishlist */}

          <button
            onClick={() =>
              navigate("/wishlist")
            }
            className="relative"
          >
            <Heart size={22} />

            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
              {wishlistCount}
            </span>
          </button>

          {/* Cart */}

          <button
            className="relative"
            onClick={() =>
              navigate("/cart")
            }
          >
            <ShoppingCart size={22} />

            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
              {cartCount}
            </span>
          </button>

          {/* User Section */}

          {user ? (
            <div className="flex items-center gap-3">

              <div className="flex items-center gap-2">

                <User size={22} />

                <span className="font-medium">
                  {user.name}
                </span>

              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-red-500 hover:text-red-600"
              >
                <LogOut size={18} />
                Logout
              </button>

            </div>
          ) : (
            <button
              onClick={() =>
                navigate("/login")
              }
              className="flex items-center gap-2"
            >
              <User size={22} />
              Login
            </button>
          )}

        </div>

      </div>

    </nav>
  );
}