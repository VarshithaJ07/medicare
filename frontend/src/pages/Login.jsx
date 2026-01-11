
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      if (res.data.success) {
        login(res.data.user);
        alert("Login successful!");
        navigate("/doctors"); // redirect to doctor page
      } else {
        alert(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Login error. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          Login to Your Account
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="border rounded-lg w-full p-2 focus:ring focus:ring-blue-200"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border rounded-lg w-full p-2 focus:ring focus:ring-blue-200"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
