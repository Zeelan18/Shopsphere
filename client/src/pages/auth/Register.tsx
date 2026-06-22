import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] =
    useState("customer");

  const handleRegister = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await registerUser(
        name,
        email,
        password,
        role
      );

      navigate("/login");
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-lg w-[400px]"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Register
        </h1>

        <input
          placeholder="Name"
          className="w-full border p-3 rounded-xl mb-4"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-xl mb-4"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-xl mb-4"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <select
          className="w-full border p-3 rounded-xl mb-4"
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
        >
          <option value="customer">
            Customer
          </option>

          <option value="seller">
            Seller
          </option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>

    </div>
  );
}