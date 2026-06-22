import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createProduct,
} from "../../services/sellerService";

export default function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      image_url: "",
    });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await createProduct({
        ...formData,
        price: Number(
          formData.price
        ),
        stock: Number(
          formData.stock
        ),
      });

      alert(
        "Product Created Successfully"
      );

      navigate("/seller");

    } catch (error) {
      console.error(error);

      alert(
        "Failed To Create Product"
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">

      <div className="bg-white rounded-2xl shadow p-8">

        <h1 className="text-3xl font-bold mb-6">
          Add Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            className="w-full border p-3 rounded-xl"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            className="w-full border p-3 rounded-xl"
            rows={4}
            value={
              formData.description
            }
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            className="w-full border p-3 rounded-xl"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            className="w-full border p-3 rounded-xl"
            value={formData.stock}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            className="w-full border p-3 rounded-xl"
            value={
              formData.category
            }
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="image_url"
            placeholder="Image URL"
            className="w-full border p-3 rounded-xl"
            value={
              formData.image_url
            }
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
          >
            Create Product
          </button>

        </form>

      </div>

    </div>
  );
}