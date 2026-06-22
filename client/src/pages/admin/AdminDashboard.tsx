import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  getAnalytics,
} from "../../services/adminService";

export default function AdminDashboard() {

  const navigate =
    useNavigate();

  const [analytics, setAnalytics] =
    useState<any>(null);

  useEffect(() => {

    const load =
      async () => {

        try {

          const data =
            await getAnalytics();

          setAnalytics(data);

        } catch (error) {

          console.error(error);

        }

      };

    load();

  }, []);

  if (!analytics) {

    return (
      <div className="p-6">
        Loading...
      </div>
    );

  }

  return (

    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      {/* Analytics Cards */}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

        <div className="bg-white p-6 rounded-xl shadow">

          <h3 className="text-gray-500">
            Total Users
          </h3>

          <p className="text-3xl font-bold">
            {analytics.totalUsers}
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <h3 className="text-gray-500">
            Total Sellers
          </h3>

          <p className="text-3xl font-bold">
            {analytics.totalSellers}
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <h3 className="text-gray-500">
            Total Products
          </h3>

          <p className="text-3xl font-bold">
            {analytics.totalProducts}
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <h3 className="text-gray-500">
            Total Orders
          </h3>

          <p className="text-3xl font-bold">
            {analytics.totalOrders}
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <h3 className="text-gray-500">
            Revenue
          </h3>

          <p className="text-3xl font-bold text-green-600">
            ₹
            {analytics.totalRevenue.toLocaleString()}
          </p>

        </div>

      </div>

      {/* Management Buttons */}

      <div className="flex flex-wrap gap-4 mt-8">

        <button
          onClick={() =>
            navigate(
              "/admin/users"
            )
          }
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
        >
          Manage Users
        </button>

        <button
          onClick={() =>
            navigate(
              "/admin/products"
            )
          }
          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
        >
          Manage Products
        </button>

        <button
          onClick={() =>
            navigate(
              "/admin/orders"
            )
          }
          className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700"
        >
          Manage Orders
        </button>

      </div>

    </div>

  );
}