import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  getMyProducts,
  deleteProduct,
  getSellerAnalytics,
} from "../../services/sellerService";

import AnalyticsChart
from "../../components/seller/AnalyticsChart";

export default function SellerDashboard() {

  const navigate =
    useNavigate();

  const [products, setProducts] =
    useState<any[]>([]);

  const [analytics, setAnalytics] =
    useState({
      totalProducts: 0,
      totalOrders: 0,
      totalRevenue: 0,
    });

  const fetchProducts =
    async () => {
      try {

        const data =
          await getMyProducts();

        setProducts(data);

      } catch (error) {

        console.error(error);

      }
    };

  const fetchAnalytics =
    async () => {
      try {

        const data =
          await getSellerAnalytics();

        setAnalytics({
          totalProducts:
            data.totalProducts,
          totalOrders:
            data.totalOrders,
          totalRevenue:
            data.totalRevenue,
        });

      } catch (error) {

        console.error(error);

      }
    };

  useEffect(() => {

    fetchProducts();

    fetchAnalytics();

  }, []);

  const handleDelete =
    async (
      id: string
    ) => {

      if (
        !window.confirm(
          "Delete Product?"
        )
      ) {
        return;
      }

      try {

        await deleteProduct(id);

        alert(
          "Product Deleted Successfully"
        );

        fetchProducts();

        fetchAnalytics();

      } catch (error) {

        console.error(error);

        alert(
          "Failed To Delete Product"
        );

      }
    };

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <h1 className="text-3xl font-bold">
          Seller Dashboard
        </h1>

        <div className="flex gap-3">

          <button
            onClick={() =>
              navigate(
                "/seller/orders"
              )
            }
            className="bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700"
          >
            View Orders
          </button>

          <button
            onClick={() =>
              navigate(
                "/seller/add-product"
              )
            }
            className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700"
          >
            + Add Product
          </button>

        </div>

      </div>

      {/* Analytics */}
      <AnalyticsChart
        totalProducts={
            analytics.totalProducts
        }
        totalOrders={
            analytics.totalOrders
        }
        totalRevenue={
            analytics.totalRevenue
        }
       />

      <div className="grid md:grid-cols-3 gap-4 mb-8">

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-lg font-semibold">
            Total Products
          </h2>

          <p className="text-3xl font-bold text-blue-600">
            {
              analytics.totalProducts
            }
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-lg font-semibold">
            Total Orders
          </h2>

          <p className="text-3xl font-bold text-green-600">
            {
              analytics.totalOrders
            }
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-lg font-semibold">
            Total Revenue
          </h2>

          <p className="text-3xl font-bold text-purple-600">
            ₹
            {analytics.totalRevenue.toLocaleString()}
          </p>

        </div>

      </div>

      {/* Products Table */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">
                Product
              </th>

              <th className="p-4 text-left">
                Category
              </th>

              <th className="p-4 text-left">
                Price
              </th>

              <th className="p-4 text-left">
                Stock
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {products.length === 0 ? (

              <tr>

                <td
                  colSpan={5}
                  className="p-6 text-center text-gray-500"
                >
                  No Products Found
                </td>

              </tr>

            ) : (

              products.map(
                (product) => (

                  <tr
                    key={product.id}
                    className="border-t"
                  >

                    <td className="p-4">

                      <div className="flex items-center gap-3">

                        <img
                          src={
                            product.image_url
                          }
                          alt={
                            product.name
                          }
                          className="w-12 h-12 rounded-lg object-cover"
                        />

                        <span>
                          {
                            product.name
                          }
                        </span>

                      </div>

                    </td>

                    <td className="p-4">
                      {
                        product.category
                      }
                    </td>

                    <td className="p-4">
                      ₹
                      {
                        product.price
                      }
                    </td>

                    <td className="p-4">
                      {
                        product.stock
                      }
                    </td>

                    <td className="p-4">

                      <div className="flex gap-4">

                        <button
                          onClick={() =>
                            navigate(
                              `/seller/edit/${product.id}`
                            )
                          }
                          className="text-blue-500 hover:text-blue-700 font-medium"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              product.id
                            )
                          }
                          className="text-red-500 hover:text-red-700 font-medium"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}