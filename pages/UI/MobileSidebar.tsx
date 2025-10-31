"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <span className="text-lg font-semibold text-gray-800">Menu</span>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col p-4 space-y-4 text-gray-700 font-medium">
          <Link
            href="/"
            onClick={onClose}
            className="hover:text-blue-600 transition"
          >
            Home
          </Link>
          <Link
            href="/saved"
            onClick={onClose}
            className="hover:text-blue-600 transition"
          >
            Saved Tasks
          </Link>
          <Link
            href="/about"
            onClick={onClose}
            className="hover:text-blue-600 transition"
          >
            About
          </Link>

          <Link
            href="/login"
            onClick={onClose}
            className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium text-center"
          >
            Login
          </Link>
        </nav>
      </aside>
    </>
  );
}
