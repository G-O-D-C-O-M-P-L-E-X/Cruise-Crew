import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../public/bg/bgaccounts.jpg";

export default function SellerAccount() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="relative flex flex-col justify-center w-full font-syne lg:h-screen">
      <img className="absolute w-full h-full object-cover" src={bg} alt="Background" />
      <div className="relative flex flex-col lg:bg-inherit text-slate-800 lg:ml-20 justify-center backdrop-blur-sm lg:text-white shadow-2xl p-8 rounded-lg lg:w-5/12">
        <h2 className="text-3xl font-bold mb-4 text-center">Seller Dashboard</h2>

        {/* Tabs */}
        <div className="flex justify-around border-b border-gray-500 pb-2 mb-4">
          {["dashboard", "products", "orders", "settings"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-semibold ${activeTab === tab ? "border-b-2 border-white" : "text-gray-400"}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "dashboard" && (
          <div>
            <h3 className="text-xl font-bold mb-2">Seller Overview</h3>
            <p><strong>Total Sales:</strong> $10,000</p>
            <p><strong>Orders Processed:</strong> 50</p>
            <p><strong>Pending Orders:</strong> 5</p>
          </div>
        )}

        {activeTab === "products" && (
          <div>
            <h3 className="text-xl font-bold mb-2">Your Products</h3>
            <ul>
              <li>📦 Product A - In Stock</li>
              <li>📦 Product B - Out of Stock</li>
              <li>📦 Product C - In Stock</li>
            </ul>
          </div>
        )}

        {activeTab === "orders" && (
          <div>
            <h3 className="text-xl font-bold mb-2">Orders Management</h3>
            <ul>
              <li>🚚 Order #98765 - Shipped</li>
              <li>📦 Order #98766 - Processing</li>
              <li>✅ Order #98767 - Delivered</li>
            </ul>
          </div>
        )}

        {activeTab === "settings" && (
          <div>
            <h3 className="text-xl font-bold mb-2">Account Settings</h3>
            <button className="w-full bg-red-600 p-3 rounded-2xl text-white font-semibold hover:bg-red-700">
              Logout
            </button>
          </div>
        )}

        <button className="mt-6 w-full bg-black p-3 rounded-2xl text-white font-semibold hover:bg-gray-900" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
}
