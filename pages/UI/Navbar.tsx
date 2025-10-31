"use client";

import { Menu } from "lucide-react";
import MobileSidebar from "./MobileSidebar";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-md" />
          <span className="font-semibold text-xl text-gray-800">TaskFlow</span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          <a href="/" className="hover:text-blue-600 transition">
            Home
          </a>
          <a href="/saved" className="hover:text-blue-600 transition">
            Saved Tasks
          </a>
          <a href="/about" className="hover:text-blue-600 transition">
            About
          </a>
        </nav>

        {/* Login Button */}
        <button className="hidden md:block ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium">
          Login
        </button>
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition"
          aria-label="Open menu"
        >
          {" "}
          <Menu size={24} />{" "}
        </button>
      </div>
      <MobileSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  );
}
