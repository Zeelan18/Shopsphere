import { useEffect, useState } from "react";

import {
  getWishlist,
  removeWishlistItem,
} from "../../services/wishlistService";

export default function Wishlist() {
  const [wishlist, setWishlist] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const fetchWishlist =
    async () => {
      try {
        const data =
          await getWishlist();

        setWishlist(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove =
    async (id: string) => {
      try {
        await removeWishlistItem(id);

        fetchWishlist();
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Wishlist ❤️
      </h1>

      {loading ? (
        <p>Loading Wishlist...</p>
      ) : wishlist.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow">
          <h2 className="text-xl font-semibold">
            Wishlist Is Empty
          </h2>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">

          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow p-4"
            >

              <img
                src={
                  item.products?.image_url
                }
                alt={
                  item.products?.name
                }
                className="h-48 w-full object-cover rounded-lg"
              />

              <h2 className="font-bold text-lg mt-3">
                {item.products?.name}
              </h2>

              <p className="text-gray-500">
                {item.products?.category}
              </p>

              <p className="text-blue-600 font-bold text-xl mt-2">
                ₹{item.products?.price}
              </p>

              <button
                onClick={() =>
                  handleRemove(
                    item.id
                  )
                }
                className="mt-4 w-full bg-red-500 text-white py-2 rounded-xl"
              >
                Remove
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}