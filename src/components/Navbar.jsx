import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = token ? JSON.parse(atob(token.split('.')[1])).role : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/account');
  };

  return (
    <nav className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-2xl font-bold">Cruise Crew</Link>
        <div>
          <Link to="/" className="mr-4">Bikes</Link>
          <Link to="/cart" className="mr-4">Cart</Link>
          {token ? (
            <>
              {role === 'customer' && <Link to="/customer" className="mr-4">Account</Link>}
              {role === 'admin' && <Link to="/admin" className="mr-4">Admin</Link>}
              <button onClick={handleLogout} className="bg-red-600 p-2 rounded">Logout</button>
            </>
          ) : (
            <Link to="/account">Login/Signup</Link>
          )}
        </div>
      </div>
    </nav>
  );
}