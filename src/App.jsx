import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Account from "./pages/Account";
import Bike from "./pages/Bike";
import Cart from "./pages/Cart";
import Accessories from "./pages/Accessories";

import CustomerAccount from "./pages/CustomerAccount";
import AdminPanel from "./pages/AdminPanel";

export default function App() {
  return (
    <>< Navbar/>
      <Routes>
        <Route path="/" element={<Bike />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/customer" element={<CustomerAccount />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
      
     <><Footer/></> 
      </>
      
      
  
      
  );
};

