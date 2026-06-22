import {
  useEffect,
  useState,
} from "react";

import {
  getAllOrders,
  updateOrderStatus,
} from "../../services/orderService";

export default function SellerOrders() {

  const [orders, setOrders] =
    useState<any[]>([]);

  const fetchOrders =
    async () => {
      try {

        const data =
          await getAllOrders();

        setOrders(data);

      } catch (error) {

        console.error(error);

      }
    };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange =
    async (
      orderId: string,
      status: string
    ) => {

      try {

        await updateOrderStatus(
          orderId,
          status
        );

        alert(
          "Order Status Updated"
        );

        fetchOrders();

      } catch (error) {

        console.error(error);

        alert(
          "Failed To Update Status"
        );

      }
    };

  const getStatusColor =
    (status: string) => {

      switch (status) {

        case "Pending":
          return "text-yellow-600";

        case "Processing":
          return "text-blue-600";

        case "Shipped":
          return "text-purple-600";

        case "Delivered":
          return "text-green-600";

        case "Cancelled":
          return "text-red-600";

        default:
          return "text-gray-600";
      }
    };

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Seller Orders
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">
                Order ID
              </th>

              <th className="p-4 text-left">
                Amount
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Change Status
              </th>

            </tr>

          </thead>

          <tbody>

            {orders.length === 0 ? (

              <tr>

                <td
                  colSpan={4}
                  className="p-6 text-center"
                >
                  No Orders Found
                </td>

              </tr>

            ) : (

              orders.map(
                (order) => (

                  <tr
                    key={order.id}
                    className="border-t"
                  >

                    <td className="p-4">
                      {order.id.slice(
                        0,
                        8
                      )}
                    </td>

                    <td className="p-4">
                      ₹
                      {order.total_amount}
                    </td>

                    <td
                      className={`p-4 font-semibold ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </td>

                    <td className="p-4">

                      <select
                        value={
                          order.status
                        }
                        onChange={(e) =>
                          handleStatusChange(
                            order.id,
                            e.target.value
                          )
                        }
                        className="border rounded-lg px-3 py-2"
                      >

                        <option>
                          Pending
                        </option>

                        <option>
                          Processing
                        </option>

                        <option>
                          Shipped
                        </option>

                        <option>
                          Delivered
                        </option>

                        <option>
                          Cancelled
                        </option>

                      </select>

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