import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const footerLinks = [
  { name: "BIKES", link: "/bikes" },
  { name: "ACCESSORIES", link: "/accessories" },
  { name: "CART", link: "/cart" },
  { name: "ACCOUNT", link: "/account" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white font-syne p-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 text-center md:text-left">
        {/* Brand Info */}
        <div>
          <h1 className="text-xl font-bold">Cruise Crew</h1>
          <p className="text-gray-400 mt-2">Your trusted partner for accessories and bike rentals.</p>
          <p className="text-gray-400 mt-2">with you / for you</p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="font-bold mb-2">Explore</h2>
          {footerLinks.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="text-gray-400 hover:text-white transition"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Social & Contact */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="font-bold mb-2">Connect with Us</h2>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <Twitter size={20} />
            </a>
          </div>
          <p className="text-gray-400 mt-3">support@nirmitwagle.com</p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Cruise Crew. All Rights Reserved.
      </div>
     
    </footer>
  );
}