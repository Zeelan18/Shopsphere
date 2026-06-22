import {
  useEffect,
  useState,
} from "react";

import {
  getOrders,
  updateOrderStatus,
} from "../../services/adminService";

export default function AdminOrders() {

  const [orders, setOrders] =
    useState<any[]>([]);

  const loadOrders =
    async () => {

      try {

        const data =
          await getOrders();

        setOrders(data);

      } catch (error) {

        console.error(error);

      }

    };

  useEffect(() => {

    loadOrders();

  }, []);

  const handleStatusChange =
    async (
      id: string,
      status: string
    ) => {

      try {

        await updateOrderStatus(
          id,
          status
        );

        loadOrders();

      } catch (error) {

        console.error(error);

        alert(
          "Failed To Update Status"
        );

      }

    };

  return (

    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Orders Management
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">
                Customer
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Amount
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Update
              </th>

            </tr>

          </thead>

          <tbody>

            {orders.map(
              (order) => (

                <tr
                  key={order.id}
                  className="border-t"
                >

                  <td className="p-4">
                    {
                      order.users
                        ?.name
                    }
                  </td>

                  <td className="p-4">
                    {
                      order.users
                        ?.email
                    }
                  </td>

                  <td className="p-4">
                    ₹
                    {
                      order.total_amount
                    }
                  </td>

                  <td className="p-4">
                    {
                      order.status
                    }
                  </td>

                  <td className="p-4">

                    <select
                      value={
                        order.status
                      }
                      onChange={(
                        e
                      ) =>
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
            )}

          </tbody>

        </table>

      </div>

    </div>

  );
}