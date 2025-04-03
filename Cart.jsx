import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to view cart.');
        navigate('/account');
        return;
      }
      try {
        const res = await fetch('http://localhost:5000/api/cart', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch cart');
        const data = await res.json();
        setCart(data);
      } catch (error) {
        console.error(error);
        alert('Error fetching cart: ' + error.message);
      }
    };
    fetchCart();
  }, [navigate]);

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    alert('Processing checkout...');
    try {
      const res = await fetch('http://localhost:5000/api/orders/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({})
      });
      if (!res.ok) throw new Error('Checkout failed');
      setCart({ items: [] });
      alert('Order placed successfully!');
    } catch (error) {
      console.error(error);
      alert('Checkout failed: ' + error.message);
    }
  };

  if (!cart) return <p>Loading...</p>;

  const total = cart.items.reduce((sum, i) => sum + i.itemId.rentPerDay * i.quantity, 0);

  return (
    <div className="p-4">
      <h2 className="text-3xl mb-4">Cart</h2>
      {cart.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.items.map(item => (
              <li key={item.itemId._id} className="mb-2">
                {item.itemId.name} - Rs. {item.itemId.rentPerDay} x {item.quantity}
              </li>
            ))}
          </ul>
          <p className="mt-4">Total: Rs. {total}</p>
          <button onClick={handleCheckout} className="mt-4 bg-black text-white p-2 rounded">Checkout</button>
        </>
      )}
    </div>
  );
}