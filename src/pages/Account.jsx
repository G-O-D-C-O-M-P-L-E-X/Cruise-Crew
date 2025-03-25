import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", email: "", password: "", role: "customer" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/signup';
    const body = isLogin ? { email: formData.email, password: formData.password } : formData;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error('Authentication failed');
      const data = await res.json();
      localStorage.setItem('token', data.token);
      const role = JSON.parse(atob(data.token.split('.')[1])).role;
      navigate(role === 'admin' ? '/admin' : '/customer');
    } catch (error) {
      console.error(error);
      alert('Authentication failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4">{isLogin ? "Login" : "Sign Up"}</h2>
        {!isLogin && (
          <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="w-full p-2 mb-2 border" />
        )}
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-2 mb-2 border" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full p-2 mb-2 border" />
        {!isLogin && (
          <select name="role" value={formData.role} onChange={handleChange} className="w-full p-2 mb-2 border">
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        )}
        <button type="submit" className="w-full bg-black text-white p-2 rounded">{isLogin ? "Login" : "Sign Up"}</button>
        <p className="mt-2 text-center">
          {isLogin ? "No account?" : "Have an account?"}
          <span className="text-blue-500 cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Sign up" : " Login"}
          </span>
        </p>
      </form>
    </div>
  );
}