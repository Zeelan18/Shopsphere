import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const loginUser = async (
  email: string,
  password: string
) => {
  const response = await axios.post(
    `${API}/auth/login`,
    {
      email,
      password,
    }
  );

  return response.data;
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: string
) => {
  const response = await axios.post(
    `${API}/auth/register`,
    {
      name,
      email,
      password,
      role,
    }
  );

  return response.data;
};