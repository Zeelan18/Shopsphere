import { useEffect, useState } from "react";

import {
  getCart,
  updateCartItem,
  removeCartItem,
} from "../../services/cartService";

import { placeOrder } from "../../services/orderService";

import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);
    
  const [ordering, setOrdering] =
    useState(false);

  const refreshCart = async () => {
    try {
      const data = await getCart();
      setCartItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  const increaseQuantity = async (
    id: string,
    qty: number
  ) => {
    try {
      await updateCartItem(
        id,
        qty + 1
      );

      refreshCart();
    } catch (error) {
      console.error(error);
    }
  };

  const decreaseQuantity = async (
    id: string,
    qty: number
  ) => {
    try {
      if (qty <= 1) return;

      await updateCartItem(
        id,
        qty - 1
      );

      refreshCart();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (
    id: string
  ) => {
    try {
      await removeCartItem(id);

      refreshCart();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckout =
  async () => {
    try {
      const response =
        await placeOrder();

      alert(
        response.message
      );

      await refreshCart();

      navigate("/orders");

    } catch (error: any) {

      alert(
        error.response?.data
          ?.message ||
          "Checkout Failed"
      );

      console.error(error);
    }
  };
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();

        setCartItems(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const totalAmount = cartItems.reduce(
    (sum, item) =>
      sum +
      (item.products?.price || 0) *
        item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Shopping Cart
      </h1>

      {loading ? (
        <p>Loading Cart...</p>
      ) : cartItems.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow">
          <h2 className="text-xl font-semibold">
            Your Cart Is Empty
          </h2>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Cart Items */}

          <div className="lg:col-span-2 space-y-4">

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl shadow flex gap-4"
              >

                <img
                  src={
                    item.products?.image_url
                  }
                  alt={
                    item.products?.name
                  }
                  className="w-28 h-28 object-cover rounded-lg"
                />

                <div className="flex-1">

                  <h2 className="font-bold text-lg">
                    {item.products?.name}
                  </h2>

                  <p className="text-gray-500">
                    {item.products?.category}
                  </p>

                  <p className="text-blue-600 text-xl font-bold mt-2">
                    ₹{item.products?.price}
                  </p>

                  {/* Quantity Controls */}

                  <div className="flex items-center gap-3 mt-3">

                    <button
                      onClick={() =>
                        decreaseQuantity(
                          item.id,
                          item.quantity
                        )
                      }
                      className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                    >
                      -
                    </button>

                    <span className="font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.id,
                          item.quantity
                        )
                      }
                      className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                    >
                      +
                    </button>

                  </div>

                  {/* Remove Button */}

                  <button
                    onClick={() =>
                      deleteItem(item.id)
                    }
                    className="mt-3 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>

                </div>

              </div>
            ))}

          </div>

          {/* Order Summary */}

          <div>

            <div className="bg-white p-6 rounded-xl shadow sticky top-20">

              <h2 className="text-xl font-bold mb-4">
                Order Summary
              </h2>

              <div className="flex justify-between mb-2">
                <span>Items</span>
                <span>{cartItems.length}</span>
              </div>

              <div className="flex justify-between mb-4">
                <span>Total</span>

                <span className="font-bold text-xl">
                  ₹{totalAmount}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
              >
                Proceed To Checkout
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}