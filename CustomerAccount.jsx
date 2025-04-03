import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CustomerAccount() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/account');
    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/orders', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch orders');
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, [navigate]);

  return (
    <div className="p-4">
      <h2 className="text-3xl mb-4">Customer Account</h2>
      <h3 className="text-xl mb-2">Order History</h3>
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order._id} className="mb-2">
              Order #{order._id} - {order.status} - Rs. {order.total}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}