import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    image: "",
    rentPerDay: "",
    category: "bike",
    stock: 10
  });
  const [editingItem, setEditingItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || JSON.parse(atob(token.split('.')[1])).role !== 'admin') {
      alert('Admin access required. Redirecting to login.');
      navigate('/account');
      return;
    }

    const fetchData = async () => {
      try {
        const itemsRes = await fetch('http://localhost:5000/api/admin/items', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!itemsRes.ok) throw new Error('Failed to fetch items');
        const itemsData = await itemsRes.json();
        setItems(itemsData);

        const ordersRes = await fetch('http://localhost:5000/api/admin/orders', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!ordersRes.ok) throw new Error('Failed to fetch orders');
        const ordersData = await ordersRes.json();
        setOrders(ordersData);
      } catch (error) {
        console.error(error);
        alert('Error loading data: ' + error.message);
      }
    };
    fetchData();
  }, [navigate]);

  const handleAddItem = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    alert('Adding new item...');
    try {
      const res = await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(newItem)
      });
      if (!res.ok) throw new Error('Failed to add item');
      const data = await res.json();
      setItems([...items, data]);
      setNewItem({ name: "", description: "", image: "", rentPerDay: "", category: "bike", stock: 10 });
      alert('Item added successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to add item: ' + error.message);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    const token = localStorage.getItem('token');
    if (!confirm('Are you sure you want to delete this order?')) return;
    alert('Deleting order...');
    try {
      const res = await fetch(`http://localhost:5000/api/admin/orders/${orderId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete order');
      setOrders(orders.filter(o => o._id !== orderId));
      alert('Order deleted successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to delete order: ' + error.message);
    }
  };

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/items/${editingItem._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(editingItem)
      });
      if (!res.ok) throw new Error('Failed to update item');
      const updatedItem = await res.json();
      setItems(items.map(item => item._id === updatedItem._id ? updatedItem : item));
      setEditingItem(null);
      alert('Item updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to update item: ' + error.message);
    }
  };

  const handleEditClick = (item) => {
    setEditingItem({ ...item });
  };

  const handleEditChange = (e) => {
    setEditingItem({ ...editingItem, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl mb-4">Admin Panel</h2>

      <h3 className="text-xl mb-2">Add New Item</h3>
      <form onSubmit={handleAddItem} className="mb-6">
        <input
          type="text"
          name="name"
          value={newItem.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 mb-2 border"
          required
        />
        <textarea
          name="description"
          value={newItem.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 mb-2 border"
          required
        />
        <input
          type="text"
          name="image"
          value={newItem.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 mb-2 border"
          required
        />
        <input
          type="number"
          name="rentPerDay"
          value={newItem.rentPerDay}
          onChange={handleChange}
          placeholder="Rent per Day"
          className="w-full p-2 mb-2 border"
          required
        />
        <select
          name="category"
          value={newItem.category}
          onChange={handleChange}
          className="w-full p-2 mb-2 border"
        >
          <option value="bike">Bike</option>
          <option value="accessory">Accessory</option>
        </select>
        <input
          type="number"
          name="stock"
          value={newItem.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="w-full p-2 mb-2 border"
          required
        />
        <button type="submit" className="w-full bg-black text-white p-2 rounded">Add Item</button>
      </form>

      <h3 className="text-xl mb-2">Items</h3>
      <ul className="mb-6">
        {items.map(item => (
          <li key={item._id} className="mb-4 p-4 border rounded">
            {editingItem && editingItem._id === item._id ? (
              <form onSubmit={handleUpdateItem} className="space-y-2">
                <input
                  type="text"
                  name="name"
                  value={editingItem.name}
                  onChange={handleEditChange}
                  className="w-full p-2 border"
                  required
                />
                <textarea
                  name="description"
                  value={editingItem.description}
                  onChange={handleEditChange}
                  className="w-full p-2 border"
                  required
                />
                <input
                  type="text"
                  name="image"
                  value={editingItem.image}
                  onChange={handleEditChange}
                  className="w-full p-2 border"
                  required
                />
                <input
                  type="number"
                  name="rentPerDay"
                  value={editingItem.rentPerDay}
                  onChange={handleEditChange}
                  className="w-full p-2 border"
                  required
                />
                <select
                  name="category"
                  value={editingItem.category}
                  onChange={handleEditChange}
                  className="w-full p-2 border"
                >
                  <option value="bike">Bike</option>
                  <option value="accessory">Accessory</option>
                </select>
                <input
                  type="number"
                  name="stock"
                  value={editingItem.stock}
                  onChange={handleEditChange}
                  className="w-full p-2 border"
                  required
                />
                <div className="flex gap-2">
                  <button type="submit" className="bg-green-600 text-white p-2 rounded flex-1">Save</button>
                  <button 
                    type="button" 
                    onClick={() => setEditingItem(null)}
                    className="bg-gray-600 text-white p-2 rounded flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">{item.name}</h4>
                    <p className="text-sm">{item.description}</p>
                    <p>Category: {item.category}</p>
                    <p>Price: Rs. {item.rentPerDay}</p>
                    <p>Stock: {item.stock}</p>
                  </div>
                  <button
                    onClick={() => handleEditClick(item)}
                    className="bg-blue-600 text-white p-2 rounded"
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      <h3 className="text-xl mb-2">Orders</h3>
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order._id} className="mb-2 flex justify-between items-center">
              <span>
                Order #{order._id} by {order.userId.username} - {order.status} - Rs. {order.total}
              </span>
              <button
                onClick={() => handleDeleteOrder(order._id)}
                className="bg-red-600 text-white p-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}