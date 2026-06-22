import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  updateProduct,
} from "../../services/sellerService";

export default function EditProduct() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [name, setName] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [stock, setStock] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await updateProduct(id!, {
        name,
        price: Number(price),
        stock: Number(stock),
      });

      alert(
        "Product Updated Successfully"
      );

      navigate("/seller");

    } catch (error) {
      console.error(error);

      alert(
        "Update Failed"
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">

      <div className="bg-white p-8 rounded-2xl shadow">

        <h1 className="text-3xl font-bold mb-6">
          Edit Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) =>
              setStock(e.target.value)
            }
            className="w-full border p-3 rounded-xl"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl"
          >
            Update Product
          </button>

        </form>

      </div>

    </div>
  );
}