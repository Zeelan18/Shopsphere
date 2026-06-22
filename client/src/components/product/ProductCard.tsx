import {
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";

import {
  addToWishlist,
} from "../../services/wishlistService";

import {
  addToCart,
} from "../../services/cartService";

import type { Product } from "../../types/product";

import {
  useNavigate,
} from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {

  const navigate =
    useNavigate();

  const handleAddToCart =
    async (
      e: React.MouseEvent
    ) => {

      e.stopPropagation();

      try {

        await addToCart(
          product.id
        );

        alert(
          "Product Added To Cart"
        );

      } catch (error) {

        console.error(error);

        alert(
          "Please Login First"
        );

      }
    };

  const handleWishlist =
    async (
      e: React.MouseEvent
    ) => {

      e.stopPropagation();

      try {

        await addToWishlist(
          product.id
        );

        alert(
          "Added To Wishlist"
        );

      } catch (error) {

        console.error(error);

        alert(
          "Please Login First"
        );

      }
    };

  return (

    <div
      onClick={() =>
        navigate(
          `/product/${product.id}`
        )
      }
      className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >

      <img
        src={product.image_url}
        alt={product.name}
        className="h-56 w-full object-cover"
        onError={(e) => {
          e.currentTarget.src =
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9";
        }}
      />

      <div className="p-4">

        <div className="flex justify-between items-center">

          <h3 className="font-semibold">
            {product.name}
          </h3>

          <button
            onClick={
              handleWishlist
            }
          >
            <Heart size={18} />
          </button>

        </div>

        <p className="text-sm text-gray-500 mt-2">
          {product.category}
        </p>

        <div className="flex items-center justify-between mt-3">

          <p className="text-blue-600 font-bold text-xl">
            ₹{product.price}
          </p>

          <div className="flex items-center gap-1">

            <Star
              size={16}
              fill="currentColor"
              className="text-yellow-500"
            />

            <span className="text-sm font-medium">
              {product.rating
                ? Number(
                    product.rating
                  ).toFixed(1)
                : "0.0"}
            </span>

          </div>

        </div>

        <button
          onClick={
            handleAddToCart
          }
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700"
        >
          <ShoppingCart size={18} />
          Add To Cart
        </button>

      </div>

    </div>

  );
}