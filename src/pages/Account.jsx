import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", email: "", password: "", role: "customer" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? "http://localhost:5000/api/auth/login" : "http://localhost:5000/api/auth/signup";
    const body = isLogin ? { email: formData.email, password: formData.password } : formData;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Authentication failed");
      const data = await res.json();
      localStorage.setItem("token", data.token);
      const role = JSON.parse(atob(data.token.split(".")[1])).role;
      navigate(role === "admin" ? "/admin" : "/customer");
    } catch (error) {
      console.error(error);
      alert("Authentication failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-400">
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-90 text-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">
          {isLogin ? "Welcome Back! " : "Signup to be a member"}
        </h2>

        {!isLogin && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full p-2 bg-orange-100 border border-orange-300 rounded-lg focus:ring focus:ring-orange-400 outline-none"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full p-2 bg-orange-100 border border-orange-300 rounded-lg focus:ring focus:ring-orange-400 outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full p-2 bg-orange-100 border border-orange-300 rounded-lg focus:ring focus:ring-orange-400 outline-none"
          />
        </div>

        {!isLogin && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 bg-orange-100 border border-orange-300 rounded-lg focus:ring focus:ring-orange-400 outline-none"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 transition p-2 rounded-lg text-white font-semibold shadow-md"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="mt-4 text-center text-gray-700">
          {isLogin ? "New here?" : "Already a member?"}
          <span
            className="text-orange-600 cursor-pointer font-semibold hover:underline ml-1"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? " Sign up!" : " Login!"}
          </span>
        </p>
      </form>
    </div>
  );
}
