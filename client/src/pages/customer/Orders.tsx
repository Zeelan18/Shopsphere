import {
  useEffect,
  useState,
} from "react";

import {
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

import {
  getOrders,
} from "../../services/orderService";

export default function Orders() {

  const [orders, setOrders] =
    useState<any[]>([]);

  const getStatusColor =
    (status: string) => {

      switch (status) {

        case "Pending":
          return "bg-yellow-100 text-yellow-700";

        case "Processing":
          return "bg-blue-100 text-blue-700";

        case "Shipped":
          return "bg-purple-100 text-purple-700";

        case "Delivered":
          return "bg-green-100 text-green-700";

        case "Cancelled":
          return "bg-red-100 text-red-700";

        default:
          return "bg-gray-100 text-gray-700";
      }
    };

  const getStatusIcon =
    (status: string) => {

      switch (status) {

        case "Pending":
          return <Clock size={18} />;

        case "Processing":
          return <Package size={18} />;

        case "Shipped":
          return <Truck size={18} />;

        case "Delivered":
          return (
            <CheckCircle size={18} />
          );

        case "Cancelled":
          return (
            <XCircle size={18} />
          );

        default:
          return <Package size={18} />;
      }
    };

  useEffect(() => {

    const fetchOrders =
      async () => {

        try {

          const data =
            await getOrders();

          setOrders(data);

        } catch (error) {

          console.error(error);

        }

      };

    fetchOrders();

  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Orders
      </h1>

      {orders.length === 0 ? (

        <div className="bg-white p-8 rounded-xl shadow text-center">

          <h2 className="text-xl font-semibold">
            No Orders Found
          </h2>

        </div>

      ) : (

        <div className="space-y-5">

          {orders.map(
            (order) => (

              <div
                key={order.id}
                className="bg-white p-6 rounded-xl shadow border"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <p className="font-semibold">
                      Order ID
                    </p>

                    <p className="text-gray-500">
                      {order.id}
                    </p>

                  </div>

                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusIcon(
                      order.status
                    )}

                    {order.status}
                  </div>

                </div>

                <div className="mt-5 grid md:grid-cols-2 gap-4">

                  <div>

                    <p className="text-gray-500">
                      Total Amount
                    </p>

                    <p className="text-2xl font-bold text-blue-600">
                      ₹
                      {
                        order.total_amount
                      }
                    </p>

                  </div>

                  <div>

                    <p className="text-gray-500">
                      Ordered On
                    </p>

                    <p className="font-medium">
                      {new Date(
                        order.created_at
                      ).toLocaleString()}
                    </p>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      )}

    </div>
  );
}