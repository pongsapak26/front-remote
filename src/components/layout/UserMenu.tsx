"use client";

import { useUserContext } from "@/context/UserContext";
import { logout } from "@/lib/api";
import { showAlert } from "@/lib/sweetAlert";
import { User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { cart } = useUserContext();
  const username = localStorage.getItem("username") || "";

  const handleLogout = async () => {
    try {
      const data = await logout();
      if (data) {
        window.location.reload(); // Redirect to login page after successful logout
      }
      showAlert("Success", "Registration successful!", "success");
      // Do something with the data (e.g., redirect or show success message)
    } catch (error) {
      showAlert("Error", "Registration failed" + error, "error");
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="relative">
      {/* User Icon Button */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition flex "
      >
        {cart.username ?? <div className="mr-2">{cart.username}</div>}
        <User className="w-6 h-6" />
      </button>
      {/* Modal Menu */}
      <div
        className={`${
          open ? "top-14 right-0" : "-top-48 -right-40"
        } transition-all absolute  mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-20`}
      >
        {username != "" ? (
          <>
            <Link
              href="/profile"
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Profile
            </Link>
            <div
              onClick={() => {
                handleLogout();
              }}
              className="cursor-pointer block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Logout
            </div>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Register
            </Link>
          </>
        )}
        <div
          onClick={() => {
            toggleDarkMode();
          }}
          className="cursor-pointer block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </div>
      </div>
    </div>
  );
}
