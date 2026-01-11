
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
    gender: "female",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", form);
      if (res.data.success) {
        alert("Account created successfully!");
        navigate("/login");
      } else {
        alert(res.data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Signup error. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          Create an Account
        </h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="border rounded-lg w-full p-2 focus:ring focus:ring-blue-200"
            onChange={handleChange}
            required
          />

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

          <div className="grid grid-cols-2 gap-4">
            <select
              name="role"
              className="border p-2 rounded-lg"
              onChange={handleChange}
            >
              <option value="patient">Patient</option>
              
            </select>

            <select
              name="gender"
              className="border p-2 rounded-lg"
              onChange={handleChange}
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
