import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icons for mobile menu
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = token ? JSON.parse(atob(token.split(".")[1])).role : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/account");
  };

  return (
    <nav className="bg-black text-white font-syne p-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          Cruise Crew
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          <Link to="/" className="font-bold p-2 hover:scale-110 transition-transform">
            BIKES
          </Link>
          <Link to="/accessories" className="font-bold p-2 hover:scale-110 transition-transform">
            ACCESSORIES
          </Link>
          <Link to="/cart" className="font-bold p-2 hover:scale-110 transition-transform">
            CART
          </Link>

          {/* Conditional Rendering Based on Role */}
          {token ? (
            <>
              {role === "customer" && (
                <Link to="/customer" className="font-bold p-2 hover:scale-110 transition-transform">
                  ACCOUNT
                </Link>
              )}
              {role === "admin" && (
                <Link to="/admin" className="font-bold p-2 hover:scale-110 transition-transform">
                  ADMIN
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-600 p-2 rounded hover:bg-red-700 transition"
              >
                LOGOUT
              </button>
            </>
          ) : (
            <Link to="/account" className="font-bold p-2 hover:scale-110 transition-transform">
              LOGIN/SIGNUP
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center mt-4 space-y-3 bg-gray-800 p-4 rounded-lg">
          <Link to="/" className="w-full text-center p-2 hover:bg-gray-700 rounded" onClick={() => setMenuOpen(false)}>
            BIKES
          </Link>
          <Link to="/accessories" className="w-full text-center p-2 hover:bg-gray-700 rounded" onClick={() => setMenuOpen(false)}>
            ACCESSORIES
          </Link>
          <Link to="/cart" className="w-full text-center p-2 hover:bg-gray-700 rounded" onClick={() => setMenuOpen(false)}>
            CART
          </Link>

          {token ? (
            <>
              {role === "customer" && (
                <Link to="/customer" className="w-full text-center p-2 hover:bg-gray-700 rounded" onClick={() => setMenuOpen(false)}>
                  ACCOUNT
                </Link>
              )}
              {role === "admin" && (
                <Link to="/admin" className="w-full text-center p-2 hover:bg-gray-700 rounded" onClick={() => setMenuOpen(false)}>
                  ADMIN
                </Link>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full bg-red-600 p-2 rounded hover:bg-red-700 transition"
              >
                LOGOUT
              </button>
            </>
          ) : (
            <Link to="/account" className="w-full text-center p-2 hover:bg-gray-700 rounded" onClick={() => setMenuOpen(false)}>
              LOGIN/SIGNUP
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
