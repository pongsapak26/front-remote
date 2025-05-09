"use client";

import { useUserContext } from "@/context/UserContext";
import { logout } from "@/lib/api";
import { showAlert } from "@/lib/sweetAlert";
import {
  BadgeDollarSign,
  Cookie,
  LogOut,
  Moon,
  ReceiptText,
  ShoppingCart,
  Sun,
  User,
  UserPen,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function UserMenu() {
  const { user, cart } = useUserContext();
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); // ใช้สำหรับอ้างอิง UserMenu
  const [username, setUsername] = useState("");
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false); // ปิด UserMenu หากคลิกนอกเมนู
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    console.log(username);
  }, []);

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
  useEffect(() => {
    const storedName = user.username || localStorage.getItem("username");
    setUsername(storedName || ""); // Set the username from user context or local storage
  }, []);

  return (
    <div className="relative flex items-center" ref={menuRef}>
      <div className="mr-2 relative">
        {cart.length > 0 ? (
          <div className="absolute bg-red-500 p-1 rounded-full z-50 w-5 -top-2 -right-2 h-5 text-xs text-center text-white items-center flex justify-center">
            {cart.length}
          </div>
        ) : (
          ""
        )}
        <Link href="/cart">
          <ShoppingCart className="w-6 h-6 my-auto" />
        </Link>
      </div>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition flex "
      >
        {/* {(user.username || username) ?? (
          <div className="mr-2">
            <span>{user.username || username}</span>
          </div>
        )} */}
        <User className="w-6 h-6" />
      </button>
      {/* Modal Menu */}
      <div
        className={`${
          open ? "top-14 " : "-top-80"
        } transition-all absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-20`}
      >
        {user.username != "" ? (
          <>
            <Link
              href="/profile"
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="flex items-center">
                <UserPen className="w-4 h-4 my-auto" />
                <span className="ml-2">Profile</span>
              </div>
            </Link>
            <Link
              href="/transaction"
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="flex items-center">
                <BadgeDollarSign className="w-4 h-4 my-auto" />
                <span className="ml-2">Transaction</span>
              </div>
            </Link>

            <div
              onClick={() => {
                handleLogout();
              }}
              className="cursor-pointer block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="flex items-center">
                <LogOut className="w-4 h-4 my-auto" />
                <span className="ml-2">Logout</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setOpen(!open)}
            >
              <div className="flex items-center">
                <User className="w-4 h-4 my-auto" />
                <div className="ml-2">Login</div>
              </div>
            </Link>
            <Link
              href="/register"
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setOpen(!open)}
            >
              <div className="flex items-center">
                <UserPen className="w-4 h-4 my-auto" />
                <div className="ml-2">Register</div>
              </div>
            </Link>
          </>
        )}
        <Link
          href="/product"
          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <div className="flex items-center">
            <UserPen className="w-4 h-4 my-auto" />
            <div className="ml-2">Product</div>
          </div>
        </Link>
        <Link
          href="/terms-and-conditions"
          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <div className="flex items-center">
            <ReceiptText className="w-4 h-4 my-auto" />
            <div className="ml-2">Terms And Conditions</div>
          </div>
        </Link>

        <Link
          href="/privacy-policy"
          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <div className="flex items-center">
            <Cookie className="w-4 h-4 my-auto" />
            <div className="ml-2">Privacy Policy</div>
          </div>
        </Link>
        <div
          onClick={() => {
            toggleDarkMode();
          }}
          className="cursor-pointer block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {darkMode ? (
            <div className="flex">
              <Sun className="w-4 h-4 my-auto" />
              <div className="ml-2">Light Mode</div>
            </div>
          ) : (
            <div className="flex items-center">
              <Moon className="w-4 h-4 my-auto" />
              <div className="ml-2">Dark Mode</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
