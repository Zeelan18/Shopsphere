import {
  useEffect,
  useState,
} from "react";

import {
  getProducts,
  deleteProduct,
} from "../../services/adminService";

export default function AdminProducts() {

  const [products, setProducts] =
    useState<any[]>([]);

  const loadProducts =
    async () => {

      const data =
        await getProducts();

      setProducts(data);

    };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete =
    async (
      id: string
    ) => {

      if (
        !window.confirm(
          "Delete Product?"
        )
      )
        return;

      await deleteProduct(id);

      loadProducts();
    };

  return (

    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Products Management
      </h1>

      <table className="w-full bg-white rounded-xl shadow">

        <thead>

          <tr className="bg-slate-100">

            <th className="p-4">
              Product
            </th>

            <th className="p-4">
              Category
            </th>

            <th className="p-4">
              Price
            </th>

            <th className="p-4">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {products.map(
            (product) => (

              <tr
                key={product.id}
                className="border-t"
              >

                <td className="p-4">
                  {product.name}
                </td>

                <td className="p-4">
                  {product.category}
                </td>

                <td className="p-4">
                  ₹{product.price}
                </td>

                <td className="p-4">

                  <button
                    onClick={() =>
                      handleDelete(
                        product.id
                      )
                    }
                    className="text-red-600"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>
  );
}