import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json", // ✅ add karo
  },
});

const login = async ({ email, password }) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

const register = async ({ username, email, password }) => {
  const response = await api.post("/auth/register", {
    username,
    email,
    password,
  });
  return response.data;
};

const getme = async () => {
  const response = await api.get("/auth/getme");
  return response.data;
};

export { login, register, getme };
