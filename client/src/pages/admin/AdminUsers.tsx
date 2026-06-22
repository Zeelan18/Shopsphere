import {
  useEffect,
  useState,
} from "react";

import {
  getUsers,
  deleteUser,
} from "../../services/adminService";

export default function AdminUsers() {

  const [users, setUsers] =
    useState<any[]>([]);

  const loadUsers =
    async () => {

      try {

        const data =
          await getUsers();

        setUsers(data);

      } catch (error) {

        console.error(error);

      }

    };

  useEffect(() => {

    loadUsers();

  }, []);

  const handleDelete =
    async (
      id: string
    ) => {

      if (
        !window.confirm(
          "Delete User?"
        )
      ) {
        return;
      }

      try {

        await deleteUser(id);

        alert(
          "User Deleted Successfully"
        );

        loadUsers();

      } catch (error: any) {

        console.error(error);

        alert(
          error?.response?.data
            ?.message ||
          "Failed To Delete User"
        );

      }

    };

  return (

    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Users Management
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="bg-slate-100">

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Role
              </th>

              <th className="p-4 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map(
              (user) => (

                <tr
                  key={user.id}
                  className="border-t"
                >

                  <td className="p-4">
                    {user.name}
                  </td>

                  <td className="p-4">
                    {user.email}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        user.role ===
                        "admin"
                          ? "bg-purple-100 text-purple-700"
                          : user.role ===
                            "seller"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role}
                    </span>

                  </td>

                  <td className="p-4">

                    {user.role !==
                    "admin" ? (

                      <button
                        onClick={() =>
                          handleDelete(
                            user.id
                          )
                        }
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>

                    ) : (

                      <span className="text-gray-400">
                        Protected
                      </span>

                    )}

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